import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Home, Key, Wrench, Eye, ClipboardCheck, Users } from "lucide-react";

export default function Hausmeisterservice() {
  return (
    <BlogServicePageLayout
      title="Hausmeisterservice"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Hausmeisterservice für Wohn- und Gewerbeobjekte. Zuverlässige Betreuung und schnelle Hilfe."
      intro="Ein gepflegtes Objekt steigert den Wert Ihrer Immobilie und sorgt für zufriedene Mieter. Unser Hausmeisterservice übernimmt alle anfallenden Aufgaben rund um Ihr Gebäude."
      sections={[
        { title: "Ihr verlässlicher Partner vor Ort", content: "Regelmäßige Objektbegehungen, schnelle Mängelbehebung und ein fester Ansprechpartner für Mieter – wir sind die Schnittstelle zwischen Verwaltung und Objekt." },
        { title: "Kleinreparaturen sofort erledigt", content: "Tropfende Wasserhähne, defekte Leuchtmittel oder klemmende Türen – unser Team erledigt Kleinreparaturen direkt vor Ort." },
      ]}
      highlightBox={{ icon: Key, title: "Schlüsselmanagement", text: "Sichere Verwaltung aller Objektschlüssel mit dokumentierter Übergabe und Zugangskontrolle." }}
      stats={[{ value: "2-5x", label: "pro Woche" }, { value: "Fest", label: "Ansprechpartner" }, { value: "Digital", label: "Dokumentation" }]}
      services={[
        { title: "Objektbegehungen", description: "Regelmäßige Kontrollen mit Mängeldokumentation.", icon: Eye },
        { title: "Kleinreparaturen", description: "Schnelle Erledigung vor Ort.", icon: Wrench },
        { title: "Schlüsselmanagement", description: "Sichere Verwaltung aller Schlüssel.", icon: Key },
        { title: "Handwerker-Koordination", description: "Zentrale Steuerung aller Gewerke.", icon: Users },
        { title: "Gebäudebetreuung", description: "Vom Keller bis zum Dach.", icon: Home },
        { title: "Dokumentation", description: "Digitale Protokollierung.", icon: ClipboardCheck },
      ]}
      faqs={[
        { question: "Wie oft ist der Hausmeister vor Ort?", answer: "2-5 Besuche pro Woche, bei größeren Objekten tägliche Präsenz." },
        { question: "Welche Reparaturen werden durchgeführt?", answer: "Alle Kleinreparaturen wie Leuchtmittelwechsel, Türjustierung oder kleinere Malerarbeiten." },
      ]}
      relatedLinks={[
        { label: "Facility Management", href: "/facility-management" },
        { label: "Objektmanagement", href: "/facility-management/objektmanagement" },
        { label: "Berlin", href: "/standorte/berlin" },
      ]}
      keywords={["Hausmeister", "Hausmeisterservice", "Objektbetreuung"]}
    />
  );
}
