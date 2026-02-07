import { buildMetadata, buildProfessionalServiceJsonLd, buildFAQJsonLd, BASE_URL } from "@/lib/seo";
import { reinigungFacilityHub } from "@/lib/leistungen/config";
import {
  GewerkeHero,
  HubChoice,
  NetzwerkPrinzipien,
  ProofBlock,
  FAQSection,
  FinalCTA,
  StickyCalculatorCta,
} from "@/components/blocks/gewerk";

const config = reinigungFacilityHub;
const canonicalPath = `/leistungen/${config.slug}`;

export async function generateMetadata() {
  return buildMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    canonicalPath,
    ogTitle: config.metaTitle,
    ogDescription: config.metaDescription,
  });
}

export default function ReinigungFacilityHubPage() {
  const professionalServiceJsonLd = buildProfessionalServiceJsonLd({
    name: "Handwerk München",
    url: `${BASE_URL}${canonicalPath}`,
    serviceType: "Reinigung & Facility Management",
    areaServed: "München",
  });
  const faqJsonLd = buildFAQJsonLd(config.faqs);

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GewerkeHero
        eyebrow={config.eyebrow}
        h1={config.h1}
        subline={config.subline}
        ctas={config.ctas}
        chips={config.chips}
      />
      <HubChoice choices={config.hubChoices} />
      <NetzwerkPrinzipien
        cards={config.netzwerkCards}
        sectionHeading="So arbeitet das Netzwerk"
        sectionSubline="Feste Verantwortliche, klare Zuständigkeit und dokumentierte Leistung."
      />
      <ProofBlock items={config.proofBlock} />
      <FAQSection faqs={config.faqs} />
      <FinalCTA
        heading={config.ctaHeading}
        subline={config.ctaSubline}
        primaryLabel={config.ctaPrimaryLabel}
        primaryHref={config.ctaPrimaryHref}
        secondaryLabel={config.ctaSecondaryLabel}
        secondaryHref={config.ctaSecondaryHref}
      />
      <StickyCalculatorCta />
    </div>
  );
}
