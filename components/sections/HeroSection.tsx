"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Calculator } from "lucide-react";

const GEWERKE_PRIMARY = [
  { label: "Elektrotechnik", href: "/leistungen/elektrotechnik" },
  { label: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" },
  { label: "Innenausbau", href: "/leistungen/innenausbau" },
];
const PROOF_STRIP = "Ein Vertrag · Dokumentation & Übergabe";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#3E505B] -mt-[1px] border-b-0">
      <div className="relative min-h-[560px] md:min-h-[600px] lg:min-h-[70vh] lg:max-h-[800px] flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center pt-8 pb-16 sm:pt-16 sm:pb-16 lg:py-24">
          <div className="w-full max-w-3xl pt-4 pb-8 lg:pt-6 lg:pb-12 text-center animate-hero-fade-up">
            {/* Main Headline */}
            <div className="relative animate-hero-fade-up-delay-1">
              <h1 className="font-bold leading-[0.9] tracking-tight">
                <span className="block text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.4rem] xl:text-[6.2rem] text-white">
                  Die Meisterrunde.
                </span>
              </h1>
            </div>

            {/* Ein starker Claim (1:1) */}
            <p className="mt-3 sm:mt-4 mx-auto max-w-[560px] text-base sm:text-lg lg:text-xl font-medium text-white animate-hero-fade-up-delay-3">
              Feste Meister. Ein Vertrag. Keine Subunternehmer-Kette.
            </p>

            {/* Gewerke-Chips: Mobile untereinander/gleiche Breite, ab sm horizontal */}
            <div className="mt-14 sm:mt-20 flex flex-col items-center gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto animate-hero-fade-up-delay-4">
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
                {GEWERKE_PRIMARY.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] rounded-full border-2 border-white/40 bg-[#4C626C] px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-lg font-semibold text-white transition-colors hover:border-white/70 hover:bg-[#8AB0AB]"
                  >
                    {g.label}
                  </Link>
                ))}
              </div>
              <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm text-white/90">
                <span>+ </span>
                <Link
                  href="/leistungen/reinigung-facility/reinigung"
                  className="text-[#8AB0AB] hover:text-[#8AB0AB] underline-offset-2 hover:underline"
                >
                  Reinigung
                </Link>
                <span> & </span>
                <Link
                  href="/leistungen/reinigung-facility/facility"
                  className="text-[#8AB0AB] hover:text-[#8AB0AB] underline-offset-2 hover:underline"
                >
                  Facility
                </Link>
                <span> (Fachbetrieb) – Qualitätsstandards, dokumentierte Leistung.</span>
              </p>
            </div>

            {/* Proof-Zeile (unter Chips, dezenter) */}
            <p className="mt-5 text-xs sm:text-sm text-white/80 animate-hero-fade-up-delay-5">
              {PROOF_STRIP}
            </p>

            {/* Primary CTA */}
            <div className="mt-6 sm:mt-8 flex justify-center animate-hero-fade-up-delay-55">
              <Link href="/anfrage" className="w-full sm:w-auto">
                <AnimatedButton className="w-full sm:w-auto bg-[#8AB0AB] text-primary-foreground hover:bg-[#8AB0AB]/90 shadow-sm text-base px-8 py-5 sm:py-6">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </div>

            {/* Secondary CTA: leiser, unter Primary, Textlink ohne Kästchen */}
            <div className="mt-4 flex justify-center animate-hero-fade-up-delay-65">
              <Link
                href="/rechner"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/80 hover:text-white underline-offset-2 hover:underline"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" aria-hidden />
                <span>Richtpreis Reinigung/Facility →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
