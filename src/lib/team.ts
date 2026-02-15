/**
 * Team-Daten für Über-uns: GU-Lead + Meisterrunde (4 Verantwortliche).
 * Bilder: /images/team/<slug>.jpg (Platzhalter austauschbar).
 */

export const guLead = {
  slug: "gu-lead",
  name: "Name GU-Lead",
  role: "Generalunternehmer / Projektverantwortung",
  claim: "Ein Vertrag, ein Projektplan, eine Übergabe – als Generalunternehmer bin ich euer zentraler Ansprechpartner und sorge dafür, dass die Gewerke sauber ineinandergreifen.",
  tags: ["Koordination", "Terminplan", "Übergabe & Doku"],
  image: "/images/team/gu-lead.jpg",
} as const;

export const meisterrunde = [
  {
    slug: "elektrotechnik",
    name: "Name Elektro",
    role: "Elektromeister (verantwortlich)",
    claim: "Elektrotechnik aus einer Hand – von Planung bis Abnahme, dokumentiert und abnahmesicher.",
    tags: ["Elektro", "Abnahme", "GU-Abwicklung"],
    badges: ["Meisterbetrieb", "Abnahme & Doku", "GU-Abwicklung"],
    image: "/images/team/elektrotechnik.jpg",
    href: "/leistungen/elektrotechnik",
  },
  {
    slug: "sanitaer-heizung",
    name: "Name SHK",
    role: "SHK-Meister (verantwortlich)",
    claim: "Sanitär und Heizung aus einer Hand – verantwortlich von der Planung bis zur Übergabe.",
    tags: ["SHK", "Abnahme", "GU-Abwicklung"],
    badges: ["Meisterbetrieb", "Abnahme & Doku", "GU-Abwicklung"],
    image: "/images/team/sanitaer-heizung.jpg",
    href: "/leistungen/sanitaer-heizung",
  },
  {
    slug: "innenausbau",
    name: "Name Innenausbau",
    role: "Meister Innenausbau (verantwortlich)",
    claim: "Maler, Boden, Fliesen, Estrich – ein Verantwortlicher für alle Ausbaugewerke und dokumentierte Übergabe.",
    tags: ["Ausbau", "Übergabe", "Doku"],
    badges: ["Meistergeführt", "Ausbaugewerke", "Übergabe & Doku"],
    image: "/images/team/innenausbau.jpg",
    href: "/leistungen/innenausbau",
    note: "Innenausbau umfasst Maler, Boden, Fliesen und Estrich.",
  },
  {
    slug: "reinigung-facility",
    name: "Name Reinigung & Facility",
    role: "Leitung Reinigung & Facility",
    claim: "Reinigung und Facility aus einer Hand – Qualitätsstandards und dokumentierte Leistung, ohne Meistertitel.",
    tags: ["Reinigung", "Facility", "Dokumentation"],
    badges: ["Fachbetrieb", "Qualitätsstandards", "Dokumentierte Leistung"],
    image: "/images/team/reinigung-facility.jpg",
    href: "/leistungen/reinigung",
  },
] as const;
