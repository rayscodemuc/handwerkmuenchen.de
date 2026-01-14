"use client";

import { Shield, Clock, Award, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: Shield,
    title: "100% Haftungsübernahme",
    description: "Wir übernehmen die volle Verantwortung für unsere Arbeit – rechtssicher und zuverlässig.",
  },
  {
    icon: Clock,
    title: "24/7 Erreichbarkeit",
    description: "Rund um die Uhr für Sie da – bei Notfällen und dringenden Anliegen.",
  },
  {
    icon: Award,
    title: "Zertifizierte Qualität",
    description: "Geschultes Fachpersonal mit regelmäßigen Weiterbildungen und Qualitätskontrollen.",
  },
  {
    icon: Users,
    title: "Feste Ansprechpartner",
    description: "Persönliche Betreuung durch dedizierte Objektleiter für Ihr Projekt.",
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-card py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Ihre Vorteile
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground lg:text-5xl">
            Warum Wir
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Was uns von anderen unterscheidet und warum Kunden uns vertrauen.
          </p>
          <Link 
            href="/ueber-uns" 
            className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Mehr über uns erfahren
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Reasons Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-3xl bg-background p-8 transition-all duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                <reason.icon
                  className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
