import { NextResponse } from "next/server";
import { getSessionUser, isValidUserRole, type UserRole } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/send-welcome-email";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export type AdminUserRow = {
  id: string;
  email: string | null;
  role: UserRole;
  display_name: string | null;
  created_at: string;
};

export async function GET() {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  try {
    const admin = createServiceRoleClient();
    const { data: listData, error: listError } = await admin.auth.admin.listUsers({
      perPage: 1000,
      page: 1,
    });
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const users = listData.users;
    const ids = users.map((u) => u.id);
    const { data: profiles } = await admin.from("profiles").select("id, role, display_name").in("id", ids);

    const profileById = new Map(
      (profiles ?? []).map((p) => [p.id as string, p as { role: string; display_name: string | null }])
    );

    const rows: AdminUserRow[] = users.map((u) => {
      const p = profileById.get(u.id);
      const metaRole = u.user_metadata?.role;
      const roleFromProfile = p?.role;
      const role = (isValidUserRole(String(roleFromProfile))
        ? roleFromProfile
        : isValidUserRole(String(metaRole))
          ? metaRole
          : "admin") as UserRole;

      return {
        id: u.id,
        email: u.email ?? null,
        role,
        display_name: p?.display_name ?? (typeof u.user_metadata?.display_name === "string" ? u.user_metadata.display_name : null),
        created_at: u.created_at,
      };
    });

    rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(rows);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unbekannter Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  let body: { email?: string; password?: string; role?: string; display_name?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body." }, { status: 400 });
  }

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body.password ?? "");
  const displayName = String(body.display_name ?? "").trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Gültige E-Mail angeben." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Passwort mindestens 8 Zeichen." }, { status: 400 });
  }
  if (!body.role || !isValidUserRole(body.role)) {
    return NextResponse.json({ error: "Rolle auswählen." }, { status: 400 });
  }

  try {
    const admin = createServiceRoleClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: body.role,
        display_name: displayName ?? email.split("@")[0],
      },
    });

    if (error) {
      // "Database error creating new user" = meist Trigger/Constraint in profiles
      return NextResponse.json(
        { error: error.message },
        { status: error.message?.includes("Database error") ? 500 : 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json({ error: "Nutzer konnte nicht angelegt werden." }, { status: 500 });
    }

    // Willkommens-Mail (optional – schlägt nicht fehl, wenn Resend nicht konfiguriert)
    const { sent, error: emailError } = await sendWelcomeEmail({
      to: email,
      displayName,
      role: body.role,
    });
    if (!sent && emailError) {
      console.warn("[admin/users] Willkommens-Mail nicht versendet:", emailError);
    }

    return NextResponse.json({
      id: data.user.id,
      email: data.user.email,
      role: body.role as UserRole,
      display_name: displayName,
      created_at: data.user.created_at,
      email_sent: sent,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unbekannter Fehler";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
