import type { Metadata } from "next";
import Objektmanagement from "@/app/leistungen/objektmanagement/page";

export const metadata: Metadata = {
  title: "Facility Management: Objektmanagement",
  description: "Strategisches Objektmanagement für Gewerbeimmobilien. Zentrale Steuerung aller Gewerke, datenbasiertes Reporting und langfristige Werterhaltung.",
  alternates: {
    canonical: "/facility-management/objektmanagement",
  },
};

export default function FacilityManagementObjektmanagement() {
  return <Objektmanagement />;
}
