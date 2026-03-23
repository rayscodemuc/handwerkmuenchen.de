/** Gleiche Werte wie in `tickets.gewerk` (text[]) und Karten-Badges im Admin-Board. */
export const GEWERKE_OPTIONS = [
  { value: "Elektro", label: "Elektro" },
  { value: "Sanitär", label: "Sanitär" },
  { value: "Ausbau", label: "Ausbau" },
  { value: "Reinigung", label: "Reinigung" },
  { value: "Facility", label: "Facility" },
] as const;

export type GewerkOptionValue = (typeof GEWERKE_OPTIONS)[number]["value"];
