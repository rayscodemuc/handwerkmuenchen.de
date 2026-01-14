import type { Metadata } from "next";
import GlasFassade from "@/app/leistungen/glas-fassade/page";

export const metadata: Metadata = {
  title: "Reinigung: Glas- & Fassadenpflege",
  description: "Professionelle Glas- und Fassadenreinigung für Gewerbeimmobilien. Alle Materialien, alle Höhen – mit zertifizierten Höhenarbeiten nach DGUV.",
  alternates: {
    canonical: "/reinigung/glas-fassade",
  },
};

export default function ReinigungGlasFassade() {
  return <GlasFassade />;
}
