import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/lib/referenzen/types";
import { tradeLabels, objectTypeLabels } from "@/lib/referenzen/projects";
import { MapPin } from "lucide-react";

type ReferenzenGridProps = {
  projects: ProjectItem[];
  /** Optional: z. B. "Keine Projekte in diesem Gewerk." bei gefilterter Ansicht */
  emptyMessage?: string;
};

export function ReferenzenGrid({ projects, emptyMessage }: ReferenzenGridProps) {
  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-8 text-center text-[#73628A]">
        {emptyMessage ?? "Keine Referenzen für die gewählten Filter."}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/meisterleistungen/${project.slug}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] transition-shadow hover:shadow-lg hover:border-[#73628A]/30"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FCFCFC]">
            <Image
              src={project.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h2 className="text-lg font-semibold text-[#313D5A] group-hover:text-[#183642]">
              {project.title}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#73628A]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {project.location}
            </p>
            <p className="mt-1 text-sm text-[#73628A]">
              {objectTypeLabels[project.objectType]}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.trades.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#E5E7EB] bg-[#FCFCFC] px-2.5 py-1 text-xs font-medium text-[#313D5A]"
                >
                  {tradeLabels[t]}
                </span>
              ))}
              {project.services.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#E5E7EB] bg-[#FCFCFC] px-2.5 py-1 text-xs text-[#73628A]"
                >
                  {s}
                </span>
              ))}
            </div>
            {project.metrics && project.metrics.length > 0 && (
              <p className="mt-3 text-xs text-[#73628A]">
                {project.metrics[0].label}: {project.metrics[0].value}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
