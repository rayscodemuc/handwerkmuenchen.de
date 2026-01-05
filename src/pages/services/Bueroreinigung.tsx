import { ServicePageLayout } from "./ServicePageLayout";

export default function Bueroreinigung() {
  return (
    <ServicePageLayout
      title="Büroreinigung"
      subtitle="Reinigung"
      description="Saubere Arbeitsplätze für produktive Mitarbeiter. Professionelle Büroreinigung nach Ihren Anforderungen – täglich, wöchentlich oder nach Bedarf."
      features={[
        "Tägliche Unterhaltsreinigung",
        "Reinigung von Arbeitsplätzen und Besprechungsräumen",
        "Sanitärbereichspflege",
        "Küchen- und Sozialraumreinigung",
        "Papierkörbe und Mülltrennung",
        "Flexible Reinigungszeiten außerhalb der Bürozeiten",
      ]}
    />
  );
}
