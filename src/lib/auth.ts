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

/** Session + Profil (Rolle) des aktuellen Nutzers. Server-only. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

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

/** Prüft, ob der Nutzer Admin ist. */
export function isAdmin(role: UserRole): boolean {
  return role === "admin";
}
