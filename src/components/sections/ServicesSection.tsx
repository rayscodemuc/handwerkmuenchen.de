import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroHiking from "@/assets/hero-hiking.jpg";

const categories = [
  { id: "reinigung", label: "Reinigung" },
  { id: "gebaude", label: "Gebäudemanagement" },
  { id: "sicherheit", label: "Sicherheit" },
  { id: "beratung", label: "Beratung" },
];

const servicesByCategory: Record<string, Array<{
  title: string;
  description: string;
  buttonText: string;
  image: string;
}>> = {
  reinigung: [
    {
      title: "Professionelle Gebäudereinigung",
      description: "Umfassende Reinigungslösungen für Büros, Produktionsstätten und öffentliche Einrichtungen.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Sonderreinigung & Desinfektion",
      description: "Spezialisierte Reinigung für besondere Anforderungen und hygienische Standards.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Grünpflege & Außenanlagen",
      description: "Professionelle Pflege Ihrer Außenbereiche für einen gepflegten ersten Eindruck.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
  ],
  gebaude: [
    {
      title: "Technisches Facility Management",
      description: "Wartung und Instandhaltung aller technischen Anlagen in Ihrem Gebäude.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Infrastrukturelles Management",
      description: "Koordination aller infrastrukturellen Dienstleistungen aus einer Hand.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Kaufmännisches Management",
      description: "Professionelle Verwaltung und Optimierung Ihrer Immobilienkosten.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
  ],
  sicherheit: [
    {
      title: "Objektschutz",
      description: "Zuverlässiger Schutz für Ihre Gebäude und Einrichtungen rund um die Uhr.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Empfangsdienste",
      description: "Professionelle Empfangs- und Besucherbetreuung für Ihr Unternehmen.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Veranstaltungsschutz",
      description: "Sicherheitskonzepte für Events und Veranstaltungen jeder Größe.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
  ],
  beratung: [
    {
      title: "Facility Consulting",
      description: "Strategische Beratung zur Optimierung Ihrer Facility-Management-Prozesse.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Energie-Beratung",
      description: "Analyse und Optimierung Ihres Energieverbrauchs für nachhaltige Einsparungen.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
    {
      title: "Workplace Consulting",
      description: "Moderne Arbeitsplatzkonzepte für mehr Produktivität und Wohlbefinden.",
      buttonText: "Mehr erfahren",
      image: heroHiking,
    },
  ],
};

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("reinigung");
  const services = servicesByCategory[activeCategory];

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

        {/* Tab Navigation */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-card p-1.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all lg:px-8 lg:text-base ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg"
            >
              {/* Card Content */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground lg:text-2xl leading-tight">
                  {service.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <Button className="mt-6" variant="default">
                  {service.buttonText}
                </Button>
              </div>

              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Button variant="default" size="lg" className="rounded-full px-10">
            Standort finden
          </Button>
        </div>
      </div>
    </section>
  );
}
