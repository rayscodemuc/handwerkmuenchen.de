import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { SEOHead } from "@/components/SEOHead";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Building2, ShieldCheck, BarChart3, Settings, Users, ChevronRight, CheckCircle2, Cpu, Zap, LineChart } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Unterhaltsreinigung",
    description: "Wir sichern die tägliche Performance Ihrer Flächen mit Systematik und einem Auge für Details, die andere übersehen.",
    link: "/reinigung/unterhaltsreinigung",
  },
  {
    icon: ShieldCheck,
    title: "Glas- & Fassadenreinigung",
    description: "Der erste Eindruck zählt. Wir sorgen für streifenfreie Brillanz und schützen die Substanz Ihrer Gebäudehülle.",
    link: "/reinigung/glas-fassade",
  },
  {
    icon: BarChart3,
    title: "Sonderreinigung",
    description: "Härtefälle sind unser Spezialgebiet. Von Baureinigung bis Desinfektion – wir liefern Reinheit, wo Standard scheitert.",
    link: "/reinigung/sonderreinigung",
  },
];

const reasons = [
  {
    icon: LineChart,
    title: "Digitale Kontrolle",
    description: "Wir liefern keine Versprechen, sondern Fakten. Digitale Checklisten zeigen Ihnen jederzeit den Status der Reinigung.",
  },
  {
    icon: Users,
    title: "Feste Teams",
    description: "Kein Personal-Lotto. Wir setzen auf beständige Teams, die Ihr Objekt kennen und Verantwortung persönlich nehmen.",
  },
  {
    icon: Zap,
    title: "Reaktions-Speed",
    description: "Bedarf kurzfristig geändert? Durch unsere flachen Hierarchien sind wir sofort einsatzbereit, wenn es brennt.",
  },
  {
    icon: Settings,
    title: "Keine Massenabfertigung",
    description: "Wir betreuen nur eine ausgewählte Anzahl an Objekten, um unsere extrem hohen Qualitätsstandards zu garantieren.",
  },
];

export default function ReinigungCategory() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Gebäudereinigung mit System | Werterhalt durch Reinheit | Mr.Clean"
        description="Reinigung neu definiert. Wir putzen nicht nur – wir pflegen Werte durch High-End Systematik und menschliche Expertise. Kein Standard, sondern Präzision."
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
                <span className="font-medium text-primary-foreground">Reinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
          {/* Background Pattern & Gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--foreground))/0.08,transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--foreground))/0.05,transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))/0.03_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))/0.03_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-foreground/10 via-transparent to-transparent blur-3xl" />
          </div>

           <div className="relative min-h-[580px] lg:min-h-[680px] pt-4 lg:pt-6">
             <div className="container relative mx-auto flex min-h-[580px] sm:min-h-[520px] items-center justify-center px-4 lg:min-h-[640px] lg:px-8">
               <div className="relative z-10 w-full max-w-4xl py-8 sm:py-12 lg:py-16 text-center">

                {/* Main Headline */}
               <h1 className="font-bold leading-[0.95] tracking-tight text-foreground">
                   <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Sauberkeit
                   </span>
                   <span className="block mt-2 sm:mt-3 md:mt-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     schafft Werte.
                   </span>
                 </h1>

                {/* Subheadline */}
                <p className="mt-8 sm:mt-10 mx-auto max-w-[600px] text-base sm:text-lg leading-relaxed text-foreground/70">
                    Hygiene ist kein Zufall, sondern das Ergebnis höchster Disziplin. Wir schützen die Substanz Ihrer Immobilien durch <span className="text-foreground font-bold underline decoration-primary">systematische Reinheit</span>. 
                    Wo andere nur oberflächlich wischen, sichern wir langfristig die Qualität und Gesundheit Ihres Arbeitsumfelds.
                </p>

                {/* CTA Button - Centered */}
                <div className="mt-10 sm:mt-12 flex justify-center">
                  <Link to="/anfrage" className="w-full sm:w-auto">
                    <AnimatedButton className="w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20 text-base px-10 py-5 sm:py-6 font-semibold">
                      Reinheits-Check anfordern
                    </AnimatedButton>
                  </Link>
                </div>

                {/* Trust Badge - Centered */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center sm:items-center gap-3 sm:gap-8 text-sm text-foreground/60">
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Feste Reinigungsteams
                  </span>
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Digitale Leistungsnachweise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech & Human Connection Section */}
        <section className="bg-foreground text-white py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-6">
                  Hygienische Intelligenz. <br />
                  Sichtbare Verantwortung.
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Echte Reinigung ist kein Handwerk von der Stange, sondern eine Frage der Einstellung. Wir kombinieren moderne Systematik mit geschultem Personal, das Verantwortung noch persönlich nimmt. Bei uns gibt es kein „schnell drüberwischen“, sondern nur Ergebnisse, die einer kritischen Prüfung standhalten.
                </p>
                <ul className="space-y-4">
                  {[
                    "Kein Personal-Hopping – feste Ansprechpartner",
                    "Einsatz von High-End Equipment",
                    "Transparente Echtzeit-Dokumentation",
                    "Strengste Einhaltung von Hygiene-Standards"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square lg:aspect-video rounded-2xl overflow-hidden bg-muted/20 flex items-center justify-center border border-white/10">
                <div className="text-center p-8">
                  <Settings className="h-16 w-16 text-primary mx-auto mb-4 animate-spin-slow" />
                  <p className="text-xl font-medium">Purity meets Professionalism</p>
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
                Werterhalt durch Reinheit
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Vom Bürokomplex bis zur Industriehalle – wir liefern Lösungen, die über den Standard hinausgehen.
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

        <CategoryTrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}