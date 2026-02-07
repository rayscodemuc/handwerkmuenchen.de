import { AreaServiceSchema } from "@/lib/components/AreaServiceSchema";
import { REINIGUNG_SERVICE_MAP } from "@/lib/serviceMap";

export default function ReinigungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AreaServiceSchema
        areaPrefix="/reinigung"
        serviceMap={REINIGUNG_SERVICE_MAP}
        defaultClusterName="Gebäudereinigung"
      />
      {children}
    </>
  );
}
