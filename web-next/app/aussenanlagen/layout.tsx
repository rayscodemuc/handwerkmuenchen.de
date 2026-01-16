import { AreaServiceSchema } from "@/lib/components/AreaServiceSchema";
import { AUSSENANLAGEN_SERVICE_MAP } from "@/lib/serviceMap";

export default function AussenanlagenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AreaServiceSchema
        areaPrefix="/aussenanlagen"
        serviceMap={AUSSENANLAGEN_SERVICE_MAP}
        defaultClusterName="Außenanlagenpflege"
      />
      {children}
    </>
  );
}
