import { AnimatedButton } from "@/components/ui/animated-button";

export function CTASection() {
  return (
    <section id="contact" className="bg-surface py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Ready to get started?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Take the next step. Our team is here to help you every step of the way.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <AnimatedButton className="h-14 px-10 text-base bg-primary text-primary-foreground hover:bg-foreground hover:text-background">
              Jetzt starten
            </AnimatedButton>
            <AnimatedButton className="h-14 px-10 text-base">
              Kontakt aufnehmen
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
