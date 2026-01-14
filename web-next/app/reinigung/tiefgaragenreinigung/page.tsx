import type { Metadata } from "next";
import Tiefgaragenreinigung from "@/app/leistungen/tiefgaragenreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Tiefgaragenreinigung",
  description: "Professionelle Tiefgaragenreinigung für Wohn- und Gewerbeobjekte. Ölfleckentfernung, Entwässerungsreinigung und dokumentierte Verkehrssicherheit.",
  alternates: {
    canonical: "/reinigung/tiefgaragenreinigung",
  },
};

export default function ReinigungTiefgaragenreinigung() {
  return <Tiefgaragenreinigung />;
}
