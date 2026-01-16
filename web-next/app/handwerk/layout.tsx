import { AreaServiceSchema } from "@/lib/components/AreaServiceSchema";
import { HANDWERK_SERVICE_MAP } from "@/lib/serviceMap";

export default function HandwerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AreaServiceSchema
        areaPrefix="/handwerk"
        serviceMap={HANDWERK_SERVICE_MAP}
        defaultClusterName="Handwerk & Technik"
      />
      {children}
    </>
  );
}
