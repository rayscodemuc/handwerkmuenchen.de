import { ServicePageLayout } from "./ServicePageLayout";

export default function Sonderreinigung() {
  return (
    <ServicePageLayout
      title="Sonderreinigung"
      subtitle="Reinigung"
      description="Tiefenpflege nach Bedarf für besondere Anforderungen. Von der Baureinigung bis zur Teppichpflege – wir bieten Speziallösungen für jeden Anlass."
      features={[
        "Baureinigung nach Renovierung",
        "Teppich- und Polsterreinigung",
        "Industriereinigung",
        "Desinfektion und Hygiene",
        "Steinpflege und Bodenversiegelung",
        "Entrümpelung und Entsorgung",
      ]}
    />
  );
}
