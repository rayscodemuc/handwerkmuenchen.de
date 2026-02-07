"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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

      <section className="border-t border-[#E5E7EB] bg-[#26413C] py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Eigenes Projekt anfragen
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-white/80">
            München & Umgebung · Ein Ansprechpartner für alle Gewerke
          </p>
          <div className="mt-8">
            <Link href="/anfrage">
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                Projekt anfragen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
