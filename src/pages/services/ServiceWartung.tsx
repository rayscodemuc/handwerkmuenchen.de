import { ServicePageLayout } from "./ServicePageLayout";

export default function ServiceWartung() {
  return (
    <ServicePageLayout
      title="Service & Wartung"
      subtitle="Handwerk"
      description="Vorbeugende Instandhaltung für maximale Betriebssicherheit. Regelmäßige Wartung Ihrer technischen Anlagen verlängert die Lebensdauer und verhindert kostspielige Ausfälle."
      features={[
        "Wartungsverträge nach Herstellervorgaben",
        "Regelmäßige Inspektionen aller Anlagen",
        "Dokumentierte Prüfprotokolle",
        "24/7 Notdienst bei Störungen",
        "Ersatzteilmanagement",
        "Digitales Wartungsportal",
      ]}
    />
  );
}
