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
    slug: "wohnanlage-schwabing",
    title: "Wohnanlage Schwabing – E-Check & Sanierung",
    location: "München-Schwabing",
    objectType: "Hausverwaltung",
    trades: ["elektrotechnik", "innenausbau"],
    services: ["E-Check", "Malerarbeiten", "Dokumentation"],
    excerpt:
      "Vollständiger E-Check und Malerarbeiten in einer Mehrfamilienanlage – dokumentiert und termingerecht übergeben.",
    coverImage: "/referenzen/wohnanlage-schwabing/cover.jpg",
    gallery: [
      "/referenzen/wohnanlage-schwabing/1.jpg",
      "/referenzen/wohnanlage-schwabing/2.jpg",
    ],
    metrics: [
      { label: "Wohneinheiten", value: "PLACEHOLDER" },
      { label: "Jahr", value: "PLACEHOLDER" },
    ],
    scope: [
      "E-Check inkl. Protokoll",
      "Anstrich Treppenhaus und Flure",
      "Abnahme mit Hausverwaltung",
    ],
    documentation: ["E-Check Protokoll", "Fotodoku"],
    year: "PLACEHOLDER",
    featured: true,
  },
  {
    slug: "buero-muc-maxvorstadt",
    title: "Bürogebäude Maxvorstadt – Unterhaltsreinigung",
    location: "München-Maxvorstadt",
    objectType: "Gewerbe",
    trades: ["reinigung"],
    services: ["Unterhaltsreinigung", "Büroreinigung"],
    excerpt:
      "Regelmäßige Unterhalts- und Büroreinigung mit festem Team und dokumentierter Qualitätskontrolle.",
    coverImage: PLACEHOLDER_IMAGE,
    gallery: [],
    scope: ["Tägliche Unterhaltsreinigung", "Wöchentliche Tiefenreinigung"],
    documentation: ["Checklisten", "Abnahmeprotokoll"],
    year: "PLACEHOLDER",
    featured: true,
  },
  {
    slug: "gewerbeobjekt-giesing",
    title: "Gewerbeobjekt Giesing – SHK & Elektro",
    location: "München-Giesing",
    objectType: "Gewerbe",
    trades: ["elektrotechnik", "sanitaer-heizung"],
    services: ["Heizungswartung", "Elektroprüfung", "Störungsbehebung"],
    excerpt:
      "Koordinierte Wartung und Störungsbehebung für Heizung und Elektrik – ein Ansprechpartner für die Hausverwaltung.",
    coverImage: PLACEHOLDER_IMAGE,
    gallery: [],
    metrics: [{ label: "Objektfläche", value: "PLACEHOLDER" }],
    scope: ["Heizungswartung", "E-Check", "Protokollierung"],
    documentation: ["Wartungsprotokoll", "E-Check Protokoll"],
    year: "PLACEHOLDER",
  },
  {
    slug: "praxis-reinigung-muc",
    title: "Praxisreinigung München – Dokumentierte Qualität",
    location: "München",
    objectType: "Gewerbe",
    trades: ["reinigung"],
    services: ["Praxisreinigung", "Hygienestandards"],
    excerpt:
      "Reinigung einer medizinischen Praxis nach vereinbarten Hygienestandards mit Checklisten und Abnahme.",
    coverImage: PLACEHOLDER_IMAGE,
    gallery: [],
    scope: ["Tägliche Praxisreinigung", "Desinfektion Flächen"],
    documentation: ["Checklisten", "Abnahme"],
    year: "PLACEHOLDER",
  },
  {
    slug: "mehrfamilienhaus-facility",
    title: "Mehrfamilienhaus – Hausmeisterservice & Winterdienst",
    location: "München",
    objectType: "Hausverwaltung",
    trades: ["facility"],
    services: ["Hausmeisterservice", "Winterdienst", "Objektkontrolle"],
    excerpt:
      "Fester Ansprechpartner für Hausmeisterservice und Winterdienst – planbare Abläufe und klare Meldelogik.",
    coverImage: PLACEHOLDER_IMAGE,
    gallery: [],
    scope: ["Regelmäßige Objektkontrollen", "Winterdienst", "Meldemanagement"],
    documentation: ["Protokolle", "Einsatzdokumentation"],
    year: "PLACEHOLDER",
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
