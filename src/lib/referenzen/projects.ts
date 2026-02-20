import type { ProjectItem, Trade, ObjectType } from "./types";

/** Bild-Pfad für Projekte ohne echtes Cover – REPLACE mit /referenzen/<slug>/cover.jpg */
const PLACEHOLDER_IMAGE = "/placeholder.svg";

/**
 * PLACEHOLDER-Projekte – Eray bitte mit echten Referenzdaten ersetzen.
 * Cover/Gallery: Bilder in /public/referenzen/<slug>/ ablegen (cover.jpg, 1.jpg, 2.jpg, …).
 * Keine erfundenen Testimonials oder Kennzahlen; nur echte Angaben eintragen.
 */
export const projects: ProjectItem[] = [
  {
    slug: "sanierungsprojekt-unterschleissheim",
    title: "Unterschleißheim – Sanierungsprojekt",
    location: "Unterschleißheim",
    objectType: "Hausverwaltung",
    trades: ["elektrotechnik", "sanitaer-heizung", "innenausbau", "reinigung"],
    services: ["Elektroinstallation", "Sanitärinstallation", "Innenausbau", "Malerarbeiten", "Baufeinreinigung"],
    excerpt:
      "Komplettsanierung mit Elektro, Sanitär, Innenausbau und Malerarbeiten – koordiniert aus einer Hand. Projekt läuft noch, Abschluss voraussichtlich Ende Februar 2026.",
    coverImage: "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektro-sanitaer-innenausbau-muenchen-cover.jpg",
    gallery: [
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektroinstallation-verkabelung-muenchen-1.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-sanitaer-installation-badsanierung-muenchen-2.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-innenausbau-trockenbau-muenchen-3.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-malerarbeiten-oberflaechen-muenchen-4.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektro-schaltanlage-muenchen-5.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-sanitaer-vorwandmontage-muenchen-6.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-innenausbau-estrich-fliesen-muenchen-7.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-baufeinreinigung-muenchen-8.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektro-verkabelung-muenchen-9.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-sanitaer-heizung-installation-muenchen-10.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-innenausbau-malerarbeiten-muenchen-11.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektro-sanitaer-koordination-muenchen-12.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-ausbau-fertigstellung-muenchen-13.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-sanierung-projekt-muenchen-14.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-elektro-sanitaer-innenausbau-muenchen-15.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-abnahme-dokumentation-muenchen-16.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-fertigstellung-muenchen-17.jpg",
      "/referenzen/sanierungsprojekt-unterschleissheim/sanierungsprojekt-unterschleissheim-komplettsanierung-muenchen-18.jpg",
    ],
    scope: [
      "Elektroinstallation und Verkabelung",
      "Sanitärinstallation und Vorwandmontage",
      "Innenausbau (Trockenbau, Estrich, Fliesen)",
      "Malerarbeiten und Oberflächengestaltung",
      "Baufeinreinigung nach Abschluss",
    ],
    documentation: ["Fotodokumentation", "Abnahmeprotokoll"],
    year: "2026",
    featured: true,
  },
  {
    slug: "garagentor-germering",
    title: "Germering – Elektrisches Garagentor",
    location: "Germering",
    objectType: "Privat",
    trades: ["elektrotechnik"],
    services: ["Elektrisches Garagentor", "Elektroinstallation"],
    excerpt:
      "Installation eines elektrischen Garagentors mit Antrieb und Steuerung – professionell montiert und in Betrieb genommen.",
    coverImage: "/referenzen/garagentor-germering/garagentor-germering-elektrisches-garagentor-elektroinstallation-muenchen-cover.jpg",
    gallery: [
      "/referenzen/garagentor-germering/garagentor-germering-elektro-garagentor-montage-muenchen-1.jpg",
      "/referenzen/garagentor-germering/garagentor-germering-elektroinstallation-antrieb-steuerung-muenchen-2.jpg",
    ],
    scope: [
      "Montage des Garagentors",
      "Elektroinstallation für Antrieb",
      "Einrichtung der Steuerung",
      "Inbetriebnahme und Einweisung",
    ],
    documentation: ["Fotodokumentation", "Abnahmeprotokoll"],
    year: "2026",
    featured: false,
  },
  {
    slug: "neubau-gebaeudetechnik-muenchen",
    title: "München – Neubau mit kompletter Gebäudetechnik",
    location: "München",
    objectType: "Privat",
    trades: ["elektrotechnik", "sanitaer-heizung", "innenausbau", "reinigung"],
    services: [
      "Komplette Elektroinstallation mit Zählerschrank",
      "Verkabelung und KNX-Gebäudeautomation",
      "Anbindung Klimaanlage",
      "Server- und Netzwerktechnik",
      "Sanitärinstallation",
      "Malerarbeiten",
      "Baufeinreinigung",
    ],
    excerpt:
      "Neubau mit kompletter Elektrotechnik (Zählerschrank, Verkabelung, KNX, Klimaanlage, Server) sowie Sanitär, Malerarbeiten und Baufeinreinigung. Projektstart 2025, aktuell im laufenden Ausbau.",
    coverImage: "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-elektro-sanitaer-knx-klimaanlage-cover.jpg",
    gallery: [
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-elektro-verkabelung-installation-1.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-elektro-zaehlerschrank-verteilung-2.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-knx-gebaeudeautomation-4.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-knx-verteilerschrank-gebaeudeautomation-muenchen.png",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-klimaanlage-lueftung-5.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-server-netzwerktechnik-6.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-sanitaer-installation-7.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-malerarbeiten-oberflaechen-8.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-baufeinreinigung-9.jpg",
      "/referenzen/neubau-gebaeudetechnik-muenchen/neubau-gebaeudetechnik-muenchen-elektro-sanitaer-fertigstellung-10.jpg",
    ],
    scope: [
      "Planung und Installation der Hausverteilung mit Zählerschrank",
      "Komplette Wohnungs- und KNX-Verkabelung",
      "Vorbereitung und Anbindung der Klimaanlage",
      "Integration Server- und Netzwerktechnik",
      "Sanitärinstallation im Neubau",
      "Malerarbeiten und Oberflächenfertigstellung",
      "Baufeinreinigung vor Übergabe",
    ],
    documentation: ["Fotodokumentation"],
    year: "2025–laufend",
    featured: true,
  },
  {
    slug: "pv-anlage-oberhaching",
    title: "Oberhaching – PV-Anlage auf Wohnhaus",
    location: "Oberhaching",
    objectType: "Privat",
    trades: ["elektrotechnik"],
    services: [
      "Planung und Installation einer Photovoltaikanlage",
      "Montage der Unterkonstruktion auf Bestandsdach",
      "Verkabelung und Stringplanung",
      "DC- und AC-Anschluss der Anlage",
      "Einbindung in die Hausverteilung",
    ],
    excerpt:
      "PV-Anlage auf einem Wohnhaus in Oberhaching – von der Unterkonstruktion bis zum Anschluss in die Hausverteilung vollständig durch unser Elektroteam umgesetzt.",
    coverImage: "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-photovoltaik-elektroinstallation-muenchen-cover.jpg",
    gallery: [
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-pv-module-dach-montage-muenchen-1.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-unterkonstruktion-dachhaken-muenchen-2.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-elektro-verkabelung-stringplanung-muenchen-3.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-dc-ac-anschluss-installation-muenchen-4.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-pv-anlage-fertigstellung-muenchen-5.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-elektro-hausverteilung-anschluss-muenchen-6.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-pv-module-installation-muenchen-7.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-elektro-installation-muenchen-8.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-pv-anlage-dokumentation-muenchen-9.jpg",
      "/referenzen/pv-anlage-oberhaching/pv-anlage-oberhaching-photovoltaik-elektro-muenchen-10.jpg",
    ],
    scope: [
      "Aufmaß und Auslegung der PV-Anlage",
      "Montage der Dachhaken und Schienensysteme",
      "Verlegung der DC-Leitungen und Kabelwege",
      "Installation der Module und Inbetriebnahme",
      "Dokumentation für Netzbetreiber und Betreiber",
    ],
    documentation: ["Fotodokumentation"],
    year: "2025",
    featured: true,
  },
  {
    slug: "pv-anlage-oberschleissheim",
    title: "Oberschleißheim – PV-Anlage auf Wohnhaus",
    location: "Oberschleißheim",
    objectType: "Privat",
    trades: ["elektrotechnik"],
    services: [
      "Planung und Installation einer Photovoltaikanlage",
      "Montage der Unterkonstruktion auf Bestandsdach",
      "Verkabelung und Stringplanung",
      "DC- und AC-Anschluss der Anlage",
      "Installation des Wechselrichters",
      "Einbindung in die Hausverteilung",
    ],
    excerpt:
      "PV-Anlage auf einem Wohnhaus in Oberschleißheim – von der Montage der Unterkonstruktion über die Verkabelung bis zur Installation des Wechselrichters und Anschluss in die Hausverteilung vollständig durch unser Elektroteam umgesetzt.",
    coverImage: "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-photovoltaik-elektroinstallation-muenchen-cover.jpg",
    gallery: [
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-pv-module-dach-montage-muenchen-1.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-unterkonstruktion-schienensysteme-muenchen-2.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-elektro-verkabelung-dc-leitungen-muenchen-3.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-wechselrichter-installation-muenchen-4.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-elektro-verteilung-schutzorgane-muenchen-5.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-pv-anlage-inbetriebnahme-muenchen-6.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-elektro-hausverteilung-anschluss-muenchen-7.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-pv-module-installation-muenchen-8.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-elektro-installation-muenchen-9.jpg",
      "/referenzen/pv-anlage-oberschleissheim/pv-anlage-oberschleissheim-photovoltaik-elektro-muenchen-10.jpg",
    ],
    scope: [
      "Aufmaß und Auslegung der PV-Anlage",
      "Montage der Dachhaken und Schienensysteme",
      "Verlegung der DC-Leitungen und Kabelwege",
      "Installation der Module und Inbetriebnahme",
      "Montage und Anschluss des Wechselrichters",
      "Installation der Verteilung und Schutzorgane",
      "Dokumentation für Netzbetreiber und Betreiber",
    ],
    documentation: ["Fotodokumentation"],
    year: "2025",
    featured: true,
  },
  {
    slug: "projekt-fuerstenfeldbruck",
    title: "Fürstenfeldbruck – Elektro- und Sanitärinstallationen",
    location: "Fürstenfeldbruck",
    objectType: "Hausverwaltung",
    trades: ["elektrotechnik", "sanitaer-heizung"],
    services: [
      "Elektroinstallation und Hausverteilung",
      "Sanitärinstallation und Heizungstechnik",
      "Installation von Heizungsverteilern",
      "Verkabelung und Anschlüsse",
    ],
    excerpt:
      "Elektro- und Sanitärinstallationen für eine Hausverwaltung in Fürstenfeldbruck – von der Hausverteilung bis zur Heizungstechnik vollständig durch unser Team umgesetzt.",
    coverImage: "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-elektro-sanitaer-hausverwaltung-muenchen-cover.jpg",
    gallery: [
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-elektro-hausverteilung-installation-muenchen-1.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-sanitaer-heizung-installation-muenchen-2.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-heizungsverteiler-installation-muenchen-3.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-elektro-verkabelung-anschluesse-muenchen-4.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-sanitaer-warmwassertechnik-muenchen-5.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-elektro-sanitaer-fertigstellung-muenchen-6.jpg",
      "/referenzen/projekt-fuerstenfeldbruck/projekt-fuerstenfeldbruck-hausverwaltung-elektro-sanitaer-muenchen-7.jpg",
    ],
    scope: [
      "Planung und Installation der Hausverteilung",
      "Elektroinstallation in den Wohnungen",
      "Sanitärinstallation und Anschlüsse",
      "Installation von Heizungsverteilern",
      "Installation von Heizungs- und Warmwassertechnik",
      "Verkabelung und Anschlüsse für alle Gewerke",
    ],
    documentation: ["Fotodokumentation"],
    year: "2026",
    featured: true,
  },
];

/** Labels für Filter (Gewerk) */
export const tradeLabels: Record<Trade, string> = {
  elektrotechnik: "Elektrotechnik",
  "sanitaer-heizung": "Sanitär & Heizung",
  innenausbau: "Innenausbau",
  reinigung: "Reinigung",
  facility: "Facility",
};

/** Labels für Objekttyp */
export const objectTypeLabels: Record<ObjectType, string> = {
  Hausverwaltung: "Hausverwaltung",
  Gewerbe: "Gewerbe",
  Privat: "Privat",
  Industrie: "Industrie",
  Öffentlich: "Öffentlich",
};

/** Alle vorkommenden Trades aus projects (für Filter-Optionen) */
export const allTradesFromProjects: Trade[] = Array.from(
  new Set(projects.flatMap((p) => p.trades))
);

/** Alle vorkommenden ObjectTypes aus projects */
export const allObjectTypesFromProjects: ObjectType[] = Array.from(
  new Set(projects.map((p) => p.objectType))
);

/** Erlaubte Gewerk-Slugs für Route /projekte/[gewerk]. reinigung-facility = Projekte mit reinigung ODER facility. */
export const ALLOWED_GEWERK_SLUGS = [
  "elektrotechnik",
  "sanitaer-heizung",
  "innenausbau",
  "reinigung",
  "facility",
  "reinigung-facility",
] as const;

export type GewerkSlug = (typeof ALLOWED_GEWERK_SLUGS)[number];

/** Anzeige-Label pro Gewerk-Slug (für Pill/Breadcrumb). */
export const gewerkSlugToLabel: Record<GewerkSlug, string> = {
  elektrotechnik: "Elektrotechnik",
  "sanitaer-heizung": "Sanitär & Heizung",
  innenausbau: "Innenausbau",
  reinigung: "Reinigung",
  facility: "Facility",
  "reinigung-facility": "Reinigung & Facility",
};

/** Hero-Überschriften pro Gewerk für /projekte/[gewerk]. */
export const gewerkHeroHeadings: Record<
  GewerkSlug,
  { eyebrow: string; title: string; subline: string }
> = {
  elektrotechnik: {
    eyebrow: "ELEKTROTECHNIK",
    title: "Referenzprojekte Elektrotechnik",
    subline:
      "E-Check, Wartung, Installation – belegbare Qualität aus München.",
  },
  "sanitaer-heizung": {
    eyebrow: "SANITÄR & HEIZUNG",
    title: "Referenzprojekte Sanitär & Heizung",
    subline:
      "SHK-Wartung, Heizung, Sanierung – ein Ansprechpartner, dokumentiert.",
  },
  innenausbau: {
    eyebrow: "INNENAUSBAU",
    title: "Referenzprojekte Innenausbau",
    subline:
      "Malerarbeiten, Trockenbau, Boden – termingerecht und abgenommen.",
  },
  reinigung: {
    eyebrow: "REINIGUNG",
    title: "Referenzprojekte Reinigung",
    subline:
      "Unterhaltsreinigung, Grundreinigung, Sonderreinigung – dokumentierte Qualität.",
  },
  facility: {
    eyebrow: "FACILITY",
    title: "Referenzprojekte Facility",
    subline:
      "Hausmeisterservice, Winterdienst, Grünpflege – ein Ansprechpartner für alle Gewerke.",
  },
  "reinigung-facility": {
    eyebrow: "REINIGUNG & FACILITY",
    title: "Referenzprojekte Reinigung & Facility",
    subline:
      "Reinigung, Hausmeisterservice und mehr – koordiniert aus einer Hand.",
  },
};

/** Prüft, ob ein Slug ein gültiger Gewerk-Slug für /projekte/[gewerk] ist. */
export function isAllowedGewerkSlug(slug: string): slug is GewerkSlug {
  return (ALLOWED_GEWERK_SLUGS as readonly string[]).includes(slug);
}

/** Projekte nach Gewerk filtern (für /projekte/[gewerk]). reinigung-facility = reinigung ODER facility. */
export function getProjectsByGewerk(gewerkSlug: GewerkSlug): ProjectItem[] {
  if (gewerkSlug === "reinigung-facility") {
    return projects.filter(
      (p) => p.trades.includes("reinigung") || p.trades.includes("facility")
    );
  }
  return projects.filter((p) => p.trades.includes(gewerkSlug as Trade));
}

/** Einzelnes Projekt per Slug */
export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projekte mit Testimonial (für ReferenzHighlights) */
export function getProjectsWithTestimonial(): ProjectItem[] {
  return projects.filter((p) => p.testimonial);
}

/** Featured Projekte */
export function getFeaturedProjects(): ProjectItem[] {
  return projects.filter((p) => p.featured);
}
