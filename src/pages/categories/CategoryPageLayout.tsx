import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

interface CategoryPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  metaDescription?: string;
  services: ServiceItem[];
}

export function CategoryPageLayout({
  title,
  subtitle,
  description,
  metaDescription,
  services,
}: CategoryPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title={title}
        description={metaDescription || description}
      />
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
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              {description}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  to={service.href}
                  className="group rounded-3xl bg-surface p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                    <span>Mehr erfahren</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <AnimatedButton className="h-14 px-10 text-base bg-primary text-primary-foreground hover:bg-foreground hover:text-background">
                Angebot anfragen
              </AnimatedButton>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
