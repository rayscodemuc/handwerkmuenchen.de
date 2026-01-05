import { ServicePageLayout } from "./ServicePageLayout";
import { Building, Eye, Sun, Shield, Calendar, Droplets } from "lucide-react";

export default function GlasFassade() {
  return (
    <ServicePageLayout
      title="Glas- & Fassadenpflege"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Glas- und Fassadenreinigung in Berlin. Strahlend saubere Glasflächen und gepflegte Fassaden für Ihren repräsentativen Auftritt."
      longDescription="Der erste Eindruck zählt. Saubere Glasflächen und gepflegte Fassaden präsentieren Ihr Unternehmen von der besten Seite."
      keywords={["Fassadenreinigung Berlin", "Glasreinigung Gewerbe", "Fassadenpflege", "Außenreinigung"]}
      features={[
        "Fensterreinigung innen und außen",
        "Fassadenreinigung aller Materialien",
        "Wintergarten und Glasdächer",
        "Höhenarbeiten mit Hubarbeitsbühnen",
        "Rahmen- und Falzreinigung",
        "Regelmäßige Wartungsintervalle",
      ]}
      detailedFeatures={[
        { title: "Glasreinigung", description: "Streifenfreie Reinigung aller Glasflächen.", icon: Eye },
        { title: "Fassadenpflege", description: "Schonende Reinigung aller Fassadenmaterialien.", icon: Building },
        { title: "Mehr Licht", description: "Maximaler Lichteinfall durch saubere Fenster.", icon: Sun },
        { title: "Höhenarbeiten", description: "Sichere Reinigung auch in großer Höhe.", icon: Shield },
        { title: "Regelmäßigkeit", description: "Planbare Reinigungsintervalle nach Ihren Wünschen.", icon: Calendar },
        { title: "Schonend", description: "Materialschonende Reinigungsverfahren.", icon: Droplets },
      ]}
      benefits={["Repräsentativer Auftritt", "Alle Höhen möglich", "Streifenfrei", "Materialschonend", "Regelmäßige Pflege", "Faire Konditionen"]}
      faqs={[
        { question: "Welche Fassadenmaterialien werden gereinigt?", answer: "Wir reinigen alle Materialien: Glas, Klinker, Putz, Metall, Naturstein und mehr." },
        { question: "Wie hoch können Sie reinigen?", answer: "Mit Hubarbeitsbühnen und Industriekletterern sind alle Höhen erreichbar." },
      ]}
    />
  );
}
