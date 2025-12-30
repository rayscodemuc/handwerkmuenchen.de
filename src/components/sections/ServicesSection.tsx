import { CreditCard, Shield, BarChart3, Users, ArrowRight } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Service Category One",
    description: "Brief description of this service category and what it offers to customers. Clear, focused messaging.",
  },
  {
    icon: Shield,
    title: "Service Category Two",
    description: "Brief description of this service category and what it offers to customers. Clear, focused messaging.",
  },
  {
    icon: BarChart3,
    title: "Service Category Three",
    description: "Brief description of this service category and what it offers to customers. Clear, focused messaging.",
  },
  {
    icon: Users,
    title: "Service Category Four",
    description: "Brief description of this service category and what it offers to customers. Clear, focused messaging.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Explore our range of services designed to meet your needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {services.map((service) => (
            <a
              key={service.title}
              href="#"
              className="group relative rounded-2xl border border-border bg-card p-10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg lg:p-12"
            >
              {/* Icon */}
              <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-surface">
                <service.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground lg:text-2xl">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Link */}
              <div className="mt-8 inline-flex items-center text-primary font-medium transition-all group-hover:gap-3">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
