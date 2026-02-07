import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Leaf, Scissors, Flower, TreeDeciduous, Droplets, Calendar, Shield, CheckCircle, BarChart, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grünpflege",
  description: "Ganzjährige Grünpflege für Gewerbeimmobilien. Rasenpflege, Heckenschnitt, Beetpflege und Bewässerungsmanagement für repräsentative Außenanlagen.",
  alternates: {
    canonical: "/leistungen/gruenpflege",
  },
};

const sections = [
  { title: "Werterhalt durch professionelle Pflege", content: "Vernachlässigte Grünflächen signalisieren mangelnde Sorgfalt und mindern die Attraktivität für Mieter und Investoren. Regelmäßige Pflege nach Jahresplan hält Ihre Außenanlagen in Topzustand." },
  { title: "Jahreszeitengerechte Maßnahmen", content: "Frühjahr: Vertikutieren, Düngen, Rückschnitt. Sommer: Regelmäßiger Schnitt, Bewässerung. Herbst: Laubbeseitigung, Wintervorbereitung. Winter: Schutzmaßnahmen für empfindliche Pflanzen." },
  { title: "Smartes Bewässerungsmanagement", content: "Mit Bodenfeuchtesensoren und automatischen Beregnungsanlagen sparen wir bis zu 50 % Wasser. Installation, Wartung und saisonale Einstellung inklusive." }
];

const services = [
  { title: "Rasenpflege", description: "Mähen, Vertikutieren, Düngen, Nachsaat.", icon: Leaf },
  { title: "Heckenschnitt", description: "Form- und Verjüngungsschnitt nach Bedarf.", icon: Scissors },
  { title: "Beetpflege", description: "Unkraut, Mulchen, saisonale Bepflanzung.", icon: Flower },
  { title: "Baumpflege", description: "Kronenpflege und Totholzentfernung.", icon: TreeDeciduous },
  { title: "Bewässerung", description: "Installation und Wartung automatischer Anlagen.", icon: Droplets },
  { title: "Jahresplan", description: "Planbare Termine und transparente Kosten.", icon: Calendar }
];

const stats = [
  { value: "15%", label: "Wertsteigerung" },
  { value: "4 Saisons", label: "Ganzjährig" },
  { value: "50%", label: "Wassereinsparung" }
];

const faqs = [
  { question: "Wie oft wird der Rasen gemäht?", answer: "In der Wachstumssaison wöchentlich bis 14-tägig, je nach Wachstum und Witterung." },
  { question: "Übernehmen Sie auch Bepflanzung?", answer: "Ja, wir planen und realisieren saisonale Bepflanzungen nach Ihren Wünschen." },
  { question: "Was passiert mit dem Grünschnitt?", answer: "Wird von uns fachgerecht entsorgt – zur Kompostierung oder energetischen Verwertung." },
  { question: "Können Sie mehrere Standorte betreuen?", answer: "Ja, bundesweite Betreuung über Rahmenvertrag mit einheitlichen Standards." }
];

const relatedLinks = [
  { label: "Außenanlagen", href: "/aussenanlagen" },
  { label: "Baumpflege", href: "/leistungen/baumpflege" },
  { label: "Winterdienst", href: "/leistungen/winterdienst-aussen" },
  { label: "München", href: "/kontakt" },
];

const trustBadges = [
  { icon: Calendar, label: "Jahresplan" },
  { icon: Shield, label: "Haftungssicherheit" },
  { icon: CheckCircle, label: "Dokumentiert" }
];

export default function Gruenpflege() {
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
                <Link href="/aussenanlagen" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Außenanlagen
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Grünpflege</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Außenanlagenpflege & Immobilienwertsteigerung
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Grünpflege
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Ganzjährige Grünpflege für Gewerbeimmobilien. Rasenpflege, Heckenschnitt, Beetpflege und Bewässerungsmanagement für repräsentative Außenanlagen.
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
                Gepflegte Grünanlagen sind mehr als Dekoration – sie steigern den Immobilienwert um bis zu 15 %, erhöhen die Mieterzufriedenheit und prägen den ersten Eindruck bei Kunden und Besuchern. Für Property Manager und Facility-Verantwortliche übernehmen wir die komplette ganzjährige Grünpflege mit planbaren Kosten und dokumentierter Qualität.
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
                    <h3 className="font-bold text-foreground">Verkehrssicherungspflicht erfüllt</h3>
                    <p className="mt-2 text-muted-foreground">Wir dokumentieren alle Pflegemaßnahmen revisionssicher. Bei Unfällen durch herabfallende Äste oder rutschiges Laub sind Sie haftungsrechtlich abgesichert.</p>
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
                  „Für Portfolios mit mehreren Standorten bieten wir Rahmenverträge mit einheitlichen Standards und konsolidiertem Reporting."
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
