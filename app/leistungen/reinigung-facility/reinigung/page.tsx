import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  FileCheck,
  Users,
  ClipboardCheck,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Reinigung – Unterhaltsreinigung, Büro & Praxis | Meisterrunde",
  description: "Gebäudereinigung mit dokumentierter Qualität: Unterhalts-, Büro-, Praxis- und Fensterreinigung, Bauend- und Sonderreinigung. Feste Teams, Checklisten, Abnahme. München & Umgebung.",
  alternates: { canonical: "/leistungen/reinigung-facility/reinigung" },
};

const LEISTUNGEN = [
  "Unterhaltsreinigung",
  "Büroreinigung",
  "Praxisreinigung",
  "Fensterreinigung",
  "Bauendreinigung",
  "Grund- und Sonderreinigung",
];

const ABLAUF = [
  { step: "Anfrage", detail: "Sie schildern Objekt und gewünschte Leistungen." },
  { step: "Kurzklärung", detail: "Termin oder Call – wir klären Umfang und Turnus." },
  { step: "Angebot", detail: "Transparentes Angebot mit Leistungskatalog." },
  { step: "Umsetzung", detail: "Feste Teams, dokumentierte Durchführung." },
  { step: "Qualitätssicherung", detail: "Checklisten, Abnahme und Protokoll." },
];

const FAQ = [
  { q: "In welchem Turnus kann gereinigt werden?", a: "Von täglich über wöchentlich bis zu Sondereinsätzen – wir passen den Rhythmus an Ihre Nutzung und Ihr Budget an." },
  { q: "In welchem Gebiet sind Sie im Einsatz?", a: "Schwerpunkt München und Umgebung. Größere Objekte auch überregional nach Absprache." },
  { q: "Wie läuft die Abrechnung ab?", a: "Monatlich oder quartalsweise, auf Wunsch mit detaillierter Leistungsübersicht. Keine versteckten Kosten." },
  { q: "Stellen Sie das Reinigungsmaterial?", a: "Ja, wir können Material und Maschinen stellen. Auf Wunsch nutzen wir auch Ihre Vorgaben." },
  { q: "Sind kurzfristige Einsätze möglich?", a: "Für Sonderreinigung oder kurzfristige Aufstockung prüfen wir die Kapazität – oft kurzfristig umsetzbar." },
];

export default function ReinigungDetailPage() {
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
              Reinigung
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-base text-white/90 leading-relaxed">
              Unterhalts-, Büro- und Praxisreinigung, Fensterreinigung, Bauend- und Sonderreinigung – mit dokumentierter Qualität und festen Ansprechpartnern.
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
            Unsere Reinigungsleistungen
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 max-w-2xl">
            {LEISTUNGEN.map((item) => (
              <li key={item} className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qualitätsstandard */}
      <section className="bg-muted/40 py-14 lg:py-20" aria-labelledby="qualitaet-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="qualitaet-heading" className="text-2xl font-bold text-foreground mb-6">
            Qualitätsstandard
          </h2>
          <ul className="space-y-3 text-muted-foreground max-w-2xl">
            <li className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Lückenlose Dokumentation und Checklisten pro Objekt.</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Feste Teams, die Ihr Objekt kennen – kein ständiger Wechsel.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>Abnahme und Protokoll nach vereinbarten Standards.</span>
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
          <h2 className="text-xl font-bold text-white">Reinigung anfragen</h2>
          <p className="mt-2 text-sm text-white/80">München & Umgebung · Dokumentierte Qualität</p>
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
