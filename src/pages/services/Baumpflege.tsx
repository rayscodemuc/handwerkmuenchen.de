import { ServicePageLayout } from "./ServicePageLayout";
import { TreeDeciduous, Scissors, Shield, AlertTriangle, FileText, Eye } from "lucide-react";

export default function Baumpflege() {
  return (
    <ServicePageLayout
      title="Baumpflege"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Baumpflege in Berlin für gesunde Bäume und sichere Grundstücke. Baumschnitt, Fällung und Verkehrssicherungsprüfung."
      longDescription="Bäume brauchen regelmäßige Pflege für Gesundheit und Sicherheit. Unsere zertifizierten Baumpfleger sorgen für fachgerechte Behandlung."
      imageAlt="Fachgerechte Baumpflege und Baumschnitt durch zertifizierte Experten"
      keywords={["Baumpflege Berlin", "Baumschnitt", "Baumfällung", "Verkehrssicherung Bäume"]}
      features={[
        "Baumschnitt und Kronenrückschnitt",
        "Totholzentfernung",
        "Baumfällung mit Genehmigung",
        "Sturmschadensbeseitigung",
        "Baumkontrolle nach FLL",
        "Kronensicherung",
      ]}
      detailedFeatures={[
        { title: "Baumschnitt", description: "Fachgerechter Schnitt für gesundes Wachstum.", icon: Scissors },
        { title: "Kronenpflege", description: "Auslichtung und Formgebung der Baumkrone.", icon: TreeDeciduous },
        { title: "Verkehrssicherung", description: "Entfernung von Totholz und Gefahrenästen.", icon: Shield },
        { title: "Sturmschäden", description: "Schnelle Hilfe bei Sturmschäden und umgestürzten Bäumen.", icon: AlertTriangle },
        { title: "Baumkontrolle", description: "Regelmäßige Prüfung nach FLL-Richtlinien.", icon: Eye },
        { title: "Dokumentation", description: "Baumkataster und Pflegedokumentation.", icon: FileText },
      ]}
      benefits={["Fachgerechte Pflege", "Verkehrssicherheit", "Gesunde Bäume", "Schnelle Hilfe", "Zertifizierte Mitarbeiter", "Dokumentation"]}
      faqs={[
        { question: "Wann ist der beste Zeitpunkt für Baumschnitt?", answer: "Die meisten Schnittarbeiten erfolgen im Spätwinter, Totholz kann ganzjährig entfernt werden." },
        { question: "Brauche ich eine Genehmigung für Baumfällung?", answer: "In den meisten Fällen ja. Wir beraten Sie und übernehmen die Antragstellung." },
      ]}
    />
  );
}
