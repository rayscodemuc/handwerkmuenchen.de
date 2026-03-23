/**
 * Leitet aus SPM-Feldern (auftragstyp, optional Aufgabe) das Kanban-Gewerk ab.
 * Soll mit n8n/Excel-Werten klarkommen (Groß/Klein, Umlaute, Zusatztext).
 */

const CANONICAL = ["Elektro", "Sanitär", "Ausbau", "Reinigung", "Facility"] as const;
export type CanonicalGewerk = (typeof CANONICAL)[number];

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/\s+/g, " ");
}

function resolveGewerkFromText(text: string | null | undefined): CanonicalGewerk | null {
  const raw = (text ?? "").trim();
  if (!raw) return null;
  const n = norm(raw);

  for (const g of CANONICAL) {
    if (norm(g) === n) return g;
  }

  const rules: Array<{ re: RegExp; gewerk: CanonicalGewerk }> = [
    {
      re: /elektro|e-technik|elektrik|installations?elektro|starkstrom|verteiler|beleuchtung/,
      gewerk: "Elektro",
    },
    {
      re: /sanit(ae|a)r|heizung|wasser|rohrleitung|\brohr\b|bad\b|wc\b|kl(o|ö)spül|heizungs?bau|\bshk\b/,
      gewerk: "Sanitär",
    },
    {
      re: /reinigung|grundreinigung|unterhalts?reinigung|fensterreinigung|bauendreinigung/,
      gewerk: "Reinigung",
    },
    {
      re: /facility|hausmeister|gr(u|ü)npflege|winterdienst|tiefgarage|objektbetreuung|geb(ae|ä)udeservice/,
      gewerk: "Facility",
    },
    {
      re: /ausbau|maler|tapezier|anstrich|bodenleger|\bflies|\btischler|schreiner|trockenbau|innenausbau/,
      gewerk: "Ausbau",
    },
  ];

  for (const { re, gewerk } of rules) {
    if (re.test(n)) return gewerk;
  }

  const alias: Record<string, CanonicalGewerk> = {
    elektro: "Elektro",
    elektrotechnik: "Elektro",
    e_technik: "Elektro",
    sanitaer: "Sanitär",
    heizung: "Sanitär",
    reinigung: "Reinigung",
    facility: "Facility",
    ausbau: "Ausbau",
    maler: "Ausbau",
    malerarbeiten: "Ausbau",
  };
  if (alias[n]) return alias[n];

  for (const g of CANONICAL) {
    const gn = norm(g);
    if (n.includes(gn)) return g;
    const parts = n.split(/[,;/|]+/).map((p) => norm(p));
    if (parts.some((p) => p === gn)) return g;
  }

  return null;
}

/**
 * @param auftragstyp – Feld aus `auftraege.auftragstyp`
 * @param aufgabeFallback – optional `auftraege.aufgabe`, wenn Typ leer oder nicht erkannt
 * @returns ein Eintrag für `tickets.gewerk` (text[]) oder null
 */
export function mapAuftragstypToGewerk(
  auftragstyp: string | null | undefined,
  aufgabeFallback?: string | null
): string[] | null {
  const fromTyp = resolveGewerkFromText(auftragstyp);
  if (fromTyp) return [fromTyp];
  const fromAufgabe = resolveGewerkFromText(aufgabeFallback);
  if (fromAufgabe) return [fromAufgabe];
  return null;
}
