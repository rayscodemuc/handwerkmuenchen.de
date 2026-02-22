import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Ihr Meisterbetrieb für Sanitär, Elektro & Ausbau in München",
  description:
    "Meistergeführtes Handwerk in München: Sanitär, Elektro & Innenausbau aus einer Hand. Zuverlässig für Privat & Hausverwaltung – ohne Subunternehmer-Ketten.",
  keywords: [
    "Handwerk München",
    "Meisterbetrieb München",
    "Sanitär München",
    "Elektroinstallation München",
    "Innenausbau München",
    "Hausverwaltung Handwerker",
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
