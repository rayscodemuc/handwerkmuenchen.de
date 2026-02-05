"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { LogoPlaceholder } from "@/components/LogoPlaceholder";
import { BUSINESS } from "@/lib/business";

const footerLinks = {
  leistungen: [
    { name: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
    { name: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
    { name: "Innenausbau", href: "/maler-boden" },
    { name: "Reinigung", href: "/reinigung" },
    { name: "Facility", href: "/facility-management" },
  ],
  unternehmen: [
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
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-2">
            <LogoPlaceholder variant="footer" className="h-12 px-4 py-2 text-lg" />
            <p className="mt-6 max-w-sm text-muted-foreground leading-relaxed">
              Generalunternehmer in München – Meistergewerke unter einem Dach, Reinigung &amp; Facility als Fachbetrieb.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-foreground transition-colors">
                  {BUSINESS.phoneDisplay || BUSINESS.phone}
                </a>
              </div>
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

          {/* Link-Spalten: Leistungen, Unternehmen, Rechtliches, Für Betriebe – ein Block mit einheitlichen Abständen */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Leistungen
            </h3>
            <ul className="mt-6 space-y-4">
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Unternehmen
            </h3>
            <ul className="mt-6 space-y-4">
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Rechtliches
            </h3>
            <ul className="mt-6 space-y-4">
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

          {/* Für Betriebe */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Für Betriebe
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/partner-werden"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Für Meisterbetriebe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Service-Area & Footer Claim */}
        <p className="mt-12 text-sm text-muted-foreground">
          Für München &amp; Umgebung.
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-4xl">
          Generalunternehmer für Handwerk, Reinigung &amp; Facility. Ein Vertrag, ein Ansprechpartner – meistergeführt koordiniert.
        </p>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Musterfirma GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Mit Sorgfalt für Ihr Objekt.
          </p>
        </div>
      </div>
    </footer>
  );
}
