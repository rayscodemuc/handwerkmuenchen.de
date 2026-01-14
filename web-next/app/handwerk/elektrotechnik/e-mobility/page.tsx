import type { Metadata } from "next";
import EMobility from "@/app/leistungen/elektrotechnik/e-mobility/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: E-Mobility",
  description: "Wallbox Installation und Ladeinfrastruktur für Unternehmen, Wohnanlagen und Privathaushalte. Förderungsberatung und schlüsselfertige Installation vom zertifizierten Fachbetrieb.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/e-mobility",
  },
};

export default function HandwerkElektrotechnikEMobility() {
  return <EMobility />;
}
