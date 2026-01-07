import LocationPageLayout from "./LocationPageLayout";

export default function Berlin() {
  return (
    <LocationPageLayout
      city="Berlin"
      seoTitle="Gebäudeservice & Handwerk in Berlin | Mr. Clean Services"
      seoDescription="Professionelle Gebäudereinigung und Facility Management in Berlin. Wir koordinieren Handwerk und Service effizient aus einer Hand."
      districts={["Mitte", "Charlottenburg", "Kreuzberg", "Prenzlauer Berg", "Friedrichshain", "Steglitz"]}
      localHighlight="Von Mitte bis Charlottenburg, von Kreuzberg bis Prenzlauer Berg – unser Berliner Team ist in allen Bezirken der Hauptstadt für Sie da."
    />
  );
}
