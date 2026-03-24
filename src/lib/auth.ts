import { createClient as createSupabaseJsClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import {
  type UserRole,
  type SessionUser,
  USER_ROLE_OPTIONS,
  isValidUserRole,
  ADMIN_NAV_ITEMS,
  type NavItem,
} from "@/lib/auth-types";

// Re-export for consumers that only need server auth
export { USER_ROLE_OPTIONS, isValidUserRole, ADMIN_NAV_ITEMS };
export type { UserRole, SessionUser, NavItem };

async function resolveSessionUser(supabase: SupabaseClient, user: User): Promise<SessionUser | null> {
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, display_name")
    .eq("id", user.id)
    .single();

  const metaRole = user.user_metadata?.role;
  const rawRole = profile?.role ?? (typeof metaRole === "string" ? metaRole : null);
  const legacyMap: Record<string, UserRole> = {
    innenausbau: "gewerk_ausbau",
    reinigung: "gewerk_reinigung",
  };
  let role = (rawRole && isValidUserRole(rawRole) ? rawRole : legacyMap[rawRole ?? ""] ?? null) as UserRole | null;
  if (!role) {
    if (!profile) {
      console.warn("[auth] User ohne profiles-Eintrag – Fallback admin. Bitte in Supabase prüfen:", user.id, user.email);
      role = "admin";
    } else {
      return null;
    }
  }
  const displayName = profile?.display_name ?? user.user_metadata?.display_name ?? null;

  return {
    id: user.id,
    email: user.email ?? null,
    role,
    displayName,
  };
}

/** Session + Profil (Rolle) des aktuellen Nutzers. Server-only (Cookies). */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;
  return resolveSessionUser(supabase, user);
}

/**
 * Wie getSessionUser, aber für Route Handler: zuerst Cookies, sonst Authorization Bearer (Client-Session).
 * Behebt Fälle, in denen `cookies()` in /api/* keine Supabase-Session sieht, obwohl der Nutzer im Admin-Bereich ist.
 */
export async function getSessionUserFromRequest(request: Request): Promise<SessionUser | null> {
  const cookieClient = await createClient();
  const {
    data: { user },
    error,
  } = await cookieClient.auth.getUser();
  if (!error && user) {
    return resolveSessionUser(cookieClient, user);
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const bearerClient = createSupabaseJsClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const {
    data: { user: userFromJwt },
    error: jwtErr,
  } = await bearerClient.auth.getUser();
  if (jwtErr || !userFromJwt) return null;
  return resolveSessionUser(bearerClient, userFromJwt);
}

/** Prüft, ob der Nutzer Admin ist. */
export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}
