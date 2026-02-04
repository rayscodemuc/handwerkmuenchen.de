import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Generalunternehmer für Facility Management, Handwerk und Reinigung: ein Vertrag, ein Ansprechpartner. Meister pro Gewerk – keine Plattform, keine anonymen Subunternehmer.",
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
