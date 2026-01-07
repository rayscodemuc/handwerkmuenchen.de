import LocationPageLayout from "./LocationPageLayout";

export default function Muenchen() {
  return (
    <LocationPageLayout
      city="München"
      seoTitle="Facility Management & Handwerk in München | Mr. Clean Services"
      seoDescription="Ihr zuverlässiger Partner für Reinigung, Handwerk und Facility Management in München & Umland. Ein Ansprechpartner für alle Gewerke."
      districts={["Schwabing", "Bogenhausen", "Maxvorstadt", "Sendling", "Pasing", "Trudering"]}
      localHighlight="Von Schwabing bis Sendling, von Pasing bis Trudering – wir sind in allen Münchner Stadtteilen und im gesamten Umland für Sie im Einsatz."
    />
  );
}
