import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
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

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  features: string[];
  detailedFeatures?: ServiceFeature[];
  benefits?: string[];
  faqs?: FAQ[];
  imageSrc?: string;
  imageAlt?: string;
  categoryName: string;
  categoryHref: string;
  keywords?: string[];
  relatedLinks?: RelatedLink[];
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  longDescription,
  features,
  detailedFeatures,
  benefits,
  faqs,
  imageSrc,
  imageAlt,
  categoryName,
  categoryHref,
  keywords = [],
  relatedLinks = [],
}: ServicePageLayoutProps) {
  const location = useLocation();
  const canonicalUrl = `https://mrclean-services.de${location.pathname}`;

  // Add canonical link tag
  useEffect(() => {
    // Remove existing canonical if any
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Add new canonical
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [canonicalUrl]);

  // SEO structured data for Service (Schema.org)
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
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+49-123-4567890",
        contactType: "customer service",
        availableLanguage: ["German", "English"],
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    serviceType: subtitle,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: title,
      itemListElement: features.map((feature, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature,
        },
        position: index + 1,
      })),
    },
  };

  // FAQ structured data (Schema.org FAQPage)
  const faqStructuredData = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  // Combined structured data for single script tag
  const combinedStructuredData = faqStructuredData 
    ? [structuredData, faqStructuredData]
    : [structuredData];

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={title}
        description={description}
        keywords={[title, subtitle, "Facility Management", "Berlin", ...keywords]}
        structuredData={combinedStructuredData}
        canonicalUrl={canonicalUrl}
      />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb with BreadcrumbList Schema */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol 
              className="flex items-center gap-2 text-sm"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  to="/" 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Startseite</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link 
                  to={categoryHref} 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{categoryName}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="font-medium text-primary-foreground" itemProp="name">{title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                {subtitle}
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-2xl">
                {description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
        <section className="border-b border-border bg-background py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24/7 Erreichbar</p>
                  <p className="text-sm text-muted-foreground">Rund um die Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Zertifiziert</p>
                  <p className="text-sm text-muted-foreground">Geprüfte Qualität</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">10+ Jahre</p>
                  <p className="text-sm text-muted-foreground">Erfahrung</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text Content */}
              <div>
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  Warum {title} von Mr.Clean Services?
                </h2>
                {longDescription && (
                  <div className="mt-6 space-y-4 text-lg text-muted-foreground leading-relaxed">
                    {longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Internal Links Section */}
                {relatedLinks && relatedLinks.length > 0 && (
                  <div className="mt-8 rounded-xl border border-border bg-muted/50 p-6">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Verwandte Leistungen & Standorte
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {relatedLinks.map((link, index) => (
                        <Link
                          key={index}
                          to={link.href}
                          className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                          {link.label}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="mt-10 space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link to="/anfrage">
                    <AnimatedButton className="h-14 px-10 text-base">
                      Jetzt Angebot anfragen
                    </AnimatedButton>
                  </Link>
                </div>
              </div>

              {/* Image with LCP optimization */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={imageAlt || `${title} – Professioneller Service von Mr.Clean Services`}
                      className="h-full w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <p className="text-lg font-medium">{title}</p>
                        <p className="text-sm">Bild wird geladen</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-primary/10" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features Section */}
        {detailedFeatures && detailedFeatures.length > 0 && (
          <section className="bg-muted py-20 lg:py-28">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  Unsere Leistungen im Detail
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professionelle Lösungen für Ihre individuellen Anforderungen
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {detailedFeatures.map((feature, index) => {
                  const IconComponent = feature.icon || Check;
                  return (
                    <article
                      key={index}
                      className="rounded-2xl bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {benefits && benefits.length > 0 && (
          <section className="bg-background py-20 lg:py-28">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                    Ihre Vorteile mit Mr.Clean Services
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Vertrauen Sie auf unsere Expertise und profitieren Sie von erstklassigem Service.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span className="font-medium text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="bg-muted py-20 lg:py-28">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center text-3xl font-bold text-foreground lg:text-4xl">
                  Häufig gestellte Fragen
                </h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Hier finden Sie Antworten auf die wichtigsten Fragen zu {title}
                </p>

                <div className="mt-12 space-y-6">
                  {faqs.map((faq, index) => (
                    <article
                      key={index}
                      className="rounded-2xl bg-background p-6 shadow-sm"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <h3 className="text-lg font-semibold text-foreground" itemProp="name">
                        {faq.question}
                      </h3>
                      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                        <p className="mt-3 text-muted-foreground leading-relaxed" itemProp="text">
                          {faq.answer}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
