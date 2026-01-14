import type { Metadata } from "next";
import Neubau from "@/app/leistungen/elektrotechnik/neubau/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Elektroinstallation Neubau",
  description: "Komplette Elektroinstallation für Neubauten: Wohngebäude und Gewerbeobjekte. Von der Planung nach DIN 18015 bis zur Abnahme.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/neubau",
  },
};

export default function HandwerkElektrotechnikNeubau() {
  return <Neubau />;
}
