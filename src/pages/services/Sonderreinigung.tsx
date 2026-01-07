import { ServicePageLayout } from "./ServicePageLayout";
import { Wrench, Sparkles, Building, Droplets, ShieldCheck, Trash2 } from "lucide-react";

export default function Sonderreinigung() {
  return (
    <ServicePageLayout
      title="Sonderreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Sonderreinigung in Berlin für besondere Anforderungen. Von Baureinigung bis Industriereinigung – Speziallösungen für jeden Bedarf."
      longDescription="Manchmal reicht die reguläre Reinigung nicht aus. Unsere Sonderreinigung bietet spezialisierte Lösungen für besonders anspruchsvolle Reinigungsaufgaben."
      imageAlt="Spezialisierte Sonderreinigung für Industrie und Gewerbe"
      keywords={["Sonderreinigung Berlin", "Baureinigung", "Industriereinigung", "Teppichreinigung"]}
      features={[
        "Baureinigung nach Renovierung",
        "Teppich- und Polsterreinigung",
        "Industriereinigung",
        "Desinfektion und Hygiene",
        "Steinpflege und Bodenversiegelung",
        "Entrümpelung und Entsorgung",
      ]}
      detailedFeatures={[
        { title: "Baureinigung", description: "Professionelle Reinigung nach Bau- oder Renovierungsarbeiten.", icon: Wrench },
        { title: "Teppichreinigung", description: "Tiefenreinigung von Teppichen und Polstermöbeln.", icon: Sparkles },
        { title: "Industriereinigung", description: "Spezialreinigung für Produktions- und Lagerflächen.", icon: Building },
        { title: "Desinfektion", description: "Hygienische Desinfektion für sensible Bereiche.", icon: ShieldCheck },
        { title: "Steinpflege", description: "Reinigung und Versiegelung von Naturstein.", icon: Droplets },
        { title: "Entrümpelung", description: "Fachgerechte Räumung und Entsorgung.", icon: Trash2 },
      ]}
      benefits={["Spezialisierte Lösungen", "Moderne Technik", "Erfahrene Teams", "Schnelle Verfügbarkeit", "Faire Preise", "Umweltfreundlich"]}
      faqs={[
        { question: "Was ist bei einer Baureinigung enthalten?", answer: "Entfernung von Baustaub, Reinigung aller Oberflächen, Fensterreinigung und Bodenbehandlung." },
        { question: "Wie lange dauert eine Grundreinigung?", answer: "Je nach Fläche und Verschmutzungsgrad 1-3 Tage." },
      ]}
    />
  );
}
