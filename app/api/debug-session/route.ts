import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";

/** Debug: Welche Rolle sieht der Server? Nach Prüfung löschen. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet.", role: null });
  }
  const gewerk = roleToGewerk(user.role);
  return NextResponse.json({
    role: user.role,
    gewerkForFilter: gewerk,
    email: user.email,
  });
}
