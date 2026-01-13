import LocationPageLayout from "./LocationPageLayout";

export default function Frankfurt() {
  return (
    <LocationPageLayout
      city="Frankfurt"
      seoTitle="Gebäudeservice & Facility Management in Frankfurt | Mr. Clean Services"
      seoDescription="Full-Service für Immobilien in Frankfurt am Main: Gebäudereinigung, Handwerk und Facility Management für Gewerbe- und Wohnobjekte."
      districts={["Innenstadt", "Westend", "Sachsenhausen", "Bornheim", "Bockenheim", "Niederrad"]}
      localHighlight="Vom Bankenviertel bis nach Sachsenhausen und Bornheim – wir sind in der gesamten Mainmetropole präsent. Profitieren Sie von unserer Erfahrung mit anspruchsvollen Gewerbeobjekten."
      heroAltText="Gebäudemanagement und Reinigungsservice für Gewerbeobjekte in Frankfurt"
    />
  );
}
