import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Car, ArrowRight, Building2, Home, ParkingCircle, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Mobility",
  description: "Wallbox Installation und Ladeinfrastruktur für Unternehmen, Wohnanlagen und Privathaushalte. Förderungsberatung und schlüsselfertige Installation vom zertifizierten Fachbetrieb.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/e-mobility",
  },
};

const solutions = [
  { icon: Home, title: "Wallbox für Eigenheim", desc: "11kW oder 22kW Wallbox mit Lastmanagement für Ihr Zuhause" },
  { icon: Building2, title: "Unternehmensflotte", desc: "Skalierbare Ladelösungen für Firmenfahrzeuge mit Abrechnungssystem" },
  { icon: ParkingCircle, title: "Tiefgarage & Wohnanlage", desc: "WEG-konforme Installation mit dynamischem Lastmanagement" },
  { icon: Zap, title: "Schnellladestation", desc: "DC-Schnelllader für öffentliche Standorte und Gewerbeflächen" },
];

export default function EMobility() {
  return (
    <>
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li><Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><Link href="/leistungen/elektrotechnik" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Elektrotechnik</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><span className="font-medium text-primary-foreground">E-Mobility</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Ladeinfrastruktur</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                E-Mobility & Ladeinfrastruktur
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Wallboxen und Ladelösungen für Unternehmen, Wohnanlagen und Privathaushalte – von der Beratung über die Förderung bis zur schlüsselfertigen Installation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>Kostenlose Beratung</AnimatedButton>
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
              <div className="flex items-center gap-2"><Car className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">Alle Fahrzeugmarken</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">Förderungsberatung</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">Zertifizierte Installation</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-[#3E505B]/90 leading-relaxed">
                Die Elektromobilität wächst rasant – und mit ihr der Bedarf an zuverlässiger Ladeinfrastruktur. Als zertifizierter Fachbetrieb planen und installieren wir Ladelösungen, die zu Ihren Anforderungen passen.
              </p>

              <h2 className="text-2xl font-bold text-[#3E505B] mt-12 mb-6">Unsere Ladelösungen</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {solutions.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-[#3E505B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3E505B]">{item.title}</h3>
                      <p className="text-sm text-[#3E505B]/90">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-12 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">11-22</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">kW AC-Ladeleistung</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">500+</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">Installierte Wallboxen</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">100%</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">Förderungsquote</p>
                </div>
              </div>

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-[#3E505B]">WEG & Mietobjekte: Wir kennen die Hürden</h3>
                <p className="mt-2 text-[#3E505B]/90">
                  Bei Tiefgaragen und Wohnanlagen übernehmen wir die komplette Projektkoordination – von der technischen Machbarkeit über die WEG-Beschlussvorlage bis zur normgerechten Installation mit Lastmanagement.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#3E505B] mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Brauche ich eine Genehmigung für die Wallbox?", a: "Wallboxen über 11kW müssen beim Netzbetreiber angemeldet werden. Wir übernehmen die komplette Anmeldung für Sie." },
                  { q: "Gibt es noch Förderungen?", a: "Je nach Bundesland und Kommune gibt es verschiedene Förderprogramme. Wir prüfen alle verfügbaren Optionen für Sie." },
                  { q: "Was kostet eine Wallbox-Installation?", a: "Eine Standard-Installation beginnt bei ca. 1.500€ inkl. Material. Bei längeren Leitungswegen oder Tiefgaragen erstellen wir ein individuelles Angebot." },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-[#3E505B] list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-5 w-5 text-[#3E505B]/90 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="px-5 pb-5 text-[#3E505B]/90">{faq.a}</p>
                  </details>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-[#3E505B] mb-4">Weitere Elektro-Leistungen</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Alle Elektro-Leistungen", href: "/leistungen/elektrotechnik" },
                    { label: "Smart Home", href: "/leistungen/elektrotechnik/smart-home" },
                    { label: "Messsysteme", href: "/leistungen/elektrotechnik/messsysteme" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-[#3E505B] border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3 text-[#3E505B]" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">Wallbox-Beratung anfordern</AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
