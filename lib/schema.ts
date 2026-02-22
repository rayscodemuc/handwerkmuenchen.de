/**
 * Schema.org JSON-LD Helper Functions
 * Generiert strukturierte Daten für SEO und LocalBusiness
 */

import { BUSINESS, type BusinessConfig } from "./business";

/**
 * Filtert ungültige URLs aus einem Array (entfernt TODO-Strings, Platzhalter, etc.)
 */
function filterValidUrls(urls: string[] | undefined): string[] {
  if (!urls || urls.length === 0) return [];
  
  return urls.filter((url) => {
    // Entferne leere Strings, Platzhalter mit "...", und ungültige URLs
    if (!url || url.trim() === "") return false;
    if (url.includes("...")) return false;
    if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
    return true;
  });
}

/**
 * Baut ein LocalBusiness Schema.org JSON-LD Objekt
 */
export function buildLocalBusinessSchema(config: BusinessConfig) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${config.url}/#business`,
    name: config.name,
    url: config.url,
  };

  // Optional: Legal Name
  if (config.legalName) {
    schema.legalName = config.legalName;
  }

  // Optional: Email
  if (config.email) {
    schema.email = config.email;
  }

  // Address (PostalAddress)
  if (config.address && config.hasPublicAddress) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      postalCode: config.address.zip,
      addressCountry: config.address.country,
    };

    if (config.address.region) {
      schema.address.addressRegion = config.address.region;
    }
  }

  // Service Area (wenn keine öffentliche Adresse)
  if (!config.hasPublicAddress && config.serviceArea && config.serviceArea.length > 0) {
    schema.areaServed = config.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    }));
  } else if (config.areasServed && config.areasServed.length > 0) {
    // Areas Served als einfache Strings oder City Objects
    schema.areaServed = config.areasServed.map((area) => ({
      "@type": "City",
      name: area,
    }));
  }

  // Geo-Koordinaten
  if (config.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: config.geo.latitude,
      longitude: config.geo.longitude,
    };
  }

  // Öffnungszeiten
  if (config.openingHoursSpecification && config.openingHoursSpecification.length > 0) {
    schema.openingHoursSpecification = config.openingHoursSpecification.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    }));
  }

  // Social Media & Google Business Profile Links
  const validSameAs = filterValidUrls(config.sameAs);
  if (validSameAs.length > 0) {
    schema.sameAs = validSameAs;
  }

  return schema;
}

/**
 * Baut ein WebSite Schema.org JSON-LD Objekt mit SearchAction
 */
export function buildWebsiteSchema(config: BusinessConfig) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${config.url}/#website`,
    url: config.url,
    name: config.name,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.url}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return schema;
}

/**
 * Baut ein Service Schema.org JSON-LD Objekt
 * Für Hub-Seiten, die spezifische Services beschreiben
 */
export function buildServiceSchema(params: {
  serviceType: string;
  slug: string;
  canonicalUrl: string;
  config?: BusinessConfig;
}) {
  const { serviceType, slug, canonicalUrl, config = BUSINESS } = params;
  
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${config.url}/#service-${slug}`,
    serviceType: serviceType,
    provider: {
      "@id": `${config.url}/#business`,
    },
    url: canonicalUrl,
  };

  // Area Served aus Business Config übernehmen
  if (config.areasServed && config.areasServed.length > 0) {
    schema.areaServed = config.areasServed.map((area) => ({
      "@type": "City",
      name: area,
    }));
  }

  return schema;
}

/**
 * Generiert alle Schema.org JSON-LD Objekte für die Website
 * Gibt ein Array zurück, das direkt in ein Script-Tag eingefügt werden kann
 */
export function generateAllSchemas() {
  const schemas = [buildLocalBusinessSchema(BUSINESS)];
  
  // WebSite Schema optional hinzufügen (kann später erweitert werden)
  // schemas.push(buildWebsiteSchema(BUSINESS));
  
  return schemas;
}
