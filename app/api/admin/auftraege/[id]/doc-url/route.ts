import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const dynamic = "force-dynamic";

type Body = { url?: string };

/**
 * Nach Storage-Upload: URLs zuverlässig in der DB (Service Role), inkl. anhang_url wenn leer.
 * Verhindert, dass clientseitiges supabase.update still scheitert (RLS/Spalte/Session).
 */
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser || sessionUser.role !== "admin") {
      return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
    }

    const { id: auftragId } = await context.params;
    if (!auftragId?.trim()) {
      return NextResponse.json({ error: "Auftrags-ID fehlt." }, { status: 400 });
    }

    const body = (await request.json()) as Body;
    const url = (body.url ?? "").trim();
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json({ error: "Gültige http(s)-URL erforderlich." }, { status: 400 });
    }

    const admin = createServiceRoleClient();

    const { data: row, error: selErr } = await admin
      .from("auftraege")
      .select("angebot_rechnung_urls, anhang_url")
      .eq("id", auftragId)
      .maybeSingle();

    if (selErr) {
      console.error("[admin/auftraege doc-url] select", selErr);
      return NextResponse.json({ error: selErr.message }, { status: 500 });
    }
    if (!row) {
      return NextResponse.json({ error: "Auftrag nicht gefunden." }, { status: 404 });
    }

    const prev = Array.isArray(row.angebot_rechnung_urls)
      ? (row.angebot_rechnung_urls as string[]).filter((u) => typeof u === "string" && u.trim() !== "")
      : [];
    const deduped = prev.filter((u) => u.trim() !== url);
    const angebot_rechnung_urls = [url, ...deduped];

    const hasAnhang = String((row as { anhang_url?: string | null }).anhang_url ?? "").trim() !== "";
    const patch: { angebot_rechnung_urls: string[]; anhang_url?: string } = { angebot_rechnung_urls };
    if (!hasAnhang) {
      patch.anhang_url = url;
    }

    const { data: updated, error: updErr } = await admin
      .from("auftraege")
      .update(patch)
      .eq("id", auftragId)
      .select("angebot_rechnung_urls, anhang_url")
      .maybeSingle();

    if (updErr) {
      console.error("[admin/auftraege doc-url] update", updErr);
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    return NextResponse.json(updated ?? patch);
  } catch (e) {
    console.error("[admin/auftraege doc-url]", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
