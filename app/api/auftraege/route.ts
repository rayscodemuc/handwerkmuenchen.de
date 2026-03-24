import { NextResponse } from "next/server";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";
import { filterAuftraegeRowsByRole } from "@/lib/auftraege/filter-auftraege-by-role";
import { getBesichtigungAutoArchiveUpdate } from "@/lib/auftraege/termin-vergangen";
import { getSessionUserFromRequest } from "@/lib/auth";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { getSupabaseForApiRequest } from "@/lib/supabase/api-request-client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const supabase = await getSupabaseForApiRequest(request);

    /** RLS + expliziter Filter: nur `auftraege.gewerk` laut Board-Zuweisung (robust bei DB-Policies). */
    const res = await supabase
      .from("auftraege")
      .select("*")
      .order("created_at", { ascending: false });
    const data = res.data as unknown[] | null;
    const error = res.error as { message?: string; code?: string } | null;

    if (error) {
      console.error("[API auftraege]", error);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }

    let rows = (data ?? []).map((row) =>
      normalizeAuftragRow(row as Record<string, unknown>)
    ) as HandwerkerAuftrag[];

    for (let i = 0; i < rows.length; i++) {
      const spec = getBesichtigungAutoArchiveUpdate(rows[i]);
      if (!spec) continue;
      const { data: updated, error: upErr } = await supabase
        .from("auftraege")
        .update(spec.payload)
        .eq("id", rows[i].id)
        .eq("termin_start", spec.matchTerminStart)
        .select("*")
        .maybeSingle();
      if (!upErr && updated) {
        rows[i] = normalizeAuftragRow(updated as Record<string, unknown>) as HandwerkerAuftrag;
      }
    }

    const filtered = filterAuftraegeRowsByRole(rows, sessionUser.role);
    return NextResponse.json(filtered);
  } catch (err) {
    console.error("[API auftraege]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
