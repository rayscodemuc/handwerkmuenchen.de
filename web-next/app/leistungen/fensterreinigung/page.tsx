import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChevronRight, Phone, Eye, Building, Sun, Droplets, Shield, Calendar, CheckCircle, Clock, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fensterreinigung",
  description: "Professionelle Fensterreinigung für Gewerbeimmobilien. Streifenfreie Glasflächen, zertifizierte Höhenarbeiten und planbare Intervalle.",
  alternates: {
    canonical: "/leistungen/fensterreinigung",
  },
};

const sections = [
  {
    title: "Mehr Licht, besseres Arbeitsklima",
    content: "Studien belegen: Verschmutzte Fenster reduzieren den Lichteinfall um bis zu 30 %. Das beeinträchtigt die Konzentration, erhöht den Energiebedarf für künstliche Beleuchtung und senkt die Mieterzufriedenheit. Regelmäßige professionelle Reinigung maximiert das natürliche Tageslicht und spart Stromkosten."
  },
  {
    title: "Zertifizierte Höhenarbeiten nach DGUV",
    content: "Für Glasflächen in großer Höhe setzen wir Hubarbeitsbühnen, Teleskopstangen und zertifizierte Industriekletterer ein. Unsere Mitarbeiter sind nach DGUV Vorschrift 38 geschult und für alle Höhenarbeiten zugelassen. Sicherheit hat oberste Priorität – für unser Team und für Ihren laufenden Betrieb."
  },
  {
    title: "Planbare Intervalle, transparente Kosten",
    content: "Für Gewerbeimmobilien empfehlen wir 4-12 Reinigungen pro Jahr, je nach Lage und Verschmutzungsgrad. Wir erstellen einen festen Jahresplan mit planbaren Kosten – keine Überraschungen, keine versteckten Zusatzkosten. Rahmen und Falze sind standardmäßig inklusive."
  }
];

const services = [
  { title: "Streifenfreie Reinigung", description: "Professionelle Technik für perfekte Glasflächen.", icon: Eye },
  { title: "Alle Gebäudetypen", description: "Vom Bürogebäude bis zum Hochhaus.", icon: Building },
  { title: "Maximales Tageslicht", description: "Saubere Fenster für mehr natürliches Licht.", icon: Sun },
  { title: "Schonende Methoden", description: "Materialschonend für alle Glasarten.", icon: Droplets },
  { title: "Zertifizierte Höhenarbeiten", description: "DGUV-geschulte Mitarbeiter für alle Höhen.", icon: Shield },
  { title: "Planbare Intervalle", description: "Fester Jahresplan mit transparenten Kosten.", icon: Calendar }
];

const stats = [
  { value: "30%", label: "Mehr Lichteinfall" },
  { value: "DGUV", label: "Zertifiziert" },
  { value: "4-12x", label: "Pro Jahr empfohlen" }
];

const faqs = [
  { 
    question: "Wie oft sollten Gewerbefenster gereinigt werden?", 
    answer: "Für Bürogebäude empfehlen wir 4-12 Reinigungen pro Jahr, je nach Lage (Stadtmitte vs. ländlich) und Umgebung (Baustellen, Industrie). Bei stark frequentierten Eingangsbereichen oft häufiger." 
  },
  { 
    question: "Sind Rahmen und Falze inklusive?", 
    answer: "Ja, Rahmen- und Falzreinigung ist bei uns standardmäßig in jeder Fensterreinigung enthalten. Das verhindert Schimmel und verlängert die Lebensdauer der Dichtungen." 
  },
  { 
    question: "Wie hoch können Sie reinigen?", 
    answer: "Mit Hubarbeitsbühnen und zertifizierten Industriekletterern erreichen wir jede Höhe – vom Erdgeschoss bis zum Hochhaus. Alle Arbeiten erfolgen nach DGUV Vorschrift 38." 
  },
  { 
    question: "Wird der Betrieb durch die Reinigung gestört?", 
    answer: "Nein, wir arbeiten außerhalb der Kernzeiten oder koordinieren mit Ihnen störungsfreie Zeitfenster. Die Reinigung erfolgt zügig und ohne Beeinträchtigung des laufenden Betriebs." 
  },
  { 
    question: "Können Sie mehrere Standorte betreuen?", 
    answer: "Ja, wir koordinieren Reinigungstermine für Portfolios mit mehreren Gebäuden. Einheitliche Standards, konsolidierte Abrechnung, ein Ansprechpartner." 
  }
];

const relatedLinks = [
  { label: "Alle Reinigungsleistungen", href: "/reinigung" },
  { label: "Glas- & Fassadenpflege", href: "/leistungen/glas-fassade" },
  { label: "Grundreinigung", href: "/leistungen/grundreinigung" },
  { label: "München", href: "/standorte/muenchen" },
  { label: "Augsburg", href: "/standorte/augsburg" },
  { label: "Ingolstadt", href: "/standorte/ingolstadt" },
  { label: "Frankfurt", href: "/standorte/frankfurt" },
  { label: "Nürnberg", href: "/standorte/nuernberg" },
  { label: "Hamburg", href: "/standorte/hamburg" },
  { label: "Berlin", href: "/standorte/berlin" }
];

const trustBadges = [
  { icon: Shield, label: "DGUV-zertifiziert" },
  { icon: CheckCircle, label: "Rahmen inklusive" },
  { icon: Clock, label: "Planbare Termine" }
];

export default function Fensterreinigung() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
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
                <Link href="/leistungen/unterhaltsreinigung" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Reinigung
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" aria-hidden="true" />
              <li>
                <span className="font-medium text-primary-foreground">Fensterreinigung</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                Glasreinigung & Höhenarbeiten nach DGUV
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
                Fensterreinigung
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Professionelle Fensterreinigung für Gewerbeimmobilien. Streifenfreie Glasflächen, zertifizierte Höhenarbeiten und planbare Intervalle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/anfrage">
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
                Für Property Manager und Facility-Verantwortliche ist die Fensterreinigung mehr als Ästhetik – sie ist Werterhalt und Mieterzufriedenheit. Verschmutzte Fenster reduzieren den Lichteinfall, beeinträchtigen das Arbeitsklima und signalisieren Vernachlässigung. Unsere professionelle Glasreinigung deckt alle Höhen ab – von der Erdgeschoss-Scheibe bis zur Hochhausfassade.
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
                    <h3 className="font-bold text-foreground">Vollständige Rahmenreinigung inklusive</h3>
                    <p className="mt-2 text-muted-foreground">Fensterrahmen und Falze werden bei jeder Reinigung mitbehandelt. Das verhindert Schimmelbildung, verlängert die Lebensdauer der Dichtungen und sorgt für ein rundum gepflegtes Erscheinungsbild.</p>
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
                  „Für Portfolios mit mehreren Gebäuden bieten wir Rahmenverträge mit koordinierten Reinigungsterminen, einheitlichen Standards und konsolidierter Abrechnung."
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
      </main>
      <Footer />
    </div>
  );
}