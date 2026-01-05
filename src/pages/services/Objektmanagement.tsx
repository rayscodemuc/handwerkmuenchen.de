import { ServicePageLayout } from "./ServicePageLayout";

export default function Objektmanagement() {
  return (
    <ServicePageLayout
      title="Objektmanagement"
      subtitle="Haftung & FM"
      description="Strategische Werterhaltung Ihrer Immobilien durch professionelles Objektmanagement. Wir koordinieren alle Dienstleistungen aus einer Hand."
      features={[
        "Zentrale Koordination aller FM-Leistungen",
        "Budgetplanung und Kostenkontrolle",
        "Dienstleistersteuerung",
        "Regelmäßiges Reporting",
        "Qualitätssicherung vor Ort",
        "Langfristige Instandhaltungsplanung",
      ]}
    />
  );
}
