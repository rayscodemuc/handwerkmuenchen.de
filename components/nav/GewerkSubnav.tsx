"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GEWERKE } from "@/lib/leistungen/config";
import { ALLOWED_GEWERK_SLUGS, gewerkSlugToLabel } from "@/lib/referenzen/projects";
import { cn } from "@/lib/utils";

/** Zeige nur auf /leistungen* und /projekte*. */
function shouldShow(pathname: string): boolean {
  return pathname.startsWith("/leistungen") || pathname.startsWith("/projekte");
}

/** Ist aktuell eine konkrete Gewerk-Seite (nicht Hub)? */
function hasActiveGewerk(pathname: string, basePath: string): boolean {
  if (basePath === "/leistungen") {
    const rest = pathname.slice("/leistungen".length);
    return rest.length > 1 && rest.startsWith("/");
  }
  if (basePath === "/projekte") {
    const rest = pathname.slice("/projekte".length);
    return rest.length > 1 && rest.startsWith("/");
  }
  return false;
}

export function GewerkSubnav() {
  const pathname = usePathname();

  if (!shouldShow(pathname)) return null;

  const basePath = pathname.startsWith("/leistungen")
    ? "/leistungen"
    : "/projekte";

  const isLeistungen = basePath === "/leistungen";

  const items = isLeistungen
    ? NAV_GEWERKE.map((g) => ({ slug: g.slug, label: g.name }))
    : ALLOWED_GEWERK_SLUGS.map((slug) => ({
        slug,
        label: gewerkSlugToLabel[slug],
      }));

  const onHub =
    pathname === "/leistungen" || pathname === "/projekte";
  const anyGewerkActive = hasActiveGewerk(pathname, basePath);

  return (
    <nav
      className="lg:hidden border-b border-white/10 bg-[#26413C]"
      aria-label="Gewerke"
    >
      <div className="overflow-x-auto overscroll-x-contain scrollbar-none">
        <div className="flex min-h-[44px] items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">
          {items.map(({ slug, label }) => {
            const href = `${basePath}/${slug}`;
            const isActive =
              pathname === href || (isLeistungen && pathname.startsWith(href + "/"));
            const isDimmed = anyGewerkActive && !isActive;

            return (
              <Link
                key={slug}
                href={href}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap",
                  "min-h-[40px] inline-flex items-center justify-center",
                  isActive
                    ? "bg-white/20 text-white border border-white/30"
                    : isDimmed
                      ? "text-white/50 border border-transparent hover:bg-white/10 hover:text-white/80"
                      : "text-white/90 border border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
