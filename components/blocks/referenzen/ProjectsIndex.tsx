"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import type { ProjectItem } from "@/lib/referenzen/types";
import { getProjectsWithTestimonial } from "@/lib/referenzen/projects";
import { ReferenzenGrid } from "./ReferenzenGrid";
import {
  ReferenzHighlights,
  projectTestimonialsToHighlights,
} from "./ReferenzHighlights";
import { AnimatedButton } from "@/components/ui/animated-button";
import { gewerkSlugToLabel, type GewerkSlug } from "@/lib/referenzen/projects";

type ProjectsIndexProps = {
  projects: ProjectItem[];
  /** Wenn gesetzt: Zeile „Gewerk: X“ + Link „Alle Projekte“ anzeigen. */
  activeGewerkSlug?: GewerkSlug | null;
};

export function ProjectsIndex({
  projects,
  activeGewerkSlug,
}: ProjectsIndexProps) {
  const testimonialProjects = getProjectsWithTestimonial();
  const highlightItems = projectTestimonialsToHighlights(testimonialProjects);

  return (
    <>
      <div className="container mx-auto px-4 py-10 lg:px-8">
        {activeGewerkSlug && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground">
              Gewerk: {gewerkSlugToLabel[activeGewerkSlug]}
            </span>
            <Link
              href="/projekte"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Alle Projekte
            </Link>
          </div>
        )}
        <ReferenzenGrid
          projects={projects}
          emptyMessage={
            activeGewerkSlug
              ? "Keine Projekte in diesem Gewerk."
              : undefined
          }
        />
      </div>

      <ReferenzHighlights items={highlightItems} />

      <section id="kontakt" className="border-t border-border bg-[#26413C] py-16 lg:py-20" aria-labelledby="projekte-cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
            <h2 id="projekte-cta-heading" className="text-2xl font-bold text-white md:text-3xl">
              Eigenes Projekt anfragen
            </h2>
            <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
              München &amp; Umgebung · Ein Ansprechpartner für alle Gewerke. Unverbindlich anfragen, klare Einschätzung.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/anfrage">
                <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                  Projekt anfragen
                </AnimatedButton>
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-transparent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden />
                Rückruf anfordern
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Feste Meisterbetriebe im Netzwerk · Keine Subunternehmerkette
            </p>
            <p className="mt-4">
              <Link href="/projekte" className="text-sm font-medium text-white/80 hover:text-white underline underline-offset-2">
                Alle Projekte
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
