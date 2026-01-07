import { ServicePageLayout } from "./ServicePageLayout";
import { Wrench, Calendar, FileText, Clock, Settings, CheckCircle } from "lucide-react";

export default function ServiceWartung() {
  return (
    <ServicePageLayout
      title="Service & Wartung"
      subtitle="Handwerk"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Wartung und Instandhaltung technischer Anlagen für maximale Betriebssicherheit und Langlebigkeit Ihrer Gebäudetechnik."
      longDescription="Regelmäßige Wartung ist der Schlüssel zu zuverlässiger Gebäudetechnik. Unser Team kümmert sich um alle technischen Anlagen – von Heizung über Lüftung bis zu elektrischen Systemen."
      imageAlt="Technische Wartung und Instandhaltung von Gebäudeanlagen"
      keywords={["Wartungsvertrag", "Instandhaltung Berlin", "Gebäudetechnik Wartung", "präventive Wartung"]}
      features={[
        "Wartungsverträge für alle technischen Gewerke",
        "Präventive Instandhaltung nach DIN 31051",
        "Digitale Wartungsplanung und -dokumentation",
        "24/7 Störungsmeldung und schnelle Reaktion",
        "Ersatzteilmanagement und Lagerhaltung",
        "Regelmäßige Inspektionen und Prüfungen",
      ]}
      detailedFeatures={[
        { title: "Wartungsplanung", description: "Individuelle Wartungspläne basierend auf Herstellervorgaben.", icon: Calendar },
        { title: "Präventive Wartung", description: "Potenzielle Probleme erkennen, bevor sie zu Ausfällen führen.", icon: Settings },
        { title: "Digitale Dokumentation", description: "Alle Wartungsarbeiten digital erfasst und jederzeit abrufbar.", icon: FileText },
        { title: "Schnelle Reaktion", description: "Im Störfall schnell vor Ort mit passenden Ersatzteilen.", icon: Clock },
        { title: "Gewerkeübergreifend", description: "Ein Ansprechpartner für alle technischen Gewerke.", icon: Wrench },
        { title: "Qualitätssicherung", description: "Standardisierte Checklisten und Qualitätskontrolle.", icon: CheckCircle },
      ]}
      benefits={["Minimierung ungeplanter Ausfälle", "Längere Anlagen-Lebensdauer", "Planbare Kosten", "Energiekostensenkung", "Rechtssicherheit", "Ein Ansprechpartner"]}
      faqs={[
        { question: "Was beinhaltet ein Wartungsvertrag?", answer: "Regelmäßige Inspektionen, präventive Wartung, Dokumentation und priorisierte Störungsbeseitigung." },
        { question: "Wie oft sollten Anlagen gewartet werden?", answer: "Ein- bis viermal jährlich, je nach Anlagentyp und Nutzungsintensität." },
      ]}
    />
  );
}
