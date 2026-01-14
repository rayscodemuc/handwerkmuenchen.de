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
      // Handwerk Redirects
      {
        source: "/leistungen/elektrotechnik",
        destination: "/handwerk/elektrotechnik",
        permanent: true,
      },
      // Elektrotechnik Unterseiten Redirects
      {
        source: "/leistungen/elektrotechnik/e-mobility",
        destination: "/handwerk/elektrotechnik/e-mobility",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/elektro-notdienst",
        destination: "/handwerk/elektrotechnik/elektro-notdienst",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/hauselektrik",
        destination: "/handwerk/elektrotechnik/hauselektrik",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/klingelanlagen",
        destination: "/handwerk/elektrotechnik/klingelanlagen",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/led",
        destination: "/handwerk/elektrotechnik/led",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/messsysteme",
        destination: "/handwerk/elektrotechnik/messsysteme",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/neubau",
        destination: "/handwerk/elektrotechnik/neubau",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/reparaturen",
        destination: "/handwerk/elektrotechnik/reparaturen",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/sanierung",
        destination: "/handwerk/elektrotechnik/sanierung",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/sicherheitstechnik",
        destination: "/handwerk/elektrotechnik/sicherheitstechnik",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/smart-home",
        destination: "/handwerk/elektrotechnik/smart-home",
        permanent: true,
      },
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
      // Elektrotechnik Unterseiten Redirects
      {
        source: "/leistungen/elektrotechnik/e-mobility",
        destination: "/handwerk/elektrotechnik/e-mobility",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/elektro-notdienst",
        destination: "/handwerk/elektrotechnik/elektro-notdienst",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/hauselektrik",
        destination: "/handwerk/elektrotechnik/hauselektrik",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/klingelanlagen",
        destination: "/handwerk/elektrotechnik/klingelanlagen",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/led",
        destination: "/handwerk/elektrotechnik/led",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/messsysteme",
        destination: "/handwerk/elektrotechnik/messsysteme",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/neubau",
        destination: "/handwerk/elektrotechnik/neubau",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/reparaturen",
        destination: "/handwerk/elektrotechnik/reparaturen",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/sanierung",
        destination: "/handwerk/elektrotechnik/sanierung",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/sicherheitstechnik",
        destination: "/handwerk/elektrotechnik/sicherheitstechnik",
        permanent: true,
      },
      {
        source: "/leistungen/elektrotechnik/smart-home",
        destination: "/handwerk/elektrotechnik/smart-home",
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
    ];
  },
};

export default nextConfig;
