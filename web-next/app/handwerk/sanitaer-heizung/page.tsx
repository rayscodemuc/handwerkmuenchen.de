import type { Metadata } from "next";
import SanitaerHeizung from "@/app/leistungen/sanitaer-heizung/page";

export const metadata: Metadata = {
  title: "Handwerk: Sanitär- & Heizungstechnik",
  description: "Zertifizierte Wartung und Instandhaltung technischer Gebäudeanlagen. Wir schützen Ihre Assets gegen Systemausfälle und Wasserschäden.",
  alternates: {
    canonical: "/handwerk/sanitaer-heizung",
  },
};

export default function HandwerkSanitaerHeizung() {
  return <SanitaerHeizung />;
}
