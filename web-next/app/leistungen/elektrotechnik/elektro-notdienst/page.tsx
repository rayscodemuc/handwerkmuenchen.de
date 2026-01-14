import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Zap, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elektro-Notdienst 24/7",
  description: "24/7 Elektro-Notdienst: Schnelle Hilfe bei Stromausfall, Kurzschluss und elektrischen Gefahrensituationen. In 60-90 Minuten vor Ort.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/elektro-notdienst",
  },
};

export default function ElektroNotdienst() {
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
              <li><span className="font-medium text-primary-foreground">Notdienst</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-200 mb-4">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                24/7 Erreichbar
              </div>
              <h1 className="text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Elektro-Notdienst
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Stromausfall? Kurzschluss? Brandgeruch aus der Steckdose? Unser Notdienst ist rund um die Uhr für Sie da – schnell, sicher und professionell.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="tel:+491234567890">
                  <AnimatedButton className="bg-red-500 text-white hover:bg-red-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Jetzt Notdienst rufen
                  </AnimatedButton>
                </a>
                <Link href="/anfrage">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Anfrage senden
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /><span className="font-medium">60-90 Min. vor Ort</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">Festpreisgarantie</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><span className="font-medium">Meisterbetrieb</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Elektrische Notfälle dulden keinen Aufschub. Ein Kurzschluss, ein Kabelbrand oder ein kompletter Stromausfall können nicht nur den Alltag lahmlegen, sondern auch ernste Gefahren für Personen und Gebäude bedeuten.
              </p>

              <div className="my-12 rounded-2xl bg-red-50 border border-red-200 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Wann sollten Sie den Notdienst rufen?</h2>
                    <ul className="mt-3 space-y-2 text-muted-foreground">
                      {["Kompletter Stromausfall im Gebäude", "Funkenbildung oder Brandgeruch", "Auslösende Sicherungen, die sich nicht zurücksetzen lassen", "Beschädigte Leitungen nach Wasserschaden", "Freigelegte oder beschädigte Kabel"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">So läuft unser Notdienst ab</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Anruf & Ersteinschätzung", desc: "Schildern Sie Ihr Problem – wir geben sofort Handlungsempfehlungen für Ihre Sicherheit." },
                  { step: "2", title: "Schnelle Anfahrt", desc: "Ein Techniker ist in der Regel innerhalb von 60-90 Minuten bei Ihnen vor Ort." },
                  { step: "3", title: "Diagnose & Festpreis", desc: "Vor Arbeitsbeginn erhalten Sie einen transparenten Festpreis ohne versteckte Kosten." },
                  { step: "4", title: "Professionelle Behebung", desc: "Unsere Meisterbetriebe beheben das Problem sicher und normgerecht." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{item.step}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Häufige Fragen zum Notdienst</h2>
              <div className="space-y-4">
                {[
                  { q: "Was kostet der Elektro-Notdienst?", a: "Wir arbeiten mit transparenten Festpreisen. Die Kosten hängen von Art und Umfang des Problems ab – Sie erhalten vor Arbeitsbeginn ein verbindliches Angebot." },
                  { q: "Kommen Sie auch nachts und am Wochenende?", a: "Ja, unser Notdienst ist 24 Stunden am Tag, 7 Tage die Woche erreichbar – auch an Feiertagen." },
                  { q: "In welchen Städten sind Sie verfügbar?", a: "Wir sind in München, Augsburg, Ingolstadt, Nürnberg, Frankfurt, Hamburg und Berlin sowie im Umland aktiv." },
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
                    { label: "Sicherheitstechnik", href: "/leistungen/elektrotechnik/sicherheitstechnik" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <a href="tel:+491234567890">
                  <AnimatedButton className="h-14 px-10 text-base bg-red-500 hover:bg-red-600">
                    <Phone className="mr-2 h-5 w-5" />
                    Jetzt Notdienst rufen
                  </AnimatedButton>
                </a>
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
