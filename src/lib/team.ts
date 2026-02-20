/**
 * Team-Daten für Über-uns: GU-Lead + Meisterrunde (4 Verantwortliche).
 * Bilder: /images/team/<slug>.jpg (Platzhalter austauschbar).
 */

export const guLead = {
  slug: "gu-lead",
  name: "Eray Özcan",
  role: "Projektverantwortung",
  claim: "Ein Vertrag, ein Projektplan, eine Übergabe – als Generalunternehmer bin ich euer zentraler Ansprechpartner und sorge dafür, dass die Gewerke sauber ineinandergreifen.",
  tags: ["Koordination", "Terminplan", "Übergabe & Doku"],
  image: "/images/team/generalunternehmer-gu-lead-muenchen.png",
} as const;

export const meisterrunde = [
  {
    slug: "elektrotechnik",
    name: "Marc Pauli",
    role: "Elektromeister (verantwortlich)",
    claim: "Elektrotechnik aus einer Hand – von Planung bis Abnahme, dokumentiert und abnahmesicher.",
    tags: ["Elektro", "Abnahme", "GU-Abwicklung"],
    badges: ["Meisterbetrieb", "Abnahme & Doku", "GU-Abwicklung"],
    image: "/images/team/elektromeister-messung-elektroverteilung-muenchen.png",
    href: "/leistungen/elektrotechnik",
  },
  {
    slug: "sanitaer-heizung",
    name: "Florian Pendele",
    role: "SHK-Meister (verantwortlich)",
    claim: "Sanitär und Heizung aus einer Hand – verantwortlich von der Planung bis zur Übergabe.",
    tags: ["SHK", "Abnahme", "GU-Abwicklung"],
    badges: ["Meisterbetrieb", "Abnahme & Doku", "GU-Abwicklung"],
    image: "/images/team/shk-meister-sanitaer-heizung-muenchen.png",
    href: "/leistungen/sanitaer-heizung",
  },
  {
    slug: "innenausbau",
    name: "Gökhan Koc",
    role: "Meister Innenausbau (verantwortlich)",
    claim: "Maler, Boden, Fliesen, Estrich – ein Verantwortlicher für alle Ausbaugewerke und dokumentierte Übergabe.",
    tags: ["Ausbau", "Übergabe", "Doku"],
    badges: ["Meistergeführt", "Ausbaugewerke", "Übergabe & Doku"],
    image: "/images/team/meister-innenausbau-muenchen.png",
    href: "/leistungen/innenausbau",
    note: "Innenausbau umfasst Maler, Boden, Fliesen und Estrich.",
  },
  {
    slug: "reinigung-facility",
    name: "Daniel Müller",
    role: "Leitung Reinigung & Facility",
    claim: "Reinigung und Facility aus einer Hand – Qualitätsstandards und dokumentierte Leistung, ohne Meistertitel.",
    tags: ["Reinigung", "Facility", "Dokumentation"],
    badges: ["Fachbetrieb", "Qualitätsstandards", "Dokumentierte Leistung"],
    image: "/images/team/reinigung-facility.jpg",
    href: "/leistungen/reinigung",
  },
] as const;
