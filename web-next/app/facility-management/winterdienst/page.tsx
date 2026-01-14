import type { Metadata } from "next";
import Winterdienst from "@/app/leistungen/winterdienst/page";

export const metadata: Metadata = {
  title: "Facility Management: Winterdienst",
  description: "Professioneller Winterdienst mit vollständiger Haftungsübernahme. Schneeräumung und Streudienst mit GPS-dokumentierten Einsätzen, 24/7 Bereitschaft.",
  alternates: {
    canonical: "/facility-management/winterdienst",
  },
};

export default function FacilityManagementWinterdienst() {
  return <Winterdienst />;
}
