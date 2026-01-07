import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Trees, Leaf, TreeDeciduous, Snowflake, Brush, Clock, Shield, Users, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Garten- und Grünpflege",
    description: "Fachgerechte Pflege von Rasen, Beeten und Hecken.",
    link: "/aussenanlagen/gruenpflege",
  },
  {
    icon: TreeDeciduous,
    title: "Baumpflege & Rückschnitt",
    description: "Fachgerechter Baumschnitt nach Vorschrift.",
    link: "/aussenanlagen/baumpflege",
  },
  {
    icon: Brush,
    title: "Grauflächenreinigung & Gehwegpflege",
    description: "Reinigung von Wegen und befestigten Flächen.",
    link: "/aussenanlagen/grauflaechenreinigung",
  },
  {
    icon: Snowflake,
    title: "Winterdienst",
    description: "Zuverlässiger Räum- und Streudienst.",
    link: "/aussenanlagen/winterdienst",
  },
];

const reasons = [
  {
    icon: Trees,
    title: "Gepflegter Eindruck",
    description: "Repräsentative Außenanlagen für Ihr Unternehmen.",
  },
  {
    icon: Clock,
    title: "Ganzjähriger Service",
    description: "Von der Grünpflege im Sommer bis zum Winterdienst.",
  },
  {
    icon: Shield,
    title: "Verkehrssicherheit",
    description: "Erfüllung aller gesetzlichen Pflichten.",
  },
  {
    icon: Users,
    title: "Fachkundige Teams",
    description: "Erfahrenes Personal mit moderner Ausrüstung.",
  },
];

export default function AussenanlagenCategory() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Grünpflege, Winterdienst & Außenanlagen"
        description="Gepflegte Außenanlagen das ganze Jahr: Grünpflege, Baumpflege und Grauflächenreinigung. Zuverlässiger Service für einen starken ersten Eindruck."
      />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li>
                <span className="font-medium text-primary-foreground">Außenanlagen</span>
              </li>
            </ol>
          </div>
        </nav>

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
                <Trees className="h-48 w-48 text-primary/30" />
              </div>
            </div>

            <div className="container relative mx-auto flex min-h-[500px] items-center px-4 lg:min-h-[600px] lg:px-8">
              <div className="relative z-10 w-full py-16 lg:w-1/2 lg:py-24">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Grünflächen & Außenbereich
                </p>
                <h1 className="mt-4 font-bold leading-[1.1] tracking-tight text-foreground text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
                  Außenanlagenpflege, Grünpflege & Winterdienst
                </h1>

                <p className="mt-8 max-w-[420px] text-base leading-relaxed text-foreground/70 lg:text-lg">
                  Ganzheitliche Pflege Ihrer Außenanlagen für sichere und ansprechende 
                  Grundstücke. Der erste Eindruck zählt – wir sorgen dafür.
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
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Pflege und Instandhaltung Ihrer Außenflächen
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Grünpflege, Baumpflege und Winterdienst aus einer Hand.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                Warum Mr.Clean Außenanlagen?
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

        <CategoryTrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
