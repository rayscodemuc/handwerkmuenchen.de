import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Check, ChevronRight, Clock, Shield, Award, Phone, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServiceFeature {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  label: string;
  href: string;
}

interface Stat {
  value: string;
  label: string;
}

interface BlogServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  highlightBox?: {
    icon: LucideIcon;
    title: string;
    text: string;
  };
  stats?: Stat[];
  services: ServiceFeature[];
  quote?: string;
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
  categoryName: string;
  categoryHref: string;
  keywords?: string[];
  trustBadges?: { icon: LucideIcon; label: string }[];
}

export function BlogServicePageLayout({
  title,
  subtitle,
  description,
  intro,
  sections,
  imageSrc,
  imageAlt,
  imageCaption,
  highlightBox,
  stats,
  services,
  quote,
  faqs,
  relatedLinks,
  categoryName,
  categoryHref,
  keywords = [],
  trustBadges,
}: BlogServicePageLayoutProps) {
  const location = useLocation();
  const canonicalUrl = `https://mrclean-services.de${location.pathname}`;

  useEffect(() => {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);
    return () => { link.remove(); };
  }, [canonicalUrl]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": canonicalUrl,
    name: title,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Mr.Clean Services GmbH",
      url: "https://mrclean-services.de",
    },
    areaServed: { "@type": "Country", name: "Germany" },
  };

  const faqStructuredData = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  const defaultTrustBadges = trustBadges || [
    { icon: Clock, label: "24/7 Erreichbar" },
    { icon: Shield, label: "Zertifiziert" },
    { icon: Award, label: "10+ Jahre Erfahrung" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={title}
        description={description}
        keywords={[title, subtitle, categoryName, ...keywords]}
        structuredData={faqStructuredData ? [structuredData, faqStructuredData] : [structuredData]}
        canonicalUrl={canonicalUrl}
      />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <Link to={categoryHref} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {categoryName}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">{title}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                {subtitle}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                {title}
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
                    Kostenloses Angebot
                  </AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    Jetzt anrufen
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              {defaultTrustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              {/* Intro */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {intro}
              </p>

              {/* Feature Image */}
              {imageSrc && (
                <figure className="my-12">
                  <img
                    src={imageSrc}
                    alt={imageAlt || title}
                    className="w-full rounded-2xl object-cover aspect-[16/9]"
                    loading="eager"
                    fetchPriority="high"
                  />
                  {imageCaption && (
                    <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                      {imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Content Sections */}
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Highlight Box */}
              {highlightBox && (
                <div className="my-10 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <highlightBox.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{highlightBox.title}</h3>
                      <p className="mt-2 text-muted-foreground">{highlightBox.text}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="my-10 grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="rounded-xl bg-muted p-6 text-center">
                      <p className="text-3xl font-black text-primary">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Services */}
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Unsere Kernleistungen
              </h2>
              <div className="space-y-4">
                {services.map((service, i) => {
                  const Icon = service.icon || Check;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              {quote && (
                <blockquote className="my-12 border-l-4 border-primary pl-6">
                  <p className="text-lg font-medium text-foreground italic">
                    „{quote}"
                  </p>
                </blockquote>
              )}

              {/* FAQ */}
              <h2 className="text-2xl font-bold text-foreground mt-16 mb-6">
                Häufige Fragen
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-foreground list-none flex items-center justify-between">
                      {faq.question}
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>

              {/* Related Links */}
              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Verwandte Leistungen & Standorte
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      to={link.href}
                      className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <Link to="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">
                    Jetzt kostenlos anfragen
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
