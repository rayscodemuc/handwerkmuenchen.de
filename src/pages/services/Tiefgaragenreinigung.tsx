import { ServicePageLayout } from "./ServicePageLayout";
import { Car, Droplets, Trash2, Paintbrush, ArrowDown, Eye, Wrench, Shield } from "lucide-react";

export default function Tiefgaragenreinigung() {
  return (
    <ServicePageLayout
      title="Tiefgaragenreinigung"
      subtitle="Reinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Tiefgaragenreinigung für gepflegte und sichere Parkflächen. Entfernung von Reifenabrieb, Ölflecken und Verschmutzungen mit modernster Technik."
      longDescription="Tiefgaragen sind besonderen Belastungen ausgesetzt: Reifenabrieb, Ölflecken, Staub und Schmutz setzen den Böden zu. Unsere professionelle Tiefgaragenreinigung sorgt nicht nur für ein gepflegtes Erscheinungsbild, sondern erhöht auch die Sicherheit durch verbesserte Sichtbarkeit von Markierungen und reduzierte Rutschgefahr. Wir reinigen Parkhäuser, Tiefgaragen und Stellplatzanlagen für Wohnanlagen, Gewerbeobjekte und öffentliche Einrichtungen."
      imageAlt="Maschinelle Tiefgaragenreinigung mit Scheuersaugmaschine"
      keywords={["Tiefgaragenreinigung", "Parkhaus reinigen", "Garagenreinigung", "Ölfleckentfernung", "Reifenabrieb entfernen", "Entwässerungsrinnen reinigen"]}
      features={[
        "Maschinelle Bodenreinigung mit Scheuersaugmaschinen",
        "Reifenabrieb-Entfernung mit Spezialverfahren",
        "Professionelle Ölfleckentfernung",
        "Reinigung von Zu- und Abfahrtsrampen",
        "Entwässerungsrinnen und Abläufe säubern",
        "Wandreinigung und Graffiti-Beseitigung",
        "Beschilderung und Markierungen reinigen",
        "Wartung von Garagentechnik (Tore, Lüftung)",
      ]}
      detailedFeatures={[
        { title: "Maschinelle Reinigung", description: "Großflächenreinigung mit industriellen Scheuersaugmaschinen für maximale Effizienz.", icon: Car },
        { title: "Ölfleckentfernung", description: "Spezialbehandlung für hartnäckige Öl-, Kraftstoff- und Hydraulikflecken.", icon: Droplets },
        { title: "Reifenabrieb entfernen", description: "Professionelle Entfernung von schwarzen Reifenspuren auf Beton und Beschichtungen.", icon: Shield },
        { title: "Rinnenreinigung", description: "Freimachen aller Entwässerungsrinnen und Bodenabläufe für optimalen Wasserablauf.", icon: ArrowDown },
        { title: "Graffiti-Entfernung", description: "Professionelle Beseitigung von Wandschmierereien und Vandalismus.", icon: Paintbrush },
        { title: "Müll & Unrat", description: "Entfernung von Abfall, Laub und anderen Verschmutzungen.", icon: Trash2 },
        { title: "Technik-Wartung", description: "Prüfung und Wartung von Garagentoren, Lüftungsanlagen und Beleuchtung.", icon: Wrench },
        { title: "Dokumentation", description: "Fotodokumentation vor und nach der Reinigung für Ihre Unterlagen.", icon: Eye },
      ]}
      benefits={[
        "Saubere & gepflegte Parkflächen",
        "Erhöhte Sicherheit & Sichtbarkeit",
        "Werterhaltung der Immobilie",
        "Moderne Reinigungstechnik",
        "Flexible Terminplanung",
        "Reinigung nachts möglich",
        "Umweltfreundliche Reinigungsmittel",
        "Festpreisgarantie",
      ]}
      faqs={[
        { question: "Wann wird die Tiefgarage gereinigt?", answer: "Die Reinigung erfolgt vorzugsweise nachts oder am Wochenende bei geringer Fahrzeugbelegung, um den laufenden Betrieb nicht zu stören. Die genauen Zeiten stimmen wir individuell mit Ihnen ab." },
        { question: "Wie oft sollte eine Tiefgarage gereinigt werden?", answer: "Wir empfehlen 2-4 Grundreinigungen pro Jahr, abhängig von der Nutzungsintensität. Bei stark frequentierten Parkhäusern kann eine häufigere Reinigung sinnvoll sein." },
        { question: "Können hartnäckige Ölflecken entfernt werden?", answer: "Ja, mit unseren Spezialverfahren entfernen wir auch eingetrocknete Öl- und Kraftstoffflecken. Bei sehr alten Flecken kann eine Mehrfachbehandlung notwendig sein." },
        { question: "Was kostet eine Tiefgaragenreinigung?", answer: "Der Preis richtet sich nach der Größe (Stellplatzanzahl), dem Verschmutzungsgrad und den gewünschten Leistungen. Nutzen Sie unseren Rechner für eine erste Orientierung oder fordern Sie ein individuelles Angebot an." },
      ]}
    />
  );
}
