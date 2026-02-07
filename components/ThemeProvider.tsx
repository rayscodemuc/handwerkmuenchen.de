"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKontaktPage = pathname === "/kontakt";
  const isAboutPage = pathname === "/ueber-uns";

  useEffect(() => {
    const html = document.documentElement;
    
    // Remove all theme classes
    html.classList.remove("theme-contact", "theme-about");
    
    // Add appropriate theme class
    if (isKontaktPage) {
      html.classList.add("theme-contact");
    } else if (isAboutPage) {
      html.classList.add("theme-about");
    }
  }, [pathname, isKontaktPage, isAboutPage]);

  return <>{children}</>;
}
