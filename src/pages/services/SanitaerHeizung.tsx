import { ServicePageLayout } from "./ServicePageLayout";

export default function SanitaerHeizung() {
  return (
    <ServicePageLayout
      title="Sanitär & Heizung"
      subtitle="Technik"
      description="Professionelle Wartung und Instandhaltung Ihrer Sanitär- und Heizungsanlagen. Wir sorgen für einwandfreie Funktion und Energieeffizienz rund um die Uhr."
      features={[
        "Regelmäßige Wartung von Heizungsanlagen",
        "Sanitärinstallation und Reparaturen",
        "Legionellenprüfung nach Trinkwasserverordnung",
        "Notdienst für akute Störungen",
        "Energieoptimierung der Anlagen",
        "Dokumentation aller Wartungsarbeiten",
      ]}
    />
  );
}
