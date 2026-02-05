import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Wrench, ArrowRight, Plug, Zap, Cable } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elektro-Reparaturen",
  description: "Schnelle Elektro-Reparaturen: Steckdosen, Sicherungen, Kabelschäden und Geräteanschlüsse. Zuverlässiger Service vom Meisterbetrieb.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/reparaturen",
  },
};

const repairs = [
  { icon: Plug, title: "Defekte Steckdosen & Schalter", desc: "Austausch und Reparatur von beschädigten Elektroinstallationen" },
  { icon: Zap, title: "Sicherungsausfälle", desc: "Fehlersuche und Behebung bei wiederholt auslösenden Sicherungen" },
  { icon: Cable, title: "Kabelschäden", desc: "Professionelle Reparatur beschädigter oder veralteter Leitungen" },
  { icon: Wrench, title: "Geräteanschlüsse", desc: "Reparatur und Neuanschluss von Herd, Durchlauferhitzer & Co." },
];

export default function Reparaturen() {
  return (
    <>
      
      
      
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li><Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/handwerk/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/handwerk/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Elektrotechnik</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><span className="font-medium text-primary-foreground">Reparaturen</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Schnell & zuverlässig</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Schadensbehebung & Reparaturen
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Defekte Steckdose? Fliegende Sicherung? Wir beheben elektrische Probleme schnell, sicher und zu fairen Festpreisen.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>Reparatur anfragen</AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" />Jetzt anrufen
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span className="font-medium">Kurzfristige Termine</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">Festpreisgarantie</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><span className="font-medium">Meisterbetrieb</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Elektrische Defekte sind nicht nur ärgerlich, sondern können auch gefährlich sein. Unsere Elektriker diagnostizieren das Problem und beheben es fachgerecht – mit Gewährleistung und Dokumentation.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Häufige Reparaturen</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {repairs.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-foreground">Kostenvoranschlag vor Arbeitsbeginn</h3>
                <p className="mt-2 text-muted-foreground">
                  Nach der Diagnose erhalten Sie einen verbindlichen Festpreis. Keine versteckten Kosten, keine bösen Überraschungen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Was kostet eine Steckdosen-Reparatur?", a: "Je nach Schadensumfang zwischen 60€ und 150€. Bei Austausch der Steckdose ist das Material inklusive." },
                  { q: "Warum fliegt meine Sicherung immer wieder raus?", a: "Häufige Ursachen sind defekte Geräte, überlastete Stromkreise oder beschädigte Leitungen. Wir finden die Ursache." },
                  { q: "Wie schnell können Sie kommen?", a: "Wir bieten Termine in der Regel innerhalb von 2-3 Werktagen. Für dringende Fälle versuchen wir, zeitnah einen Termin zu finden." },
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
                    { label: "Elektrosanierung", href: "/leistungen/elektrotechnik/sanierung" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">Reparatur anfragen</AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
