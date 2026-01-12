import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import heroImageDesktop from "@/assets/hero-facility-desktop.webp";
import heroImageMobile from "@/assets/hero-facility-mobile.webp";
import { CheckCircle2, Calculator } from "lucide-react";
import { useEffect } from "react";

export function HeroSection() {
  // Preload hero image for LCP optimization
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.type = 'image/webp';
    // Use desktop image for preload on larger screens
    link.href = window.innerWidth >= 768 ? heroImageDesktop : heroImageMobile;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary -mt-[1px]">
      {/* Main Container - negative margin pulls hero under header */}
      <div className="relative min-h-[480px] lg:min-h-[580px]">
      {/* Full Background Image with Art Direction */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile: Portrait crop optimized for smaller screens */}
          <source 
            media="(max-width: 767px)" 
            srcSet={heroImageMobile}
            type="image/webp"
          />
          {/* Desktop: Wide 16:9 format */}
          <source 
            media="(min-width: 768px)" 
            srcSet={heroImageDesktop}
            type="image/webp"
          />
          <img
            src={heroImageDesktop}
            alt="Partnerschaft und Vertrauen - Händeschütteln zwischen Geschäftspartnern"
            className="h-full w-full object-cover pointer-events-none"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              objectPosition: "center center",
            }}
          />
        </picture>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/75 lg:bg-primary/65" />
      </div>

        {/* Content Container - Centered */}
        <div className="container relative mx-auto flex min-h-[560px] sm:min-h-[500px] items-center justify-center px-4 lg:min-h-[600px] lg:px-8">
          {/* Centered Content */}
          <div className="relative z-10 w-full max-w-3xl py-12 sm:py-16 lg:py-24 text-center">
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
            <p className="mt-6 sm:mt-8 mx-auto max-w-[520px] text-sm sm:text-base leading-relaxed text-foreground/80 lg:text-lg lg:text-foreground/70">
              Weg von der Austauschbarkeit, hin zur persönlichen Verantwortung. Mr. Clean Services verbindet professionelles Facility Management mit echter Handschlagqualität.
            </p>

            {/* CTA Buttons - Centered */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
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

            {/* Trust Badge - Centered */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center sm:items-center gap-2 sm:gap-6 text-sm text-foreground/70 sm:text-foreground/60">
              <span className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Kostenlos & unverbindlich
              </span>
              <span className="flex items-center justify-center gap-1.5">
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
