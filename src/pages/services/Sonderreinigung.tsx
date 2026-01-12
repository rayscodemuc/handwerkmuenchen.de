import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Wrench, Sparkles, Building, Droplets, ShieldCheck, Trash2 } from "lucide-react";

export default function Sonderreinigung() {
  return (
    <BlogServicePageLayout
      title="Sonderreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Spezialisierte Sonderreinigung für besondere Anforderungen. Von Baureinigung bis Industriereinigung."
      intro="Manchmal reicht die reguläre Reinigung nicht aus. Unsere Sonderreinigung bietet spezialisierte Lösungen für besonders anspruchsvolle Reinigungsaufgaben."
      sections={[
        { title: "Baureinigung nach Renovierung", content: "Nach Bauarbeiten entfernen wir Baustaub, Mörtelreste und Schutzfolien – für bezugsfertige Räumlichkeiten." },
        { title: "Industriereinigung", content: "Produktionshallen, Lagerflächen und technische Anlagen erfordern spezielle Reinigungsverfahren und -mittel." },
      ]}
      highlightBox={{ icon: ShieldCheck, title: "Desinfektion", text: "Für sensible Bereiche bieten wir professionelle Desinfektion nach RKI-Richtlinien." }}
      stats={[{ value: "Speziell", label: "für jeden Bedarf" }, { value: "Modern", label: "Technik" }, { value: "Schnell", label: "verfügbar" }]}
      services={[
        { title: "Baureinigung", description: "Nach Bau- oder Renovierungsarbeiten.", icon: Wrench },
        { title: "Teppichreinigung", description: "Tiefenreinigung von Textilien.", icon: Sparkles },
        { title: "Industriereinigung", description: "Produktions- und Lagerflächen.", icon: Building },
        { title: "Desinfektion", description: "Hygienische Desinfektion.", icon: ShieldCheck },
        { title: "Steinpflege", description: "Reinigung und Versiegelung.", icon: Droplets },
        { title: "Entrümpelung", description: "Räumung und Entsorgung.", icon: Trash2 },
      ]}
      faqs={[
        { question: "Was ist bei einer Baureinigung enthalten?", answer: "Entfernung von Baustaub, Reinigung aller Oberflächen, Fenster und Bodenbehandlung." },
        { question: "Wie lange dauert eine Grundreinigung?", answer: "Je nach Fläche und Verschmutzungsgrad 1-3 Tage." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Sonderreinigung", "Baureinigung", "Industriereinigung", "Desinfektion"]}
    />
  );
}
