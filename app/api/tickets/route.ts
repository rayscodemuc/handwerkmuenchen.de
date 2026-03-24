import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";

/** Alternative Schreibweisen für Gewerk-Filter (z.B. Sanitär/Sanitaer). */
function gewerkFilterValues(gewerk: string): string[] {
  const base = gewerk.trim();
  if (!base) return [];
  const alt = base.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
  return alt !== base ? [base, alt] : [base];
}

/**
 * GET /api/tickets – Tickets gefiltert nach Rolle.
 * Admin: alle. Gewerk-User: nur Tickets mit ihrem Gewerk.
 * Service-Role für Abfrage, um RLS-Probleme zu umgehen – Filter liegt bei uns.
 */
export async function GET(request: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("company_id") ?? DEFAULT_COMPANY_ID;

    const admin = createServiceRoleClient();
    const gewerk = roleToGewerk(sessionUser.role);

    let query = admin
      .from("tickets")
      .select("*")
      .or(`company_id.eq.${companyId},company_id.is.null`)
      .order("created_at", { ascending: false });

    if (gewerk) {
      const values = gewerkFilterValues(gewerk);
      query = values.length > 1 ? query.overlaps("gewerk", values) : query.contains("gewerk", [gewerk]);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const rows = data ?? [];
    const seen = new Set<string>();
    const deduped = rows.filter((t: { id?: string }) => {
      const id = t?.id;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    return NextResponse.json(deduped);
  } catch (err) {
    console.error("[API tickets]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
