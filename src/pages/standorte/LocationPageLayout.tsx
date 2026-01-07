import { Link } from "react-router-dom";
import { ChevronRight, Wrench, Building2, Sparkles, TreePine, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedButton } from "@/components/ui/animated-button";
import heroImage from "@/assets/hero-facility.jpg";

interface LocationPageLayoutProps {
  city: string;
  seoTitle: string;
  seoDescription: string;
}

const services = [
  {
    title: "Handwerk & Technik",
    description: "Elektrotechnik, Sanitär & Heizung sowie regelmäßige Wartung für Ihre Immobilien.",
    href: "/handwerk",
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

export default function LocationPageLayout({ city, seoTitle, seoDescription }: LocationPageLayoutProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Mr. Clean Services ${city}`,
    description: seoDescription,
    url: `https://mrclean-services.de/standorte/${city.toLowerCase().replace("ü", "ue")}`,
    areaServed: {
      "@type": "City",
      name: city,
    },
    serviceType: ["Facility Management", "Gebäudereinigung", "Handwerk", "Außenanlagenpflege"],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        structuredData={structuredData}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[540px] items-center overflow-hidden bg-background lg:min-h-[650px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={`Mr. Clean Services in ${city}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8 lg:py-28">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">
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
                Mr. Clean Services – Ihr Partner in {city}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
                Professionelles Facility Management, Handwerk, Reinigung und Außenanlagenpflege für Gewerbe- und Wohnimmobilien in {city} und Umgebung.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to={`/anfrage?standort=${city.toLowerCase()}`}>
                <AnimatedButton className="h-14 px-10 text-base">
                  Anfrage für {city} stellen
                </AnimatedButton>
              </Link>
              <Link to="/kontakt">
                <AnimatedButton className="h-14 px-10 text-base border-foreground/30 hover:border-foreground">
                  Kontakt aufnehmen
                </AnimatedButton>
              </Link>
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
                Full-Service für Ihre Immobilien in {city}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Von der Gebäudetechnik bis zur Außenanlagenpflege – alle Gewerke aus einer Hand.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.title}
                  to={service.href}
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

        {/* Local Trust Section */}
        <section className="bg-muted/50 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Lokale Präsenz, überregionale Kompetenz
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Wir betreuen Objekte im gesamten Stadtgebiet von {city} und Umgebung mit eigenem Personal und regionalen Partnern. Durch unser Netzwerk aus qualifizierten Fachkräften garantieren wir kurze Reaktionszeiten und höchste Servicequalität.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
                  Eigenes Personal vor Ort
                </div>
                <div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
                  Geprüfte regionale Partner
                </div>
                <div className="rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
                  Kurze Reaktionszeiten
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-28 lg:py-36">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Jetzt Anfrage für {city} stellen
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/80">
                Lassen Sie uns gemeinsam die optimale Lösung für Ihr Objekt in {city} finden.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={`/anfrage?standort=${city.toLowerCase()}`}>
                <AnimatedButton className="h-14 px-10 text-base bg-foreground text-background hover:bg-background hover:text-foreground">
                  Kostenlos anfragen
                </AnimatedButton>
              </Link>
              <Link to="/kontakt">
                <AnimatedButton className="h-14 px-10 text-base text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Kontakt aufnehmen
                </AnimatedButton>
              </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
