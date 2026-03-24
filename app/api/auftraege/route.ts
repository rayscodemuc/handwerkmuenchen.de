import { NextResponse } from "next/server";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";
import { filterAuftraegeRowsByRole } from "@/lib/auftraege/filter-auftraege-by-role";
import { getSessionUserFromRequest } from "@/lib/auth";
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

    const rows = filterAuftraegeRowsByRole(
      (data ?? []).map((row) =>
        normalizeAuftragRow(row as Record<string, unknown>)
      ),
      sessionUser.role
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[API auftraege]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
