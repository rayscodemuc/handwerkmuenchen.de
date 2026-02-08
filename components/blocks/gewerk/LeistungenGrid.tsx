import type { LeistungItem } from "@/lib/leistungen/config";

type LeistungenGridProps = {
  heading: string;
  subline: string;
  leistungen: LeistungItem[];
  /** Wenn "#3E505B", Schrift und Symbole in heller Sektion in dieser Farbe (z.B. Elektrotechnik). */
  lightSectionColor?: string;
};

const isElektro = (c?: string) => c === "#3E505B";
const textCls = (c?: string) => (isElektro(c) ? "text-[#3E505B]" : "text-[#313D5A]");
const sublineCls = (c?: string) => (isElektro(c) ? "text-[#3E505B]" : "text-[#73628A]");
export function LeistungenGrid({ heading, subline, leistungen, lightSectionColor }: LeistungenGridProps) {
  if (leistungen.length === 0) return null;
  return (
    <section id="leistungen" className="bg-[#f8f7f6] py-16 lg:py-20" aria-labelledby="leistungen-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 id="leistungen-heading" className={`text-2xl font-bold md:text-3xl ${textCls(lightSectionColor)}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${sublineCls(lightSectionColor)}`}>
            {subline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {leistungen.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 flex flex-col gap-4 transition-colors hover:bg-[#FFFFFF]/90 hover:border-[#78716C]/30"
            >
              <h3 className={`text-lg font-semibold ${textCls(lightSectionColor)}`}>{item.title}</h3>
              <p className={`leading-relaxed text-sm flex-1 ${sublineCls(lightSectionColor)}`}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
