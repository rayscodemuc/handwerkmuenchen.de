import { ServicePageLayout } from "./ServicePageLayout";
import { Sparkles, Clock, CheckCircle, Users, Leaf, ClipboardCheck } from "lucide-react";

export default function Unterhaltsreinigung() {
  return (
    <ServicePageLayout
      title="Unterhaltsreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte in Berlin. Regelmäßige Reinigung für ein hygienisches Arbeitsumfeld."
      longDescription="Eine saubere Arbeitsumgebung steigert das Wohlbefinden und die Produktivität Ihrer Mitarbeiter. Unsere geschulten Reinigungskräfte sorgen für gleichbleibende Sauberkeit."
      keywords={["Unterhaltsreinigung Berlin", "Gebäudereinigung", "Büroreinigung", "gewerbliche Reinigung"]}
      features={[
        "Tägliche, wöchentliche oder individuelle Intervalle",
        "Büro- und Verwaltungsgebäude",
        "Arztpraxen und Gesundheitseinrichtungen",
        "Umweltfreundliche Reinigungsmittel",
        "Qualitätskontrollen vor Ort",
        "Flexible Reinigungszeiten",
      ]}
      detailedFeatures={[
        { title: "Regelmäßige Reinigung", description: "Individuell abgestimmte Reinigungsintervalle für Ihre Anforderungen.", icon: Clock },
        { title: "Qualitätskontrolle", description: "Regelmäßige Kontrollen für gleichbleibend hohe Standards.", icon: CheckCircle },
        { title: "Geschultes Personal", description: "Alle Mitarbeiter sind professionell geschult und zuverlässig.", icon: Users },
        { title: "Umweltfreundlich", description: "Einsatz nachhaltiger und biologisch abbaubarer Reinigungsmittel.", icon: Leaf },
        { title: "Hygiene-Standards", description: "Höchste Hygienestandards für sensible Bereiche.", icon: Sparkles },
        { title: "Dokumentation", description: "Lückenlose Dokumentation aller Reinigungsarbeiten.", icon: ClipboardCheck },
      ]}
      benefits={["Saubere Arbeitsumgebung", "Zufriedene Mitarbeiter", "Flexible Zeiten", "Umweltfreundlich", "Zuverlässig", "Transparente Preise"]}
      faqs={[
        { question: "Wie oft sollte gereinigt werden?", answer: "Je nach Nutzung empfehlen wir tägliche bis wöchentliche Reinigung." },
        { question: "Werden eigene Reinigungsmittel verwendet?", answer: "Ja, wir verwenden hochwertige, umweltfreundliche Produkte." },
      ]}
    />
  );
}
