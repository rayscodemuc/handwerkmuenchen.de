import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Trees, Leaf, TreeDeciduous, Snowflake, Brush, Clock, Shield, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Außenanlagen",
  description: "Ihre Außenanlagen sind kein Zufallsprodukt. Wir steuern Grünpflege, Baumpflege und Winterdienst mit industrieller Präzision.",
  alternates: {
    canonical: "/aussenanlagen",
  },
};

const services = [
  {
    icon: Leaf,
    title: "Grünpflege",
    description: "Wir überlassen das Wachstum nicht dem Zufall. Systematische Rasen-, Beet- und Heckenpflege für ein kompromissloses Erscheinungsbild.",
    link: "/leistungen/gruenpflege",
  },
  {
    icon: TreeDeciduous,
    title: "Baumpflege",
    description: "Vitalität trifft Sicherheit. Fachgerechte Schnitte und Kontrolle nach FLL-Richtlinien zur langfristigen Substanzsicherung.",
    link: "/leistungen/baumpflege",
  },
  {
    icon: Brush,
    title: "Grauflächenreinigung",
    description: "Porentiefe Reinheit für Wege und Plätze. Wir eliminieren Wildwuchs und Verschmutzung, bevor sie die Bausubstanz angreifen.",
    link: "/leistungen/grauflaechenreinigung",
  },
  {
    icon: Snowflake,
    title: "Winterdienst",
    description: "Haftungssicherheit statt Hoffnung. Wir garantieren schnee- und eisfreie Flächen nach strengster Gemeindesatzung – ohne Wenn und Aber.",
    link: "/leistungen/winterdienst-aussen",
  },
];

const reasons = [
  {
    icon: Shield,
    title: "Haftung geklärt",
    description: "Wir übernehmen die volle Verkehrssicherungspflicht. Sie sind rechtlich zu 100% abgesichert.",
  },
  {
    icon: Clock,
    title: "Präzises Timing",
    description: "Ob Vegetationsphasen oder plötzlicher Wintereinbruch – unsere Logistik ist der Natur immer einen Schritt voraus.",
  },
  {
    icon: Trees,
    title: "Repräsentation",
    description: "Ihr Außengelände ist die Visitenkarte Ihres Unternehmens. Wir sorgen dafür, dass sie glänzt.",
  },
  {
    icon: Users,
    title: "Eigene Kolonnen",
    description: "Keine Subunternehmer-Lotto. Wir arbeiten mit eigenem Fachpersonal und industriellem Maschinenpark.",
  },
];

export default function AussenanlagenCategory() {
  return (
    <>
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li><span className="font-medium text-primary-foreground">Außenanlagen</span></li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--foreground))/0.08,transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--foreground))/0.05,transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))/0.03_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))/0.03_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

           <div className="relative min-h-[580px] lg:min-h-[680px] pt-4 lg:pt-6">
             <div className="container relative mx-auto flex min-h-[580px] sm:min-h-[520px] items-center justify-center px-4 lg:min-h-[640px] lg:px-8">
               <div className="relative z-10 w-full max-w-4xl py-8 sm:py-12 lg:py-16 text-center">

                 <h1 className="font-bold leading-[0.95] tracking-tight text-foreground">
                   <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Natur braucht
                   </span>
                   <span className="block mt-2 sm:mt-3 md:mt-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Disziplin.
                   </span>
                 </h1>

                <p className="mt-8 sm:mt-10 mx-auto max-w-[600px] text-base sm:text-lg leading-relaxed text-foreground/70">
                    Verwilderte Flächen kosten Geld und Image. Wir steuern Ihre Außenanlagen mit <span className="text-foreground font-bold underline decoration-primary">ökologischer Härte</span>. 
                    Vom Sommerschnitt bis zur Winterhaftung – wir zähmen das Umfeld Ihrer Immobilie.{" "}
                    <Link href="/standorte/muenchen" className="text-primary hover:underline font-medium">
                      Standort München
                    </Link>
                </p>

                <div className="mt-10 sm:mt-12 flex justify-center">
                  <Link href="/anfrage" className="w-full sm:w-auto">
                    <AnimatedButton className="w-full sm:w-auto text-base px-10 py-5 sm:py-6 font-semibold">
                      Gelände-Check anfordern
                    </AnimatedButton>
                  </Link>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center sm:items-center gap-3 sm:gap-8 text-sm text-foreground/60">
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Haftungsübernahme Winterdienst
                  </span>
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Industrieller Fuhrpark
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-background py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Beherrschte Außenflächen</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Vom Parkplatz bis zur Parkanlage – wir liefern die Struktur, die Ihr Standort verdient.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link key={service.title} href={service.link} className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg">
                  <service.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-primary">{service.title}</h3>
                  <p className="mt-3 text-muted-foreground">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CategoryTrustSection />
        <CTASection />
    </>
  );
}
