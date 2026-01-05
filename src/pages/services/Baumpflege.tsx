import { ServicePageLayout } from "./ServicePageLayout";

export default function Baumpflege() {
  return (
    <ServicePageLayout
      title="Baumpflege"
      subtitle="Außenanlagen"
      description="Verkehrssicherheit und Ästhetik durch professionelle Baumpflege. Unsere Experten sorgen für gesunde Bäume und sichere Grundstücke."
      features={[
        "Baumschnitt und Kronenrückschnitt",
        "Totholzentfernung",
        "Baumfällung mit Genehmigung",
        "Sturmschadensbeseitigung",
        "Baumkontrolle nach FLL",
        "Kronensicherung",
      ]}
    />
  );
}
