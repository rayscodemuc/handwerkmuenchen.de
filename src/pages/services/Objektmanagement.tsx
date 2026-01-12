import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building, BarChart, Users, FileText, Settings, TrendingUp } from "lucide-react";

export default function Objektmanagement() {
  return (
    <BlogServicePageLayout
      title="Objektmanagement"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Strategisches Objektmanagement für Werterhaltung und Kostenoptimierung. Ein Ansprechpartner für alle Gewerke."
      intro="Professionelles Objektmanagement ist die strategische Betreuung Ihrer Immobilie mit dem Ziel der langfristigen Werterhaltung und -steigerung."
      sections={[
        { title: "Strategische Steuerung", content: "Wir koordinieren alle Dienstleister, optimieren Betriebskosten und erstellen langfristige Instandhaltungsstrategien." },
        { title: "Messbare Qualität", content: "Regelmäßiges Reporting, KPI-Tracking und Benchmarking machen den Erfolg unserer Arbeit messbar." },
      ]}
      highlightBox={{ icon: TrendingUp, title: "Werterhaltung", text: "Durch proaktive Instandhaltung und strategische Planung erhalten und steigern wir den Wert Ihrer Immobilie." }}
      stats={[{ value: "1", label: "Ansprechpartner" }, { value: "100%", label: "Transparent" }, { value: "Messbar", label: "Qualität" }]}
      services={[
        { title: "Strategische Planung", description: "Langfristige Instandhaltungsstrategien.", icon: TrendingUp },
        { title: "Kostenoptimierung", description: "Analyse und Optimierung aller Kosten.", icon: BarChart },
        { title: "Dienstleistersteuerung", description: "Koordination aller Partner.", icon: Users },
        { title: "Gebäudeanalyse", description: "Regelmäßige Zustandsanalysen.", icon: Building },
        { title: "Dokumentenmanagement", description: "Zentrale digitale Ablage.", icon: FileText },
        { title: "Prozessoptimierung", description: "Kontinuierliche Verbesserung.", icon: Settings },
      ]}
      faqs={[
        { question: "Was unterscheidet Objektmanagement von Hausverwaltung?", answer: "Objektmanagement fokussiert auf technisch-infrastrukturelle Betreuung und strategische Wertentwicklung." },
        { question: "Für welche Objektgrößen geeignet?", answer: "Wir betreuen Objekte von 1.000 bis über 100.000 m² Nutzfläche." },
      ]}
      relatedLinks={[
        { label: "Facility Management", href: "/facility-management" },
        { label: "Hausmeisterservice", href: "/facility-management/hausmeisterservice" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
      ]}
      keywords={["Objektmanagement", "Property Management", "Immobilienverwaltung"]}
    />
  );
}
