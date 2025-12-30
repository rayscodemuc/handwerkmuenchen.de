import { Shield, Clock, Award, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Value Proposition One",
    description: "Brief explanation of this key value or benefit.",
  },
  {
    icon: Clock,
    title: "Value Proposition Two",
    description: "Brief explanation of this key value or benefit.",
  },
  {
    icon: Award,
    title: "Value Proposition Three",
    description: "Brief explanation of this key value or benefit.",
  },
  {
    icon: Headphones,
    title: "Value Proposition Four",
    description: "Brief explanation of this key value or benefit.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Key differentiators and value propositions that set the organization apart.
          </p>
        </div>

        {/* Trust Items */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface transition-colors group-hover:bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
