import { ServicePageLayout } from "./ServicePageLayout";
import { Leaf, Scissors, Flower, TreeDeciduous, Droplets, Calendar } from "lucide-react";

export default function Gruenpflege() {
  return (
    <ServicePageLayout
      title="Grünpflege"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Grünpflege in Berlin für gepflegte Außenanlagen. Rasenpflege, Heckenschnitt und Beetpflege für einen positiven ersten Eindruck."
      longDescription="Gepflegte Grünanlagen werten Ihre Immobilie auf und schaffen eine angenehme Atmosphäre für Mieter, Besucher und Mitarbeiter."
      keywords={["Grünpflege Berlin", "Rasenpflege Gewerbe", "Heckenschnitt", "Gartenpflege Immobilie"]}
      features={[
        "Rasenpflege und -schnitt",
        "Heckenschnitt und Formschnitt",
        "Beetpflege und Bepflanzung",
        "Laubbeseitigung im Herbst",
        "Bewässerungssysteme",
        "Saisonale Bepflanzung",
      ]}
      detailedFeatures={[
        { title: "Rasenpflege", description: "Regelmäßiger Schnitt, Düngung und Belüftung für sattes Grün.", icon: Leaf },
        { title: "Heckenschnitt", description: "Formschnitt und Rückschnitt für gepflegte Hecken.", icon: Scissors },
        { title: "Beetpflege", description: "Unkrautentfernung, Mulchen und saisonale Bepflanzung.", icon: Flower },
        { title: "Baumpflege", description: "Schnitt und Kontrolle von Bäumen und Sträuchern.", icon: TreeDeciduous },
        { title: "Bewässerung", description: "Installation und Wartung von Bewässerungssystemen.", icon: Droplets },
        { title: "Jahresplanung", description: "Saisonale Pflegeplanung für ganzjährige Schönheit.", icon: Calendar },
      ]}
      benefits={["Gepflegte Optik", "Werterhaltung", "Regelmäßige Pflege", "Fachgerechte Arbeit", "Saisonale Anpassung", "Faire Preise"]}
      faqs={[
        { question: "Wie oft wird der Rasen gemäht?", answer: "In der Saison empfehlen wir wöchentlichen bis 14-tägigen Schnitt." },
        { question: "Werden auch Blumen gepflanzt?", answer: "Ja, wir übernehmen saisonale Bepflanzungen nach Ihren Wünschen." },
      ]}
    />
  );
}
