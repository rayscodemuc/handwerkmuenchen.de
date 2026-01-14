import type { Metadata } from "next";
import Gruenpflege from "@/app/leistungen/gruenpflege/page";

export const metadata: Metadata = {
  title: "Außenanlagen: Grünpflege",
  description: "Ganzjährige Grünpflege für Gewerbeimmobilien. Rasenpflege, Heckenschnitt, Beetpflege und Bewässerungsmanagement für repräsentative Außenanlagen.",
  alternates: {
    canonical: "/aussenanlagen/gruenpflege",
  },
};

export default function AussenanlagenGruenpflege() {
  return <Gruenpflege />;
}
