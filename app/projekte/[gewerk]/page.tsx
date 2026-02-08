import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  ALLOWED_GEWERK_SLUGS,
  isAllowedGewerkSlug,
  getProjectsByGewerk,
  gewerkSlugToLabel,
  gewerkHeroHeadings,
} from "@/lib/referenzen/projects";
import { MeisterleistungenHero } from "@/components/blocks/referenzen/MeisterleistungenHero";
import { ProjectsIndex } from "@/components/blocks/referenzen/ProjectsIndex";

type Props = { params: Promise<{ gewerk: string }> };

export function generateStaticParams() {
  return ALLOWED_GEWERK_SLUGS.map((gewerk) => ({ gewerk }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gewerk } = await params;
  if (!isAllowedGewerkSlug(gewerk)) {
    return { title: "Nicht gefunden" };
  }
  const label = gewerkSlugToLabel[gewerk];
  return buildMetadata({
    title: `${label} – Projekte in München | handwerkmuenchen.de`,
    description: `Referenzprojekte aus dem Bereich ${label} für Hausverwaltungen und Gewerbe in München. Belegbare Qualität, ein Ansprechpartner.`,
    canonicalPath: `/projekte/${gewerk}`,
  });
}

export default async function ProjekteGewerkPage({ params }: Props) {
  const { gewerk } = await params;
  if (!isAllowedGewerkSlug(gewerk)) {
    notFound();
  }
  const filteredProjects = getProjectsByGewerk(gewerk);
  const headings = gewerkHeroHeadings[gewerk];

  return (
    <>
      <MeisterleistungenHero
        eyebrow={headings.eyebrow}
        title={headings.title}
        subline={headings.subline}
      />
      <ProjectsIndex projects={filteredProjects} activeGewerkSlug={gewerk} />
    </>
  );
}
