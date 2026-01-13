import LocationPageLayout from "./LocationPageLayout";

export default function Augsburg() {
  return (
    <LocationPageLayout
      city="Augsburg"
      seoTitle="Facility Management & Gebäudeservice in Augsburg | Mr. Clean Services"
      seoDescription="Professioneller Gebäudeservice in Augsburg: Reinigung, Handwerk und Facility Management aus einer Hand. Zuverlässig für Gewerbe und Privat."
      districts={["Innenstadt", "Lechhausen", "Oberhausen", "Haunstetten", "Göggingen", "Hochzoll"]}
      localHighlight="Von der Augsburger Innenstadt bis nach Lechhausen und Haunstetten – wir sind in allen Stadtteilen schnell vor Ort. Unser lokales Team kennt die Region und garantiert kurze Wege."
      heroAltText="Gebäudereinigung und Handwerksleistungen in Augsburg Innenstadt"
    />
  );
}
