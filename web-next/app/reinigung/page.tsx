import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { BadgeRow } from "@/components/BadgeRow";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Building2, ShieldCheck, BarChart3, Settings, Users, ChevronRight, CheckCircle2, Cpu, Zap, LineChart, Phone } from "lucide-react";
import type { Metadata } from "next";

const REINIGUNG_FACILITY_BADGES = ["Fachbetrieb", "GU-Abwicklung", "Dokumentierte Abnahme"];

export const metadata: Metadata = {
  title: "Reinigung",
  description: "Reinigung neu definiert. Wir putzen nicht nur – wir pflegen Werte durch High-End Systematik und menschliche Expertise. Kein Standard, sondern Präzision.",
  alternates: {
    canonical: "/reinigung",
  },
};

const services = [
  {
    icon: Cpu,
    title: "Unterhaltsreinigung",
    description: "Wir sichern die tägliche Performance Ihrer Flächen mit Systematik und einem Auge für Details, die andere übersehen.",
    link: "/leistungen/unterhaltsreinigung",
  },
  {
    icon: ShieldCheck,
    title: "Glas- & Fassadenreinigung",
    description: "Der erste Eindruck zählt. Wir sorgen für streifenfreie Brillanz und schützen die Substanz Ihrer Gebäudehülle.",
    link: "/leistungen/glas-fassade",
  },
  {
    icon: BarChart3,
    title: "Sonderreinigung",
    description: "Härtefälle sind unser Spezialgebiet. Von Baureinigung bis Desinfektion – wir liefern Reinheit, wo Standard scheitert.",
    link: "/leistungen/sonderreinigung",
  },
];

const reasons = [
  {
    icon: LineChart,
    title: "Digitale Kontrolle",
    description: "Wir liefern keine Versprechen, sondern Fakten. Digitale Checklisten zeigen Ihnen jederzeit den Status der Reinigung.",
  },
  {
    icon: Users,
    title: "Feste Teams",
    description: "Kein Personal-Lotto. Wir setzen auf beständige Teams, die Ihr Objekt kennen und Verantwortung persönlich nehmen.",
  },
  {
    icon: Zap,
    title: "Reaktions-Speed",
    description: "Bedarf kurzfristig geändert? Durch unsere flachen Hierarchien sind wir sofort einsatzbereit, wenn es brennt.",
  },
  {
    icon: Settings,
    title: "Keine Massenabfertigung",
    description: "Wir betreuen nur eine ausgewählte Anzahl an Objekten, um unsere extrem hohen Qualitätsstandards zu garantieren.",
  },
];

export default function ReinigungCategory() {
  return (
    <>
        {/* Hero – gleicher Aufbau wie Elektrotechnik */}
        <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                Hygiene & Werterhalt
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Sauberkeit schafft Werte.
              </h1>
              <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
                Wir schützen die Substanz Ihrer Immobilien durch systematische Reinheit. Wo andere nur oberflächlich wischen, sichern wir langfristig Qualität und Gesundheit Ihres Arbeitsumfelds.{" "}
                <Link href="/standorte/muenchen" className="text-white/90 hover:underline font-medium">
                  Standort München
                </Link>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>
                    Reinheits-Check anfordern
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
                  Hygienische Intelligenz. <br />
                  Sichtbare Verantwortung.
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Echte Reinigung ist kein Handwerk von der Stange, sondern eine Frage der Einstellung. Wir kombinieren moderne Systematik mit geschultem Personal, das Verantwortung noch persönlich nimmt. Bei uns gibt es kein „schnell drüberwischen", sondern nur Ergebnisse, die einer kritischen Prüfung standhalten.
                </p>
                <ul className="space-y-4">
                  {[
                    "Kein Personal-Hopping – feste Ansprechpartner",
                    "Einsatz von High-End Equipment",
                    "Transparente Echtzeit-Dokumentation",
                    "Strengste Einhaltung von Hygiene-Standards"
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
                  <p className="text-xl font-medium">Purity meets Professionalism</p>
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
                Werterhalt durch Reinheit
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Vom Bürokomplex bis zur Industriehalle – wir liefern Lösungen, die über den Standard hinausgehen.
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
