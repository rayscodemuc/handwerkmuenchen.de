import type { Metadata } from "next";
import Bueroreinigung from "@/app/leistungen/bueroreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Büroreinigung",
  description: "Professionelle Büroreinigung für Gewerbeimmobilien. Feste Teams, flexible Zeiten und dokumentierte Qualitätsstandards für produktive Arbeitsplätze.",
  alternates: {
    canonical: "/reinigung/bueroreinigung",
  },
};

export default function ReinigungBueroreinigung() {
  return <Bueroreinigung />;
}
