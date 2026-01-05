import { ServicePageLayout } from "./ServicePageLayout";
import { Zap, FileCheck, Thermometer, Clock, Shield, FileText } from "lucide-react";

export default function Elektrotechnik() {
  return (
    <ServicePageLayout
      title="Elektrotechnik"
      subtitle="Handwerk"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Rechtssichere Elektroprüfungen nach DGUV V3 und umfassende elektrotechnische Dienstleistungen für Gewerbe- und Wohnimmobilien in Berlin und Brandenburg."
      longDescription="Als zertifizierter Elektrofachbetrieb bieten wir Ihnen das komplette Spektrum elektrotechnischer Dienstleistungen. Von der gesetzlich vorgeschriebenen DGUV V3 Prüfung bis zur kompletten Elektroinstallation – unsere qualifizierten Elektriker sorgen für Sicherheit, Effizienz und Zuverlässigkeit in Ihren Objekten. Wir arbeiten nach den neuesten VDE-Normen und garantieren eine lückenlose Dokumentation aller Arbeiten."
      keywords={["DGUV V3 Prüfung", "E-Check Berlin", "Elektroprüfung Gewerbe", "Thermografie", "Elektrofachbetrieb"]}
      features={[
        "DGUV V3 Prüfungen für ortsveränderliche Geräte",
        "Prüfung ortsfester elektrischer Anlagen nach DIN VDE 0105",
        "E-Check für Gewerbeobjekte und Wohnanlagen",
        "Thermografie zur präventiven Fehleranalyse",
        "Lückenlose Dokumentation und digitale Prüfprotokolle",
        "24/7 Notdienst bei elektrischen Störungen",
        "Energieeffizienz-Beratung und LED-Umrüstung",
        "Installation von Ladestationen für E-Mobilität",
      ]}
      detailedFeatures={[
        {
          title: "DGUV V3 Prüfung",
          description: "Gesetzlich vorgeschriebene Prüfung aller elektrischen Betriebsmittel nach DGUV Vorschrift 3. Wir prüfen ortsveränderliche und ortsfeste Geräte gemäß den Unfallverhütungsvorschriften.",
          icon: FileCheck,
        },
        {
          title: "Thermografie-Analyse",
          description: "Moderne Wärmebildtechnik zur frühzeitigen Erkennung von Überlastungen, losen Verbindungen und potenziellen Brandherden in elektrischen Anlagen.",
          icon: Thermometer,
        },
        {
          title: "24/7 Notdienst",
          description: "Elektrische Störungen können jederzeit auftreten. Unser Notdienst ist rund um die Uhr erreichbar und innerhalb kürzester Zeit vor Ort.",
          icon: Clock,
        },
        {
          title: "Blitzschutz & Überspannungsschutz",
          description: "Installation und Wartung von Blitzschutzanlagen sowie Überspannungsschutz für sensible elektronische Geräte und Anlagen.",
          icon: Zap,
        },
        {
          title: "Sicherheitsprüfungen",
          description: "Regelmäßige Überprüfung von Sicherungsanlagen, FI-Schaltern und Notbeleuchtung gemäß geltenden Vorschriften.",
          icon: Shield,
        },
        {
          title: "Digitale Dokumentation",
          description: "Alle Prüfungen werden digital dokumentiert. Sie erhalten Zugang zu Ihren Prüfprotokollen und werden automatisch an Folgetermine erinnert.",
          icon: FileText,
        },
      ]}
      benefits={[
        "Rechtssicherheit durch normgerechte Prüfungen",
        "Minimierung von Ausfallzeiten",
        "Reduzierung von Versicherungsrisiken",
        "Energiekosteneinsparung",
        "Wertsteigerung Ihrer Immobilie",
        "Schnelle Reaktionszeiten",
      ]}
      faqs={[
        {
          question: "Wie oft muss eine DGUV V3 Prüfung durchgeführt werden?",
          answer: "Die Prüffristen hängen von der Art des Geräts und den Einsatzbedingungen ab. Ortsveränderliche Geräte in Büros müssen in der Regel alle 24 Monate geprüft werden, bei erhöhter Beanspruchung (z.B. auf Baustellen) alle 6 Monate. Ortsfeste Anlagen werden alle 4 Jahre geprüft.",
        },
        {
          question: "Was kostet eine Elektroprüfung?",
          answer: "Die Kosten richten sich nach der Anzahl der zu prüfenden Geräte und Anlagen. Wir erstellen Ihnen gerne ein individuelles Angebot. Bei regelmäßigen Prüfungen bieten wir attraktive Rahmenvertragskonditionen an.",
        },
        {
          question: "Können die Prüfungen auch außerhalb der Geschäftszeiten erfolgen?",
          answer: "Ja, wir passen uns Ihren betrieblichen Abläufen an. Prüfungen können auch am Wochenende oder nachts durchgeführt werden, um Ihren Betrieb nicht zu stören.",
        },
        {
          question: "Was passiert, wenn Mängel festgestellt werden?",
          answer: "Festgestellte Mängel werden dokumentiert und nach Schweregrad klassifiziert. Kleinere Mängel können oft sofort behoben werden. Bei größeren Mängeln erhalten Sie einen detaillierten Maßnahmenplan mit Prioritäten und Kostenvoranschlag.",
        },
      ]}
    />
  );
}
