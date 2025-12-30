import { Button } from "@/components/ui/button";
import heroFacility from "@/assets/hero-facility.jpg";

const services = [
  {
    title: "Facility Management",
    description: "Ganzheitliche Betreuung und Verwaltung Ihrer Immobilien und Anlagen.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Elektrotechnik",
    description: "Professionelle Elektroinstallationen, Wartung und Reparaturen.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Sanitär & Heizung",
    description: "Zuverlässige Installation und Wartung von Sanitär- und Heizungsanlagen.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Gebäudereinigung",
    description: "Umfassende Reinigungslösungen für Büros und öffentliche Einrichtungen.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Hausmeisterservice",
    description: "Kompetente Betreuung und Instandhaltung Ihrer Gebäude.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Winterdienst",
    description: "Zuverlässige Schneeräumung und Streudienste für sichere Wege.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
  },
  {
    title: "Grünanlagenpflege",
    description: "Professionelle Pflege Ihrer Außenbereiche.",
    buttonText: "Mehr erfahren",
    image: heroFacility,
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
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
            >
              {/* Content */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Button variant="default" className="rounded-full px-6">
                    {service.buttonText}
                  </Button>
                </div>
              </div>

              {/* Image with decorative background */}
              <div className="relative h-48 overflow-hidden">
                {/* Decorative curved shape */}
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-primary/20" />
                <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-primary/10" />
                
                {/* Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
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
