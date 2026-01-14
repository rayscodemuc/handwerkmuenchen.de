import type { Metadata } from "next";
import Hauselektrik from "@/app/leistungen/elektrotechnik/hauselektrik/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Hauselektrik & Privatinstallationen",
  description: "Professionelle Elektroinstallationen für Privathaushalte: Steckdosen, Schalter, Beleuchtung und komplette Hausinstallationen vom Meisterbetrieb.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/hauselektrik",
  },
};

export default function HandwerkElektrotechnikHauselektrik() {
  return <Hauselektrik />;
}
