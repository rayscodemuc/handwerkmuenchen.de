import { ServicePageLayout } from "./ServicePageLayout";
import { Droplets, Thermometer, Wrench, Clock, Shield, Gauge } from "lucide-react";

export default function SanitaerHeizung() {
  return (
    <ServicePageLayout
      title="Sanitär & Heizung"
      subtitle="Technische Gebäudeausrüstung"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Sanitär- und Heizungsinstallation, Wartung und 24/7 Notdienst für Gewerbe- und Wohnimmobilien. Zertifiziert nach DVGW und EnEV."
      longDescription={`Funktionierende Sanitär- und Heizungsanlagen sind die Grundlage für den reibungslosen Betrieb jeder Immobilie. Als spezialisierter Fachbetrieb für technische Gebäudeausrüstung (TGA) übernimmt Mr. Clean Services die vollständige Betreiberverantwortung für Ihre haustechnischen Anlagen – von der Planung über die Installation bis zur langfristigen Wartung. Unsere Leistungen richten sich gezielt an Hausverwaltungen, Wohnungsbaugesellschaften, Gewerbeimmobilien und Industrieanlagen mit erhöhten Anforderungen an Zuverlässigkeit und Compliance.

Im Bereich Heizungstechnik decken wir das gesamte Spektrum ab: von der jährlichen Heizungswartung gemäß Herstellervorgaben über die energetische Modernisierung nach EnEV und GEG bis hin zur hydraulischen Abstimmung komplexer Heizkreise. Für Immobilienportfolios bieten wir zentral koordinierte Wartungsverträge mit digitaler Dokumentation und transparentem Reporting. Unsere Techniker sind nach DVGW-Arbeitsblättern zertifiziert und arbeiten mit allen gängigen Herstellern wie Viessmann, Buderus, Vaillant und Wolf.

Im Sanitärbereich reicht unser Leistungsspektrum von der Installation moderner Trinkwassersysteme über die gesetzlich vorgeschriebene Legionellenprüfung nach TrinkwV bis zur professionellen Rohrsanierung mittels Inliner-Verfahren. Bei Rohrbrüchen, verstopften Abflüssen oder Heizungsausfällen garantiert unser 24/7 Notdienst schnelle Reaktionszeiten – bundesweit mit Einsatzteams in allen Metropolregionen.

Unser digitales Wartungsmanagement ermöglicht die lückenlose Nachverfolgung aller Maßnahmen. Sie erhalten revisionssichere Protokolle für Audits, Versicherungen und behördliche Prüfungen. Für Facility Manager und Property Manager bieten wir skalierbare Rahmenverträge mit garantierten SLAs und einem zentralen Ansprechpartner für alle Standorte.

Als Teil unseres integrierten Handwerk-Leistungsangebots arbeiten wir eng mit unseren Elektrotechnik- und Wartungsteams zusammen. So profitieren Sie von gewerkeübergreifender Koordination und reduzierten Schnittstellen.`}
      imageAlt="Sanitär und Heizungsinstallation durch zertifizierte Handwerker"
      keywords={["Sanitär Notdienst", "Heizungswartung Gewerbe", "Rohrbruch Notdienst", "Heizungsinstallation", "Legionellenprüfung TrinkwV", "DVGW zertifiziert", "Trinkwasserverordnung", "EnEV Heizung", "Hausverwaltung Sanitär"]}
      features={[
        "Installation und Wartung von Heizungsanlagen (Gas, Öl, Wärmepumpe)",
        "Sanitärinstallation und -reparatur nach DVGW",
        "24/7 Notdienst bei Rohrbrüchen und Heizungsausfällen",
        "Legionellenprüfung nach Trinkwasserverordnung (TrinkwV)",
        "Wartung von Warmwasseranlagen und Speichern",
        "Rohrreinigung, Kanalreinigung und TV-Inspektion",
        "Energieeffiziente Heizungsmodernisierung nach GEG",
        "Hydraulischer Abgleich für optimale Wärmeverteilung",
      ]}
      detailedFeatures={[
        {
          title: "Heizungswartung",
          description: "Regelmäßige Wartung für optimale Effizienz und Langlebigkeit Ihrer Heizungsanlage. Inklusive Brennereinstellung, Abgasmessung und Verschleißteilprüfung.",
          icon: Thermometer,
        },
        {
          title: "Sanitär-Notdienst",
          description: "Bei Rohrbrüchen, Wasserschäden oder verstopften Abflüssen sind wir innerhalb kürzester Zeit vor Ort – rund um die Uhr, 365 Tage im Jahr.",
          icon: Droplets,
        },
        {
          title: "Rohrsanierung",
          description: "Moderne Inliner-Verfahren zur Rohrsanierung ohne aufwändige Stemmarbeiten. Minimale Beeinträchtigung des laufenden Betriebs.",
          icon: Wrench,
        },
        {
          title: "24/7 Notdienst",
          description: "Garantierte Reaktionszeiten bei kritischen Ausfällen. Unsere Teams sind in allen Metropolregionen einsatzbereit.",
          icon: Clock,
        },
        {
          title: "Legionellenprüfung",
          description: "Gesetzlich vorgeschriebene Untersuchung Ihrer Trinkwasseranlage nach TrinkwV. Inklusive Probenahme, Laboranalyse und Dokumentation.",
          icon: Shield,
        },
        {
          title: "Druckprüfung & Leckortung",
          description: "Professionelle Leckageortung mittels Thermografie und akustischer Verfahren. Präzise Lokalisierung ohne unnötige Demontage.",
          icon: Gauge,
        },
      ]}
      benefits={[
        "Garantierte Reaktionszeiten (SLA)",
        "Festpreisgarantie ohne versteckte Kosten",
        "Alle Gewerke aus einer Hand",
        "Transparente digitale Dokumentation",
        "Herstellerübergreifende Expertise",
        "Langfristige Wartungsverträge",
      ]}
      faqs={[
        {
          question: "Wie oft sollte eine Heizung gewartet werden?",
          answer: "Wir empfehlen eine jährliche Wartung vor Beginn der Heizperiode. Bei intensiver Nutzung oder älteren Anlagen kann ein halbjährlicher Rhythmus sinnvoll sein. Regelmäßige Wartung sichert die Effizienz, reduziert Energiekosten und verlängert die Lebensdauer der Anlage erheblich.",
        },
        {
          question: "Was tun bei einem Rohrbruch?",
          answer: "Schließen Sie umgehend den Hauptwasserhahn und kontaktieren Sie unseren 24/7 Notdienst. Unsere Teams sind in der Regel innerhalb von 60-90 Minuten vor Ort. Dokumentieren Sie den Schaden fotografisch für die Versicherung.",
        },
        {
          question: "Ist die Legionellenprüfung für Vermieter verpflichtend?",
          answer: "Ja, nach der Trinkwasserverordnung (TrinkwV) sind Betreiber von Großanlagen zur Warmwasserbereitung verpflichtet, alle drei Jahre eine Legionellenprüfung durchführen zu lassen. Bei Überschreitung der Grenzwerte sind sofortige Maßnahmen erforderlich.",
        },
        {
          question: "Bieten Sie bundesweite Wartungsverträge für Immobilienportfolios an?",
          answer: "Ja, wir bieten zentral koordinierte Rahmenverträge für Hausverwaltungen und Immobilienunternehmen mit Standorten in ganz Deutschland. Ein Ansprechpartner, einheitliche Standards und digitales Reporting über alle Liegenschaften.",
        },
        {
          question: "Was kostet eine Heizungswartung?",
          answer: "Die Kosten variieren je nach Anlagentyp und Umfang. Wir arbeiten mit transparenten Festpreisen und erstellen Ihnen gerne ein individuelles Angebot. Bei Wartungsverträgen profitieren Sie von vergünstigten Konditionen.",
        },
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik & DGUV V3", href: "/handwerk/elektrotechnik" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "Sanitär Berlin", href: "/standorte/berlin" },
        { label: "Sanitär Hamburg", href: "/standorte/hamburg" },
        { label: "Sanitär München", href: "/standorte/muenchen" },
      ]}
    />
  );
}
