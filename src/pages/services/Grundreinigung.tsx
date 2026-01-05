import { ServicePageLayout } from "./ServicePageLayout";

export default function Grundreinigung() {
  return (
    <ServicePageLayout
      title="Grundreinigung"
      subtitle="Sonderreinigung"
      description="Intensive Tiefenreinigung für alle Oberflächen. Die Grundreinigung bringt Ihre Räume wieder auf Hochglanz und schafft die perfekte Basis für die regelmäßige Unterhaltsreinigung."
      features={[
        "Intensive Bodenreinigung aller Belagsarten",
        "Entfernung hartnäckiger Verschmutzungen",
        "Reinigung von Heizkörpern und Leuchten",
        "Fenster- und Rahmenreinigung",
        "Küchen- und Sanitärgrundreinigung",
        "Versiegelung und Pflege nach Bedarf",
      ]}
    />
  );
}
