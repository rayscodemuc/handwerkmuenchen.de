import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  leistungen: [
    { name: "Elektrotechnik", href: "#" },
    { name: "Sanitär & Heizung", href: "#" },
    { name: "Unterhaltsreinigung", href: "#" },
    { name: "Winterdienst", href: "#" },
    { name: "Grünpflege", href: "#" },
  ],
  unternehmen: [
    { name: "Über uns", href: "#" },
    { name: "Karriere", href: "#" },
    { name: "Referenzen", href: "#" },
    { name: "Kontakt", href: "#" },
  ],
  rechtliches: [
    { name: "Datenschutz", href: "#" },
    { name: "Impressum", href: "#" },
    { name: "AGB", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block">
              <img src={logo} alt="Mr.Clean Services" className="h-12 w-auto" />
            </a>
            <p className="mt-6 max-w-sm text-muted-foreground leading-relaxed">
              Ihr Partner für professionelles Facility Management und Gebäudereinigung in der Region.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span>+49 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span>info@mrclean-services.de</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span>Musterstraße 123, 12345 Berlin</span>
              </div>
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Leistungen
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.leistungen.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mr.Clean Services. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-muted-foreground">
            Mit Sorgfalt für Ihr Objekt.
          </p>
        </div>
      </div>
    </footer>
  );
}