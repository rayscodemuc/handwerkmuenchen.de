import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("auftraege")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[API auftraege]", error);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }

    const rows = (data ?? []).map((row) =>
      normalizeAuftragRow(row as Record<string, unknown>)
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
