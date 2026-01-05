import { CategoryPageLayout } from "./CategoryPageLayout";

const services = [
  {
    title: "Unterhaltsreinigung",
    description: "Präzise Sauberkeit für Büros, Praxen und Gewerbeobjekte mit geschulten Reinigungskräften.",
    href: "/reinigung/unterhaltsreinigung",
  },
  {
    title: "Büroreinigung",
    description: "Saubere Arbeitsplätze für produktive Mitarbeiter – täglich, wöchentlich oder nach Bedarf.",
    href: "/reinigung/bueroreinigung",
  },
  {
    title: "Fensterreinigung",
    description: "Streifenfreier Durchblick für Ihr Gebäude. Professionelle Glasreinigung innen und außen.",
    href: "/reinigung/fensterreinigung",
  },
  {
    title: "Sonderreinigung",
    description: "Tiefenpflege nach Bedarf – von der Grundreinigung bis zur Tiefgaragenreinigung.",
    href: "/reinigung/sonderreinigung",
  },
  {
    title: "Tiefgaragenreinigung",
    description: "Gründliche Reinigung für Tiefgaragen und Parkhäuser mit maschineller Bodenreinigung.",
    href: "/reinigung/tiefgaragenreinigung",
  },
  {
    title: "Grundreinigung",
    description: "Intensive Tiefenreinigung für alle Oberflächen – die perfekte Basis für die Unterhaltsreinigung.",
    href: "/reinigung/grundreinigung",
  },
];

export default function ReinigungCategory() {
  return (
    <CategoryPageLayout
      title="Reinigung"
      subtitle="Unsere Leistungen"
      description="Professionelle Reinigungsdienstleistungen für hygienische und repräsentative Räumlichkeiten."
      metaDescription="Glänzende Ergebnisse für Ihr Objekt: Unterhaltsreinigung, Glas- und Fensterreinigung sowie Sonderreinigungen (TG & Grundreinigung) vom Profi."
      services={services}
    />
  );
}
