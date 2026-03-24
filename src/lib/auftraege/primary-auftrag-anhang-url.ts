/**
 * Haupt-PDF-Link für SPM-Aufträge: DB-Spalte anhang_url (n8n) oder erstes Element aus angebot_rechnung_urls.
 */
export function primaryAuftragAnhangUrl(a: {
  anhang_url?: string | null;
  angebot_rechnung_urls?: string[] | null;
}): string | null {
  const direct = (a.anhang_url ?? "").trim();
  if (direct) return direct;
  const arr = Array.isArray(a.angebot_rechnung_urls) ? a.angebot_rechnung_urls : [];
  for (const u of arr) {
    if (typeof u === "string" && u.trim() !== "") return u.trim();
  }
  return null;
}
