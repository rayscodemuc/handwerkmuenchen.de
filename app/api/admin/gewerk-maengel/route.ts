import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { GewerkMangelAdminRow } from "@/src/types/gewerk-maengel-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  const admin = createServiceRoleClient();
  const { data: rows, error } = await admin
    .from("gewerk_maengel")
    .select("id, company_id, created_by, adresse, notiz, image_urls, gewerk, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    if (error.message?.includes("does not exist") || error.code === "42P01") {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const list = rows ?? [];
  const ids = [...new Set(list.map((r) => r.created_by as string))];
  const { data: profs } =
    ids.length > 0
      ? await admin.from("profiles").select("id, display_name").in("id", ids)
      : { data: [] as { id: string; display_name: string | null }[] };

  const byId = new Map((profs ?? []).map((p) => [p.id as string, (p.display_name as string | null) ?? null]));

  const out: GewerkMangelAdminRow[] = list.map((r) => ({
    id: r.id as string,
    company_id: r.company_id as string,
    created_by: r.created_by as string,
    adresse: r.adresse as string,
    notiz: (r.notiz as string | null) ?? null,
    image_urls: Array.isArray(r.image_urls) ? (r.image_urls as string[]) : [],
    gewerk: (r.gewerk as string | null) ?? null,
    created_at: r.created_at as string,
    reporter_display_name: byId.get(r.created_by as string) ?? null,
  }));

  return NextResponse.json(out);
}
