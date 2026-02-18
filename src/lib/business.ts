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
  phoneDisplay?: string; // Human-readable format (e.g. "+49 (0)123 4567890")
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
  name: "handwerkmuenchen.de",
  // TODO: Rechtlichen Firmennamen eintragen, falls abweichend
  // legalName: "Musterfirma GmbH",
  
  url: "https://handwerkmuenchen.de",
  
  phone: "+491234567890", // E.164 format (Dummy)
  phoneDisplay: "+49 (0)123 4567890", // Human-readable format
  hotlinePhone: "+491234567891", // E.164 format for 24/7 hotline
  hotlinePhoneDisplay: "+49 (0)123 4567891", // Human-readable format for hotline
  email: "info@handwerkmuenchen.de",
  
  // Adresse (öffentlich)
  address: {
    street: "Friedrichstraße 11",
    zip: "80801",
    city: "München",
    region: "Bayern",
    country: "DE",
  },
  hasPublicAddress: true,
  
  // Service-Gebiet
  areasServed: ["München"],
  
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
