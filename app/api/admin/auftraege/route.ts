import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { gewerkToRole } from "@/lib/auftraege/role-to-gewerk";
import { buildAssignmentNotificationBody, sendAssignmentNotification } from "@/lib/push/send-assignment-notification";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";
import { kanbanPositionSortKey } from "@/lib/auftraege/kanban-position-sort-key";
import { STATUS } from "@/src/config/businessConfig";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";

export const dynamic = "force-dynamic";

type Body = {
  mieter_name?: string;
  mieter_email?: string;
  mieter_telefon?: string | null;
  adresse_strasse?: string;
  adresse_ort?: string | null;
  aufgabe?: string | null;
  auftragsnummer?: string | null;
  gewerk?: string | null;
  rechnungsempfaenger?: string | null;
  leistungsempfaenger?: string | null;
};

export async function POST(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser || sessionUser.role !== "admin") {
      return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
    }

    const body = (await request.json()) as Body;
    const mieter_name = (body.mieter_name ?? "").trim();
    const mieter_email_raw = body.mieter_email;
    const mieter_email =
      mieter_email_raw == null || String(mieter_email_raw).trim() === ""
        ? null
        : String(mieter_email_raw).trim();
    const adresse_strasse = (body.adresse_strasse ?? "").trim();
    const auftragsnummer = (body.auftragsnummer ?? "").trim();

    if (!mieter_name) {
      return NextResponse.json({ error: "Name (Mieter/Kunde) ist erforderlich." }, { status: 400 });
    }
    if (!adresse_strasse) {
      return NextResponse.json({ error: "Objektadresse ist erforderlich." }, { status: 400 });
    }
    if (!auftragsnummer) {
      return NextResponse.json({ error: "Auftragsnummer ist erforderlich." }, { status: 400 });
    }

    const admin = createServiceRoleClient();

    const { data: posRows, error: posErr } = await admin.from("auftraege").select("board_position");
    if (posErr) {
      console.error("[admin/auftraege POST] position", posErr);
      return NextResponse.json({ error: posErr.message }, { status: 500 });
    }
    const sortKeys = (posRows ?? []).map((r) => kanbanPositionSortKey(r.board_position));
    const finite = sortKeys.filter((k) => k !== Number.MAX_SAFE_INTEGER);
    /** Neu oben: kleinere board_position als alle bestehenden (inkl. 0 / negative nach früheren Inserts). */
    const board_position = finite.length === 0 ? 10 : Math.min(...finite) - 10;

    const gewerkTrim = (body.gewerk ?? "").trim();
    const gewerk = gewerkTrim ? [gewerkTrim] : null;

    const rechnungsempfaenger = (body.rechnungsempfaenger ?? "").trim() || null;
    const leistungsempfaenger = (body.leistungsempfaenger ?? "").trim() || null;

    const insertRow: Record<string, unknown> = {
      mieter_name,
      mieter_email,
      mieter_telefon: (body.mieter_telefon ?? "").trim() || null,
      adresse_strasse,
      adresse_ort: (body.adresse_ort ?? "").trim() || null,
      aufgabe: (body.aufgabe ?? "").trim() || null,
      auftragsnummer,
      board_status: STATUS.ANFRAGE,
      board_position,
      gewerk,
      rechnungsempfaenger,
      leistungsempfaenger,
    };

    const { data: inserted, error: insErr } = await admin
      .from("auftraege")
      .insert(insertRow)
      .select("*")
      .single();

    if (insErr) {
      console.error("[admin/auftraege POST] insert", insErr);
      return NextResponse.json({ error: insErr.message }, { status: 500 });
    }

    const row = normalizeAuftragRow(inserted as Record<string, unknown>) as HandwerkerAuftrag;

    await Promise.all(
      (row.gewerk ?? []).map(async (entry) => {
        const role = gewerkToRole(entry);
        if (!role) return null;
        return sendAssignmentNotification({
          role,
          auftragId: row.id,
          title: "Neuer Auftrag",
          body: buildAssignmentNotificationBody(row.aufgabe),
          deepLink: "/admin/dashboard",
        });
      })
    );

    return NextResponse.json(row);
  } catch (e) {
    console.error("[admin/auftraege POST]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
