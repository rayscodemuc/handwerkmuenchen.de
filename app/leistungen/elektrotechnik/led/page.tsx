import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Clock, Shield, Award, Lightbulb, ArrowRight, Factory, Building2, Home } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LED-Umrüstung & Beleuchtungssanierung",
  description: "LED-Umrüstung für Gewerbe, Industrie und Wohnanlagen. Bis zu 70% Energieeinsparung durch moderne Beleuchtungslösungen.",
  alternates: {
    canonical: "/leistungen/elektrotechnik/led",
  },
};

const applications = [
  { icon: Factory, title: "Industrie & Produktion", desc: "Hallenbeleuchtung, Arbeitsplatzbeleuchtung nach ASR" },
  { icon: Building2, title: "Büro & Gewerbe", desc: "Flächenbeleuchtung, Konferenzräume, Empfangsbereiche" },
  { icon: Home, title: "Wohnanlagen", desc: "Treppenhäuser, Tiefgaragen, Außenbereiche" },
  { icon: Lightbulb, title: "Außenbeleuchtung", desc: "Parkplätze, Wege, Fassadenbeleuchtung" },
];

export default function LED() {
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
              <li><span className="font-medium text-primary-foreground">LED</span></li>
            </ol>
          </div>
        </nav>

        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Energie sparen</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                LED-Erneuerungen & Umrüstungen
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Energieeffiziente Beleuchtungslösungen für Gewerbe, Industrie und Wohnanlagen – mit Einsparpotenzial bis 70% und attraktiven Förderungen.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>Lichtkonzept anfragen</AnimatedButton>
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
              <div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">Bis 70% Ersparnis</span></div>
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">BAFA-förderfähig</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-[#3E505B]" /><span className="font-medium text-[#3E505B]">5 Jahre Garantie</span></div>
            </div>
          </div>
        </section>

        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              <p className="text-xl text-[#3E505B]/90 leading-relaxed">
                Die Umrüstung auf LED-Beleuchtung ist eine der wirtschaftlichsten Energiesparmaßnahmen. Bei Betriebszeiten von 8+ Stunden täglich amortisiert sich die Investition oft schon nach 2-3 Jahren.
              </p>

              <div className="my-12 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">70%</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">Energie-Ersparnis</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">50.000h</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">LED-Lebensdauer</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-[#3E505B]">2-3</p>
                  <p className="mt-1 text-sm text-[#3E505B]/90">Jahre Amortisation</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#3E505B] mt-12 mb-6">Einsatzbereiche</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {applications.map((item, i) => (
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

              <div className="my-12 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <h3 className="font-bold text-[#3E505B]">BAFA-Förderung nutzen</h3>
                <p className="mt-2 text-[#3E505B]/90">
                  Für LED-Umrüstungen in Unternehmen gibt es attraktive BAFA-Förderungen. Wir beraten Sie zu den aktuellen Förderprogrammen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#3E505B] mt-12 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {[
                  { q: "Können bestehende Leuchten umgerüstet werden?", a: "In vielen Fällen ja – durch Retrofit-LED-Röhren oder LED-Einsätze. Wir prüfen, ob Umrüstung oder Austausch wirtschaftlicher ist." },
                  { q: "Was kostet eine LED-Umrüstung?", a: "Je nach Umfang zwischen 50€ und 200€ pro Leuchtpunkt inkl. Material und Montage." },
                  { q: "Wie viel kann ich konkret sparen?", a: "Wir erstellen eine individuelle Wirtschaftlichkeitsberechnung mit Ihren aktuellen Stromkosten als Basis." },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-[#3E505B] list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-5 w-5 text-[#3E505B] transition-transform group-open:rotate-90" />
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
                    { label: "Elektrosanierung", href: "/leistungen/elektrotechnik/sanierung" },
                    { label: "Smart Home", href: "/leistungen/elektrotechnik/smart-home" },
                  ].map((link, i) => (
                    <Link key={i} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-[#3E505B] border border-border hover:border-primary hover:text-primary transition-colors">
                      {link.label}<ArrowRight className="h-3 w-3 text-[#3E505B]" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">LED-Konzept anfragen</AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
