export const categoryServiceMap = {
  leistungenTechnik: [
    { slug: "elektrotechnik", target: "/leistungen/elektrotechnik" },
    { slug: "sanitaer-heizung", target: "/leistungen/sanitaer-heizung" },
  ],
  reinigung: [
    { slug: "unterhaltsreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "grundreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "fensterreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "glas-fassade", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "sonderreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "grauflaechenreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "tiefgaragenreinigung", target: "/leistungen/reinigung-facility/reinigung" },
    { slug: "bueroreinigung", target: "/leistungen/reinigung-facility/reinigung" },
  ],
  "facility-management": [
    { slug: "hausmeisterservice", target: "/leistungen/reinigung-facility/facility" },
    { slug: "objektmanagement", target: "/leistungen/reinigung-facility/facility" },
    { slug: "winterdienst", target: "/leistungen/reinigung-facility/facility" },
  ],
  aussenanlagen: [
    { slug: "gruenpflege", target: "/leistungen/reinigung-facility/facility" },
    { slug: "baumpflege", target: "/leistungen/reinigung-facility/facility" },
    { slug: "winterdienst-aussen", target: "/leistungen/reinigung-facility/facility" },
  ],
} as const;
