import { CategoryPageLayout } from "./CategoryPageLayout";

export default function HandwerkCategory() {
  return (
    <CategoryPageLayout
      title="Handwerk"
      subtitle="Technische Dienstleistungen"
      description="Professionelle Handwerksleistungen für Ihre Immobilien. Von Elektroinstallationen bis zur Heizungswartung – wir halten Ihre Gebäudetechnik funktionsfähig."
      services={[
        {
          title: "Elektrotechnik",
          description: "Elektrische Installationen, Wartung und Reparaturen für gewerbliche und private Immobilien.",
          href: "/handwerk/elektrotechnik",
        },
        {
          title: "Sanitär & Heizung",
          description: "Fachgerechte Installation und Wartung von Sanitär- und Heizungsanlagen.",
          href: "/handwerk/sanitaer-heizung",
        },
        {
          title: "Service & Wartung",
          description: "Regelmäßige Wartung und Instandhaltung technischer Anlagen für maximale Betriebssicherheit.",
          href: "/handwerk/service-wartung",
        },
      ]}
    />
  );
}
