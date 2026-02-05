"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BadgeRow } from "@/components/BadgeRow";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { guLead, meisterrunde } from "@/lib/team";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Briefcase, Home, Shield } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Zeigt Porträt-Bild oder bei Fehler Avatar (kein Überlagern). */
function PersonPortrait({
  src,
  name,
  size = "medium",
  className,
}: {
  src: string;
  name: string;
  size?: "large" | "medium";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const avatarSize = size === "large" ? "h-32 w-32 md:h-40 md:w-40" : "h-24 w-24 sm:h-28 sm:w-28";
  const fallbackText = size === "large" ? "text-3xl md:text-4xl" : "text-2xl";
  return (
    <div className={`relative bg-muted shrink-0 ${className ?? ""}`}>
      {!failed && (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes={size === "large" ? "(max-width: 768px) 100vw, 320px" : "(max-width: 640px) 100vw, 224px"}
          unoptimized
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Avatar className={`${avatarSize} border-4 border-background shadow-lg`}>
            <AvatarFallback className={`bg-primary/10 text-primary ${fallbackText}`}>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

const PROOF_STRIP = ["GU-Vertrag", "Meistergewerke unter einem Dach", "Dokumentation & Übergabe"];

const WARUM_ANDERS = [
  { title: "Alle Meister am Tisch", text: "Entscheidungen sofort, keine Schnittstellenprobleme." },
  { title: "Ein Vertrag (GU)", text: "Ein Ansprechpartner, klare Zuständigkeit, saubere Gewährleistung." },
  { title: "Dokumentierte Übergabe", text: "Protokoll, Fotos, Transparenz – damit es am Ende passt." },
];

const SO_ARBEITEN_WIR = [
  { step: "Anfrage", detail: "Sie schildern Ihr Vorhaben – wir antworten zeitnah." },
  { step: "Kurzklärung", detail: "Termin oder Call: wir klären Umfang und Rahmen." },
  { step: "Planung", detail: "Meisterrunde plant gemeinsam, ein Projektplan entsteht." },
  { step: "Ausführung", detail: "Gewerke greifen ineinander, ein GU koordiniert." },
  { step: "Übergabe", detail: "Dokumentiert und abgenommen – damit Sie Sicherheit haben." },
];

const WOFUER_WIR_STEHEN = [
  "Verantwortung statt Weiterreichen.",
  "Gemeinsame Planung statt Schnittstellen-Chaos.",
  "Dokumentation, damit Übergaben eindeutig sind.",
];

const FUER_WEN = [
  { label: "Hausverwaltungen", sentence: "Ein Ansprechpartner für Handwerk, Reinigung und Facility – dokumentiert und abnahmesicher.", icon: Building2 },
  { label: "Gewerbe", sentence: "Von der Elektrik bis zur Reinigung: koordiniert aus einer Hand.", icon: Briefcase },
  { label: "Privat", sentence: "Sanierung, Ausbau oder laufende Betreuung – mit klarer Verantwortung.", icon: Home },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* 1) HERO */}
      <section className="relative flex min-h-[420px] items-center bg-[#26413C] py-16 lg:min-h-[480px] lg:py-20">
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Über die Meisterrunde
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
              Bei uns sitzen die Meister an einem Tisch. Sie planen gemeinsam und tragen Verantwortung – als Generalunternehmer mit einem Vertrag und dokumentierter Übergabe.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {PROOF_STRIP.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-transparent bg-[#8AB0AB] px-3 py-1 text-xs font-medium text-[#26413C]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/anfrage">
                <AnimatedButton className="px-8 py-6 text-base bg-[#4C626C] text-white hover:bg-[#4C626C]/90">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2) WARUM ANDERS – 3 Cards */}
      <section className="bg-background py-16 lg:py-24" aria-labelledby="warum-anders">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="warum-anders" className="text-center text-2xl font-bold tracking-tight text-[#3E505B] md:text-3xl">
            Warum anders
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WARUM_ANDERS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#3E505B]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#3E505B] leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) GESAMTVERANTWORTUNG – GU mit Gesicht */}
      <section className="bg-background py-20 lg:py-28" aria-labelledby="gesamtverantwortung">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="gesamtverantwortung" className="text-center text-3xl font-bold tracking-tight text-[#3E505B] md:text-4xl">
            Gesamtverantwortung
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[#3E505B] text-base md:text-lg">
            Ein Vertrag, ein Projektplan, eine Übergabe – als Generalunternehmer bin ich euer zentraler Ansprechpartner und sorge dafür, dass die Gewerke sauber ineinandergreifen.
          </p>
          <motion.div
            className="mx-auto mt-14 max-w-3xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card className="overflow-hidden border-border bg-card shadow-lg">
              <CardContent className="p-0 flex flex-col md:flex-row">
                <PersonPortrait
                  src={guLead.image}
                  name={guLead.name}
                  size="large"
                  className="w-full md:w-80 md:min-h-[340px] aspect-[4/5] md:aspect-auto"
                />
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <p className="text-xl font-semibold text-[#3E505B]">{guLead.name}</p>
                  <p className="text-sm md:text-base text-[#3E505B] mt-0.5">{guLead.role}</p>
                  <p className="mt-4 text-[#3E505B] leading-relaxed">{guLead.claim}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {guLead.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-sm text-[#3E505B]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 4) DIE MEISTERRUNDE – 4 Cards, präsenter mit großen Bildern */}
      <section className="bg-muted/40 py-20 lg:py-28" aria-labelledby="meisterrunde">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="meisterrunde" className="text-center text-3xl font-bold tracking-tight text-[#3E505B] md:text-4xl">
            Die Meisterrunde
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[#3E505B] md:text-base">
            Klare Zuständigkeit pro Bereich – das sind die Verantwortlichen hinter der Meisterrunde.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-10">
            {meisterrunde.map((person, i) => (
              <motion.div
                key={person.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="h-full border-border bg-card overflow-hidden shadow-md">
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <PersonPortrait
                      src={person.image}
                      name={person.name}
                      size="medium"
                      className="w-full sm:w-56 sm:min-h-[260px] aspect-[4/5] sm:aspect-auto"
                    />
                    <div className="flex-1 p-5 sm:p-6 flex flex-col">
                      <p className="text-lg font-semibold text-[#3E505B]">{person.name}</p>
                      <p className="text-sm text-[#3E505B] mt-0.5">{person.role}</p>
                      <p className="mt-3 text-sm text-[#3E505B] leading-relaxed">{person.claim}</p>
                      <div className="mt-4">
                        <BadgeRow items={[...person.badges]} theme="light" className="justify-start flex-wrap gap-1.5" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {person.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-[#3E505B]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {"note" in person && person.note && (
                        <p className="mt-3 text-xs text-[#3E505B] italic">{person.note}</p>
                      )}
                      <Link
                        href={person.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#3E505B] hover:underline"
                      >
                        Mehr
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) WOFÜR WIR STEHEN – 3 Prinzipien (präsent) */}
      <section className="bg-background py-20 lg:py-24" aria-labelledby="wofuer">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3E505B]/80">
              Werte & Prinzipien
            </p>
            <h2
              id="wofuer"
              className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#3E505B]"
            >
              Wofür wir stehen
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#3E505B]/90">
              Klar definierte Verantwortung, gemeinsame Planung und dokumentierte Übergaben –
              damit Projekte nicht im Schnittstellen-Chaos enden.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WOFUER_WIR_STEHEN.map((line, index) => (
              <div
                key={line}
                className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-[#3E505B]/10 p-6 md:p-7 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#3E505B] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#3E505B]/10 text-[#3E505B]">
                    <Shield className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-[#3E505B]">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) FÜR WEN WIR GEBAUT SIND – 3 Zielgruppen, präsenter */}
      <section className="bg-background py-20 lg:py-24" aria-labelledby="fuer-wen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3E505B]/80">
              Zielgruppen
            </p>
            <h2
              id="fuer-wen"
              className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#3E505B]"
            >
              Für wen wir gebaut sind
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#3E505B]/90">
              Für Verwaltungen, Gewerbe und private Auftraggeber, die Verlässlichkeit und eine
              dokumentierte Übergabe erwarten – statt Subunternehmer-Lotto.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {FUER_WEN.map((item) => (
              <Card
                key={item.label}
                className="relative h-full overflow-hidden rounded-3xl border border-[#3E505B]/15 bg-white shadow-lg"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3E505B]/10 text-[#3E505B]">
                      <item.icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="text-lg font-semibold text-[#3E505B]">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-[#3E505B] leading-relaxed">
                    {item.sentence}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8) FINAL CTA – wie Startseite */}
      <CTASection />
    </>
  );
}
