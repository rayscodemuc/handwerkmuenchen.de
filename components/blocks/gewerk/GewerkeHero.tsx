import Link from "next/link";
import { Phone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import type { GewerkCtas } from "@/lib/leistungen/config";

type GewerkeHeroProps = {
  eyebrow: string;
  h1: string;
  subline: string;
  ctas: GewerkCtas;
  chips: string[];
};

export function GewerkeHero({ eyebrow, h1, subline, ctas, chips }: GewerkeHeroProps) {
  return (
    <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
            {h1}
          </h1>
          <p className="mt-7 mx-auto max-w-[60ch] text-base sm:text-lg text-[#FCFCFC]/75 leading-relaxed text-balance">
            {subline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={ctas.primary.href}>
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0">
                {ctas.primary.label}
              </AnimatedButton>
            </Link>
            {ctas.secondary && (
              <Link
                href={ctas.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-[#FCFCFC]/35 bg-transparent px-6 py-3 text-base font-semibold text-[#FCFCFC] transition-colors hover:bg-[#FCFCFC]/10"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                {ctas.secondary.label}
              </Link>
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {chips.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
