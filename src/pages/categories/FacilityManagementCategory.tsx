import { CategoryPageLayout } from "./CategoryPageLayout";

export default function FacilityManagementCategory() {
  return (
    <CategoryPageLayout
      title="Facility Management"
      subtitle="Gebäudemanagement"
      description="Ganzheitliches Facility Management für Ihre Liegenschaften. Wir übernehmen Verantwortung für den reibungslosen Betrieb Ihrer Immobilien."
      metaDescription="Professionelles Objektmanagement, Hausmeisterservice und Winterdienst. Wir sorgen für Werterhalt und Sicherheit Ihrer Immobilie mit System."
      services={[
        {
          title: "Hausmeisterservice",
          description: "Zuverlässige Hausmeister vor Ort für Kontrolle, Pflege und Kleinreparaturen.",
          href: "/facility-management/hausmeisterservice",
        },
        {
          title: "Winterdienst",
          description: "Professioneller Winterdienst mit vollständiger Haftungsübernahme bei Schnee und Eis.",
          href: "/facility-management/winterdienst",
        },
        {
          title: "Objektmanagement",
          description: "Strategische Koordination aller FM-Leistungen und langfristige Werterhaltung.",
          href: "/facility-management/objektmanagement",
        },
      ]}
    />
  );
}
