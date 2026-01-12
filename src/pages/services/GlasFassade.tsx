import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building, Eye, Sun, Shield, Calendar, Droplets } from "lucide-react";

export default function GlasFassade() {
  return (
    <BlogServicePageLayout
      title="Glas- & Fassadenpflege"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Glas- und Fassadenreinigung für Ihren repräsentativen Auftritt. Alle Materialien, alle Höhen."
      intro="Der erste Eindruck zählt. Saubere Glasflächen und gepflegte Fassaden präsentieren Ihr Unternehmen von der besten Seite und erhalten den Wert Ihrer Immobilie."
      sections={[
        {
          title: "Materialschonende Reinigung",
          content: "Jedes Fassadenmaterial erfordert die richtige Behandlung. Wir reinigen Glas, Klinker, Putz, Metall, Naturstein und mehr – immer mit den passenden Verfahren und Reinigungsmitteln.",
        },
        {
          title: "Höhenarbeiten ohne Grenzen",
          content: "Mit Hubarbeitsbühnen und zertifizierten Industriekletterern erreichen wir jede Fläche. Sicher, effizient und ohne Einschränkung des laufenden Betriebs.",
        },
      ]}
      highlightBox={{
        icon: Building,
        title: "Werterhaltung Ihrer Immobilie",
        text: "Regelmäßige Fassadenpflege verhindert dauerhafte Verschmutzungen und Materialschäden. Eine Investition, die sich langfristig auszahlt.",
      }}
      stats={[
        { value: "Alle", label: "Materialien" },
        { value: "Alle", label: "Höhen" },
        { value: "Schonend", label: "& gründlich" },
      ]}
      services={[
        { title: "Glasreinigung", description: "Streifenfreie Reinigung aller Glasflächen.", icon: Eye },
        { title: "Fassadenpflege", description: "Schonende Reinigung aller Materialien.", icon: Building },
        { title: "Mehr Licht", description: "Maximaler Lichteinfall durch saubere Fenster.", icon: Sun },
        { title: "Höhenarbeiten", description: "Sichere Reinigung auch in großer Höhe.", icon: Shield },
        { title: "Regelmäßigkeit", description: "Planbare Intervalle nach Ihren Wünschen.", icon: Calendar },
        { title: "Schonende Verfahren", description: "Materialgerechte Reinigungsmethoden.", icon: Droplets },
      ]}
      quote="Wintergärten und Glasdächer sind unsere Spezialität – auch schwer zugängliche Flächen reinigen wir gründlich und sicher."
      faqs={[
        { question: "Welche Fassadenmaterialien werden gereinigt?", answer: "Wir reinigen alle Materialien: Glas, Klinker, Putz, Metall, Naturstein, Beton und mehr." },
        { question: "Wie hoch können Sie reinigen?", answer: "Mit Hubarbeitsbühnen und Industriekletterern sind alle Höhen erreichbar." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Fensterreinigung", href: "/reinigung/fensterreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
        { label: "München", href: "/standorte/muenchen" },
      ]}
      keywords={["Fassadenreinigung", "Glasreinigung", "Fassadenpflege", "Höhenarbeiten"]}
    />
  );
}
