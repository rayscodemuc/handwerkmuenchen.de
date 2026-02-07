import { Shield, Clock, Award, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Value Proposition One",
    description: "Brief explanation of this key value or benefit that sets the organization apart.",
  },
  {
    icon: Clock,
    title: "Value Proposition Two",
    description: "Brief explanation of this key value or benefit that sets the organization apart.",
  },
  {
    icon: Award,
    title: "Value Proposition Three",
    description: "Brief explanation of this key value or benefit that sets the organization apart.",
  },
  {
    icon: Headphones,
    title: "Value Proposition Four",
    description: "Brief explanation of this key value or benefit that sets the organization apart.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-card py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Why Choose Us
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Key differentiators and value propositions.
          </p>
        </div>

        {/* Trust Items */}
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-background">
                <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
