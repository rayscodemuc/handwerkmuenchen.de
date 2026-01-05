import { ServicePageLayout } from "./ServicePageLayout";

export default function Elektrotechnik() {
  return (
    <ServicePageLayout
      title="Elektrotechnik"
      subtitle="Technik"
      description="Rechtssichere Prüfung nach DGUV V3 und umfassende elektrotechnische Dienstleistungen für Ihre Immobilien. Unsere zertifizierten Fachkräfte sorgen für Sicherheit und Zuverlässigkeit."
      features={[
        "DGUV V3 Prüfungen für ortsveränderliche Geräte",
        "Prüfung ortsfester elektrischer Anlagen",
        "E-Check für Gewerbeobjekte",
        "Thermografie zur Fehleranalyse",
        "Dokumentation und Prüfprotokolle",
        "24/7 Notdienst bei Störungen",
      ]}
    />
  );
}
