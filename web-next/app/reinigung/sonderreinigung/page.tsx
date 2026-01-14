import type { Metadata } from "next";
import Sonderreinigung from "@/app/leistungen/sonderreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Sonderreinigung",
  description: "Professionelle Sonderreinigung für Gewerbeimmobilien. Baureinigung, Industriereinigung, Desinfektion nach RKI und Schadensreinigung.",
  alternates: {
    canonical: "/reinigung/sonderreinigung",
  },
};

export default function ReinigungSonderreinigung() {
  return <Sonderreinigung />;
}
