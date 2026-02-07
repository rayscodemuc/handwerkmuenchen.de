import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Building, BarChart, Users, FileText, Settings, TrendingUp, Shield, Clock, Target, CheckCircle, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Objektmanagement",
  description: "Strategisches Objektmanagement für Gewerbeimmobilien. Zentrale Steuerung aller Gewerke, datenbasiertes Reporting und langfristige Werterhaltung.",
  alternates: {
    canonical: "/leistungen/objektmanagement",
  },
};

const sections = [
  {
    title: "Vom Verwalter zum strategischen Partner",
    content: "Klassische Hausverwaltung reagiert auf Probleme – professionelles Objektmanagement agiert vorausschauend. Wir analysieren Lebenszykluskosten, planen Instandhaltungen über 5-10 Jahre und optimieren kontinuierlich. Das Ergebnis: planbare Budgets, vermiedene Notfälle und nachweisbare Wertsteigerung. Für institutionelle Investoren liefern wir ESG-konforme Reportings."
  },
  {
    title: "Zentrale Dienstleistersteuerung",
    content: "Fragmentierte Verträge mit dutzenden Dienstleistern erzeugen Abstimmungschaos und Schnittstellenprobleme. Wir bündeln alle Gewerke unter einer Steuerung: Reinigung, Wartung, Winterdienst, Sicherheit, Grünpflege. Ausschreibung, Vergabe, Qualitätskontrolle und Abrechnung aus einer Hand. Sie haben einen Ansprechpartner – wir koordinieren den Rest."
  },
  {
    title: "Datenbasierte Entscheidungsgrundlagen",
    content: "Unser Reporting liefert KPIs zu Kosten, Qualität, Verfügbarkeit und Nachhaltigkeit. Benchmarking mit vergleichbaren Objekten zeigt Optimierungspotenziale. Digitale Dashboards ermöglichen Echtzeit-Einblick in alle Objekte. So treffen Sie Investitionsentscheidungen auf Basis von Fakten – nicht Schätzungen."
  }
];

const services = [
  { title: "Strategische Instandhaltungsplanung", description: "Mehrjährige Budgets für planbare Investitionen.", icon: TrendingUp },
  { title: "Kostenoptimierung & Benchmarking", description: "Analyse, Vergleich und Identifikation von Einsparpotenzialen.", icon: BarChart },
  { title: "Dienstleistersteuerung", description: "Ausschreibung, Vergabe, SLA-Monitoring und Qualitätskontrolle.", icon: Users },
  { title: "Qualitätsmanagement", description: "Regelmäßige Begehungen, Audits und Mängeltracking.", icon: Target },
  { title: "Digitales Dokumentenmanagement", description: "Revisionssichere Ablage aller Verträge, Protokolle und Nachweise.", icon: FileText },
  { title: "Prozessoptimierung", description: "Kontinuierliche Verbesserung durch PDCA-Zyklen.", icon: Settings }
];

const stats = [
  { value: "10-20%", label: "Kosteneinsparung" },
  { value: "1", label: "Ansprechpartner" },
  { value: "Echtzeit", label: "KPI-Reporting" }
];

const faqs = [
  { 
    question: "Ab welcher Objektgröße lohnt sich Objektmanagement?", 
    answer: "Ab etwa 5.000 m² oder bei mehreren Objekten rechnet sich professionelles Objektmanagement. Die Einsparungen durch optimierte Prozesse und Rahmenverträge übersteigen die Management-Kosten typischerweise bereits im ersten Jahr." 
  },
  { 
    question: "Wie unterscheidet sich Objektmanagement von Property Management?", 
    answer: "Property Management umfasst zusätzlich kaufmännische Aspekte wie Mietverwaltung und Nebenkostenabrechnung. Wir fokussieren auf das technische Facility Management – arbeiten aber Hand in Hand mit Ihrem Property Manager." 
  },
  { 
    question: "Wie schnell sehe ich Einsparungen?", 
    answer: "Erste Quick Wins durch Rahmenverträge und Prozessoptimierung oft nach 3-6 Monaten. Strukturelle Einsparungen von 10-20 % sind im ersten Jahr realistisch. Bei größeren Portfolios oft schneller." 
  },
  { 
    question: "Welche Reportings erhalte ich?", 
    answer: "Standard: monatliche Kostenübersichten, quartalsweise Management-Reports mit KPIs und Maßnahmenempfehlungen. Auf Wunsch: Echtzeit-Dashboards, ESG-Reportings, individuelle Auswertungen nach Ihren Anforderungen." 
  },
  { 
    question: "Können Sie mehrere Standorte bundesweit betreuen?", 
    answer: "Ja, wir steuern Portfolios mit hunderten Objekten bundesweit. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner auf Managementebene – unabhängig vom Standort." 
  }
];

const relatedLinks = [
  { label: "Alle Facility-Management-Leistungen", href: "/leistungen/facility" },
  { label: "Hausmeisterservice", href: "/leistungen/hausmeisterservice" },
  { label: "Service & Wartung", href: "/leistungen/service-wartung" },
  { label: "München", href: "/kontakt" },
];

const trustBadges = [
  { icon: BarChart, label: "KPI-Reporting" },
  { icon: Shield, label: "10-20% Einsparung" },
  { icon: CheckCircle, label: "Zentrale Steuerung" }
];

export default function Objektmanagement() {
  return (
    <>
      

      
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <Link href="/leistungen/facility" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Facility Management
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Objektmanagement</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Technisches Asset Management & Kostenoptimierung
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Objektmanagement
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Strategisches Objektmanagement für Gewerbeimmobilien. Zentrale Steuerung aller Gewerke, datenbasiertes Reporting und langfristige Werterhaltung.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>
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
              {trustBadges.map((badge, i) => (
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
                Für Eigentümer und Asset Manager mit größeren Immobilienportfolios ist fragmentiertes Facility Management ein Kostentreiber. Unterschiedliche Dienstleister, fehlende Transparenz und reaktive Instandhaltung führen zu Budgetüberschreitungen und Wertverfall. Unser Objektmanagement übernimmt die strategische Steuerung aller technischen Dienstleistungen: ein Ansprechpartner, datenbasierte Entscheidungen und planbare Kosten für langfristigen Werterhalt.
              </p>

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
              <div className="my-10 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <TrendingUp className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">10-20% Kosteneinsparung im ersten Jahr</h3>
                    <p className="mt-2 text-muted-foreground">Durch Rahmenverträge, Prozessoptimierung und präventive Instandhaltung realisieren unsere Kunden typischerweise 10-20 % Einsparung bei den Facility-Kosten – bei gleichzeitig höherer Qualität und Transparenz.</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="my-10 grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="rounded-xl bg-muted p-6 text-center">
                    <p className="text-3xl font-black text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

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
              <blockquote className="my-12 border-l-4 border-primary pl-6">
                <p className="text-lg font-medium text-foreground italic">
                  „Für institutionelle Investoren und Asset Manager mit großen Portfolios bieten wir mandantenspezifisches Reporting nach Ihren Standards – inklusive ESG-Kennzahlen und Nachhaltigkeitsberichten."
                </p>
              </blockquote>

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
                      href={link.href}
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
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">
                    Jetzt kostenlos anfragen
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
