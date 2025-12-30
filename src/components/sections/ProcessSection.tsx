const steps = [
  {
    number: "01",
    title: "Step One",
    description: "Brief description of what happens in this step of the process.",
  },
  {
    number: "02",
    title: "Step Two",
    description: "Brief description of what happens in this step of the process.",
  },
  {
    number: "03",
    title: "Step Three",
    description: "Brief description of what happens in this step of the process.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-surface py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple overview of the process from start to finish.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />

            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step Card */}
                  <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                    {/* Step Number */}
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                      <svg
                        className="h-8 w-8 text-border"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
