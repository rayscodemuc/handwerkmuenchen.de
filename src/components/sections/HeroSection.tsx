import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hiking.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[hsl(280,75%,55%)] lg:min-h-[700px]">
      {/* Main Grid Layout */}
      <div className="relative flex min-h-[600px] lg:min-h-[700px]">
        {/* Left Content Side */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-16 lg:py-24">
          <div className="max-w-xl">
            {/* Main Headline */}
            <h1 className="font-bold leading-[0.95] tracking-tight text-white">
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                For every
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                journey
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-8 max-w-md text-base leading-relaxed text-white/80 lg:text-lg">
              Placeholder text about the service—it's about people. We're here 
              for your journey, from your daily moves to life's big leaps.
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Button 
                variant="hero-white" 
                size="xl"
                className="rounded-full"
              >
                Become a member
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image Side with Diagonal Clip */}
        <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
          <div 
            className="h-full w-full"
            style={{
              clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <img
              src={heroImage}
              alt="Group hiking on mountain trail"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Mobile Image (below content) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 lg:hidden">
          <div 
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <img
              src={heroImage}
              alt="Group hiking on mountain trail"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
