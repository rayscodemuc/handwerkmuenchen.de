"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Zap, Droplets, Paintbrush, Sparkles, Building2, ArrowRight } from "lucide-react";

// 5 Gewerke: Elektrotechnik, Sanitär & Heizung, Innenausbau, Reinigung, Facility
const services = [
  {
    id: "elektrotechnik",
    title: "Elektrotechnik",
    description: "Elektrotechnik – ein Vertrag, ein Ansprechpartner. Meisterbetrieb als Qualitätsinstanz.",
    href: "/leistungen/elektrotechnik",
    icon: Zap,
  },
  {
    id: "sanitaer-heizung",
    title: "Sanitär & Heizung",
    description: "Sanitär, Heizung und HLK aus einer Hand. Generalunternehmer-Modell mit verantwortlichem Meister.",
    href: "/leistungen/sanitaer-heizung",
    icon: Droplets,
  },
  {
    id: "innenausbau",
    title: "Innenausbau",
    description: "Malerei, Fassade und Bodenbeläge. Innen- und Außenanstrich, Bodenbeschichtungen, Oberflächenschutz.",
    href: "/leistungen/innenausbau",
    icon: Paintbrush,
  },
  {
    id: "reinigung",
    title: "Reinigung",
    description: "Unterhalts-, Büro- und Fensterreinigung sowie Sonder- und Grundreinigung für glänzende Ergebnisse.",
    href: "/leistungen/reinigung",
    icon: Sparkles,
  },
  {
    id: "facility",
    title: "Facility",
    description: "Hausmeisterservice, Winterdienst, Objektmanagement und Außenanlagen – Betrieb und Werterhalt aus einer Hand.",
    href: "/leistungen/facility",
    icon: Building2,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#8AB0AB] py-28 lg:py-36 -mt-1 relative z-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl xl:text-6xl">
            Keine Kette.
            <br />
            Keine Ausreden.
            <br />
            Klare Zuständigkeit.
          </h2>
          <p className="mt-6 text-lg text-white lg:text-xl">
            Ein zentraler Ansprechpartner und klare Zuständigkeiten – ohne Subunternehmer-Lotto. Feste Meisterbetriebe pro Gewerk, abgestimmte Ausführung, dokumentierte Übergabe.
          </p>
        </div>

        {/* Service Cards Grid - 5 Gewerke (Fenster öffnen sich beim Hover) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFourth = index === 3;
            const isFifth = index === 4;
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative flex flex-col overflow-hidden rounded-lg border-[3px] border-primary/25 bg-card p-8 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform lg:p-10 lg:hover:border-primary/40 lg:hover:shadow-xl lg:hover:[transform:rotateY(-10deg)] ${isFourth ? "lg:col-start-2" : ""} ${isFifth ? "lg:col-start-3" : ""}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Fensterkreuz: vertikale und horizontale Linie */}
                <span className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-px bg-primary/15" aria-hidden />
                <span className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-px bg-primary/15" aria-hidden />
                {/* Leichter Glaseffekt oben */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" aria-hidden />

                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-[#3E505B] transition-colors lg:group-hover:bg-primary/20 lg:group-hover:text-[#3E505B]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="relative z-10 mt-6 text-2xl font-black text-[#3E505B] lg:text-3xl">
                  {service.title}
                </h3>
                <p className="relative z-10 mt-4 flex-1 text-[#3E505B] leading-relaxed">
                  {service.description}
                </p>
                <div className="relative z-10 mt-8 flex items-center gap-2 font-semibold text-[#3E505B] transition-colors">
                  Mehr erfahren
                  <ArrowRight className="h-5 w-5 transition-transform lg:group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link href="/anfrage">
            <AnimatedButton className="h-14 px-10 text-base bg-[#3E505B] text-white hover:bg-[#3E505B]/90">
              Angebot anfragen
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
