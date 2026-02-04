"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocationMapDialog } from "@/components/LocationMapDialog";
import { LogoPlaceholder } from "@/components/LogoPlaceholder";

const primaryNav = [
  { name: "Startseite", href: "/" },
  { name: "Über uns", href: "/ueber-uns" },
  { name: "Kontakt", href: "/kontakt" },
];

// 5 Gewerke: Elektrotechnik, Sanitär & Heizung, Maler & Boden, Reinigung, Facility (Außenanlagen unter Facility)
const secondaryNav = [
  {
    name: "Elektrotechnik",
    href: "/handwerk/elektrotechnik",
    subItems: [
      { name: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
      { name: "Elektro-Notdienst", href: "/handwerk/elektrotechnik/elektro-notdienst" },
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
    name: "Maler & Boden",
    href: "/maler-boden",
    subItems: [
      { name: "Maler & Boden", href: "/maler-boden" },
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
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Scroll detection (with hysteresis + rAF to prevent jitter)
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const SHRINK_AT = 80;
    const EXPAND_AT = 40;

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const next = isScrolledRef.current
        ? !(y < EXPAND_AT)
        : y > SHRINK_AT;

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
  
  // Check if current page is Kontakt (dark background needs white text)
  const isKontaktPage = pathname === "/kontakt";
  const textColor = isKontaktPage ? "text-white" : "text-foreground";
  const textColorMuted = isKontaktPage ? "text-white/70" : "text-foreground/70";
  const borderColor = isKontaktPage ? "border-white/30" : "border-foreground/30";
  const hoverBg = isKontaktPage ? "hover:bg-white/10" : "hover:bg-foreground/10";

  return (
    <header className={`sticky top-0 z-50 w-full bg-primary transition-all duration-300 ease-out ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Primary Navigation Row */}
      <div className={`border-b ${isKontaktPage ? 'border-white/10' : 'border-foreground/10'}`}>
        <nav className={`container mx-auto flex items-center px-4 lg:px-8 transition-[height] duration-300 ease-out ${isScrolled ? 'h-14' : 'h-20'}`}>
          {/* Logo */}
          <LogoPlaceholder
            variant="header"
            className={`transition-all duration-300 ${isScrolled ? "h-8 lg:h-9 text-sm" : "h-10 lg:h-12 text-base"}`}
          />

          {/* Primary Nav - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-8 md:ml-20">
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
                    <span className={`absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${isKontaktPage ? 'bg-white' : 'bg-foreground'}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-3 md:ml-auto">
            {/* Icon Buttons */}
            <Link 
              href="/service-24-7"
              className="flex h-12 items-center justify-center gap-1.5 rounded-full bg-red-600 px-4 text-white transition-colors hover:bg-red-700"
            >
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">24/7</span>
            </Link>
            <button 
              onClick={() => setLocationDialogOpen(true)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border ${borderColor} transition-colors ${hoverBg}`}
            >
              <MapPin className={`h-5 w-5 ${textColor}`} />
            </button>

            {/* CTA Button */}
            <Link href="/partner-werden">
              <Button variant="hero-white" size="lg" className="rounded-full px-6">
                Partner werden
              </Button>
            </Link>

            {/* Anfrage Button */}
            <Link href="/anfrage">
              <Button 
                variant="ghost" 
                size="lg"
                className={`rounded-full border ${borderColor} ${textColor} ${hoverBg} hover:${textColor} px-6`}
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

      {/* Secondary Navigation Row - Desktop (hidden when scrolled) */}
      <div 
        className={`hidden md:block transition-[height,opacity] duration-300 ease-out ${isScrolled ? 'h-0 opacity-0 pointer-events-none overflow-hidden' : 'h-12 opacity-100'}`}
      >
        <nav className="container mx-auto flex h-full items-center gap-12 px-4 lg:px-8">
          {secondaryNav.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${isKontaktPage ? 'border-white/10' : 'border-foreground/10'} bg-primary`}>
          <div className="container mx-auto px-4 py-4 space-y-1">
            {/* Primary Nav Items */}
            <div className={`pb-4 border-b ${isKontaktPage ? 'border-white/10' : 'border-foreground/10'}`}>
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
                <div key={item.name} className="py-2">
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

            <div className={`flex flex-col gap-3 pt-4 border-t ${isKontaktPage ? 'border-white/10' : 'border-foreground/10'}`}>
              <Link 
                href="/service-24-7" 
                className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-3 text-white font-semibold transition-colors hover:bg-red-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Clock className="h-4 w-4" />
                24/7 Notdienst
              </Link>
              <Link href="/partner-werden" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="hero-white" className="w-full rounded-full">
                  Partner werden
                </Button>
              </Link>
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

      {/* Location Map Dialog */}
      <LocationMapDialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen} />
    </header>
  );
}
