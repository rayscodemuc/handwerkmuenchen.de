import { AnimatedButton } from "@/components/ui/animated-button";
import { Check } from "lucide-react";

const features = [
  "Key feature or benefit point one",
  "Key feature or benefit point two",
  "Key feature or benefit point three",
  "Key feature or benefit point four",
];

export function SplitSection() {
  return (
    <section id="about" className="bg-card py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image Placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-background">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-muted" />
                  <p className="text-sm text-muted-foreground">Image placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              About Us
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Compelling section headline
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Supporting paragraph that expands on the headline and provides context
              for the features listed below. Keep it clear and value-focused.
            </p>

            {/* Feature List */}
            <ul className="mt-10 space-y-5">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-4">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-12">
              <AnimatedButton>
                Mehr erfahren
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
