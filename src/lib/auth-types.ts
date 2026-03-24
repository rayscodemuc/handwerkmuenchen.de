/**
 * Shared auth types and constants – safe for client and server.
 * Do NOT import server-only code here.
 */

export type UserRole =
  | "admin"
  | "gewerk_elektro"
  | "gewerk_sanitaer"
  | "gewerk_ausbau"
  | "gewerk_reinigung"
  | "gewerk_facility";

export type SessionUser = {
  id: string;
  email: string | null;
  role: UserRole;
  displayName: string | null;
};

/** Anzeige + Auswahl in Admin-Benutzerverwaltung. */
export const USER_ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "admin", label: "Admin (voller Zugriff)" },
  { value: "gewerk_elektro", label: "Gewerk · Elektro" },
  { value: "gewerk_sanitaer", label: "Gewerk · Sanitär" },
  { value: "gewerk_ausbau", label: "Gewerk · Ausbau" },
  { value: "gewerk_reinigung", label: "Gewerk · Reinigung" },
  { value: "gewerk_facility", label: "Gewerk · Facility" },
];

export function isValidUserRole(value: string): value is UserRole {
  return USER_ROLE_OPTIONS.some((o) => o.value === value);
}

/** Menüpunkte je nach Rolle. Admin sieht alles. */
export type NavItem = {
  label: string;
  href: string;
  roles: UserRole[]; // leer = alle
};

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", roles: [] },
  { label: "Benutzerverwaltung", href: "/admin/benutzer", roles: ["admin"] },
];
