import { CTASection } from "@/components/sections/CTASection";
import { CategoryTrustSection } from "@/components/sections/CategoryTrustSection";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import { Wrench, Zap, Droplets, Settings, CheckCircle, Clock, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handwerk",
  description: "Maximum Tech trifft menschliche Verantwortung. Wir sind die Rebellen im Handwerk: Modernste Sensorik, digitale Präzision und Experten, bei denen ein Wort noch zählt.",
  alternates: {
    canonical: "/handwerk",
  },
};

const services = [
  {
    icon: Zap,
    title: "High-End Elektrotechnik",
    description: "Wir planen und installieren nicht nur – wir denken mit. Von intelligenter Sensorik bis zur ausfallsicheren Anlage für Gewerbe und Privat.",
    link: "/leistungen/elektrotechnik",
  },
  {
    icon: Droplets,
    title: "Smartes Sanitär & Heizung",
    description: "Effizienz durch Technik, Werterhalt durch Verstand. Wir finden Lösungen, wo andere nur Komponenten austauschen.",
    link: "/leistungen/sanitaer-heizung",
  },
  {
    icon: Settings,
    title: "Präzisions-Wartung",
    description: "Kein Abhaken von Listen. Wir nutzen digitale Diagnostik, um Schwachstellen zu finden, bevor sie zum teuren Problem werden.",
    link: "/leistungen/service-wartung",
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Digitale Präzision",
    description: "Wir nutzen modernste Messtechnik und smarte Diagnose-Tools für Fehleranalysen, die das bloße Auge übersieht.",
  },
  {
    icon: Users,
    title: "Menschliche Instanz",
    description: "Technik liefert Daten, wir liefern die Lösung. Die finale Entscheidung und Beratung erfolgt immer durch Ihren persönlichen Experten.",
  },
  {
    icon: Settings,
    title: "Zukunftssichere Systeme",
    description: "Wir verbauen keine Technik von gestern. Wir planen Anlagen, die auch in 20 Jahren noch effizient und smart funktionieren.",
  },
  {
    icon: Wrench,
    title: "Handwerk 4.0",
    description: "Effiziente digitale Prozesse im Hintergrund sorgen dafür, dass wir uns vor Ort zu 100% auf das Wesentliche konzentrieren können: Ihr Projekt.",
  },
];

export default function HandwerkCategory() {
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
              <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
              <li>
                <span className="font-medium text-primary-foreground">Handwerk</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
          {/* Background Pattern & Gradient */}
          <div className="absolute inset-0">
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--foreground))/0.08,transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--foreground))/0.05,transparent_50%)]" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground))/0.03_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))/0.03_1px,transparent_1px)] bg-[size:60px_60px]" />
            {/* Gradient accents */}
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-white/30 via-white/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-foreground/10 via-transparent to-transparent blur-3xl" />
          </div>

           <div className="relative min-h-[580px] lg:min-h-[680px] pt-4 lg:pt-6">
             {/* Content Container - Centered */}
             <div className="container relative mx-auto flex min-h-[580px] sm:min-h-[520px] items-center justify-center px-4 lg:min-h-[640px] lg:px-8">
               {/* Centered Content */}
               <div className="relative z-10 w-full max-w-4xl py-8 sm:py-12 lg:py-16 text-center">

                
                 {/* Main Headline */}
                 <h1 className="font-bold leading-[0.95] tracking-tight text-foreground">
                   <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Gegen den Strom.
                   </span>
                   <span className="block mt-2 sm:mt-3 md:mt-4 text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem]">
                     Für den Wert.
                   </span>
                 </h1>

                {/* Subheadline */}
                <p className="mt-8 sm:mt-10 mx-auto max-w-[600px] text-base sm:text-lg leading-relaxed text-foreground/70">
                  Wir beherrschen die Technik von morgen, um die Werte von heute zu erhalten. 
                  <span className="text-foreground font-medium"> Modernste Sensorik und digitale Präzision </span> 
                  als Werkzeug – aber niemals als Ersatz für den Menschen. 
                  <span className="text-foreground font-medium"> Technisches Maximum trifft echte Handschlagqualität</span>.{" "}
                  <Link href="/standorte/muenchen" className="text-primary hover:underline font-medium">
                    Standort München
                  </Link>
                </p>

                {/* CTA Button - Centered */}
                <div className="mt-10 sm:mt-12 flex justify-center">
                  <Link href="/anfrage" className="w-full sm:w-auto">
                    <AnimatedButton className="w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20 text-base px-10 py-5 sm:py-6 font-semibold">
                      Werterhalt sichern
                    </AnimatedButton>
                  </Link>
                </div>

                {/* Trust Badge - Centered */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center sm:items-center gap-3 sm:gap-8 text-sm text-foreground/60">
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Kostenlos & unverbindlich
                  </span>
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    Antwort in 24h
                  </span>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Tech & Human Connection Section */}
<section className="bg-foreground text-white py-24">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2 items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-6">
          Technik am Limit. <br />
          Beratung auf Augenhöhe.
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Wir investieren massiv in modernste Messtechnik und digitale Tools, um Fehler zu finden, bevor sie teuer werden. Aber wir investieren genauso viel in unsere Leute. Denn am Ende ist es nicht der Algorithmus, der Ihre Heizung repariert oder die Elektrik sichert – sondern ein Mensch mit Ehre und Verstand.
        </p>
        <ul className="space-y-4">
          {[
            "Keine KI-Bots in der Beratung",
            "Modernste thermografische Analyse",
            "Digitale Dokumentation in Echtzeit",
            "Direkter Draht zum Meister"
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative aspect-square lg:aspect-video rounded-2xl overflow-hidden bg-muted/20 flex items-center justify-center border border-white/10">
        {/* Hier später ein Bild von einem High-Tech Tool in einer Hand einfügen */}
        <div className="text-center p-8">
          <Settings className="h-16 w-16 text-primary mx-auto mb-4 animate-spin-slow" />
          <p className="text-xl font-medium">Precision meets Personality</p>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Services Section */}
        <section className="bg-background py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Unsere Leistungen im Bereich Handwerk & Technik
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Elektro, Sanitär und Heizung – koordiniert aus einer Hand.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.link}
                  className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-lg"
                >
                  <service.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-6 text-xl font-semibold text-foreground group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        

        {/* Why Us Section */}
        <section className="bg-muted/50 py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Ihre Vorteile
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Warum Mr.Clean Handwerk?
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <reason.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryTrustSection />
        <CTASection />
    </>
  );
}
