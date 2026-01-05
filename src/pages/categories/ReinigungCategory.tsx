import { CategoryPageLayout } from "./CategoryPageLayout";

const services = [
  {
    title: "Unterhaltsreinigung",
    description: "Präzise Sauberkeit für Büros, Praxen und Gewerbeobjekte mit geschulten Reinigungskräften.",
    href: "/reinigung/unterhaltsreinigung",
  },
  {
    title: "Glas- & Fassadenpflege",
    description: "Image durch strahlende Optik. Professionelle Reinigung von Glasflächen und Fassaden.",
    href: "/reinigung/glas-fassade",
  },
  {
    title: "Sonderreinigung",
    description: "Tiefenpflege nach Bedarf – von der Baureinigung bis zur Teppichpflege.",
    href: "/reinigung/sonderreinigung",
  },
];

export default function ReinigungCategory() {
  return (
    <CategoryPageLayout
      title="Reinigung"
      subtitle="Unsere Leistungen"
      description="Professionelle Reinigungsdienstleistungen für hygienische und repräsentative Räumlichkeiten."
      services={services}
    />
  );
}
