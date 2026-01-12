import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Car, Droplets, Trash2, Paintbrush, ArrowDown, Eye, Shield } from "lucide-react";

export default function Tiefgaragenreinigung() {
  return (
    <BlogServicePageLayout
      title="Tiefgaragenreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Tiefgaragenreinigung für gepflegte und sichere Parkflächen. Reifenabrieb, Ölflecken und Entwässerung."
      intro="Tiefgaragen sind besonderen Belastungen ausgesetzt: Reifenabrieb, Ölflecken und Staub setzen den Böden zu. Unsere professionelle Reinigung sorgt für Sicherheit und gepflegtes Erscheinungsbild."
      sections={[
        { title: "Sicherheit durch Sauberkeit", content: "Saubere Markierungen und rutschfreie Böden erhöhen die Sicherheit. Freie Entwässerungsrinnen verhindern Wasserschäden." },
        { title: "Flexible Terminplanung", content: "Die Reinigung erfolgt nachts oder am Wochenende bei geringer Belegung – ohne Beeinträchtigung des Betriebs." },
      ]}
      highlightBox={{ icon: Shield, title: "Ölfleckentfernung", text: "Mit Spezialverfahren entfernen wir auch eingetrocknete Öl- und Kraftstoffflecken – für saubere Böden und Brandschutz." }}
      stats={[{ value: "2-4x", label: "pro Jahr" }, { value: "Nachts", label: "möglich" }, { value: "Festpreis", label: "Garantie" }]}
      services={[
        { title: "Maschinelle Reinigung", description: "Scheuersaugmaschinen für große Flächen.", icon: Car },
        { title: "Ölfleckentfernung", description: "Spezialbehandlung für Öl und Kraftstoff.", icon: Droplets },
        { title: "Reifenabrieb", description: "Entfernung schwarzer Reifenspuren.", icon: Shield },
        { title: "Rinnenreinigung", description: "Freimachen aller Entwässerungen.", icon: ArrowDown },
        { title: "Graffiti-Entfernung", description: "Beseitigung von Wandschmierereien.", icon: Paintbrush },
        { title: "Müllbeseitigung", description: "Entfernung von Abfall und Unrat.", icon: Trash2 },
      ]}
      faqs={[
        { question: "Wann wird die Tiefgarage gereinigt?", answer: "Vorzugsweise nachts oder am Wochenende bei geringer Belegung." },
        { question: "Wie oft sollte eine Tiefgarage gereinigt werden?", answer: "Wir empfehlen 2-4 Grundreinigungen pro Jahr, je nach Nutzung." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Grauflächenreinigung", href: "/aussenanlagen/grauflaechenreinigung" },
        { label: "München", href: "/standorte/muenchen" },
      ]}
      keywords={["Tiefgaragenreinigung", "Parkhaus reinigen", "Ölfleckentfernung"]}
    />
  );
}
