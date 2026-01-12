import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Eye, Building, Sun, Droplets, Shield, Calendar } from "lucide-react";

export default function Fensterreinigung() {
  return (
    <BlogServicePageLayout
      title="Fensterreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Fensterreinigung für strahlend saubere Glasflächen. Innen- und Außenreinigung für alle Höhen."
      intro="Saubere Fenster verbessern den Lichteinfall und das Erscheinungsbild Ihres Gebäudes. Unsere Experten reinigen alle Glasflächen streifenfrei – vom Erdgeschoss bis zum Hochhaus."
      sections={[
        {
          title: "Mehr Licht, bessere Atmosphäre",
          content: "Verschmutzte Fenster reduzieren den Lichteinfall um bis zu 30%. Regelmäßige Reinigung maximiert das Tageslicht und schafft eine angenehme Arbeitsatmosphäre.",
        },
        {
          title: "Alle Höhen, alle Gebäudetypen",
          content: "Mit Hubarbeitsbühnen, Teleskopstangen und zertifizierten Industriekletterern erreichen wir jede Fläche – sicher und effizient.",
        },
      ]}
      highlightBox={{
        icon: Shield,
        title: "Zertifizierte Höhenarbeiten",
        text: "Unsere Mitarbeiter sind nach DGUV Vorschrift 38 geschult und für alle Höhenarbeiten zertifiziert. Sicherheit hat oberste Priorität.",
      }}
      stats={[
        { value: "100%", label: "Streifenfrei" },
        { value: "Alle", label: "Höhen möglich" },
        { value: "4-12x", label: "pro Jahr empfohlen" },
      ]}
      services={[
        { title: "Streifenfreie Reinigung", description: "Perfekt saubere Glasflächen mit professioneller Technik.", icon: Eye },
        { title: "Alle Gebäudetypen", description: "Von Einfamilienhäusern bis zu Hochhäusern.", icon: Building },
        { title: "Mehr Licht", description: "Maximaler natürlicher Lichteinfall.", icon: Sun },
        { title: "Schonende Methoden", description: "Materialschonend für alle Glasarten.", icon: Droplets },
        { title: "Sichere Höhenarbeiten", description: "Zertifizierte Mitarbeiter für alle Höhen.", icon: Shield },
        { title: "Regelmäßige Intervalle", description: "Planbare Reinigung nach Ihrem Zeitplan.", icon: Calendar },
      ]}
      quote="Rahmen- und Falzreinigung ist bei uns standardmäßig inklusive – für ein rundum gepflegtes Erscheinungsbild."
      faqs={[
        { question: "Wie oft sollten Fenster gereinigt werden?", answer: "Für Gewerbe empfehlen wir 4-12 Mal pro Jahr, für Privat 2-4 Mal – je nach Lage und Verschmutzung." },
        { question: "Werden auch Rahmen gereinigt?", answer: "Ja, Rahmen- und Falzreinigung ist standardmäßig inklusive." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Glas- & Fassadenpflege", href: "/reinigung/glas-fassade" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
      ]}
      keywords={["Fensterreinigung", "Glasreinigung", "Fassadenreinigung", "Höhenarbeiten"]}
    />
  );
}
