import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Facility Management, Handwerk & Reinigung in München, Hamburg, Berlin & bundesweit",
  description: "Mr. Clean Services: Ihr zentraler Partner für Handwerk, Facility Management und Reinigung. Ein Ansprechpartner, volle Koordination & geprüfte Fachqualität aus einer Hand.",
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
