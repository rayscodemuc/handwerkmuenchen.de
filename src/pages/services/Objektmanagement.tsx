import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building, BarChart, Users, FileText, Settings, TrendingUp, Shield, Clock, Target } from "lucide-react";

export default function Objektmanagement() {
  return (
    <BlogServicePageLayout
      title="Objektmanagement"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Strategisches Objektmanagement für Werterhaltung und Kostenoptimierung. Ein Ansprechpartner für alle Gewerke und Dienstleister."
      intro="Professionelles Objektmanagement ist die strategische Steuerung aller Facility-Dienstleistungen mit dem Ziel der langfristigen Werterhaltung Ihrer Immobilie. Wir übernehmen die Rolle des technischen Asset Managers: Planung, Steuerung, Kontrolle und kontinuierliche Optimierung – ein Ansprechpartner für alles."
      imageSrc=""
      imageAlt="Facility Manager bei Objektbegehung mit digitalem Tablet"
      imageCaption="Digitales Objektmanagement mit Echtzeit-Reporting"
      sections={[
        {
          title: "Was Objektmanagement von Hausverwaltung unterscheidet",
          content: "Während die klassische Hausverwaltung auf kaufmännische Aspekte fokussiert, konzentriert sich Objektmanagement auf die technisch-infrastrukturelle Optimierung. Wir analysieren Lebenszykluskosten, planen Instandhaltungen vorausschauend und steuern alle Gewerke zentral."
        },
        {
          title: "Datenbasierte Entscheidungen",
          content: "Unser Reporting liefert KPIs zu Kosten, Qualität und Verfügbarkeit. Benchmarking mit vergleichbaren Objekten zeigt Optimierungspotenziale. So treffen Sie Entscheidungen auf Basis von Fakten – nicht Bauchgefühl."
        },
        {
          title: "Lieferantenmanagement und Qualitätskontrolle",
          content: "Wir übernehmen Ausschreibung, Vergabe und Steuerung aller Dienstleister. Regelmäßige Qualitätskontrollen mit dokumentierten Begehungen stellen sicher, dass vereinbarte Standards eingehalten werden."
        }
      ]}
      highlightBox={{
        icon: TrendingUp,
        title: "Werterhaltung durch Planung",
        text: "Mit mehrjährigen Instandhaltungsbudgets vermeiden Sie Investitionsstaus und plötzliche Großausgaben. Sie investieren planbar in den Werterhalt Ihrer Immobilie."
      }}
      stats={[
        { value: "1", label: "Ansprechpartner" },
        { value: "100%", label: "Transparenz" },
        { value: "KPI", label: "Reporting" }
      ]}
      services={[
        { title: "Strategische Planung", description: "Langfristige Instandhaltungsbudgets.", icon: TrendingUp },
        { title: "Kostenoptimierung", description: "Analyse und Benchmarking.", icon: BarChart },
        { title: "Dienstleistersteuerung", description: "Ausschreibung, Vergabe, Kontrolle.", icon: Users },
        { title: "Qualitätsmanagement", description: "Regelmäßige Begehungen und Audits.", icon: Target },
        { title: "Dokumentenmanagement", description: "Digitale Ablage aller Unterlagen.", icon: FileText },
        { title: "Prozessoptimierung", description: "Kontinuierliche Verbesserung.", icon: Settings }
      ]}
      quote="Gutes Objektmanagement macht sich unsichtbar – Sie merken es daran, dass alles funktioniert."
      faqs={[
        { question: "Für welche Objektgrößen ist Objektmanagement sinnvoll?", answer: "Ab etwa 5.000 m² oder bei komplexen Nutzungen (Gewerbe, gemischte Nutzung) rechnet sich professionelles Objektmanagement." },
        { question: "Wie unterscheidet sich das von Property Management?", answer: "Property Management umfasst zusätzlich kaufmännische Aspekte wie Mietverwaltung. Wir fokussieren auf das technische Facility Management." },
        { question: "Wie schnell sehe ich Einsparungen?", answer: "Erste Quick Wins (Rahmenverträge, Prozessoptimierung) oft nach 3-6 Monaten. Strukturelle Einsparungen von 10-20 % im ersten Jahr sind realistisch." },
        { question: "Wie erfolgt das Reporting?", answer: "Monatliche oder quartalsweise Berichte mit KPIs, Kostenübersichten und Maßnahmenempfehlungen – digital oder als Präsentation." }
      ]}
      relatedLinks={[
        { label: "Alle Facility-Management-Leistungen", href: "/facility-management" },
        { label: "Hausmeisterservice", href: "/facility-management/hausmeisterservice" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "München", href: "/standorte/muenchen" }
      ]}
      keywords={["Objektmanagement", "Property Management", "Facility Management", "Immobilienverwaltung", "technisches Gebäudemanagement"]}
    />
  );
}
