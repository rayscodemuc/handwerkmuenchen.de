"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import {
  projects,
  allTradesFromProjects,
  allObjectTypesFromProjects,
  getProjectsWithTestimonial,
} from "@/lib/referenzen/projects";
import type { Trade, ObjectType } from "@/lib/referenzen/types";
import { ReferenzenFilter } from "./ReferenzenFilter";
import { ReferenzenGrid } from "./ReferenzenGrid";
import {
  ReferenzHighlights,
  projectTestimonialsToHighlights,
} from "./ReferenzHighlights";
import { AnimatedButton } from "@/components/ui/animated-button";

const ALL = "all";

function filterProjects(
  tradeFilter: Trade | typeof ALL,
  objectTypeFilter: ObjectType | typeof ALL
) {
  return projects.filter((p) => {
    if (tradeFilter !== ALL && !p.trades.includes(tradeFilter)) return false;
    if (objectTypeFilter !== ALL && p.objectType !== objectTypeFilter)
      return false;
    return true;
  });
}

export function MeisterleistungenContent() {
  const [tradeFilter, setTradeFilter] = useState<Trade | typeof ALL>(ALL);
  const [objectTypeFilter, setObjectTypeFilter] = useState<
    ObjectType | typeof ALL
  >(ALL);

  const filteredProjects = useMemo(
    () => filterProjects(tradeFilter, objectTypeFilter),
    [tradeFilter, objectTypeFilter]
  );

  const testimonialProjects = useMemo(() => getProjectsWithTestimonial(), []);
  const highlightItems = useMemo(
    () => projectTestimonialsToHighlights(testimonialProjects),
    [testimonialProjects]
  );

  return (
    <>
      <div className="container mx-auto px-4 py-10 lg:px-8">
        <ReferenzenFilter
          tradeFilter={tradeFilter}
          objectTypeFilter={objectTypeFilter}
          onTradeChange={setTradeFilter}
          onObjectTypeChange={setObjectTypeFilter}
          tradeOptions={allTradesFromProjects}
          objectTypeOptions={allObjectTypesFromProjects}
        />
        <div className="mt-8">
          <ReferenzenGrid projects={filteredProjects} />
        </div>
      </div>

      <ReferenzHighlights items={highlightItems} />

      <section id="kontakt" className="border-t border-[#E5E7EB] bg-[#26413C] py-16 lg:py-20" aria-labelledby="meisterleistungen-cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center">
            <h2 id="meisterleistungen-cta-heading" className="text-2xl font-bold text-white md:text-3xl">
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
