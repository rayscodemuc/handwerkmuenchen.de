import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Clock, Shield, Award, Phone } from "lucide-react";
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
}: ServicePageLayoutProps) {
  // SEO structured data for Service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description,
    provider: {
      "@type": "Organization",
      name: "Mr.Clean Services GmbH",
      url: "https://mrclean-services.de",
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    serviceType: subtitle,
  };

  // FAQ structured data
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

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={title}
        description={description}
        keywords={[title, subtitle, "Facility Management", "Berlin", ...keywords]}
        structuredData={structuredData}
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
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li>
                <Link to={categoryHref} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {categoryName}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li>
                <span className="font-medium text-primary-foreground">{title}</span>
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
                    <Phone className="mr-2 h-4 w-4" />
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
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24/7 Erreichbar</p>
                  <p className="text-sm text-muted-foreground">Rund um die Uhr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Zertifiziert</p>
                  <p className="text-sm text-muted-foreground">Geprüfte Qualität</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
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
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {longDescription}
                  </p>
                )}

                <ul className="mt-10 space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
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

              {/* Image */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={imageAlt || `${title} – Professioneller Service von Mr.Clean Services`}
                      className="h-full w-full object-cover"
                      loading="lazy"
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
                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-primary/10" />
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
                    <div
                      key={index}
                      className="rounded-2xl bg-background p-8 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
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
                        <Check className="h-4 w-4" />
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
                    <div
                      key={index}
                      className="rounded-2xl bg-background p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-foreground">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Add FAQ structured data */}
            {faqStructuredData && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
              />
            )}
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
