import { Phone, Mail, MapPin, Download } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  leistungen: [
    { name: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
    { name: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
    { name: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
    { name: "Winterdienst", href: "/facility-management/winterdienst" },
    { name: "Grünpflege", href: "/aussenanlagen/gruenpflege" },
  ],
  unternehmen: [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Partner werden", href: "/partner-werden" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "Anfrage", href: "/anfrage" },
  ],
  rechtliches: [
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Impressum", href: "/impressum" },
  ],
};

// Downloads - füge hier deine Dokumente hinzu
// Lege die PDFs im Ordner public/documents/ ab
const downloads = [
  { name: "Preisliste 2025", href: "/documents/preisliste-2025.pdf" },
  { name: "AGB", href: "/documents/agb.pdf" },
  { name: "Zertifikate", href: "/documents/zertifikate.pdf" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Mr.Clean Services" className="h-12 w-auto" />
            </Link>
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
                  <Link
                    to={link.href}
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
                    to={link.href}
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
                    to={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Downloads */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Downloads
            </h3>
            <ul className="mt-6 space-y-4">
              {downloads.length > 0 ? (
                downloads.map((download) => (
                  <li key={download.name}>
                    <a
                      href={download.href}
                      download
                      className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Download className="h-4 w-4" />
                      {download.name}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground/50 text-sm italic">
                  Demnächst verfügbar
                </li>
              )}
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