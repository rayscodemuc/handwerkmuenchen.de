"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/leistungen/config";

type FAQSectionProps = {
  faqs: FaqItem[];
  /** Wenn "#3E505B", Schrift und Symbole in heller Sektion in dieser Farbe (z.B. Elektrotechnik). */
  lightSectionColor?: string;
};

export function FAQSection({ faqs, lightSectionColor }: FAQSectionProps) {
  if (!faqs?.length) return null;
  const isElektro = lightSectionColor === "#3E505B";
  const headingCls = isElektro ? "text-[#3E505B]" : "text-[#313D5A]";
  const sublineCls = isElektro ? "text-[#3E505B]" : "text-[#73628A]";
  const triggerCls = isElektro ? "text-[#3E505B] [&>svg]:text-[#3E505B]" : "text-[#313D5A] [&>svg]:text-[#78716C]";
  const contentCls = isElektro ? "text-[#3E505B]" : "text-[#73628A]";
  return (
    <section className="bg-[#f8f7f6] py-16" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 id="faq-heading" className={`text-2xl font-bold md:text-3xl ${headingCls}`}>
            Häufige Fragen
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${sublineCls}`}>
            Kurz beantwortet – damit Hausverwaltungen und Gewerbe schnell Klarheit haben.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={String(i + 1)}
                className="border-b-0 border border-[#E5E7EB] bg-[#FFFFFF] rounded-xl px-4 data-[state=open]:bg-[#F5F5F4]/70 transition-colors hover:border-[#78716C]/30"
              >
                <AccordionTrigger className={`font-medium hover:no-underline py-5 ${triggerCls}`}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className={`text-sm leading-relaxed pb-5 pt-0 ${contentCls}`}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
