import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import {
  MeisterleistungenHero,
  MeisterleistungenContent,
} from "@/components/blocks/referenzen";

export const metadata: Metadata = buildMetadata({
  title: "Meisterleistungen – Referenzen & Projekte | handwerkmuenchen.de",
  description:
    "Ausgewählte Referenzprojekte für Hausverwaltungen und Gewerbe in München: Elektrotechnik, Sanitär, Innenausbau, Reinigung und Facility. Belegbare Qualität.",
  canonicalPath: "/meisterleistungen",
});

export default function MeisterleistungenPage() {
  return (
    <>
      <MeisterleistungenHero />
      <MeisterleistungenContent />
    </>
  );
}
