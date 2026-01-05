import { CategoryPageLayout } from "./CategoryPageLayout";

const services = [
  {
    title: "Grünpflege",
    description: "Professioneller Rasen- und Heckenschnitt für gepflegte Außenanlagen und positiven ersten Eindruck.",
    href: "/aussenanlagen/gruenpflege",
  },
  {
    title: "Baumpflege",
    description: "Verkehrssicherheit und Ästhetik durch professionelle Baumpflege von zertifizierten Experten.",
    href: "/aussenanlagen/baumpflege",
  },
  {
    title: "Grauflächenreinigung",
    description: "Saubere Parkplätze und Wege für einen gepflegten Gesamteindruck Ihrer Immobilie.",
    href: "/aussenanlagen/grauflaechenreinigung",
  },
  {
    title: "Winterdienst",
    description: "Sichere Wege und Flächen im Winter mit professioneller Schneeräumung und Streudienst.",
    href: "/aussenanlagen/winterdienst",
  },
];

export default function AussenanlagenCategory() {
  return (
    <CategoryPageLayout
      title="Außenanlagen"
      subtitle="Unsere Leistungen"
      description="Ganzheitliche Pflege Ihrer Außenanlagen für sichere und ansprechende Grundstücke."
      services={services}
    />
  );
}
