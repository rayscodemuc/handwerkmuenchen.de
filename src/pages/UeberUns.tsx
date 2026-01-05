import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { Users, Target, Award, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Zuverlässigkeit",
    description: "Wir halten, was wir versprechen. Pünktlichkeit und Verbindlichkeit sind für uns selbstverständlich.",
  },
  {
    icon: Award,
    title: "Qualität",
    description: "Höchste Standards bei jeder Dienstleistung durch geschultes Fachpersonal und moderne Technik.",
  },
  {
    icon: Users,
    title: "Partnerschaft",
    description: "Langfristige Kundenbeziehungen auf Augenhöhe sind die Basis unseres Erfolgs.",
  },
  {
    icon: Heart,
    title: "Verantwortung",
    description: "Nachhaltiges Handeln und Respekt gegenüber Mensch und Umwelt leiten unser Tun.",
  },
];

const stats = [
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "50+", label: "Mitarbeiter" },
  { value: "24/7", label: "Erreichbarkeit" },
];

export default function UeberUns() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Über uns
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
              Ihr Partner für<br />Facility Management
            </h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                  Unsere Geschichte
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Seit über 15 Jahren steht Mr.Clean Services für professionelles Facility Management 
                  und erstklassige Gebäudereinigung. Was als kleines Familienunternehmen begann, 
                  ist heute ein etablierter Partner für Gewerbe- und Privatkunden in der gesamten Region.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  Unser Erfolg basiert auf einem einfachen Prinzip: Wir behandeln jedes Objekt so, 
                  als wäre es unser eigenes. Mit über 50 engagierten Mitarbeitern und modernster 
                  Ausstattung bieten wir ein Rundum-sorglos-Paket für Ihre Immobilien.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    Team Bild
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-surface py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-black text-primary lg:text-5xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                Unsere Werte
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Die Grundpfeiler unserer täglichen Arbeit.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-3xl bg-surface p-8 text-center"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {value.description}
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
