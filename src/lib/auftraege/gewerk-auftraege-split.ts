import { parseISO, isValid } from "date-fns";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { kanbanPositionSortKey } from "@/lib/auftraege/kanban-position-sort-key";

const DEFAULT_SLOT_MS = 60 * 60 * 1000;

/** Ende des Termin-Slots (für „läuft noch“ / „kommend“). */
export function terminSlotEndMs(
  a: Pick<HandwerkerAuftrag, "termin_start" | "termin_ende">
): number | null {
  const ts = (a.termin_start ?? "").trim();
  if (!ts) return null;
  const start = parseISO(ts);
  if (!isValid(start)) return null;
  const te = (a.termin_ende ?? "").trim();
  if (te) {
    const end = parseISO(te);
    if (isValid(end)) return end.getTime();
  }
  return start.getTime() + DEFAULT_SLOT_MS;
}

export function terminSlotStartMs(
  a: Pick<HandwerkerAuftrag, "termin_start">
): number | null {
  const ts = (a.termin_start ?? "").trim();
  if (!ts) return null;
  const start = parseISO(ts);
  if (!isValid(start)) return null;
  return start.getTime();
}

/** Termin liegt in der Zukunft oder der Slot ist gerade aktiv. */
export function isKommenderOderLaufenderTermin(
  a: Pick<HandwerkerAuftrag, "termin_start" | "termin_ende">
): boolean {
  const endMs = terminSlotEndMs(a);
  if (endMs == null) return false;
  return endMs >= Date.now();
}

export function isTerminGeradeAktiv(
  a: Pick<HandwerkerAuftrag, "termin_start" | "termin_ende">
): boolean {
  const startMs = terminSlotStartMs(a);
  const endMs = terminSlotEndMs(a);
  if (startMs == null || endMs == null) return false;
  const now = Date.now();
  return now >= startMs && now <= endMs;
}

/**
 * Kommende/laufende Termine zuerst (nach Startzeit), Rest nach Eingang (neu zuerst).
 * Kein Auftrag doppelt.
 */
export function splitAuftraegeKommendeUndWeitere(
  auftraege: HandwerkerAuftrag[]
): { kommende: HandwerkerAuftrag[]; weitere: HandwerkerAuftrag[] } {
  const kommende = auftraege.filter(isKommenderOderLaufenderTermin);
  kommende.sort((a, b) => {
    const ta = terminSlotStartMs(a) ?? 0;
    const tb = terminSlotStartMs(b) ?? 0;
    return ta - tb;
  });
  const kommendeIds = new Set(kommende.map((x) => x.id));
  const weitere = auftraege.filter((a) => !kommendeIds.has(a.id));
  weitere.sort((a, b) => {
    const pa = kanbanPositionSortKey(a.board_position);
    const pb = kanbanPositionSortKey(b.board_position);
    if (pa !== pb) return pa - pb;
    const ca = a.created_at ? new Date(String(a.created_at)).getTime() : 0;
    const cb = b.created_at ? new Date(String(b.created_at)).getTime() : 0;
    return cb - ca;
  });
  return { kommende, weitere };
}
