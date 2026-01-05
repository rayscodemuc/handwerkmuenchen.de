import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Building2, Home, Snowflake, ClipboardList, Clock, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Hausmeisterservice",
    description: "Professionelle Hausmeisterleistungen für einen reibungslosen Gebäudebetrieb.",
    link: "/facility-management/hausmeisterservice",
  },
  {
    icon: Snowflake,
    title: "Winterdienst",
    description: "Zuverlässiger Räum- und Streudienst für sichere Wege im Winter.",
    link: "/facility-management/winterdienst",
  },
  {
    icon: ClipboardList,
    title: "Objektmanagement",
    description: "Ganzheitliche Objektbetreuung mit regelmäßigen Kontrollen und Dokumentation.",
    link: "/facility-management/objektmanagement",
  },
];

const reasons = [
  {
    icon: Building2,
    title: "Werterhalt & Sicherheit",
    description: "Systematische Pflege für langfristigen Immobilienwert.",
  },
  {
    icon: Shield,
    title: "Volle Haftungsübernahme",
    description: "Wir übernehmen die Verkehrssicherungspflicht für Sie.",
  },
  {
    icon: Clock,
    title: "24/7 Notdienst",
    description: "Rund um die Uhr erreichbar bei dringenden Anliegen.",
  },
  {
    icon: Users,
    title: "Fester Ansprechpartner",
    description: "Persönliche Betreuung durch Ihren Objektmanager.",
  },
];

export default function FacilityManagementCategory() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Facility Management & Hausmeister-Service"
        description="Professionelles Objektmanagement, Hausmeisterservice und Winterdienst. Wir sorgen für Werterhalt und Sicherheit Ihrer Immobilie mit System."
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
                <Building2 className="h-48 w-48 text-primary/30" />
              </div>
            </div>

            <div className="container relative mx-auto flex min-h-[500px] items-center px-4 lg:min-h-[600px] lg:px-8">
              <div className="relative z-10 w-full py-16 lg:w-1/2 lg:py-24">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Gebäudemanagement
                </p>
                <h1 className="mt-4 font-bold leading-[0.9] tracking-tight text-foreground">
                  <span className="block text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                    Facility
                  </span>
                  <span className="block text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                    Management
                  </span>
                </h1>

                <p className="mt-8 max-w-[420px] text-base leading-relaxed text-foreground/70 lg:text-lg">
                  Werterhalt und Sicherheit für Ihre Immobilie. Wir koordinieren 
                  Hausmeisterservice, Winterdienst und Objektbetreuung aus einer Hand.
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
                Professionelles Objektmanagement
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Hausmeisterservice, Winterdienst und Objektbetreuung aus einer Hand.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
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
                Warum Mr.Clean Facility Management?
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
