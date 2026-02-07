const steps = [
  {
    number: "01",
    title: "Step One",
    description: "Brief description of what happens in this step of the process. Keep it clear and concise.",
  },
  {
    number: "02",
    title: "Step Two",
    description: "Brief description of what happens in this step of the process. Keep it clear and concise.",
  },
  {
    number: "03",
    title: "Step Three",
    description: "Brief description of what happens in this step of the process. Keep it clear and concise.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A simple overview of the process from start to finish.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center lg:text-left">
              {/* Step Number */}
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {step.number}
              </div>

              {/* Connector Line - Desktop */}
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-border lg:block" />
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground lg:text-2xl">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
