import { Network } from "lucide-react";

export function CategoryTrustSection() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Network className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Ein Ansprechpartner – alle Lösungen
          </h2>

          {/* Text */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Generalunternehmer-Modell: ein Vertrag, ein Ansprechpartner. Pro Gewerk ein verantwortlicher 
            Meister als Qualitätsinstanz – keine Plattform, keine anonymen Subunternehmer. 
            Volle Haftung, volle Transparenz.
          </p>
        </div>
      </div>
    </section>
  );
}
