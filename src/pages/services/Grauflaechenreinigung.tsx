import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Car, Droplets, Leaf, Eye, Trash2, Calendar, Shield, CheckCircle, Clock } from "lucide-react";

export default function Grauflaechenreinigung() {
  return (
    <BlogServicePageLayout
      title="Grauflächenreinigung"
      subtitle="Verkehrsflächen & Parkplatzpflege"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Grauflächenreinigung für Gewerbeimmobilien. Parkplätze, Wege und Hofflächen mit Kehrmaschinen und Hochdruckreinigung."
      intro="Versiegelte Flächen sind die Visitenkarte Ihres Objekts. Verschmutzte Parkplätze und ungepflegte Zufahrten signalisieren Vernachlässigung. Für Property Manager bedeutet regelmäßige Grauflächenreinigung: Werterhalt, Verkehrssicherheit und zufriedene Mieter."
      imageSrc=""
      imageAlt="Professionelle Grauflächenreinigung mit Kehrmaschine"
      imageCaption="Maschinelle Reinigung für gepflegte Verkehrsflächen"
      sections={[
        { title: "Erster Eindruck zählt", content: "Parkplätze und Zufahrten sind oft das Erste, was Besucher sehen. Saubere Flächen signalisieren Professionalität und Wertschätzung." },
        { title: "Effiziente Flächenreinigung", content: "Mit modernen Aufsitzkehrmaschinen reinigen wir über 1.000 m² pro Stunde. Für hartnäckige Verschmutzungen setzen wir Hochdruckreinigung ein." },
        { title: "Unkrautbekämpfung inklusive", content: "Unkraut in Fugen und Randbereichen wird thermisch oder mechanisch entfernt – für dauerhaft gepflegte Flächen ohne Chemie." }
      ]}
      highlightBox={{ icon: Shield, title: "Verkehrssicherheit dokumentiert", text: "Regelmäßige Reinigung und Dokumentation erfüllen Ihre Verkehrssicherungspflicht. Bei Unfällen durch Laub oder Verschmutzung sind Sie abgesichert." }}
      stats={[{ value: "1.000+", label: "m² pro Stunde" }, { value: "Wöchentlich", label: "bis monatlich" }, { value: "100%", label: "Dokumentiert" }]}
      services={[
        { title: "Kehrmaschine", description: "Effiziente Flächenreinigung großer Areale.", icon: Car },
        { title: "Hochdruck", description: "Tiefenreinigung für hartnäckigen Schmutz.", icon: Droplets },
        { title: "Unkrautentfernung", description: "Thermisch oder mechanisch, ohne Chemie.", icon: Leaf },
        { title: "Kontrolle", description: "Regelmäßige Zustandsprüfung.", icon: Eye },
        { title: "Müllbeseitigung", description: "Entfernung von Unrat und Abfall.", icon: Trash2 },
        { title: "Jahresplan", description: "Planbare Intervalle und Kosten.", icon: Calendar }
      ]}
      faqs={[
        { question: "Wie oft sollten Grauflächen gereinigt werden?", answer: "Je nach Nutzung wöchentlich bis monatlich. Wir erstellen einen individuellen Plan." },
        { question: "Können auch Ölflecken entfernt werden?", answer: "Ja, mit Spezialverfahren entfernen wir auch eingetrocknete Öl- und Kraftstoffflecken." }
      ]}
      relatedLinks={[
        { label: "Außenanlagen", href: "/aussenanlagen" },
        { label: "Tiefgaragenreinigung", href: "/reinigung/tiefgaragenreinigung" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={["Grauflächenreinigung", "Parkplatzreinigung", "Hofreinigung Gewerbe", "Kehrmaschine"]}
      trustBadges={[{ icon: Car, label: "Moderne Technik" }, { icon: Shield, label: "Verkehrssicherheit" }, { icon: CheckCircle, label: "Dokumentiert" }]}
    />
  );
}
