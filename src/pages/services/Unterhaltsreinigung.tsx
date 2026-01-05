import { ServicePageLayout } from "./ServicePageLayout";

export default function Unterhaltsreinigung() {
  return (
    <ServicePageLayout
      title="Unterhaltsreinigung"
      subtitle="Reinigung"
      description="Präzise Sauberkeit für Büros, Praxen und Gewerbeobjekte. Unsere geschulten Reinigungskräfte sorgen für ein hygienisches und angenehmes Arbeitsumfeld."
      features={[
        "Tägliche oder wöchentliche Reinigung",
        "Büro- und Verwaltungsgebäude",
        "Arztpraxen und Gesundheitseinrichtungen",
        "Umweltfreundliche Reinigungsmittel",
        "Qualitätskontrollen vor Ort",
        "Flexible Reinigungszeiten",
      ]}
    />
  );
}
