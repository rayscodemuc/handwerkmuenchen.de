import type { Metadata } from "next";
import Baumpflege from "@/app/leistungen/baumpflege/page";

export const metadata: Metadata = {
  title: "Außenanlagen: Baumpflege",
  description: "Professionelle Baumpflege für Gewerbeimmobilien. Baumkontrolle, Kronenpflege und digitales Baumkataster für Haftungssicherheit.",
  alternates: {
    canonical: "/aussenanlagen/baumpflege",
  },
};

export default function AussenanlagenBaumpflege() {
  return <Baumpflege />;
}
