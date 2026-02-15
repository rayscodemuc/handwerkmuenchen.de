"use client";

import dynamic from "next/dynamic";

const EinsatzgebietMap = dynamic(
  () => import("@/components/EinsatzgebietMap").then((m) => m.EinsatzgebietMap),
  { ssr: false }
);

export function EinsatzgebietMapLoader() {
  return <EinsatzgebietMap />;
}
