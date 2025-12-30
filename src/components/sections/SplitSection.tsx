import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Key feature or benefit point one",
  "Key feature or benefit point two",
  "Key feature or benefit point three",
  "Key feature or benefit point four",
];

export function SplitSection() {
  return (
    <section id="about" className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-xl bg-primary/10" />
                  <p className="text-sm text-muted-foreground">Image placeholder</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-primary/10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              Section Label
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Compelling section headline
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Supporting paragraph that expands on the headline and provides context
              for the features listed below.
            </p>

            {/* Feature List */}
            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-8">
              <Button size="lg">
                Call to Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
