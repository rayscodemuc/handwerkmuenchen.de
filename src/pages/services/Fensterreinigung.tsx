import { ServicePageLayout } from "./ServicePageLayout";

export default function Fensterreinigung() {
  return (
    <ServicePageLayout
      title="Fensterreinigung"
      subtitle="Reinigung"
      description="Streifenfreier Durchblick für Ihr Gebäude. Professionelle Fensterreinigung für alle Höhen und Glasflächen – innen und außen."
      features={[
        "Fensterreinigung innen und außen",
        "Rahmen- und Falzreinigung",
        "Glasfassaden und Wintergärten",
        "Höhenarbeiten mit Hebebühnen",
        "Schaufensterreinigung",
        "Regelmäßige Wartungsintervalle",
      ]}
    />
  );
}
