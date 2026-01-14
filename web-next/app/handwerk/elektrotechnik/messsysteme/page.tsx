import type { Metadata } from "next";
import Messsysteme from "@/app/leistungen/elektrotechnik/messsysteme/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Zähler, Messsysteme & Energieverteilung",
  description: "Intelligente Messsysteme und moderne Energieverteilung: Smart Meter, Unterzähler und Zählerschrank-Modernisierung vom Fachbetrieb.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/messsysteme",
  },
};

export default function HandwerkElektrotechnikMesssysteme() {
  return <Messsysteme />;
}
