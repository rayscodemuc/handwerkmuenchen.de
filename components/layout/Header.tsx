"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useGewerkHover, getGewerkHoverKey } from "@/components/providers/GewerkHoverContext";
import { NAV_GEWERKE } from "@/lib/leistungen/config";
import { MobileNav } from "@/components/nav/MobileNav";
import { GewerkSubnav } from "@/components/nav/GewerkSubnav";

const primaryNav = [
  { name: "Leistungen", href: "/leistungen" },
  { name: "Projekte", href: "/projekte" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Kontakt", href: "/kontakt" },
];

/** Zeige Gewerke-Leiste nur unter /leistungen und /projekte. */
function showGewerkeBar(pathname: string): boolean {
  return pathname.startsWith("/leistungen") || pathname.startsWith("/projekte");
}

/** Basis-Pfad für Gewerke-Links: /leistungen oder /projekte */
function getGewerkeBasePath(pathname: string): string {
  if (pathname.startsWith("/leistungen")) return "/leistungen";
  if (pathname.startsWith("/projekte")) return "/projekte";
  return "/leistungen";
}

/** Prüft, ob das Gewerk auf der aktuellen Seite aktiv ist (z. B. /leistungen/elektrotechnik). */
function isGewerkActive(pathname: string, basePath: string, slug: string): boolean {
  const prefix = `${basePath}/${slug}`;
  return pathname === prefix || pathname.startsWith(prefix + "/");
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredGewerkSlug, setHoveredGewerkSlug] = useState<string | null>(null);
  const { setHoveredGewerk } = useGewerkHover();
  
  // Scroll detection with small hysteresis to avoid jitter
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const SHRINK_AT = 80;
    const EXPAND_AT = 40;

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const next = isScrolledRef.current ? !(y < EXPAND_AT) : y > SHRINK_AT;

      if (next !== isScrolledRef.current) {
        isScrolledRef.current = next;
        setIsScrolled(next);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // Initialize on mount
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Header-Farben */
  const textColor = "text-white";
  const textColorMuted = "text-white/70";
  const borderColor = "border-white/20";
  const dividerBorder = "border-white/10";
  const hoverBg = "hover:bg-white/10";
  const activeDotBg = "bg-white";

  // Startseite: #3E505B, Anfrage: wie Hero (#8AB0AB), alle anderen: #26413C
  const headerBg =
    pathname === "/" ? "bg-[#3E505B]" : pathname === "/anfrage" ? "bg-[#8AB0AB]" : "bg-[#26413C]";

  return (
    <header className={`sticky top-0 z-50 w-full ${headerBg} transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-none"}`}>
      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      <div className="relative z-10">
      {/* Top-Nav */}
      <div className={`relative border-b ${dividerBorder}`}>
        <nav
          className={`container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8 transition-[height] duration-300 ease-out ${
            isScrolled ? "h-16" : "h-24"
          }`}
        >
          {/* Logo – führt auf / */}
          <div className="flex shrink-0">
            <Logo
              variant="header"
              height={isScrolled ? 36 : 44}
              className={`transition-transform duration-300 ${isScrolled ? "scale-[0.95]" : "scale-100"}`}
            />
          </div>

          {/* Desktop: Top-Nav Mitte (ab lg) */}
          <div className="hidden lg:flex lg:items-center lg:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {primaryNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/leistungen" && pathname.startsWith("/leistungen/")) ||
                (item.href === "/projekte" && pathname.startsWith("/projekte"));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-lg font-medium transition-colors ${
                    isActive ? textColor : `${textColorMuted} hover:${textColor}`
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${activeDotBg}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop: CTA rechts (ab lg) */}
          <div className="hidden lg:flex lg:items-center lg:shrink-0">
            <Link href="/anfrage">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full border border-transparent bg-[#4C626C] text-white px-6 hover:bg-[#8AB0AB] hover:text-[#26413C]"
              >
                Projekt anfragen
              </Button>
            </Link>
          </div>

          {/* Mobile: Burger (unter lg) */}
          <button
            type="button"
            className={`lg:hidden inline-flex items-center justify-center rounded-lg p-2 ${textColor} ${hoverBg} ml-auto`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
          >
            <span className="sr-only">Menü öffnen</span>
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>

      {/* Desktop: Secondary-Nav Gewerke (ab md, nur /leistungen und /projekte) */}
      {showGewerkeBar(pathname) && (
        <div
          className={`hidden md:block transition-[height,opacity] duration-300 ease-out ${
            isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-14 opacity-100 overflow-visible"
          }`}
        >
          <nav className="container mx-auto flex h-14 items-center justify-center gap-2 lg:gap-3 px-4 lg:px-8">
            {NAV_GEWERKE.map((item) => {
              const basePath = getGewerkeBasePath(pathname);
              const href = `${basePath}/${item.slug}`;
              const isActive = isGewerkActive(pathname, basePath, item.slug);
              const isHovered = hoveredGewerkSlug === item.slug;
              const hasAnyFocus = NAV_GEWERKE.some((i) => isGewerkActive(pathname, basePath, i.slug)) || hoveredGewerkSlug !== null;
              const isDimmed = hasAnyFocus && !isActive && !isHovered;
              return (
                <Link
                  key={item.name}
                  href={href}
                  className={`rounded-full px-4 py-2 font-semibold transition-all ${
                    isActive
                      ? "text-xl bg-white/20 text-white border border-white/30"
                      : isHovered
                        ? "text-xl text-white border border-transparent hover:bg-white/10 hover:border-white/20"
                        : isDimmed
                          ? "text-base text-white/50 border border-transparent hover:bg-white/10 hover:text-white hover:border-white/20"
                          : "text-xl text-white/85 border border-transparent hover:bg-white/10 hover:text-white hover:border-white/20"
                  }`}
                  onMouseEnter={() => {
                    setHoveredGewerkSlug(item.slug);
                    const key = getGewerkHoverKey(item.name);
                    if (key) setHoveredGewerk(key);
                  }}
                  onMouseLeave={() => {
                    setHoveredGewerkSlug(null);
                    const key = getGewerkHoverKey(item.name);
                    if (key) setHoveredGewerk(null);
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile: Gewerk-Pills nur auf /leistungen* und /projekte* */}
      <div className="lg:hidden">
        <GewerkSubnav />
      </div>
      </div>
    </header>
  );
}
