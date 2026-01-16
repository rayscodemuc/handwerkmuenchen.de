import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Building, Eye, Sun, Shield, Calendar, Droplets, CheckCircle, Clock, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glas- & Fassadenpflege",
  description: "Professionelle Glas- und Fassadenreinigung für Gewerbeimmobilien. Alle Materialien, alle Höhen – mit zertifizierten Höhenarbeiten nach DGUV.",
  alternates: {
    canonical: "/leistungen/glas-fassade",
  },
};

const sections = [
  {
    title: "Werterhalt durch regelmäßige Pflege",
    content: "Umweltverschmutzung, Algen, Moos und Witterung setzen jeder Fassade zu. Unbehandelt führen diese Ablagerungen zu dauerhaften Materialschäden. Regelmäßige Fassadenreinigung entfernt Verschmutzungen, bevor sie die Substanz angreifen – und dokumentiert die Instandhaltung für Versicherungen und Investoren."
  },
  {
    title: "Materialgerechte Reinigungsverfahren",
    content: "Jedes Fassadenmaterial erfordert die richtige Behandlung. Glas, Klinker, Putz, Naturstein, Beton, Metall und Verbundwerkstoffe – wir wählen Reinigungsverfahren und -mittel passend zum Material. Von schonender Niederdruckreinigung bis zur intensiven Hochdruckbehandlung."
  },
  {
    title: "Zertifizierte Höhenarbeiten",
    content: "Mit Hubarbeitsbühnen, Fassadenbefahranlagen und zertifizierten Industriekletterern erreichen wir jede Fläche. Alle Arbeiten erfolgen nach DGUV Vorschrift 38 – sicher, effizient und ohne Einschränkung des laufenden Betriebs."
  }
];

const services = [
  { title: "Glasreinigung", description: "Streifenfreie Reinigung aller Glasflächen.", icon: Eye },
  { title: "Fassadenpflege", description: "Materialschonende Reinigung aller Oberflächen.", icon: Building },
  { title: "Wintergärten & Glasdächer", description: "Spezialreinigung schwer zugänglicher Flächen.", icon: Sun },
  { title: "Höhenarbeiten", description: "DGUV-zertifizierte Industriekletterer.", icon: Shield },
  { title: "Regelmäßige Intervalle", description: "Planbare Termine nach Jahresplan.", icon: Calendar },
  { title: "Schonende Verfahren", description: "Niederdruck für empfindliche Materialien.", icon: Droplets }
];

const stats = [
  { value: "Alle", label: "Materialien" },
  { value: "DGUV", label: "Zertifiziert" },
  { value: "Werterhalt", label: "Dokumentiert" }
];

const faqs = [
  { 
    question: "Welche Fassadenmaterialien können Sie reinigen?", 
    answer: "Wir reinigen alle gängigen Materialien: Glas, Klinker, Putz, Naturstein, Beton, Metall, Aluminium, Verbundwerkstoffe und mehr. Für jedes Material wählen wir das passende Verfahren." 
  },
  { 
    question: "Wie hoch können Sie arbeiten?", 
    answer: "Mit Hubarbeitsbühnen, Fassadenbefahranlagen und zertifizierten Industriekletterern erreichen wir jede Höhe – vom Erdgeschoss bis zum Hochhaus. Alle Arbeiten nach DGUV Vorschrift 38." 
  },
  { 
    question: "Wie oft sollte eine Fassade gereinigt werden?", 
    answer: "Je nach Standort und Material empfehlen wir 1-4 Reinigungen pro Jahr. Glasflächen häufiger, Steinfassaden seltener. Wir erstellen einen individuellen Pflegeplan." 
  },
  { 
    question: "Wird der Betrieb durch die Arbeiten gestört?", 
    answer: "Nein, wir koordinieren Termine außerhalb der Kernzeiten und schützen Eingangsbereiche. Die Arbeiten erfolgen zügig und ohne Beeinträchtigung des laufenden Betriebs." 
  },
  { 
    question: "Dokumentieren Sie die Werterhaltung?", 
    answer: "Ja, auf Wunsch erstellen wir Wartungsprotokolle mit Fotos und Zustandsbeschreibungen. Ideal für Asset Manager, Investoren und Versicherungsnachweise." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/reinigung" },
  { label: "Fensterreinigung", href: "/leistungen/fensterreinigung" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Shield, label: "DGUV-zertifiziert" },
  { icon: Building, label: "Alle Materialien" },
  { icon: CheckCircle, label: "Werterhalt dokumentiert" }
];

export default function GlasFassade() {
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
                <span className="font-medium text-primary-foreground">Glas- & Fassadenpflege</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Werterhalt & Repräsentation für Gewerbeimmobilien
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Glas- & Fassadenpflege
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Glas- und Fassadenreinigung für Gewerbeimmobilien. Alle Materialien, alle Höhen – mit zertifizierten Höhenarbeiten nach DGUV.
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
                Die Fassade ist das Gesicht Ihrer Immobilie. Für Investoren, Mieter und Besucher ist sie der erste Eindruck – und der zählt. Vernachlässigte Fassaden signalisieren mangelnde Sorgfalt und mindern den Objektwert. Unsere professionelle Glas- und Fassadenpflege erhält die Bausubstanz, steigert die Attraktivität und dokumentiert die Werterhaltung für Asset Manager.
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
                    <Building className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Investition in den Immobilienwert</h3>
                    <p className="mt-2 text-muted-foreground">Gepflegte Fassaden steigern den Marktwert und die Vermietbarkeit. Die Kosten der Fassadenreinigung amortisieren sich durch höhere Mieteinnahmen und geringere Instandhaltungskosten.</p>
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
                  „Wintergärten, Glasdächer und schwer zugängliche Flächen sind unsere Spezialität – wir reinigen gründlich und sicher, auch an den Stellen, die andere auslassen."
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
