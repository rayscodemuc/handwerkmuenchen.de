import { ServicePageLayout } from "./ServicePageLayout";

export default function WinterdienstAussen() {
  return (
    <ServicePageLayout
      title="Winterdienst"
      subtitle="Außenanlagen"
      description="Sichere Wege und Flächen im Winter. Professionelle Schneeräumung und Streudienst für Ihre Außenanlagen mit vollständiger Dokumentation."
      features={[
        "Schneeräumung auf allen Verkehrsflächen",
        "Streudienst mit umweltfreundlichen Mitteln",
        "24/7 Bereitschaft bei Schneefall",
        "GPS-dokumentierte Einsätze",
        "Räumung von Parkplätzen und Zufahrten",
        "Haftungsübernahme für Verkehrssicherungspflicht",
      ]}
    />
  );
}
