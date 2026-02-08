import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { projects } from "@/lib/referenzen/projects";
import { MeisterleistungenHero } from "@/components/blocks/referenzen/MeisterleistungenHero";
import { ProjectsIndex } from "@/components/blocks/referenzen/ProjectsIndex";

export const metadata: Metadata = buildMetadata({
  title: "Projekte | handwerkmuenchen.de",
  description:
    "Ausgewählte Referenzprojekte für Hausverwaltungen und Gewerbe in München: Elektrotechnik, Sanitär, Innenausbau, Reinigung und Facility. Belegbare Qualität.",
  canonicalPath: "/projekte",
});

export default function ProjektePage() {
  return (
    <>
      <MeisterleistungenHero
        eyebrow="PROJEKTE"
        title="Referenzen, die man belegen kann."
        subline="Ausgewählte Projekte für Hausverwaltungen und Gewerbe in München."
      />
      <ProjectsIndex projects={projects} />
    </>
  );
}
