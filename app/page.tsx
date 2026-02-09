import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "handwerkmuenchen.de | Ihr Meisterbetrieb für Sanitär, Elektro & Ausbau in München",
  description: "Professionelle Handwerksleistungen in München. Von der Reparatur bis zur Sanierung – meistergeführt, zuverlässig und direkt. Ihr Partner für Privatkunden, Gewerbe & Hausverwaltungen. Alles aus einer Hand, keine Subunternehmer-Ketten.",
  keywords: [
    "Handwerk München",
    "Meisterbetrieb München",
    "Sanitär München",
    "Elektroinstallation München",
    "Innenausbau München",
    "Badsanierung München",
    "Immobilien Instandhaltung München",
    "Renovierung München",
    "Handwerkerservice München",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <CTASection />
    </>
  );
}
