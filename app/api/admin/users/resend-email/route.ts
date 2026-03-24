import { NextResponse } from "next/server";
import { getSessionUser, isValidUserRole } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/send-welcome-email";

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  let body: { email?: string; role?: string; display_name?: string | null };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const role = String(body.role ?? "admin").trim();
  const displayName =
    typeof body.display_name === "string" ? body.display_name.trim() || null : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Gültige E-Mail angeben." }, { status: 400 });
  }
  if (!isValidUserRole(role)) {
    return NextResponse.json({ error: "Ungültige Rolle." }, { status: 400 });
  }

  const { sent, error } = await sendWelcomeEmail({
    to: email,
    displayName,
    role,
  });

  if (!sent) {
    return NextResponse.json(
      { error: error ?? "E-Mail konnte nicht versendet werden. Prüfen Sie RESEND_API_KEY und RESEND_FROM." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, message: "Willkommens-Mail wurde erneut versendet." });
}
