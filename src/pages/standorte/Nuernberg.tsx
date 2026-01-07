import LocationPageLayout from "./LocationPageLayout";

export default function Nuernberg() {
  return (
    <LocationPageLayout
      city="Nürnberg"
      seoTitle="Facility Management & Reinigung in Nürnberg | Mr. Clean Services"
      seoDescription="Professionelle Gebäudereinigung und Facility Management in Nürnberg. Handwerk, Reinigung und Objektbetreuung aus einer Hand."
      districts={["Altstadt", "St. Johannis", "Gostenhof", "Langwasser", "Röthenbach", "Zerzabelshof"]}
      localHighlight="Von der historischen Altstadt bis nach Langwasser und Röthenbach – unser Nürnberger Team betreut Objekte im gesamten Stadtgebiet und der Metropolregion."
    />
  );
}
