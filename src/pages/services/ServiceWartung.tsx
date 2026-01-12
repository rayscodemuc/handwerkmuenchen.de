import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Wrench, Calendar, FileText, Clock, Settings, CheckCircle } from "lucide-react";

export default function ServiceWartung() {
  return (
    <BlogServicePageLayout
      title="Service & Wartung"
      subtitle="Technische Betriebsführung"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Professionelle Wartung nach DIN 31051 für maximale Anlagenverfügbarkeit und planbare Kosten."
      intro="Ungeplante Anlagenausfälle sind der größte Kostentreiber in der Gebäudebewirtschaftung. Wir eliminieren dieses Risiko durch systematische Wartungsstrategien und präventive Instandhaltung."
      sections={[
        {
          title: "Präventiv statt reaktiv",
          content: "Statt auf Störungen zu reagieren, identifizieren wir potenzielle Schwachstellen proaktiv. Digitale Wartungsplanung mit automatisierten Erinnerungen und Echtzeit-Dokumentation.",
        },
        {
          title: "Alle Gewerke aus einer Hand",
          content: "Wir betreuen Heizung, Lüftung, Klima (HLK), Sanitär, Elektrotechnik, Aufzugsanlagen und Brandschutztechnik. Ein Ansprechpartner, ein Vertrag, eine Rechnung.",
        },
      ]}
      highlightBox={{
        icon: CheckCircle,
        title: "Garantierte SLAs",
        text: "Maßgeschneiderte Service Level Agreements mit garantierten Reaktionszeiten von 2 bis 24 Stunden – je nach Kritikalität der Anlage.",
      }}
      stats={[
        { value: "DIN", label: "31051 konform" },
        { value: "2-24h", label: "Reaktionszeit" },
        { value: "100%", label: "Dokumentiert" },
      ]}
      services={[
        { title: "Wartungsplanung", description: "Individuelle Pläne nach Herstellervorgaben und Nutzungsintensität.", icon: Calendar },
        { title: "Präventive Wartung", description: "Probleme erkennen, bevor sie zu Ausfällen führen.", icon: Settings },
        { title: "Digitale Dokumentation", description: "Revisionssichere Protokolle für Audits und Behörden.", icon: FileText },
        { title: "Schnelle Reaktion", description: "Teams mit passenden Ersatzteilen und Spezialwerkzeug.", icon: Clock },
        { title: "Gewerkeübergreifend", description: "Von der Heizung bis zur Brandmeldeanlage.", icon: Wrench },
        { title: "Qualitätssicherung", description: "Standardisierte Abläufe und Vier-Augen-Prinzip.", icon: CheckCircle },
      ]}
      quote="Messbare Vorteile: längere Anlagenlebensdauer, geringere Energiekosten, Rechtssicherheit und planbare Instandhaltungsbudgets."
      faqs={[
        { question: "Was beinhaltet ein Wartungsvertrag?", answer: "Regelmäßige Inspektionen, präventive Wartung, Verschleißteilprüfung, vollständige Dokumentation und priorisierte Störungsbeseitigung." },
        { question: "Wie oft sollten Anlagen gewartet werden?", answer: "Heizungsanlagen jährlich, Lüftungsanlagen quartalsweise, Aufzüge monatlich – je nach Herstellervorgabe." },
        { question: "Bieten Sie bundesweite Wartung an?", answer: "Ja, wir betreuen Kunden mit Standorten in ganz Deutschland mit einheitlichen Standards und einem Ansprechpartner." },
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
        { label: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Hamburg", href: "/standorte/hamburg" },
      ]}
      keywords={["Wartungsvertrag", "DIN 31051", "Instandhaltung", "SLA", "TGA Wartung"]}
    />
  );
}
