import type { Metadata } from "next";
import Fensterreinigung from "@/app/leistungen/fensterreinigung/page";

export const metadata: Metadata = {
  title: "Reinigung: Fensterreinigung",
  description: "Professionelle Fensterreinigung für Gewerbeimmobilien. Streifenfreie Glasflächen, zertifizierte Höhenarbeiten und planbare Intervalle.",
  alternates: {
    canonical: "/reinigung/fensterreinigung",
  },
};

export default function ReinigungFensterreinigung() {
  return <Fensterreinigung />;
}
