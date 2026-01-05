import { ServicePageLayout } from "./ServicePageLayout";
import { Building2, Clock, Sparkles, Coffee, Trash2, Users } from "lucide-react";

export default function Bueroreinigung() {
  return (
    <ServicePageLayout
      title="Büroreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Büroreinigung in Berlin für produktive Arbeitsplätze. Tägliche oder wöchentliche Reinigung nach Ihren Anforderungen."
      longDescription="Saubere Arbeitsplätze fördern die Gesundheit und Produktivität Ihrer Mitarbeiter. Unsere Büroreinigung sorgt für ein angenehmes Arbeitsumfeld."
      keywords={["Büroreinigung Berlin", "Arbeitsplatzreinigung", "Gewerbliche Reinigung", "Büro sauber machen"]}
      features={[
        "Tägliche Unterhaltsreinigung",
        "Reinigung von Arbeitsplätzen und Besprechungsräumen",
        "Sanitärbereichspflege",
        "Küchen- und Sozialraumreinigung",
        "Papierkörbe und Mülltrennung",
        "Flexible Zeiten außerhalb der Bürozeiten",
      ]}
      detailedFeatures={[
        { title: "Arbeitsplatzreinigung", description: "Gründliche Reinigung von Schreibtischen, Ablagen und Arbeitsflächen.", icon: Building2 },
        { title: "Sanitärbereiche", description: "Hygienische Reinigung und Desinfektion aller Sanitärräume.", icon: Sparkles },
        { title: "Küchen & Sozialräume", description: "Reinigung von Küchen, Aufenthaltsräumen und Gemeinschaftsbereichen.", icon: Coffee },
        { title: "Entsorgung", description: "Regelmäßige Leerung von Papierkörben und Mülltrennung.", icon: Trash2 },
        { title: "Flexible Zeiten", description: "Reinigung vor oder nach Ihren Geschäftszeiten.", icon: Clock },
        { title: "Festes Team", description: "Vertrautes Reinigungsteam für Ihr Objekt.", icon: Users },
      ]}
      benefits={["Saubere Arbeitsplätze", "Flexible Zeiten", "Festes Reinigungsteam", "Hygienische Standards", "Umweltfreundlich", "Zuverlässig"]}
      faqs={[
        { question: "Wann wird gereinigt?", answer: "Die Reinigung erfolgt nach Ihren Wünschen – vor oder nach den Bürozeiten." },
        { question: "Können Sonderwünsche berücksichtigt werden?", answer: "Ja, wir passen den Leistungsumfang individuell an Ihre Bedürfnisse an." },
      ]}
    />
  );
}
