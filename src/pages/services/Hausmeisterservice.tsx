import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Home, Key, Wrench, Eye, ClipboardCheck, Users, Shield, Clock, FileText } from "lucide-react";

export default function Hausmeisterservice() {
  return (
    <BlogServicePageLayout
      title="Hausmeisterservice"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Hausmeisterservice für Wohn- und Gewerbeobjekte. Ihr fester Ansprechpartner vor Ort für alle technischen Belange."
      intro="Ein gepflegtes Objekt beginnt mit einem zuverlässigen Hausmeister. Unser Hausmeisterservice ist mehr als Glühbirnenwechsel – er ist Ihre verlängerte Hand vor Ort: für regelmäßige Kontrollen, schnelle Mängelbehebung und die Koordination aller Handwerker und Dienstleister."
      imageSrc=""
      imageAlt="Hausmeister bei Objektbegehung mit Checkliste"
      imageCaption="Regelmäßige Objektbegehungen mit digitaler Mängeldokumentation"
      sections={[
        {
          title: "Der Hausmeister als Objektmanager",
          content: "Moderne Hausmeisterdienste gehen weit über klassische Tätigkeiten hinaus. Unsere Objektbetreuer übernehmen Schlüsselmanagement, koordinieren Handwerker, dokumentieren Mängel digital und sind erster Ansprechpartner für Mieter und Hausverwaltung."
        },
        {
          title: "Regelmäßige Präsenz vor Ort",
          content: "Je nach Objektgröße sind wir 2-5 Mal pro Woche oder täglich präsent. Bei jeder Begehung werden definierte Kontrollpunkte abgearbeitet: Treppenhäuser, Außenanlagen, technische Räume, Müllstandplätze und mehr."
        },
        {
          title: "Digitale Dokumentation in Echtzeit",
          content: "Mängel werden vor Ort fotografiert und in unser System eingepflegt. Sie erhalten automatisch Benachrichtigungen und haben jederzeit Zugriff auf den aktuellen Objektstatus – ideal für die Kommunikation mit Eigentümern oder Mietern."
        }
      ]}
      highlightBox={{
        icon: Key,
        title: "Schlüsselmanagement",
        text: "Sichere Verwahrung aller Objektschlüssel mit dokumentierter Übergabe. Zugänge für Handwerker werden koordiniert und protokolliert."
      }}
      stats={[
        { value: "2-5x", label: "Pro Woche" },
        { value: "1", label: "Ansprechpartner" },
        { value: "Digital", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Objektbegehungen", description: "Regelmäßige Kontrollen nach Checkliste.", icon: Eye },
        { title: "Kleinreparaturen", description: "Sofortige Behebung vor Ort.", icon: Wrench },
        { title: "Schlüsselservice", description: "Verwaltung und Übergabe.", icon: Key },
        { title: "Handwerker-Koordination", description: "Terminierung und Einweisung.", icon: Users },
        { title: "Mängeldokumentation", description: "Digitale Erfassung mit Fotos.", icon: FileText },
        { title: "Mieterkommunikation", description: "Erster Ansprechpartner.", icon: Home }
      ]}
      quote="Ein guter Hausmeister kennt jede Ecke seines Objekts – und jedes Problem, bevor es groß wird."
      faqs={[
        { question: "Wie oft ist der Hausmeister vor Ort?", answer: "Je nach Objektgröße und Bedarf 2-5 Mal pro Woche. Bei großen Objekten auch tägliche Präsenz." },
        { question: "Welche Reparaturen werden durchgeführt?", answer: "Alle Kleinreparaturen: Leuchtmittel, Türschließer, Silikonfugen, klemmende Fenster etc. Größere Arbeiten werden koordiniert." },
        { question: "Wie funktioniert die digitale Dokumentation?", answer: "Mängel werden per App erfasst, mit Foto dokumentiert und Ihnen über ein Portal zugänglich gemacht." },
        { question: "Ist der Service auch für Wohnanlagen geeignet?", answer: "Absolut – wir betreuen sowohl Gewerbe- als auch Wohnobjekte mit angepassten Leistungspaketen." }
      ]}
      relatedLinks={[
        { label: "Alle Facility-Management-Leistungen", href: "/facility-management" },
        { label: "Objektmanagement", href: "/facility-management/objektmanagement" },
        { label: "Service & Wartung", href: "/handwerk/service-wartung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={["Hausmeisterservice", "Hausmeisterdienst", "Objektbetreuung", "Facility Service", "Gebäudebetreuung"]}
    />
  );
}
