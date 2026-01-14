import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Droplets, Gauge, ShieldCheck, Activity, Thermometer, Clock, FileText, AlertTriangle, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sanitär- & Heizungstechnik",
  description: "Zertifizierte Wartung und Instandhaltung technischer Gebäudeanlagen. Wir schützen Ihre Assets gegen Systemausfälle und Wasserschäden.",
  alternates: {
    canonical: "/leistungen/sanitaer-heizung",
  },
};

const sections = [
  {
    title: "Versorgungssicherheit als strategischer Imperativ",
    content: "Die Heizungswartung Gewerbe unterscheidet sich fundamental von privaten Installationen. Komplexe Heizkreise, Großkessel und Fernwärmeübergabestationen erfordern spezialisiertes Know-how und präventive Wartungsstrategien. Unser Ansatz: Wir identifizieren Schwachstellen, bevor sie zu Ausfällen führen. Durch sensorbasiertes Leckage-Management und regelmäßige Druckprüfungen nach DIN EN 1717 minimieren wir das Risiko von Wasserschäden und sichern die Verfügbarkeit Ihrer Anlagen zu 99,5 %."
  },
  {
    title: "TrinkwV-Konformität und Legionellenprävention",
    content: "Die Trinkwasserverordnung 2024 verschärft die Pflichten für Betreiber erheblich. Legionellenprüfungen in festgelegten Intervallen, die Dokumentation von Warmwassertemperaturen und die Gefährdungsanalyse bei Grenzwertüberschreitungen sind keine Option – sie sind Gesetz. Wir führen akkreditierte Probenahmen durch, erstellen gerichtsfeste Dokumentationen und setzen bei positivem Befund sofort thermische oder chemische Desinfektionsmaßnahmen um. Die Haftungsfreistellung unserer Kunden hat höchste Priorität."
  },
  {
    title: "Asset-Schutz durch Präventiv-Wartung",
    content: "Wasserschäden zählen zu den häufigsten und teuersten Schadensarten in der Immobilienwirtschaft. Unsere Präventiv-Wartung nach DIN 31051 umfasst den hydraulischen Abgleich zur Energieoptimierung, die Inspektion von Rohrverbindungen und Absperrarmaturen sowie die vorausschauende Erneuerung von Verschleißteilen. Das Ergebnis: Werterhalt Ihrer Immobilienportfolios, planbare Instandhaltungsbudgets und die Vermeidung von Notfällen, die Ihr Tagesgeschäft lahmlegen."
  }
];

const services = [
  { title: "Heizungswartung Gewerbe", description: "Jährliche Wartung nach Herstellervorgaben inkl. Abgasmessung und Brennereinstellung.", icon: Thermometer },
  { title: "Legionellenprüfung", description: "Akkreditierte Probenahme nach TrinkwV 2024 mit Laboranalyse und Maßnahmenempfehlung.", icon: Droplets },
  { title: "Hydraulischer Abgleich", description: "Optimierung der Wärmeverteilung für bis zu 30 % Energieeinsparung.", icon: Gauge },
  { title: "Leckage-Prävention", description: "Sensorbasiertes Monitoring und Druckprüfungen zur Früherkennung.", icon: Activity },
  { title: "SHK Notdienst B2B", description: "Havarie-Management mit garantierten Reaktionszeiten unter 60 Minuten.", icon: AlertTriangle },
  { title: "Revisionssichere Dokumentation", description: "Digitale Protokolle für Audits, Versicherungen und Behörden.", icon: FileText }
];

const stats = [
  { value: "< 60", label: "Minuten Reaktion" },
  { value: "99,5%", label: "Anlagenverfügbarkeit" },
  { value: "24/7", label: "Havarie-Hotline" }
];

const faqs = [
  { 
    question: "Wer haftet bei einem Legionellenbefund?", 
    answer: "Der Betreiber – also Eigentümer oder beauftragte Verwaltung. Ohne dokumentierte Prüfungen und Maßnahmen drohen Bußgelder bis 25.000 € und persönliche Haftung. Unsere lückenlose Dokumentation stellt Ihre Haftungsfreistellung sicher." 
  },
  { 
    question: "Wie hoch ist das Einsparpotenzial durch Effizienz-Audits?", 
    answer: "Durch hydraulischen Abgleich, Pumpentausch und optimierte Regelung erreichen wir typischerweise 15-30 % Energieeinsparung. Bei größeren Anlagen amortisiert sich die Investition innerhalb von 1-2 Heizperioden." 
  },
  { 
    question: "Wie schnell sind Sie bei einer Havarie vor Ort?", 
    answer: "Unser SHK Notdienst B2B garantiert Reaktionszeiten unter 60 Minuten in Ballungsräumen. Nachts und am Wochenende stehen permanente Bereitschaftsteams zur Verfügung." 
  },
  { 
    question: "Können Sie mehrere Standorte bundesweit betreuen?", 
    answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Sie erhalten einheitliche Prozesse, konsolidiertes Reporting und einen festen Ansprechpartner." 
  },
  { 
    question: "Was unterscheidet Ihre Wartung von günstigeren Anbietern?", 
    answer: "Wir dokumentieren gerichtsfest, setzen zertifizierte Techniker ein und übernehmen die volle Gewährleistung. Im Schadensfall sparen Sie sich den Streit mit Versicherung und Handwerker – das ist die eigentliche Kostenersparnis." 
  }
];

const relatedLinks = [
  { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
  { label: "Elektrotechnik & DGUV V3", href: "/leistungen/elektrotechnik" },
  { label: "Service & Wartung", href: "/leistungen/service-wartung" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Clock, label: "24/7 Havarie-Hotline" },
  { icon: ShieldCheck, label: "DVGW zertifiziert" },
  { icon: Activity, label: "Leckage-Monitoring" }
];

export default function SanitaerHeizung() {
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
                <Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Handwerk
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Sanitär- & Heizungstechnik</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Versorgungssicherheit & Asset-Schutz
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Sanitär- & Heizungstechnik
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Zertifizierte Wartung und Instandhaltung technischer Gebäudeanlagen. Wir schützen Ihre Assets gegen Systemausfälle und Wasserschäden.
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
                Sanitär- und Heizungsanlagen sind die kritische Infrastruktur jeder Gewerbeimmobilie. Ein ungeplanter Ausfall bedeutet nicht nur Komfortverlust – er gefährdet Geschäftsprozesse, verursacht Wasserschäden in Millionenhöhe und zieht bei Verstößen gegen die Trinkwasserverordnung 2024 empfindliche Bußgelder nach sich. Als zertifizierter SHK-Fachbetrieb mit bundesweiter Präsenz übernehmen wir die vollständige Betreiberverantwortung für Ihre haustechnischen Anlagen.
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
                    <h3 className="font-bold text-foreground">Gerichtsfeste Rechtssicherheit</h3>
                    <p className="mt-2 text-muted-foreground">Jede Wartung, Prüfung und Maßnahme wird revisionssicher dokumentiert. Im Schadensfall weisen Sie gegenüber Versicherungen und Behörden die Erfüllung Ihrer Betreiberpflichten lückenlos nach.</p>
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
                  „Für Hausverwaltungen und Property Manager mit verteilten Portfolios bieten wir Rahmenverträge mit einheitlichen SLAs, zentralem Reporting und einem Ansprechpartner für alle Standorte."
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