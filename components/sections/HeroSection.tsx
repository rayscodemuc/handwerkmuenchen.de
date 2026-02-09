"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";

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
          <motion.div
            className="w-full max-w-3xl pt-4 pb-8 lg:pt-6 lg:pb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="font-bold leading-[0.9] tracking-tight">
                <span className="block text-[2.6rem] sm:text-[3.4rem] md:text-[4.4rem] lg:text-[5.4rem] xl:text-[6.2rem] text-white">
                  Die Meisterrunde.
                </span>
              </h1>
            </motion.div>

            {/* Ein starker Claim (1:1) */}
            <motion.p
              className="mt-3 sm:mt-4 mx-auto max-w-[560px] text-base sm:text-lg lg:text-xl font-medium text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Feste Meister. Ein Vertrag. Keine Subunternehmer-Kette.
            </motion.p>

            {/* Gewerke-Chips: Mobile untereinander/gleiche Breite, ab sm horizontal */}
            <motion.div
              className="mt-14 sm:mt-20 flex flex-col items-center gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
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
                  href="/leistungen/reinigung"
                  className="text-[#8AB0AB] hover:text-[#8AB0AB] underline-offset-2 hover:underline"
                >
                  Reinigung
                </Link>
                <span> & </span>
                <Link
                  href="/leistungen/facility"
                  className="text-[#8AB0AB] hover:text-[#8AB0AB] underline-offset-2 hover:underline"
                >
                  Facility
                </Link>
                <span> (Fachbetrieb) – Qualitätsstandards, dokumentierte Leistung.</span>
              </p>
            </motion.div>

            {/* Proof-Zeile (unter Chips, dezenter) */}
            <motion.p
              className="mt-5 text-xs sm:text-sm text-white/80"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              {PROOF_STRIP}
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              className="mt-6 sm:mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            >
              <Link href="/anfrage" className="w-full sm:w-auto">
                <AnimatedButton className="w-full sm:w-auto bg-[#8AB0AB] text-primary-foreground hover:bg-[#8AB0AB]/90 shadow-sm text-base px-8 py-5 sm:py-6">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </motion.div>

            {/* Secondary CTA: leiser, unter Primary, Textlink ohne Kästchen */}
            <motion.div
              className="mt-4 flex justify-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
            >
              <Link
                href="/rechner"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/80 hover:text-white underline-offset-2 hover:underline"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70" aria-hidden />
                <span>Richtpreis Reinigung/Facility →</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
