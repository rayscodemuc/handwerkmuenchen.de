import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building2, Clock, Sparkles, Coffee, Trash2, Users } from "lucide-react";

export default function Bueroreinigung() {
  return (
    <BlogServicePageLayout
      title="Büroreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Büroreinigung für produktive Arbeitsplätze. Tägliche oder wöchentliche Reinigung nach Ihren Anforderungen."
      intro="Saubere Arbeitsplätze fördern die Gesundheit und Produktivität Ihrer Mitarbeiter. Unsere geschulten Reinigungskräfte sorgen für ein angenehmes Arbeitsumfeld – zuverlässig und diskret."
      sections={[
        {
          title: "Flexibel nach Ihren Wünschen",
          content: "Ob tägliche Unterhaltsreinigung oder wöchentliche Grundpflege – wir passen uns Ihrem Betriebsablauf an. Die Reinigung erfolgt vor oder nach den Bürozeiten, um den Arbeitsfluss nicht zu stören.",
        },
        {
          title: "Festes Reinigungsteam",
          content: "Sie erhalten ein vertrautes Team, das Ihre Räumlichkeiten und Anforderungen kennt. Das schafft Vertrauen und garantiert gleichbleibend hohe Qualität.",
        },
      ]}
      highlightBox={{
        icon: Users,
        title: "Persönlicher Ansprechpartner",
        text: "Ein fester Objektleiter betreut Ihr Gebäude, führt regelmäßige Qualitätskontrollen durch und ist Ihr direkter Kontakt für alle Anliegen.",
      }}
      stats={[
        { value: "5x", label: "pro Woche möglich" },
        { value: "Fest", label: "Team zugewiesen" },
        { value: "Flexibel", label: "Reinigungszeiten" },
      ]}
      services={[
        { title: "Arbeitsplatzreinigung", description: "Schreibtische, Ablagen und Arbeitsflächen.", icon: Building2 },
        { title: "Sanitärbereiche", description: "Hygienische Reinigung und Desinfektion.", icon: Sparkles },
        { title: "Küchen & Sozialräume", description: "Aufenthaltsräume und Gemeinschaftsbereiche.", icon: Coffee },
        { title: "Entsorgung", description: "Papierkörbe leeren und Mülltrennung.", icon: Trash2 },
        { title: "Flexible Zeiten", description: "Reinigung vor oder nach Geschäftszeiten.", icon: Clock },
        { title: "Festes Team", description: "Vertrautes Personal für Ihr Objekt.", icon: Users },
      ]}
      quote="Eine saubere Arbeitsumgebung steigert nachweislich die Mitarbeiterzufriedenheit und reduziert krankheitsbedingte Ausfälle."
      faqs={[
        { question: "Wann wird gereinigt?", answer: "Die Reinigung erfolgt nach Ihren Wünschen – vor oder nach den Bürozeiten, auch am Wochenende möglich." },
        { question: "Können Sonderwünsche berücksichtigt werden?", answer: "Ja, wir passen den Leistungsumfang individuell an Ihre Bedürfnisse an." },
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Büroreinigung", "Arbeitsplatzreinigung", "Gewerbliche Reinigung"]}
    />
  );
}
