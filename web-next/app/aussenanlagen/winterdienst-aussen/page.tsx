import type { Metadata } from "next";
import WinterdienstAussen from "@/app/leistungen/winterdienst-aussen/page";

export const metadata: Metadata = {
  title: "Außenanlagen: Winterdienst Außenanlagen",
  description: "Winterdienst für große Außenflächen mit vollständiger Haftungsübernahme. Parkplatzräumung und Streudienst für Wege, Höfe und Parkplätze mit GPS-Dokumentation.",
  alternates: {
    canonical: "/aussenanlagen/winterdienst-aussen",
  },
};

export default function AussenanlagenWinterdienstAussen() {
  return <WinterdienstAussen />;
}
