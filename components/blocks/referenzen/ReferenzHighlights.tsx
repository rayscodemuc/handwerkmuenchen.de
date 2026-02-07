import type { ProjectItem, ProjectTestimonial } from "@/lib/referenzen/types";
import { Quote } from "lucide-react";

export type HighlightItem = {
  text: string;
  author: string;
  source?: string;
  date?: string;
  projectTitle?: string;
};

type ReferenzHighlightsProps = {
  items: HighlightItem[];
};

export function ReferenzHighlights({ items }: ReferenzHighlightsProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="border-t border-[#E5E7EB] bg-[#FCFCFC] py-16 lg:py-20"
      aria-labelledby="referenz-highlights-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <h2
          id="referenz-highlights-heading"
          className="text-center text-2xl font-bold text-[#313D5A] md:text-3xl"
        >
          Ausgewählte Bewertungen
        </h2>
        <p className="mt-2 text-center text-sm text-[#73628A]">
          Echte Rückmeldungen aus unseren Projekten – keine Fake-Bewertungen.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <blockquote
              key={i}
              className="flex flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-6"
            >
              <Quote className="h-8 w-8 text-[#73628A]/40" aria-hidden />
              <p className="mt-3 flex-1 text-[#313D5A] leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-[#E5E7EB] pt-3">
                <cite className="not-italic">
                  <span className="font-medium text-[#313D5A]">{item.author}</span>
                  {item.source && (
                    <span className="text-sm text-[#73628A]"> · {item.source}</span>
                  )}
                  {item.date && (
                    <span className="text-sm text-[#73628A]"> · {item.date}</span>
                  )}
                </cite>
                {item.projectTitle && (
                  <p className="mt-1 text-xs text-[#73628A]">{item.projectTitle}</p>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Helper: Projekte mit Testimonial in Highlight-Items umwandeln */
export function projectTestimonialsToHighlights(
  projects: ProjectItem[]
): HighlightItem[] {
  return projects
    .filter((p): p is ProjectItem & { testimonial: ProjectTestimonial } =>
      Boolean(p.testimonial)
    )
    .map((p) => ({
      text: p.testimonial!.text,
      author: p.testimonial!.author,
      source: p.testimonial!.source,
      date: p.testimonial!.date,
      projectTitle: p.title,
    }));
}
