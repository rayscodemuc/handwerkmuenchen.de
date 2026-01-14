import type { Metadata } from "next";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ContactForm } from "@/components/ContactForm";
import { ChevronRight, Wrench, Building2, Sparkles, TreePine, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import heroImage from "@/assets/hero-facility.png";

export const metadata: Metadata = {
  title: "Standort München",
  description: "Professionelles Facility Management, Handwerk, Reinigung und Außenanlagenpflege für München & Umland. Schnelle Reaktionszeit, 24/7 Service, ein Ansprechpartner für alle Gewerke.",
  alternates: {
    canonical: "/standorte/muenchen",
  },
};

const city = "München";
const districts = ["Schwabing", "Bogenhausen", "Maxvorstadt", "Sendling", "Pasing", "Trudering"];
const localHighlight = "Von Schwabing bis Sendling, von Pasing bis Trudering – wir sind in allen Münchner Stadtteilen und im gesamten Umland für Sie im Einsatz.";
const heroAltText = "Professionelle Gebäudereinigung und Facility Management in München Schwabing";

const services = [
  {
    title: "Handwerk & Technik",
    description: "Elektrotechnik, Sanitär & Heizung sowie regelmäßige Wartung für Ihre Immobilien.",
    href: "/leistungen/elektrotechnik",
    icon: Wrench,
  },
  {
    title: "Facility Management",
    description: "Hausmeisterservice, Winterdienst und operatives Objektmanagement aus einer Hand.",
    href: "/facility-management",
    icon: Building2,
  },
  {
    title: "Gebäudereinigung",
    description: "Unterhaltsreinigung, Fensterreinigung und Sonderreinigung für jeden Bedarf.",
    href: "/reinigung",
    icon: Sparkles,
  },
  {
    title: "Außenanlagen",
    description: "Grünpflege, Baumpflege und Grauflächenreinigung für gepflegte Außenbereiche.",
    href: "/aussenanlagen",
    icon: TreePine,
  },
];

const locationSlug = "muenchen";

export default function Muenchen() {
  return (
    <>
        {/* Hero Section */}
        <section className="relative flex min-h-[540px] items-center overflow-hidden bg-background lg:min-h-[650px]">
          <div className="absolute inset-0">
            <img
              src={typeof heroImage === 'string' ? heroImage : heroImage.src}
              alt={heroAltText}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-background/95 lg:via-background/80 lg:to-background/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8 lg:py-28">
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-primary">
                Startseite
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-medium">{city}</span>
            </nav>

            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Standort {city}
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                Ihr Partner für FM, Handwerk & Reinigung in {city}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
                Professionelles Facility Management, Handwerk, Reinigung und Außenanlagenpflege für Gewerbe- und Wohnimmobilien in {city} und Umgebung.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#kontakt-formular">
                  <AnimatedButton className="h-14 px-10 text-base">
                    Anfrage für {city} stellen
                  </AnimatedButton>
                </a>
                <Link href="/kontakt">
                  <AnimatedButton className="h-14 px-10 text-base border-foreground/30 hover:border-foreground">
                    Kontakt aufnehmen
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Section */}
        <section className="bg-muted/50 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPin className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                  Lokale Präsenz in {city}
                </h2>
              </div>
              
              <p className="text-center text-lg text-muted-foreground leading-relaxed mb-8">
                {localHighlight}
              </p>

              {districts.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {districts.map((district) => (
                    <div 
                      key={district}
                      className="rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary"
                    >
                      {district}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="text-3xl font-black text-primary">24/7</div>
                  <div className="mt-2 text-sm text-muted-foreground">Notdienst verfügbar</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="text-3xl font-black text-primary">&lt; 2h</div>
                  <div className="mt-2 text-sm text-muted-foreground">Reaktionszeit in {city}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="text-3xl font-black text-primary">100%</div>
                  <div className="mt-2 text-sm text-muted-foreground">Regionale Kompetenz</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Unsere Leistungen
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Unser Service-Angebot in {city}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Unser Service-Angebot für gewerbliche und private Kunden in {city} – alle Gewerke aus einer Hand.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="kontakt-formular" className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black tracking-tight text-primary-foreground lg:text-4xl">
                  Jetzt Anfrage für {city} stellen
                </h2>
                <p className="mt-4 text-primary-foreground/80">
                  Lassen Sie uns gemeinsam die optimale Lösung für Ihr Objekt finden.
                </p>
              </div>

              <ContactForm
                pageName={`Standort ${city}`}
                presetLocation={locationSlug}
                variant="dark"
                showTitle={false}
              />
            </div>
          </div>
        </section>
    </>
  );
}