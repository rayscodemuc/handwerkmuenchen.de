import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-facility.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
      {/* Main Container */}
      <div className="relative min-h-[540px] lg:min-h-[650px] pt-8 lg:pt-12">
        {/* Background Image with Diagonal Clip - Full Width */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: "polygon(55% 0, 100% 0, 100% 100%, 35% 100%)",
          }}
        >
          <img
            src={heroImage}
            alt="Professionelles Facility-Management Team bei der Arbeit"
            className="h-full w-full object-cover pointer-events-none"
          />
        </div>

        {/* Content Container */}
        <div className="container relative mx-auto flex min-h-[500px] items-center px-4 lg:min-h-[600px] lg:px-8">
          {/* Left Content */}
          <div className="relative z-10 w-full py-16 lg:w-1/2 lg:py-24">
            {/* Main Headline */}
            <h1 className="font-bold leading-[0.9] tracking-tight text-foreground">
              <span className="block text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                Partnerschaft
              </span>
              <span className="block text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                statt nur Vertrag
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-8 max-w-[420px] text-base leading-relaxed text-foreground/70 lg:text-lg">
            Weg von der Austauschbarkeit, hin zur persönlichen Verantwortung. Mr. Clean Services verbindet professionelles Facility Management mit echter Handschlagqualität – 
            für Partner, Mitarbeiter und Kunden, die mehr erwarten als bloße Pflichterfüllung.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/anfrage">
                <AnimatedButton className="bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20 text-base px-8 py-6">
                  Angebot anfragen
                </AnimatedButton>
              </Link>
              <Link to="/rechner">
                <AnimatedButton 
                  className="border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 text-base px-8 py-6"
                >
                  <Calculator className="w-5 h-5" />
                  Preis berechnen
                </AnimatedButton>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center gap-6 text-sm text-foreground/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Kostenlos & unverbindlich
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Antwort in 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
