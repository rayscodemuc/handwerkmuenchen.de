import Link from "next/link";
import { Phone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

type FinalCTAProps = {
  heading: string;
  subline: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trustLine?: string;
};

export function FinalCTA({
  heading,
  subline,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  trustLine,
}: FinalCTAProps) {
  return (
    <section id="kontakt" className="bg-[#26413C] py-16" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
          <h2 id="cta-heading" className="text-2xl font-bold text-white md:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
            {subline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={primaryHref}>
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0">
                {primaryLabel}
              </AnimatedButton>
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                {secondaryLabel}
              </Link>
            )}
          </div>
          {trustLine && (
            <p className="mt-6 text-sm text-white/60">
              {trustLine}
            </p>
          )}
          <p className="mt-4">
            <Link href="/leistungen" className="text-sm font-medium text-white/80 hover:text-white underline underline-offset-2">
              Alle Leistungen
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
