import { ServicePageLayout } from "./ServicePageLayout";
import { Zap, FileCheck, Thermometer, Clock, Shield, FileText } from "lucide-react";
import elektrotechnikImage from "@/assets/elektrotechnik-schaltschrank-dguv-v3-pruefung.jpg";

export default function Elektrotechnik() {
  return (
    <ServicePageLayout
      title="Elektrotechnik & DGUV V3 Prüfung"
      subtitle="Industrieller Standard"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Rechtssichere Elektroprüfung nach DGUV Vorschrift 3 und zertifizierte Elektrotechnik für komplexe Immobilienportfolios. Maximale Haftungssicherheit nach DIN VDE."
      longDescription={`Die Verantwortung für elektrische Sicherheit in Gewerbe- und Industrieimmobilien ist eine der kritischsten Pflichten für Betreiber, Hausverwaltungen und Facility Manager. Als zertifizierter Elektrofachbetrieb mit Spezialisierung auf komplexe Immobilienportfolios eliminiert Mr. Clean Services systematisch alle Betriebsrisiken durch normkonforme Prüfzyklen und präventive Instandhaltungsstrategien. Unsere Leistungen sind auf die spezifischen Anforderungen von Logistikzentren, Industrieanlagen, Bürokomplexen und Wohnungsbaugesellschaften zugeschnitten.

Im Zentrum unserer Arbeit steht die lückenlose Einhaltung der Betriebssicherheitsverordnung (BetrSichV) sowie der Technischen Regeln für Betriebssicherheit (TRBS). Wir führen die gesetzlich vorgeschriebene DGUV V3 Prüfung für ortsveränderliche und ortsfeste Betriebsmittel durch – von der Kaffeemaschine bis zur Hochspannungsanlage. Jede Prüfung basiert auf einer individuellen Gefährdungsbeurteilung, die wir gemeinsam mit Ihnen erstellen und dokumentieren. Das Ergebnis: maximale Rechtssicherheit gegenüber Berufsgenossenschaften, Versicherungen und im Schadensfall vor Gericht.

Darüber hinaus bieten wir präventive Diagnostik durch industrielle Thermografie. Diese berührungslose Messtechnik identifiziert thermische Anomalien in Schaltschränken, Verteilungen und Kabeltrassen, bevor es zu Produktionsausfällen oder Bränden kommt. Für Kunden mit erhöhten Sicherheitsanforderungen erfüllen wir die strengen Kriterien der VdS-Konformität – ein Qualitätsmerkmal, das von führenden Sachversicherern anerkannt wird.

Unser digitales Prüfmanagement garantiert audit-sichere Dokumentation in Echtzeit. Alle Prüfprotokolle sind revisionssicher archiviert und jederzeit für interne Audits, ISO-Zertifizierungen oder Behördenanfragen abrufbar. Für Hausverwaltungen und Property Manager bieten wir skalierbare Rahmenverträge mit bundesweiter Abdeckung – von München über Frankfurt und Hamburg bis Berlin.

Als Teil unseres Handwerk-Leistungsspektrums arbeiten wir eng mit unseren Sanitär- und Wartungsteams zusammen. So erhalten Sie alle technischen Gewerke aus einer Hand – effizient koordiniert und mit einem zentralen Ansprechpartner.`}
      imageSrc={elektrotechnikImage}
      imageAlt="Elektrotechnik Schaltschrank mit Sicherungen für DGUV V3 Prüfung"
      keywords={["DGUV V3 Prüfung", "Elektroprüfung Gewerbe", "DIN VDE 0105-100", "Betriebssicherheitsverordnung", "Thermografie Elektro", "Elektrofachbetrieb Facility Management", "VdS Konformität", "Gefährdungsbeurteilung Elektro", "TRBS Prüfung"]}
      features={[
        "DGUV V3 Prüfung (ortsveränderlich & ortsfest)",
        "Wartung elektrischer Anlagen nach DIN VDE 0105-100",
        "Präventive Instandhaltung durch Thermografie",
        "Rechtssichere Dokumentation gemäß BetrSichV",
        "Messung und Prüfung von Schutzmaßnahmen",
        "24/7 Störungsmanagement & Entstörung",
        "Energetische Inspektion von Beleuchtungsanlagen",
        "Aufbau und Wartung von Ladeinfrastruktur (E-Mobilität)",
      ]}
      detailedFeatures={[
        {
          title: "Rechtssichere DGUV V3",
          description: "Wir übernehmen die Betreiberverantwortung. Unsere Prüfungen erfolgen strikt nach DGUV Vorschrift 3, um Ihren Versicherungsschutz und die Haftungsfreistellung der Geschäftsführung zu garantieren.",
          icon: FileCheck,
        },
        {
          title: "Industrielle Thermografie",
          description: "Berührungslose Fehlersuche mittels Infrarot. Wir detektieren thermische Anomalien in Verteilungen und Schaltschränken, bevor es zu kostspieligen Produktionsausfällen oder Bränden kommt.",
          icon: Thermometer,
        },
        {
          title: "Prüfung ortsfester Anlagen",
          description: "Umfassende Inspektion der gesamten Elektroinstallation nach DIN VDE 0105. Wir sichern die langfristige Funktionsfähigkeit Ihrer Gebäudeinfrastruktur.",
          icon: Zap,
        },
        {
          title: "Audit-Safe Reporting",
          description: "Digitale Prüfprotokolle in Echtzeit. Unsere Dokumentation ist revisionssicher und erfüllt die Anforderungen aller gängigen Zertifizierungen und Audits.",
          icon: FileText,
        },
        {
          title: "Haftungsschutz",
          description: "Wir minimieren Ihr persönliches Haftungsrisiko durch lückenlose Einhaltung der TRBS (Technische Regeln für Betriebssicherheit).",
          icon: Shield,
        },
        {
          title: "Schnelle Intervention",
          description: "Skalierbare Teams für Großobjekte. Wir führen Prüfungen und Reparaturen effizient und störungsfrei im laufenden Betrieb durch.",
          icon: Clock,
        },
      ]}
      benefits={[
        "Gerichtsfeste Rechtssicherheit",
        "Vermeidung von Brand- und Unfallrisiken",
        "Werterhaltung der technischen Infrastruktur",
        "Reduzierung von Stillstandszeiten",
        "Konformität mit Berufsgenossenschaften",
        "Skalierbare Lösungen für Standortnetze",
      ]}
      faqs={[
        {
          question: "Warum ist die DGUV V3 Prüfung für Unternehmen verpflichtend?",
          answer: "Die Prüfung ist durch die Berufsgenossenschaften und die Betriebssicherheitsverordnung (BetrSichV) vorgeschrieben. Sie dient dem Unfallschutz und ist im Schadensfall die einzige Absicherung gegen Regressforderungen der Versicherungen.",
        },
        {
          question: "In welchen Zyklen müssen elektrische Anlagen geprüft werden?",
          answer: "Die Fristen werden mittels Gefährdungsbeurteilung ermittelt. In der Regel gelten für ortsveränderliche Geräte 6-24 Monate und für ortsfeste Anlagen 48 Monate, je nach Gefährdungspotenzial der Umgebung.",
        },
        {
          question: "Was unterscheidet die Thermografie von der Standardprüfung?",
          answer: "Die Thermografie erkennt Belastungszustände und Übergangswiderstände visuell, die bei einer reinen Messung oft unentdeckt bleiben. Sie ist das effektivste Werkzeug zur Brandprävention.",
        },
        {
          question: "Wie wird die Dokumentation bereitgestellt?",
          answer: "Sie erhalten alle Prüfprotokolle in digitaler Form. Diese enthalten Einzelauflistungen jedes geprüften Betriebsmittels inklusive Inventarnummer, Messergebnissen und dem Status (Bestanden/Nicht Bestanden).",
        },
        {
          question: "Bieten Sie DGUV V3 Prüfungen bundesweit an?",
          answer: "Ja, wir sind deutschlandweit aktiv. Unsere Teams sind in allen Metropolregionen wie Berlin, Hamburg, München, Frankfurt und dem gesamten Bundesgebiet einsatzbereit. Für Immobilienportfolios bieten wir zentral koordinierte Rahmenverträge.",
        },
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik Berlin", href: "/standorte/berlin" },
        { label: "Elektrotechnik Hamburg", href: "/standorte/hamburg" },
        { label: "Elektrotechnik München", href: "/standorte/muenchen" },
      ]}
    />
  );
}
