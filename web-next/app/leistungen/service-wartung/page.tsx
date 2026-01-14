import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Wrench, Calendar, FileText, Clock, Settings, ShieldCheck, Activity, TrendingUp, AlertTriangle, BarChart, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service & Wartung",
  description: "Gewerkübergreifende Anlagenwartung nach DIN 31051. Maximale Verfügbarkeit, planbare Kosten und volle Rechtssicherheit.",
  alternates: {
    canonical: "/leistungen/service-wartung",
  },
};

const sections = [
  {
    title: "Präventive Instandhaltung statt teurer Notfälle",
    content: "Reaktive Wartung – also Reparatur nach Ausfall – ist die teuerste aller Strategien. Studien belegen: Jeder Euro in präventive Instandhaltung spart 5-10 Euro an Folgekosten. Unser Ansatz kombiniert zustandsbasierte Inspektion, herstellerkonforme Wartungsintervalle und prädiktive Analytik. So erkennen wir Verschleiß, bevor er zum Ausfall führt. Das Ergebnis: Anlagenverfügbarkeit über 99 %, planbare Budgets und die Vermeidung von Produktionsausfällen."
  },
  {
    title: "Gewerkübergreifende Kompetenz aus einer Hand",
    content: "Fragmentierte Wartungsverträge mit unterschiedlichen Dienstleistern für Heizung, Lüftung, Elektro und Aufzüge erzeugen Abstimmungschaos und Schnittstellenprobleme. Wir bündeln alle Gewerke in einem Rahmenvertrag: HLK, Sanitär, Elektrotechnik, Brandmeldetechnik, Aufzugsanlagen und Gebäudeautomation. Ein Ansprechpartner, einheitliche SLAs, konsolidiertes Reporting – und volle Transparenz über alle Standorte."
  },
  {
    title: "Rechtssicherheit durch lückenlose Dokumentation",
    content: "Im Schadensfall prüfen Versicherungen und Behörden als erstes die Wartungsdokumentation. Fehlende oder unvollständige Nachweise führen zu Regressansprüchen und persönlicher Haftung der Geschäftsführung. Unsere revisionssichere digitale Dokumentation erfüllt alle Anforderungen der Betriebssicherheitsverordnung (BetrSichV) und der DGUV Vorschriften. Sie weisen die Erfüllung Ihrer Betreiberpflichten jederzeit lückenlos nach."
  }
];

const services = [
  { title: "Wartungsplanung", description: "Individuelle Pläne nach DIN 31051, VDMA 24186 und Herstellervorgaben.", icon: Calendar },
  { title: "Präventive Wartung", description: "Zustandsbasierte Inspektion mit prädiktiver Analytik.", icon: TrendingUp },
  { title: "Störungsmanagement", description: "24/7-Hotline mit garantierten Reaktionszeiten nach SLA.", icon: AlertTriangle },
  { title: "Condition Monitoring", description: "Sensorbasierte Zustandsüberwachung kritischer Anlagen.", icon: Activity },
  { title: "Revisionssichere Dokumentation", description: "Digitale Protokolle für Audits, Versicherungen und BetrSichV.", icon: FileText },
  { title: "Multi-Site-Management", description: "Einheitliche Standards für verteilte Portfolios.", icon: BarChart }
];

const stats = [
  { value: "99%+", label: "Verfügbarkeit" },
  { value: "2-24h", label: "Reaktionszeit" },
  { value: "DIN 31051", label: "Konform" }
];

const faqs = [
  { 
    question: "Was kostet ein Wartungsausfall wirklich?", 
    answer: "Ein Heizungsausfall im Bürogebäude kostet durchschnittlich 5.000-15.000 € pro Tag an Produktivitätsverlust und Notfallreparatur. Ein defekter Aufzug verursacht neben den Reparaturkosten potenzielle Haftungsansprüche. Präventive Wartung kostet einen Bruchteil davon." 
  },
  { 
    question: "Wie werden Wartungsintervalle festgelegt?", 
    answer: "Wir kombinieren Herstellervorgaben, gesetzliche Prüffristen (BetrSichV, DGUV) und Ihre Nutzungsprofile zu einem individuellen Wartungsplan. Kritische Anlagen erhalten kürzere Intervalle, weniger kritische werden kostenoptimiert betreut." 
  },
  { 
    question: "Was ist in einem SLA-basierten Wartungsvertrag enthalten?", 
    answer: "Regelmäßige Inspektionen, präventive Wartung, Verschleißteilersatz, 24/7-Störungshotline mit garantierten Reaktionszeiten, vollständige Dokumentation und quartalsweises Reporting mit KPIs." 
  },
  { 
    question: "Können Sie mehrere Standorte bundesweit betreuen?", 
    answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Sie erhalten einheitliche Prozesse, konsolidiertes Reporting und einen festen Ansprechpartner – unabhängig vom Standort." 
  },
  { 
    question: "Wie schnell amortisiert sich präventive Wartung?", 
    answer: "Typischerweise innerhalb von 6-12 Monaten durch vermiedene Notfälle, verlängerte Anlagenlebensdauer und optimierte Energieeffizienz. Bei größeren Portfolios oft bereits im ersten Quartal." 
  }
];

const relatedLinks = [
  { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
  { label: "Elektrotechnik & DGUV V3", href: "/leistungen/elektrotechnik" },
  { label: "Sanitär- & Heizungstechnik", href: "/leistungen/sanitaer-heizung" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Clock, label: "24/7 Störungshotline" },
  { icon: ShieldCheck, label: "BetrSichV-konform" },
  { icon: Activity, label: "Condition Monitoring" }
];

export default function ServiceWartung() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
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
                <Link href="/handwerk" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Handwerk
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Service & Wartung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Betriebssicherheit & Compliance
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Service & Wartung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Gewerkübergreifende Anlagenwartung nach DIN 31051. Maximale Verfügbarkeit, planbare Kosten und volle Rechtssicherheit.
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
                Technische Anlagen sind das Rückgrat jeder Gewerbeimmobilie. Ein ungeplanter Ausfall der Heizung im Winter, ein defekter Aufzug oder eine ausgefallene Lüftungsanlage im Rechenzentrum – die Folgekosten übersteigen die Wartungskosten um ein Vielfaches. Als gewerkübergreifender Wartungsdienstleister übernehmen wir die vollständige Betreiberverantwortung für Ihre technischen Anlagen nach DIN 31051 und VDMA 24186.
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
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Garantierte Service Level Agreements</h3>
                    <p className="mt-2 text-muted-foreground">Maßgeschneiderte SLAs mit Reaktionszeiten von 2 bis 24 Stunden – je nach Kritikalität der Anlage. Bei Unterschreitung der Verfügbarkeitsziele greifen vertraglich fixierte Kompensationen.</p>
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
                  „Für Hausverwaltungen und Property Manager mit verteilten Portfolios bieten wir Rahmenverträge mit einheitlichen Prozessen, zentralem Reporting und einem festen Ansprechpartner für alle Standorte."
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
      </main>
      <Footer />
    </div>
  );
}