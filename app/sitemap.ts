import type { MetadataRoute } from "next";
import { projects, ALLOWED_GEWERK_SLUGS } from "@/lib/referenzen/projects";

const getBaseUrl = (): string => {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://handwerkmuenchen.de"
  ).replace(/\/+$/, "");
};

function entry(
  path: string,
  priority: number,
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly"
): MetadataRoute.Sitemap[number] {
  return {
    url: `${getBaseUrl()}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Statische Seiten
  entries.push(entry("/", 1.0));
  entries.push(entry("/ueber-uns", 0.9));
  entries.push(entry("/kontakt", 0.9));
  entries.push(entry("/anfrage", 0.9));
  entries.push(entry("/impressum", 0.6));
  entries.push(entry("/datenschutz", 0.6));
  entries.push(entry("/rechner", 0.8));

  // Leistungen Hub
  entries.push(entry("/leistungen", 0.95));

  // Gewerke
  entries.push(entry("/leistungen/elektrotechnik", 0.9));
  entries.push(entry("/leistungen/sanitaer-heizung", 0.9));
  entries.push(entry("/leistungen/innenausbau", 0.9));
  entries.push(entry("/leistungen/reinigung-facility", 0.9));
  entries.push(entry("/leistungen/reinigung-facility/reinigung", 0.85));
  entries.push(entry("/leistungen/reinigung-facility/facility", 0.85));

  // Projekte (Übersicht, Gewerk-Filter, Projekt-Details)
  entries.push(entry("/projekte", 0.95));
  ALLOWED_GEWERK_SLUGS.forEach((gewerk) => entries.push(entry(`/projekte/${gewerk}`, 0.9)));
  projects.forEach((p) => entries.push(entry(`/projekte/${p.slug}`, 0.9)));

  return entries;
}
