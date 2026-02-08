import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Zap, Droplets, Paintbrush, Building2, ArrowRight, Building, Briefcase, Home, Users, ShieldCheck, FileCheck, Star } from "lucide-react";
import { EinsatzgebietAlleOrteModal } from "@/components/blocks/EinsatzgebietAlleOrteModal";

export const metadata: Metadata = {
  title: "Leistungen der Meisterrunde",
  description: "Vier Gewerke, ein abgestimmtes Team. Meistergeführt geplant, sauber umgesetzt, dokumentiert übergeben. Elektrotechnik, Sanitär & Heizung, Innenausbau, Reinigung & Facility.",
  alternates: { canonical: "/leistungen" },
};

const GEWERKE = [
  {
    name: "Elektrotechnik",
    href: "/leistungen/elektrotechnik",
    teaser: "Von der Hausinstallation bis zur Gebäudeautomation – ein Ansprechpartner für alle elektrotechnischen Anforderungen.",
    tags: ["Zähler/UV", "E-Check", "Beleuchtung"],
    icon: Zap,
    image: "/images/leistungen/leistungen-elektrotechnik.jpg",
  },
  {
    name: "Sanitär & Heizung",
    href: "/leistungen/sanitaer-heizung",
    teaser: "SHK und HLK aus einer Hand: Planung, Installation, Wartung und Havarie-Service für Gewerbe und Wohnanlagen.",
    tags: ["Trinkwasser", "Heizung", "HLK"],
    icon: Droplets,
    image: "/images/leistungen/leistungen-sanitaer-heizung.jpg",
  },
  {
    name: "Innenausbau",
    href: "/leistungen/innenausbau",
    teaser: "Malerei, Fassade, Bodenbeläge und Fliesen – Innenausbau aus einer Hand, termingerecht und abnahmesicher.",
    tags: ["Malerei", "Boden", "Fliesen"],
    icon: Paintbrush,
    image: "/images/leistungen/leistungen-innenausbau.jpg",
  },
  {
    name: "Reinigung & Facility",
    href: "/leistungen/reinigung-facility",
    teaser: "Reinigung, Hausmeisterservice, Winterdienst und Objektmanagement – Betrieb und Werterhalt aus einer Hand.",
    tags: ["Reinigung", "Hausmeister", "Winterdienst"],
    icon: Building2,
    image: "/images/leistungen/leistungen-reinigung-facility.jpg",
  },
];

const EINSATZGEBIET_MUNCHEN = ["Schwabing", "Bogenhausen", "Sendling", "Pasing", "Trudering"];
const EINSATZGEBIET_UMLAND = ["Garching", "Unterhaching", "Freising"];

const HUB_FAQS = [
  {
    q: "Wie läuft die Koordination zwischen Gewerken?",
    a: "Ein fester Ansprechpartner koordiniert alle Gewerke. Die Meister sitzen an einem Tisch, planen gemeinsam und liefern dokumentiert ab – ohne Subunternehmer-Kette.",
  },
  {
    q: "Arbeitet ihr für Hausverwaltungen im Bestand?",
    a: "Ja. Wir betreuen Objektbestände mit wiederkehrenden Leistungen, klarer Dokumentation und festen Ansprechpartnern – für Wartung, Instandhaltung und Projekte.",
  },
  {
    q: "Wie schnell bekommt man eine Rückmeldung?",
    a: "In der Regel innerhalb von 1–2 Werktagen. Bei dringenden Anfragen bemühen wir uns um eine noch schnellere Reaktion.",
  },
  {
    q: "Für welche Leistungen gibt es einen Richtpreis-Rechner?",
    a: "Für Reinigung und Facility-Services. Den Rechner finden Sie auf den jeweiligen Leistungsseiten sowie im Bereich Anfrage.",
  },
  {
    q: "In welchen Gebieten seid ihr unterwegs?",
    a: "München und Umland – von Schwabing über Garching bis Unterhaching. Für weitere Orte einfach anfragen.",
  },
];

export default function LeistungenHubPage() {
  return (
    <>
      {/* Hero: Headline + Subline, Kacheln folgen direkt darunter */}
      <section className="relative flex min-h-[280px] items-center bg-[#26413C] py-12 lg:min-h-[320px] lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Leistungen
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Wählen Sie Ihr Gewerk
            </p>
          </div>
        </div>
      </section>

      {/* Gewerke-Grid: 2 Kacheln pro Reihe, groß & mit Bild */}
      <section className="bg-background py-16 lg:py-24" aria-labelledby="gewerke-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="gewerke-heading" className="sr-only">
            Unsere Gewerke
          </h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {GEWERKE.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* Bildbereich: festes Seitenverhältnis, Bild füllt Kachel */}
                  <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                    <Image
                      src={g.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* leichter Overlay + Icon für Gewerk-Zuordnung */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/95 text-primary shadow-lg transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                  </div>
                  {/* Inhalt: größer und luftiger */}
                  <div className="flex flex-1 flex-col p-8 lg:p-10">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors lg:text-3xl">
                      {g.name}
                    </h3>
                    <p className="mt-4 flex-1 text-base text-muted-foreground leading-relaxed lg:text-lg">
                      {g.teaser}
                    </p>
                    {g.tags && g.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {g.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-primary">
                      Mehr erfahren
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Für wen · Netzwerk · Einsatzgebiet — an Webseiten-Design angepasst */}
      <section className="bg-muted/40 py-16 lg:py-24" aria-labelledby="vertrauen-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 id="vertrauen-heading" className="text-center text-2xl font-bold text-foreground mb-10">
              Vertrauen durch Klarheit
            </h2>

            {/* Für wen */}
            <div className="mb-12 lg:mb-16">
              <h3 id="fuer-wen-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                Für wen
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 lg:p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-foreground">Hausverwaltungen</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Objektbestand, wiederkehrende Leistungen, Dokumentation, feste Ansprechpartner.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 lg:p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-foreground">Gewerbe</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Büros, Praxen, Läden, Produktion – schnelle Reaktion, saubere Abnahme.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 lg:p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Home className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-lg font-bold text-foreground">Privat</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Sanierung, Ausbau oder laufende Betreuung – mit klarer Verantwortung.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* So arbeitet unser Netzwerk */}
            <div className="mb-12 lg:mb-16">
              <h3 id="netzwerk-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                So arbeitet unser Netzwerk
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col rounded-2xl border border-border bg-card p-6 lg:p-8 text-center transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
                    <Users className="h-6 w-6" aria-hidden />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground">Feste Meister am Tisch</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Verantwortliche Meisterbetriebe pro Gewerk, abgestimmt und erreichbar.
                  </p>
                </div>
                <div className="flex flex-col rounded-2xl border border-border bg-card p-6 lg:p-8 text-center transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
                    <ShieldCheck className="h-6 w-6" aria-hidden />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground">Klare Zuständigkeit</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Ein Ansprechpartner, eine Verantwortung – keine Kette, keine Ausreden.
                  </p>
                </div>
                <div className="flex flex-col rounded-2xl border border-border bg-card p-6 lg:p-8 text-center transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
                    <FileCheck className="h-6 w-6" aria-hidden />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground">Dokumentierte Übergabe</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Planbar, nachvollziehbar, revisionssicher.
                  </p>
                </div>
              </div>
            </div>

            {/* Einsatzgebiet */}
            <div className="flex flex-col items-center text-center">
              <h3 id="einsatzgebiet-heading" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Einsatzgebiet
              </h3>
              <p className="text-lg font-bold text-foreground mb-1">
                München &amp; Umland
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Beliebte Einsatzorte (Beispiele):
              </p>
              <div className="space-y-4 w-full flex flex-col items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">München:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {EINSATZGEBIET_MUNCHEN.map((ort) => (
                      <span
                        key={ort}
                        className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground"
                      >
                        {ort}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Umland:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {EINSATZGEBIET_UMLAND.map((ort) => (
                      <span
                        key={ort}
                        className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground"
                      >
                        {ort}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <EinsatzgebietAlleOrteModal />
              <p className="mt-4 text-sm text-muted-foreground">
                Auch außerhalb dieser Orte: kurz anfragen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referenzen-Teaser (Meisterleistungen) */}
      <section className="bg-background py-16 lg:py-20" aria-labelledby="referenzen-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="grid grid-cols-2 grid-rows-2 w-full md:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden bg-muted shrink-0 gap-px">
              {GEWERKE.map((g) => (
                <div key={g.name} className="relative w-full h-full min-h-0 bg-muted">
                  <Image
                    src={g.image}
                    alt={`Referenz – ${g.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <h2 id="referenzen-heading" className="text-2xl font-bold text-foreground mb-4">
                Meisterleistungen ansehen
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ausgewählte Referenzprojekte für Hausverwaltungen und Gewerbe: Elektrotechnik, Sanitär, Innenausbau, Reinigung und Facility. Belegbare Qualität, ein Ansprechpartner.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/meisterleistungen">
                  <AnimatedButton className="px-6 py-3 text-sm">
                    Meisterleistungen ansehen
                  </AnimatedButton>
                </Link>
                <Link
                  href="/ueber-uns#bewertungen"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Star className="h-4 w-4 text-primary" aria-hidden />
                  Bewertungen lesen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Hub-FAQs) */}
      <section className="bg-muted/40 py-16 lg:py-20" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="faq-heading" className="text-center text-2xl font-bold text-foreground mb-10">
            Häufige Fragen
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-1 rounded-xl border border-border bg-card overflow-hidden">
              {HUB_FAQS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border last:border-b-0 px-4">
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Abschluss-CTA-Band */}
      <section className="bg-[#26413C] py-20 lg:py-28" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Projekt anfragen
            </h2>
            <p className="mt-4 text-lg text-white/90">
              München &amp; Umgebung · Ein Ansprechpartner für alle Gewerke
            </p>
            <div className="mt-10">
              <Link href="/anfrage">
                <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-10 py-6 text-lg font-semibold shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/25 transition-shadow">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
