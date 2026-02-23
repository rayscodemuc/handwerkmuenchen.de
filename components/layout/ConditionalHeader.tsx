"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/** Zeigt den Header nur außerhalb von /admin und /login. */
export function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/login") return null;
  return <Header />;
}
