import { ServicePageLayout } from "./ServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, AlertTriangle } from "lucide-react";

export default function Winterdienst() {
  return (
    <ServicePageLayout
      title="Winterdienst"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Winterdienst mit 100% Haftungsübernahme. Schneeräumung und Streudienst für Gewerbe- und Wohnimmobilien in Berlin."
      longDescription="Eis und Schnee stellen ein erhebliches Haftungsrisiko dar. Mit unserem Winterdienst übertragen Sie die Verkehrssicherungspflicht vollständig an uns."
      imageAlt="Winterdienst und Schneeräumung für Gewerbeimmobilien"
      keywords={["Winterdienst Berlin", "Schneeräumung Gewerbe", "Streudienst", "Räumpflicht"]}
      features={[
        "100% Haftungsübernahme für Verkehrssicherungspflicht",
        "24/7 Bereitschaft während der Wintersaison",
        "Schneeräumung mit modernem Gerät",
        "Umweltschonendes Streugut",
        "GPS-dokumentierte Einsätze",
        "Betreuung von Gehwegen, Parkplätzen und Zufahrten",
      ]}
      detailedFeatures={[
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Verkehrssicherungspflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr einsatzbereit, auch an Feiertagen.", icon: Clock },
        { title: "Wetterüberwachung", description: "Professionelles Monitoring für proaktive Einsätze.", icon: Snowflake },
        { title: "Moderne Ausrüstung", description: "Neueste Technik für effiziente Räumung.", icon: Truck },
        { title: "Dokumentation", description: "GPS-Daten, Zeitstempel und Fotos für jeden Einsatz.", icon: FileText },
        { title: "Prävention", description: "Vorausschauendes Streuen bei Glättegefahr.", icon: AlertTriangle },
      ]}
      benefits={["Vollständige Haftungsübernahme", "Rechtssicherheit", "Keine Personalkosten", "Professionelle Ausrüstung", "Zuverlässigkeit", "Feste Pauschalpreise"]}
      faqs={[
        { question: "Was bedeutet Haftungsübernahme?", answer: "Bei einem Unfall durch Glätte haften wir, nicht Sie. Dies ist vertraglich und versicherungstechnisch abgesichert." },
        { question: "Ab wann wird geräumt?", answer: "Gehwege sind werktags ab 7 Uhr und an Sonn-/Feiertagen ab 9 Uhr sicher begehbar." },
      ]}
    />
  );
}
