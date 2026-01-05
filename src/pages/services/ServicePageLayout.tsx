import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Check } from "lucide-react";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc?: string;
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  features,
  imageSrc,
}: ServicePageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              {subtitle}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
              {title}
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text Content */}
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {description}
                </p>

                <ul className="mt-10 space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <AnimatedButton className="h-14 px-10 text-base bg-primary text-primary-foreground hover:bg-foreground hover:text-background">
                    Angebot anfragen
                  </AnimatedButton>
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      Bild
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
