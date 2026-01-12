import { ServicePageLayout } from "./ServicePageLayout";
import { Wrench, Calendar, FileText, Clock, Settings, CheckCircle } from "lucide-react";

export default function ServiceWartung() {
  return (
    <ServicePageLayout
      title="Service & Wartung"
      subtitle="Technische Betriebsführung"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Wartung und Instandhaltung technischer Anlagen nach DIN 31051 für maximale Betriebssicherheit und Anlagenverfügbarkeit."
      longDescription={`Ungeplante Anlagenausfälle sind der größte Kostentreiber in der Gebäudebewirtschaftung. Als spezialisierter Partner für technisches Gebäudemanagement eliminiert Mr. Clean Services dieses Risiko durch systematische Wartungsstrategien nach DIN 31051. Unsere Leistungen richten sich an Betreiber von Gewerbeimmobilien, Logistikzentren, Produktionsstätten und großen Wohnungsbauportfolios, die höchste Ansprüche an Verfügbarkeit und Compliance stellen.

Unser Wartungskonzept basiert auf dem Prinzip der präventiven Instandhaltung. Statt auf Störungen zu reagieren, identifizieren wir potenzielle Schwachstellen proaktiv und beheben sie, bevor sie zu Ausfällen führen. Dafür nutzen wir digitale Wartungsplanung mit automatisierten Erinnerungen, standardisierten Checklisten und Echtzeit-Dokumentation. Alle Wartungsarbeiten werden revisionssicher protokolliert und sind jederzeit für Audits, ISO-Zertifizierungen oder behördliche Prüfungen abrufbar.

Wir betreuen alle technischen Gewerke aus einer Hand: Heizung, Lüftung, Klima (HLK), Sanitär, Elektrotechnik, Aufzugsanlagen und Brandschutztechnik. Für Hausverwaltungen und Property Manager bedeutet das: ein zentraler Ansprechpartner, ein Vertrag, eine Rechnung – bei gleichzeitig höchster Fachkompetenz in jedem Gewerk. Unsere Techniker sind nach den jeweiligen Normen und Herstellervorgaben geschult und zertifiziert.

Für Industrieanlagen und kritische Infrastrukturen bieten wir maßgeschneiderte SLAs mit garantierten Reaktionszeiten. Unser 24/7 Störungsmanagement gewährleistet, dass im Ernstfall sofort qualifiziertes Personal mit den passenden Ersatzteilen vor Ort ist. Durch strategisches Ersatzteilmanagement und Lagerhaltung minimieren wir Stillstandszeiten auf ein Minimum.

Die Vorteile unserer systematischen Wartung sind messbar: längere Anlagenlebensdauer, geringere Energiekosten durch optimierte Betriebsparameter, Rechtssicherheit durch normkonforme Dokumentation und planbare Instandhaltungsbudgets. Als Teil unseres integrierten Leistungsangebots arbeiten wir nahtlos mit unseren Elektrotechnik- und Sanitärteams zusammen.`}
      imageAlt="Technische Wartung und Instandhaltung von Gebäudeanlagen"
      keywords={["Wartungsvertrag Gewerbe", "Instandhaltung DIN 31051", "Gebäudetechnik Wartung", "präventive Instandhaltung", "TGA Wartung", "Facility Management Wartung", "Anlagenverfügbarkeit", "SLA Wartung"]}
      features={[
        "Wartungsverträge für alle technischen Gewerke (HLK, Sanitär, Elektro)",
        "Präventive Instandhaltung nach DIN 31051",
        "Digitale Wartungsplanung und Echtzeit-Dokumentation",
        "24/7 Störungsmeldung mit garantierten Reaktionszeiten",
        "Strategisches Ersatzteilmanagement und Lagerhaltung",
        "Regelmäßige Inspektionen und Funktionsprüfungen",
        "Energieoptimierung durch Betriebsparameteranalyse",
        "Gewerkeübergreifende Koordination aus einer Hand",
      ]}
      detailedFeatures={[
        {
          title: "Wartungsplanung",
          description: "Individuelle Wartungspläne basierend auf Herstellervorgaben, Normanforderungen und Nutzungsintensität. Automatisierte Terminierung und Erinnerungen.",
          icon: Calendar,
        },
        {
          title: "Präventive Wartung",
          description: "Potenzielle Probleme erkennen, bevor sie zu kostspieligen Ausfällen führen. Systematische Inspektionen nach standardisierten Checklisten.",
          icon: Settings,
        },
        {
          title: "Digitale Dokumentation",
          description: "Alle Wartungsarbeiten digital erfasst und jederzeit abrufbar. Revisionssichere Protokolle für Audits und behördliche Prüfungen.",
          icon: FileText,
        },
        {
          title: "Schnelle Reaktion",
          description: "Garantierte Reaktionszeiten bei Störungen. Unsere Teams sind mit passenden Ersatzteilen und Spezialwerkzeug ausgestattet.",
          icon: Clock,
        },
        {
          title: "Gewerkeübergreifend",
          description: "Ein Ansprechpartner für alle technischen Gewerke. Von der Heizung bis zur Brandmeldeanlage – alles aus einer Hand.",
          icon: Wrench,
        },
        {
          title: "Qualitätssicherung",
          description: "Standardisierte Arbeitsabläufe, Vier-Augen-Prinzip bei kritischen Anlagen und kontinuierliche Qualitätskontrolle.",
          icon: CheckCircle,
        },
      ]}
      benefits={[
        "Minimierung ungeplanter Ausfälle",
        "Verlängerte Anlagen-Lebensdauer",
        "Planbare Instandhaltungskosten",
        "Reduzierte Energiekosten",
        "Normkonforme Rechtssicherheit",
        "Ein zentraler Ansprechpartner",
      ]}
      faqs={[
        {
          question: "Was beinhaltet ein professioneller Wartungsvertrag?",
          answer: "Ein Wartungsvertrag umfasst regelmäßige Inspektionen nach festgelegtem Turnus, präventive Wartungsarbeiten, Verschleißteilprüfung und -austausch, vollständige Dokumentation sowie priorisierte Störungsbeseitigung mit verkürzten Reaktionszeiten. Die genauen Leistungen werden individuell auf Ihre Anlagen abgestimmt.",
        },
        {
          question: "Wie oft sollten technische Anlagen gewartet werden?",
          answer: "Die Wartungsintervalle richten sich nach Anlagentyp, Nutzungsintensität und Herstellervorgaben. Heizungsanlagen sollten jährlich, Lüftungsanlagen quartalsweise und Aufzüge monatlich geprüft werden. Wir erstellen für jede Anlage einen individuellen Wartungsplan.",
        },
        {
          question: "Was ist der Unterschied zwischen Wartung und Instandhaltung?",
          answer: "Wartung umfasst regelmäßige Maßnahmen zur Erhaltung des Soll-Zustands (Reinigung, Schmierung, Einstellung). Instandhaltung ist der Oberbegriff nach DIN 31051 und umfasst zusätzlich Inspektion, Instandsetzung (Reparatur) und Verbesserung. Wir bieten das komplette Spektrum.",
        },
        {
          question: "Bieten Sie garantierte Reaktionszeiten (SLA) an?",
          answer: "Ja, wir bieten maßgeschneiderte Service Level Agreements mit garantierten Reaktionszeiten von 2 bis 24 Stunden, je nach Kritikalität der Anlage. Für kritische Infrastrukturen sind Notfall-SLAs mit Reaktionszeiten unter 2 Stunden möglich.",
        },
        {
          question: "Können Sie auch bundesweit tätig werden?",
          answer: "Ja, wir betreuen Kunden mit Standorten in ganz Deutschland. Für Immobilienportfolios und Filialisten bieten wir zentral koordinierte Wartungsverträge mit einheitlichen Standards und einem Ansprechpartner für alle Liegenschaften – von Berlin über Hamburg und Frankfurt bis München.",
        },
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik & DGUV V3", href: "/handwerk/elektrotechnik" },
        { label: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
        { label: "Wartung Berlin", href: "/standorte/berlin" },
        { label: "Wartung Frankfurt", href: "/standorte/frankfurt" },
        { label: "Wartung München", href: "/standorte/muenchen" },
      ]}
    />
  );
}
