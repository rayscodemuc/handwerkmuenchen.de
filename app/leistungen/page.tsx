import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Zap, Droplets, Paintbrush, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen der Meisterrunde",
  description: "Vier Gewerke, ein abgestimmtes Team. Meistergeführt geplant, sauber umgesetzt, dokumentiert übergeben. Elektrotechnik, Sanitär & Heizung, Innenausbau, Reinigung & Facility.",
  alternates: { canonical: "/leistungen" },
};

const GEWERKE = [
  {
    name: "Elektrotechnik",
    href: "/leistungen/elektrotechnik",
    teaser: "Von der Hausinstallation bis zur Gebäudeautomation – ein Ansprechpartner für alle elektrotechnischen Anforderungen.",
    tags: ["Zähler/UV", "E-Check", "Beleuchtung"],
    icon: Zap,
  },
  {
    name: "Sanitär & Heizung",
    href: "/leistungen/sanitaer-heizung",
    teaser: "SHK und HLK aus einer Hand: Planung, Installation, Wartung und Havarie-Service für Gewerbe und Wohnanlagen.",
    tags: ["Trinkwasser", "Heizung", "HLK"],
    icon: Droplets,
  },
  {
    name: "Innenausbau",
    href: "/leistungen/innenausbau",
    teaser: "Malerei, Fassade, Bodenbeläge und Fliesen – Innenausbau aus einer Hand, termingerecht und abnahmesicher.",
    tags: ["Malerei", "Boden", "Fliesen"],
    icon: Paintbrush,
  },
  {
    name: "Reinigung & Facility",
    href: "/leistungen/reinigung-facility",
    teaser: "Reinigung, Hausmeisterservice, Winterdienst und Objektmanagement – Betrieb und Werterhalt aus einer Hand.",
    tags: ["Reinigung", "Hausmeister", "Winterdienst"],
    icon: Building2,
  },
];

const STEPS = [
  "Anfrage",
  "Kurzklärung",
  "Planung",
  "Ausführung",
  "Dokumentierte Übergabe",
];

export default function LeistungenHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center bg-[#26413C] py-16 lg:min-h-[480px] lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Leistungen der Meisterrunde
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/90 leading-relaxed">
              Vier Gewerke, ein abgestimmtes Team. Meistergeführt geplant, sauber umgesetzt, dokumentiert übergeben.
            </p>
            <div className="mt-8">
              <Link href="/anfrage">
                <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gewerke-Grid (4 Kacheln) */}
      <section className="bg-background py-16 lg:py-24" aria-labelledby="gewerke-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="gewerke-heading" className="sr-only">
            Unsere Gewerke
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {GEWERKE.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {g.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {g.teaser}
                  </p>
                  {g.tags && g.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {g.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ablauf (5 Steps, kompakt) */}
      <section className="bg-muted/40 py-16 lg:py-20" aria-labelledby="ablauf-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="ablauf-heading" className="text-center text-2xl font-bold text-foreground mb-10">
            So arbeiten wir
          </h2>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 max-w-3xl mx-auto">
            {STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{step}</span>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Abschluss-CTA-Band */}
      <section className="bg-[#26413C] py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-lg font-semibold text-white">
            Projekt anfragen
          </p>
          <p className="mt-1 text-sm text-white/80">
            München & Umgebung · Ein Ansprechpartner für alle Gewerke
          </p>
          <div className="mt-6">
            <Link href="/anfrage">
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                Projekt anfragen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
