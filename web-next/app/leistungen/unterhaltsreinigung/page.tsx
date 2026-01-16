import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Sparkles, Clock, CheckCircle, Users, Leaf, ClipboardCheck, Shield, Calendar, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unterhaltsreinigung",
  description: "Professionelle Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte. Planbare Intervalle, dokumentierte Qualität und nachhaltige Reinigungsmittel.",
  alternates: {
    canonical: "/leistungen/unterhaltsreinigung",
  },
};

const sections = [
  {
    title: "Individuelle Intervalle statt Standardpakete",
    content: "Jedes Objekt hat unterschiedliche Anforderungen. Ein Bürogebäude mit 50 Mitarbeitern braucht andere Intervalle als eine Arztpraxis oder ein Logistikzentrum. Wir analysieren Ihre Nutzung und erstellen einen maßgeschneiderten Reinigungsplan: täglich, mehrmals wöchentlich oder wöchentlich – je nach Bereich und Bedarf."
  },
  {
    title: "Nachhaltige Reinigung mit System",
    content: "Wir setzen auf biologisch abbaubare, EU-Ecolabel-zertifizierte Reinigungsmittel. Das schont die Umwelt, reduziert Allergierisiken und schützt empfindliche Oberflächen. Dazu gehört auch der sparsame Einsatz von Wasser und Chemie durch moderne Reinigungstechnik."
  },
  {
    title: "Transparente Qualitätskontrolle",
    content: "Regelmäßige Kontrollen durch unsere Objektleiter stellen sicher, dass Standards eingehalten werden. Auf Wunsch erhalten Sie monatliche Reports mit Leistungskennzahlen, Mängelprotokollen und Verbesserungsvorschlägen – ideal für WEG-Abrechnungen oder Eigentümerberichte."
  }
];

const services = [
  { title: "Regelmäßige Reinigung", description: "Individuell abgestimmte Intervalle nach Nutzung.", icon: Calendar },
  { title: "Qualitätskontrolle", description: "Regelmäßige Prüfungen durch Objektleitung.", icon: CheckCircle },
  { title: "Geschultes Personal", description: "Professionell, zuverlässig und sprachkompetent.", icon: Users },
  { title: "Umweltfreundlich", description: "EU-Ecolabel-zertifizierte Reinigungsmittel.", icon: Leaf },
  { title: "Hygiene-Standards", description: "TRBA 220 für sensible Bereiche.", icon: Sparkles },
  { title: "Dokumentation", description: "Lückenlose Protokollierung und Reporting.", icon: ClipboardCheck }
];

const stats = [
  { value: "Täglich", label: "bis wöchentlich" },
  { value: "100%", label: "Dokumentiert" },
  { value: "EU-Ecolabel", label: "Zertifiziert" }
];

const faqs = [
  { 
    question: "Wie werden die Reinigungsintervalle festgelegt?", 
    answer: "Wir analysieren Nutzungsart, Besucherfrequenz und Flächentypen. Ein Bürogebäude mit hoher Frequenz braucht tägliche Reinigung, ein Lager nur wöchentlich. Das Ergebnis ist ein individueller Reinigungsplan mit optimiertem Kosten-Nutzen-Verhältnis." 
  },
  { 
    question: "Was ist im Leistungsumfang enthalten?", 
    answer: "Standard: Bodenreinigung, Arbeitsplätze, Sanitärbereiche, Müllenentleerung. Erweiterbar um Küchen, Treppenhäuser, Außenbereiche, Glasreinigung und Sonderleistungen. Alles wird im Leistungskatalog dokumentiert." 
  },
  { 
    question: "Wie schnell werden Reklamationen bearbeitet?", 
    answer: "Bei Reklamationen reagieren wir innerhalb von 24 Stunden. In SLA-basierten Verträgen garantieren wir Reaktionszeiten von 4-8 Stunden für kritische Mängel." 
  },
  { 
    question: "Können Sie mehrere Standorte bundesweit betreuen?", 
    answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner." 
  },
  { 
    question: "Welche Reinigungsmittel werden verwendet?", 
    answer: "EU-Ecolabel-zertifizierte, biologisch abbaubare Produkte als Standard. Für spezielle Anforderungen (Desinfektion, Allergiker, Naturstein) passen wir das Produktspektrum individuell an." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/reinigung" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung" },
  { label: "Sonderreinigung", href: "/leistungen/sonderreinigung" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Calendar, label: "Flexible Intervalle" },
  { icon: CheckCircle, label: "Qualitätskontrolle" },
  { icon: Leaf, label: "Nachhaltig" }
];

export default function Unterhaltsreinigung() {
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
                <Link href="/reinigung" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Reinigung
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Unterhaltsreinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Regelmäßige Gebäudereinigung & Werterhalt
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Unterhaltsreinigung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte. Planbare Intervalle, dokumentierte Qualität und nachhaltige Reinigungsmittel.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
                    Kostenloses Angebot
                  </AnimatedButton>
                </Link>
                <a href="tel:+498925006355">
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
                Die regelmäßige Unterhaltsreinigung ist das Fundament eines gepflegten Gebäudes. Für Hausverwaltungen und Facility Manager bedeutet sie planbare Kosten, zufriedene Mieter und langfristigen Werterhalt. Wir übernehmen die komplette Unterhaltsreinigung mit individuellen Intervallen, geschultem Personal und dokumentierter Qualitätskontrolle.
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
                    <Shield className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Planbare Kosten, messbare Qualität</h3>
                    <p className="mt-2 text-muted-foreground">Festpreise pro Quadratmeter, keine versteckten Kosten. Definierte Leistungskataloge und SLAs mit Reaktionszeiten bei Reklamationen garantieren Transparenz und Verlässlichkeit.</p>
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
                  „Für Hausverwaltungen mit großen Portfolios bieten wir Rahmenverträge mit einheitlichen Qualitätsstandards, konsolidiertem Reporting und einem festen Ansprechpartner für alle Objekte."
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
