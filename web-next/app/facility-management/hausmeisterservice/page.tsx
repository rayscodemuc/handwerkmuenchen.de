import type { Metadata } from "next";
import Hausmeisterservice from "@/app/leistungen/hausmeisterservice/page";

export const metadata: Metadata = {
  title: "Facility Management: Hausmeisterservice",
  description: "Professioneller Hausmeisterservice für Gewerbeimmobilien und Wohnportfolios. Technische Objektbetreuung mit digitaler Dokumentation und garantierten SLAs.",
  alternates: {
    canonical: "/facility-management/hausmeisterservice",
  },
};

export default function FacilityManagementHausmeisterservice() {
  return <Hausmeisterservice />;
}
