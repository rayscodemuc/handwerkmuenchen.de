"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { GewerkLandingConfig } from "@/components/pages/GewerkLandingConfig";
import {
  ChevronRight,
  Phone,
  User,
  Check,
  ClipboardCheck,
  FileCheck,
  Box,
  Wrench,
  Home,
  Car,
  Camera,
  Lightbulb,
  Building2,
  Droplets,
  Gauge,
  Thermometer,
  Activity,
  AlertTriangle,
  FileText,
  Sparkles,
  Brush,
  LayoutGrid,
  HardHat,
  ShieldCheck,
  UserCheck,
  Flame,
  Snowflake,
  Bath,
  Network,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, LucideIcon> = {
  ClipboardCheck,
  FileCheck,
  Box,
  Wrench,
  Home,
  Car,
  Camera,
  Lightbulb,
  Building2,
  Droplets,
  Gauge,
  Thermometer,
  Activity,
  AlertTriangle,
  FileText,
  Sparkles,
  Brush,
  LayoutGrid,
  HardHat,
  ShieldCheck,
  UserCheck,
  Flame,
  Snowflake,
  Bath,
  Network,
};

export function GewerkLandingPage({ config }: { config: GewerkLandingConfig }) {
  const { hero, leistungsbereiche, meisterrunde, verantwortung, faq, cta, jsonLd } = config;

  return (
    <>
      {jsonLd?.professionalService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.professionalService, null, 2),
          }}
        />
      )}
      {jsonLd?.faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd.faqPage, null, 2),
          }}
        />
      )}

      {/* A) Hero */}
      <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">{hero.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {hero.h1}
            </h1>
            <p className="mt-7 mx-auto max-w-[60ch] text-base sm:text-lg text-[#FCFCFC]/75 leading-relaxed text-balance">
              {hero.subline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={hero.primaryCtaHref}>
                <AnimatedButton>{hero.primaryCtaLabel}</AnimatedButton>
              </Link>
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-lg border border-[#FCFCFC]/35 bg-transparent px-6 py-3 text-base font-semibold text-[#FCFCFC] transition-colors hover:bg-[#FCFCFC]/10"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                {hero.secondaryCtaLabel}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {hero.chips.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* B) Leistungsbereiche */}
      {leistungsbereiche && leistungsbereiche.cards.length > 0 && (
        <section className="bg-[#f8f7f6] py-16 lg:py-20" aria-labelledby="leistungsbereiche-heading">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-12">
              <h2 id="leistungsbereiche-heading" className="text-2xl font-bold text-[#313D5A] md:text-3xl">
                {leistungsbereiche.heading}
              </h2>
              <p className="mt-4 text-[#73628A] text-base sm:text-lg leading-relaxed">
                {leistungsbereiche.subline}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {leistungsbereiche.cards.map((card) => {
                const Icon = ICON_MAP[card.icon] ?? Box;
                return (
                  <div
                    key={card.title}
                    className="group rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 flex flex-col gap-4 transition-colors hover:bg-[#FFFFFF]/90 hover:border-[#78716C]/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-8 w-8 shrink-0 text-[#78716C]" aria-hidden />
                      <Link
                        href="/kontakt"
                        className="text-sm font-medium text-[#313D5A] hover:text-[#78716C] flex items-center gap-1 shrink-0"
                      >
                        Mehr erfahren
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                    <h3 className="text-lg font-semibold text-[#313D5A]">{card.title}</h3>
                    <p className="text-[#73628A] leading-relaxed text-sm">{card.body}</p>
                    <p className="text-sm text-[#73628A]/90 mt-auto">
                      <span className="font-medium">Typisch:</span> {card.typisch}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* C) So arbeitet die Meisterrunde */}
      <section className="bg-[#26413C] py-16 lg:py-20" aria-labelledby="meisterrunde-trust-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="meisterrunde-trust-heading" className="text-2xl font-bold text-white md:text-3xl">
              {meisterrunde.heading}
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
              {meisterrunde.subline}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {meisterrunde.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07] hover:border-white/15"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-white/75 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          {meisterrunde.trustChips && meisterrunde.trustChips.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {meisterrunde.trustChips.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* D) Verantwortung & Ansprechpartner */}
      <section className="bg-[#26413C] py-16" aria-labelledby="verantwortung-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="verantwortung-heading" className="text-2xl font-bold text-white md:text-3xl">
              {verantwortung.heading}
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
              {verantwortung.subline}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {verantwortung.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-colors hover:bg-white/[0.07] hover:border-white/15 relative"
              >
                {card.badge && (
                  <span className="absolute top-4 right-4 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                    {card.badge}
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-white/60" aria-hidden />
                  </div>
                  <div className={`min-w-0 flex-1 ${card.badge ? "pr-16 sm:pr-0" : ""}`}>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-white/75 text-sm leading-relaxed">{card.body}</p>
                    <ul className="mt-4 space-y-2">
                      {card.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                          <Check className="h-4 w-4 shrink-0 text-white/60" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {card.schnittstellenLinks && card.schnittstellenLinks.length > 0 && (
                      <p className="mt-4 text-sm text-white/70">
                        <span className="sr-only">Schnittstellen: </span>
                        {card.schnittstellenLinks.map((link, i) => (
                          <span key={link.href}>
                            {i > 0 && " · "}
                            <Link
                              href={link.href}
                              className="underline underline-offset-2 hover:text-white"
                            >
                              {link.label}
                            </Link>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E) FAQ */}
      <section className="bg-[#f8f7f6] py-16" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="faq-heading" className="text-2xl font-bold text-[#313D5A] md:text-3xl">
              {faq.heading}
            </h2>
            <p className="mt-4 text-[#73628A] text-base sm:text-lg leading-relaxed">
              {faq.subline}
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faq.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={String(i + 1)}
                  className="border-b-0 border border-[#E5E7EB] bg-[#FFFFFF] rounded-xl px-4 data-[state=open]:bg-[#F5F5F4]/70 transition-colors hover:border-[#78716C]/30"
                >
                  <AccordionTrigger className="text-[#313D5A] font-medium hover:no-underline [&>svg]:text-[#78716C] py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#73628A] text-sm leading-relaxed pb-5 pt-0">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* F) Abschluss CTA */}
      <section id="kontakt" className="bg-[#26413C] py-16" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
            <h2 id="cta-heading" className="text-2xl font-bold text-white md:text-3xl">
              {cta.heading}
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
              {cta.subline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={cta.primaryHref}>
                <AnimatedButton>{cta.primaryLabel}</AnimatedButton>
              </Link>
              {cta.secondaryLabel && (
                <Link
                  href={cta.secondaryHref ?? "/kontakt"}
                  className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden />
                  {cta.secondaryLabel}
                </Link>
              )}
            </div>
            {cta.trustLine && (
              <p className="mt-6 text-sm text-white/60">{cta.trustLine}</p>
            )}
            {cta.showAllLeistungenLink !== false && (
              <p className="mt-4">
                <Link
                  href="/leistungen"
                  className="text-sm text-white/75 underline underline-offset-2 hover:text-white"
                >
                  Alle Leistungen
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
