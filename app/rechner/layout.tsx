import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Richtpreis berechnen",
  description: "Richtpreis zur Orientierung für wiederkehrende Facility-Leistungen: Reinigung, Tiefgarage, Hausmeisterservice, Winterdienst. Für Elektro, Sanitär, Maler: Angebot nach Check oder Vor-Ort-Termin.",
  alternates: {
    canonical: "/rechner",
  },
};

export default function RechnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
