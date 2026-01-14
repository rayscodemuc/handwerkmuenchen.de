import type { Metadata } from "next";
import Grauflaechenreinigung from "@/app/leistungen/grauflaechenreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Grauflächenreinigung",
  description: "Professionelle Grauflächenreinigung für Gewerbeimmobilien. Parkplätze, Wege und Hofflächen mit Kehrmaschinen und Hochdruckreinigung.",
  alternates: {
    canonical: "/reinigung/grauflaechenreinigung",
  },
};

export default function ReinigungGrauflaechenreinigung() {
  return <Grauflaechenreinigung />;
}
