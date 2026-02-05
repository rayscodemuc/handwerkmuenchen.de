import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { BadgeRow } from "@/components/BadgeRow";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Paintbrush, ChevronRight, Phone } from "lucide-react";
import type { Metadata } from "next";

const HANDWERK_BADGES = ["Meisterbetrieb", "GU-Abwicklung", "Dokumentierte Abnahme"];

export const metadata: Metadata = {
  title: "Innenausbau",
  description: "Innenausbau aus einer Hand: Malerarbeiten, Fassade, Bodenbeläge, Fliesen, Estrich. Ein Vertrag, ein Ansprechpartner.",
  alternates: {
    canonical: "/maler-boden",
  },
};

export default function MalerBodenCategory() {
  return (
    <>
      {/* Hero – gleicher Aufbau wie Elektrotechnik */}
      <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">
              Malerarbeiten, Fassade & Boden
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Innenausbau
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
              Werterhalt durch Oberflächen. Malerei, Fassade und Bodenbeläge aus einer Hand – ein Vertrag, ein Ansprechpartner.
              <Link href="/standorte/muenchen" className="text-white/90 hover:underline font-medium ml-1">
                Standort München
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/anfrage">
                <AnimatedButton>
                  Beratung anfragen
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
              <BadgeRow items={HANDWERK_BADGES} theme="dark" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Paintbrush className="h-10 w-10 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Malerei & Bodenbeläge
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Innen- und Außenanstrich, Bodenbeschichtungen, Oberflächenschutz und Fassadenarbeiten – fachgerecht ausgeführt, ein Vertrag, ein Ansprechpartner.
            </p>
            <Link href="/anfrage" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              Angebot anfragen
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CategoryTrustSection />
      <CTASection />
    </>
  );
}
