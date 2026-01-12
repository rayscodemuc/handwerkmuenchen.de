import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import heroImageDesktop from "@/assets/hero-facility-desktop.webp";
import heroImageMobile from "@/assets/hero-facility-mobile.webp";
import { CheckCircle2, Calculator } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
      {/* Main Container - responsive height for large screens */}
      <div className="relative min-h-[480px] md:min-h-[520px] lg:min-h-[70vh] lg:max-h-[800px]">
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
        {/* Gradient overlay - refined transparency for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/75 lg:from-primary/55 lg:via-primary/50 lg:to-primary/65" />
      </div>

        {/* Content Container - Centered */}
        <div className="container relative mx-auto flex min-h-[560px] sm:min-h-[500px] items-center justify-center px-4 lg:min-h-[70vh] lg:max-h-[800px] lg:px-8">
          {/* Centered Content with Fade-in Animation */}
          <motion.div 
            className="relative z-10 w-full max-w-3xl py-12 sm:py-16 lg:py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Headline with staggered animation */}
            <motion.h1 
              className="font-bold leading-[0.9] tracking-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                Partnerschaft
              </span>
              <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                statt nur Vertrag
              </span>
            </motion.h1>

            {/* Subheadline with delayed fade-in */}
            <motion.p 
              className="mt-6 sm:mt-8 mx-auto max-w-[480px] text-sm sm:text-base leading-relaxed text-foreground/80 lg:text-lg lg:text-foreground/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              Professionelles Facility Management mit echter Handschlagqualität – persönlich, zuverlässig, partnerschaftlich.
            </motion.p>

            {/* CTA Buttons with delayed fade-in */}
            <motion.div 
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
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
            </motion.div>

            {/* Trust Badge with delayed fade-in */}
            <motion.div 
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center sm:items-center gap-2 sm:gap-6 text-sm text-foreground/70 sm:text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <span className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Kostenlos & unverbindlich
              </span>
              <span className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Antwort in 24h
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
