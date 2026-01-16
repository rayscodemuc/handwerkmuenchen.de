/**
 * Zentrale Business-Konfiguration für SEO und LocalBusiness Schema
 * Single Source of Truth für Unternehmens-Stammdaten
 * 
 * Diese Datei wird später für Schema.org JSON-LD Generierung verwendet.
 */

export interface BusinessAddress {
  street: string;
  zip: string;
  city: string;
  region?: string;
  country: string;
}

export interface BusinessGeo {
  latitude: number;
  longitude: number;
}

export interface OpeningHoursSpecification {
  dayOfWeek: string[]; // Schema.org day strings: "Monday", "Tuesday", etc.
  opens: string; // HH:mm format
  closes: string; // HH:mm format
}

export interface BusinessConfig {
  name: string;
  legalName?: string;
  url: string;
  phone: string; // E.164 format preferred
  phoneDisplay?: string; // Human-readable format (e.g. "+49 (0)89 25006355")
  hotlinePhone?: string; // E.164 format for 24/7 hotline
  hotlinePhoneDisplay?: string; // Human-readable format for hotline
  email?: string;
  address?: BusinessAddress;
  hasPublicAddress: boolean; // If false, use serviceArea instead
  serviceArea?: string[]; // Array of city/region names
  openingHoursSpecification?: OpeningHoursSpecification[];
  areasServed: string[]; // Service areas (cities/regions)
  sameAs: string[]; // Google Business Profile + Social Media links
  geo?: BusinessGeo;
}

/**
 * Zentrale Business-Konfiguration
 * 
 * TODO: Bitte folgende Werte noch eintragen/überprüfen:
 * - legalName: Rechtlicher Firmenname (falls abweichend von name)
 * - geo: Koordinaten der Hauptadresse (für LocalBusiness Schema)
 * - openingHoursSpecification: Öffnungszeiten (falls verfügbar)
 * - sameAs: Google Business Profile URL und Social Media Links
 */
export const BUSINESS: BusinessConfig = {
  name: "MR Clean Services",
  // TODO: Rechtlichen Firmennamen eintragen, falls abweichend
  // legalName: "MR Clean Services GmbH",
  
  url: "https://www.mr-clean.services",
  
  phone: "+498925006355", // E.164 format
  phoneDisplay: "+49 (0)89 25006355", // Human-readable format
  hotlinePhone: "+498925006356", // E.164 format for 24/7 hotline
  hotlinePhoneDisplay: "+49 (0)89 25006356", // Human-readable format for hotline
  email: "kontakt@mr-clean.services",
  
  // Adresse (öffentlich)
  address: {
    street: "Landsbergerstr. 456 RGB",
    zip: "81241",
    city: "München",
    region: "Bayern",
    country: "DE",
  },
  hasPublicAddress: true,
  
  // Service-Gebiete (Städte/Regionen)
  areasServed: [
    "München",
    "Hamburg",
    "Berlin",
    "Augsburg",
    "Nürnberg",
    "Ingolstadt",
    "Frankfurt",
    // TODO: Weitere Service-Gebiete hinzufügen falls nötig
  ],
  
  // Öffnungszeiten (optional)
  // TODO: Öffnungszeiten eintragen falls verfügbar
  // openingHoursSpecification: [
  //   {
  //     dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //     opens: "08:00",
  //     closes: "18:00",
  //   },
  //   {
  //     dayOfWeek: ["Saturday"],
  //     opens: "09:00",
  //     closes: "13:00",
  //   },
  // ],
  
  // Google Business Profile & Social Media Links
  // TODO: Google Business Profile URL eintragen
  // TODO: Social Media Links hinzufügen (Facebook, Instagram, LinkedIn, etc.)
  sameAs: [
    // "https://www.google.com/maps?cid=...", // Google Business Profile
    // "https://www.facebook.com/...",
    // "https://www.instagram.com/...",
    // "https://www.linkedin.com/company/...",
  ],
  
  // Geo-Koordinaten (optional, für LocalBusiness Schema)
  // TODO: Koordinaten der Hauptadresse eintragen (z.B. via Google Maps)
  // geo: {
  //   latitude: 48.1351, // Beispiel: München Zentrum
  //   longitude: 11.5820,
  // },
};
