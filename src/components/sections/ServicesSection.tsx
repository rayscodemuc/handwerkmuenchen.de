import { Button } from "@/components/ui/button";
import { Building2, Zap, Droplets, Sparkles, Wrench, Snowflake, TreePine } from "lucide-react";

const services = [
  {
    title: "Facility Management",
    description: "Ganzheitliche Betreuung und Verwaltung Ihrer Immobilien und Anlagen.",
    icon: Building2,
  },
  {
    title: "Elektrotechnik",
    description: "Professionelle Elektroinstallationen, Wartung und Reparaturen.",
    icon: Zap,
  },
  {
    title: "Sanitär & Heizung",
    description: "Zuverlässige Installation und Wartung von Sanitär- und Heizungsanlagen.",
    icon: Droplets,
  },
  {
    title: "Gebäudereinigung",
    description: "Umfassende Reinigungslösungen für Büros, Produktionsstätten und öffentliche Einrichtungen.",
    icon: Sparkles,
  },
  {
    title: "Hausmeisterservice",
    description: "Kompetente Betreuung und Instandhaltung Ihrer Gebäude und Außenanlagen.",
    icon: Wrench,
  },
  {
    title: "Winterdienst",
    description: "Zuverlässige Schneeräumung und Streudienste für sichere Wege.",
    icon: Snowflake,
  },
  {
    title: "Grünanlagenpflege",
    description: "Professionelle Pflege Ihrer Außenbereiche für einen gepflegten ersten Eindruck.",
    icon: TreePine,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl">
            Unsere Leistungen
          </h2>
          <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
            Wir bieten Ihnen maßgeschneiderte Lösungen für alle Bereiche des Facility Managements.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Button variant="default" size="lg" className="rounded-full px-10">
            Angebot anfragen
          </Button>
        </div>
      </div>
    </section>
  );
}
