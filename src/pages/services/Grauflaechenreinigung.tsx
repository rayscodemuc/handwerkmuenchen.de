import { ServicePageLayout } from "./ServicePageLayout";

export default function Grauflaechenreinigung() {
  return (
    <ServicePageLayout
      title="Grauflächenreinigung"
      subtitle="Außenanlagen"
      description="Saubere Parkplätze und Wege für einen gepflegten Gesamteindruck. Professionelle Reinigung aller versiegelten Flächen rund um Ihre Immobilie."
      features={[
        "Kehrmaschinenreinigung",
        "Hochdruckreinigung",
        "Unkrautbeseitigung in Fugen",
        "Ölfleckenentfernung",
        "Parkplatz- und Hofflächenpflege",
        "Regelmäßige Kontrollgänge",
      ]}
    />
  );
}
