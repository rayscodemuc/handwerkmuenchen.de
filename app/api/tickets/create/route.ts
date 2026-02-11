import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const GEWERKE = ["Elektro", "Sanitär", "Ausbau", "Reinigung", "Facility"] as const;
/** Status-Werte wie in der Datenbank (exakt: Großbuchstabe am Anfang). */
const STATUSES = ["Anfrage", "Eingeteilt", "Nachbereitung", "Abrechnung", "Abgelehnt", "Archiv"] as const;

function validateGewerk(v: unknown): v is string {
  return typeof v === "string" && (GEWERKE as readonly string[]).includes(v);
}
function validateStatus(v: unknown): v is string {
  return typeof v === "string" && (STATUSES as readonly string[]).includes(v);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const isPartner = !!body.is_partner;
    let kunde_name: string | null =
      typeof body.kunde_name === "string" ? body.kunde_name.trim() || null : null;
    const partner_name: string | null =
      typeof body.partner_name === "string" ? body.partner_name.trim() || null : null;

    // Partner-Ticket: kunde_name aus partner_name übernehmen, falls leer
    if (isPartner && !kunde_name && partner_name) {
      kunde_name = partner_name;
    }

    const kontakt_email =
      typeof body.kontakt_email === "string" ? body.kontakt_email.trim() : "";
    const objekt_adresse =
      typeof body.objekt_adresse === "string" ? body.objekt_adresse.trim() : "";

    // Pflichtfelder validieren (nach Normalisierung)
    const errors: string[] = [];
    if (!kunde_name) errors.push("kunde_name ist erforderlich (oder partner_name bei Partner-Ticket)");
    if (!kontakt_email) errors.push("kontakt_email ist erforderlich");
    if (!objekt_adresse) errors.push("objekt_adresse ist erforderlich");

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validierungsfehler", details: errors },
        { status: 400 }
      );
    }

    const payload = {
      ticket_display_id: typeof body.ticket_display_id === "string" ? body.ticket_display_id.trim() || null : null,
      is_partner: isPartner,
      partner_name: partner_name || null,
      kunde_name,
      kontakt_email,
      objekt_adresse,
      beschreibung: typeof body.beschreibung === "string" ? body.beschreibung.trim() || null : null,
      gewerk: validateGewerk(body.gewerk) ? body.gewerk : null,
      status: validateStatus(body.status) ? body.status : "Anfrage",
      historie: Array.isArray(body.historie) ? body.historie : [],
    };

    const { data, error } = await supabase.from("tickets").insert([payload]).select("id").single();

    if (error) {
      console.error("Supabase tickets insert error:", error);
      return NextResponse.json(
        { error: "Speichern fehlgeschlagen", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 201 });
  } catch (e) {
    console.error("tickets/create error:", e);
    return NextResponse.json(
      { error: "Ungültige Anfrage", message: e instanceof Error ? e.message : "Unknown error" },
      { status: 400 }
    );
  }
}
