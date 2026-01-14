import type { Metadata } from "next";
import LED from "@/app/leistungen/elektrotechnik/led/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: LED-Umrüstung & Beleuchtungssanierung",
  description: "LED-Umrüstung für Gewerbe, Industrie und Wohnanlagen. Bis zu 70% Energieeinsparung durch moderne Beleuchtungslösungen.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/led",
  },
};

export default function HandwerkElektrotechnikLED() {
  return <LED />;
}
