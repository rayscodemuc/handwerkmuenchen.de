import { ServicePageLayout } from "./ServicePageLayout";
import { Car, Droplets, Trash2, Paintbrush, ArrowDown, Eye } from "lucide-react";

export default function Tiefgaragenreinigung() {
  return (
    <ServicePageLayout
      title="Tiefgaragenreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Tiefgaragenreinigung in Berlin. Entfernung von Schmutz, Öl und Reifenabrieb für sichere und gepflegte Parkflächen."
      longDescription="Tiefgaragen sind besonderen Belastungen ausgesetzt. Unsere Spezialreinigung entfernt hartnäckigen Schmutz und sorgt für ein sauberes Parkerlebnis."
      imageAlt="Maschinelle Tiefgaragenreinigung und Ölfleckentfernung"
      keywords={["Tiefgaragenreinigung Berlin", "Parkhaus reinigen", "Garagenreinigung", "Ölfleckentfernung"]}
      features={[
        "Maschinelle Bodenreinigung",
        "Ölfleckentfernung",
        "Wandreinigung und Graffiti-Entfernung",
        "Reinigung von Zu- und Abfahrten",
        "Entwässerungsrinnen säubern",
        "Beschilderung reinigen",
      ]}
      detailedFeatures={[
        { title: "Maschinelle Reinigung", description: "Effiziente Großflächenreinigung mit Kehrmaschinen.", icon: Car },
        { title: "Ölfleckentfernung", description: "Spezielle Behandlung für Öl- und Kraftstoffflecken.", icon: Droplets },
        { title: "Graffiti-Entfernung", description: "Professionelle Beseitigung von Wandschmierereien.", icon: Paintbrush },
        { title: "Rinnenreinigung", description: "Freimachen aller Entwässerungsrinnen.", icon: ArrowDown },
        { title: "Müllbeseitigung", description: "Entfernung von Unrat und Abfall.", icon: Trash2 },
        { title: "Kontrolle", description: "Dokumentation des Reinigungszustands.", icon: Eye },
      ]}
      benefits={["Saubere Parkflächen", "Mehr Sicherheit", "Werterhaltung", "Moderne Technik", "Flexible Termine", "Nachts möglich"]}
      faqs={[
        { question: "Wann wird gereinigt?", answer: "Die Reinigung erfolgt vorzugsweise nachts oder am Wochenende bei geringer Belegung." },
        { question: "Wie oft sollte gereinigt werden?", answer: "Wir empfehlen 2-4 Reinigungen pro Jahr, je nach Nutzungsintensität." },
      ]}
    />
  );
}
