import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Sparkles, Layers, Sun, Droplets, Home, CheckCircle, Shield, Clock, Calendar } from "lucide-react";

export default function Grundreinigung() {
  return (
    <BlogServicePageLayout
      title="Grundreinigung"
      subtitle="Intensive Tiefenreinigung & Übergabereinigung"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Grundreinigung für Gewerbeimmobilien. Intensive Tiefenreinigung aller Flächen mit dokumentierter Abnahme."
      intro="Die Grundreinigung ist der Reset-Knopf für Ihre Immobilie. Nach Renovierung, bei Mieterwechsel oder wenn die reguläre Reinigung nicht mehr ausreicht – eine professionelle Grundreinigung schafft den Ausgangszustand für langfristige Sauberkeit zurück. Für Hausverwaltungen und Property Manager ist sie unverzichtbar bei Übergaben und Neuvermietungen."
      imageSrc=""
      imageAlt="Professionelle Grundreinigung in Gewerbeimmobilie"
      imageCaption="Intensive Tiefenreinigung für bezugsfertige Räumlichkeiten"
      sections={[
        {
          title: "Von Boden bis Decke – kein Detail ausgelassen",
          content: "Bei einer Grundreinigung wird jede Fläche intensiv behandelt: Böden werden maschinell gereinigt, Heizkörper entstaubt, Leuchten demontiert und gereinigt, Fenster und Rahmen gesäubert, Sanitärbereiche entkalkt, Schränke und Regale innen gereinigt. Das Ergebnis ist ein Gebäude, das aussieht wie neu."
        },
        {
          title: "Perfekte Basis für laufende Pflege",
          content: "Nach einer professionellen Grundreinigung ist die regelmäßige Unterhaltsreinigung wesentlich effizienter. Der Sauberkeitszustand bleibt länger erhalten, die Reinigungszeiten verkürzen sich und die Kosten sinken langfristig. Die Investition in eine Grundreinigung zahlt sich mehrfach aus."
        },
        {
          title: "Dokumentierte Übergabe",
          content: "Bei Mieterwechseln oder Übergaben führen wir eine gemeinsame Abnahme mit Protokoll und Fotodokumentation durch. So vermeiden Sie Streitigkeiten über den Zustand und haben rechtssichere Nachweise für Kautionsabrechnungen."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Übergabefertig mit Abnahmeprotokoll",
        text: "Nach Abschluss der Grundreinigung führen wir gemeinsam mit Ihnen eine Qualitätskontrolle durch. Das Abnahmeprotokoll mit Fotodokumentation ist Ihr Nachweis für einwandfreien Übergabezustand."
      }}
      stats={[
        { value: "100%", label: "Alle Flächen" },
        { value: "1-3 Tage", label: "Durchführung" },
        { value: "Protokoll", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Bodenintensivierung", description: "Maschinelle Tiefenreinigung aller Bodenbeläge.", icon: Layers },
        { title: "Oberflächenpflege", description: "Intensive Reinigung aller Flächen und Details.", icon: Sparkles },
        { title: "Leuchtenreinigung", description: "Demontage und Reinigung für maximales Licht.", icon: Sun },
        { title: "Sanitärentkalkung", description: "Intensive Entkalkung und Desinfektion.", icon: Droplets },
        { title: "Komplettreinigung", description: "Vom Boden bis zur Decke, alle Bereiche.", icon: Home },
        { title: "Dokumentierte Abnahme", description: "Protokoll mit Fotodokumentation.", icon: CheckCircle }
      ]}
      quote="Eine professionelle Grundreinigung verlängert die Lebensdauer Ihrer Bodenbeläge um Jahre und reduziert langfristig die Reinigungskosten."
      faqs={[
        { 
          question: "Wann ist eine Grundreinigung notwendig?", 
          answer: "Bei Mieterwechsel, nach Renovierung oder Bauarbeiten, bei starker Verschmutzung oder wenn die reguläre Unterhaltsreinigung nicht mehr ausreicht. Auch als jährliche Intensivpflege empfohlen." 
        },
        { 
          question: "Wie lange dauert eine Grundreinigung?", 
          answer: "Je nach Fläche und Verschmutzungsgrad 1-3 Tage. Eine 500 m² Bürofläche ist typischerweise in 1-2 Tagen fertig. Wir arbeiten auch nachts oder am Wochenende." 
        },
        { 
          question: "Was ist im Leistungsumfang enthalten?", 
          answer: "Standard: Maschinelle Bodenreinigung, Fenster mit Rahmen, Heizkörper, Leuchten, Sanitärbereiche, Türen und Zargen, Schränke innen. Erweiterbar um Spezialleistungen wie Teppichreinigung oder Steinpflege." 
        },
        { 
          question: "Erhalten wir ein Abnahmeprotokoll?", 
          answer: "Ja, bei Übergaben führen wir eine gemeinsame Abnahme mit Protokoll und Fotodokumentation durch. Rechtssicher für Kautionsabrechnungen und Mietvertragsübergaben." 
        },
        { 
          question: "Wie oft sollte grundgereinigt werden?", 
          answer: "Mindestens einmal jährlich als Intensivpflege, zusätzlich bei Mieterwechsel oder nach Baumaßnahmen. Bei stark frequentierten Objekten auch halbjährlich." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
        { label: "Sonderreinigung", href: "/reinigung/sonderreinigung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Grundreinigung Gewerbe",
        "Tiefenreinigung",
        "Intensivreinigung",
        "Übergabereinigung",
        "Bodenreinigung",
        "Mieterwechsel Reinigung"
      ]}
      trustBadges={[
        { icon: CheckCircle, label: "Abnahmeprotokoll" },
        { icon: Layers, label: "Maschinelle Reinigung" },
        { icon: Clock, label: "1-3 Tage" }
      ]}
    />
  );
}
