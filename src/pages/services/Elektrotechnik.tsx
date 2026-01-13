import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronRight, Clock, Shield, Award, Phone, ArrowRight,
  Zap, Home, Cpu, Car, Wrench, Building2, RefreshCw, 
  Camera, Lightbulb, Bell, Gauge
} from "lucide-react";
import { useEffect } from "react";
import elektrotechnikImage from "@/assets/elektrotechnik-schaltschrank-dguv-v3-pruefung.jpg";

// Service Data für die 11 Leistungen
const services = [
  {
    id: "notdienst",
    icon: Zap,
    title: "Elektro-Notdienst",
    description: "24/7 Notfall-Service bei akuten elektrischen Störungen und Gefahrensituationen.",
    href: "/handwerk/elektrotechnik/notdienst",
    keywords: ["Elektro Notdienst", "24/7 Elektriker", "Stromausfall Hilfe"]
  },
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

// Quick-Nav Kategorien
const quickNavItems = [
  { label: "Notdienst", targetId: "notdienst" },
  { label: "Privatinstallationen", targetId: "hauselektrik" },
  { label: "Smart Home", targetId: "smart-home" },
  { label: "E-Mobility", targetId: "e-mobility" },
  { label: "Sicherheit", targetId: "sicherheitstechnik" },
];

export default function Elektrotechnik() {
  const location = useLocation();
  const canonicalUrl = `https://mrclean-services.de${location.pathname}`;

  useEffect(() => {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);
    return () => { link.remove(); };
  }, [canonicalUrl]);

  // Alle Keywords aus Services sammeln
  const allKeywords = [
    "Elektrotechnik", "DGUV V3 Prüfung", "Elektroinstallation",
    ...services.flatMap(s => s.keywords)
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": canonicalUrl,
    name: "Elektrotechnik – Ihr Partner für alle elektrischen Leistungen",
    description: "Professionelle Elektrotechnik-Dienstleistungen: Notdienst, Smart Home, E-Mobility, Sicherheitstechnik und mehr. Zertifizierter Fachbetrieb für Gewerbe und Privat.",
    provider: {
      "@type": "Organization",
      name: "Mr.Clean Services GmbH",
      url: "https://mrclean-services.de",
    },
    areaServed: { "@type": "Country", name: "Germany" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Elektrotechnik Leistungen",
      itemListElement: services.map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description
        },
        position: i + 1
      }))
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Welche Elektro-Leistungen bieten Sie an?",
        acceptedAnswer: { "@type": "Answer", text: "Wir bieten 11 Kernleistungen: Elektro-Notdienst, Hauselektrik, Smart Home, E-Mobility, Reparaturen, Neubau-Installationen, Sanierung, Sicherheitstechnik, LED-Umrüstung, Klingelanlagen und Messsysteme." },
      },
      {
        "@type": "Question",
        name: "Bieten Sie einen 24/7 Elektro-Notdienst an?",
        acceptedAnswer: { "@type": "Answer", text: "Ja, unser Elektro-Notdienst ist rund um die Uhr erreichbar für akute Störungen und Gefahrensituationen." },
      },
      {
        "@type": "Question",
        name: "Installieren Sie Wallboxen für Elektrofahrzeuge?",
        acceptedAnswer: { "@type": "Answer", text: "Ja, wir planen und installieren Ladeinfrastruktur für Unternehmen, Wohnanlagen und Parkierungsanlagen inklusive aller Förderungsberatung." },
      },
    ],
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Elektrotechnik – Alle Leistungen im Überblick"
        description="Professionelle Elektrotechnik: Notdienst, Smart Home, E-Mobility, Sicherheitstechnik, LED-Umrüstung und mehr. Zertifizierter Fachbetrieb für Gewerbe & Privat."
        keywords={allKeywords}
        structuredData={[structuredData, faqStructuredData]}
        canonicalUrl={canonicalUrl}
      />
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li><Link to="/handwerk" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li><span className="font-medium text-primary-foreground">Elektrotechnik</span></li>
            </ol>
          </div>
        </nav>

        {/* Hero - Kompakt */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Zertifizierter Elektrofachbetrieb
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Elektrotechnik – Alle Leistungen im Überblick
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Von der Steckdose bis zur kompletten Gebäudeautomation: Wir sind Ihr kompetenter Partner für alle elektrotechnischen Anforderungen – privat und gewerblich.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
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
            </div>
          </div>
        </section>

        {/* Quick-Nav */}
        <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm" aria-label="Schnellnavigation">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <span className="shrink-0 text-sm font-medium text-muted-foreground mr-2">Direkt zu:</span>
              {quickNavItems.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => scrollToSection(item.targetId)}
                  className="shrink-0 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Trust Badges */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">24/7 Notdienst</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">VdS-Konform</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">Zertifizierter Fachbetrieb</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog-Style Content */}
        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-5xl py-16 lg:py-20">
              
              {/* Intro Text */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Als zertifizierter Elektrofachbetrieb vereinen wir handwerkliche Präzision mit modernster Technik. 
                Ob schnelle Hilfe im Notfall, intelligente Gebäudesteuerung oder nachhaltige Ladelösungen – 
                unsere Experten realisieren Ihr Projekt termingerecht und normkonform.
              </p>

              {/* Feature Image */}
              <figure className="my-12">
                <img
                  src={elektrotechnikImage}
                  alt="Professionelle Elektroinstallation – Schaltschrank mit sauberer Verkabelung"
                  className="w-full rounded-2xl object-cover aspect-[16/9]"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  Höchste Standards bei jeder Installation – vom Privathaushalt bis zum Industrieobjekt
                </figcaption>
              </figure>

              {/* Leistungen Überschrift */}
              <h2 className="text-3xl font-bold text-foreground mt-16 mb-4">
                Unsere 11 Kernleistungen
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Jede Leistung wird von spezialisierten Fachkräften ausgeführt. Klicken Sie auf eine Karte, 
                um mehr Details zu erfahren und ein unverbindliches Angebot anzufordern.
              </p>

              {/* Service Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    id={service.id}
                    to={service.href}
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

              {/* Highlight Box */}
              <div className="my-16 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Warum Mr.Clean Elektrotechnik?</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      Mit über 15 Jahren Erfahrung und einem Netzwerk qualifizierter Elektromeister garantieren wir 
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

              {/* FAQ Section */}
              <h2 className="text-2xl font-bold text-foreground mt-16 mb-6">
                Häufige Fragen
              </h2>
              
              <div className="space-y-4">
                {[
                  { q: "Welche Elektro-Leistungen bieten Sie an?", a: "Wir decken das gesamte Spektrum ab: Notdienst, Hauselektrik, Smart Home, E-Mobility, Reparaturen, Neubau, Sanierung, Sicherheitstechnik, LED-Beleuchtung, Klingelanlagen und Messsysteme." },
                  { q: "Wie schnell können Sie bei einem Notfall vor Ort sein?", a: "Unser Elektro-Notdienst ist 24/7 erreichbar. In der Regel sind unsere Techniker innerhalb von 60-90 Minuten bei Ihnen." },
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

              {/* Related Links */}
              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-foreground mb-4">Verwandte Leistungen & Standorte</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
                    { label: "Service & Wartung", href: "/facility-management/service-wartung" },
                    { label: "München", href: "/standorte/muenchen" },
                    { label: "Augsburg", href: "/standorte/augsburg" },
                    { label: "Ingolstadt", href: "/standorte/ingolstadt" },
                    { label: "Frankfurt", href: "/standorte/frankfurt" },
                    { label: "Nürnberg", href: "/standorte/nuernberg" },
                    { label: "Hamburg", href: "/standorte/hamburg" },
                    { label: "Berlin", href: "/standorte/berlin" },
                  ].map((link, i) => (
                    <Link
                      key={i}
                      to={link.href}
                      className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </article>

        {/* Kontakt-Sektion */}
        <section className="bg-muted py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                Bereit für Ihr Elektroprojekt?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Lassen Sie uns gemeinsam Ihr Vorhaben besprechen – kostenlos und unverbindlich. 
                Unsere Experten beraten Sie zu allen elektrotechnischen Fragen.
              </p>
              
              {/* Kontakt-Optionen */}
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <a 
                  href="tel:+491234567890" 
                  className="group flex items-center gap-3 rounded-2xl bg-primary px-8 py-5 text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  <Phone className="h-6 w-6" aria-hidden="true" />
                  <div className="text-left">
                    <p className="text-sm font-medium opacity-80">Direkt anrufen</p>
                    <p className="text-xl font-bold">+49 123 456 7890</p>
                  </div>
                </a>
                <Link to="/anfrage">
                  <AnimatedButton className="h-16 px-10 text-lg">
                    Angebot anfordern
                  </AnimatedButton>
                </Link>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mr-1 -mt-0.5" aria-hidden="true" />
                Montag – Freitag: 07:00 – 18:00 Uhr | Notdienst: 24/7 erreichbar
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
