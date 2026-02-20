import type { Metadata } from "next";

const BASE_URL = "https://handwerkmuenchen.de";

export type BuildMetadataOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Build Next.js metadata for a page (title, description, canonical, openGraph, twitter).
 * canonicalPath is relative, e.g. "/leistungen/elektrotechnik".
 */
export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    canonicalPath,
    ogTitle = title,
    ogDescription = description,
  } = options;
  const canonicalUrl = `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const base: Metadata = {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "handwerkmuenchen.de",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/images/elektromeister-elektro-meisterbetrieb-muenchen.png`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${BASE_URL}/images/elektromeister-elektro-meisterbetrieb-muenchen.png`],
    },
  };

  return base;
}

export type ProfessionalServiceJsonLdOptions = {
  name: string;
  url: string;
  serviceType: string;
  areaServed: string;
};

/**
 * Build JSON-LD for ProfessionalService. No fake address/telephone – only name, url, serviceType, areaServed.
 */
export function buildProfessionalServiceJsonLd(
  options: ProfessionalServiceJsonLdOptions
): Record<string, unknown> {
  const { name, url, serviceType, areaServed } = options;
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url: fullUrl,
    serviceType,
    areaServed,
  };
}

export type FaqItem = { q: string; a: string };

/**
 * Build JSON-LD for FAQPage from real FAQ content only.
 */
export function buildFAQJsonLd(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export { BASE_URL };
