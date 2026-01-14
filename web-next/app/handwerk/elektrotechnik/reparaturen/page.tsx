import type { Metadata } from "next";
import Reparaturen from "@/app/leistungen/elektrotechnik/reparaturen/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Elektro-Reparaturen",
  description: "Schnelle Elektro-Reparaturen: Steckdosen, Sicherungen, Kabelschäden und Geräteanschlüsse. Zuverlässiger Service vom Meisterbetrieb.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/reparaturen",
  },
};

export default function HandwerkElektrotechnikReparaturen() {
  return <Reparaturen />;
}
