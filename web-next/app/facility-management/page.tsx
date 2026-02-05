import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { BadgeRow } from "@/components/BadgeRow";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Building2, ShieldCheck, BarChart3, Settings, Users, ChevronRight, CheckCircle2, Cpu, Zap, LineChart, Phone } from "lucide-react";
import type { Metadata } from "next";

const REINIGUNG_FACILITY_BADGES = ["Fachbetrieb", "GU-Abwicklung", "Dokumentierte Abnahme"];

export const metadata: Metadata = {
  title: "Facility Management",
  description: "Facility Management neu gedacht. Wir verwalten nicht nur – wir erhalten Werte durch High-End Sensorik und menschliche Expertise. Kein Standard, sondern digitale Präzision.",
  alternates: {
    canonical: "/facility-management",
  },
};

const services = [
  {
    icon: Cpu,
    title: "Objektmanagement",
    description: "Wir überwachen Ihre Gebäudeleittechnik mit smarter Sensorik. Fehler werden erkannt, bevor sie den Betrieb stören.",
    link: "/leistungen/objektmanagement",
  },
  {
    icon: ShieldCheck,
    title: "Hausmeisterservice",
    description: "Kein Reagieren auf Schäden. Wir planen den Werterhalt Ihrer Immobilie strategisch und mit digitaler Präzision.",
    link: "/leistungen/hausmeisterservice",
  },
  {
    icon: BarChart3,
    title: "Service & Wartung",
    description: "Maximale Transparenz über Verbräuche und Lastspitzen. Wir optimieren Ihre Kostenbasis durch High-End Analytik.",
    link: "/leistungen/service-wartung",
  },
];

const reasons = [
  {
    icon: LineChart,
    title: "Datenbasierter Werterhalt",
    description: "Wir liefern keine Schätzungen, sondern Fakten. Digitale Berichte zeigen Ihnen jederzeit den Status Ihres Objekts.",
  },
  {
    icon: Users,
    title: "Echte Verantwortung",
    description: "Ein fester Objektmanager statt wechselnder Subunternehmer. Bei uns zählt das Wort und die Fachkompetenz.",
  },
  {
    icon: Zap,
    title: "Reaktions-Speed",
    description: "Durch digitale Vernetzung sind unsere Techniker im Notfall informiert, bevor Sie zum Hörer greifen müssen.",
  },
  {
    icon: Settings,
    title: "Keine Massenverwaltung",
    description: "Wir nehmen nur Projekte an, die wir mit 100% Fokus betreuen können. Qualität statt unpersönlicher Großverwaltung.",
  },
];

export default function FacilityManagementCategory() {
  return (
    <>
        {/* Hero – gleicher Aufbau wie Elektrotechnik */}
        <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                Objektmanagement & Werterhalt
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Verwalten war Gestern.
              </h1>
              <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
                Wir steuern Ihre Immobilien mit proaktiver Intelligenz. Wir sichern nicht nur den Bestand, wir steigern die Performance.{" "}
                <Link href="/standorte/muenchen" className="text-white/90 hover:underline font-medium">
                  Standort München
                </Link>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>
                    Objekt-Status prüfen
                  </AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    Jetzt anrufen
                  </AnimatedButton>
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <BadgeRow items={REINIGUNG_FACILITY_BADGES} theme="dark" />
              </div>
            </div>
          </div>
        </section>

{/* Tech & Human Connection Section */}
<section className="bg-primary text-primary-foreground py-24">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2 items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-6">
          Präventive Intelligenz. <br />
          Strategischer Werterhalt.
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8">
          In der modernen Immobilienbewirtschaftung ist Stillstand das größte Risiko. Wir vernetzen Ihre Objekte mit präventiver Analytik, um Verschleiß zu antizipieren, bevor er Ihre Bilanz belastet. Doch Technik liefert nur die Basis – die finale Bewertung und Steuerung bleibt bei uns die Aufgabe von erfahrenen Spezialisten mit echtem Verantwortungsbewusstsein.
        </p>
        <ul className="space-y-4">
          {[
            "Keine anonymen Ticket-Systeme",
            "Predictive Maintenance für technische Anlagen",
            "Lückenlose digitale Dokumentation (Audit-safe)",
            "Fester Objektmanager mit Entscheidungskompetenz"
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-square lg:aspect-video rounded-2xl overflow-hidden bg-muted/20 flex items-center justify-center border border-white/10">
        <div className="text-center p-8">
          <Settings className="h-16 w-16 text-primary mx-auto mb-4 animate-spin-slow" />
          <p className="text-xl font-medium">Stewardship meets Analytics</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Services Section */}
<section className="bg-background py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Ganzheitlicher Werterhalt
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Technisches, kaufmännisches und infrastrukturelles Management – koordiniert aus einer Hand.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.link}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg"
                >
                  <service.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

{/* Why Us Section */}
<section className="bg-muted/50 py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Ihre Vorteile
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Ihre Vorteile
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <reason.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryTrustSection />
        <CTASection />
    </>
  );
}
