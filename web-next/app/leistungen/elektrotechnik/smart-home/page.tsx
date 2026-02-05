import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Cpu, ArrowRight, Lightbulb, Thermometer, Lock, Blinds } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Home & Gebäudeautomation",
  description: "Professionelle Smart Home Installation: KNX, Loxone, intelligente Lichtsteuerung, Heizungsautomation und Sicherheitstechnik vom Fachbetrieb.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/smart-home",
  },
};

const features = [
  { icon: Lightbulb, title: "Intelligente Lichtsteuerung", desc: "Szenensteuerung, Dimmung, Bewegungsmelder und Zeitschaltungen" },
  { icon: Thermometer, title: "Heizungsautomation", desc: "Raumweise Temperaturregelung mit Energieeinsparung bis 30%" },
  { icon: Blinds, title: "Jalousie- & Rollladensteuerung", desc: "Automatische Verschattung nach Sonneneinstrahlung oder Zeitplan" },
  { icon: Lock, title: "Sicherheit & Zutrittskontrolle", desc: "Integration von Alarmanlagen, Türkommunikation und Kameras" },
];

export default function SmartHome() {
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
              <li><span className="font-medium text-primary-foreground">Smart Home</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Zukunftssicher wohnen</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Smart Home & Gebäudeautomation
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Intelligente Steuerung von Licht, Heizung, Jalousien und Sicherheitstechnik – individuell geplant und professionell installiert.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>Beratung anfordern</AnimatedButton>
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
              <div className="flex items-center gap-2"><Cpu className="h-5 w-5 text-primary" /><span className="font-medium">KNX & Loxone zertifiziert</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /><span className="font-medium">Herstellergarantie</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><span className="font-medium">Systemintegrator</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ein Smart Home ist mehr als Spielerei – es steigert Komfort, spart Energie und erhöht die Sicherheit. Wir setzen auf bewährte Systeme wie KNX und Loxone, die langfristig erweiterbar und wartungsfreundlich sind.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Was wir automatisieren</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((item, i) => (
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

              <div className="my-12 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">30%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Energieeinsparung möglich</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">1</p>
                  <p className="mt-1 text-sm text-muted-foreground">App für alles</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">∞</p>
                  <p className="mt-1 text-sm text-muted-foreground">Erweiterbar</p>
                </div>
              </div>

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-foreground">Nachrüstung im Bestand möglich</h3>
                <p className="mt-2 text-muted-foreground">
                  Mit Funk-basierter Technik wie EnOcean oder Zigbee können wir Smart Home auch ohne große Umbauarbeiten in bestehende Gebäude integrieren.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Welches System empfehlen Sie?", a: "Für Neubauten empfehlen wir KNX als offenen Standard. Für Nachrüstungen ist Loxone oder ein Funksystem oft die bessere Wahl." },
                  { q: "Was kostet ein Smart Home?", a: "Ein Einstiegssystem für Licht und Heizung beginnt bei ca. 3.000€. Vollautomatisierte Häuser liegen bei 15.000-30.000€." },
                  { q: "Kann ich später erweitern?", a: "Ja, alle von uns installierten Systeme sind modular aufgebaut und können jederzeit um weitere Funktionen erweitert werden." },
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
                    { label: "Sicherheitstechnik", href: "/leistungen/elektrotechnik/sicherheitstechnik" },
                    { label: "LED-Beleuchtung", href: "/leistungen/elektrotechnik/led" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">Smart Home Beratung anfordern</AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
