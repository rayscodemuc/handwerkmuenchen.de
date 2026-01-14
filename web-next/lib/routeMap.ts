export const categoryServiceMap = {
  handwerk: [
    { slug: "elektrotechnik", target: "/handwerk/elektrotechnik" },
    { slug: "sanitaer-heizung", target: "/handwerk/sanitaer-heizung" },
    { slug: "service-wartung", target: "/handwerk/service-wartung" },
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
    { slug: "hausmeisterservice", target: "/facility-management/hausmeisterservice" },
    { slug: "objektmanagement", target: "/facility-management/objektmanagement" },
    { slug: "winterdienst", target: "/facility-management/winterdienst" },
  ],
  aussenanlagen: [
    { slug: "gruenpflege", target: "/aussenanlagen/gruenpflege" },
    { slug: "baumpflege", target: "/aussenanlagen/baumpflege" },
    { slug: "winterdienst-aussen", target: "/aussenanlagen/winterdienst-aussen" },
  ],
} as const;
