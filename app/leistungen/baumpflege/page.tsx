import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, TreeDeciduous, Scissors, Shield, AlertTriangle, FileText, Eye, Clock, CheckCircle, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Baumpflege",
  description: "Professionelle Baumpflege für Gewerbeimmobilien. Baumkontrolle, Kronenpflege und digitales Baumkataster für Haftungssicherheit.",
  alternates: {
    canonical: "/leistungen/baumpflege",
  },
};

const sections = [
  { title: "Verkehrssicherungspflicht erfüllen", content: "Jährliche Baumkontrollen nach FLL-Richtlinien dokumentieren die Erfüllung Ihrer Verkehrssicherungspflicht. Im Schadensfall ist die lückenlose Dokumentation Ihr Schutz vor Haftungsansprüchen." },
  { title: "Fachgerechte Baumpflege nach ZTV", content: "Vom Formschnitt über Kronenpflege bis zur Totholzentfernung – alle Arbeiten nach ZTV-Baumpflege. Zertifizierte Baumpfleger mit Seilklettertechnik für alle Höhen." },
  { title: "Digitales Baumkataster", content: "Jeder Baum wird erfasst, kontrolliert und im digitalen Baumkataster dokumentiert. Mit Fotos, Maßnahmenhistorie und Terminüberwachung – jederzeit abrufbar für Behörden und Versicherungen." }
];

const services = [
  { title: "Baumkontrolle", description: "Jährliche Prüfung nach FLL-Richtlinien.", icon: Eye },
  { title: "Kronenpflege", description: "Auslichtung und Formgebung.", icon: TreeDeciduous },
  { title: "Totholzentfernung", description: "Verkehrssicherung durch Entfernung.", icon: Shield },
  { title: "Sturmschäden", description: "24h-Notdienst bei umgestürzten Bäumen.", icon: AlertTriangle },
  { title: "Baumschnitt", description: "Fachgerechter Schnitt nach ZTV.", icon: Scissors },
  { title: "Baumkataster", description: "Digitale Dokumentation aller Bäume.", icon: FileText }
];

const stats = [
  { value: "FLL", label: "Zertifiziert" },
  { value: "24h", label: "Sturmschaden-Hilfe" },
  { value: "Digital", label: "Baumkataster" }
];

const faqs = [
  { question: "Wann ist Baumschnitt erlaubt?", answer: "Hauptschnittzeit Februar/März vor dem Austrieb. Totholz und Verkehrssicherungsmaßnahmen ganzjährig möglich." },
  { question: "Brauche ich eine Genehmigung für Fällung?", answer: "In den meisten Fällen ja. Wir beraten Sie und übernehmen die Antragstellung." },
  { question: "Wie oft muss kontrolliert werden?", answer: "Mindestens jährlich, bei Risikobäumen halbjährlich oder nach Sturmereignissen." }
];

const relatedLinks = [
  { label: "Außenanlagen", href: "/aussenanlagen" },
  { label: "Grünpflege", href: "/leistungen/gruenpflege" },
  { label: "München", href: "/kontakt" },
];

const trustBadges = [
  { icon: Shield, label: "FLL-zertifiziert" },
  { icon: Clock, label: "24h Notdienst" },
  { icon: CheckCircle, label: "Dokumentiert" }
];

export default function Baumpflege() {
  return (
    <>
        {/* Breadcrumb */}
        <nav className="bg-primary py-4" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 lg:px-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <Link href="/aussenanlagen" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Außenanlagen
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Baumpflege</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Verkehrssicherung & Baumkataster nach FLL
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Baumpflege
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Baumpflege für Gewerbeimmobilien. Baumkontrolle, Kronenpflege und digitales Baumkataster für Haftungssicherheit.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
                  <AnimatedButton>
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

        {/* Trust Badges */}
        <section className="border-b border-border bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 text-sm">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <article className="bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl py-16 lg:py-20">
              
              {/* Intro */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                Als Grundstückseigentümer haften Sie für Schäden durch herabfallende Äste oder umstürzende Bäume. Regelmäßige Baumkontrollen nach FLL-Richtlinien sind Pflicht – und der Nachweis im Schadensfall entscheidend. Wir übernehmen Kontrolle, Pflege und Dokumentation mit digitalem Baumkataster.
              </p>

              {/* Content Sections */}
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Highlight Box */}
              <div className="my-10 rounded-2xl bg-primary/5 border border-primary/10 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Rechtssichere Dokumentation</h3>
                    <p className="mt-2 text-muted-foreground">Jede Baumkontrolle wird digital dokumentiert mit Fotos, Maßnahmenempfehlungen und Terminplanung. Gerichtsfest und jederzeit abrufbar.</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="my-10 grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="rounded-xl bg-muted p-6 text-center">
                    <p className="text-3xl font-black text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Services */}
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                Unsere Kernleistungen
              </h2>
              <div className="space-y-4">
                {services.map((service, i) => {
                  const Icon = service.icon || Check;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:bg-muted/50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <blockquote className="my-12 border-l-4 border-primary pl-6">
                <p className="text-lg font-medium text-foreground italic">
                  „Bei Sturmschäden sind wir innerhalb von 24 Stunden vor Ort – für Absicherung, Räumung und Dokumentation."
                </p>
              </blockquote>

              {/* FAQ */}
              <h2 className="text-2xl font-bold text-foreground mt-16 mb-6">
                Häufige Fragen
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-border bg-card">
                    <summary className="cursor-pointer p-5 font-medium text-foreground list-none flex items-center justify-between">
                      {faq.question}
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>

              {/* Related Links */}
              <div className="mt-12 rounded-2xl bg-muted p-6">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Verwandte Leistungen & Standorte
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
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
                <Link href="/anfrage">
                  <AnimatedButton className="h-14 px-10 text-base">
                    Jetzt kostenlos anfragen
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </article>


        <CTASection />
    </>
  );
}
