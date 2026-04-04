import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Handwerk München",
    short_name: "Handwerk",
    description: "Aufträge und Gewerke als installierbare Web-App mit Push-Benachrichtigungen.",
    start_url: "/admin/dashboard",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: "de-DE",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
