import { CreditCard, Shield, BarChart3, Users } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Service Category One",
    description: "Brief description of this service category and what it offers to customers.",
    features: ["Feature point one", "Feature point two", "Feature point three"],
  },
  {
    icon: Shield,
    title: "Service Category Two",
    description: "Brief description of this service category and what it offers to customers.",
    features: ["Feature point one", "Feature point two", "Feature point three"],
  },
  {
    icon: BarChart3,
    title: "Service Category Three",
    description: "Brief description of this service category and what it offers to customers.",
    features: ["Feature point one", "Feature point two", "Feature point three"],
  },
  {
    icon: Users,
    title: "Service Category Four",
    description: "Brief description of this service category and what it offers to customers.",
    features: ["Feature point one", "Feature point two", "Feature point three"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-surface py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Services Overview
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Brief section description explaining the range of services available.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <a
                href="#"
                className="mt-6 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Learn more
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
