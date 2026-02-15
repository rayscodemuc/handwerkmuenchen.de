export const categoryServiceMap = {
  leistungenTechnik: [
    { slug: "elektrotechnik", target: "/leistungen/elektrotechnik" },
    { slug: "sanitaer-heizung", target: "/leistungen/sanitaer-heizung" },
    { slug: "service-wartung", target: "/leistungen/service-wartung" },
  ],
  reinigung: [
    { slug: "unterhaltsreinigung", target: "/reinigung/unterhaltsreinigung" },
    { slug: "grundreinigung", target: "/reinigung/grundreinigung" },
    { slug: "fensterreinigung", target: "/reinigung/fensterreinigung" },
    { slug: "glas-fassade", target: "/reinigung/glas-fassade" },
    { slug: "sonderreinigung", target: "/reinigung/sonderreinigung" },
    { slug: "grauflaechenreinigung", target: "/reinigung/grauflaechenreinigung" },
    { slug: "tiefgaragenreinigung", target: "/reinigung/tiefgaragenreinigung" },
    { slug: "bueroreinigung", target: "/reinigung/bueroreinigung" },
  ],
  "facility-management": [
    { slug: "hausmeisterservice", target: "/leistungen/hausmeisterservice" },
    { slug: "objektmanagement", target: "/leistungen/objektmanagement" },
    { slug: "winterdienst", target: "/leistungen/winterdienst" },
  ],
  aussenanlagen: [
    { slug: "gruenpflege", target: "/aussenanlagen/gruenpflege" },
    { slug: "baumpflege", target: "/aussenanlagen/baumpflege" },
    { slug: "winterdienst-aussen", target: "/aussenanlagen/winterdienst-aussen" },
  ],
} as const;
