import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-facility.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
      {/* Main Container */}
      <div className="relative min-h-[600px] sm:min-h-[540px] lg:min-h-[650px] pt-8 lg:pt-12">
        
        {/* Full background image with overlay for all devices */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Professionelles Facility-Management Team bei der Arbeit"
            className="h-full w-full object-cover pointer-events-none"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(198,29%,76%)]/95 via-[hsl(198,29%,76%)]/80 to-transparent lg:from-[hsl(198,29%,76%)]/90 lg:via-[hsl(198,29%,76%)]/70 lg:to-transparent" />
        </div>

        {/* Content Container */}
        <div className="container relative mx-auto flex min-h-[560px] sm:min-h-[500px] items-center px-4 lg:min-h-[600px] lg:px-8">
          {/* Left Content */}
          <div className="relative z-10 w-full py-12 sm:py-16 lg:w-1/2 lg:py-24">
            {/* Main Headline - Smaller on mobile */}
            <h1 className="font-bold leading-[0.9] tracking-tight text-foreground">
              <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                Partnerschaft
              </span>
              <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                statt nur Vertrag
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 sm:mt-8 max-w-[420px] text-sm sm:text-base leading-relaxed text-foreground/80 lg:text-lg lg:text-foreground/70">
              Weg von der Austauschbarkeit, hin zur persönlichen Verantwortung. Mr. Clean Services verbindet professionelles Facility Management mit echter Handschlagqualität.
            </p>

            {/* CTA Buttons - Full width on mobile */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/anfrage" className="w-full sm:w-auto">
                <AnimatedButton className="w-full sm:w-auto bg-foreground text-white hover:bg-foreground/90 shadow-lg shadow-foreground/20 text-base px-8 py-5 sm:py-6">
                  Angebot anfragen
                </AnimatedButton>
              </Link>
              <Link to="/rechner" className="w-full sm:w-auto">
                <AnimatedButton 
                  className="w-full sm:w-auto border-foreground/30 bg-white/50 sm:bg-transparent text-foreground hover:bg-foreground/10 text-base px-8 py-5 sm:py-6"
                >
                  <Calculator className="w-5 h-5" />
                  Preis berechnen
                </AnimatedButton>
              </Link>
            </div>

            {/* Trust Badge - Stack on mobile */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-foreground/70 sm:text-foreground/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Kostenlos & unverbindlich
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Antwort in 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
