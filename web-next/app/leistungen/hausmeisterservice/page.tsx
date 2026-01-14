import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Home, Key, Wrench, Eye, ClipboardCheck, Users, Shield, Clock, FileText, Building, CheckCircle, BarChart, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hausmeisterservice",
  description: "Professioneller Hausmeisterservice für Gewerbeimmobilien und Wohnportfolios. Technische Objektbetreuung mit digitaler Dokumentation und garantierten SLAs.",
  alternates: {
    canonical: "/leistungen/hausmeisterservice",
  },
};

const sections = [
  {
    title: "Vom Hausmeister zum technischen Objektmanager",
    content: "Der moderne Hausmeister ist kein Handwerker mit Schlüsselbund – er ist ein technischer Objektmanager. Unsere Objektbetreuer koordinieren Handwerker, führen Schlüsselmanagement nach Vier-Augen-Prinzip, dokumentieren Mängel in Echtzeit und sind erster Ansprechpartner für Mieter, Eigentümer und Behörden. Sie übernehmen definierte Prüfpflichten nach Verkehrssicherungsrecht und entlasten damit die Hausverwaltung operativ und haftungsrechtlich."
  },
  {
    title: "Planbare Präsenz statt unzuverlässiger Einzelkämpfer",
    content: "Klassische Hausmeister-Modelle scheitern an Krankheit, Urlaub oder schlicht mangelnder Kontrolle. Wir garantieren vertraglich fixierte Präsenzzeiten: 2-5 Begehungen pro Woche oder tägliche Präsenz bei Großobjekten. Bei jeder Begehung werden definierte Kontrollpunkte systematisch abgearbeitet: Treppenhäuser, Außenanlagen, TGA-Räume, Müllstandplätze, Tiefgaragen. Ausfallzeiten werden durch Vertretungsregelungen kompensiert – Ihr Objekt ist nie unbeaufsichtigt."
  },
  {
    title: "Revisionssichere Dokumentation für Audits und Haftungsfragen",
    content: "Im Schadensfall prüfen Versicherungen und Gerichte als erstes die Dokumentation: Wurde die Verkehrssicherungspflicht erfüllt? Gab es regelmäßige Kontrollen? Unsere digitale Dokumentation erfasst jeden Kontrollpunkt mit Zeitstempel, GPS-Koordinaten und Fotobeweis. Mängel werden klassifiziert, eskaliert und nachverfolgt. Sie haben jederzeit Zugriff auf das Portal – ideal für Eigentümerversammlungen, WEG-Abrechnungen oder Versicherungsnachweise."
  }
];

const services = [
  { title: "Technische Objektbegehungen", description: "Systematische Kontrollen nach Prüfkatalog mit digitaler Dokumentation.", icon: Eye },
  { title: "Kleinreparaturen & Sofortmaßnahmen", description: "Behebung vor Ort: Leuchtmittel, Türschließer, Silikonfugen, Notabsicherung.", icon: Wrench },
  { title: "Schlüsselmanagement", description: "Vier-Augen-Prinzip, dokumentierte Übergaben, Koordination Handwerkerzugänge.", icon: Key },
  { title: "Handwerker-Koordination", description: "Terminierung, Einweisung, Abnahme und Qualitätskontrolle.", icon: Users },
  { title: "Digitale Mängeldokumentation", description: "Echtzeit-Erfassung mit Fotos, Klassifizierung und Eskalationsworkflow.", icon: FileText },
  { title: "Multi-Site-Management", description: "Einheitliche Standards für verteilte Portfolios mit konsolidiertem Reporting.", icon: BarChart }
];

const stats = [
  { value: "98%", label: "Mieterzufriedenheit" },
  { value: "24h", label: "Mängelreaktion" },
  { value: "100%", label: "Dokumentiert" }
];

const faqs = [
  { 
    question: "Wie unterscheidet sich professioneller Hausmeisterservice von Einzelpersonen?", 
    answer: "Vertretungsregelung bei Ausfall, revisionssichere Dokumentation, definierte SLAs mit Reaktionszeiten, Qualitätskontrolle durch Objektleitung und einheitliche Prozesse über alle Objekte. Bei Einzelpersonen fällt bei Krankheit oder Urlaub die gesamte Betreuung aus." 
  },
  { 
    question: "Welche Prüfpflichten können übernommen werden?", 
    answer: "Kontrolle der Verkehrssicherheit (Wege, Treppen, Beleuchtung), Sichtprüfung technischer Anlagen, Überwachung von Wartungsterminen, Dokumentation für Betriebssicherheitsverordnung und Vorbereitung von Sachverständigenprüfungen." 
  },
  { 
    question: "Wie funktioniert die digitale Dokumentation?", 
    answer: "Mängel werden per App erfasst mit Foto, GPS-Zeitstempel und Klassifizierung nach Dringlichkeit. Sie erhalten automatische Benachrichtigungen und haben 24/7 Portalzugriff. Berichte werden automatisch generiert – ideal für WEG-Abrechnungen und Eigentümerversammlungen." 
  },
  { 
    question: "Können Sie mehrere Objekte bundesweit betreuen?", 
    answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein fester Ansprechpartner auf Managementebene – unabhängig vom Standort." 
  },
  { 
    question: "Was kostet professioneller Hausmeisterservice im Vergleich?", 
    answer: "Die Kosten liegen oft unter denen eines fest angestellten Hausmeisters, wenn Lohnnebenkosten, Vertretung, Fahrzeug und Werkzeug eingerechnet werden. Dazu kommen die Vorteile der Dokumentation und Haftungsentlastung." 
  }
];

const relatedLinks = [
  { label: "Alle Facility-Management-Leistungen", href: "/facility-management" },
  { label: "Objektmanagement", href: "/leistungen/objektmanagement" },
  { label: "Service & Wartung", href: "/leistungen/service-wartung" },
  { label: "Winterdienst", href: "/leistungen/winterdienst" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Clock, label: "24h Mängelreaktion" },
  { icon: Shield, label: "Haftungsentlastung" },
  { icon: CheckCircle, label: "100% dokumentiert" }
];

export default function Hausmeisterservice() {
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
                <Link href="/facility-management" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Facility Management
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Hausmeisterservice</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Technische Objektbetreuung & Betreiberverantwortung
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Hausmeisterservice
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professioneller Hausmeisterservice für Gewerbeimmobilien und Wohnportfolios. Technische Objektbetreuung mit digitaler Dokumentation und garantierten SLAs.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
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
                Für Hausverwaltungen und Property Manager mit verteilten Portfolios ist der Hausmeister das operative Rückgrat der Objektbetreuung. Ein Ausfall oder mangelnde Qualität führt zu Mieterbeschwerden, Mängelstau und am Ende zu Leerstand. Unser Hausmeisterservice geht über den klassischen Glühbirnenwechsel hinaus: Wir übernehmen technische Betreiberverantwortung, dokumentieren revisionssicher und sind Ihr verlängerter Arm vor Ort – mit einem festen Ansprechpartner für jedes Objekt.
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
                    <h3 className="font-bold text-foreground">Entlastung von Betreiberpflichten</h3>
                    <p className="mt-2 text-muted-foreground">Wir übernehmen definierte Prüf- und Kontrollpflichten nach Verkehrssicherungsrecht. Im Rahmenvertrag dokumentiert, haftungsrechtlich abgesichert – Sie delegieren operative Verantwortung an einen zuverlässigen Partner.</p>
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
                  „Für Hausverwaltungen mit 50+ Objekten bieten wir Rahmenverträge mit einheitlichen Prozessen, zentralem Reporting und einem festen Objektbetreuer-Team für alle Standorte."
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
