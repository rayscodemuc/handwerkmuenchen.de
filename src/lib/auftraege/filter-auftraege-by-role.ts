import type { UserRole } from "@/lib/auth-types";
import { canonicalizeGewerkArray } from "@/lib/auftraege/canonical-gewerk";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";

type RowWithGewerk = { gewerk?: string[] | null };

/**
 * Gewerk-Nutzer: nur Aufträge, deren `gewerk` (Board-Zuweisung) ihr Gewerk enthält.
 * Doppelte Absicherung neben RLS (falls Policies in der DB noch nicht passen).
 */
export function filterAuftraegeRowsByRole<T extends RowWithGewerk>(rows: T[], role: UserRole): T[] {
  if (role === "admin") return rows;
  const my = roleToGewerk(role);
  if (!my) return [];
  return rows.filter((row) => {
    const canon = canonicalizeGewerkArray(row.gewerk);
    if (!canon?.length) return false;
    return canon.includes(my);
  });
}
