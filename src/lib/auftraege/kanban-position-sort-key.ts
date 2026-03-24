/**
 * Kanban-Sortierung: PostgREST/JSON kann INTEGER als Zahl oder String liefern.
 * Fehlender Wert → ans Ende (wie bisher MAX_SAFE_INTEGER).
 */
export function kanbanPositionSortKey(raw: unknown): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw);
    if (Number.isFinite(n)) return n;
  }
  return Number.MAX_SAFE_INTEGER;
}
