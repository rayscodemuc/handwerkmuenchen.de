import { CategoryPageLayout } from "./CategoryPageLayout";

const services = [
  {
    title: "Winterdienst",
    description: "100% Haftungsübernahme bei Eis und Schnee. Wir übernehmen die Verkehrssicherungspflicht für Ihre Liegenschaften.",
    href: "/haftung-fm/winterdienst",
  },
  {
    title: "Hausmeisterservice",
    description: "Präsenz und Kontrolle vor Ort durch unsere geschulten Hausmeister für den reibungslosen Betrieb.",
    href: "/haftung-fm/hausmeisterservice",
  },
  {
    title: "Objektmanagement",
    description: "Strategische Werterhaltung Ihrer Immobilien durch professionelles Objektmanagement aus einer Hand.",
    href: "/haftung-fm/objektmanagement",
  },
];

export default function HaftungFMCategory() {
  return (
    <CategoryPageLayout
      title="Haftung & FM"
      subtitle="Unsere Leistungen"
      description="Professionelles Facility Management mit voller Haftungsübernahme für sorgenfreien Immobilienbetrieb."
      services={services}
    />
  );
}
