import Link from "next/link";
import { Sparkles, Building2, ArrowRight, Check } from "lucide-react";
import type { HubChoiceItem } from "@/lib/leistungen/config";

const ICONS = [Sparkles, Building2] as const;

type HubChoiceProps = {
  choices: [HubChoiceItem, HubChoiceItem];
};

export function HubChoice({ choices }: HubChoiceProps) {
  return (
    <section className="bg-[#FCFCFC] py-16 lg:py-20" aria-labelledby="hub-choice-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 id="hub-choice-heading" className="sr-only">
          Wähle deinen Bereich
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          {choices.map((choice, i) => {
            const Icon = ICONS[i] ?? Building2;
            return (
              <Link
                key={choice.href}
                href={choice.href}
                className="group flex flex-col rounded-2xl border-2 border-[#E5E7EB] bg-[#FFFFFF] p-8 transition-all hover:border-[#313D5A]/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#313D5A] focus-visible:ring-offset-2"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#313D5A]/10 text-[#313D5A] transition-colors group-hover:bg-[#313D5A] group-hover:text-white">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#313D5A] group-hover:text-[#183642]">
                  {choice.title}
                </h3>
                <p className="mt-3 text-[#73628A] leading-relaxed">
                  {choice.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {choice.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-[#73628A]">
                      <Check className="h-4 w-4 shrink-0 text-[#313D5A]" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#313D5A] group-hover:gap-2 transition-all">
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
