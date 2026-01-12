import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Leaf, Scissors, Flower, TreeDeciduous, Droplets, Calendar } from "lucide-react";

export default function Gruenpflege() {
  return (
    <BlogServicePageLayout
      title="Grünpflege"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Grünpflege für gepflegte Außenanlagen. Rasenpflege, Heckenschnitt und Beetpflege."
      intro="Gepflegte Grünanlagen werten Ihre Immobilie auf und schaffen eine angenehme Atmosphäre für Mieter, Besucher und Mitarbeiter. Wir übernehmen die ganzjährige Pflege Ihrer Außenanlagen."
      sections={[
        {
          title: "Ganzjährige Pflege",
          content: "Von der Frühjahrsreinigung über die regelmäßige Rasenpflege im Sommer bis zur Laubbeseitigung im Herbst – wir betreuen Ihre Grünflächen das ganze Jahr über.",
        },
        {
          title: "Professionelle Ausstattung",
          content: "Moderne Mäher, Heckenscheren und Bewässerungssysteme garantieren effiziente Pflege auch auf großen Flächen.",
        },
      ]}
      highlightBox={{
        icon: Calendar,
        title: "Saisonale Bepflanzung",
        text: "Auf Wunsch übernehmen wir die saisonale Bepflanzung Ihrer Beete – für ein ansprechendes Erscheinungsbild zu jeder Jahreszeit.",
      }}
      stats={[
        { value: "Wöchentlich", label: "Rasenschnitt" },
        { value: "Saisonal", label: "Bepflanzung" },
        { value: "Ganzjährig", label: "Betreuung" },
      ]}
      services={[
        { title: "Rasenpflege", description: "Regelmäßiger Schnitt, Düngung und Belüftung.", icon: Leaf },
        { title: "Heckenschnitt", description: "Formschnitt und Rückschnitt.", icon: Scissors },
        { title: "Beetpflege", description: "Unkrautentfernung und saisonale Bepflanzung.", icon: Flower },
        { title: "Baumpflege", description: "Schnitt und Kontrolle von Bäumen.", icon: TreeDeciduous },
        { title: "Bewässerung", description: "Installation und Wartung von Systemen.", icon: Droplets },
        { title: "Jahresplanung", description: "Saisonale Pflegeplanung.", icon: Calendar },
      ]}
      quote="Gepflegte Grünanlagen steigern nachweislich die Zufriedenheit von Mietern und den Wert Ihrer Immobilie."
      faqs={[
        { question: "Wie oft wird der Rasen gemäht?", answer: "In der Saison empfehlen wir wöchentlichen bis 14-tägigen Schnitt, je nach Wachstum." },
        { question: "Werden auch Blumen gepflanzt?", answer: "Ja, wir übernehmen saisonale Bepflanzungen nach Ihren Wünschen." },
      ]}
      relatedLinks={[
        { label: "Alle Außenanlagen-Leistungen", href: "/aussenanlagen" },
        { label: "Baumpflege", href: "/aussenanlagen/baumpflege" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "München", href: "/standorte/muenchen" },
      ]}
      keywords={["Grünpflege", "Rasenpflege", "Heckenschnitt", "Gartenpflege"]}
    />
  );
}
