const logos = [
  { name: "Partner One" },
  { name: "Partner Two" },
  { name: "Partner Three" },
  { name: "Partner Four" },
  { name: "Partner Five" },
];

const testimonials = [
  {
    quote: "Placeholder testimonial text that speaks to the quality of service and customer satisfaction.",
    author: "Person Name",
    role: "Job Title, Company",
  },
  {
    quote: "Another placeholder testimonial highlighting a different aspect of the service or experience.",
    author: "Person Name",
    role: "Job Title, Company",
  },
  {
    quote: "Third testimonial placeholder emphasizing trust, reliability, or specific benefits received.",
    author: "Person Name",
    role: "Job Title, Company",
  },
];

export function SocialProofSection() {
  return (
    <section className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by organizations
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-8 w-28 items-center justify-center"
              >
                <div className="h-5 w-full rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-24 border-t border-border" />

        {/* Testimonials */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            What People Say
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Feedback from those who have experienced the service.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-10"
            >
              {/* Quote */}
              <p className="text-lg text-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
