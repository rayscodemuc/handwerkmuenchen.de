import { ServicePageLayout } from "./ServicePageLayout";
import { Building, BarChart, Users, FileText, Settings, TrendingUp } from "lucide-react";

export default function Objektmanagement() {
  return (
    <ServicePageLayout
      title="Objektmanagement"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Strategisches Objektmanagement für Gewerbe- und Wohnimmobilien. Werterhaltung, Kostenoptimierung und professionelle Betreuung aus einer Hand."
      longDescription="Professionelles Objektmanagement ist die strategische Betreuung Ihrer Immobilie mit dem Ziel der langfristigen Werterhaltung und -steigerung."
      keywords={["Objektmanagement Berlin", "Property Management", "Immobilienverwaltung", "Facility Management"]}
      features={[
        "Strategische Objektbetreuung und Werterhaltung",
        "Koordination aller Dienstleister",
        "Betriebskostenoptimierung und Benchmarking",
        "Regelmäßige Zustandsanalysen",
        "Instandhaltungsplanung und Budgetierung",
        "Technisches Berichtswesen",
      ]}
      detailedFeatures={[
        { title: "Strategische Planung", description: "Langfristige Instandhaltungsstrategien für Ihre Immobilie.", icon: TrendingUp },
        { title: "Kostenoptimierung", description: "Analyse und Optimierung aller objektbezogenen Kosten.", icon: BarChart },
        { title: "Dienstleistersteuerung", description: "Zentrale Koordination aller externen Partner.", icon: Users },
        { title: "Gebäudeanalyse", description: "Regelmäßige technische Zustandsanalysen.", icon: Building },
        { title: "Dokumentenmanagement", description: "Zentrale digitale Ablage aller Dokumente.", icon: FileText },
        { title: "Prozessoptimierung", description: "Kontinuierliche Verbesserung aller FM-Prozesse.", icon: Settings },
      ]}
      benefits={["Ein Ansprechpartner", "Transparente Kosten", "Messbare Qualität", "Langfristige Werterhaltung", "Weniger Verwaltungsaufwand", "Professionelles Reporting"]}
      faqs={[
        { question: "Was unterscheidet Objektmanagement von Hausverwaltung?", answer: "Objektmanagement fokussiert auf technisch-infrastrukturelle Betreuung und strategische Wertentwicklung." },
        { question: "Für welche Objektgrößen geeignet?", answer: "Wir betreuen Objekte von 1.000 bis über 100.000 m² Nutzfläche." },
      ]}
    />
  );
}
