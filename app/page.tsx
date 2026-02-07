import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Facility Management, Handwerk & Reinigung in München",
  description: "Generalunternehmer für Facility Management, Handwerk und Reinigung: ein Vertrag, ein Ansprechpartner. Pro Gewerk ein verantwortlicher Meister – keine Plattform, keine anonymen Subunternehmer.",
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
