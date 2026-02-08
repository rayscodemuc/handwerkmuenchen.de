import { buildMetadata, buildProfessionalServiceJsonLd, buildFAQJsonLd, BASE_URL } from "@/lib/seo";
import { sanitaerHeizung } from "@/lib/leistungen/config";
import {
  GewerkeHero,
  LeistungenGrid,
  NetzwerkPrinzipien,
  VerantwortlicheSection,
  FAQSection,
  FinalCTA,
} from "@/components/blocks/gewerk";

const config = sanitaerHeizung;
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

export default function SanitaerHeizungPage() {
  const professionalServiceJsonLd = buildProfessionalServiceJsonLd({
    name: "Meisterrunde Sanitär & Heizung München",
    url: `${BASE_URL}${canonicalPath}`,
    serviceType: "Sanitär- und Heizungstechnik",
    areaServed: "München und Umland",
  });
  const faqJsonLd = buildFAQJsonLd(config.faqs);

  return (
    <>
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
      <LeistungenGrid
        heading={config.leistungenHeading}
        subline={config.leistungenSubline}
        leistungen={config.leistungen}
        lightSectionColor="#3E505B"
      />
      <NetzwerkPrinzipien cards={config.netzwerkCards} />
      <VerantwortlicheSection teamSection={config.teamSection} />
      <FAQSection faqs={config.faqs} lightSectionColor="#3E505B" />
      <FinalCTA
        heading={config.ctaHeading}
        subline={config.ctaSubline}
        primaryLabel={config.ctaPrimaryLabel}
        primaryHref={config.ctaPrimaryHref}
        secondaryLabel={config.ctaSecondaryLabel}
        secondaryHref={config.ctaSecondaryHref}
        trustLine={config.ctaTrustLine}
      />
    </>
  );
}
