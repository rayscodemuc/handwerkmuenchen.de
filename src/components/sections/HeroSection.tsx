import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hiking.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[hsl(198,29%,76%)]">
      {/* Main Container */}
      <div className="relative min-h-[540px] lg:min-h-[650px] pt-8 lg:pt-12">
        {/* Background Image with Diagonal Clip - Full Width */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: "polygon(45% 0, 100% 0, 100% 100%, 25% 100%)",
          }}
        >
          <img
            src={heroImage}
            alt="Group hiking on mountain trail"
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
                For every
              </span>
              <span className="block text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                journey
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-8 max-w-[420px] text-base leading-relaxed text-foreground/70 lg:text-lg">
              Beem is more than banking—it's about people. We're here for your 
              journey, from your daily money moves to life's big leaps.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Button 
                variant="hero-white" 
                size="lg"
                className="rounded-full px-8"
              >
                Become a member
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
