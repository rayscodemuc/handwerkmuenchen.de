import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { roleToGewerk, isGewerkRole } from "@/lib/auftraege/role-to-gewerk";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";

export const dynamic = "force-dynamic";

const MAX_NOTIZ = 8000;
const MAX_ADRESSE = 2000;
const MAX_IMAGES = 12;

export async function POST(request: Request) {
  const session = await getSessionUserFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  if (!isGewerkRole(session.role)) {
    return NextResponse.json({ error: "Nur für Gewerk-Nutzer." }, { status: 403 });
  }

  let body: { adresse?: string; notiz?: string; image_urls?: string[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body." }, { status: 400 });
  }

  const adresse = String(body.adresse ?? "").trim();
  if (!adresse) {
    return NextResponse.json({ error: "Adresse angeben." }, { status: 400 });
  }
  if (adresse.length > MAX_ADRESSE) {
    return NextResponse.json({ error: `Adresse max. ${MAX_ADRESSE} Zeichen.` }, { status: 400 });
  }

  const notiz = String(body.notiz ?? "").trim() || null;
  if (notiz && notiz.length > MAX_NOTIZ) {
    return NextResponse.json({ error: `Notiz max. ${MAX_NOTIZ} Zeichen.` }, { status: 400 });
  }

  const urls = Array.isArray(body.image_urls) ? body.image_urls : [];
  if (urls.length > MAX_IMAGES) {
    return NextResponse.json({ error: `Max. ${MAX_IMAGES} Fotos.` }, { status: 400 });
  }

  const publicPrefix = `/storage/v1/object/public/ticket-images/`;
  for (const u of urls) {
    if (typeof u !== "string" || !u.includes(publicPrefix)) {
      return NextResponse.json({ error: "Ungültige Bild-URL." }, { status: 400 });
    }
    if (!u.includes(`/maengel/${session.id}/`)) {
      return NextResponse.json({ error: "Bild-Pfad gehört nicht zu diesem Konto." }, { status: 400 });
    }
  }

  const gewerk = roleToGewerk(session.role);
  const admin = createServiceRoleClient();
  const { data, error } = await admin
    .from("gewerk_maengel")
    .insert({
      company_id: DEFAULT_COMPANY_ID,
      created_by: session.id,
      adresse,
      notiz,
      image_urls: urls,
      gewerk,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[gewerk/maengel]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id });
}
