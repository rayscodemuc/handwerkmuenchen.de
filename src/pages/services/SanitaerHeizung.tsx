import { ServicePageLayout } from "./ServicePageLayout";
import { Droplets, Thermometer, Wrench, Clock, Shield, Gauge } from "lucide-react";

export default function SanitaerHeizung() {
  return (
    <ServicePageLayout
      title="Sanitär & Heizung"
      subtitle="Handwerk"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Sanitär- und Heizungsinstallation, Wartung und 24/7 Notdienst für Gewerbe- und Wohnimmobilien in Berlin und Brandenburg."
      longDescription="Von der Heizungswartung bis zur Rohrbruch-Behebung – unser erfahrenes Team aus Sanitär- und Heizungsinstallateuren steht Ihnen rund um die Uhr zur Verfügung. Wir sorgen für funktionierende Sanitäranlagen, effiziente Heizsysteme und schnelle Hilfe im Notfall."
      keywords={["Sanitär Notdienst Berlin", "Heizungswartung", "Rohrbruch", "Heizungsinstallation"]}
      features={[
        "Installation und Wartung von Heizungsanlagen",
        "Sanitärinstallation und -reparatur",
        "24/7 Notdienst bei Rohrbrüchen und Heizungsausfällen",
        "Legionellenprüfung nach Trinkwasserverordnung",
        "Wartung von Warmwasseranlagen",
        "Rohrreinigung und Kanalreinigung",
        "Energieeffiziente Heizungsmodernisierung",
      ]}
      detailedFeatures={[
        { title: "Heizungswartung", description: "Regelmäßige Wartung für optimale Effizienz und Langlebigkeit Ihrer Heizungsanlage.", icon: Thermometer },
        { title: "Sanitär-Notdienst", description: "Bei Rohrbrüchen oder verstopften Abflüssen sind wir schnell vor Ort.", icon: Droplets },
        { title: "Rohrsanierung", description: "Moderne Verfahren ohne aufwändige Stemmarbeiten.", icon: Wrench },
        { title: "24/7 Notdienst", description: "Rund um die Uhr erreichbar, 365 Tage im Jahr.", icon: Clock },
        { title: "Legionellenprüfung", description: "Gesetzlich vorgeschriebene Überprüfung Ihrer Trinkwasseranlage.", icon: Shield },
        { title: "Druckprüfung", description: "Professionelle Leckageortung und Systemprüfung.", icon: Gauge },
      ]}
      benefits={["Schnelle Reaktionszeiten", "Festpreisgarantie", "Alle Arbeiten aus einer Hand", "Transparente Kosten", "Herstellerübergreifend", "Langfristige Wartungsverträge"]}
      faqs={[
        { question: "Wie oft sollte eine Heizung gewartet werden?", answer: "Wir empfehlen eine jährliche Wartung vor der Heizperiode." },
        { question: "Was tun bei Rohrbruch?", answer: "Haupthahn schließen und unseren Notdienst rufen – wir sind schnell vor Ort." },
      ]}
    />
  );
}
