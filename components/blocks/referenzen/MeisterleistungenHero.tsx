import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";

export type MeisterleistungenHeroProps = {
  /** z. B. "PROJEKTE" oder "ELEKTROTECHNIK". Ohne Angabe: "MEISTERLEISTUNGEN". */
  eyebrow?: string;
  /** Hauptüberschrift. Ohne Angabe: "Referenzen, die man belegen kann." */
  title?: string;
  /** Untertitel. Ohne Angabe: "Unsere aktuellsten Projekte für Hausverwaltungen, Gewerbe und Privat in München." */
  subline?: string;
};

const defaultEyebrow = "MEISTERLEISTUNGEN";
const defaultTitle = "Referenzen, die man belegen kann.";
const defaultSubline =
  "Unsere aktuellsten Projekte für Hausverwaltungen, Gewerbe und Privat in München.";

export function MeisterleistungenHero({
  eyebrow = defaultEyebrow,
  title = defaultTitle,
  subline = defaultSubline,
}: MeisterleistungenHeroProps = {}) {
  return (
    <section className="relative flex min-h-[420px] items-center bg-[#26413C] py-16 lg:min-h-[480px] lg:py-20">
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">
            {eyebrow} in München & Umgebung
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          <p className="mt-6 mx-auto max-w-[60ch] text-base sm:text-lg text-[#FCFCFC]/75 leading-relaxed text-balance">
            {subline}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/anfrage">
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                Projekt anfragen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
