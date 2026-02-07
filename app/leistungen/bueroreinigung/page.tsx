import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Building2, Clock, Sparkles, Coffee, Trash2, Users, Shield, CheckCircle, BarChart, Leaf, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Büroreinigung",
  description: "Professionelle Büroreinigung für Gewerbeimmobilien. Feste Teams, flexible Zeiten und dokumentierte Qualitätsstandards für produktive Arbeitsplätze.",
  alternates: {
    canonical: "/leistungen/bueroreinigung",
  },
};

const sections = [
  {
    title: "Feste Teams statt wechselndes Personal",
    content: "Der häufigste Grund für Beschwerden bei Reinigungsdienstleistern: ständig wechselndes Personal. Unsere festen Objektteams kennen Ihre Räumlichkeiten, Ihre Anforderungen und Ihre Ansprechpartner. Das schafft Vertrauen, garantiert gleichbleibende Qualität und ermöglicht direkte Kommunikation bei Sonderwünschen."
  },
  {
    title: "Reinigung außerhalb der Bürozeiten",
    content: "Niemand möchte während der Arbeit gestört werden. Unsere Reinigungsteams arbeiten vor Bürobeginn, nach Feierabend oder nachts – je nach Ihrem Betriebsablauf. Bei Bedarf auch am Wochenende. So ist Ihr Büro jeden Morgen sauber, ohne dass der Arbeitsfluss unterbrochen wird."
  },
  {
    title: "Dokumentierte Qualitätskontrolle",
    content: "Regelmäßige Qualitätskontrollen durch unsere Objektleiter stellen sicher, dass Standards eingehalten werden. Mängel werden sofort korrigiert, Sonderwünsche zeitnah umgesetzt. Auf Wunsch erhalten Sie monatliche Reports mit Leistungskennzahlen."
  }
];

const services = [
  { title: "Arbeitsplatzreinigung", description: "Schreibtische, Ablagen, Arbeitsflächen und Technik.", icon: Building2 },
  { title: "Sanitärbereich-Hygiene", description: "Tägliche Desinfektion nach TRBA-Standards.", icon: Sparkles },
  { title: "Küchen & Sozialräume", description: "Aufenthaltsräume, Teeküchen und Gemeinschaftsbereiche.", icon: Coffee },
  { title: "Flexible Reinigungszeiten", description: "Vor, nach oder außerhalb der Bürozeiten.", icon: Clock },
  { title: "Feste Objektteams", description: "Gleiches Personal für Vertrauen und Qualität.", icon: Users },
  { title: "Nachhaltige Reinigungsmittel", description: "EU-Ecolabel-zertifizierte Produkte.", icon: Leaf }
];

const stats = [
  { value: "20%", label: "weniger Krankheitstage" },
  { value: "1", label: "Fester Objektleiter" },
  { value: "Flexibel", label: "Reinigungszeiten" }
];

const faqs = [
  { 
    question: "Wie stellen Sie gleichbleibende Qualität sicher?", 
    answer: "Durch feste Objektteams, regelmäßige Schulungen, dokumentierte Arbeitsabläufe und unangekündigte Qualitätskontrollen durch unsere Objektleiter. Bei Unterschreitung der Standards greifen definierte Eskalationsprozesse." 
  },
  { 
    question: "Können Sie auch sensible Bereiche reinigen?", 
    answer: "Ja, wir erstellen individuelle Hygienekonzepte für Arztpraxen, Labore, Rechenzentren und Lebensmittelbetriebe. Unser Personal ist nach TRBA 220 geschult und führt Desinfektionsreinigung nach RKI-Richtlinien durch." 
  },
  { 
    question: "Was passiert bei Sonderwünschen oder Beschwerden?", 
    answer: "Ihr fester Objektleiter ist Ihr direkter Ansprechpartner. Sonderwünsche werden in der Regel innerhalb von 24 Stunden umgesetzt, Beschwerden sofort bearbeitet und dokumentiert." 
  },
  { 
    question: "Können Sie mehrere Standorte bundesweit betreuen?", 
    answer: "Ja, wir betreuen Unternehmen mit dutzenden Bürostandorten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner." 
  },
  { 
    question: "Welche Reinigungsmittel werden verwendet?", 
    answer: "Wir setzen auf EU-Ecolabel-zertifizierte, umweltfreundliche Produkte. Für spezielle Anforderungen (Desinfektion, Allergiker) passen wir das Produktspektrum individuell an." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/leistungen/reinigung" },
  { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
  { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
  { label: "München", href: "/kontakt" },
];

const trustBadges = [
  { icon: Users, label: "Feste Teams" },
  { icon: CheckCircle, label: "Qualitätskontrolle" },
  { icon: Leaf, label: "EU-Ecolabel" }
];

export default function Bueroreinigung() {
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
                <Link href="/leistungen/reinigung" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Reinigung
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Büroreinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Produktive Arbeitsumgebung & Mitarbeitergesundheit
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Büroreinigung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Büroreinigung für Gewerbeimmobilien. Feste Teams, flexible Zeiten und dokumentierte Qualitätsstandards für produktive Arbeitsplätze.
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
                Für Unternehmen mit Büroflächen ist Sauberkeit mehr als Optik – sie ist ein Produktivitätsfaktor. Studien belegen: Saubere Arbeitsplätze reduzieren krankheitsbedingte Ausfälle um bis zu 20 %. Als Reinigungsdienstleister für Gewerbeimmobilien übernehmen wir die komplette Büroreinigung mit festen Teams, flexiblen Zeiten und dokumentierten Qualitätsstandards.
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
                    <h3 className="font-bold text-foreground">Hygienekonzepte nach TRBA 220</h3>
                    <p className="mt-2 text-muted-foreground">Für sensible Bereiche wie Gesundheitswesen, Lebensmittelverarbeitung oder Labore erstellen wir individuelle Hygienekonzepte nach TRBA 220 und führen Desinfektionsreinigung nach RKI-Richtlinien durch.</p>
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
                  „Für Property Manager mit mehreren Bürostandorten bieten wir Rahmenverträge mit einheitlichen Standards, konsolidiertem Reporting und einem zentralen Ansprechpartner."
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
