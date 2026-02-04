import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/24-7-service",
        destination: "/service-24-7",
        permanent: true,
      },
      // Haupt-Redirect: /leistungen (mit und ohne Slash) -> /reinigung
      // Diese müssen GANZ OBEN stehen, damit sie nicht von anderen Regeln überschrieben werden
      {
        source: "/leistungen",
        destination: "/reinigung",
        permanent: true,
      },
      {
        source: "/leistungen/",
        destination: "/reinigung",
        permanent: true,
      },
      // Handwerk Redirects
      {
        source: "/leistungen/sanitaer-heizung",
        destination: "/handwerk/sanitaer-heizung",
        permanent: true,
      },
      {
        source: "/leistungen/service-wartung",
        destination: "/handwerk/service-wartung",
        permanent: true,
      },
      // Elektrotechnik: Catch-all für alle Unterseiten (muss vor spezifischen Redirects stehen)
      {
        source: "/leistungen/elektrotechnik/:path*",
        destination: "/handwerk/elektrotechnik/:path*",
        permanent: true,
      },
      // Reinigung Redirects
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
      // Facility Management Redirects
      {
        source: "/leistungen/hausmeisterservice",
        destination: "/facility-management/hausmeisterservice",
        permanent: true,
      },
      {
        source: "/leistungen/objektmanagement",
        destination: "/facility-management/objektmanagement",
        permanent: true,
      },
      {
        source: "/leistungen/winterdienst",
        destination: "/facility-management/winterdienst",
        permanent: true,
      },
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
      // Entfernte Standorte → München
      { source: "/standorte/augsburg", destination: "/standorte/muenchen", permanent: true },
      { source: "/standorte/berlin", destination: "/standorte/muenchen", permanent: true },
      { source: "/standorte/frankfurt", destination: "/standorte/muenchen", permanent: true },
      { source: "/standorte/hamburg", destination: "/standorte/muenchen", permanent: true },
      { source: "/standorte/ingolstadt", destination: "/standorte/muenchen", permanent: true },
      { source: "/standorte/nuernberg", destination: "/standorte/muenchen", permanent: true },
    ];
  },
};

export default nextConfig;
