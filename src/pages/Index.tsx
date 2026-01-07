import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SEOHead } from "@/components/SEOHead";
import { StickyCTA, MobileStickyCTA } from "@/components/StickyCTA";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Facility Management, Handwerk & Reinigung in München, Hamburg, Berlin & bundesweit"
        description="Mr. Clean Services: Ihr zentraler Partner für Handwerk, Facility Management und Reinigung. Ein Ansprechpartner, volle Koordination & geprüfte Fachqualität aus einer Hand."
      />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <CTASection />
      </main>
      <Footer />
      <StickyCTA />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;
