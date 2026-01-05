import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Sparkles, Building, Layers, FlaskConical, Car, Wind, Clock, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Unterhaltsreinigung",
    description: "Regelmäßige Reinigung für dauerhaft saubere Räumlichkeiten.",
    link: "/reinigung/unterhaltsreinigung",
  },
  {
    icon: Wind,
    title: "Fensterreinigung",
    description: "Streifenfreie Glas- und Fensterreinigung für klare Durchsicht.",
    link: "/reinigung/fensterreinigung",
  },
  {
    icon: FlaskConical,
    title: "Sonderreinigung",
    description: "Spezialreinigungen für besondere Anforderungen und Oberflächen.",
    link: "/reinigung/sonderreinigung",
  },
  {
    icon: Car,
    title: "Tiefgaragenreinigung",
    description: "Professionelle Reinigung von Tiefgaragen und Parkhäusern.",
    link: "/reinigung/tiefgaragenreinigung",
  },
  {
    icon: Layers,
    title: "Grundreinigung",
    description: "Intensive Reinigung zur Wiederherstellung des Ursprungszustands.",
    link: "/reinigung/grundreinigung",
  },
  {
    icon: Building,
    title: "Büroreinigung",
    description: "Saubere Arbeitsplätze für ein produktives Arbeitsumfeld.",
    link: "/reinigung/bueroreinigung",
  },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Hygiene & Sauberkeit",
    description: "Höchste Hygienestandards für ein gesundes Arbeitsumfeld.",
  },
  {
    icon: Shield,
    title: "Qualitätsgarantie",
    description: "Regelmäßige Kontrollen sichern gleichbleibende Ergebnisse.",
  },
  {
    icon: Clock,
    title: "Flexible Einsatzzeiten",
    description: "Reinigung nach Ihrem Zeitplan – auch nachts und am Wochenende.",
  },
  {
    icon: Users,
    title: "Geschultes Personal",
    description: "Erfahrene Reinigungskräfte mit professioneller Ausbildung.",
  },
];

export default function ReinigungCategory() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Professionelle Reinigung & Gebäudeservice"
        description="Glänzende Ergebnisse für Ihr Objekt: Unterhaltsreinigung, Glas- und Fensterreinigung sowie Sonderreinigungen (TG & Grundreinigung) vom Profi."
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
          <div className="relative min-h-[540px] lg:min-h-[650px] pt-8 lg:pt-12">
            <div 
              className="absolute inset-0"
              style={{
                clipPath: "polygon(55% 0, 100% 0, 100% 100%, 35% 100%)",
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Sparkles className="h-48 w-48 text-primary/30" />
              </div>
            </div>

            <div className="container relative mx-auto flex min-h-[500px] items-center px-4 lg:min-h-[600px] lg:px-8">
              <div className="relative z-10 w-full py-16 lg:w-1/2 lg:py-24">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Gebäudeservice
                </p>
                <h1 className="mt-4 font-bold leading-[0.9] tracking-tight text-foreground">
                  <span className="block text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]">
                    Professionelle
                  </span>
                  <span className="block text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]">
                    Reinigung für
                  </span>
                  <span className="block text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]">
                    Ihr Objekt
                  </span>
                </h1>

                <p className="mt-8 max-w-[420px] text-base leading-relaxed text-foreground/70 lg:text-lg">
                  Von der täglichen Unterhaltsreinigung bis zur Spezialreinigung – 
                  wir sorgen für Hygiene und Sauberkeit in Ihren Räumlichkeiten.
                </p>

                <div className="mt-10">
                  <Link to="/anfrage">
                    <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
                      Angebot anfragen
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-background py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Unsere Leistungen
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Reinigungsservices im Überblick
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Von der täglichen Unterhaltsreinigung bis zur Spezialreinigung.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  to={service.link}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg"
                >
                  <service.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="bg-muted/50 py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Ihre Vorteile
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Warum Mr.Clean Reinigung?
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <reason.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
