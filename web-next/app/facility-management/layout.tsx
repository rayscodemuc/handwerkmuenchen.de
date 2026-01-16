import { AreaServiceSchema } from "@/lib/components/AreaServiceSchema";
import { FACILITY_SERVICE_MAP } from "@/lib/serviceMap";

export default function FacilityManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AreaServiceSchema
        areaPrefix="/facility-management"
        serviceMap={FACILITY_SERVICE_MAP}
        defaultClusterName="Facility Management"
      />
      {children}
    </>
  );
}
