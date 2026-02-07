"use client";

import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";

export function CTASection() {
  return (
    <section id="contact" className="bg-[#8AB0AB] py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            Unverbindlich anfragen. Klarheit gewinnen.
          </h2>
          <p className="mt-6 text-lg text-white">
            Sie erhalten eine saubere Einschätzung, passende Optionen und einen nächsten Schritt.
          </p>

          {/* CTA Button */}
          <div className="mt-12 flex justify-center">
            <Link href="/kontakt">
              <AnimatedButton className="h-14 px-10 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Kontakt aufnehmen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
