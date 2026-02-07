"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoPlaceholder } from "@/components/LogoPlaceholder";
import { useGewerkHover, getGewerkHoverKey } from "@/components/providers/GewerkHoverContext";

const primaryNav = [
  { name: "Leistungen", href: "/leistungen" },
  { name: "Projekte", href: "/meisterleistungen" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Kontakt", href: "/kontakt" },
];

// Gewerke – finale Routen unter /leistungen
const secondaryNav = [
  { name: "Elektrotechnik", href: "/leistungen/elektrotechnik" },
  { name: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" },
  { name: "Innenausbau", href: "/leistungen/innenausbau" },
  { name: "Reinigung & Facility", href: "/leistungen/reinigung-facility" },
];

function isSecondaryActive(pathname: string, item: { name: string; href: string }): boolean {
  if (item.name === "Elektrotechnik") {
    return pathname === "/leistungen/elektrotechnik" || pathname.startsWith("/leistungen/elektrotechnik/");
  }
  if (item.name === "Sanitär & Heizung") {
    return pathname === "/leistungen/sanitaer-heizung" || pathname.startsWith("/leistungen/sanitaer-heizung/");
  }
  if (item.name === "Innenausbau") {
    return pathname === "/leistungen/innenausbau" || pathname.startsWith("/leistungen/innenausbau/");
  }
  if (item.name === "Reinigung & Facility") {
    return pathname === "/leistungen/reinigung-facility" || pathname.startsWith("/leistungen/reinigung-facility/");
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
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
      <div className="relative z-10">
      {/* Top-Nav */}
      <div className={`relative border-b ${dividerBorder}`}>
        <nav
          className={`container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8 transition-[height] duration-300 ease-out ${
            isScrolled ? "h-16" : "h-24"
          }`}
        >
          {/* Logo – führt auf / (Link liegt in LogoPlaceholder, kein doppeltes <a>) */}
          <div className="flex shrink-0">
            <LogoPlaceholder
              variant="header"
              className={`text-base transition-transform duration-300 ${isScrolled ? "scale-[0.95]" : "scale-100"}`}
            />
          </div>

          {/* Top-Nav Mitte: Leistungen, Über uns, Kontakt */}
          <div className="hidden md:flex md:items-center md:gap-8 md:absolute md:left-1/2 md:-translate-x-1/2">
            {primaryNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/leistungen" && pathname.startsWith("/leistungen/"));
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

          {/* CTA rechts: Projekt anfragen */}
          <div className="hidden md:flex md:items-center md:shrink-0">
            <Link href="/anfrage">
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full border border-transparent bg-[#4C626C] text-white hover:bg-[#4C626C]/90 px-6"
              >
                Projekt anfragen
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center rounded-lg p-2 ${textColor} ${hoverBg} ml-auto`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menü öffnen</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Secondary-Nav: Gewerke als Tabs/Chips (visuell dominanter) */}
      <div
        className={`hidden md:block transition-[height,opacity] duration-300 ease-out ${
          isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-14 opacity-100 overflow-visible"
        }`}
      >
        <nav className="container mx-auto flex h-14 items-center justify-center gap-2 lg:gap-3 px-4 lg:px-8">
          {secondaryNav.map((item) => {
            const isActive = isSecondaryActive(pathname, item);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-xl font-semibold transition-all ${
                  isActive
                    ? "bg-white/20 text-white border border-white/30"
                    : `text-white/85 border border-transparent hover:bg-white/10 hover:text-white hover:border-white/20`
                }`}
                onMouseEnter={() => {
                  const key = getGewerkHoverKey(item.name);
                  if (key) setHoveredGewerk(key);
                }}
                onMouseLeave={() => {
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
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden relative border-t ${dividerBorder}`}>
          <div className="container relative z-10 mx-auto px-4 py-4 space-y-1">
            {/* Primary Nav Items */}
            <div className={`pb-4 border-b ${dividerBorder}`}>
              {primaryNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/leistungen" && pathname.startsWith("/leistungen/"));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-2.5 text-sm font-medium ${
                      isActive ? textColor : textColorMuted
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {isActive && <span className="mr-2">•</span>}
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Secondary: Gewerke (horizontal scrollbar, keine Dropdowns) */}
            <div className="pt-3 pb-4 -mx-4 px-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max pb-1">
                {secondaryNav.map((item) => {
                  const isActive = isSecondaryActive(pathname, item);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-lg font-semibold transition-colors ${
                        isActive ? "bg-white/20 text-white" : `text-white/85 hover:bg-white/10 hover:text-white`
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={`flex flex-col gap-3 pt-4 border-t ${dividerBorder}`}>
              <Link href="/anfrage" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className={`w-full rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30`}
                >
                  Projekt anfragen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
