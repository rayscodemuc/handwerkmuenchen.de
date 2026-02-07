import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Legacy redirects (301) → /leistungen
      { source: "/handwerk", destination: "/leistungen", permanent: true },
      { source: "/handwerk/", destination: "/leistungen", permanent: true },
      { source: "/handwerk/elektrotechnik/elektro-notdienst", destination: "/leistungen/elektrotechnik", permanent: true },
      { source: "/handwerk/elektrotechnik/elektro-notdienst/", destination: "/leistungen/elektrotechnik", permanent: true },
      { source: "/handwerk/elektrotechnik", destination: "/leistungen/elektrotechnik", permanent: true },
      { source: "/handwerk/elektrotechnik/", destination: "/leistungen/elektrotechnik/", permanent: true },
      { source: "/handwerk/elektrotechnik/:path*", destination: "/leistungen/elektrotechnik/:path*", permanent: true },
      { source: "/handwerk/sanitaer-heizung", destination: "/leistungen/sanitaer-heizung", permanent: true },
      { source: "/handwerk/sanitaer-heizung/", destination: "/leistungen/sanitaer-heizung/", permanent: true },
      { source: "/handwerk/innenausbau", destination: "/leistungen/innenausbau", permanent: true },
      { source: "/handwerk/innenausbau/", destination: "/leistungen/innenausbau/", permanent: true },
      { source: "/handwerk/reinigung", destination: "/leistungen/reinigung", permanent: true },
      { source: "/handwerk/reinigung/", destination: "/leistungen/reinigung/", permanent: true },
      { source: "/handwerk/facility", destination: "/leistungen/facility", permanent: true },
      { source: "/handwerk/facility/", destination: "/leistungen/facility/", permanent: true },
      { source: "/handwerk/service-wartung", destination: "/leistungen/service-wartung", permanent: true },
      { source: "/handwerk/service-wartung/", destination: "/leistungen/service-wartung/", permanent: true },
      { source: "/handwerk/reinigung-facility", destination: "/leistungen/reinigung-facility", permanent: true },
      { source: "/handwerk/reinigung-facility/", destination: "/leistungen/reinigung-facility/", permanent: true },
      { source: "/handwerk/:path*", destination: "/leistungen", permanent: true },
      // /reinigung Landing entfernt → Redirect auf /leistungen/reinigung
      { source: "/reinigung", destination: "/leistungen/reinigung", permanent: true },
      { source: "/reinigung/", destination: "/leistungen/reinigung/", permanent: true },
      // Reinigung Redirects (Unterseiten bleiben unter /reinigung/*)
      {
        source: "/leistungen/unterhaltsreinigung",
        destination: "/reinigung/unterhaltsreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/grundreinigung",
        destination: "/reinigung/grundreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/fensterreinigung",
        destination: "/reinigung/fensterreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/glas-fassade",
        destination: "/reinigung/glas-fassade",
        permanent: true,
      },
      {
        source: "/leistungen/sonderreinigung",
        destination: "/reinigung/sonderreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/grauflaechenreinigung",
        destination: "/reinigung/grauflaechenreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/tiefgaragenreinigung",
        destination: "/reinigung/tiefgaragenreinigung",
        permanent: true,
      },
      {
        source: "/leistungen/bueroreinigung",
        destination: "/reinigung/bueroreinigung",
        permanent: true,
      },
      // /facility-management entfernt → Redirect auf /leistungen/facility bzw. Unterseiten
      { source: "/facility-management", destination: "/leistungen/facility", permanent: true },
      { source: "/facility-management/", destination: "/leistungen/facility/", permanent: true },
      { source: "/facility-management/hausmeisterservice", destination: "/leistungen/hausmeisterservice", permanent: true },
      { source: "/facility-management/objektmanagement", destination: "/leistungen/objektmanagement", permanent: true },
      { source: "/facility-management/winterdienst", destination: "/leistungen/winterdienst", permanent: true },
      { source: "/facility-management/:path*", destination: "/leistungen/facility", permanent: true },
      // Außenanlagen Redirects
      {
        source: "/leistungen/gruenpflege",
        destination: "/aussenanlagen/gruenpflege",
        permanent: true,
      },
      {
        source: "/leistungen/baumpflege",
        destination: "/aussenanlagen/baumpflege",
        permanent: true,
      },
      {
        source: "/leistungen/winterdienst-aussen",
        destination: "/aussenanlagen/winterdienst-aussen",
        permanent: true,
      },
      // /leistungen/innenausbau → eigene Seite (Design-Prototyp), kein Redirect
    ];
  },
};

export default nextConfig;
