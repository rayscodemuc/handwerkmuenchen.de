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
    title: "Technisches FM 4.0",
    description: "Wir überwachen Ihre Gebäudeleittechnik mit smarter Sensorik. Fehler werden erkannt, bevor sie den Betrieb stören.",
    link: "/facility-management/technik",
  },
  {
    icon: ShieldCheck,
    title: "Proaktive Instandhaltung",
    description: "Kein Reagieren auf Schäden. Wir planen den Werterhalt Ihrer Immobilie strategisch und mit digitaler Präzision.",
    link: "/facility-management/instandhaltung",
  },
  {
    icon: BarChart3,
    title: "Energie-Monitoring",
    description: "Maximale Transparenz über Verbräuche und Lastspitzen. Wir optimieren Ihre Kostenbasis durch High-End Analytik.",
    link: "/facility-management/energie",
  },
];

const reasons = [
  {
    icon: LineChart,
    title: "Datenbasierter Werterhalt",
    description: "Wir liefern keine Schätzungen, sondern Fakten. Digitale Berichte zeigen Ihnen jederzeit den Status Ihres Objekts.",
  },
  {
    icon: Users,
    title: "Echte Verantwortung",
    description: "Ein fester Objektmanager statt wechselnder Subunternehmer. Bei uns zählt das Wort und die Fachkompetenz.",
  },
  {
    icon: Zap,
    title: "Reaktions-Speed",
    description: "Durch digitale Vernetzung sind unsere Techniker im Notfall informiert, bevor Sie zum Hörer greifen müssen.",
  },
  {
    icon: Settings,
    title: "Keine Massenverwaltung",
    description: "Wir nehmen nur Projekte an, die wir mit 100% Fokus betreuen können. Qualität statt unpersönlicher Großverwaltung.",
  },
];

export default function FacilityManagementCategory() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Smart Facility Management | Proaktiver Werterhalt | Mr.Clean"
        description="Facility Management neu gedacht. Wir verwalten nicht nur – wir erhalten Werte durch High-End Sensorik und menschliche Expertise. Kein Standard, sondern digitale Präzision."
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
                <span className="font-medium text-primary-foreground">Facility Management</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
          {/* Background Pattern & Gradient */}
          <div className="absolute inset-0">
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--foreground))/0.08,transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--foreground))/0.05,transparent_50%)]" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))/0.03_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))/0.03_1px,transparent_1px)] bg-[size:60px_60px]" />
            {/* Gradient accents */}
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-foreground/10 via-transparent to-transparent blur-3xl" />
          </div>

           <div className="relative min-h-[580px] lg:min-h-[680px] pt-4 lg:pt-6">
             {/* Content Container - Centered */}
             <div className="container relative mx-auto flex min-h-[580px] sm:min-h-[520px] items-center justify-center px-4 lg:min-h-[640px] lg:px-8">
               {/* Centered Content */}
               <div className="relative z-10 w-full max-w-4xl py-8 sm:py-12 lg:py-16 text-center">

                
                 {/* Main Headline */}
                 <h1 className="font-bold leading-[0.95] tracking-tight text-foreground">
                   <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Verwalten war
                   </span>
                   <span className="block mt-2 sm:mt-3 md:mt-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Gestern.
                   </span>
                 </h1>

                {/* Subheadline */}
                <p className="mt-8 sm:mt-10 mx-auto max-w-[600px] text-base sm:text-lg leading-relaxed text-foreground/70">
                    Wir beenden das Zeitalter der passiven Verwaltung. Während andere nur auf Schäden reagieren, steuern wir Ihre Immobilien mit <span className="text-foreground font-bold underline decoration-primary">proaktiver Intelligenz</span>. 
                    Wir sichern nicht nur den Bestand, wir steigern die Performance.
                </p>

                {/* CTA Button - Centered */}
                <div className="mt-10 sm:mt-12 flex justify-center">
                  <Link to="/anfrage" className="w-full sm:w-auto">
                    <AnimatedButton className="w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20 text-base px-10 py-5 sm:py-6 font-semibold">
                      Objekt-Status prüfen
                    </AnimatedButton>
                  </Link>
                </div>

                {/* Trust Badge - Centered */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center sm:items-center gap-3 sm:gap-8 text-sm text-foreground/60">
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Keine KI-Warteschleifen
                  </span>
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Echtzeit-Monitoring
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
          Präventive Intelligenz. <br />
          Strategischer Werterhalt.
        </h2>
        <p className="text-white/70 text-lg mb-8">
          In der modernen Immobilienbewirtschaftung ist Stillstand das größte Risiko. Wir vernetzen Ihre Objekte mit präventiver Analytik, um Verschleiß zu antizipieren, bevor er Ihre Bilanz belastet. Doch Technik liefert nur die Basis – die finale Bewertung und Steuerung bleibt bei uns die Aufgabe von erfahrenen Spezialisten mit echtem Verantwortungsbewusstsein.
        </p>
        <ul className="space-y-4">
          {[
            "Keine anonymen Ticket-Systeme",
            "Predictive Maintenance für technische Anlagen",
            "Lückenlose digitale Dokumentation (Audit-safe)",
            "Fester Objektmanager mit Entscheidungskompetenz"
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
          <p className="text-xl font-medium">Stewardship meets Analytics</p>
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
                Ganzheitlicher Werterhalt
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Technisches, kaufmännisches und infrastrukturelles Management – koordiniert aus einer Hand.
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
                Warum Mr.Clean Management?
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