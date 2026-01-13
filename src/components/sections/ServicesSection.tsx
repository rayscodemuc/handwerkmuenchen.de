import { AnimatedButton } from "@/components/ui/animated-button";
import { Wrench, Building2, Sparkles, TreeDeciduous, ArrowRight } from "lucide-react";

const services = [
  {
    id: "handwerk",
    title: "Handwerk & Technik",
    description: "Elektrotechnik, Sanitär & Heizung sowie Service & Wartung – fachgerecht koordiniert durch unser Team und geprüfte Partner.",
    href: "/handwerk",
    icon: Wrench,
  },
  {
    id: "facility",
    title: "Facility Management",
    description: "Hausmeisterservice, Winterdienst und Objektmanagement für den zuverlässigen Betrieb und Werterhalt Ihrer Immobilie.",
    href: "/facility-management",
    icon: Building2,
  },
  {
    id: "reinigung",
    title: "Reinigung",
    description: "Unterhalts-, Büro- und Fensterreinigung sowie Sonder- und Grundreinigung für glänzende Ergebnisse.",
    href: "/reinigung",
    icon: Sparkles,
  },
  {
    id: "aussenanlagen",
    title: "Außenanlagen",
    description: "Grünpflege, Baumpflege, Grauflächenreinigung und Winterdienst für gepflegte Außenbereiche das ganze Jahr.",
    href: "/aussenanlagen",
    icon: TreeDeciduous,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl xl:text-6xl">
            Leistungen, die über den Standard hinausgehen
          </h2>
          <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
            Haben Sie genug von Standard-Lösungen, die Ihre Bedürfnisse ignorieren? Wir rollen die Branche neu auf und ersetzen starre Abläufe durch echtes Fachwissen und menschliche Werte. Erleben Sie Facility Management, das mit Leidenschaft geführt wird – für alle, die eine Partnerschaft mit Substanz suchen.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.id}
                href={service.href}
                className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl lg:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-foreground lg:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center gap-2 font-semibold text-primary transition-colors group-hover:text-primary/80">
                  Mehr erfahren
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <a href="/anfrage">
            <AnimatedButton className="h-14 px-10 text-base">Angebot anfragen</AnimatedButton>
          </a>
        </div>
      </div>
    </section>
  );
}
