"use client";

import { usePathname } from "next/navigation";
import { useGewerkHover } from "@/components/providers/GewerkHoverContext";

function getThemeForPath(pathname: string): "default" | "lightpage" | "home" {
  if (!pathname || pathname === "/") return "home";
  if (pathname.startsWith("/ueber-uns") || pathname.startsWith("/kontakt")) return "lightpage";
  return "default";
}

/** Wraps Header + Main so both inherit data-theme (e.g. home on start page). */
export function ThemeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hoveredGewerk } = useGewerkHover();
  const theme = getThemeForPath(pathname ?? "");
  const gewerkHoverValue = theme === "home" && hoveredGewerk ? hoveredGewerk : undefined;
  return (
    <div
      className="flex flex-col flex-1 transition-[background-color] duration-300"
      data-theme={theme}
      data-gewerk-hover={gewerkHoverValue ?? undefined}
    >
      {children}
    </div>
  );
}
