import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Car, Droplets, Leaf, Eye, Trash2, Calendar } from "lucide-react";

export default function Grauflaechenreinigung() {
  return (
    <BlogServicePageLayout
      title="Grauflächenreinigung"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Grauflächenreinigung für saubere Parkplätze, Wege und Hofflächen. Kehrmaschinen und Hochdruckreinigung."
      intro="Versiegelte Flächen wie Parkplätze und Gehwege sind die Visitenkarte Ihres Objekts. Wir sorgen für saubere, gepflegte Grauflächen – mit modernster Technik und regelmäßigen Intervallen."
      sections={[
        {
          title: "Effiziente Flächenreinigung",
          content: "Moderne Kehrmaschinen und Hochdruckgeräte ermöglichen die effiziente Reinigung auch großer Flächen. Von der täglichen Kehrichtbeseitigung bis zur intensiven Tiefenreinigung.",
        },
        {
          title: "Gepflegter erster Eindruck",
          content: "Saubere Parkplätze und Zufahrten signalisieren Professionalität und Wertschätzung gegenüber Mietern, Kunden und Besuchern.",
        },
      ]}
      highlightBox={{
        icon: Car,
        title: "Moderne Kehrmaschinen",
        text: "Unsere Aufsitzkehrmaschinen reinigen große Flächen schnell und gründlich – auch in Tiefgaragen und Parkhäusern einsetzbar.",
      }}
      stats={[
        { value: "1.000+", label: "m² pro Stunde" },
        { value: "Wöchentlich", label: "bis monatlich" },
        { value: "Alle", label: "Flächenarten" },
      ]}
      services={[
        { title: "Kehrmaschine", description: "Effiziente Flächenreinigung mit modernen Geräten.", icon: Car },
        { title: "Hochdruck", description: "Tiefenreinigung für hartnäckigen Schmutz.", icon: Droplets },
        { title: "Unkrautentfernung", description: "Beseitigung von Unkraut in Fugen.", icon: Leaf },
        { title: "Kontrolle", description: "Regelmäßige Zustandsprüfung.", icon: Eye },
        { title: "Müllbeseitigung", description: "Entfernung von Unrat und Abfall.", icon: Trash2 },
        { title: "Regelmäßigkeit", description: "Planbare Reinigungsintervalle.", icon: Calendar },
      ]}
      quote="Ölflecken und eingetrocknete Verschmutzungen entfernen wir mit speziellen Hochdruckverfahren – für dauerhaft saubere Flächen."
      faqs={[
        { question: "Wie oft sollten Grauflächen gereinigt werden?", answer: "Je nach Nutzung wöchentlich bis monatlich für optimale Ergebnisse." },
        { question: "Können auch private Parkplätze gereinigt werden?", answer: "Ja, wir reinigen Flächen jeder Größe für Gewerbe und Wohnanlagen." },
      ]}
      relatedLinks={[
        { label: "Alle Außenanlagen-Leistungen", href: "/aussenanlagen" },
        { label: "Tiefgaragenreinigung", href: "/reinigung/tiefgaragenreinigung" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Grauflächenreinigung", "Parkplatzreinigung", "Hofreinigung", "Kehrmaschine"]}
    />
  );
}
