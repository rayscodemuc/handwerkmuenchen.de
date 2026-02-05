"use client";
import { CTASection } from "@/components/sections/CTASection";
import { BadgeRow } from "@/components/BadgeRow";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { 
  ChevronRight, Clock, Shield, Phone, ArrowRight,
  Home, Cpu, Car, Wrench, Building2, RefreshCw, 
  Camera, Lightbulb, Bell, Gauge
} from "lucide-react";
import Link from "next/link";
import elektrotechnikImage from "@/assets/elektrotechnik-schaltschrank-dguv-v3-pruefung.jpg";

const HANDWERK_BADGES = ["Meisterbetrieb", "GU-Abwicklung", "Dokumentierte Abnahme"];

// Service Data für die 10 Leistungen (ohne Notdienst)
const services = [
  {
    id: "hauselektrik",
    icon: Home,
    title: "Hauselektrik & Privatinstallationen",
    description: "Alle Elektroarbeiten für Ihr Zuhause – von der Steckdose bis zur kompletten Hausinstallation.",
    href: "/handwerk/elektrotechnik/hauselektrik",
    keywords: ["Hauselektrik", "Elektroinstallation Haus", "Steckdosen Installation"]
  },
  {
    id: "smart-home",
    icon: Cpu,
    title: "Smart Home & Gebäudeautomation",
    description: "Intelligente Steuerung von Licht, Heizung, Jalousien und Sicherheitstechnik aus einer Hand.",
    href: "/handwerk/elektrotechnik/smart-home",
    keywords: ["Smart Home Installation", "KNX Gebäudeautomation", "Intelligentes Wohnen"]
  },
  {
    id: "e-mobility",
    icon: Car,
    title: "E-Mobility & Ladeinfrastruktur",
    description: "Wallboxen und Ladelösungen für Unternehmen, Wohnanlagen und Parkierungsanlagen.",
    href: "/handwerk/elektrotechnik/e-mobility",
    keywords: ["Wallbox Installation", "Ladestation Gewerbe", "E-Mobility Infrastruktur"]
  },
  {
    id: "reparaturen",
    icon: Wrench,
    title: "Schadensbehebung & Reparaturen",
    description: "Schnelle und zuverlässige Reparatur defekter Elektroinstallationen und Geräte.",
    href: "/handwerk/elektrotechnik/reparaturen",
    keywords: ["Elektro Reparatur", "Elektroinstallation reparieren", "Elektriker Reparaturservice"]
  },
  {
    id: "neubau",
    icon: Building2,
    title: "Elektroinstallationen bei Neubauten",
    description: "Komplette Elektroinstallation für Wohn- und Gewerbeprojekte von der Planung bis zur Abnahme.",
    href: "/handwerk/elektrotechnik/neubau",
    keywords: ["Elektroinstallation Neubau", "Gewerbe Elektrik", "Elektroplanung"]
  },
  {
    id: "sanierung",
    icon: RefreshCw,
    title: "Elektrosanierung & Modernisierung",
    description: "Fachgerechte Sanierung und Modernisierung veralteter Elektroinstallationen in Bestandsgebäuden.",
    href: "/handwerk/elektrotechnik/sanierung",
    keywords: ["Elektrosanierung", "Altbau Elektrik", "Elektromodernisierung"]
  },
  {
    id: "sicherheitstechnik",
    icon: Camera,
    title: "Kamerasysteme & Sicherheitstechnik",
    description: "Professionelle Videoüberwachung und Alarmanlagen für Gewerbe und Wohnanlagen.",
    href: "/handwerk/elektrotechnik/sicherheitstechnik",
    keywords: ["Videoüberwachung", "Alarmanlage Installation", "Sicherheitstechnik Gewerbe"]
  },
  {
    id: "led",
    icon: Lightbulb,
    title: "LED-Erneuerungen & Umrüstungen",
    description: "Energieeffiziente Beleuchtungslösungen für Gewerbe, Industrie und Wohnanlagen.",
    href: "/handwerk/elektrotechnik/led",
    keywords: ["LED Umrüstung", "Beleuchtungssanierung", "Energieeffiziente Beleuchtung"]
  },
  {
    id: "klingelanlagen",
    icon: Bell,
    title: "Klingelanlagen & Gebäudekommunikation",
    description: "Moderne Türsprechanlagen und Kommunikationssysteme für professionelle Objektverwaltung.",
    href: "/handwerk/elektrotechnik/klingelanlagen",
    keywords: ["Türsprechanlage", "Klingelanlage Mehrfamilienhaus", "Gebäudekommunikation"]
  },
  {
    id: "messsysteme",
    icon: Gauge,
    title: "Zähler, Messsysteme & Energieverteilung",
    description: "Intelligente Messsysteme und moderne Energieverteilung für transparente Verbrauchserfassung.",
    href: "/handwerk/elektrotechnik/messsysteme",
    keywords: ["Smart Meter", "Energieverteilung", "Zählerschrank Installation"]
  }
];

// Quick-Nav: alle Leistungen (abgeleitet aus services)
const quickNavItems = services.map((s) => ({ label: s.title, targetId: s.id }));

export default function Elektrotechnik() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hero – Aufbau wie Über-uns-Seite, Buttons unverändert */}
        <section className="relative flex min-h-[520px] items-center bg-[#26413C] py-16 lg:min-h-[640px] lg:py-20">
          <div className="container relative mx-auto px-4 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                Zertifizierter Elektrofachbetrieb
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Elektrotechnik – Alle Leistungen im Überblick
              </h1>
              <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
                Von der Steckdose bis zur kompletten Gebäudeautomation: Wir sind Ihr kompetenter Partner für alle elektrotechnischen Anforderungen – privat und gewerblich.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>
                    Kostenloses Angebot
                  </AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    Jetzt anrufen
                  </AnimatedButton>
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <BadgeRow items={HANDWERK_BADGES} theme="dark" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick-Nav – übersichtlich in Zeilen (scrollt mit) */}
        <nav className="border-b border-border bg-muted/30" aria-label="Schnellnavigation">
          <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col items-center">
            <p className="text-sm font-semibold text-foreground mb-3">Direkt zu:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full max-w-4xl">
              {quickNavItems.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => scrollToSection(item.targetId)}
                  className="rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Hauptinhalt – klare Abschnitte */}
        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-5xl">
              
              {/* Intro – eigener Block */}
              <section className="pt-16 pb-10 lg:pt-20 lg:pb-12">
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  Als zertifizierter Elektrofachbetrieb vereinen wir handwerkliche Präzision mit modernster Technik. 
                  Ob intelligente Gebäudesteuerung oder nachhaltige Ladelösungen – 
                  unsere Experten realisieren Ihr Projekt termingerecht und normkonform.
                </p>
              </section>

              {/* Bild */}
              <figure className="mb-16">
                <img
                  src={typeof elektrotechnikImage === 'string' ? elektrotechnikImage : elektrotechnikImage.src}
                  alt="Professionelle Elektroinstallation – Schaltschrank mit sauberer Verkabelung"
                  className="w-full rounded-2xl object-cover aspect-[16/9]"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  Höchste Standards bei jeder Installation – vom Privathaushalt bis zum Industrieobjekt
                </figcaption>
              </figure>

              {/* Leistungen – klare Sektion */}
              <section className="pb-16" aria-labelledby="leistungen-heading">
                <h2 id="leistungen-heading" className="text-2xl font-bold text-foreground mb-2">
                  Unsere Leistungen
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                  Jede Leistung wird von spezialisierten Fachkräften ausgeführt. Klicken Sie auf eine Karte für Details und ein unverbindliches Angebot.
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    id={service.id}
                    href={service.href}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      <span>Details ansehen</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
                </div>
              </section>

              {/* Vorteile – eigener Block */}
              <section className="pb-16">
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Ihre Vorteile</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      Mit über 15 Jahren Erfahrung und einem Netzwerk qualifizierter Elektrotechnik-Experten garantieren wir 
                      höchste Qualität bei jeder Installation. Alle Arbeiten werden nach aktuellen DIN VDE-Normen 
                      ausgeführt und dokumentiert – für Ihre Sicherheit und Gewährleistung.
                    </p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {[
                        "VdS-zertifizierte Fachbetriebe",
                        "Transparente Festpreisangebote",
                        "Termingerechte Ausführung",
                        "Umfassende Gewährleistung"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </section>

              {/* Teamfoto – Bild unter public/images/team/elektrotechnik.jpg ablegen */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4">Unser Team</h2>
                <figure className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                  <img
                    src="/images/team/elektrotechnik.jpg"
                    alt="Unser Elektrotechnik-Team"
                    className="w-full object-cover aspect-[21/9] sm:aspect-[3/1]"
                    loading="lazy"
                  />
                  <figcaption className="p-4 text-center text-sm text-muted-foreground">
                    Ihr Ansprechpartner für alle elektrotechnischen Leistungen
                  </figcaption>
                </figure>
              </section>

              {/* FAQ – eigener Block */}
              <section className="pb-16" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
                  Häufige Fragen
                </h2>
              
                <div className="space-y-3">
                {[
                  { q: "Welche Elektro-Leistungen bieten Sie an?", a: "Wir decken das gesamte Spektrum ab: Hauselektrik, Smart Home, E-Mobility, Reparaturen, Neubau, Sanierung, Sicherheitstechnik, LED-Beleuchtung, Klingelanlagen und Messsysteme." },
                  { q: "Bieten Sie auch Wartungsverträge an?", a: "Ja, wir bieten maßgeschneiderte Wartungsverträge für Gewerbe und Wohnanlagen an, die regelmäßige Prüfungen und bevorzugte Reaktionszeiten beinhalten." },
                  { q: "Welche Zertifizierungen haben Ihre Elektriker?", a: "Alle Partner sind eingetragene Elektrofachbetriebe mit Meisterbrief und arbeiten nach DIN VDE. Für Sicherheitstechnik sind wir zusätzlich VdS-zertifiziert." },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-foreground list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
                </div>
              </section>

              {/* Verwandte Links */}
              <section className="pb-20">
                <p className="text-sm font-semibold text-foreground mb-3">Verwandte Leistungen & Standorte</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Alle Handwerk-Leistungen", href: "/handwerk/elektrotechnik" },
                    { label: "Service & Wartung", href: "/handwerk/service-wartung" },
                    { label: "München", href: "/standorte/muenchen" },
                  ].map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </article>

        {/* Kontakt-Sektion – gleicher Hintergrund wie Hero Über uns */}
        <section className="bg-[#26413C] py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white lg:text-4xl">
                Bereit für Ihr Elektroprojekt?
              </h2>
              <p className="mt-4 text-lg text-white/90 leading-relaxed">
                Lassen Sie uns gemeinsam Ihr Vorhaben besprechen – kostenlos und unverbindlich. 
                Unsere Experten beraten Sie zu allen elektrotechnischen Fragen.
              </p>
              
              {/* Kontakt-Optionen */}
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <a 
                  href="tel:+491234567890" 
                  className="group flex items-center gap-3 rounded-2xl bg-[#8AB0AB] px-8 py-5 text-[#26413C] transition-all hover:bg-[#8AB0AB]/90 hover:shadow-lg"
                >
                  <Phone className="h-6 w-6" aria-hidden="true" />
                  <div className="text-left">
                    <p className="text-sm font-medium opacity-90">Direkt anrufen</p>
                    <p className="text-xl font-bold">+49 (0)123 4567890</p>
                  </div>
                </a>
                <Link href="/anfrage">
                  <AnimatedButton className="h-16 px-10 text-lg border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#26413C]">
                    Angebot anfordern
                  </AnimatedButton>
                </Link>
              </div>

              <p className="mt-8 text-sm text-white/80">
                <Clock className="inline-block h-4 w-4 mr-1 -mt-0.5" aria-hidden="true" />
                Montag – Freitag: 07:00 – 18:00 Uhr
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
