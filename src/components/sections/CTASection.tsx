import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-16 text-center sm:px-16 lg:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />

          {/* Content */}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl lg:text-5xl">
              Final call to action headline
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Encouraging text that motivates the visitor to take the next step.
              Keep it brief and action-oriented.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Primary Action
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-background/30 bg-transparent text-background hover:bg-background/10"
              >
                Secondary Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
