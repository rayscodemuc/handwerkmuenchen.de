import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Building2, ArrowRight, FileText, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elektroinstallation Neubau",
  description: "Komplette Elektroinstallation für Neubauten: Wohngebäude und Gewerbeobjekte. Von der Planung nach DIN 18015 bis zur Abnahme.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/neubau",
  },
};

const phases = [
  { step: "1", title: "Planung & Beratung", desc: "Bedarfsanalyse, Elektroplanung nach DIN 18015 und Abstimmung mit Architekt/Bauleitung" },
  { step: "2", title: "Rohinstallation", desc: "Verlegung aller Leerrohre und Kabel in der Rohbauphase" },
  { step: "3", title: "Feininstallation", desc: "Montage von Schaltern, Steckdosen und Verbrauchern nach Ausbau" },
  { step: "4", title: "Inbetriebnahme", desc: "Prüfung, Dokumentation und Übergabe mit Prüfprotokoll" },
];

export default function Neubau() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li><Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/handwerk" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Elektrotechnik</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><span className="font-medium text-primary-foreground">Neubau</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Für Bauherren & Investoren</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Elektroinstallation bei Neubauten
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Komplette Elektroinstallation für Wohn- und Gewerbeprojekte – von der ersten Planung bis zur schlüsselfertigen Übergabe.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">Projekt anfragen</AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" />Beratung anrufen
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /><span className="font-medium">DIN 18015 konform</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">5 Jahre Gewährleistung</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><span className="font-medium">Meisterbetrieb</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Die Elektroinstallation ist das Nervensystem jedes Gebäudes. Eine durchdachte Planung spart später Kosten und ermöglicht problemlose Erweiterungen – sei es für Smart Home, E-Mobility oder zusätzliche Verbraucher.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Unser Projektablauf</h2>
              <div className="space-y-4">
                {phases.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{item.step}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-foreground">Ausstattungsstandards nach Wunsch</h3>
                <p className="mt-2 text-muted-foreground">
                  Wir planen nach den drei DIN-Ausstattungswerten: Mindestausstattung, Standardausstattung oder Komfortausstattung mit Reservekapazitäten für die Zukunft.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Was kostet die Elektroinstallation pro m²?", a: "Je nach Ausstattungsstandard zwischen 80€ und 150€ pro m² Wohnfläche. Wir erstellen Ihnen ein detailliertes Angebot." },
                  { q: "Arbeiten Sie mit unserem Architekten zusammen?", a: "Ja, wir stimmen uns eng mit Architekten und Bauleitern ab und liefern alle erforderlichen Planunterlagen." },
                  { q: "Wann sollte die Elektroplanung starten?", a: "Idealerweise in der Entwurfsphase, spätestens jedoch vor Baubeginn der Rohbauarbeiten." },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-foreground list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-foreground mb-4">Weitere Elektro-Leistungen</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Alle Elektro-Leistungen", href: "/leistungen/elektrotechnik" },
                    { label: "Smart Home", href: "/leistungen/elektrotechnik/smart-home" },
                    { label: "E-Mobility", href: "/leistungen/elektrotechnik/e-mobility" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">Projekt anfragen</AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
