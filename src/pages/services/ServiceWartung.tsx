import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Wrench, Calendar, FileText, Clock, Settings, ShieldCheck, Activity, TrendingUp, AlertTriangle, BarChart } from "lucide-react";
import serviceWartungImage from "@/assets/techniker-wartung-reparatur-gewerbe-facility.jpg";

export default function ServiceWartung() {
  return (
    <BlogServicePageLayout
      title="Service & Wartung"
      subtitle="Betriebssicherheit & Compliance"
      categoryName="Handwerk"
      categoryHref="/handwerk"
      description="Gewerkübergreifende Anlagenwartung nach DIN 31051. Maximale Verfügbarkeit, planbare Kosten und volle Rechtssicherheit."
      intro="Technische Anlagen sind das Rückgrat jeder Gewerbeimmobilie. Ein ungeplanter Ausfall der Heizung im Winter, ein defekter Aufzug oder eine ausgefallene Lüftungsanlage im Rechenzentrum – die Folgekosten übersteigen die Wartungskosten um ein Vielfaches. Als gewerkübergreifender Wartungsdienstleister übernehmen wir die vollständige Betreiberverantwortung für Ihre technischen Anlagen nach DIN 31051 und VDMA 24186."
      imageSrc={serviceWartungImage}
      imageAlt="Techniker bei der Wartung einer Lüftungsanlage nach DIN 31051"
      imageCaption="Systematische Anlagenwartung für maximale Betriebssicherheit"
      sections={[
        {
          title: "Präventive Instandhaltung statt teurer Notfälle",
          content: "Reaktive Wartung – also Reparatur nach Ausfall – ist die teuerste aller Strategien. Studien belegen: Jeder Euro in präventive Instandhaltung spart 5-10 Euro an Folgekosten. Unser Ansatz kombiniert zustandsbasierte Inspektion, herstellerkonforme Wartungsintervalle und prädiktive Analytik. So erkennen wir Verschleiß, bevor er zum Ausfall führt. Das Ergebnis: Anlagenverfügbarkeit über 99 %, planbare Budgets und die Vermeidung von Produktionsausfällen."
        },
        {
          title: "Gewerkübergreifende Kompetenz aus einer Hand",
          content: "Fragmentierte Wartungsverträge mit unterschiedlichen Dienstleistern für Heizung, Lüftung, Elektro und Aufzüge erzeugen Abstimmungschaos und Schnittstellenprobleme. Wir bündeln alle Gewerke in einem Rahmenvertrag: HLK, Sanitär, Elektrotechnik, Brandmeldetechnik, Aufzugsanlagen und Gebäudeautomation. Ein Ansprechpartner, einheitliche SLAs, konsolidiertes Reporting – und volle Transparenz über alle Standorte."
        },
        {
          title: "Rechtssicherheit durch lückenlose Dokumentation",
          content: "Im Schadensfall prüfen Versicherungen und Behörden als erstes die Wartungsdokumentation. Fehlende oder unvollständige Nachweise führen zu Regressansprüchen und persönlicher Haftung der Geschäftsführung. Unsere revisionssichere digitale Dokumentation erfüllt alle Anforderungen der Betriebssicherheitsverordnung (BetrSichV) und der DGUV Vorschriften. Sie weisen die Erfüllung Ihrer Betreiberpflichten jederzeit lückenlos nach."
        }
      ]}
      highlightBox={{
        icon: ShieldCheck,
        title: "Garantierte Service Level Agreements",
        text: "Maßgeschneiderte SLAs mit Reaktionszeiten von 2 bis 24 Stunden – je nach Kritikalität der Anlage. Bei Unterschreitung der Verfügbarkeitsziele greifen vertraglich fixierte Kompensationen."
      }}
      stats={[
        { value: "99%+", label: "Verfügbarkeit" },
        { value: "2-24h", label: "Reaktionszeit" },
        { value: "DIN 31051", label: "Konform" }
      ]}
      services={[
        { title: "Wartungsplanung", description: "Individuelle Pläne nach DIN 31051, VDMA 24186 und Herstellervorgaben.", icon: Calendar },
        { title: "Präventive Wartung", description: "Zustandsbasierte Inspektion mit prädiktiver Analytik.", icon: TrendingUp },
        { title: "Störungsmanagement", description: "24/7-Hotline mit garantierten Reaktionszeiten nach SLA.", icon: AlertTriangle },
        { title: "Condition Monitoring", description: "Sensorbasierte Zustandsüberwachung kritischer Anlagen.", icon: Activity },
        { title: "Revisionssichere Dokumentation", description: "Digitale Protokolle für Audits, Versicherungen und BetrSichV.", icon: FileText },
        { title: "Multi-Site-Management", description: "Einheitliche Standards für verteilte Portfolios.", icon: BarChart }
      ]}
      quote="Für Hausverwaltungen und Property Manager mit verteilten Portfolios bieten wir Rahmenverträge mit einheitlichen Prozessen, zentralem Reporting und einem festen Ansprechpartner für alle Standorte."
      faqs={[
        { 
          question: "Was kostet ein Wartungsausfall wirklich?", 
          answer: "Ein Heizungsausfall im Bürogebäude kostet durchschnittlich 5.000-15.000 € pro Tag an Produktivitätsverlust und Notfallreparatur. Ein defekter Aufzug verursacht neben den Reparaturkosten potenzielle Haftungsansprüche. Präventive Wartung kostet einen Bruchteil davon." 
        },
        { 
          question: "Wie werden Wartungsintervalle festgelegt?", 
          answer: "Wir kombinieren Herstellervorgaben, gesetzliche Prüffristen (BetrSichV, DGUV) und Ihre Nutzungsprofile zu einem individuellen Wartungsplan. Kritische Anlagen erhalten kürzere Intervalle, weniger kritische werden kostenoptimiert betreut." 
        },
        { 
          question: "Was ist in einem SLA-basierten Wartungsvertrag enthalten?", 
          answer: "Regelmäßige Inspektionen, präventive Wartung, Verschleißteilersatz, 24/7-Störungshotline mit garantierten Reaktionszeiten, vollständige Dokumentation und quartalsweises Reporting mit KPIs." 
        },
        { 
          question: "Können Sie mehrere Standorte bundesweit betreuen?", 
          answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Sie erhalten einheitliche Prozesse, konsolidiertes Reporting und einen festen Ansprechpartner – unabhängig vom Standort." 
        },
        { 
          question: "Wie schnell amortisiert sich präventive Wartung?", 
          answer: "Typischerweise innerhalb von 6-12 Monaten durch vermiedene Notfälle, verlängerte Anlagenlebensdauer und optimierte Energieeffizienz. Bei größeren Portfolios oft bereits im ersten Quartal." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
        { label: "Elektrotechnik & DGUV V3", href: "/handwerk/elektrotechnik" },
        { label: "Sanitär- & Heizungstechnik", href: "/handwerk/sanitaer-heizung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Wartungsvertrag Gewerbe",
        "DIN 31051",
        "VDMA 24186",
        "Anlagenwartung",
        "präventive Instandhaltung",
        "TGA Wartung",
        "Betreiberpflichten",
        "SLA Wartung",
        "Condition Monitoring"
      ]}
      trustBadges={[
        { icon: Clock, label: "24/7 Störungshotline" },
        { icon: ShieldCheck, label: "BetrSichV-konform" },
        { icon: Activity, label: "Condition Monitoring" }
      ]}
    />
  );
}
