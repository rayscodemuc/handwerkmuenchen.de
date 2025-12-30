const logos = [
  { name: "Partner One", width: 120 },
  { name: "Partner Two", width: 100 },
  { name: "Partner Three", width: 130 },
  { name: "Partner Four", width: 110 },
  { name: "Partner Five", width: 120 },
  { name: "Partner Six", width: 100 },
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
    <section className="bg-surface py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by organizations
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-8 items-center justify-center"
                style={{ width: logo.width }}
              >
                <div className="h-6 w-full rounded bg-muted-foreground/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-border" />

        {/* Testimonials */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What People Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Feedback from those who have experienced the service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              {/* Quote Icon */}
              <svg
                className="mb-4 h-8 w-8 text-primary/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Quote */}
              <p className="text-foreground">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-medium text-foreground">
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
