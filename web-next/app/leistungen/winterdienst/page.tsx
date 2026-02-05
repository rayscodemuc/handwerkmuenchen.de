import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, FileText, Truck, AlertTriangle, Snowflake, MapPin, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Winterdienst",
  description: "Professioneller Winterdienst mit vollständiger Haftungsübernahme. Schneeräumung und Streudienst mit GPS-dokumentierten Einsätzen, 24/7 Bereitschaft.",
  alternates: {
    canonical: "/leistungen/winterdienst",
  },
};

const sections = [
  { title: "Vollständige Haftungsübernahme", content: "Bei einem Unfall durch Glätte auf Ihren Flächen haften wir, nicht Sie. Dies ist vertraglich fixiert und durch unsere Betriebshaftpflicht bis 10 Mio. € abgesichert." },
  { title: "GPS-dokumentierte Einsätze", content: "Jeder Einsatz wird mit GPS-Koordinaten, Zeitstempel und Fotos dokumentiert. Im Streitfall ist der Nachweis gerichtsfest – Sie sind auf der sicheren Seite." },
  { title: "Proaktive Wetterüberwachung", content: "Wir warten nicht auf Ihren Anruf. Durch kontinuierliche Wetterüberwachung beginnen wir rechtzeitig mit präventivem Streuen und räumen vor der Betriebszeit." }
];

const services = [
  { title: "Haftungsübernahme", description: "Vollständige Übernahme der Verkehrssicherungspflicht.", icon: Shield },
  { title: "24/7 Bereitschaft", description: "Rund um die Uhr, auch an Feiertagen.", icon: Clock },
  { title: "Wetterüberwachung", description: "Proaktive Einsätze bei Glättegefahr.", icon: Snowflake },
  { title: "Moderne Ausrüstung", description: "Effiziente Räum- und Streufahrzeuge.", icon: Truck },
  { title: "GPS-Dokumentation", description: "Gerichtsfeste Nachweise jedes Einsatzes.", icon: FileText },
  { title: "Präventives Streuen", description: "Vorausschauend vor Glatteisbildung.", icon: AlertTriangle }
];

const stats = [
  { value: "100%", label: "Haftungsübernahme" },
  { value: "24/7", label: "Bereitschaft" },
  { value: "GPS", label: "Dokumentiert" }
];

const faqs = [
  { question: "Was bedeutet Haftungsübernahme konkret?", answer: "Bei einem Glätteunfall auf Ihren Flächen haften wir, nicht Sie. Vertraglich fixiert, versichert bis 10 Mio. €." },
  { question: "Ab wann sind Flächen geräumt?", answer: "Gehwege werktags ab 7 Uhr, Sonn-/Feiertage ab 9 Uhr. Betriebsflächen nach Vereinbarung auch früher." },
  { question: "Welche Streumittel werden verwendet?", answer: "Umweltschonendes Streugut nach Abstimmung. Auf Wunsch salzfreie Alternativen." }
];

const relatedLinks = [
  { label: "Facility Management", href: "/facility-management" },
  { label: "Winterdienst Außen", href: "/aussenanlagen/winterdienst" },
  { label: "München", href: "/standorte/muenchen" },
];

const trustBadges = [
  { icon: Shield, label: "Haftungsübernahme" },
  { icon: Clock, label: "24/7 Bereitschaft" },
  { icon: MapPin, label: "GPS-dokumentiert" }
];

export default function Winterdienst() {
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
                <span className="font-medium text-primary-foreground">Winterdienst</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                100% Haftungsübernahme & GPS-Dokumentation
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Winterdienst
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professioneller Winterdienst mit vollständiger Haftungsübernahme. Schneeräumung und Streudienst mit GPS-dokumentierten Einsätzen.
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
                Eis und Schnee stellen ein erhebliches Haftungsrisiko dar. Als Eigentümer oder Verwalter haften Sie persönlich für Unfälle auf Ihrem Grundstück. Mit unserem Winterdienst übertragen Sie die Verkehrssicherungspflicht vollständig an uns – vertraglich und versicherungstechnisch abgesichert, GPS-dokumentiert und gerichtsfest.
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
                    <h3 className="font-bold text-foreground">Gerichtsfeste Dokumentation</h3>
                    <p className="mt-2 text-muted-foreground">GPS-Koordinaten, Zeitstempel und Fotos jedes Einsatzes. Im Streitfall der entscheidende Beweis für die Erfüllung Ihrer Räum- und Streupflicht.</p>
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
                  „Für Portfolios mit vielen Standorten bieten wir bundesweite Betreuung mit einheitlichen Standards und konsolidiertem Reporting."
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
