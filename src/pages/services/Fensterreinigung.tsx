import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Eye, Building, Sun, Droplets, Shield, Calendar, CheckCircle, Clock } from "lucide-react";

export default function Fensterreinigung() {
  return (
    <BlogServicePageLayout
      title="Fensterreinigung"
      subtitle="Glasreinigung & Höhenarbeiten nach DGUV"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Fensterreinigung für Gewerbeimmobilien. Streifenfreie Glasflächen, zertifizierte Höhenarbeiten und planbare Intervalle."
      intro="Für Property Manager und Facility-Verantwortliche ist die Fensterreinigung mehr als Ästhetik – sie ist Werterhalt und Mieterzufriedenheit. Verschmutzte Fenster reduzieren den Lichteinfall, beeinträchtigen das Arbeitsklima und signalisieren Vernachlässigung. Unsere professionelle Glasreinigung deckt alle Höhen ab – von der Erdgeschoss-Scheibe bis zur Hochhausfassade."
      imageSrc=""
      imageAlt="Professionelle Fensterreinigung an Gewerbegebäude"
      imageCaption="Streifenfreie Glasflächen für maximalen Lichteinfall"
      sections={[
        {
          title: "Mehr Licht, besseres Arbeitsklima",
          content: "Studien belegen: Verschmutzte Fenster reduzieren den Lichteinfall um bis zu 30 %. Das beeinträchtigt die Konzentration, erhöht den Energiebedarf für künstliche Beleuchtung und senkt die Mieterzufriedenheit. Regelmäßige professionelle Reinigung maximiert das natürliche Tageslicht und spart Stromkosten."
        },
        {
          title: "Zertifizierte Höhenarbeiten nach DGUV",
          content: "Für Glasflächen in großer Höhe setzen wir Hubarbeitsbühnen, Teleskopstangen und zertifizierte Industriekletterer ein. Unsere Mitarbeiter sind nach DGUV Vorschrift 38 geschult und für alle Höhenarbeiten zugelassen. Sicherheit hat oberste Priorität – für unser Team und für Ihren laufenden Betrieb."
        },
        {
          title: "Planbare Intervalle, transparente Kosten",
          content: "Für Gewerbeimmobilien empfehlen wir 4-12 Reinigungen pro Jahr, je nach Lage und Verschmutzungsgrad. Wir erstellen einen festen Jahresplan mit planbaren Kosten – keine Überraschungen, keine versteckten Zusatzkosten. Rahmen und Falze sind standardmäßig inklusive."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Vollständige Rahmenreinigung inklusive",
        text: "Fensterrahmen und Falze werden bei jeder Reinigung mitbehandelt. Das verhindert Schimmelbildung, verlängert die Lebensdauer der Dichtungen und sorgt für ein rundum gepflegtes Erscheinungsbild."
      }}
      stats={[
        { value: "30%", label: "Mehr Lichteinfall" },
        { value: "DGUV", label: "Zertifiziert" },
        { value: "4-12x", label: "Pro Jahr empfohlen" }
      ]}
      services={[
        { title: "Streifenfreie Reinigung", description: "Professionelle Technik für perfekte Glasflächen.", icon: Eye },
        { title: "Alle Gebäudetypen", description: "Vom Bürogebäude bis zum Hochhaus.", icon: Building },
        { title: "Maximales Tageslicht", description: "Saubere Fenster für mehr natürliches Licht.", icon: Sun },
        { title: "Schonende Methoden", description: "Materialschonend für alle Glasarten.", icon: Droplets },
        { title: "Zertifizierte Höhenarbeiten", description: "DGUV-geschulte Mitarbeiter für alle Höhen.", icon: Shield },
        { title: "Planbare Intervalle", description: "Fester Jahresplan mit transparenten Kosten.", icon: Calendar }
      ]}
      quote="Für Portfolios mit mehreren Gebäuden bieten wir Rahmenverträge mit koordinierten Reinigungsterminen, einheitlichen Standards und konsolidierter Abrechnung."
      faqs={[
        { 
          question: "Wie oft sollten Gewerbefenster gereinigt werden?", 
          answer: "Für Bürogebäude empfehlen wir 4-12 Reinigungen pro Jahr, je nach Lage (Stadtmitte vs. ländlich) und Umgebung (Baustellen, Industrie). Bei stark frequentierten Eingangsbereichen oft häufiger." 
        },
        { 
          question: "Sind Rahmen und Falze inklusive?", 
          answer: "Ja, Rahmen- und Falzreinigung ist bei uns standardmäßig in jeder Fensterreinigung enthalten. Das verhindert Schimmel und verlängert die Lebensdauer der Dichtungen." 
        },
        { 
          question: "Wie hoch können Sie reinigen?", 
          answer: "Mit Hubarbeitsbühnen und zertifizierten Industriekletterern erreichen wir jede Höhe – vom Erdgeschoss bis zum Hochhaus. Alle Arbeiten erfolgen nach DGUV Vorschrift 38." 
        },
        { 
          question: "Wird der Betrieb durch die Reinigung gestört?", 
          answer: "Nein, wir arbeiten außerhalb der Kernzeiten oder koordinieren mit Ihnen störungsfreie Zeitfenster. Die Reinigung erfolgt zügig und ohne Beeinträchtigung des laufenden Betriebs." 
        },
        { 
          question: "Können Sie mehrere Standorte betreuen?", 
          answer: "Ja, wir koordinieren Reinigungstermine für Portfolios mit mehreren Gebäuden. Einheitliche Standards, konsolidierte Abrechnung, ein Ansprechpartner." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Glas- & Fassadenpflege", href: "/reinigung/glas-fassade" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Fensterreinigung Gewerbe",
        "Glasreinigung",
        "Höhenarbeiten DGUV",
        "Fassadenreinigung",
        "Industriekletterer",
        "Gebäudereinigung"
      ]}
      trustBadges={[
        { icon: Shield, label: "DGUV-zertifiziert" },
        { icon: CheckCircle, label: "Rahmen inklusive" },
        { icon: Clock, label: "Planbare Termine" }
      ]}
    />
  );
}
