import { ServicePageLayout } from "./ServicePageLayout";

export default function Winterdienst() {
  return (
    <ServicePageLayout
      title="Winterdienst"
      subtitle="Haftung & FM"
      description="100% Haftungsübernahme bei Eis und Schnee. Wir übernehmen die Verkehrssicherungspflicht für Ihre Liegenschaften und schützen Sie vor rechtlichen Risiken."
      features={[
        "Vollständige Haftungsübernahme",
        "24/7 Bereitschaft in der Wintersaison",
        "Schneeräumung und Streudienst",
        "GPS-dokumentierte Einsätze",
        "Professionelles Equipment",
        "Flexible Vertragsmodelle",
      ]}
    />
  );
}
