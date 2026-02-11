"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/** Zeigt den Header nur außerhalb von /admin (Dashboard etc.). */
export function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Header />;
}
