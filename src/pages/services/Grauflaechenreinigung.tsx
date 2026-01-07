import { ServicePageLayout } from "./ServicePageLayout";
import { Car, Droplets, Leaf, Eye, Trash2, Calendar } from "lucide-react";

export default function Grauflaechenreinigung() {
  return (
    <ServicePageLayout
      title="Grauflächenreinigung"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Grauflächenreinigung in Berlin für saubere Parkplätze, Wege und Hofflächen. Kehrmaschinen und Hochdruckreinigung."
      longDescription="Versiegelte Flächen wie Parkplätze und Gehwege sind die Visitenkarte Ihres Objekts. Wir sorgen für saubere und gepflegte Grauflächen."
      imageAlt="Grauflächenreinigung und Gehwegpflege für gepflegte Außenanlagen"
      keywords={["Grauflächenreinigung Berlin", "Parkplatzreinigung", "Hofreinigung", "Kehrmaschinenreinigung"]}
      features={[
        "Kehrmaschinenreinigung",
        "Hochdruckreinigung",
        "Unkrautbeseitigung in Fugen",
        "Ölfleckenentfernung",
        "Parkplatz- und Hofflächenpflege",
        "Regelmäßige Kontrollgänge",
      ]}
      detailedFeatures={[
        { title: "Kehrmaschine", description: "Effiziente Flächenreinigung mit modernen Kehrmaschinen.", icon: Car },
        { title: "Hochdruck", description: "Tiefenreinigung mit Hochdruckgeräten für hartnäckigen Schmutz.", icon: Droplets },
        { title: "Unkrautentfernung", description: "Beseitigung von Unkraut in Fugen und Randbereichen.", icon: Leaf },
        { title: "Kontrolle", description: "Regelmäßige Kontrolle des Flächenzustands.", icon: Eye },
        { title: "Müllbeseitigung", description: "Entfernung von Unrat und Abfall auf den Flächen.", icon: Trash2 },
        { title: "Regelmäßigkeit", description: "Planbare Reinigungsintervalle für dauerhaft saubere Flächen.", icon: Calendar },
      ]}
      benefits={["Saubere Flächen", "Gepflegter Eindruck", "Werterhaltung", "Regelmäßige Pflege", "Moderne Technik", "Faire Preise"]}
      faqs={[
        { question: "Wie oft sollten Grauflächen gereinigt werden?", answer: "Je nach Nutzung wöchentlich bis monatlich für optimale Ergebnisse." },
        { question: "Können auch private Parkplätze gereinigt werden?", answer: "Ja, wir reinigen Flächen jeder Größe für Gewerbe und Wohnanlagen." },
      ]}
    />
  );
}
