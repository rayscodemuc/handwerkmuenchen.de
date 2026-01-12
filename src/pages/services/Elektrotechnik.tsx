import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Link, useLocation } from "react-router-dom";
import { Check, ChevronRight, Clock, Shield, Award, Phone, Zap, FileCheck, Thermometer, FileText, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import elektrotechnikImage from "@/assets/elektrotechnik-schaltschrank-dguv-v3-pruefung.jpg";

export default function Elektrotechnik() {
  const location = useLocation();
  const canonicalUrl = `https://mrclean-services.de${location.pathname}`;

  useEffect(() => {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);
    return () => { link.remove(); };
  }, [canonicalUrl]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": canonicalUrl,
    name: "Elektrotechnik & DGUV V3 Prüfung",
    description: "Rechtssichere Elektroprüfung nach DGUV Vorschrift 3 und zertifizierte Elektrotechnik für komplexe Immobilienportfolios.",
    provider: {
      "@type": "Organization",
      name: "Mr.Clean Services GmbH",
      url: "https://mrclean-services.de",
    },
    areaServed: { "@type": "Country", name: "Germany" },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Warum ist die DGUV V3 Prüfung verpflichtend?",
        acceptedAnswer: { "@type": "Answer", text: "Die Prüfung ist durch die Berufsgenossenschaften und die Betriebssicherheitsverordnung (BetrSichV) vorgeschrieben." },
      },
      {
        "@type": "Question",
        name: "In welchen Zyklen müssen elektrische Anlagen geprüft werden?",
        acceptedAnswer: { "@type": "Answer", text: "Ortsveränderliche Geräte 6-24 Monate, ortsfeste Anlagen 48 Monate – je nach Gefährdungsbeurteilung." },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Elektrotechnik & DGUV V3 Prüfung"
        description="Rechtssichere Elektroprüfung nach DGUV Vorschrift 3 und zertifizierte Elektrotechnik für komplexe Immobilienportfolios."
        keywords={["DGUV V3 Prüfung", "Elektroprüfung Gewerbe", "DIN VDE 0105-100", "Betriebssicherheitsverordnung"]}
        structuredData={[structuredData, faqStructuredData]}
        canonicalUrl={canonicalUrl}
      />
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Startseite</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li><Link to="/handwerk" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Handwerk</Link></li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li><span className="font-medium text-primary-foreground">Elektrotechnik</span></li>
            </ol>
          </div>
        </nav>

        {/* Hero - Kompakt */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Industrieller Standard
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Elektrotechnik & DGUV V3 Prüfung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Rechtssichere Elektroprüfung für komplexe Immobilienportfolios. Maximale Haftungssicherheit nach DIN VDE.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/anfrage">
                  <AnimatedButton className="bg-white text-foreground hover:bg-foreground hover:text-white">
                    Kostenloses Angebot
                  </AnimatedButton>
                </Link>
                <a href="tel:+491234567890">
                  <AnimatedButton className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                    Jetzt anrufen
                  </AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges - Inline */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">24/7 Erreichbar</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">VdS-Konform</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">Zertifizierter Fachbetrieb</span>
              </div>
            </div>
          </div>
        </section>

        {/* Blog-Style Content */}
        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              {/* Intro Text */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                Die Verantwortung für elektrische Sicherheit ist eine der kritischsten Pflichten für Betreiber, Hausverwaltungen und Facility Manager. Als zertifizierter Elektrofachbetrieb eliminieren wir Betriebsrisiken durch normkonforme Prüfzyklen.
              </p>

              {/* Feature Image */}
              <figure className="my-12">
                <img
                  src={elektrotechnikImage}
                  alt="Elektrotechnik Schaltschrank mit Sicherungen für DGUV V3 Prüfung"
                  className="w-full rounded-2xl object-cover aspect-[16/9]"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  Professionelle Schaltschrankprüfung nach DIN VDE 0105-100
                </figcaption>
              </figure>

              {/* Section 1 */}
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                Warum DGUV V3 Prüfungen unverzichtbar sind
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Im Zentrum unserer Arbeit steht die lückenlose Einhaltung der <strong className="text-foreground">Betriebssicherheitsverordnung (BetrSichV)</strong> sowie der Technischen Regeln für Betriebssicherheit (TRBS).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Jede Prüfung basiert auf einer individuellen <strong className="text-foreground">Gefährdungsbeurteilung</strong>. Das Ergebnis: maximale Rechtssicherheit gegenüber Berufsgenossenschaften, Versicherungen und im Schadensfall vor Gericht.
              </p>

              {/* Highlight Box */}
              <div className="my-10 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Haftungsschutz für Geschäftsführer</h3>
                    <p className="mt-2 text-muted-foreground">
                      Unsere Prüfungen sichern Ihren Versicherungsschutz und die persönliche Haftungsfreistellung der Geschäftsführung nach TRBS.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                Präventive Diagnostik durch Thermografie
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Berührungslose Messtechnik identifiziert thermische Anomalien in Schaltschränken und Kabeltrassen, <strong className="text-foreground">bevor</strong> es zu Produktionsausfällen oder Bränden kommt.
              </p>

              {/* Stats Grid */}
              <div className="my-10 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">6-24</p>
                  <p className="mt-1 text-sm text-muted-foreground">Monate Prüfzyklus<br/>ortsveränderlich</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">48</p>
                  <p className="mt-1 text-sm text-muted-foreground">Monate Prüfzyklus<br/>ortsfest</p>
                </div>
                <div className="rounded-xl bg-muted p-6 text-center">
                  <p className="text-3xl font-black text-primary">24/7</p>
                  <p className="mt-1 text-sm text-muted-foreground">Störungs-<br/>management</p>
                </div>
              </div>

              {/* Section 3 */}
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                Unsere Kernleistungen
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: FileCheck, title: "DGUV V3 Prüfung", desc: "Ortsveränderlich & ortsfest nach Vorschrift" },
                  { icon: Thermometer, title: "Industrielle Thermografie", desc: "Berührungslose Fehlersuche mittels Infrarot" },
                  { icon: Zap, title: "DIN VDE 0105-100", desc: "Prüfung ortsfester elektrischer Anlagen" },
                  { icon: FileText, title: "Audit-Safe Reporting", desc: "Revisionssichere digitale Dokumentation" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote/Callout */}
              <blockquote className="my-12 border-l-4 border-primary pl-6">
                <p className="text-lg font-medium text-foreground italic">
                  „Für Kunden mit erhöhten Sicherheitsanforderungen erfüllen wir die strengen Kriterien der VdS-Konformität – ein Qualitätsmerkmal, das von führenden Sachversicherern anerkannt wird."
                </p>
              </blockquote>

              {/* FAQ Section - Compact */}
              <h2 className="text-2xl font-bold text-foreground mt-16 mb-6">
                Häufige Fragen
              </h2>
              
              <div className="space-y-4">
                {[
                  { q: "Warum ist die DGUV V3 Prüfung verpflichtend?", a: "Die Prüfung ist durch die Berufsgenossenschaften und die BetrSichV vorgeschrieben. Im Schadensfall ist sie die einzige Absicherung gegen Regressforderungen." },
                  { q: "Wie oft müssen elektrische Anlagen geprüft werden?", a: "Ortsveränderliche Geräte 6-24 Monate, ortsfeste Anlagen 48 Monate – je nach Gefährdungsbeurteilung." },
                  { q: "Was unterscheidet Thermografie von der Standardprüfung?", a: "Sie erkennt Belastungszustände visuell, die bei reiner Messung unentdeckt bleiben – das effektivste Werkzeug zur Brandprävention." },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-foreground list-none flex items-center justify-between">
                      {faq.q}
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
              </div>

              {/* Related Links */}
              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-foreground mb-4">Verwandte Leistungen & Standorte</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Alle Handwerk-Leistungen", href: "/handwerk" },
                    { label: "Berlin", href: "/standorte/berlin" },
                    { label: "Hamburg", href: "/standorte/hamburg" },
                    { label: "München", href: "/standorte/muenchen" },
                  ].map((link, i) => (
                    <Link
                      key={i}
                      to={link.href}
                      className="inline-flex items-center gap-1 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <Link to="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">
                    Jetzt kostenlos anfragen
                  </AnimatedButton>
                </Link>
              </div>

            </div>
          </div>
        </article>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
