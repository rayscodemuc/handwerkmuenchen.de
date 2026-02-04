"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Zap, Droplets, Paintbrush, Sparkles, Building2, ArrowRight } from "lucide-react";

// 5 Gewerke: Elektromeister, Sanitär & Heizung, Maler & Boden, Reinigung, Facility
const services = [
  {
    id: "elektromeister",
    title: "Elektromeister",
    description: "Elektrotechnik und Elektro-Notdienst – ein Vertrag, ein Ansprechpartner. Meisterbetrieb als Qualitätsinstanz.",
    href: "/handwerk/elektrotechnik",
    icon: Zap,
  },
  {
    id: "sanitaer-heizung",
    title: "Sanitär & Heizung",
    description: "Sanitär, Heizung und HLK aus einer Hand. Generalunternehmer-Modell mit verantwortlichem Meister.",
    href: "/handwerk/sanitaer-heizung",
    icon: Droplets,
  },
  {
    id: "maler-boden",
    title: "Maler & Boden",
    description: "Malerei, Fassade und Bodenbeläge. Innen- und Außenanstrich, Bodenbeschichtungen, Oberflächenschutz.",
    href: "/maler-boden",
    icon: Paintbrush,
  },
  {
    id: "reinigung",
    title: "Reinigung",
    description: "Unterhalts-, Büro- und Fensterreinigung sowie Sonder- und Grundreinigung für glänzende Ergebnisse.",
    href: "/reinigung",
    icon: Sparkles,
  },
  {
    id: "facility",
    title: "Facility",
    description: "Hausmeisterservice, Winterdienst, Objektmanagement und Außenanlagen – Betrieb und Werterhalt aus einer Hand.",
    href: "/facility-management",
    icon: Building2,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl xl:text-6xl">
            Leistungen, die über den Standard hinausgehen
          </h2>
          <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
            Ein Vertrag, ein Ansprechpartner – kein Subunternehmer-Lotto. Wir steuern als Generalunternehmer alle Gewerke: feste Meister pro Fachbereich, volle Haftungsübernahme, beweisbare Qualität.
          </p>
        </div>

        {/* Service Cards Grid - 5 Gewerke */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl lg:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-foreground lg:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center gap-2 font-semibold text-primary transition-colors group-hover:text-primary/80">
                  Mehr erfahren
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link href="/anfrage">
            <AnimatedButton className="h-14 px-10 text-base">Angebot anfragen</AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
