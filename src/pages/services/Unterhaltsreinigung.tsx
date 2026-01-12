import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Sparkles, Clock, CheckCircle, Users, Leaf, ClipboardCheck } from "lucide-react";

export default function Unterhaltsreinigung() {
  return (
    <BlogServicePageLayout
      title="Unterhaltsreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Regelmäßige Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte. Hygienisch und zuverlässig."
      intro="Eine saubere Arbeitsumgebung steigert das Wohlbefinden und die Produktivität Ihrer Mitarbeiter. Unsere geschulten Reinigungskräfte sorgen für gleichbleibende Sauberkeit."
      sections={[
        { title: "Individuelle Intervalle", content: "Tägliche, wöchentliche oder individuelle Reinigungsintervalle – angepasst an Ihre Nutzung und Anforderungen." },
        { title: "Umweltfreundlich", content: "Wir setzen auf nachhaltige, biologisch abbaubare Reinigungsmittel – gut für die Umwelt und die Gesundheit." },
      ]}
      highlightBox={{ icon: CheckCircle, title: "Qualitätskontrollen", text: "Regelmäßige Kontrollen vor Ort garantieren gleichbleibend hohe Standards." }}
      stats={[{ value: "Täglich", label: "bis wöchentlich" }, { value: "Geschult", label: "Personal" }, { value: "Öko", label: "Reinigungsmittel" }]}
      services={[
        { title: "Regelmäßige Reinigung", description: "Individuell abgestimmte Intervalle.", icon: Clock },
        { title: "Qualitätskontrolle", description: "Regelmäßige Prüfungen.", icon: CheckCircle },
        { title: "Geschultes Personal", description: "Professionell und zuverlässig.", icon: Users },
        { title: "Umweltfreundlich", description: "Nachhaltige Reinigungsmittel.", icon: Leaf },
        { title: "Hygiene-Standards", description: "Höchste Standards für sensible Bereiche.", icon: Sparkles },
        { title: "Dokumentation", description: "Lückenlose Protokollierung.", icon: ClipboardCheck },
      ]}
      faqs={[
        { question: "Wie oft sollte gereinigt werden?", answer: "Je nach Nutzung empfehlen wir tägliche bis wöchentliche Reinigung." },
        { question: "Werden eigene Reinigungsmittel verwendet?", answer: "Ja, wir verwenden hochwertige, umweltfreundliche Produkte." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Büroreinigung", href: "/reinigung/bueroreinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Unterhaltsreinigung", "Gebäudereinigung", "Büroreinigung"]}
    />
  );
}
