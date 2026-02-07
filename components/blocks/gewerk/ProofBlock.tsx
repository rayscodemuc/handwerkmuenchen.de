type ProofBlockProps = {
  items: string[];
  heading?: string;
};

export function ProofBlock({ items, heading = "Typische Objekte" }: ProofBlockProps) {
  if (!items?.length) return null;
  return (
    <section className="bg-[#FCFCFC] py-12 lg:py-16 border-t border-[#E5E7EB]" aria-labelledby="proof-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 id="proof-heading" className="text-center text-lg font-semibold text-[#313D5A] mb-6">
          {heading}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {items.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#73628A]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
