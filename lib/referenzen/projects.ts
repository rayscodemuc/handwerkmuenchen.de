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
