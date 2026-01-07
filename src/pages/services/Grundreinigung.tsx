import { ServicePageLayout } from "./ServicePageLayout";
import { Sparkles, Layers, Sun, Droplets, Home, CheckCircle } from "lucide-react";

export default function Grundreinigung() {
  return (
    <ServicePageLayout
      title="Grundreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Intensive Grundreinigung in Berlin für alle Oberflächen. Tiefenreinigung als perfekte Basis für die regelmäßige Unterhaltsreinigung."
      longDescription="Die Grundreinigung ist die intensive Tiefenreinigung aller Flächen und Oberflächen. Sie schafft die optimale Basis für die laufende Reinigungspflege."
      imageAlt="Intensive Grundreinigung und Tiefenreinigung aller Bodenbeläge"
      keywords={["Grundreinigung Berlin", "Tiefenreinigung", "Intensivreinigung", "Bodenreinigung"]}
      features={[
        "Intensive Bodenreinigung aller Belagsarten",
        "Entfernung hartnäckiger Verschmutzungen",
        "Reinigung von Heizkörpern und Leuchten",
        "Fenster- und Rahmenreinigung",
        "Küchen- und Sanitärgrundreinigung",
        "Versiegelung und Pflege nach Bedarf",
      ]}
      detailedFeatures={[
        { title: "Bodenintensivierung", description: "Tiefenreinigung aller Bodenbeläge mit speziellen Maschinen.", icon: Layers },
        { title: "Oberflächenpflege", description: "Reinigung aller Oberflächen bis in die Details.", icon: Sparkles },
        { title: "Lichtreinigung", description: "Reinigung von Leuchten und Lampen für mehr Licht.", icon: Sun },
        { title: "Sanitärreinigung", description: "Intensive Reinigung und Entkalkung aller Sanitärbereiche.", icon: Droplets },
        { title: "Gesamtobjekt", description: "Vom Boden bis zur Decke – alles wird gereinigt.", icon: Home },
        { title: "Abnahme", description: "Gemeinsame Qualitätskontrolle nach Abschluss.", icon: CheckCircle },
      ]}
      benefits={["Strahlende Sauberkeit", "Alle Oberflächen", "Intensive Reinigung", "Optimale Basis", "Schnelle Umsetzung", "Transparente Preise"]}
      faqs={[
        { question: "Wann ist eine Grundreinigung sinnvoll?", answer: "Nach Renovierung, bei Mieterwechsel oder wenn die reguläre Reinigung nicht mehr ausreicht." },
        { question: "Wie oft sollte grundgereinigt werden?", answer: "Je nach Nutzung 1-2 Mal jährlich oder bei Bedarf." },
      ]}
    />
  );
}
