import { ServicePageLayout } from "./ServicePageLayout";
import { Eye, Building, Sun, Droplets, Shield, Calendar } from "lucide-react";

export default function Fensterreinigung() {
  return (
    <ServicePageLayout
      title="Fensterreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Fensterreinigung in Berlin für strahlend saubere Glasflächen. Innen- und Außenreinigung für alle Höhen und Gebäudetypen."
      longDescription="Saubere Fenster verbessern den Lichteinfall und das Erscheinungsbild Ihres Gebäudes. Unsere Experten reinigen alle Glasflächen streifenfrei."
      imageAlt="Streifenfreie Glas- und Fensterreinigung für Bürogebäude"
      keywords={["Fensterreinigung Berlin", "Glasreinigung", "Fassadenreinigung", "Schaufensterreinigung"]}
      features={[
        "Fensterreinigung innen und außen",
        "Rahmen- und Falzreinigung",
        "Glasfassaden und Wintergärten",
        "Höhenarbeiten mit Hebebühnen",
        "Schaufensterreinigung",
        "Regelmäßige Wartungsintervalle",
      ]}
      detailedFeatures={[
        { title: "Streifenfreie Reinigung", description: "Professionelle Technik für perfekt saubere Glasflächen.", icon: Eye },
        { title: "Alle Gebäudetypen", description: "Von Einfamilienhäusern bis zu Hochhäusern.", icon: Building },
        { title: "Mehr Licht", description: "Saubere Fenster maximieren den natürlichen Lichteinfall.", icon: Sun },
        { title: "Schonende Methoden", description: "Materialschonende Reinigung für alle Glasarten.", icon: Droplets },
        { title: "Sichere Höhenarbeiten", description: "Zertifizierte Mitarbeiter für alle Höhen.", icon: Shield },
        { title: "Regelmäßige Intervalle", description: "Planbare Reinigung nach Ihrem Zeitplan.", icon: Calendar },
      ]}
      benefits={["Streifenfreie Sauberkeit", "Alle Höhen möglich", "Rahmen inklusive", "Regelmäßige Intervalle", "Faire Preise", "Zuverlässig"]}
      faqs={[
        { question: "Wie oft sollten Fenster gereinigt werden?", answer: "Für Gewerbe empfehlen wir 4-12 Mal pro Jahr, für Privat 2-4 Mal." },
        { question: "Werden auch Rahmen gereinigt?", answer: "Ja, Rahmen- und Falzreinigung ist standardmäßig inklusive." },
      ]}
    />
  );
}
