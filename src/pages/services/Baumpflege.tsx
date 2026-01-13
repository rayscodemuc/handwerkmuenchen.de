import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { TreeDeciduous, Scissors, Shield, AlertTriangle, FileText, Eye, Clock, CheckCircle } from "lucide-react";

export default function Baumpflege() {
  return (
    <BlogServicePageLayout
      title="Baumpflege"
      subtitle="Verkehrssicherung & Baumkataster nach FLL"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Professionelle Baumpflege für Gewerbeimmobilien. Baumkontrolle, Kronenpflege und digitales Baumkataster für Haftungssicherheit."
      intro="Als Grundstückseigentümer haften Sie für Schäden durch herabfallende Äste oder umstürzende Bäume. Regelmäßige Baumkontrollen nach FLL-Richtlinien sind Pflicht – und der Nachweis im Schadensfall entscheidend. Wir übernehmen Kontrolle, Pflege und Dokumentation mit digitalem Baumkataster."
      imageSrc=""
      imageAlt="Professionelle Baumpflege durch zertifizierte Fachkräfte"
      imageCaption="FLL-zertifizierte Baumpflege für Verkehrssicherheit"
      sections={[
        { title: "Verkehrssicherungspflicht erfüllen", content: "Jährliche Baumkontrollen nach FLL-Richtlinien dokumentieren die Erfüllung Ihrer Verkehrssicherungspflicht. Im Schadensfall ist die lückenlose Dokumentation Ihr Schutz vor Haftungsansprüchen." },
        { title: "Fachgerechte Baumpflege nach ZTV", content: "Vom Formschnitt über Kronenpflege bis zur Totholzentfernung – alle Arbeiten nach ZTV-Baumpflege. Zertifizierte Baumpfleger mit Seilklettertechnik für alle Höhen." },
        { title: "Digitales Baumkataster", content: "Jeder Baum wird erfasst, kontrolliert und im digitalen Baumkataster dokumentiert. Mit Fotos, Maßnahmenhistorie und Terminüberwachung – jederzeit abrufbar für Behörden und Versicherungen." }
      ]}
      highlightBox={{ icon: Shield, title: "Rechtssichere Dokumentation", text: "Jede Baumkontrolle wird digital dokumentiert mit Fotos, Maßnahmenempfehlungen und Terminplanung. Gerichtsfest und jederzeit abrufbar." }}
      stats={[{ value: "FLL", label: "Zertifiziert" }, { value: "24h", label: "Sturmschaden-Hilfe" }, { value: "Digital", label: "Baumkataster" }]}
      services={[
        { title: "Baumkontrolle", description: "Jährliche Prüfung nach FLL-Richtlinien.", icon: Eye },
        { title: "Kronenpflege", description: "Auslichtung und Formgebung.", icon: TreeDeciduous },
        { title: "Totholzentfernung", description: "Verkehrssicherung durch Entfernung.", icon: Shield },
        { title: "Sturmschäden", description: "24h-Notdienst bei umgestürzten Bäumen.", icon: AlertTriangle },
        { title: "Baumschnitt", description: "Fachgerechter Schnitt nach ZTV.", icon: Scissors },
        { title: "Baumkataster", description: "Digitale Dokumentation aller Bäume.", icon: FileText }
      ]}
      quote="Bei Sturmschäden sind wir innerhalb von 24 Stunden vor Ort – für Absicherung, Räumung und Dokumentation."
      faqs={[
        { question: "Wann ist Baumschnitt erlaubt?", answer: "Hauptschnittzeit Februar/März vor dem Austrieb. Totholz und Verkehrssicherungsmaßnahmen ganzjährig möglich." },
        { question: "Brauche ich eine Genehmigung für Fällung?", answer: "In den meisten Fällen ja. Wir beraten Sie und übernehmen die Antragstellung." },
        { question: "Wie oft muss kontrolliert werden?", answer: "Mindestens jährlich, bei Risikobäumen halbjährlich oder nach Sturmereignissen." }
      ]}
      relatedLinks={[
        { label: "Außenanlagen", href: "/aussenanlagen" },
        { label: "Grünpflege", href: "/aussenanlagen/gruenpflege" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={["Baumpflege Gewerbe", "Baumkontrolle FLL", "Verkehrssicherung Bäume", "Baumkataster"]}
      trustBadges={[{ icon: Shield, label: "FLL-zertifiziert" }, { icon: Clock, label: "24h Notdienst" }, { icon: CheckCircle, label: "Dokumentiert" }]}
    />
  );
}
