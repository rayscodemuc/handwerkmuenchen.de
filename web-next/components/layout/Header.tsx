"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoPlaceholder } from "@/components/LogoPlaceholder";
import { useGewerkHover, getGewerkHoverKey } from "@/components/providers/GewerkHoverContext";

const primaryNav = [
  { name: "Startseite", href: "/" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Kontakt", href: "/kontakt" },
];

// 5 Gewerke: Elektrotechnik, Sanitär & Heizung, Innenausbau, Reinigung, Facility (Außenanlagen unter Facility)
const secondaryNav = [
  {
    name: "Elektrotechnik",
    href: "/handwerk/elektrotechnik",
    subItems: [
      { name: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
      { name: "Service & Wartung", href: "/handwerk/service-wartung" },
    ],
  },
  {
    name: "Sanitär & Heizung",
    href: "/handwerk/sanitaer-heizung",
    subItems: [
      { name: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
    ],
  },
  {
    name: "Innenausbau",
    href: "/maler-boden",
    subItems: [
      { name: "Malerarbeiten (innen & außen)", href: "/maler-boden" },
      { name: "Fassadenarbeiten", href: "/maler-boden" },
      { name: "Bodenbeläge", href: "/maler-boden" },
      { name: "Fliesenarbeiten", href: "/maler-boden" },
      { name: "Estrich", href: "/maler-boden" },
    ],
  },
  {
    name: "Reinigung",
    href: "/reinigung",
    subItems: [
      { name: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
      { name: "Büroreinigung", href: "/reinigung/bueroreinigung" },
      { name: "Fensterreinigung", href: "/reinigung/fensterreinigung" },
      { name: "Glas- & Fassadenpflege", href: "/reinigung/glas-fassade" },
      {
        name: "Sonderreinigung",
        href: "/reinigung/sonderreinigung",
        subItems: [
          { name: "Tiefgaragenreinigung", href: "/reinigung/tiefgaragenreinigung" },
          { name: "Grundreinigung", href: "/reinigung/grundreinigung" },
        ],
      },
    ],
  },
  {
    name: "Facility",
    href: "/facility-management",
    subItems: [
      { name: "Hausmeisterservice", href: "/facility-management/hausmeisterservice" },
      { name: "Winterdienst", href: "/facility-management/winterdienst" },
      { name: "Objektmanagement", href: "/facility-management/objektmanagement" },
      { name: "Außenanlagen", href: "/aussenanlagen" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  // Startseite: 3E505B, Über uns: 26413C, Kontakt & Anfrage: 8AB0AB, Rest: 26413C
  const headerBg =
    pathname === "/"
      ? "bg-[#3E505B]"
      : pathname === "/kontakt" || pathname === "/anfrage"
        ? "bg-[#8AB0AB]"
        : "bg-[#26413C]";

  return (
    <header className={`sticky top-0 z-50 w-full ${headerBg} transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-none"}`}>
      <div className="relative z-10">
      {/* Primary Navigation Row */}
      <div className={`relative border-b ${dividerBorder}`}>
        <nav
          className={`container mx-auto flex items-center justify-between gap-4 px-4 lg:px-8 transition-[height] duration-300 ease-out ${
            isScrolled ? "h-16" : "h-24"
          }`}
        >
          {/* Logo - links */}
          <div className="flex shrink-0">
            <LogoPlaceholder
              variant="header"
              className={`text-base transition-transform duration-300 ${isScrolled ? "scale-[0.95]" : "scale-100"}`}
            />
          </div>

          {/* Primary Nav - Desktop, zentral */}
          <div className="hidden md:flex md:items-center md:gap-8 md:absolute md:left-1/2 md:-translate-x-1/2">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-lg font-medium transition-colors ${
                    isActive 
                      ? textColor 
                      : `${textColorMuted} hover:${textColor}`
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

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-3 md:shrink-0">
            {/* Anfrage Button */}
            <Link href="/anfrage">
              <Button 
                variant="ghost" 
                size="lg"
                className="rounded-full border border-transparent bg-[#4C626C] text-white hover:bg-[#4C626C]/90 px-6"
              >
                Anfrage
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

      {/* Secondary Navigation Row - Desktop (klappt beim Scrollen vollständig ein) */}
      <div
        className={`hidden md:block transition-[height,opacity] duration-300 ease-out ${
          isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-14 opacity-100 overflow-visible"
        }`}
      >
        <nav
          className="container mx-auto flex h-14 items-center justify-center gap-12 px-4 lg:px-8"
        >
          {secondaryNav.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                setOpenDropdown(item.name);
                const key = getGewerkHoverKey(item.name);
                if (key) setHoveredGewerk(key);
              }}
              onMouseLeave={() => {
                setOpenDropdown(null);
                const key = getGewerkHoverKey(item.name);
                if (key) setHoveredGewerk(null);
              }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 text-base font-semibold ${textColorMuted} transition-colors hover:${textColor}`}
              >
                {item.name}
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown Menu */}
              {openDropdown === item.name && (
                <div className="absolute left-0 top-full pt-2 z-50">
                  <div className="min-w-[220px] rounded-xl bg-background p-2 shadow-lg border border-border">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {subItem.name}
                        </Link>
                        {subItem.subItems && subItem.subItems.map((nestedItem) => (
                          <Link
                            key={nestedItem.name}
                            href={nestedItem.href}
                            className="block rounded-lg px-8 py-2 text-sm text-foreground/50 transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {nestedItem.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
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
                const isActive = pathname === item.href;
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

            {/* Secondary Nav Items with Submenus */}
            <div className="pt-2 pb-4">
              {secondaryNav.map((item) => (
                <div
                  key={item.name}
                  className="py-2"
                  onMouseEnter={() => {
                    const key = getGewerkHoverKey(item.name);
                    if (key) setHoveredGewerk(key);
                  }}
                  onMouseLeave={() => {
                    const key = getGewerkHoverKey(item.name);
                    if (key) setHoveredGewerk(null);
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <Link
                      href={item.href}
                      className={`py-2.5 text-sm font-semibold ${textColor}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <button
                      className={`p-2 ${textColorMuted}`}
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {openDropdown === item.name && (
                    <div className="ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={`block py-2 text-sm ${textColorMuted}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                          {subItem.subItems && subItem.subItems.map((nestedItem) => (
                            <Link
                              key={nestedItem.name}
                              href={nestedItem.href}
                              className={`block py-1.5 pl-4 text-sm ${textColorMuted} opacity-70`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {nestedItem.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`flex flex-col gap-3 pt-4 border-t ${dividerBorder}`}>
              <Link href="/anfrage" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className={`w-full rounded-full border ${borderColor} ${textColor} ${hoverBg} hover:${textColor}`}
                >
                  Anfrage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
