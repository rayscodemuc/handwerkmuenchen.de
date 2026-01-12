import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building, Eye, Sun, Shield, Calendar, Droplets, CheckCircle, Clock } from "lucide-react";

export default function GlasFassade() {
  return (
    <BlogServicePageLayout
      title="Glas- & Fassadenpflege"
      subtitle="Werterhalt & Repräsentation für Gewerbeimmobilien"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Glas- und Fassadenreinigung für Gewerbeimmobilien. Alle Materialien, alle Höhen – mit zertifizierten Höhenarbeiten nach DGUV."
      intro="Die Fassade ist das Gesicht Ihrer Immobilie. Für Investoren, Mieter und Besucher ist sie der erste Eindruck – und der zählt. Vernachlässigte Fassaden signalisieren mangelnde Sorgfalt und mindern den Objektwert. Unsere professionelle Glas- und Fassadenpflege erhält die Bausubstanz, steigert die Attraktivität und dokumentiert die Werterhaltung für Asset Manager."
      imageSrc=""
      imageAlt="Professionelle Fassadenreinigung an Bürogebäude"
      imageCaption="Materialschonende Fassadenpflege für langfristigen Werterhalt"
      sections={[
        {
          title: "Werterhalt durch regelmäßige Pflege",
          content: "Umweltverschmutzung, Algen, Moos und Witterung setzen jeder Fassade zu. Unbehandelt führen diese Ablagerungen zu dauerhaften Materialschäden. Regelmäßige Fassadenreinigung entfernt Verschmutzungen, bevor sie die Substanz angreifen – und dokumentiert die Instandhaltung für Versicherungen und Investoren."
        },
        {
          title: "Materialgerechte Reinigungsverfahren",
          content: "Jedes Fassadenmaterial erfordert die richtige Behandlung. Glas, Klinker, Putz, Naturstein, Beton, Metall und Verbundwerkstoffe – wir wählen Reinigungsverfahren und -mittel passend zum Material. Von schonender Niederdruckreinigung bis zur intensiven Hochdruckbehandlung."
        },
        {
          title: "Zertifizierte Höhenarbeiten",
          content: "Mit Hubarbeitsbühnen, Fassadenbefahranlagen und zertifizierten Industriekletterern erreichen wir jede Fläche. Alle Arbeiten erfolgen nach DGUV Vorschrift 38 – sicher, effizient und ohne Einschränkung des laufenden Betriebs."
        }
      ]}
      highlightBox={{
        icon: Building,
        title: "Investition in den Immobilienwert",
        text: "Gepflegte Fassaden steigern den Marktwert und die Vermietbarkeit. Die Kosten der Fassadenreinigung amortisieren sich durch höhere Mieteinnahmen und geringere Instandhaltungskosten."
      }}
      stats={[
        { value: "Alle", label: "Materialien" },
        { value: "DGUV", label: "Zertifiziert" },
        { value: "Werterhalt", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Glasreinigung", description: "Streifenfreie Reinigung aller Glasflächen.", icon: Eye },
        { title: "Fassadenpflege", description: "Materialschonende Reinigung aller Oberflächen.", icon: Building },
        { title: "Wintergärten & Glasdächer", description: "Spezialreinigung schwer zugänglicher Flächen.", icon: Sun },
        { title: "Höhenarbeiten", description: "DGUV-zertifizierte Industriekletterer.", icon: Shield },
        { title: "Regelmäßige Intervalle", description: "Planbare Termine nach Jahresplan.", icon: Calendar },
        { title: "Schonende Verfahren", description: "Niederdruck für empfindliche Materialien.", icon: Droplets }
      ]}
      quote="Wintergärten, Glasdächer und schwer zugängliche Flächen sind unsere Spezialität – wir reinigen gründlich und sicher, auch an den Stellen, die andere auslassen."
      faqs={[
        { 
          question: "Welche Fassadenmaterialien können Sie reinigen?", 
          answer: "Wir reinigen alle gängigen Materialien: Glas, Klinker, Putz, Naturstein, Beton, Metall, Aluminium, Verbundwerkstoffe und mehr. Für jedes Material wählen wir das passende Verfahren." 
        },
        { 
          question: "Wie hoch können Sie arbeiten?", 
          answer: "Mit Hubarbeitsbühnen, Fassadenbefahranlagen und zertifizierten Industriekletterern erreichen wir jede Höhe – vom Erdgeschoss bis zum Hochhaus. Alle Arbeiten nach DGUV Vorschrift 38." 
        },
        { 
          question: "Wie oft sollte eine Fassade gereinigt werden?", 
          answer: "Je nach Standort und Material empfehlen wir 1-4 Reinigungen pro Jahr. Glasflächen häufiger, Steinfassaden seltener. Wir erstellen einen individuellen Pflegeplan." 
        },
        { 
          question: "Wird der Betrieb durch die Arbeiten gestört?", 
          answer: "Nein, wir koordinieren Termine außerhalb der Kernzeiten und schützen Eingangsbereiche. Die Arbeiten erfolgen zügig und ohne Beeinträchtigung des laufenden Betriebs." 
        },
        { 
          question: "Dokumentieren Sie die Werterhaltung?", 
          answer: "Ja, auf Wunsch erstellen wir Wartungsprotokolle mit Fotos und Zustandsbeschreibungen. Ideal für Asset Manager, Investoren und Versicherungsnachweise." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Fensterreinigung", href: "/reinigung/fensterreinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "Berlin", href: "/standorte/berlin" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Hamburg", href: "/standorte/hamburg" }
      ]}
      keywords={[
        "Fassadenreinigung Gewerbe",
        "Glasreinigung",
        "Fassadenpflege",
        "Höhenarbeiten DGUV",
        "Industriekletterer",
        "Gebäudepflege"
      ]}
      trustBadges={[
        { icon: Shield, label: "DGUV-zertifiziert" },
        { icon: Building, label: "Alle Materialien" },
        { icon: CheckCircle, label: "Werterhalt dokumentiert" }
      ]}
    />
  );
}
