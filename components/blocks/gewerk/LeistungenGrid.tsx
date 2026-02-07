import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LeistungItem } from "@/lib/leistungen/config";

type LeistungenGridProps = {
  heading: string;
  subline: string;
  leistungen: LeistungItem[];
};

export function LeistungenGrid({ heading, subline, leistungen }: LeistungenGridProps) {
  if (leistungen.length === 0) return null;
  return (
    <section id="leistungen" className="bg-[#f8f7f6] py-16 lg:py-20" aria-labelledby="leistungen-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 id="leistungen-heading" className="text-2xl font-bold text-[#313D5A] md:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-[#73628A] text-base sm:text-lg leading-relaxed">
            {subline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {leistungen.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 flex flex-col gap-4 transition-colors hover:bg-[#FFFFFF]/90 hover:border-[#78716C]/30"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-[#313D5A]">{item.title}</h3>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[#313D5A] hover:text-[#78716C] flex items-center gap-1 shrink-0"
                >
                  Mehr
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <p className="text-[#73628A] leading-relaxed text-sm flex-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
