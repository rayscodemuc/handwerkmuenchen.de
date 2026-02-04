import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { BadgeRow } from "@/components/BadgeRow";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Paintbrush, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const HANDWERK_BADGES = ["Meisterbetrieb", "GU-Abwicklung", "Dokumentierte Abnahme"];

export const metadata: Metadata = {
  title: "Maler & Boden",
  description: "Malerei und Bodenbeläge aus einer Hand: Innen- und Fassadenanstrich, Bodenbeschichtungen und Oberflächenschutz. Ein Vertrag, ein Ansprechpartner.",
  alternates: {
    canonical: "/maler-boden",
  },
};

export default function MalerBodenCategory() {
  return (
    <>
      <nav className="bg-primary py-4" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Startseite
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
            <li>
              <span className="font-medium text-primary-foreground">Maler & Boden</span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--foreground))/0.08,transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--foreground))/0.05,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))/0.03_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))/0.03_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="relative min-h-[480px] lg:min-h-[560px] pt-4 lg:pt-6">
          <div className="container relative mx-auto flex min-h-[480px] items-center justify-center px-4 lg:px-8">
            <div className="relative z-10 w-full max-w-4xl py-8 sm:py-12 lg:py-16 text-center">
              <h1 className="font-bold leading-[0.95] tracking-tight text-foreground">
                <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                  Maler & Boden
                </span>
                <span className="block mt-2 sm:mt-3 text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-foreground/80">
                  Werterhalt durch Oberflächen
                </span>
              </h1>
              <p className="mt-8 mx-auto max-w-[600px] text-base sm:text-lg leading-relaxed text-foreground/70">
                Malerei, Fassade und Bodenbeläge aus einer Hand. Generalunternehmer-Modell: ein Vertrag, ein Ansprechpartner.
                <Link href="/standorte/muenchen" className="text-primary hover:underline font-medium ml-1">
                  Standort München
                </Link>
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/anfrage" className="w-full sm:w-auto">
                  <AnimatedButton className="w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg text-base px-10 py-5 sm:py-6 font-semibold">
                    Beratung anfragen
                  </AnimatedButton>
                </Link>
              </div>
              <div className="mt-6">
                <BadgeRow items={HANDWERK_BADGES} theme="light" />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-sm text-foreground/60">
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Ein Ansprechpartner
                </span>
              </div>
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
