import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building2, Clock, Sparkles, Coffee, Trash2, Users, Shield, CheckCircle, BarChart, Leaf } from "lucide-react";

export default function Bueroreinigung() {
  return (
    <BlogServicePageLayout
      title="Büroreinigung"
      subtitle="Produktive Arbeitsumgebung & Mitarbeitergesundheit"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Büroreinigung für Gewerbeimmobilien. Feste Teams, flexible Zeiten und dokumentierte Qualitätsstandards für produktive Arbeitsplätze."
      intro="Für Unternehmen mit Büroflächen ist Sauberkeit mehr als Optik – sie ist ein Produktivitätsfaktor. Studien belegen: Saubere Arbeitsplätze reduzieren krankheitsbedingte Ausfälle um bis zu 20 %. Als Reinigungsdienstleister für Gewerbeimmobilien übernehmen wir die komplette Büroreinigung mit festen Teams, flexiblen Zeiten und dokumentierten Qualitätsstandards."
      imageSrc=""
      imageAlt="Professionelle Büroreinigung mit geschultem Personal"
      imageCaption="Feste Reinigungsteams für gleichbleibende Qualität"
      sections={[
        {
          title: "Feste Teams statt wechselndes Personal",
          content: "Der häufigste Grund für Beschwerden bei Reinigungsdienstleistern: ständig wechselndes Personal. Unsere festen Objektteams kennen Ihre Räumlichkeiten, Ihre Anforderungen und Ihre Ansprechpartner. Das schafft Vertrauen, garantiert gleichbleibende Qualität und ermöglicht direkte Kommunikation bei Sonderwünschen."
        },
        {
          title: "Reinigung außerhalb der Bürozeiten",
          content: "Niemand möchte während der Arbeit gestört werden. Unsere Reinigungsteams arbeiten vor Bürobeginn, nach Feierabend oder nachts – je nach Ihrem Betriebsablauf. Bei Bedarf auch am Wochenende. So ist Ihr Büro jeden Morgen sauber, ohne dass der Arbeitsfluss unterbrochen wird."
        },
        {
          title: "Dokumentierte Qualitätskontrolle",
          content: "Regelmäßige Qualitätskontrollen durch unsere Objektleiter stellen sicher, dass Standards eingehalten werden. Mängel werden sofort korrigiert, Sonderwünsche zeitnah umgesetzt. Auf Wunsch erhalten Sie monatliche Reports mit Leistungskennzahlen."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Hygienekonzepte nach TRBA 220",
        text: "Für sensible Bereiche wie Gesundheitswesen, Lebensmittelverarbeitung oder Labore erstellen wir individuelle Hygienekonzepte nach TRBA 220 und führen Desinfektionsreinigung nach RKI-Richtlinien durch."
      }}
      stats={[
        { value: "20%", label: "weniger Krankheitstage" },
        { value: "1", label: "Fester Objektleiter" },
        { value: "Flexibel", label: "Reinigungszeiten" }
      ]}
      services={[
        { title: "Arbeitsplatzreinigung", description: "Schreibtische, Ablagen, Arbeitsflächen und Technik.", icon: Building2 },
        { title: "Sanitärbereich-Hygiene", description: "Tägliche Desinfektion nach TRBA-Standards.", icon: Sparkles },
        { title: "Küchen & Sozialräume", description: "Aufenthaltsräume, Teeküchen und Gemeinschaftsbereiche.", icon: Coffee },
        { title: "Flexible Reinigungszeiten", description: "Vor, nach oder außerhalb der Bürozeiten.", icon: Clock },
        { title: "Feste Objektteams", description: "Gleiches Personal für Vertrauen und Qualität.", icon: Users },
        { title: "Nachhaltige Reinigungsmittel", description: "EU-Ecolabel-zertifizierte Produkte.", icon: Leaf }
      ]}
      quote="Für Property Manager mit mehreren Bürostandorten bieten wir Rahmenverträge mit einheitlichen Standards, konsolidiertem Reporting und einem zentralen Ansprechpartner."
      faqs={[
        { 
          question: "Wie stellen Sie gleichbleibende Qualität sicher?", 
          answer: "Durch feste Objektteams, regelmäßige Schulungen, dokumentierte Arbeitsabläufe und unangekündigte Qualitätskontrollen durch unsere Objektleiter. Bei Unterschreitung der Standards greifen definierte Eskalationsprozesse." 
        },
        { 
          question: "Können Sie auch sensible Bereiche reinigen?", 
          answer: "Ja, wir erstellen individuelle Hygienekonzepte für Arztpraxen, Labore, Rechenzentren und Lebensmittelbetriebe. Unser Personal ist nach TRBA 220 geschult und führt Desinfektionsreinigung nach RKI-Richtlinien durch." 
        },
        { 
          question: "Was passiert bei Sonderwünschen oder Beschwerden?", 
          answer: "Ihr fester Objektleiter ist Ihr direkter Ansprechpartner. Sonderwünsche werden in der Regel innerhalb von 24 Stunden umgesetzt, Beschwerden sofort bearbeitet und dokumentiert." 
        },
        { 
          question: "Können Sie mehrere Standorte bundesweit betreuen?", 
          answer: "Ja, wir betreuen Unternehmen mit dutzenden Bürostandorten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner." 
        },
        { 
          question: "Welche Reinigungsmittel werden verwendet?", 
          answer: "Wir setzen auf EU-Ecolabel-zertifizierte, umweltfreundliche Produkte. Für spezielle Anforderungen (Desinfektion, Allergiker) passen wir das Produktspektrum individuell an." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Büroreinigung Gewerbe",
        "Arbeitsplatzreinigung",
        "Gewerbliche Reinigung",
        "TRBA 220",
        "Hygienekonzept Büro",
        "Reinigungsdienstleister"
      ]}
      trustBadges={[
        { icon: Users, label: "Feste Teams" },
        { icon: CheckCircle, label: "Qualitätskontrolle" },
        { icon: Leaf, label: "EU-Ecolabel" }
      ]}
    />
  );
}
