import type { UserRole } from "@/lib/auth-types";

const ROLE_TO_GEWERK: Partial<Record<UserRole, string>> = {
  gewerk_elektro: "Elektro",
  gewerk_sanitaer: "Sanitär",
  gewerk_ausbau: "Ausbau",
  gewerk_reinigung: "Reinigung",
  gewerk_facility: "Facility",
};

const GEWERK_TO_ROLE = Object.fromEntries(
  Object.entries(ROLE_TO_GEWERK).map(([role, gewerk]) => [gewerk, role])
) as Partial<Record<string, UserRole>>;

export function roleToGewerk(role: UserRole): string | null {
  return ROLE_TO_GEWERK[role] ?? null;
}

export function isGewerkRole(role: UserRole): boolean {
  return roleToGewerk(role) != null;
}

export function gewerkToRole(gewerk: string): UserRole | null {
  return GEWERK_TO_ROLE[gewerk.trim()] ?? null;
}
