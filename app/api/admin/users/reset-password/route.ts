import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

/** Admin setzt neues Passwort für einen Nutzer (umgeht E-Mail-Reset). */
export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  let body: { user_id?: string; password?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body." }, { status: 400 });
  }

  const userId = String(body.user_id ?? "").trim();
  const password = String(body.password ?? "");

  if (!userId) {
    return NextResponse.json({ error: "Nutzer-ID fehlt." }, { status: 400 });
  }
  if (userId === session.id) {
    return NextResponse.json(
      { error: "Das eigene Passwort kann hier nicht geändert werden. Nutzen Sie „Passwort vergessen“ auf der Login-Seite." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Passwort muss mindestens 8 Zeichen haben." }, { status: 400 });
  }

  try {
    const admin = createServiceRoleClient();
    const { error } = await admin.auth.admin.updateUserById(userId, { password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Passwort wurde geändert." });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unbekannter Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
