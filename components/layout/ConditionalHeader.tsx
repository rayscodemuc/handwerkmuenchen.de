"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/** Zeigt den Header nur außerhalb von /admin, /login und /auth. */
export function ConditionalHeader() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname?.startsWith("/auth")
  )
    return null;
  return <Header />;
}
