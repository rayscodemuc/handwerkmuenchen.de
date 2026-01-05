import { ServicePageLayout } from "./ServicePageLayout";

export default function Tiefgaragenreinigung() {
  return (
    <ServicePageLayout
      title="Tiefgaragenreinigung"
      subtitle="Sonderreinigung"
      description="Gründliche Reinigung für Tiefgaragen und Parkhäuser. Entfernung von Schmutz, Öl und Reifenabrieb für ein sauberes und sicheres Parkerlebnis."
      features={[
        "Maschinelle Bodenreinigung",
        "Ölfleckentfernung",
        "Wandreinigung und Entfernung von Graffiti",
        "Reinigung von Zu- und Abfahrten",
        "Entwässerungsrinnen säubern",
        "Beschilderung und Markierungen reinigen",
      ]}
    />
  );
}
