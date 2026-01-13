import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Wrench, Sparkles, Building, Droplets, ShieldCheck, Trash2, AlertTriangle, Clock, CheckCircle } from "lucide-react";

export default function Sonderreinigung() {
  return (
    <BlogServicePageLayout
      title="Sonderreinigung"
      subtitle="Spezialisierte Reinigung für besondere Anforderungen"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Sonderreinigung für Gewerbeimmobilien. Baureinigung, Industriereinigung, Desinfektion nach RKI und Schadensreinigung."
      intro="Manchmal reicht die reguläre Reinigung nicht aus. Baurückstände, Industrieverschmutzungen, Kontaminationen oder Schadensbeseitigung erfordern spezialisierte Verfahren und Expertise. Unsere Sonderreinigung deckt alle Fälle ab, in denen Standardreinigung an ihre Grenzen stößt – mit zertifizierten Verfahren und dokumentierter Qualität."
      imageSrc=""
      imageAlt="Professionelle Baureinigung nach Renovierung"
      imageCaption="Spezialisierte Reinigungsverfahren für anspruchsvolle Aufgaben"
      sections={[
        {
          title: "Baureinigung nach Renovierung oder Neubau",
          content: "Baustaub, Mörtelreste, Schutzfolien und Farbspritzer – nach Bauarbeiten ist professionelle Endreinigung Pflicht. Wir entfernen alle Baurückstände gründlich und übergeben bezugsfertige Räumlichkeiten. Für Bauträger und Generalunternehmer auch mit Abnahmeprotokoll."
        },
        {
          title: "Industriereinigung für Produktionsflächen",
          content: "Produktionshallen, Lagerflächen und technische Anlagen erfordern spezielle Reinigungsverfahren. Wir entfernen Öl, Fett, Produktionsrückstände und Staub mit industrietauglicher Technik – auch in laufender Produktion nach Abstimmung möglich."
        },
        {
          title: "Desinfektion nach RKI-Richtlinien",
          content: "Für sensible Bereiche wie Gesundheitswesen, Lebensmittelverarbeitung oder nach Kontaminationen führen wir professionelle Desinfektion nach RKI-Richtlinien durch. Dokumentiert, zertifiziert und mit Wirksamkeitsnachweis."
        }
      ]}
      highlightBox={{
        icon: ShieldCheck,
        title: "RKI-konforme Desinfektion",
        text: "Für Arztpraxen, Kliniken, Labore und Lebensmittelbetriebe führen wir Desinfektionsreinigung nach RKI-Richtlinien durch. Mit Wirksamkeitsnachweis und Dokumentation für Gesundheitsämter."
      }}
      stats={[
        { value: "RKI", label: "Zertifiziert" },
        { value: "24h", label: "Notfall-Service" },
        { value: "100%", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Baureinigung", description: "Endreinigung nach Bau- oder Renovierungsarbeiten.", icon: Wrench },
        { title: "Teppichreinigung", description: "Tiefenreinigung und Fleckentfernung von Textilien.", icon: Sparkles },
        { title: "Industriereinigung", description: "Produktions- und Lagerflächen, Maschinen.", icon: Building },
        { title: "Desinfektion", description: "RKI-konforme Desinfektionsreinigung.", icon: ShieldCheck },
        { title: "Steinpflege", description: "Reinigung, Imprägnierung und Versiegelung.", icon: Droplets },
        { title: "Entrümpelung", description: "Räumung, Entsorgung und Reinigung.", icon: Trash2 }
      ]}
      quote="Bei Wasserschäden, Brandschäden oder Kontaminationen sind wir innerhalb von 24 Stunden vor Ort – mit der richtigen Ausrüstung und dem richtigen Know-how."
      faqs={[
        { 
          question: "Was umfasst eine Baureinigung?", 
          answer: "Entfernung von Baustaub, Reinigung aller Oberflächen, Fenster mit Rahmen, Sanitärbereiche, Bodenbehandlung und Entsorgung von Baurückständen. Auf Wunsch mit Abnahmeprotokoll." 
        },
        { 
          question: "Können Sie auch laufende Produktionen reinigen?", 
          answer: "Ja, nach Abstimmung reinigen wir auch in laufender Produktion – nachts, am Wochenende oder in geplanten Stillstandszeiten. Wir halten alle Arbeitssicherheitsvorschriften ein." 
        },
        { 
          question: "Wie schnell sind Sie bei Notfällen vor Ort?", 
          answer: "Bei Wasserschäden, Brandschäden oder dringenden Desinfektionen sind wir innerhalb von 24 Stunden, oft schneller vor Ort. Notfall-Hotline rund um die Uhr erreichbar." 
        },
        { 
          question: "Erhalten wir Nachweise für Desinfektion?", 
          answer: "Ja, bei RKI-konformer Desinfektion erhalten Sie dokumentierte Nachweise mit Wirksamkeitsbestätigung – für Gesundheitsämter, Versicherungen und interne Qualitätssicherung." 
        },
        { 
          question: "Welche Bodenbeläge können Sie behandeln?", 
          answer: "Alle gängigen Beläge: Teppich, Linoleum, PVC, Naturstein, Beton, Parkett, Fliesen. Für jeden Belag wählen wir das passende Reinigungs- und Pflegeverfahren." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "Tiefgaragenreinigung", href: "/reinigung/tiefgaragenreinigung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Sonderreinigung Gewerbe",
        "Baureinigung",
        "Industriereinigung",
        "Desinfektion RKI",
        "Teppichreinigung",
        "Schadensreinigung"
      ]}
      trustBadges={[
        { icon: ShieldCheck, label: "RKI-zertifiziert" },
        { icon: Clock, label: "24h Notfall-Service" },
        { icon: CheckCircle, label: "Dokumentiert" }
      ]}
    />
  );
}
