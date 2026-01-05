import { ServicePageLayout } from "./ServicePageLayout";

export default function Gruenpflege() {
  return (
    <ServicePageLayout
      title="Grünpflege"
      subtitle="Außenanlagen"
      description="Professioneller Rasen- und Heckenschnitt für gepflegte Außenanlagen. Wir sorgen für einen positiven ersten Eindruck Ihrer Immobilie."
      features={[
        "Rasenpflege und -schnitt",
        "Heckenschnitt und Formschnitt",
        "Beetpflege und Bepflanzung",
        "Laubbeseitigung im Herbst",
        "Bewässerungssysteme",
        "Saisonale Bepflanzung",
      ]}
    />
  );
}
