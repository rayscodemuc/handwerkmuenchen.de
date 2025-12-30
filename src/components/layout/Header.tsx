import { useState } from "react";
import { Menu, X, ChevronDown, Percent, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const primaryNav = [
  { name: "Privat", href: "#", active: true },
  { name: "Gewerbe", href: "#" },
  { name: "Über uns", href: "#about" },
  { name: "Kontakt", href: "#contact" },
];

const secondaryNav = [
  { name: "Reinigung", href: "#services", hasDropdown: true },
  { name: "Gebäude", href: "#", hasDropdown: true },
  { name: "Garten", href: "#", hasDropdown: true },
  { name: "Spezial", href: "#" },
  { name: "Preise", href: "#", hasDropdown: true },
  { name: "Angebote", href: "#" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-[hsl(280,75%,55%)]">
      {/* Primary Navigation Row */}
      <div className="border-b border-white/10">
        <nav className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Mr.Clean Services GmbH" 
              className="h-10 w-auto brightness-0 invert lg:h-12"
            />
          </a>

          {/* Primary Nav - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {primaryNav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-lg font-medium transition-colors ${
                  item.active 
                    ? "text-white" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                {item.active && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
                )}
              </a>
            ))}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {/* Icon Buttons */}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10">
              <Percent className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10">
              <MapPin className="h-4 w-4" />
            </button>

            {/* CTA Button */}
            <Button variant="hero-white" size="default" className="rounded-full">
              Anfrage
            </Button>

            {/* Sign In Dropdown */}
            <Button 
              variant="ghost" 
              className="rounded-full border border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Anmelden
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Menü öffnen</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Secondary Navigation Row - Desktop */}
      <div className="hidden md:block">
        <nav className="container mx-auto flex h-14 items-center gap-10 px-4 lg:px-8">
          {secondaryNav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 text-base font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.name}
              {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[hsl(280,75%,55%)]">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {/* Primary Nav Items */}
            <div className="pb-4 border-b border-white/10">
              {primaryNav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-2.5 text-sm font-medium ${
                    item.active ? "text-white" : "text-white/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Secondary Nav Items */}
            <div className="pt-2 pb-4">
              {secondaryNav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between py-2.5 text-sm font-medium text-white/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </a>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Button variant="hero-white" className="w-full rounded-full">
                Anfrage
              </Button>
              <Button 
                variant="ghost" 
                className="w-full rounded-full border border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Anmelden
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
