import { ServicePageLayout } from "./ServicePageLayout";

export default function Hausmeisterservice() {
  return (
    <ServicePageLayout
      title="Hausmeisterservice"
      subtitle="Haftung & FM"
      description="Präsenz und Kontrolle vor Ort durch unsere geschulten Hausmeister. Wir kümmern uns um den reibungslosen Betrieb Ihrer Immobilien."
      features={[
        "Regelmäßige Objektbegehungen",
        "Kleinreparaturen und Instandsetzung",
        "Kontrolle technischer Anlagen",
        "Ansprechpartner für Mieter und Nutzer",
        "Schlüsselverwaltung",
        "Dokumentation aller Tätigkeiten",
      ]}
    />
  );
}
