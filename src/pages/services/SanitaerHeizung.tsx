import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Droplets, Gauge, ShieldCheck, Activity, Thermometer, Clock, FileText, AlertTriangle } from "lucide-react";

export default function SanitaerHeizung() {
  return (
    <BlogServicePageLayout
      title="Sanitär- & Heizungstechnik"
      subtitle="Versorgungssicherheit & Asset-Schutz"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Zertifizierte Wartung und Instandhaltung technischer Gebäudeanlagen. Wir schützen Ihre Assets gegen Systemausfälle und Wasserschäden."
      intro="Sanitär- und Heizungsanlagen sind die kritische Infrastruktur jeder Gewerbeimmobilie. Ein ungeplanter Ausfall bedeutet nicht nur Komfortverlust – er gefährdet Geschäftsprozesse, verursacht Wasserschäden in Millionenhöhe und zieht bei Verstößen gegen die Trinkwasserverordnung 2024 empfindliche Bußgelder nach sich. Als zertifizierter SHK-Fachbetrieb mit bundesweiter Präsenz übernehmen wir die vollständige Betreiberverantwortung für Ihre haustechnischen Anlagen."
      imageSrc=""
      imageAlt="Heizungsanlage mit Rohrleitungen und Armaturen für gewerbliche SHK-Wartung nach TrinkwV"
      imageCaption="Professionelle Heizungswartung Gewerbe nach DVGW und EnEV-Standard"
      sections={[
        {
          title: "Versorgungssicherheit als strategischer Imperativ",
          content: "Die Heizungswartung Gewerbe unterscheidet sich fundamental von privaten Installationen. Komplexe Heizkreise, Großkessel und Fernwärmeübergabestationen erfordern spezialisiertes Know-how und präventive Wartungsstrategien. Unser Ansatz: Wir identifizieren Schwachstellen, bevor sie zu Ausfällen führen. Durch sensorbasiertes Leckage-Management und regelmäßige Druckprüfungen nach DIN EN 1717 minimieren wir das Risiko von Wasserschäden und sichern die Verfügbarkeit Ihrer Anlagen zu 99,5 %."
        },
        {
          title: "TrinkwV-Konformität und Legionellenprävention",
          content: "Die Trinkwasserverordnung 2024 verschärft die Pflichten für Betreiber erheblich. Legionellenprüfungen in festgelegten Intervallen, die Dokumentation von Warmwassertemperaturen und die Gefährdungsanalyse bei Grenzwertüberschreitungen sind keine Option – sie sind Gesetz. Wir führen akkreditierte Probenahmen durch, erstellen gerichtsfeste Dokumentationen und setzen bei positivem Befund sofort thermische oder chemische Desinfektionsmaßnahmen um. Die Haftungsfreistellung unserer Kunden hat höchste Priorität."
        },
        {
          title: "Asset-Schutz durch Präventiv-Wartung",
          content: "Wasserschäden zählen zu den häufigsten und teuersten Schadensarten in der Immobilienwirtschaft. Unsere Präventiv-Wartung nach DIN 31051 umfasst den hydraulischen Abgleich zur Energieoptimierung, die Inspektion von Rohrverbindungen und Absperrarmaturen sowie die vorausschauende Erneuerung von Verschleißteilen. Das Ergebnis: Werterhalt Ihrer Immobilienportfolios, planbare Instandhaltungsbudgets und die Vermeidung von Notfällen, die Ihr Tagesgeschäft lahmlegen."
        }
      ]}
      highlightBox={{
        icon: ShieldCheck,
        title: "Gerichtsfeste Rechtssicherheit",
        text: "Jede Wartung, Prüfung und Maßnahme wird revisionssicher dokumentiert. Im Schadensfall weisen Sie gegenüber Versicherungen und Behörden die Erfüllung Ihrer Betreiberpflichten lückenlos nach."
      }}
      stats={[
        { value: "< 60", label: "Minuten Reaktion" },
        { value: "99,5%", label: "Anlagenverfügbarkeit" },
        { value: "24/7", label: "Havarie-Hotline" }
      ]}
      services={[
        { title: "Heizungswartung Gewerbe", description: "Jährliche Wartung nach Herstellervorgaben inkl. Abgasmessung und Brennereinstellung.", icon: Thermometer },
        { title: "Legionellenprüfung", description: "Akkreditierte Probenahme nach TrinkwV 2024 mit Laboranalyse und Maßnahmenempfehlung.", icon: Droplets },
        { title: "Hydraulischer Abgleich", description: "Optimierung der Wärmeverteilung für bis zu 30 % Energieeinsparung.", icon: Gauge },
        { title: "Leckage-Prävention", description: "Sensorbasiertes Monitoring und Druckprüfungen zur Früherkennung.", icon: Activity },
        { title: "SHK Notdienst B2B", description: "Havarie-Management mit garantierten Reaktionszeiten unter 60 Minuten.", icon: AlertTriangle },
        { title: "Revisionssichere Dokumentation", description: "Digitale Protokolle für Audits, Versicherungen und Behörden.", icon: FileText }
      ]}
      quote="Für Hausverwaltungen und Property Manager mit verteilten Portfolios bieten wir Rahmenverträge mit einheitlichen SLAs, zentralem Reporting und einem Ansprechpartner für alle Standorte."
      faqs={[
        { 
          question: "Wer haftet bei einem Legionellenbefund?", 
          answer: "Der Betreiber – also Eigentümer oder beauftragte Verwaltung. Ohne dokumentierte Prüfungen und Maßnahmen drohen Bußgelder bis 25.000 € und persönliche Haftung. Unsere lückenlose Dokumentation stellt Ihre Haftungsfreistellung sicher." 
        },
        { 
          question: "Wie hoch ist das Einsparpotenzial durch Effizienz-Audits?", 
          answer: "Durch hydraulischen Abgleich, Pumpentausch und optimierte Regelung erreichen wir typischerweise 15-30 % Energieeinsparung. Bei größeren Anlagen amortisiert sich die Investition innerhalb von 1-2 Heizperioden." 
        },
        { 
          question: "Wie schnell sind Sie bei einer Havarie vor Ort?", 
          answer: "Unser SHK Notdienst B2B garantiert Reaktionszeiten unter 60 Minuten in Ballungsräumen. Nachts und am Wochenende stehen permanente Bereitschaftsteams zur Verfügung." 
        },
        { 
          question: "Können Sie mehrere Standorte bundesweit betreuen?", 
          answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Sie erhalten einheitliche Prozesse, konsolidiertes Reporting und einen festen Ansprechpartner." 
        },
        { 
          question: "Was unterscheidet Ihre Wartung von günstigeren Anbietern?", 
          answer: "Wir dokumentieren gerichtsfest, setzen zertifizierte Techniker ein und übernehmen die volle Gewährleistung. Im Schadensfall sparen Sie sich den Streit mit Versicherung und Handwerker – das ist die eigentliche Kostenersparnis." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik & DGUV V3", href: "/handwerk/elektrotechnik" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Hamburg", href: "/standorte/hamburg" }
      ]}
      keywords={[
        "Heizungswartung Gewerbe",
        "Trinkwasserverordnung 2024",
        "Legionellenprüfung",
        "Leckage-Prävention",
        "Asset-Schutz",
        "SHK Notdienst B2B",
        "hydraulischer Abgleich",
        "TrinkwV Konformität",
        "Betreiberpflichten Heizung"
      ]}
      trustBadges={[
        { icon: Clock, label: "24/7 Havarie-Hotline" },
        { icon: ShieldCheck, label: "DVGW zertifiziert" },
        { icon: Activity, label: "Leckage-Monitoring" }
      ]}
    />
  );
}
