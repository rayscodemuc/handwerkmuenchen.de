import { CategoryPageLayout } from "./CategoryPageLayout";

const services = [
  {
    title: "Elektrotechnik",
    description: "Rechtssichere Prüfung nach DGUV V3 und umfassende elektrotechnische Dienstleistungen für Ihre Immobilien.",
    href: "/technik/elektrotechnik",
  },
  {
    title: "Sanitär & Heizung",
    description: "Professionelle Wartung und Instandhaltung Ihrer Sanitär- und Heizungsanlagen mit 24/7 Notdienst.",
    href: "/technik/sanitaer-heizung",
  },
];

export default function TechnikCategory() {
  return (
    <CategoryPageLayout
      title="Technik"
      subtitle="Unsere Leistungen"
      description="Zuverlässige technische Dienstleistungen für den sicheren und effizienten Betrieb Ihrer Gebäudetechnik."
      services={services}
    />
  );
}
