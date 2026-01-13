import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Leaf, Scissors, Flower, TreeDeciduous, Droplets, Calendar, Shield, CheckCircle, BarChart } from "lucide-react";

export default function Gruenpflege() {
  return (
    <BlogServicePageLayout
      title="Grünpflege"
      subtitle="Außenanlagenpflege & Immobilienwertsteigerung"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Ganzjährige Grünpflege für Gewerbeimmobilien. Rasenpflege, Heckenschnitt, Beetpflege und Bewässerungsmanagement für repräsentative Außenanlagen."
      intro="Gepflegte Grünanlagen sind mehr als Dekoration – sie steigern den Immobilienwert um bis zu 15 %, erhöhen die Mieterzufriedenheit und prägen den ersten Eindruck bei Kunden und Besuchern. Für Property Manager und Facility-Verantwortliche übernehmen wir die komplette ganzjährige Grünpflege mit planbaren Kosten und dokumentierter Qualität."
      imageSrc=""
      imageAlt="Professionelle Grünpflege auf Gewerbefläche"
      imageCaption="Repräsentative Außenanlagen für Gewerbeimmobilien"
      sections={[
        { title: "Werterhalt durch professionelle Pflege", content: "Vernachlässigte Grünflächen signalisieren mangelnde Sorgfalt und mindern die Attraktivität für Mieter und Investoren. Regelmäßige Pflege nach Jahresplan hält Ihre Außenanlagen in Topzustand." },
        { title: "Jahreszeitengerechte Maßnahmen", content: "Frühjahr: Vertikutieren, Düngen, Rückschnitt. Sommer: Regelmäßiger Schnitt, Bewässerung. Herbst: Laubbeseitigung, Wintervorbereitung. Winter: Schutzmaßnahmen für empfindliche Pflanzen." },
        { title: "Smartes Bewässerungsmanagement", content: "Mit Bodenfeuchtesensoren und automatischen Beregnungsanlagen sparen wir bis zu 50 % Wasser. Installation, Wartung und saisonale Einstellung inklusive." }
      ]}
      highlightBox={{ icon: Shield, title: "Verkehrssicherungspflicht erfüllt", text: "Wir dokumentieren alle Pflegemaßnahmen revisionssicher. Bei Unfällen durch herabfallende Äste oder rutschiges Laub sind Sie haftungsrechtlich abgesichert." }}
      stats={[{ value: "15%", label: "Wertsteigerung" }, { value: "4 Saisons", label: "Ganzjährig" }, { value: "50%", label: "Wassereinsparung" }]}
      services={[
        { title: "Rasenpflege", description: "Mähen, Vertikutieren, Düngen, Nachsaat.", icon: Leaf },
        { title: "Heckenschnitt", description: "Form- und Verjüngungsschnitt nach Bedarf.", icon: Scissors },
        { title: "Beetpflege", description: "Unkraut, Mulchen, saisonale Bepflanzung.", icon: Flower },
        { title: "Baumpflege", description: "Kronenpflege und Totholzentfernung.", icon: TreeDeciduous },
        { title: "Bewässerung", description: "Installation und Wartung automatischer Anlagen.", icon: Droplets },
        { title: "Jahresplan", description: "Planbare Termine und transparente Kosten.", icon: Calendar }
      ]}
      quote="Für Portfolios mit mehreren Standorten bieten wir Rahmenverträge mit einheitlichen Standards und konsolidiertem Reporting."
      faqs={[
        { question: "Wie oft wird der Rasen gemäht?", answer: "In der Wachstumssaison wöchentlich bis 14-tägig, je nach Wachstum und Witterung." },
        { question: "Übernehmen Sie auch Bepflanzung?", answer: "Ja, wir planen und realisieren saisonale Bepflanzungen nach Ihren Wünschen." },
        { question: "Was passiert mit dem Grünschnitt?", answer: "Wird von uns fachgerecht entsorgt – zur Kompostierung oder energetischen Verwertung." },
        { question: "Können Sie mehrere Standorte betreuen?", answer: "Ja, bundesweite Betreuung über Rahmenvertrag mit einheitlichen Standards." }
      ]}
      relatedLinks={[
        { label: "Außenanlagen", href: "/aussenanlagen" },
        { label: "Baumpflege", href: "/aussenanlagen/baumpflege" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={["Grünpflege Gewerbe", "Rasenpflege", "Außenanlagenpflege", "Gartenpflege Gewerbeimmobilien"]}
      trustBadges={[{ icon: Calendar, label: "Jahresplan" }, { icon: Shield, label: "Haftungssicherheit" }, { icon: CheckCircle, label: "Dokumentiert" }]}
    />
  );
}
