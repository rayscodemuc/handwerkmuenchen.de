import type { MetadataRoute } from "next";
import { projects } from "@/lib/referenzen/projects";

const getBaseUrl = (): string => {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://handwerkmuenchen.de"
  );
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl().replace(/\/+$/, "");

  const staticRoutes: string[] = [
    "/",
    "/leistungen",
    "/leistungen/elektrotechnik",
    "/leistungen/sanitaer-heizung",
    "/leistungen/innenausbau",
    "/leistungen/reinigung-facility",
    "/projekte",
    "/anfrage",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/partner-werden",
  ];

  const projectRoutes = projects.map((project) => `/projekte/${project.slug}`);

  const allRoutes = [...staticRoutes, ...projectRoutes];

  const now = new Date().toISOString();

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : path.startsWith("/leistungen") ? 0.9 : 0.8,
  }));
}

import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

const getBaseUrl = (): string => {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || BASE_URL;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified,
    },
    {
      url: `${baseUrl}/anfrage`,
      lastModified,
    },
    {
      url: `${baseUrl}/rechner`,
      lastModified,
    },
    {
      url: `${baseUrl}/partner-werden`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/reinigung-facility`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/reinigung-facility/reinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/reinigung-facility/facility`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/reinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/facility`,
      lastModified,
    },
    // Kategorie-Landingpages
    {
      url: `${baseUrl}/leistungen/facility`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/innenausbau`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen`,
      lastModified,
    },
    // Leistungen: Elektrotechnik
    {
      url: `${baseUrl}/leistungen/elektrotechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/e-mobility`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/hauselektrik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/klingelanlagen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/led`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/messsysteme`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/neubau`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/reparaturen`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/sanierung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/sicherheitstechnik`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/elektrotechnik/smart-home`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/sanitaer-heizung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/service-wartung`,
      lastModified,
    },
    // Reinigung: /leistungen/* und /reinigung/* (Unterseiten)
    {
      url: `${baseUrl}/leistungen/unterhaltsreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/grundreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/fensterreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/glas-fassade`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/sonderreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/grauflaechenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/tiefgaragenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/bueroreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/unterhaltsreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/grundreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/fensterreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/glas-fassade`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/sonderreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/grauflaechenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/tiefgaragenreinigung`,
      lastModified,
    },
    {
      url: `${baseUrl}/reinigung/bueroreinigung`,
      lastModified,
    },
    // Facility Management
    {
      url: `${baseUrl}/leistungen/hausmeisterservice`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/objektmanagement`,
      lastModified,
    },
    {
      url: `${baseUrl}/leistungen/winterdienst`,
      lastModified,
    },
    // Außenanlagen
    {
      url: `${baseUrl}/aussenanlagen/gruenpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen/baumpflege`,
      lastModified,
    },
    {
      url: `${baseUrl}/aussenanlagen/winterdienst-aussen`,
      lastModified,
    },
  ]
}
