/**
 * Config type for GewerkLandingPage. Use icon keys (lucide-react name) for Leistungsbereiche cards.
 */
export type GewerkLandingConfig = {
  hero: {
    eyebrow: string;
    h1: string;
    subline: string;
    chips: string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  leistungsbereiche?: {
    heading: string;
    subline: string;
    cards: Array<{
      icon: string;
      title: string;
      body: string;
      typisch: string;
    }>;
  };
  meisterrunde: {
    heading: string;
    subline: string;
    cards: Array<{ title: string; body: string }>;
    trustChips?: string[];
  };
  verantwortung: {
    heading: string;
    subline: string;
    cards: Array<{
      title: string;
      body: string;
      bullets: string[];
      badge?: string;
      schnittstellenLinks?: Array<{ label: string; href: string }>;
    }>;
  };
  faq: {
    heading: string;
    subline: string;
    items: Array<{ q: string; a: string }>;
  };
  cta: {
    heading: string;
    subline: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    trustLine?: string;
    showAllLeistungenLink?: boolean;
  };
  /** Optional JSON-LD: pass objects for ProfessionalService and/or FAQPage (will be stringified). */
  jsonLd?: {
    professionalService?: Record<string, unknown>;
    faqPage?: Record<string, unknown>;
  };
};
