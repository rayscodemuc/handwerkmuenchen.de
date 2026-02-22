"use client";

import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BUSINESS } from "@/lib/business";

const footerLinks = {
  leistungen: [
    { name: "Alle Leistungen", href: "/leistungen" },
    { name: "Elektrotechnik", href: "/leistungen/elektrotechnik" },
    { name: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" },
    { name: "Innenausbau", href: "/leistungen/innenausbau" },
    { name: "Reinigung & Facility", href: "/leistungen/reinigung-facility" },
  ],
  unternehmen: [
    { name: "Projekte", href: "/projekte" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "Anfrage", href: "/anfrage" },
  ],
  rechtliches: [
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Impressum", href: "/impressum" },
  ],
};

export function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <Logo variant="footer" height={48} className="shrink-0" />
            <p className="mt-5 max-w-sm text-muted-foreground leading-relaxed text-sm">
              Meistergewerke in München – unter einem Dach koordiniert, Reinigung &amp; Facility als Fachbetrieb.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  {BUSINESS.address?.street || "Musterstraße 1"}
                  <br />
                  DE-{BUSINESS.address?.zip || "80331"} {BUSINESS.address?.city || "München"}
                </span>
              </div>
            </div>
          </div>

          {/* Link-Spalten: Leistungen, Unternehmen, Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#3E505B]">
              Leistungen
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.leistungen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#3E505B]">
              Unternehmen
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#3E505B]">
              Rechtliches
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Service-Area & Footer Claim */}
        <p className="mt-10 text-sm text-muted-foreground">
          Für München &amp; Umgebung.
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Ein Ansprechpartner, klare Verantwortung – meistergeführt koordiniert, ohne Subunternehmer-Kette.
        </p>

        {/* Überschrift über der Unterschrift / Copyright-Zeile */}
        <h3 className="mt-10 text-sm font-semibold uppercase tracking-widest text-[#3E505B]">
          Handwerk &amp; Gebäudeservice in München
        </h3>

        {/* Bottom Section */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} handwerkmuenchen.de. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Planbar. Dokumentiert. Verlässlich.
          </p>
        </div>
      </div>
    </footer>
  );
}
