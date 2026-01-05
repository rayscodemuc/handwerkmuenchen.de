import { ServicePageLayout } from "./ServicePageLayout";

export default function GlasFassade() {
  return (
    <ServicePageLayout
      title="Glas- & Fassadenpflege"
      subtitle="Reinigung"
      description="Image durch strahlende Optik. Professionelle Reinigung von Glasflächen und Fassaden für einen repräsentativen ersten Eindruck."
      features={[
        "Fensterreinigung innen und außen",
        "Fassadenreinigung aller Materialien",
        "Wintergarten und Glasdächer",
        "Höhenarbeiten mit Hubarbeitsbühnen",
        "Rahmen- und Falzreinigung",
        "Regelmäßige Wartungsintervalle",
      ]}
    />
  );
}
