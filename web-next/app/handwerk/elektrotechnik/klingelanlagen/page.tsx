import type { Metadata } from "next";
import Klingelanlagen from "@/app/leistungen/elektrotechnik/klingelanlagen/page";

export const metadata: Metadata = {
  title: "Elektrotechnik: Klingelanlagen & Gebäudekommunikation",
  description: "Moderne Türsprechanlagen für Mehrfamilienhäuser: Audio, Video und IP-Sprechanlagen. Professionelle Installation und Wartung.",
  alternates: {
    canonical: "/handwerk/elektrotechnik/klingelanlagen",
  },
};

export default function HandwerkElektrotechnikKlingelanlagen() {
  return <Klingelanlagen />;
}
