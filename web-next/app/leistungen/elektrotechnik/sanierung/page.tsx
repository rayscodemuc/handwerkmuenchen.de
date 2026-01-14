import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, RefreshCw, ArrowRight, AlertTriangle, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elektrosanierung & Modernisierung",
  description: "Elektrosanierung im Altbau: Modernisierung veralteter Installationen, Nachrüstung von FI-Schutzschaltern und Erhöhung der Sicherheit.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/sanierung",
  },
};

const warningSign = [
  "Häufig auslösende Sicherungen",
  "Brummende oder warme Steckdosen",
  "Fehlender FI-Schutzschalter",
  "Zweiadrige Leitungen ohne Schutzleiter",
  "Verfärbte oder brüchige Kabel",
];

export default function Sanierung() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li><Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Elektrotechnik</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><span className="font-medium text-primary-foreground">Sanierung</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Für Bestandsgebäude</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Elektrosanierung & Modernisierung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Veraltete Elektrik ist ein Sicherheitsrisiko. Wir bringen Ihre Installation auf den neuesten Stand – mit minimalem Aufwand und maximaler Sicherheit.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">Bestandscheck anfragen</AnimatedButton>
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
              <div className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-primary" /><span className="font-medium">Minimal-invasiv</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">Versicherungskonform</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><span className="font-medium">Meisterbetrieb</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Elektroinstallationen aus den 60er, 70er oder 80er Jahren entsprechen oft nicht mehr heutigen Sicherheitsstandards. Eine Modernisierung schützt vor Brandgefahr und erhöht den Immobilienwert.
              </p>

              <div className="my-12 rounded-2xl bg-amber-50 border border-amber-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Warnzeichen für Sanierungsbedarf</h2>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                      {warningSign.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Unsere Sanierungsleistungen</h2>
              <ul className="space-y-3">
                {[
                  "Kompletterneuerung der Elektroinstallation",
                  "Nachrüstung von FI-Schutzschaltern (RCD)",
                  "Modernisierung des Zählerschranks",
                  "Erhöhung der Anschlussleistung für moderne Verbraucher",
                  "Vorbereitung für Smart Home und E-Mobility",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-foreground">Sanierung bei laufendem Betrieb</h3>
                <p className="mt-2 text-muted-foreground">
                  Wir planen die Arbeiten so, dass Ihr Alltag möglichst wenig gestört wird. Abschnittsweise Sanierung minimiert Ausfallzeiten.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Was kostet eine Elektrosanierung?", a: "Die Kosten hängen vom Umfang ab. Eine Teilsanierung (z.B. nur Zählerschrank) beginnt bei ca. 2.000€, Komplettsanierungen bei 8.000-15.000€." },
                  { q: "Wie lange dauert die Sanierung?", a: "Eine Wohnungssanierung dauert typischerweise 3-5 Tage. Bei größeren Objekten erstellen wir einen detaillierten Zeitplan." },
                  { q: "Muss ich während der Arbeiten ausziehen?", a: "In der Regel nicht. Wir arbeiten abschnittsweise und stellen sicher, dass immer zumindest Teile der Wohnung nutzbar bleiben." },
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
                    { label: "Hauselektrik", href: "/leistungen/elektrotechnik/hauselektrik" },
                    { label: "Smart Home", href: "/leistungen/elektrotechnik/smart-home" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">Bestandscheck anfragen</AnimatedButton>
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
