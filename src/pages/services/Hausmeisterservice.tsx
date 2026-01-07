import { ServicePageLayout } from "./ServicePageLayout";
import { Home, Key, Wrench, Eye, ClipboardCheck, Users } from "lucide-react";

export default function Hausmeisterservice() {
  return (
    <ServicePageLayout
      title="Hausmeisterservice"
      subtitle="Facility Management"
      categoryName="Facility Management"
      categoryHref="/facility-management"
      description="Professioneller Hausmeisterservice für Wohn- und Gewerbeobjekte in Berlin. Zuverlässige Betreuung, regelmäßige Kontrollen und schnelle Hilfe."
      longDescription="Ein gepflegtes Objekt steigert den Wert Ihrer Immobilie und sorgt für zufriedene Mieter. Unser Hausmeisterservice übernimmt alle anfallenden Aufgaben rund um Ihr Gebäude."
      imageAlt="Zuverlässiger Hausmeisterservice für Wohn- und Gewerbeobjekte"
      keywords={["Hausmeister Berlin", "Hausmeisterservice Gewerbe", "Objektbetreuung", "Facility Service"]}
      features={[
        "Regelmäßige Objektbegehungen und Kontrollen",
        "Durchführung von Kleinreparaturen",
        "Schlüsselmanagement und Zutrittskontrolle",
        "Koordination von Handwerkern",
        "Ansprechpartner für Mieter vor Ort",
        "Dokumentation und Berichtswesen",
      ]}
      detailedFeatures={[
        { title: "Objektbegehungen", description: "Regelmäßige Kontrollgänge mit sofortiger Mängeldokumentation.", icon: Eye },
        { title: "Kleinreparaturen", description: "Schnelle Erledigung von Reparaturen vor Ort.", icon: Wrench },
        { title: "Schlüsselmanagement", description: "Sichere Verwaltung aller Objektschlüssel.", icon: Key },
        { title: "Dienstleisterkoordination", description: "Zentrale Koordination aller Handwerker.", icon: Users },
        { title: "Gebäudebetreuung", description: "Umfassende Betreuung vom Keller bis zum Dach.", icon: Home },
        { title: "Dokumentation", description: "Digitale Protokollierung aller Tätigkeiten.", icon: ClipboardCheck },
      ]}
      benefits={["Fester Ansprechpartner", "Schnelle Reaktion", "Werterhaltung", "Zufriedene Mieter", "Entlastung der Verwaltung", "Transparente Kosten"]}
      faqs={[
        { question: "Wie oft ist der Hausmeister vor Ort?", answer: "2-5 Besuche pro Woche, bei größeren Objekten auch tägliche Präsenz." },
        { question: "Welche Reparaturen werden durchgeführt?", answer: "Alle handwerklichen Kleinreparaturen wie Leuchtmittelwechsel, Türjustierung oder kleinere Malerarbeiten." },
      ]}
    />
  );
}
