"use client";

import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";

export function CTASection() {
  return (
    <section id="contact" className="bg-primary py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-primary-foreground lg:text-5xl">
            Bereit durchzustarten?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Lassen Sie uns gemeinsam die optimale Lösung für Ihr Objekt finden.
          </p>

          {/* CTA Button */}
          <div className="mt-12 flex justify-center">
            <Link href="/kontakt">
              <AnimatedButton className="h-14 px-10 text-base bg-foreground text-background hover:bg-background hover:text-foreground">
                Kontakt aufnehmen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
