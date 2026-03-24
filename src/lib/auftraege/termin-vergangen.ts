import type { VergangenerTerminEintrag } from "@/src/types/handwerker-auftrag";
import { STATUS, TERMIN_TYP } from "@/src/config/businessConfig";

const DEFAULT_DURATION_MS = 60 * 60 * 1000;

export function parseTerminVergangen(raw: unknown): VergangenerTerminEintrag[] {
  if (!Array.isArray(raw)) return [];
  const out: VergangenerTerminEintrag[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const termin_start = typeof o.termin_start === "string" && o.termin_start.trim() ? o.termin_start.trim() : "";
    if (!termin_start) continue;
    const termin_ende =
      typeof o.termin_ende === "string" && o.termin_ende.trim() ? o.termin_ende.trim() : null;
    const termin_typ =
      typeof o.termin_typ === "string" && o.termin_typ.trim() ? o.termin_typ.trim() : null;
    const abgelegt_am =
      typeof o.abgelegt_am === "string" && o.abgelegt_am.trim() ? o.abgelegt_am.trim() : "";
    if (!abgelegt_am) continue;
    out.push({ termin_start, termin_ende, termin_typ, abgelegt_am });
  }
  return out;
}

/** Besichtigung mit Start gesetzt; planmäßiges Ende (oder Start+1h) liegt in der Vergangenheit. */
export function isBesichtigungZeitlichAbgeschlossen(row: {
  termin_start?: string | null;
  termin_ende?: string | null;
  termin_typ?: string | null;
}): boolean {
  const typ = (row.termin_typ ?? "").trim();
  if (typ !== TERMIN_TYP.BESICHTIGUNG) return false;
  const ts = (row.termin_start ?? "").trim();
  if (!ts) return false;
  const start = new Date(ts);
  if (Number.isNaN(start.getTime())) return false;
  const te = (row.termin_ende ?? "").trim();
  const end = te
    ? new Date(te)
    : new Date(start.getTime() + DEFAULT_DURATION_MS);
  if (Number.isNaN(end.getTime())) return false;
  return end.getTime() < Date.now();
}

export type BesichtigungAutoArchivePayload = {
  termin_vergangen: VergangenerTerminEintrag[];
  termin_start: null;
  termin_ende: null;
  termin_typ: null;
  board_status: string;
};

/**
 * DB-Update für abgelaufene Besichtigung: Historie + aktive Terminfelder leeren + Board „Nachbereitung“.
 * `matchTerminStart` für optimistischen Abgleich (.eq), damit doppelte Requests keinen doppelten Historieneintrag erzeugen.
 */
export function getBesichtigungAutoArchiveUpdate(row: {
  termin_start?: string | null;
  termin_ende?: string | null;
  termin_typ?: string | null;
  termin_vergangen?: unknown;
}): { payload: BesichtigungAutoArchivePayload; matchTerminStart: string } | null {
  if (!isBesichtigungZeitlichAbgeschlossen(row)) return null;
  const tsRaw = (row.termin_start ?? "").trim();
  if (!tsRaw) return null;
  const startDate = new Date(tsRaw);
  if (Number.isNaN(startDate.getTime())) return null;
  const te = (row.termin_ende ?? "").trim();
  const endDate = te
    ? new Date(te)
    : new Date(startDate.getTime() + DEFAULT_DURATION_MS);
  const endIso = Number.isNaN(endDate.getTime())
    ? new Date(startDate.getTime() + DEFAULT_DURATION_MS).toISOString()
    : endDate.toISOString();
  const startIso = startDate.toISOString();
  const prev = parseTerminVergangen(row.termin_vergangen);
  const entry: VergangenerTerminEintrag = {
    termin_start: startIso,
    termin_ende: endIso,
    termin_typ: TERMIN_TYP.BESICHTIGUNG,
    abgelegt_am: new Date().toISOString(),
  };
  return {
    payload: {
      termin_vergangen: [...prev, entry],
      termin_start: null,
      termin_ende: null,
      termin_typ: null,
      board_status: STATUS.NACHBEREITUNG,
    },
    matchTerminStart: tsRaw,
  };
}
