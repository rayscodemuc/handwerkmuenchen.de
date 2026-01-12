import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Snowflake, Shield, Clock, FileText, Truck, AlertTriangle, CheckCircle, MapPin } from "lucide-react";

export default function Winterdienst() {
  return (
    <BlogServicePageLayout
      title="Winterdienst"
      subtitle="100% Haftungsübernahme & GPS-Dokumentation"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Winterdienst mit vollständiger Haftungsübernahme. Schneeräumung und Streudienst mit GPS-dokumentierten Einsätzen."
      intro="Eis und Schnee stellen ein erhebliches Haftungsrisiko dar. Als Eigentümer oder Verwalter haften Sie persönlich für Unfälle auf Ihrem Grundstück. Mit unserem Winterdienst übertragen Sie die Verkehrssicherungspflicht vollständig an uns – vertraglich und versicherungstechnisch abgesichert, GPS-dokumentiert und gerichtsfest."
      imageSrc=""
      imageAlt="Professioneller Winterdienst mit Räumfahrzeug"
      imageCaption="GPS-dokumentierte Einsätze für 100% Rechtssicherheit"
      sections={[
        { title: "Vollständige Haftungsübernahme", content: "Bei einem Unfall durch Glätte auf Ihren Flächen haften wir, nicht Sie. Dies ist vertraglich fixiert und durch unsere Betriebshaftpflicht bis 10 Mio. € abgesichert." },
        { title: "GPS-dokumentierte Einsätze", content: "Jeder Einsatz wird mit GPS-Koordinaten, Zeitstempel und Fotos dokumentiert. Im Streitfall ist der Nachweis gerichtsfest – Sie sind auf der sicheren Seite." },
        { title: "Proaktive Wetterüberwachung", content: "Wir warten nicht auf Ihren Anruf. Durch kontinuierliche Wetterüberwachung beginnen wir rechtzeitig mit präventivem Streuen und räumen vor der Betriebszeit." }
      ]}
      highlightBox={{ icon: Shield, title: "Gerichtsfeste Dokumentation", text: "GPS-Koordinaten, Zeitstempel und Fotos jedes Einsatzes. Im Streitfall der entscheidende Beweis für die Erfüllung Ihrer Räum- und Streupflicht." }}
      stats={[{ value: "100%", label: "Haftungsübernahme" }, { value: "24/7", label: "Bereitschaft" }, { value: "GPS", label: "Dokumentiert" }]}
      services={[
        { title: "Haftungsübernahme", description: "Vollständige Übernahme der Verkehrssicherungspflicht.", icon: Shield },
        { title: "24/7 Bereitschaft", description: "Rund um die Uhr, auch an Feiertagen.", icon: Clock },
        { title: "Wetterüberwachung", description: "Proaktive Einsätze bei Glättegefahr.", icon: Snowflake },
        { title: "Moderne Ausrüstung", description: "Effiziente Räum- und Streufahrzeuge.", icon: Truck },
        { title: "GPS-Dokumentation", description: "Gerichtsfeste Nachweise jedes Einsatzes.", icon: FileText },
        { title: "Präventives Streuen", description: "Vorausschauend vor Glatteisbildung.", icon: AlertTriangle }
      ]}
      quote="Für Portfolios mit vielen Standorten bieten wir bundesweite Betreuung mit einheitlichen Standards und konsolidiertem Reporting."
      faqs={[
        { question: "Was bedeutet Haftungsübernahme konkret?", answer: "Bei einem Glätteunfall auf Ihren Flächen haften wir, nicht Sie. Vertraglich fixiert, versichert bis 10 Mio. €." },
        { question: "Ab wann sind Flächen geräumt?", answer: "Gehwege werktags ab 7 Uhr, Sonn-/Feiertage ab 9 Uhr. Betriebsflächen nach Vereinbarung auch früher." },
        { question: "Welche Streumittel werden verwendet?", answer: "Umweltschonendes Streugut nach Abstimmung. Auf Wunsch salzfreie Alternativen." }
      ]}
      relatedLinks={[
        { label: "Facility Management", href: "/facility-management" },
        { label: "Winterdienst Außen", href: "/aussenanlagen/winterdienst" },
        { label: "Hamburg", href: "/standorte/hamburg" }
      ]}
      keywords={["Winterdienst Gewerbe", "Schneeräumung", "Streudienst", "Haftungsübernahme", "GPS Winterdienst"]}
      trustBadges={[{ icon: Shield, label: "Haftungsübernahme" }, { icon: Clock, label: "24/7 Bereitschaft" }, { icon: MapPin, label: "GPS-dokumentiert" }]}
    />
  );
}
