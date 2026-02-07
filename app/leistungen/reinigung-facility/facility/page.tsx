import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Building2,
  ArrowRight,
  ChevronRight,
  FileText,
  UserCheck,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Facility & Objektservice – Hausmeister, Winterdienst, Objektkontrolle | Meisterrunde",
  description: "Facility Management und Objektservice: Hausmeisterservice, Winterdienst, Objektkontrolle, Außenanlagen. Fester Ansprechpartner, klare Prozesse, Reporting. München & Umgebung.",
  alternates: { canonical: "/leistungen/reinigung-facility/facility" },
};

const LEISTUNGEN = [
  "Hausmeisterservice",
  "Winterdienst",
  "Objektkontrolle",
  "Außenanlagen & Grünpflege",
  "Koordination von Einsätzen und Handwerkern",
  "Reporting & Dokumentation",
];

const ABLAUF = [
  { step: "Anfrage", detail: "Sie schildern Objekt und gewünschte Leistungen." },
  { step: "Objektbegehung", detail: "Gemeinsame Besichtigung, Festlegung der Schwerpunkte." },
  { step: "Plan / Intervalle", detail: "Vereinbarung von Turnus, Checklisten und Meldewegen." },
  { step: "Umsetzung", detail: "Fester Ansprechpartner, dokumentierte Durchführung." },
  { step: "Reporting", detail: "Regelmäßige Berichte und Protokolle." },
];

const FAQ = [
  { q: "Wie schnell reagieren Sie auf Meldungen?", a: "Je nach Vereinbarung – von gleichem Werktag bis zu festen Wochentagen. Dringliche Meldungen priorisieren wir nach Absprache." },
  { q: "Was passiert bei Notfällen (z. B. Wasserschaden)?", a: "Über unsere Prozesse leiten wir schnell an die richtigen Gewerke weiter. Bei Rahmenverträgen sind Reaktionszeiten festgelegt." },
  { q: "In welchem Turnus sind Sie vor Ort?", a: "Von täglicher Präsenz bis zu wöchentlichen oder monatlichen Kontrollen – abgestimmt auf Ihr Objekt und Ihr Budget." },
  { q: "Wie wird abgerechnet?", a: "Pauschalen, Stundensätze oder Mischmodelle – transparent und nach Vereinbarung, in der Regel monatlich oder quartalsweise." },
  { q: "In welchem Einsatzgebiet sind Sie tätig?", a: "Schwerpunkt München und Umgebung. Weitere Gebiete nach Absprache." },
];

export default function FacilityDetailPage() {
  return (
    <>
      {/* Back-Link */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <Link
            href="/leistungen/reinigung-facility"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            ← Zur Übersicht Reinigung & Facility
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[400px] items-center bg-[#26413C] py-14 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Facility / Objektservice
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-base text-white/90 leading-relaxed">
              Hausmeisterservice, Winterdienst, Objektkontrolle, Außenanlagen – ein Ansprechpartner für den laufenden Betrieb und Werterhalt Ihres Objekts.
            </p>
            <div className="mt-6">
              <Link href="/anfrage">
                <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="bg-background py-14 lg:py-20" aria-labelledby="leistungen-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="leistungen-heading" className="text-2xl font-bold text-foreground mb-6">
            Unsere Facility-Leistungen
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl">
            {LEISTUNGEN.map((item) => (
              <li key={item} className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Betriebssicherheit / Organisation */}
      <section className="bg-muted/40 py-14 lg:py-20" aria-labelledby="organisation-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="organisation-heading" className="text-2xl font-bold text-foreground mb-6">
            Betriebssicherheit & Organisation
          </h2>
          <ul className="space-y-3 text-muted-foreground max-w-2xl">
            <li className="flex items-start gap-3">
              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Fester Ansprechpartner pro Objekt – keine anonymen Hotlines.</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Klare Meldelogik und Protokolle für Kontrollen und Einsätze.</span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Abgestimmte Intervalle und Checklisten für planbaren Werterhalt.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-background py-14 lg:py-20" aria-labelledby="ablauf-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="ablauf-heading" className="text-2xl font-bold text-foreground mb-8">
            Ablauf
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-3xl">
            {ABLAUF.map((s, i) => (
              <span key={s.step} className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{s.step}</span>
                <span className="text-muted-foreground text-sm">{s.detail}</span>
                {i < ABLAUF.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-14 lg:py-20" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
            Häufige Fragen
          </h2>
          <div className="space-y-3 max-w-2xl">
            {FAQ.map((item, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card">
                <summary className="cursor-pointer p-4 font-medium text-foreground list-none flex items-center justify-between">
                  {item.q}
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="px-4 pb-4 text-muted-foreground text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-Band */}
      <section className="bg-[#26413C] py-14 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-white">Facility anfragen</h2>
          <p className="mt-2 text-sm text-white/80">München & Umgebung · Ein Ansprechpartner</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/anfrage">
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90">
                Projekt anfragen
              </AnimatedButton>
            </Link>
            <a href="tel:+491234567890">
              <AnimatedButton className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#26413C]">
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                Anrufen
              </AnimatedButton>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
