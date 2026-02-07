import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Sparkles, Layers, Sun, Droplets, Home, CheckCircle, Shield, Clock, Calendar, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grundreinigung",
  description: "Professionelle Grundreinigung für Gewerbeimmobilien. Intensive Tiefenreinigung aller Flächen mit dokumentierter Abnahme.",
  alternates: {
    canonical: "/leistungen/grundreinigung",
  },
};

const sections = [
  {
    title: "Von Boden bis Decke – kein Detail ausgelassen",
    content: "Bei einer Grundreinigung wird jede Fläche intensiv behandelt: Böden werden maschinell gereinigt, Heizkörper entstaubt, Leuchten demontiert und gereinigt, Fenster und Rahmen gesäubert, Sanitärbereiche entkalkt, Schränke und Regale innen gereinigt. Das Ergebnis ist ein Gebäude, das aussieht wie neu."
  },
  {
    title: "Perfekte Basis für laufende Pflege",
    content: "Nach einer professionellen Grundreinigung ist die regelmäßige Unterhaltsreinigung wesentlich effizienter. Der Sauberkeitszustand bleibt länger erhalten, die Reinigungszeiten verkürzen sich und die Kosten sinken langfristig. Die Investition in eine Grundreinigung zahlt sich mehrfach aus."
  },
  {
    title: "Dokumentierte Übergabe",
    content: "Bei Mieterwechseln oder Übergaben führen wir eine gemeinsame Abnahme mit Protokoll und Fotodokumentation durch. So vermeiden Sie Streitigkeiten über den Zustand und haben rechtssichere Nachweise für Kautionsabrechnungen."
  }
];

const services = [
  { title: "Bodenintensivierung", description: "Maschinelle Tiefenreinigung aller Bodenbeläge.", icon: Layers },
  { title: "Oberflächenpflege", description: "Intensive Reinigung aller Flächen und Details.", icon: Sparkles },
  { title: "Leuchtenreinigung", description: "Demontage und Reinigung für maximales Licht.", icon: Sun },
  { title: "Sanitärentkalkung", description: "Intensive Entkalkung und Desinfektion.", icon: Droplets },
  { title: "Komplettreinigung", description: "Vom Boden bis zur Decke, alle Bereiche.", icon: Home },
  { title: "Dokumentierte Abnahme", description: "Protokoll mit Fotodokumentation.", icon: CheckCircle }
];

const stats = [
  { value: "100%", label: "Alle Flächen" },
  { value: "1-3 Tage", label: "Durchführung" },
  { value: "Protokoll", label: "Dokumentiert" }
];

const faqs = [
  { 
    question: "Wann ist eine Grundreinigung notwendig?", 
    answer: "Bei Mieterwechsel, nach Renovierung oder Bauarbeiten, bei starker Verschmutzung oder wenn die reguläre Unterhaltsreinigung nicht mehr ausreicht. Auch als jährliche Intensivpflege empfohlen." 
  },
  { 
    question: "Wie lange dauert eine Grundreinigung?", 
    answer: "Je nach Fläche und Verschmutzungsgrad 1-3 Tage. Eine 500 m² Bürofläche ist typischerweise in 1-2 Tagen fertig. Wir arbeiten auch nachts oder am Wochenende." 
  },
  { 
    question: "Was ist im Leistungsumfang enthalten?", 
    answer: "Standard: Maschinelle Bodenreinigung, Fenster mit Rahmen, Heizkörper, Leuchten, Sanitärbereiche, Türen und Zargen, Schränke innen. Erweiterbar um Spezialleistungen wie Teppichreinigung oder Steinpflege." 
  },
  { 
    question: "Erhalten wir ein Abnahmeprotokoll?", 
    answer: "Ja, bei Übergaben führen wir eine gemeinsame Abnahme mit Protokoll und Fotodokumentation durch. Rechtssicher für Kautionsabrechnungen und Mietvertragsübergaben." 
  },
  { 
    question: "Wie oft sollte grundgereinigt werden?", 
    answer: "Mindestens einmal jährlich als Intensivpflege, zusätzlich bei Mieterwechsel oder nach Baumaßnahmen. Bei stark frequentierten Objekten auch halbjährlich." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/leistungen/reinigung" },
  { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
  { label: "Sonderreinigung", href: "/reinigung/sonderreinigung" },
  { label: "München", href: "/kontakt" },
];

const trustBadges = [
  { icon: CheckCircle, label: "Abnahmeprotokoll" },
  { icon: Layers, label: "Maschinelle Reinigung" },
  { icon: Clock, label: "1-3 Tage" }
];

export default function Grundreinigung() {
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
                <span className="font-medium text-primary-foreground">Grundreinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Intensive Tiefenreinigung & Übergabereinigung
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Grundreinigung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Grundreinigung für Gewerbeimmobilien. Intensive Tiefenreinigung aller Flächen mit dokumentierter Abnahme.
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
                Die Grundreinigung ist der Reset-Knopf für Ihre Immobilie. Nach Renovierung, bei Mieterwechsel oder wenn die reguläre Reinigung nicht mehr ausreicht – eine professionelle Grundreinigung schafft den Ausgangszustand für langfristige Sauberkeit zurück. Für Hausverwaltungen und Property Manager ist sie unverzichtbar bei Übergaben und Neuvermietungen.
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
                    <h3 className="font-bold text-foreground">Übergabefertig mit Abnahmeprotokoll</h3>
                    <p className="mt-2 text-muted-foreground">Nach Abschluss der Grundreinigung führen wir gemeinsam mit Ihnen eine Qualitätskontrolle durch. Das Abnahmeprotokoll mit Fotodokumentation ist Ihr Nachweis für einwandfreien Übergabezustand.</p>
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
                  „Eine professionelle Grundreinigung verlängert die Lebensdauer Ihrer Bodenbeläge um Jahre und reduziert langfristig die Reinigungskosten."
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
