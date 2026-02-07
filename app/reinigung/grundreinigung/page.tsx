import type { Metadata } from "next";
import Grundreinigung from "@/app/leistungen/grundreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Grundreinigung",
  description: "Professionelle Grundreinigung für Gewerbeimmobilien. Intensive Tiefenreinigung aller Flächen mit dokumentierter Abnahme.",
  alternates: {
    canonical: "/reinigung/grundreinigung",
  },
};

export default function ReinigungGrundreinigung() {
  return <Grundreinigung />;
}
