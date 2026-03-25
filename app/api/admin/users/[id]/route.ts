import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

/** Nur Gewerk-Logins (inkl. Legacy-Rollen in der DB). */
function isDeletableGewerkRole(raw: string | null | undefined): boolean {
  if (raw == null || raw === "") return false;
  const r = String(raw).trim();
  if (r === "admin") return false;
  if (r.startsWith("gewerk_")) return true;
  if (r === "innenausbau" || r === "reinigung") return true;
  return false;
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  const { id: targetId } = await context.params;
  if (!targetId || typeof targetId !== "string") {
    return NextResponse.json({ error: "Ungültige Nutzer-ID." }, { status: 400 });
  }
  if (targetId === session.id) {
    return NextResponse.json({ error: "Das eigene Konto kann nicht gelöscht werden." }, { status: 400 });
  }

  const admin = createServiceRoleClient();

  const { data: authUser, error: getAuthErr } = await admin.auth.admin.getUserById(targetId);
  if (getAuthErr || !authUser.user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  const { data: profile } = await admin.from("profiles").select("role").eq("id", targetId).maybeSingle();

  const metaRole = authUser.user.user_metadata?.role;
  const rawRole =
    typeof profile?.role === "string"
      ? profile.role
      : typeof metaRole === "string"
        ? metaRole
        : null;

  if (!isDeletableGewerkRole(rawRole)) {
    if (rawRole === "admin") {
      return NextResponse.json({ error: "Admin-Konten können hier nicht gelöscht werden." }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Nur Gewerk-Nutzer können hier gelöscht werden." },
      { status: 400 }
    );
  }

  const { error: delErr } = await admin.auth.admin.deleteUser(targetId);
  if (delErr) {
    return NextResponse.json({ error: delErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
