import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Droplets, Thermometer, Wrench, Clock, Shield, Gauge } from "lucide-react";

export default function SanitaerHeizung() {
  return (
    <BlogServicePageLayout
      title="Sanitär & Heizung"
      subtitle="Technische Gebäudeausrüstung"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Sanitär- und Heizungsinstallation mit 24/7 Notdienst. Zertifiziert nach DVGW und EnEV."
      intro="Funktionierende Sanitär- und Heizungsanlagen sind die Grundlage für den reibungslosen Betrieb jeder Immobilie. Als spezialisierter Fachbetrieb übernehmen wir die vollständige Betreiberverantwortung für Ihre haustechnischen Anlagen."
      sections={[
        {
          title: "Heizungstechnik nach EnEV und GEG",
          content: "Von der jährlichen Heizungswartung gemäß Herstellervorgaben über die energetische Modernisierung bis hin zur hydraulischen Abstimmung komplexer Heizkreise. Unsere Techniker sind nach DVGW-Arbeitsblättern zertifiziert und arbeiten mit Viessmann, Buderus, Vaillant und Wolf.",
        },
        {
          title: "Sanitär & Trinkwasser",
          content: "Unser Leistungsspektrum reicht von der Installation moderner Trinkwassersysteme über die gesetzlich vorgeschriebene Legionellenprüfung nach TrinkwV bis zur professionellen Rohrsanierung mittels Inliner-Verfahren.",
        },
      ]}
      highlightBox={{
        icon: Shield,
        title: "24/7 Notdienst bundesweit",
        text: "Bei Rohrbrüchen, Wasserschäden oder Heizungsausfällen garantiert unser Notdienst schnelle Reaktionszeiten – mit Teams in allen Metropolregionen.",
      }}
      stats={[
        { value: "< 90", label: "Minuten Reaktionszeit" },
        { value: "24/7", label: "Notdienst" },
        { value: "DVGW", label: "Zertifiziert" },
      ]}
      services={[
        { title: "Heizungswartung", description: "Jährliche Wartung inkl. Brennereinstellung und Abgasmessung.", icon: Thermometer },
        { title: "Sanitär-Notdienst", description: "Rohrbruch, Wasserschaden oder verstopfte Abflüsse – rund um die Uhr.", icon: Droplets },
        { title: "Rohrsanierung", description: "Moderne Inliner-Verfahren ohne aufwändige Stemmarbeiten.", icon: Wrench },
        { title: "Legionellenprüfung", description: "Gesetzeskonforme Prüfung nach TrinkwV mit Laboranalyse.", icon: Shield },
        { title: "Druckprüfung", description: "Leckageortung mittels Thermografie und akustischer Verfahren.", icon: Gauge },
        { title: "Schnelle Intervention", description: "Garantierte Reaktionszeiten bei kritischen Ausfällen.", icon: Clock },
      ]}
      quote="Für Hausverwaltungen und Property Manager bieten wir skalierbare Rahmenverträge mit bundesweiter Abdeckung und einem zentralen Ansprechpartner."
      faqs={[
        { question: "Wie oft sollte eine Heizung gewartet werden?", answer: "Wir empfehlen eine jährliche Wartung vor Beginn der Heizperiode. Bei intensiver Nutzung kann ein halbjährlicher Rhythmus sinnvoll sein." },
        { question: "Was tun bei einem Rohrbruch?", answer: "Hauptwasserhahn schließen und unseren 24/7 Notdienst kontaktieren. Wir sind in der Regel innerhalb von 60-90 Minuten vor Ort." },
        { question: "Ist die Legionellenprüfung verpflichtend?", answer: "Ja, nach der Trinkwasserverordnung sind Betreiber von Großanlagen zu einer Prüfung alle drei Jahre verpflichtet." },
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "Berlin", href: "/standorte/berlin" },
        { label: "München", href: "/standorte/muenchen" },
      ]}
      keywords={["Sanitär Notdienst", "Heizungswartung", "Legionellenprüfung", "DVGW", "TrinkwV"]}
      trustBadges={[
        { icon: Clock, label: "24/7 Notdienst" },
        { icon: Shield, label: "DVGW zertifiziert" },
        { icon: Thermometer, label: "Alle Hersteller" },
      ]}
    />
  );
}
