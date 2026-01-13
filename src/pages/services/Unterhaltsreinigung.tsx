import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Sparkles, Clock, CheckCircle, Users, Leaf, ClipboardCheck, Shield, BarChart, Calendar } from "lucide-react";

export default function Unterhaltsreinigung() {
  return (
    <BlogServicePageLayout
      title="Unterhaltsreinigung"
      subtitle="Regelmäßige Gebäudereinigung & Werterhalt"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte. Planbare Intervalle, dokumentierte Qualität und nachhaltige Reinigungsmittel."
      intro="Die regelmäßige Unterhaltsreinigung ist das Fundament eines gepflegten Gebäudes. Für Hausverwaltungen und Facility Manager bedeutet sie planbare Kosten, zufriedene Mieter und langfristigen Werterhalt. Wir übernehmen die komplette Unterhaltsreinigung mit individuellen Intervallen, geschultem Personal und dokumentierter Qualitätskontrolle."
      imageSrc=""
      imageAlt="Professionelle Unterhaltsreinigung in Gewerbeimmobilie"
      imageCaption="Regelmäßige Reinigung für dauerhaft gepflegte Objekte"
      sections={[
        {
          title: "Individuelle Intervalle statt Standardpakete",
          content: "Jedes Objekt hat unterschiedliche Anforderungen. Ein Bürogebäude mit 50 Mitarbeitern braucht andere Intervalle als eine Arztpraxis oder ein Logistikzentrum. Wir analysieren Ihre Nutzung und erstellen einen maßgeschneiderten Reinigungsplan: täglich, mehrmals wöchentlich oder wöchentlich – je nach Bereich und Bedarf."
        },
        {
          title: "Nachhaltige Reinigung mit System",
          content: "Wir setzen auf biologisch abbaubare, EU-Ecolabel-zertifizierte Reinigungsmittel. Das schont die Umwelt, reduziert Allergierisiken und schützt empfindliche Oberflächen. Dazu gehört auch der sparsame Einsatz von Wasser und Chemie durch moderne Reinigungstechnik."
        },
        {
          title: "Transparente Qualitätskontrolle",
          content: "Regelmäßige Kontrollen durch unsere Objektleiter stellen sicher, dass Standards eingehalten werden. Auf Wunsch erhalten Sie monatliche Reports mit Leistungskennzahlen, Mängelprotokollen und Verbesserungsvorschlägen – ideal für WEG-Abrechnungen oder Eigentümerberichte."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Planbare Kosten, messbare Qualität",
        text: "Festpreise pro Quadratmeter, keine versteckten Kosten. Definierte Leistungskataloge und SLAs mit Reaktionszeiten bei Reklamationen garantieren Transparenz und Verlässlichkeit."
      }}
      stats={[
        { value: "Täglich", label: "bis wöchentlich" },
        { value: "100%", label: "Dokumentiert" },
        { value: "EU-Ecolabel", label: "Zertifiziert" }
      ]}
      services={[
        { title: "Regelmäßige Reinigung", description: "Individuell abgestimmte Intervalle nach Nutzung.", icon: Calendar },
        { title: "Qualitätskontrolle", description: "Regelmäßige Prüfungen durch Objektleitung.", icon: CheckCircle },
        { title: "Geschultes Personal", description: "Professionell, zuverlässig und sprachkompetent.", icon: Users },
        { title: "Umweltfreundlich", description: "EU-Ecolabel-zertifizierte Reinigungsmittel.", icon: Leaf },
        { title: "Hygiene-Standards", description: "TRBA 220 für sensible Bereiche.", icon: Sparkles },
        { title: "Dokumentation", description: "Lückenlose Protokollierung und Reporting.", icon: ClipboardCheck }
      ]}
      quote="Für Hausverwaltungen mit großen Portfolios bieten wir Rahmenverträge mit einheitlichen Qualitätsstandards, konsolidiertem Reporting und einem festen Ansprechpartner für alle Objekte."
      faqs={[
        { 
          question: "Wie werden die Reinigungsintervalle festgelegt?", 
          answer: "Wir analysieren Nutzungsart, Besucherfrequenz und Flächentypen. Ein Bürogebäude mit hoher Frequenz braucht tägliche Reinigung, ein Lager nur wöchentlich. Das Ergebnis ist ein individueller Reinigungsplan mit optimiertem Kosten-Nutzen-Verhältnis." 
        },
        { 
          question: "Was ist im Leistungsumfang enthalten?", 
          answer: "Standard: Bodenreinigung, Arbeitsplätze, Sanitärbereiche, Müllenentleerung. Erweiterbar um Küchen, Treppenhäuser, Außenbereiche, Glasreinigung und Sonderleistungen. Alles wird im Leistungskatalog dokumentiert." 
        },
        { 
          question: "Wie schnell werden Reklamationen bearbeitet?", 
          answer: "Bei Reklamationen reagieren wir innerhalb von 24 Stunden. In SLA-basierten Verträgen garantieren wir Reaktionszeiten von 4-8 Stunden für kritische Mängel." 
        },
        { 
          question: "Können Sie mehrere Standorte bundesweit betreuen?", 
          answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner." 
        },
        { 
          question: "Welche Reinigungsmittel werden verwendet?", 
          answer: "EU-Ecolabel-zertifizierte, biologisch abbaubare Produkte als Standard. Für spezielle Anforderungen (Desinfektion, Allergiker, Naturstein) passen wir das Produktspektrum individuell an." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Büroreinigung", href: "/reinigung/bueroreinigung" },
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
        "Unterhaltsreinigung Gewerbe",
        "Gebäudereinigung",
        "regelmäßige Reinigung",
        "Reinigungsdienstleister",
        "EU-Ecolabel Reinigung",
        "Facility Reinigung"
      ]}
      trustBadges={[
        { icon: Calendar, label: "Flexible Intervalle" },
        { icon: CheckCircle, label: "Qualitätskontrolle" },
        { icon: Leaf, label: "Nachhaltig" }
      ]}
    />
  );
}
