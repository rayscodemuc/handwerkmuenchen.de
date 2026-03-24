import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";

/** Debug: Welche Tickets siehst du? Warum fehlen welche? Nach Prüfung löschen. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const gewerk = roleToGewerk(user.role);
  const admin = createServiceRoleClient();

  /** Alle Tickets der Company (ohne Gewerk-Filter). */
  const { data: allTickets } = await admin
    .from("tickets")
    .select("id, ticket_display_id, kunde_name, gewerk, company_id")
    .or(`company_id.eq.${DEFAULT_COMPANY_ID},company_id.is.null`)
    .order("created_at", { ascending: false });

  /** Gefiltert wie die echte API (overlaps). */
  let filtered: typeof allTickets = allTickets ?? [];
  if (gewerk) {
    const alt = gewerk.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
    const values = alt !== gewerk ? [gewerk, alt] : [gewerk];
    filtered = (allTickets ?? []).filter((t) => {
      const g = t?.gewerk;
      if (!g) return false;
      const arr = Array.isArray(g) ? g : typeof g === "string" ? [g] : [];
      return arr.some((v: unknown) => values.includes(String(v ?? "").trim()));
    });
  }

  return NextResponse.json({
    role: user.role,
    gewerk,
    countAll: (allTickets ?? []).length,
    countFiltered: filtered.length,
    allTickets: (allTickets ?? []).map((t) => ({
      id: t.id,
      display_id: t.ticket_display_id,
      kunde: t.kunde_name,
      gewerk: t.gewerk,
      gewerkType: Array.isArray(t.gewerk) ? "array" : typeof t.gewerk,
      company_id: t.company_id,
      inFiltered: filtered.some((f) => f?.id === t.id),
    })),
    filteredIds: filtered.map((t) => t?.id),
  });
}
