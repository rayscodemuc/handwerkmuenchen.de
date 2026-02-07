import type { NetzwerkCard } from "@/lib/leistungen/config";

type NetzwerkPrinzipienProps = {
  cards: NetzwerkCard[];
  sectionHeading?: string;
  sectionSubline?: string;
};

export function NetzwerkPrinzipien({
  cards,
  sectionHeading = "So arbeitet die Meisterrunde",
  sectionSubline = "Feste Fachbetriebe, klare Zuständigkeit und saubere Dokumentation statt Subunternehmerkette.",
}: NetzwerkPrinzipienProps) {
  if (!cards?.length) return null;
  return (
    <section className="bg-[#26413C] py-16 lg:py-20" aria-labelledby="netzwerk-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 id="netzwerk-heading" className="text-2xl font-bold text-white md:text-3xl">
            {sectionHeading}
          </h2>
          <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
            {sectionSubline}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07] hover:border-white/15"
            >
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-white/75 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
