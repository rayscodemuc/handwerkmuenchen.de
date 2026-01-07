import LocationPageLayout from "./LocationPageLayout";

export default function Hamburg() {
  return (
    <LocationPageLayout
      city="Hamburg"
      seoTitle="Facility Management & Reinigung in Hamburg | Mr. Clean Services"
      seoDescription="Ihr Full-Service Partner für Immobilien in Hamburg. Handwerk, Reinigung und Außenanlagenpflege in Profi-Qualität."
      districts={["Altstadt", "HafenCity", "Eimsbüttel", "Winterhude", "Wandsbek", "Harburg"]}
      localHighlight="Von der HafenCity bis Eimsbüttel, von Winterhude bis Harburg – wir betreuen Objekte in der gesamten Hansestadt und im Umland."
      heroAltText="Professionelle Reinigung und Facility Management in Hamburg HafenCity"
    />
  );
}
