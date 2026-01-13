import LocationPageLayout from "./LocationPageLayout";

export default function Ingolstadt() {
  return (
    <LocationPageLayout
      city="Ingolstadt"
      seoTitle="Gebäudereinigung & Handwerk in Ingolstadt | Mr. Clean Services"
      seoDescription="Ihr Partner für Facility Management und Gebäudeservice in Ingolstadt. Reinigung, Handwerk und Außenanlagenpflege für Industrie und Gewerbe."
      districts={["Altstadt", "Nordwest", "Südwest", "Friedrichshofen", "Etting", "Mailing"]}
      localHighlight="Von der Altstadt bis zum Industriegebiet Nord – wir betreuen Objekte in ganz Ingolstadt. Besonders für Industrie- und Gewerbeobjekte bieten wir maßgeschneiderte Lösungen."
      heroAltText="Facility Management und Reinigung für Industrieobjekte in Ingolstadt"
    />
  );
}
