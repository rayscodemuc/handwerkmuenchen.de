import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns | Die Meisterrunde – Generalunternehmer in München",
  description: "Meistergewerke unter einem Dach, GU-Vertrag, dokumentierte Übergabe. Reinigung & Facility als Fachbetrieb.",
  alternates: {
    canonical: "/ueber-uns",
  },
};

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
