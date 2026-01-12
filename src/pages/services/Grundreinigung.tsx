import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Sparkles, Layers, Sun, Droplets, Home, CheckCircle } from "lucide-react";

export default function Grundreinigung() {
  return (
    <BlogServicePageLayout
      title="Grundreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Intensive Grundreinigung für alle Oberflächen. Die perfekte Basis für die regelmäßige Unterhaltsreinigung."
      intro="Die Grundreinigung ist die intensive Tiefenreinigung aller Flächen und Oberflächen. Sie schafft die optimale Basis für die laufende Reinigungspflege und entfernt auch hartnäckigste Verschmutzungen."
      sections={[
        {
          title: "Von Boden bis Decke",
          content: "Bei einer Grundreinigung wird jede Fläche intensiv behandelt – Böden, Wände, Decken, Heizkörper, Leuchten und alle Oberflächen werden gründlich gereinigt.",
        },
        {
          title: "Perfekte Basis",
          content: "Nach einer Grundreinigung ist die regelmäßige Unterhaltsreinigung wesentlich effizienter. Der Sauberkeitszustand bleibt länger erhalten.",
        },
      ]}
      highlightBox={{
        icon: CheckCircle,
        title: "Gemeinsame Abnahme",
        text: "Nach Abschluss der Grundreinigung führen wir gemeinsam mit Ihnen eine Qualitätskontrolle durch – so stellen wir sicher, dass alle Anforderungen erfüllt sind.",
      }}
      stats={[
        { value: "100%", label: "Alle Flächen" },
        { value: "1-3", label: "Tage Dauer" },
        { value: "1-2x", label: "pro Jahr" },
      ]}
      services={[
        { title: "Bodenintensivierung", description: "Tiefenreinigung aller Bodenbeläge.", icon: Layers },
        { title: "Oberflächenpflege", description: "Reinigung aller Flächen bis in die Details.", icon: Sparkles },
        { title: "Lichtreinigung", description: "Reinigung von Leuchten für mehr Licht.", icon: Sun },
        { title: "Sanitärreinigung", description: "Intensive Entkalkung aller Bereiche.", icon: Droplets },
        { title: "Gesamtobjekt", description: "Vom Boden bis zur Decke.", icon: Home },
        { title: "Abnahme", description: "Gemeinsame Qualitätskontrolle.", icon: CheckCircle },
      ]}
      quote="Eine professionelle Grundreinigung verlängert die Lebensdauer Ihrer Bodenbeläge und reduziert langfristig die Reinigungskosten."
      faqs={[
        { question: "Wann ist eine Grundreinigung sinnvoll?", answer: "Nach Renovierung, bei Mieterwechsel oder wenn die reguläre Reinigung nicht mehr ausreicht." },
        { question: "Wie oft sollte grundgereinigt werden?", answer: "Je nach Nutzung 1-2 Mal jährlich oder bei Bedarf." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
        { label: "Sonderreinigung", href: "/reinigung/sonderreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Grundreinigung", "Tiefenreinigung", "Intensivreinigung", "Bodenreinigung"]}
    />
  );
}
