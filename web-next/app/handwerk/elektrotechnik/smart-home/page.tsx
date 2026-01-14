import type { Metadata } from "next";
import SmartHome from "@/app/leistungen/elektrotechnik/smart-home/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Smart Home & Gebäudeautomation",
  description: "Professionelle Smart Home Installation: KNX, Loxone, intelligente Lichtsteuerung, Heizungsautomation und Sicherheitstechnik vom Fachbetrieb.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/smart-home",
  },
};

export default function HandwerkElektrotechnikSmartHome() {
  return <SmartHome />;
}
