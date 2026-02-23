"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

/** Zeigt den Footer nur außerhalb von /admin und /login. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/login") return null;
  return <Footer />;
}
