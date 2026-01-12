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
      longDescription="Sicherheit in der Elektrotechnik ist eine Frage der Haftung. Als zertifizierter Fachbetrieb für Gebäudetechnik eliminieren wir Betriebsrisiken durch systematische Prüfzyklen und präventive Instandhaltung. Wir decken das gesamte Spektrum ab: von der gesetzlich geforderten DGUV V3 Prüfung ortsveränderlicher Geräte bis hin zur thermografischen Analyse hochkomplexer Industrieanlagen. Unsere Prozesse sind auf die Betriebssicherheitsverordnung (BetrSichV) optimiert und garantieren eine gerichtsfeste Dokumentation für Versicherungen und Berufsgenossenschaften."
      imageSrc={elektrotechnikImage}
      imageAlt="Elektrotechnik Schaltschrank mit Sicherungen für DGUV V3 Prüfung"
      keywords={["DGUV V3 Prüfung", "Elektroprüfung Gewerbe", "DIN VDE 0105-100", "Betriebssicherheitsverordnung", "Thermografie Elektro", "Elektrofachbetrieb Facility Management"]}
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
      ]}
    />
  );
}