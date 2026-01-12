import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Home, Key, Wrench, Eye, ClipboardCheck, Users, Shield, Clock, FileText, Building, CheckCircle, BarChart } from "lucide-react";

export default function Hausmeisterservice() {
  return (
    <BlogServicePageLayout
      title="Hausmeisterservice"
      subtitle="Technische Objektbetreuung & Betreiberverantwortung"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Hausmeisterservice für Gewerbeimmobilien und Wohnportfolios. Technische Objektbetreuung mit digitaler Dokumentation und garantierten SLAs."
      intro="Für Hausverwaltungen und Property Manager mit verteilten Portfolios ist der Hausmeister das operative Rückgrat der Objektbetreuung. Ein Ausfall oder mangelnde Qualität führt zu Mieterbeschwerden, Mängelstau und am Ende zu Leerstand. Unser Hausmeisterservice geht über den klassischen Glühbirnenwechsel hinaus: Wir übernehmen technische Betreiberverantwortung, dokumentieren revisionssicher und sind Ihr verlängerter Arm vor Ort – mit einem festen Ansprechpartner für jedes Objekt."
      imageSrc=""
      imageAlt="Hausmeister bei professioneller Objektbegehung mit digitaler Checkliste"
      imageCaption="Systematische Objektbetreuung mit digitaler Echtzeit-Dokumentation"
      sections={[
        {
          title: "Vom Hausmeister zum technischen Objektmanager",
          content: "Der moderne Hausmeister ist kein Handwerker mit Schlüsselbund – er ist ein technischer Objektmanager. Unsere Objektbetreuer koordinieren Handwerker, führen Schlüsselmanagement nach Vier-Augen-Prinzip, dokumentieren Mängel in Echtzeit und sind erster Ansprechpartner für Mieter, Eigentümer und Behörden. Sie übernehmen definierte Prüfpflichten nach Verkehrssicherungsrecht und entlasten damit die Hausverwaltung operativ und haftungsrechtlich."
        },
        {
          title: "Planbare Präsenz statt unzuverlässiger Einzelkämpfer",
          content: "Klassische Hausmeister-Modelle scheitern an Krankheit, Urlaub oder schlicht mangelnder Kontrolle. Wir garantieren vertraglich fixierte Präsenzzeiten: 2-5 Begehungen pro Woche oder tägliche Präsenz bei Großobjekten. Bei jeder Begehung werden definierte Kontrollpunkte systematisch abgearbeitet: Treppenhäuser, Außenanlagen, TGA-Räume, Müllstandplätze, Tiefgaragen. Ausfallzeiten werden durch Vertretungsregelungen kompensiert – Ihr Objekt ist nie unbeaufsichtigt."
        },
        {
          title: "Revisionssichere Dokumentation für Audits und Haftungsfragen",
          content: "Im Schadensfall prüfen Versicherungen und Gerichte als erstes die Dokumentation: Wurde die Verkehrssicherungspflicht erfüllt? Gab es regelmäßige Kontrollen? Unsere digitale Dokumentation erfasst jeden Kontrollpunkt mit Zeitstempel, GPS-Koordinaten und Fotobeweis. Mängel werden klassifiziert, eskaliert und nachverfolgt. Sie haben jederzeit Zugriff auf das Portal – ideal für Eigentümerversammlungen, WEG-Abrechnungen oder Versicherungsnachweise."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Entlastung von Betreiberpflichten",
        text: "Wir übernehmen definierte Prüf- und Kontrollpflichten nach Verkehrssicherungsrecht. Im Rahmenvertrag dokumentiert, haftungsrechtlich abgesichert – Sie delegieren operative Verantwortung an einen zuverlässigen Partner."
      }}
      stats={[
        { value: "98%", label: "Mieterzufriedenheit" },
        { value: "24h", label: "Mängelreaktion" },
        { value: "100%", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Technische Objektbegehungen", description: "Systematische Kontrollen nach Prüfkatalog mit digitaler Dokumentation.", icon: Eye },
        { title: "Kleinreparaturen & Sofortmaßnahmen", description: "Behebung vor Ort: Leuchtmittel, Türschließer, Silikonfugen, Notabsicherung.", icon: Wrench },
        { title: "Schlüsselmanagement", description: "Vier-Augen-Prinzip, dokumentierte Übergaben, Koordination Handwerkerzugänge.", icon: Key },
        { title: "Handwerker-Koordination", description: "Terminierung, Einweisung, Abnahme und Qualitätskontrolle.", icon: Users },
        { title: "Digitale Mängeldokumentation", description: "Echtzeit-Erfassung mit Fotos, Klassifizierung und Eskalationsworkflow.", icon: FileText },
        { title: "Multi-Site-Management", description: "Einheitliche Standards für verteilte Portfolios mit konsolidiertem Reporting.", icon: BarChart }
      ]}
      quote="Für Hausverwaltungen mit 50+ Objekten bieten wir Rahmenverträge mit einheitlichen Prozessen, zentralem Reporting und einem festen Objektbetreuer-Team für alle Standorte."
      faqs={[
        { 
          question: "Wie unterscheidet sich professioneller Hausmeisterservice von Einzelpersonen?", 
          answer: "Vertretungsregelung bei Ausfall, revisionssichere Dokumentation, definierte SLAs mit Reaktionszeiten, Qualitätskontrolle durch Objektleitung und einheitliche Prozesse über alle Objekte. Bei Einzelpersonen fällt bei Krankheit oder Urlaub die gesamte Betreuung aus." 
        },
        { 
          question: "Welche Prüfpflichten können übernommen werden?", 
          answer: "Kontrolle der Verkehrssicherheit (Wege, Treppen, Beleuchtung), Sichtprüfung technischer Anlagen, Überwachung von Wartungsterminen, Dokumentation für Betriebssicherheitsverordnung und Vorbereitung von Sachverständigenprüfungen." 
        },
        { 
          question: "Wie funktioniert die digitale Dokumentation?", 
          answer: "Mängel werden per App erfasst mit Foto, GPS-Zeitstempel und Klassifizierung nach Dringlichkeit. Sie erhalten automatische Benachrichtigungen und haben 24/7 Portalzugriff. Berichte werden automatisch generiert – ideal für WEG-Abrechnungen und Eigentümerversammlungen." 
        },
        { 
          question: "Können Sie mehrere Objekte bundesweit betreuen?", 
          answer: "Ja, wir betreuen Portfolios mit hunderten Objekten über einen zentralen Rahmenvertrag. Einheitliche Prozesse, konsolidiertes Reporting, ein fester Ansprechpartner auf Managementebene – unabhängig vom Standort." 
        },
        { 
          question: "Was kostet professioneller Hausmeisterservice im Vergleich?", 
          answer: "Die Kosten liegen oft unter denen eines fest angestellten Hausmeisters, wenn Lohnnebenkosten, Vertretung, Fahrzeug und Werkzeug eingerechnet werden. Dazu kommen die Vorteile der Dokumentation und Haftungsentlastung." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Facility-Management-Leistungen", href: "/facility-management" },
        { label: "Objektmanagement", href: "/facility-management/objektmanagement" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "München", href: "/standorte/muenchen" }
      ]}
      keywords={[
        "Hausmeisterservice Gewerbe",
        "Objektbetreuung",
        "Facility Service",
        "Gebäudebetreuung",
        "Betreiberverantwortung",
        "Verkehrssicherungspflicht",
        "digitale Mängeldokumentation",
        "Property Management"
      ]}
      trustBadges={[
        { icon: Clock, label: "24h Mängelreaktion" },
        { icon: Shield, label: "Haftungsentlastung" },
        { icon: CheckCircle, label: "100% dokumentiert" }
      ]}
    />
  );
}
