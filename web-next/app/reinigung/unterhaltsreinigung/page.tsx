import type { Metadata } from "next";
import Unterhaltsreinigung from "@/app/leistungen/unterhaltsreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Unterhaltsreinigung",
  description: "Professionelle Unterhaltsreinigung für Büros, Praxen und Gewerbeobjekte. Planbare Intervalle, dokumentierte Qualität und nachhaltige Reinigungsmittel.",
  alternates: {
    canonical: "/reinigung/unterhaltsreinigung",
  },
};

export default function ReinigungUnterhaltsreinigung() {
  return <Unterhaltsreinigung />;
}
