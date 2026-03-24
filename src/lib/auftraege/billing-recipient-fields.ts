/**
 * Postgres/PostgREST liefert JSON-Keys exakt wie der Spaltenname in der DB.
 * Häufige Abweichung: Umlaut (ä) vs. Transkription (ae) — z. B. leistungsempfänger vs. leistungsempfaenger.
 */

import { canonicalizeGewerkArray } from "@/lib/auftraege/canonical-gewerk";

const LEISTUNG_KEYS = [
  "leistungsempfaenger",
  "leistungsempfänger",
  "leistungs_empfaenger",
  "leistung_empfaenger",
] as const;
const RECHNUNG_KEYS = [
  "rechnungsempfaenger",
  "rechnungsempfänger",
  "rechnungs_empfaenger",
  "rechnung_empfaenger",
] as const;

function firstNonEmptyString(
  row: Record<string, unknown>,
  keys: readonly string[]
): string | null {
  for (const k of keys) {
    const v = row[k];
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  return null;
}

/** Kanonische Felder leistungsempfaenger / rechnungsempfaenger setzen (ae), falls nur Varianten belegt sind. */
export function normalizeAuftragRow(row: Record<string, unknown>): Record<string, unknown> {
  const leistung = firstNonEmptyString(row, LEISTUNG_KEYS);
  const rechnung = firstNonEmptyString(row, RECHNUNG_KEYS);
  const out = { ...row };
  if (leistung != null) out.leistungsempfaenger = leistung;
  if (rechnung != null) out.rechnungsempfaenger = rechnung;
  out.gewerk = canonicalizeGewerkArray(row.gewerk);
  return out;
}

export function resolveLeistungsempfaenger(row: object): string | null {
  return firstNonEmptyString(row as Record<string, unknown>, LEISTUNG_KEYS);
}

export function resolveRechnungsempfaenger(row: object): string | null {
  return firstNonEmptyString(row as Record<string, unknown>, RECHNUNG_KEYS);
}
