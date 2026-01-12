import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, Car, CheckCircle, MapPin } from "lucide-react";

export default function WinterdienstAussen() {
  return (
    <BlogServicePageLayout
      title="Winterdienst"
      subtitle="Großflächenräumung & Parkplatz-Winterdienst"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Winterdienst für große Außenflächen mit vollständiger Haftungsübernahme. Parkplatzräumung und Streudienst mit GPS-Dokumentation."
      intro="Große Parkplätze, Logistikflächen und Betriebsgelände erfordern leistungsstarke Räumtechnik und zuverlässige Organisation. Wir übernehmen die Verkehrssicherungspflicht für Ihre Großflächen – mit modernen Räumfahrzeugen, GPS-Dokumentation und garantierten Räumzeiten."
      imageSrc=""
      imageAlt="Großflächenräumung mit professionellem Räumfahrzeug"
      imageCaption="Effiziente Parkplatzräumung für Logistik und Gewerbe"
      sections={[
        { title: "Großflächen effizient räumen", content: "Mit Räumfahrzeugen und Aufsitzstreuern räumen wir auch große Parkplätze, Logistikflächen und Zufahrten schnell und gründlich. Mehrere Einsatzteams garantieren pünktliche Fertigstellung." },
        { title: "Umweltschonende Streumittel", content: "Wir setzen auf umweltfreundliches Streugut, das effektiv gegen Glätte wirkt und Boden, Vegetation und Fahrzeuge schont. Auf Wunsch salzfreie Alternativen." },
        { title: "Vollständige Haftungsübernahme", content: "Die Verkehrssicherungspflicht wird vertraglich auf uns übertragen. Bei Glätteunfällen haften wir, nicht Sie – versichert bis 10 Mio. €." }
      ]}
      highlightBox={{ icon: Shield, title: "Haftungsübernahme inklusive", text: "Vollständige Übernahme der Verkehrssicherungspflicht. GPS-dokumentiert und versichert – Sie sind zu 100 % abgesichert." }}
      stats={[{ value: "100%", label: "Haftungsübernahme" }, { value: "24/7", label: "Bereitschaft" }, { value: "GPS", label: "Dokumentiert" }]}
      services={[
        { title: "Schneeräumung", description: "Professionelle Räumung aller Flächen.", icon: Snowflake },
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Pflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr einsatzbereit.", icon: Clock },
        { title: "GPS-Dokumentation", description: "Gerichtsfeste Nachweise.", icon: FileText },
        { title: "Räumfahrzeuge", description: "Moderne Großflächentechnik.", icon: Truck },
        { title: "Parkplätze", description: "Spezielle Räumung großer Flächen.", icon: Car }
      ]}
      faqs={[
        { question: "Werden auch Parkplätze geräumt?", answer: "Ja, wir räumen alle Verkehrsflächen inklusive Parkplätze und Zufahrten mit Großflächentechnik." },
        { question: "Wie schnell sind Flächen geräumt?", answer: "Betriebsflächen sind vor Arbeitsbeginn fertig. Räumzeiten werden vertraglich garantiert." }
      ]}
      relatedLinks={[
        { label: "Außenanlagen", href: "/aussenanlagen" },
        { label: "Winterdienst FM", href: "/facility-management/winterdienst" },
        { label: "Grauflächenreinigung", href: "/aussenanlagen/grauflaechenreinigung" }
      ]}
      keywords={["Winterdienst Parkplatz", "Großflächenräumung", "Parkplatzräumung", "Streudienst Gewerbe"]}
      trustBadges={[{ icon: Shield, label: "Haftungsübernahme" }, { icon: Clock, label: "24/7 Bereitschaft" }, { icon: MapPin, label: "GPS-dokumentiert" }]}
    />
  );
}
