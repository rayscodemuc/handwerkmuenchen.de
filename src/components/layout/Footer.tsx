const footerLinks = {
  services: [
    { name: "Service One", href: "#" },
    { name: "Service Two", href: "#" },
    { name: "Service Three", href: "#" },
    { name: "Service Four", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Blog", href: "#" },
    { name: "FAQs", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Services
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.services.map((link) => (
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

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Company
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
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

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Resources
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.resources.map((link) => (
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

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Legal
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.legal.map((link) => (
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
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
