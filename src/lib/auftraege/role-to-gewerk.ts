import type { UserRole } from "@/lib/auth";

const ROLE_TO_GEWERK: Partial<Record<UserRole, string>> = {
  gewerk_elektro: "Elektro",
  gewerk_sanitaer: "Sanitär",
  gewerk_ausbau: "Ausbau",
  gewerk_reinigung: "Reinigung",
  gewerk_facility: "Facility",
};

export function roleToGewerk(role: UserRole): string | null {
  return ROLE_TO_GEWERK[role] ?? null;
}

export function isGewerkRole(role: UserRole): boolean {
  return roleToGewerk(role) != null;
}
