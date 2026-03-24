import { GEWERKE_OPTIONS } from "@/src/config/gewerkeOptions";

const CANONICAL_VALUES = GEWERKE_OPTIONS.map((o) => o.value);

function normKey(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss");
}

/**
 * API/DB kann `gewerk` als text[], einzelnen String oder leer liefern.
 * Mappt Schreibweisen (z. B. Sanitaer) auf die Kanban-Kanonik (Sanitär).
 */
export function canonicalizeGewerkArray(raw: unknown): string[] | null {
  if (raw == null) return null;

  let items: string[] = [];
  if (Array.isArray(raw)) {
    items = raw.map((x) => String(x ?? "").trim()).filter((s) => s.length > 0);
  } else if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return null;
    try {
      const parsed = JSON.parse(t) as unknown;
      if (Array.isArray(parsed)) {
        return canonicalizeGewerkArray(parsed);
      }
    } catch {
      /* einzelnes Label */
    }
    items = [t];
  } else {
    return null;
  }

  if (items.length === 0) return null;

  const out: string[] = [];
  for (const item of items) {
    const n = normKey(item);
    const match = CANONICAL_VALUES.find((c) => normKey(c) === n);
    out.push(match ?? item);
  }
  return out.length > 0 ? out : null;
}
