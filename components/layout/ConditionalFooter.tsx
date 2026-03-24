"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

/** Zeigt den Footer nur außerhalb von /admin, /login und /auth. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname?.startsWith("/auth")
  )
    return null;
  return <Footer />;
}
