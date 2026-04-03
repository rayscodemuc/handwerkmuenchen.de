import { NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    if (sessionUser.role !== "admin") {
      return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("mangelmeldungen")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("[API admin/mangelmeldungen GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessionUser = await getSessionUserFromRequest(request);
    if (!sessionUser) {
      return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
    }

    if (sessionUser.role !== "admin") {
      return NextResponse.json({ error: "Keine Berechtigung." }, { status: 403 });
    }

    const body = await request.json();
    const { titel, beschreibung, bereich, prioritaet, auftrag_id } = body;

    if (!titel || !bereich) {
      return NextResponse.json(
        { error: "Titel und Bereich sind erforderlich." },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("mangelmeldungen")
      .insert({
        titel,
        beschreibung: beschreibung || null,
        bereich,
        prioritaet: prioritaet || "mittel",
        erstellt_von: sessionUser.id,
        auftrag_id: auftrag_id || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("[API admin/mangelmeldungen POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
