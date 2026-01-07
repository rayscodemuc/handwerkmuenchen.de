import { ServicePageLayout } from "./ServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, Car } from "lucide-react";

export default function WinterdienstAussen() {
  return (
    <ServicePageLayout
      title="Winterdienst"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professioneller Winterdienst für Außenanlagen in Berlin. Schneeräumung und Streudienst mit vollständiger Haftungsübernahme."
      longDescription="Sichere Gehwege und Parkplätze im Winter sind Pflicht. Wir übernehmen die Verkehrssicherungspflicht und dokumentieren jeden Einsatz."
      imageAlt="Schneeräumung und Streudienst für sichere Außenanlagen im Winter"
      keywords={["Winterdienst Außenanlagen", "Schneeräumung Berlin", "Streudienst Parkplatz", "Räumpflicht"]}
      features={[
        "Schneeräumung auf allen Verkehrsflächen",
        "Streudienst mit umweltfreundlichen Mitteln",
        "24/7 Bereitschaft bei Schneefall",
        "GPS-dokumentierte Einsätze",
        "Räumung von Parkplätzen und Zufahrten",
        "Haftungsübernahme für Verkehrssicherungspflicht",
      ]}
      detailedFeatures={[
        { title: "Schneeräumung", description: "Professionelle Räumung aller Verkehrsflächen.", icon: Snowflake },
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Verkehrssicherungspflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr einsatzbereit, auch an Feiertagen.", icon: Clock },
        { title: "Dokumentation", description: "GPS-gestützte Dokumentation aller Einsätze.", icon: FileText },
        { title: "Fahrzeuge", description: "Moderne Räum- und Streufahrzeuge für große Flächen.", icon: Truck },
        { title: "Parkplätze", description: "Spezielle Räumung von Parkflächen und Zufahrten.", icon: Car },
      ]}
      benefits={["Haftungsübernahme", "Dokumentierte Einsätze", "24/7 Bereitschaft", "Große Flächen", "Umweltfreundlich", "Zuverlässig"]}
      faqs={[
        { question: "Werden auch Parkplätze geräumt?", answer: "Ja, wir räumen alle Verkehrsflächen inklusive Parkplätze und Zufahrten." },
        { question: "Wie schnell sind Sie vor Ort?", answer: "Bei Schneefall beginnen wir rechtzeitig, damit Flächen pünktlich sicher sind." },
      ]}
    />
  );
}
