import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, Car } from "lucide-react";

export default function WinterdienstAussen() {
  return (
    <BlogServicePageLayout
      title="Winterdienst"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Winterdienst für Außenanlagen mit vollständiger Haftungsübernahme. Schneeräumung und Streudienst."
      intro="Sichere Gehwege und Parkplätze im Winter sind Pflicht. Wir übernehmen die Verkehrssicherungspflicht und dokumentieren jeden Einsatz GPS-gestützt."
      sections={[
        { title: "Große Flächen effizient räumen", content: "Mit modernen Räum- und Streufahrzeugen räumen wir auch große Parkplätze und Zufahrten schnell und gründlich." },
        { title: "Umweltschonende Streumittel", content: "Wir setzen auf umweltfreundliches Streugut, das effektiv gegen Glätte wirkt und Boden sowie Vegetation schont." },
      ]}
      highlightBox={{ icon: Shield, title: "Haftungsübernahme", text: "Vollständige Übernahme der Verkehrssicherungspflicht – rechtssicher dokumentiert." }}
      stats={[{ value: "100%", label: "Haftungsübernahme" }, { value: "24/7", label: "Bereitschaft" }, { value: "GPS", label: "Dokumentiert" }]}
      services={[
        { title: "Schneeräumung", description: "Professionelle Räumung aller Flächen.", icon: Snowflake },
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Pflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr einsatzbereit.", icon: Clock },
        { title: "Dokumentation", description: "GPS-gestützte Nachweise.", icon: FileText },
        { title: "Fahrzeuge", description: "Moderne Räum- und Streufahrzeuge.", icon: Truck },
        { title: "Parkplätze", description: "Spezielle Räumung großer Flächen.", icon: Car },
      ]}
      faqs={[
        { question: "Werden auch Parkplätze geräumt?", answer: "Ja, wir räumen alle Verkehrsflächen inklusive Parkplätze und Zufahrten." },
        { question: "Wie schnell sind Sie vor Ort?", answer: "Bei Schneefall beginnen wir rechtzeitig, damit Flächen pünktlich sicher sind." },
      ]}
      relatedLinks={[
        { label: "Alle Außenanlagen-Leistungen", href: "/aussenanlagen" },
        { label: "Winterdienst FM", href: "/facility-management/winterdienst" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Winterdienst", "Schneeräumung", "Parkplatzräumung", "Streudienst"]}
    />
  );
}
