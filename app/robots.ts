import type { MetadataRoute } from "next";

const getBaseUrl = (): string => {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://handwerkmuenchen.de"
  );
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl().replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

const getBaseUrl = (): string => {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || BASE_URL;
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
