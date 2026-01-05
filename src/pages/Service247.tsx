import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { 
  Clock, 
  Phone, 
  Wrench, 
  Droplets, 
  Zap, 
  Building2, 
  Shield, 
  Truck,
  HeartHandshake,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Elektrotechnik",
    description: "Stromausfälle, defekte Sicherungen, elektrische Notfälle – wir sind rund um die Uhr für Sie da.",
  },
  {
    icon: Droplets,
    title: "Sanitär & Heizung",
    description: "Rohrbrüche, Heizungsausfälle, verstopfte Abflüsse – schnelle Hilfe zu jeder Tages- und Nachtzeit.",
  },
  {
    icon: Building2,
    title: "Facility Management",
    description: "Gebäudetechnische Notfälle, Schließdienste, Aufzugstörungen – wir reagieren sofort.",
  },
  {
    icon: Wrench,
    title: "Handwerk & Reparaturen",
    description: "Türen, Fenster, Schlösser – alle handwerklichen Notfälle werden schnell behoben.",
  },
  {
    icon: Shield,
    title: "Sicherheitsdienste",
    description: "Alarmverfolgung, Kontrollgänge, Notfalleinsätze – Sicherheit rund um die Uhr.",
  },
  {
    icon: Truck,
    title: "Winterdienst",
    description: "Schneeräumung und Streudienst – auch nachts und an Feiertagen zuverlässig vor Ort.",
  },
];

const benefits = [
  "Erreichbarkeit 365 Tage im Jahr",
  "Reaktionszeit unter 60 Minuten",
  "Qualifizierte Fachkräfte vor Ort",
  "Transparente Preisgestaltung",
  "Dokumentation aller Einsätze",
  "Direkte Kommunikation mit Ihnen",
];

const Service247 = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2">
                <Clock className="h-5 w-5 text-foreground" />
                <span className="text-sm font-semibold text-foreground">Notdienst</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl">
                24/7 Service
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 lg:text-xl">
                Notfälle kennen keine Öffnungszeiten. Deshalb sind wir rund um die Uhr für Sie da – 
                an 365 Tagen im Jahr, auch an Wochenenden und Feiertagen.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
                    Notfall melden
                  </AnimatedButton>
                </Link>
                <a href="tel:+4912345678900">
                  <AnimatedButton className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Sofort anrufen
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
                Unsere Notdienst-Leistungen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/60">
                In allen Gewerken bieten wir schnelle und professionelle Hilfe – 
                zu jeder Zeit, wenn Sie uns brauchen.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-5xl">
                  Warum unser 24/7 Service?
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground/60">
                  Wenn ein Notfall eintritt, zählt jede Minute. Unser Team ist darauf spezialisiert, 
                  schnell und professionell zu reagieren – damit Sie sich auf das Wesentliche konzentrieren können.
                </p>
                <div className="mt-10">
                  <Link to="/anfrage">
                    <AnimatedButton>
                      Jetzt Kontakt aufnehmen
                    </AnimatedButton>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 rounded-xl bg-background p-5"
                  >
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-primary" />
                    <span className="text-lg font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <HeartHandshake className="mx-auto mb-6 h-16 w-16 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Zuverlässigkeit, auf die Sie sich verlassen können
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/60">
                Mit über 10 Jahren Erfahrung im Notdienst-Bereich wissen wir, worauf es ankommt. 
                Unsere geschulten Mitarbeiter sind mit modernstem Equipment ausgestattet und 
                können die meisten Probleme direkt vor Ort lösen.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a 
                  href="tel:+4912345678900"
                  className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:underline"
                >
                  <Phone className="h-6 w-6" />
                  +49 123 456 789 00
                </a>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Service247;
