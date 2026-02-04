import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Car, Droplets, Trash2, Paintbrush, ArrowDown, Eye, Shield, Clock, CheckCircle, AlertTriangle, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tiefgaragenreinigung",
  description: "Professionelle Tiefgaragenreinigung für Wohn- und Gewerbeobjekte. Ölfleckentfernung, Entwässerungsreinigung und dokumentierte Verkehrssicherheit.",
  alternates: {
    canonical: "/leistungen/tiefgaragenreinigung",
  },
};

const sections = [
  {
    title: "Verkehrssicherheit durch saubere Flächen",
    content: "Ölflecken, Reifenabrieb und verblasste Markierungen sind Unfallrisiken und potenzielle Haftungsfallen. Saubere Böden und gut sichtbare Markierungen erhöhen die Sicherheit für Nutzer und reduzieren Ihr Haftungsrisiko als Betreiber. Wir dokumentieren jeden Einsatz mit Fotos und Protokoll."
  },
  {
    title: "Brandschutz durch Entwässerungspflege",
    content: "Verstopfte Entwässerungsrinnen führen zu Wasserstau und begünstigen Korrosion. Ölablagerungen in Rinnen sind ein Brandrisiko. Wir reinigen alle Entwässerungen, entfernen Ablagerungen und prüfen die Funktion – dokumentiert für Brandschutzprüfungen und Versicherungen."
  },
  {
    title: "Flexible Terminierung ohne Betriebsstörung",
    content: "Tiefgaragenreinigung erfolgt bei geringer Belegung – nachts, am frühen Morgen oder am Wochenende. Wir koordinieren mit Ihnen die optimalen Zeitfenster und informieren Nutzer vorab. Der laufende Betrieb wird nicht beeinträchtigt."
  }
];

const services = [
  { title: "Maschinelle Reinigung", description: "Scheuersaugmaschinen für große Flächen.", icon: Car },
  { title: "Ölfleckentfernung", description: "Spezialbehandlung für Öl und Kraftstoff.", icon: Droplets },
  { title: "Reifenabrieb-Entfernung", description: "Entfernung hartnäckiger schwarzer Spuren.", icon: Shield },
  { title: "Rinnenreinigung", description: "Freimachen aller Entwässerungen und Abläufe.", icon: ArrowDown },
  { title: "Graffiti-Entfernung", description: "Beseitigung von Wandschmierereien.", icon: Paintbrush },
  { title: "CO-Warnanlage-Check", description: "Sichtprüfung und Reinigung der Sensoren.", icon: AlertTriangle }
];

const stats = [
  { value: "2-4x", label: "Pro Jahr empfohlen" },
  { value: "Nachts", label: "Durchführung möglich" },
  { value: "100%", label: "Dokumentiert" }
];

const faqs = [
  { 
    question: "Wie oft sollte eine Tiefgarage gereinigt werden?", 
    answer: "Wir empfehlen 2-4 Grundreinigungen pro Jahr, je nach Nutzungsintensität. Bei Objekten mit hoher Frequenz oder starker Verschmutzung auch häufiger. Zusätzlich monatliche Sichtkontrollen." 
  },
  { 
    question: "Wann wird die Reinigung durchgeführt?", 
    answer: "Vorzugsweise nachts, am frühen Morgen oder am Wochenende bei geringer Belegung. Wir koordinieren die Termine mit Ihnen und informieren Nutzer vorab." 
  },
  { 
    question: "Können auch eingetrocknete Ölflecken entfernt werden?", 
    answer: "Ja, mit Spezialverfahren entfernen wir auch ältere, eingetrocknete Öl- und Kraftstoffflecken. Das ist nicht nur optisch wichtig, sondern auch für Brandschutz und Rutschsicherheit." 
  },
  { 
    question: "Erhalten wir Dokumentation für Versicherungen?", 
    answer: "Ja, jede Reinigung wird mit Fotos, Zeitstempel und Zustandsprotokoll dokumentiert. Für WEG-Abrechnungen und Versicherungsnachweise sofort verwendbar." 
  },
  { 
    question: "Werden auch Entwässerungsrinnen gereinigt?", 
    answer: "Ja, die Rinnenreinigung ist Standardbestandteil. Wir entfernen Ablagerungen, prüfen die Funktion und dokumentieren den Zustand – wichtig für Brandschutz und Wasserschadenvermeidung." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/reinigung" },
  { label: "Grauflächenreinigung", href: "/leistungen/grauflaechenreinigung" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung" },
  { label: "München", href: "/standorte/muenchen" },
];

const trustBadges = [
  { icon: Shield, label: "Verkehrssicherheit" },
  { icon: Clock, label: "Flexible Termine" },
  { icon: CheckCircle, label: "Dokumentiert" }
];

export default function Tiefgaragenreinigung() {
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
                <span className="font-medium text-primary-foreground">Tiefgaragenreinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Verkehrssicherheit & Brandschutz für Parkhäuser
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Tiefgaragenreinigung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Tiefgaragenreinigung für Wohn- und Gewerbeobjekte. Ölfleckentfernung, Entwässerungsreinigung und dokumentierte Verkehrssicherheit.
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
                Tiefgaragen sind besonderen Belastungen ausgesetzt: Reifenabrieb, Ölflecken, Staub und Ablagerungen setzen Böden und Entwässerung zu. Für Hausverwaltungen und Property Manager ist die regelmäßige Tiefgaragenreinigung nicht nur Optik – sie ist Verkehrssicherungspflicht und Brandschutz. Verstopfte Rinnen führen zu Wasserschäden, Ölflecken zu Rutschgefahr und Brandrisiko.
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
                    <h3 className="font-bold text-foreground">Dokumentierte Verkehrssicherheit</h3>
                    <p className="mt-2 text-muted-foreground">Jede Reinigung wird mit Fotos, Zeitstempel und Zustandsprotokoll dokumentiert. Sie erfüllen Ihre Verkehrssicherungspflicht nachweisbar – rechtssicher bei Unfällen oder Versicherungsfragen.</p>
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
                  „Für WEG und Hausverwaltungen erstellen wir Jahrespläne mit festen Terminen – planbare Kosten, die in der Betriebskostenabrechnung transparent darstellbar sind."
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
