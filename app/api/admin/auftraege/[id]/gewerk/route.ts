import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { canonicalizeGewerkArray } from "@/lib/auftraege/canonical-gewerk";
import { gewerkToRole } from "@/lib/auftraege/role-to-gewerk";
import { buildAssignmentNotificationBody, sendAssignmentNotification } from "@/lib/push/send-assignment-notification";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const dynamic = "force-dynamic";

type Body = {
  gewerk?: string[] | null;
  ticketId?: string | null;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser || sessionUser.role !== "admin") {
      return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
    }

    const params = await Promise.resolve(context.params);
    const auftragId = params.id;
    if (!auftragId) {
      return NextResponse.json({ error: "Auftrag fehlt." }, { status: 400 });
    }

    const body = (await request.json()) as Body;
    const gewerk = canonicalizeGewerkArray(body.gewerk) ?? null;
    const admin = createServiceRoleClient();

    const { data: currentRow, error: currentError } = await admin
      .from("auftraege")
      .select("id, gewerk, aufgabe")
      .eq("id", auftragId)
      .single();

    if (currentError || !currentRow) {
      return NextResponse.json(
        { error: currentError?.message ?? "Auftrag nicht gefunden." },
        { status: currentError ? 500 : 404 }
      );
    }

    const { error: updateError } = await admin
      .from("auftraege")
      .update({ gewerk })
      .eq("id", auftragId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    const ticketId = typeof body.ticketId === "string" && body.ticketId.trim() ? body.ticketId.trim() : null;
    if (ticketId) {
      const { error: ticketError } = await admin
        .from("tickets")
        .update({ gewerk })
        .eq("id", ticketId);
      if (ticketError) {
        return NextResponse.json({ error: ticketError.message }, { status: 500 });
      }
    }

    const previous = new Set(canonicalizeGewerkArray(currentRow.gewerk) ?? []);
    const next = canonicalizeGewerkArray(gewerk) ?? [];
    const newlyAssigned = next.filter((entry) => !previous.has(entry));
    const deepLink = ticketId ? `/admin/dashboard/auftrag/${ticketId}` : "/admin/dashboard";
    const title = "Neuer Auftrag";
    const bodyText = buildAssignmentNotificationBody(currentRow.aufgabe);

    const notificationResults = await Promise.all(
      newlyAssigned.map(async (entry) => {
        const role = gewerkToRole(entry);
        if (!role) return null;
        return sendAssignmentNotification({
          role,
          auftragId,
          title,
          body: bodyText,
          deepLink,
        });
      })
    );

    const warnings = notificationResults
      .filter((result): result is NonNullable<typeof result> => result != null)
      .flatMap((result) => result.errors);

    return NextResponse.json({
      ok: true,
      gewerk,
      warnings,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
