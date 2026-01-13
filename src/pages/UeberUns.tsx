import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Handshake,
  Heart,
  Zap,
  Wrench,
  Sparkles,
  TreePine,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Home,
  Lightbulb,
  Car,
  AlertTriangle,
  Settings,
  Building,
  Lock,
  Gauge,
  Bell,
  CheckCircle2,
  Quote,
} from "lucide-react";

const coreValues = [
  {
    icon: Award,
    title: "Klasse statt Masse",
    description: "Qualität durch fair bezahlte, motivierte Profis. Wir setzen auf Können, nicht auf Quantität.",
    highlight: "Faire Löhne = Beste Arbeit",
  },
  {
    icon: Users,
    title: "Ein Gesicht zu jedem Projekt",
    description: "Feste Objektleiter statt anonymer Callcenter. Sie kennen Ihren Ansprechpartner persönlich.",
    highlight: "Ihr persönlicher Ansprechpartner",
  },
  {
    icon: Handshake,
    title: "Handschlagqualität",
    description: "Ehrliche Kommunikation und sofortige Problemlösung. Was wir zusagen, halten wir.",
    highlight: "Versprochen ist versprochen",
  },
  {
    icon: Heart,
    title: "Technik trifft Herz",
    description: "Modernste Effizienz gepaart mit persönlichem Blick für Details, die anderen entgehen.",
    highlight: "Innovation mit Menschlichkeit",
  },
];

const portfolioSections = [
  {
    id: "handwerk",
    icon: Wrench,
    title: "Handwerk",
    subtitle: "Meisterbetrieb",
    motto: "Werte erhalten",
    href: "/handwerk",
    color: "bg-amber-500/10 text-amber-600",
    borderColor: "border-amber-500/30",
    services: [
      { icon: Zap, title: "Elektrotechnik", href: "/handwerk/elektrotechnik" },
      { icon: Gauge, title: "Sanitär & Heizung", href: "/handwerk/sanitaer-heizung" },
      { icon: Settings, title: "Service & Wartung", href: "/handwerk/service-wartung" },
    ],
  },
  {
    id: "facility",
    icon: Building,
    title: "Facility Management",
    subtitle: "Rundum-Sorglos",
    motto: "Alles aus einer Hand",
    href: "/facility-management",
    color: "bg-blue-500/10 text-blue-600",
    borderColor: "border-blue-500/30",
    services: [
      { icon: Home, title: "Hausmeisterservice", href: "/facility-management/hausmeisterservice" },
      { icon: Building, title: "Objektmanagement", href: "/facility-management/objektmanagement" },
      { icon: Clock, title: "Winterdienst", href: "/aussenanlagen/winterdienst" },
    ],
  },
  {
    id: "reinigung",
    icon: Sparkles,
    title: "Reinigung",
    subtitle: "Glänzender Eindruck",
    motto: "Sauberkeit, die begeistert",
    href: "/reinigung",
    color: "bg-cyan-500/10 text-cyan-600",
    borderColor: "border-cyan-500/30",
    services: [
      { icon: Building, title: "Büroreinigung", href: "/reinigung/bueroreinigung" },
      { icon: Sparkles, title: "Unterhaltsreinigung", href: "/reinigung/unterhaltsreinigung" },
      { icon: Home, title: "Grundreinigung", href: "/reinigung/grundreinigung" },
      { icon: Zap, title: "Glas & Fassade", href: "/reinigung/glas-fassade" },
      { icon: Settings, title: "Sonderreinigung", href: "/reinigung/sonderreinigung" },
      { icon: Car, title: "Tiefgaragenreinigung", href: "/reinigung/tiefgaragenreinigung" },
    ],
  },
  {
    id: "aussen",
    icon: TreePine,
    title: "Außenanlagen",
    subtitle: "Visitenkarte des Hauses",
    motto: "Der erste Eindruck zählt",
    href: "/aussenanlagen",
    color: "bg-green-500/10 text-green-600",
    borderColor: "border-green-500/30",
    services: [
      { icon: TreePine, title: "Grünpflege", href: "/aussenanlagen/gruenpflege" },
      { icon: TreePine, title: "Baumpflege", href: "/aussenanlagen/baumpflege" },
      { icon: Clock, title: "Winterdienst", href: "/aussenanlagen/winterdienst" },
    ],
  },
];

const testimonials = [
  {
    quote: "Endlich ein Dienstleister, bei dem ich meinen Ansprechpartner persönlich kenne. Das macht den Unterschied.",
    author: "Michael K.",
    role: "Hausverwaltung München",
    rating: 5,
  },
  {
    quote: "Bei Problemen wird nicht diskutiert, sondern gelöst. Das nenne ich Handschlagqualität.",
    author: "Sandra M.",
    role: "Objektleiterin Frankfurt",
    rating: 5,
  },
  {
    quote: "Seit 3 Jahren unser Partner – und immer noch derselbe Objektleiter. Das gibt es sonst nirgends.",
    author: "Thomas B.",
    role: "Gewerbeimmobilien Hamburg",
    rating: 5,
  },
];

const locations = [
  { name: "München", href: "/standorte/muenchen" },
  { name: "Augsburg", href: "/standorte/augsburg" },
  { name: "Ingolstadt", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", href: "/standorte/nuernberg" },
  { name: "Frankfurt", href: "/standorte/frankfurt" },
  { name: "Hamburg", href: "/standorte/hamburg" },
  { name: "Berlin", href: "/standorte/berlin" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mr.Clean Services",
  description: "Persönliches Facility Management mit echten Werten. Elektrotechnik, Reinigung, Hausmeisterservice und Außenanlagen aus einer Hand.",
  url: "https://mrclean-services.de/ueber-uns",
  areaServed: [
    { "@type": "City", name: "München" },
    { "@type": "City", name: "Augsburg" },
    { "@type": "City", name: "Ingolstadt" },
    { "@type": "City", name: "Nürnberg" },
    { "@type": "City", name: "Frankfurt" },
    { "@type": "City", name: "Hamburg" },
    { "@type": "City", name: "Berlin" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Facility Management Leistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Elektrotechnik" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facility Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reinigung" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Außenanlagen" } },
    ],
  },
};

export default function UeberUns() {
  return (
    <div className="theme-about flex min-h-screen flex-col">
      <SEOHead
        title="Über uns – Facility Management, aber persönlich | Mr.Clean Services"
        description="Schluss mit Anonymität. Wir verbinden professionelles Handwerk mit echten Werten. Feste Ansprechpartner, Handschlagqualität und Qualität vor Profit."
        keywords={["Facility Management persönlich", "Handwerk mit Werten", "Objektleiter", "Hausmeisterservice München", "Elektrotechnik Meisterbetrieb"]}
        canonicalUrl="https://mrclean-services.de/ueber-uns"
        structuredData={structuredData}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[600px] items-center bg-gradient-to-br from-primary via-primary to-primary/95 lg:min-h-[700px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 py-20 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                <Users className="h-4 w-4" />
                Gesichter statt Nummern
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Facility Management,<br />
                <span className="text-foreground/90">aber persönlich.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/75 md:text-xl lg:max-w-2xl">
                Schluss mit Anonymität und Dienstleistung nach Schema F. 
                Wir verbinden professionelles Handwerk mit echten Werten – 
                und Sie bekommen immer einen Menschen, keinen Algorithmus.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/anfrage">
                  <Button className="w-full sm:w-auto h-14 px-8 text-base rounded-full bg-slate-800 text-white hover:bg-slate-700">
                    Jetzt persönlichen Beratungstermin buchen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:+498912345678" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-800/40 bg-slate-800/10 px-6 py-3 font-semibold text-slate-800 backdrop-blur-sm transition-all hover:bg-slate-800/20">
                  <Phone className="h-5 w-5" />
                  Direkt anrufen
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Unsere Vision
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                  Warum wir die Branche<br />neu denken.
                </h2>
                <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Wir sind kein anonymer Riese.</strong> Bei uns 
                    kennt Ihr Objektleiter Ihre Immobilie besser als seine eigene Wohnung. Er weiß, 
                    wo der Hausmeister den Ersatzschlüssel versteckt und welche Tür im Winter klemmt.
                  </p>
                  <p>
                    <strong className="text-foreground">Bei uns ist Qualität wichtiger als Profit.</strong> Wir 
                    bezahlen unsere Mitarbeiter fair – nicht weil wir müssen, sondern weil motivierte Profis 
                    bessere Arbeit leisten. Das merken Sie an jedem Detail.
                  </p>
                  <p>
                    <strong className="text-foreground">Wir sind Ihr greifbarer Partner vor Ort.</strong> Kein 
                    Callcenter in einer anderen Stadt, kein Bot, der Ihre E-Mail beantwortet. Sondern echte 
                    Menschen, die echte Verantwortung übernehmen.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-border">
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <Users className="h-16 w-16 text-primary/40 mb-4" />
                    <p className="text-muted-foreground font-medium">Echtes Team-Foto</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">Keine Stock-Bilder – echte Menschen</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-primary p-6 text-white shadow-xl">
                  <p className="text-3xl font-black">15+</p>
                  <p className="text-sm text-white/80">Jahre Erfahrung</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-surface py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                Unsere Werte
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                Was uns antreibt
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Vier Prinzipien, die jeden Tag unser Handeln bestimmen.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-3xl bg-background p-8 shadow-sm border border-border transition-shadow hover:shadow-lg"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/10">
                      <value.icon className="h-7 w-7 text-slate-700" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800/10 px-3 py-1 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="h-4 w-4" />
                      {value.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase - 4 Säulen als Kacheln */}
        <section className="bg-surface py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Unser Leistungs-Portfolio
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                Vier Säulen für Ihren Erfolg
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Alles aus einer Hand – mit persönlichem Ansprechpartner für jeden Bereich.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {portfolioSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                  className={`rounded-3xl border bg-background p-6 lg:p-8 ${section.borderColor}`}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`rounded-2xl p-4 ${section.color}`}>
                      <section.icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <Link to={section.href} className="group">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {section.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                        </div>
                      </Link>
                      <p className="text-sm font-medium text-primary mt-1">{section.subtitle}</p>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-primary" />
                        {section.motto}
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    {section.services.map((service, serviceIndex) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: serviceIndex * 0.03 }}
                      >
                        <Link
                          to={service.href}
                          className="group flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-3 transition-all hover:border-primary/30 hover:bg-surface hover:shadow-sm"
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${section.color}`}>
                            <service.icon className="h-4 w-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer Link */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      to={section.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Alle {section.title}-Leistungen
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Stimmen unserer Partner
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                Was Kunden über uns sagen
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-3xl bg-surface p-8 border border-border"
                >
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                  <Handshake className="h-4 w-4" />
                  Für Handwerker
                </span>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-white lg:text-4xl">
                  Werde Partner<br />auf Augenhöhe
                </h2>
                <p className="mt-6 text-lg text-white/80 leading-relaxed">
                  Du bist stolzer Handwerker und suchst einen Partner, der deine Arbeit wertschätzt? 
                  Bei uns bist du keine Nummer – sondern ein geschätztes Mitglied unseres Teams.
                </p>
                <ul className="mt-8 space-y-4">
                  {["Faire Konditionen", "Regelmäßige Aufträge", "Kollegiales Miteinander", "Pünktliche Bezahlung"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white">
                      <CheckCircle2 className="h-5 w-5 text-white/80" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/partner-werden">
                    <Button className="h-14 px-8 text-base rounded-full bg-white text-primary hover:bg-white/90">
                      Jetzt Partner werden
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-3xl bg-white/10 border border-white/20">
                  <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                    <Handshake className="h-20 w-20 text-white/40 mb-4" />
                    <p className="text-white/70 font-medium">Partner-Netzwerk</p>
                    <p className="text-sm text-white/50 mt-2">Echte Bilder unserer Partner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet CTA */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6">
                <Shield className="h-4 w-4" />
                Kostenlos & unverbindlich
              </div>
              <h2 className="text-3xl font-black tracking-tight text-foreground lg:text-4xl">
                Kostenloser Objekt-Check
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Unsere Experten analysieren Ihr Objekt vor Ort und erstellen ein individuelles 
                Konzept – ohne versteckte Kosten, ohne Verpflichtung.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/anfrage">
                  <Button className="w-full sm:w-auto h-14 px-8 text-base rounded-full">
                    Objekt-Check anfordern
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/rechner">
                  <AnimatedButton className="w-full sm:w-auto">
                    Kosten berechnen
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="bg-surface py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-foreground">
                Unsere Standorte
              </h2>
              <p className="mt-2 text-muted-foreground">
                Von München bis Berlin – immer in Ihrer Nähe.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {locations.map((location) => (
                  <Link
                    key={location.name}
                    to={location.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
                  >
                    <MapPin className="h-4 w-4" />
                    {location.name}
                  </Link>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-3 rounded-2xl bg-primary/10 px-6 py-4">
                <Phone className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <a href="tel:+498912345678" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                    +49 89 123 456 78
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Hier gehen echte Menschen ans Telefon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
