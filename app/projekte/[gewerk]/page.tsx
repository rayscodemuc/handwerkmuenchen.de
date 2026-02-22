import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  projects,
  ALLOWED_GEWERK_SLUGS,
  isAllowedGewerkSlug,
  getProjectsByGewerk,
  getProjectBySlug,
  gewerkSlugToLabel,
  gewerkHeroHeadings,
  tradeLabels,
} from "@/lib/referenzen/projects";
import { MeisterleistungenHero } from "@/components/blocks/referenzen/MeisterleistungenHero";
import { ProjectsIndex } from "@/components/blocks/referenzen/ProjectsIndex";
import { ReferenzDetail } from "@/components/blocks/referenzen";

type Props = { params: Promise<{ gewerk: string }> };

export function generateStaticParams() {
  const gewerkParams = ALLOWED_GEWERK_SLUGS.map((gewerk) => ({ gewerk }));
  const projectParams = projects.map((p) => ({ gewerk: p.slug }));
  return [...gewerkParams, ...projectParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gewerk: param } = await params;

  // Projekt-Detail
  const project = getProjectBySlug(param);
  if (project) {
    const tradesStr = project.trades.map((t) => tradeLabels[t]).join(", ");
    return buildMetadata({
      title: `${project.title} – Referenz | handwerkmuenchen.de`,
      description: `${project.excerpt} ${project.location}. ${tradesStr}.`,
      canonicalPath: `/projekte/${param}`,
    });
  }

  // Gewerk-Gefilterte Ansicht
  if (!isAllowedGewerkSlug(param)) {
    return { title: "Nicht gefunden" };
  }
  const label = gewerkSlugToLabel[param];
  return buildMetadata({
    title: `${label} – Projekte in München | handwerkmuenchen.de`,
    description: `Referenzprojekte aus dem Bereich ${label} für Hausverwaltungen und Gewerbe in München. Belegbare Qualität, ein Ansprechpartner.`,
    canonicalPath: `/projekte/${param}`,
  });
}

export default async function ProjekteDynamicPage({ params }: Props) {
  const { gewerk: param } = await params;

  // Projekt-Detail
  const project = getProjectBySlug(param);
  if (project) {
    return <ReferenzDetail project={project} />;
  }

  // Gewerk-Gefilterte Ansicht
  if (!isAllowedGewerkSlug(param)) {
    notFound();
  }
  const filteredProjects = getProjectsByGewerk(param);
  const headings = gewerkHeroHeadings[param];

  return (
    <>
      <MeisterleistungenHero
        eyebrow={headings.eyebrow}
        title={headings.title}
        subline={headings.subline}
      />
      <ProjectsIndex projects={filteredProjects} activeGewerkSlug={param} />
    </>
  );
}
