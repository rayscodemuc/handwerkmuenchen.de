import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";
import { getSessionUser } from "@/lib/auth";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";

export async function GET() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    const supabase = await createClient();
    const gewerk = roleToGewerk(sessionUser.role);

    let data: unknown[] | null = null;
    let error: { message?: string; code?: string } | null = null;

    if (!gewerk) {
      const res = await supabase
        .from("auftraege")
        .select("*")
        .order("created_at", { ascending: false });
      data = res.data as unknown[] | null;
      error = res.error as { message?: string; code?: string } | null;
    } else {
      const ticketRes = await supabase
        .from("tickets")
        .select("additional_data")
        .contains("gewerk", [gewerk]);

      if (ticketRes.error) {
        error = ticketRes.error as { message?: string; code?: string };
      } else {
        const auftragIds = (ticketRes.data ?? [])
          .map((row) => {
            const additional = (row as { additional_data?: unknown }).additional_data;
            if (!additional || typeof additional !== "object") return null;
            const aid = (additional as { auftrag_id?: unknown }).auftrag_id;
            return typeof aid === "string" && aid.trim() ? aid.trim() : null;
          })
          .filter((id): id is string => id != null);

        if (auftragIds.length === 0) {
          data = [];
        } else {
          const res = await supabase
            .from("auftraege")
            .select("*")
            .in("id", Array.from(new Set(auftragIds)))
            .order("created_at", { ascending: false });
          data = res.data as unknown[] | null;
          error = res.error as { message?: string; code?: string } | null;
        }
      }
    }

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
