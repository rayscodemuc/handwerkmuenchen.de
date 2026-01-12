import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { TreeDeciduous, Scissors, Shield, AlertTriangle, FileText, Eye } from "lucide-react";

export default function Baumpflege() {
  return (
    <BlogServicePageLayout
      title="Baumpflege"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Baumpflege für gesunde Bäume und sichere Grundstücke. Baumschnitt, Fällung und Verkehrssicherungsprüfung."
      intro="Bäume sind ein wertvolles Gut auf Ihrem Grundstück – aber sie brauchen regelmäßige Pflege für Gesundheit und Sicherheit. Unsere zertifizierten Baumpfleger sorgen für fachgerechte Behandlung nach FLL-Richtlinien."
      sections={[
        {
          title: "Verkehrssicherungspflicht erfüllen",
          content: "Als Grundstückseigentümer haften Sie für Schäden durch herabfallende Äste oder umstürzende Bäume. Regelmäßige Baumkontrollen nach FLL-Richtlinien dokumentieren die Erfüllung Ihrer Verkehrssicherungspflicht.",
        },
        {
          title: "Fachgerechte Baumpflege",
          content: "Vom Formschnitt junger Bäume über die Kronenpflege bis zur Totholzentfernung – wir führen alle Arbeiten nach den Vorgaben der ZTV-Baumpflege durch.",
        },
      ]}
      highlightBox={{
        icon: Shield,
        title: "Vollständige Dokumentation",
        text: "Jede Baumkontrolle wird in einem digitalen Baumkataster dokumentiert – rechtssicher und jederzeit abrufbar für Versicherungen und Behörden.",
      }}
      stats={[
        { value: "FLL", label: "Zertifiziert" },
        { value: "24h", label: "Sturmschaden-Hilfe" },
        { value: "100%", label: "Dokumentiert" },
      ]}
      services={[
        { title: "Baumschnitt", description: "Fachgerechter Schnitt für gesundes Wachstum.", icon: Scissors },
        { title: "Kronenpflege", description: "Auslichtung und Formgebung der Baumkrone.", icon: TreeDeciduous },
        { title: "Verkehrssicherung", description: "Entfernung von Totholz und Gefahrenästen.", icon: Shield },
        { title: "Sturmschäden", description: "Schnelle Hilfe bei umgestürzten Bäumen.", icon: AlertTriangle },
        { title: "Baumkontrolle", description: "Regelmäßige Prüfung nach FLL-Richtlinien.", icon: Eye },
        { title: "Baumkataster", description: "Digitale Dokumentation aller Bäume.", icon: FileText },
      ]}
      quote="Gesunde Bäume steigern den Wert Ihrer Immobilie und schaffen eine angenehme Atmosphäre für Mieter und Besucher."
      faqs={[
        { question: "Wann ist der beste Zeitpunkt für Baumschnitt?", answer: "Die meisten Schnittarbeiten erfolgen im Spätwinter (Februar/März). Totholz kann ganzjährig entfernt werden." },
        { question: "Brauche ich eine Genehmigung für Baumfällung?", answer: "In den meisten Fällen ja. Wir beraten Sie und übernehmen die Antragstellung bei der zuständigen Behörde." },
      ]}
      relatedLinks={[
        { label: "Alle Außenanlagen-Leistungen", href: "/aussenanlagen" },
        { label: "Grünpflege", href: "/aussenanlagen/gruenpflege" },
        { label: "Berlin", href: "/standorte/berlin" },
        { label: "München", href: "/standorte/muenchen" },
      ]}
      keywords={["Baumpflege", "Baumschnitt", "Baumfällung", "Verkehrssicherung", "FLL"]}
    />
  );
}
