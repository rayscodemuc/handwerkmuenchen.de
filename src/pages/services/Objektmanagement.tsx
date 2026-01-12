import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Building, BarChart, Users, FileText, Settings, TrendingUp, Shield, Clock, Target, CheckCircle } from "lucide-react";

export default function Objektmanagement() {
  return (
    <BlogServicePageLayout
      title="Objektmanagement"
      subtitle="Technisches Asset Management & Kostenoptimierung"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Strategisches Objektmanagement für Gewerbeimmobilien. Zentrale Steuerung aller Gewerke, datenbasiertes Reporting und langfristige Werterhaltung."
      intro="Für Eigentümer und Asset Manager mit größeren Immobilienportfolios ist fragmentiertes Facility Management ein Kostentreiber. Unterschiedliche Dienstleister, fehlende Transparenz und reaktive Instandhaltung führen zu Budgetüberschreitungen und Wertverfall. Unser Objektmanagement übernimmt die strategische Steuerung aller technischen Dienstleistungen: ein Ansprechpartner, datenbasierte Entscheidungen und planbare Kosten für langfristigen Werterhalt."
      imageSrc=""
      imageAlt="Objektmanager bei strategischer Portfolioanalyse"
      imageCaption="Datenbasiertes Objektmanagement für optimierte Immobilienperformance"
      sections={[
        {
          title: "Vom Verwalter zum strategischen Partner",
          content: "Klassische Hausverwaltung reagiert auf Probleme – professionelles Objektmanagement agiert vorausschauend. Wir analysieren Lebenszykluskosten, planen Instandhaltungen über 5-10 Jahre und optimieren kontinuierlich. Das Ergebnis: planbare Budgets, vermiedene Notfälle und nachweisbare Wertsteigerung. Für institutionelle Investoren liefern wir ESG-konforme Reportings."
        },
        {
          title: "Zentrale Dienstleistersteuerung",
          content: "Fragmentierte Verträge mit dutzenden Dienstleistern erzeugen Abstimmungschaos und Schnittstellenprobleme. Wir bündeln alle Gewerke unter einer Steuerung: Reinigung, Wartung, Winterdienst, Sicherheit, Grünpflege. Ausschreibung, Vergabe, Qualitätskontrolle und Abrechnung aus einer Hand. Sie haben einen Ansprechpartner – wir koordinieren den Rest."
        },
        {
          title: "Datenbasierte Entscheidungsgrundlagen",
          content: "Unser Reporting liefert KPIs zu Kosten, Qualität, Verfügbarkeit und Nachhaltigkeit. Benchmarking mit vergleichbaren Objekten zeigt Optimierungspotenziale. Digitale Dashboards ermöglichen Echtzeit-Einblick in alle Objekte. So treffen Sie Investitionsentscheidungen auf Basis von Fakten – nicht Schätzungen."
        }
      ]}
      highlightBox={{
        icon: TrendingUp,
        title: "10-20% Kosteneinsparung im ersten Jahr",
        text: "Durch Rahmenverträge, Prozessoptimierung und präventive Instandhaltung realisieren unsere Kunden typischerweise 10-20 % Einsparung bei den Facility-Kosten – bei gleichzeitig höherer Qualität und Transparenz."
      }}
      stats={[
        { value: "10-20%", label: "Kosteneinsparung" },
        { value: "1", label: "Ansprechpartner" },
        { value: "Echtzeit", label: "KPI-Reporting" }
      ]}
      services={[
        { title: "Strategische Instandhaltungsplanung", description: "Mehrjährige Budgets für planbare Investitionen.", icon: TrendingUp },
        { title: "Kostenoptimierung & Benchmarking", description: "Analyse, Vergleich und Identifikation von Einsparpotenzialen.", icon: BarChart },
        { title: "Dienstleistersteuerung", description: "Ausschreibung, Vergabe, SLA-Monitoring und Qualitätskontrolle.", icon: Users },
        { title: "Qualitätsmanagement", description: "Regelmäßige Begehungen, Audits und Mängeltracking.", icon: Target },
        { title: "Digitales Dokumentenmanagement", description: "Revisionssichere Ablage aller Verträge, Protokolle und Nachweise.", icon: FileText },
        { title: "Prozessoptimierung", description: "Kontinuierliche Verbesserung durch PDCA-Zyklen.", icon: Settings }
      ]}
      quote="Für institutionelle Investoren und Asset Manager mit großen Portfolios bieten wir mandantenspezifisches Reporting nach Ihren Standards – inklusive ESG-Kennzahlen und Nachhaltigkeitsberichten."
      faqs={[
        { 
          question: "Ab welcher Objektgröße lohnt sich Objektmanagement?", 
          answer: "Ab etwa 5.000 m² oder bei mehreren Objekten rechnet sich professionelles Objektmanagement. Die Einsparungen durch optimierte Prozesse und Rahmenverträge übersteigen die Management-Kosten typischerweise bereits im ersten Jahr." 
        },
        { 
          question: "Wie unterscheidet sich Objektmanagement von Property Management?", 
          answer: "Property Management umfasst zusätzlich kaufmännische Aspekte wie Mietverwaltung und Nebenkostenabrechnung. Wir fokussieren auf das technische Facility Management – arbeiten aber Hand in Hand mit Ihrem Property Manager." 
        },
        { 
          question: "Wie schnell sehe ich Einsparungen?", 
          answer: "Erste Quick Wins durch Rahmenverträge und Prozessoptimierung oft nach 3-6 Monaten. Strukturelle Einsparungen von 10-20 % sind im ersten Jahr realistisch. Bei größeren Portfolios oft schneller." 
        },
        { 
          question: "Welche Reportings erhalte ich?", 
          answer: "Standard: monatliche Kostenübersichten, quartalsweise Management-Reports mit KPIs und Maßnahmenempfehlungen. Auf Wunsch: Echtzeit-Dashboards, ESG-Reportings, individuelle Auswertungen nach Ihren Anforderungen." 
        },
        { 
          question: "Können Sie mehrere Standorte bundesweit betreuen?", 
          answer: "Ja, wir steuern Portfolios mit hunderten Objekten bundesweit. Einheitliche Prozesse, konsolidiertes Reporting, ein Ansprechpartner auf Managementebene – unabhängig vom Standort." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Facility-Management-Leistungen", href: "/facility-management" },
        { label: "Hausmeisterservice", href: "/facility-management/hausmeisterservice" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "München", href: "/standorte/muenchen" }
      ]}
      keywords={[
        "Objektmanagement Gewerbe",
        "technisches Asset Management",
        "Facility Management Steuerung",
        "Immobilienmanagement",
        "Dienstleistersteuerung",
        "KPI Reporting Immobilien"
      ]}
      trustBadges={[
        { icon: BarChart, label: "KPI-Reporting" },
        { icon: Shield, label: "10-20% Einsparung" },
        { icon: CheckCircle, label: "Zentrale Steuerung" }
      ]}
    />
  );
}
