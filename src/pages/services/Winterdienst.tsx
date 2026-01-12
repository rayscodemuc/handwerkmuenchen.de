import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, AlertTriangle } from "lucide-react";

export default function Winterdienst() {
  return (
    <BlogServicePageLayout
      title="Winterdienst"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Winterdienst mit 100% Haftungsübernahme. Schneeräumung und Streudienst."
      intro="Eis und Schnee stellen ein erhebliches Haftungsrisiko dar. Mit unserem Winterdienst übertragen Sie die Verkehrssicherungspflicht vollständig an uns – rechtssicher dokumentiert."
      sections={[
        { title: "Vollständige Haftungsübernahme", content: "Bei einem Unfall durch Glätte haften wir, nicht Sie. Dies ist vertraglich und versicherungstechnisch abgesichert." },
        { title: "GPS-dokumentierte Einsätze", content: "Jeder Einsatz wird mit Zeitstempel, GPS-Daten und Fotos dokumentiert – für maximale Rechtssicherheit." },
      ]}
      highlightBox={{ icon: Shield, title: "Rechtssicherheit", text: "Unsere Dokumentation ist gerichtsfest und schützt Sie vor Haftungsansprüchen." }}
      stats={[{ value: "100%", label: "Haftungsübernahme" }, { value: "24/7", label: "Bereitschaft" }, { value: "GPS", label: "Dokumentiert" }]}
      services={[
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Verkehrssicherungspflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr, auch an Feiertagen.", icon: Clock },
        { title: "Wetterüberwachung", description: "Proaktive Einsätze bei Glättegefahr.", icon: Snowflake },
        { title: "Moderne Ausrüstung", description: "Effiziente Räumfahrzeuge.", icon: Truck },
        { title: "Dokumentation", description: "GPS, Zeitstempel und Fotos.", icon: FileText },
        { title: "Prävention", description: "Vorausschauendes Streuen.", icon: AlertTriangle },
      ]}
      faqs={[
        { question: "Was bedeutet Haftungsübernahme?", answer: "Bei einem Unfall durch Glätte haften wir, nicht Sie. Vertraglich und versicherungstechnisch abgesichert." },
        { question: "Ab wann wird geräumt?", answer: "Gehwege sind werktags ab 7 Uhr, an Sonn-/Feiertagen ab 9 Uhr sicher begehbar." },
      ]}
      relatedLinks={[
        { label: "Facility Management", href: "/facility-management" },
        { label: "Winterdienst Außen", href: "/aussenanlagen/winterdienst" },
        { label: "Hamburg", href: "/standorte/hamburg" },
      ]}
      keywords={["Winterdienst", "Schneeräumung", "Streudienst", "Haftungsübernahme"]}
    />
  );
}
