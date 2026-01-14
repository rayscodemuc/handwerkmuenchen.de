import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/handwerk",
        destination: "/leistungen/elektrotechnik",
        permanent: true,
      },
      {
        source: "/handwerk/:path*",
        destination: "/leistungen/elektrotechnik",
        permanent: true,
      },
      {
        source: "/reinigung",
        destination: "/leistungen/unterhaltsreinigung",
        permanent: true,
      },
      {
        source: "/reinigung/:path*",
        destination: "/leistungen/unterhaltsreinigung",
        permanent: true,
      },
      {
        source: "/facility-management",
        destination: "/leistungen/objektmanagement",
        permanent: true,
      },
      {
        source: "/facility-management/:path*",
        destination: "/leistungen/objektmanagement",
        permanent: true,
      },
      {
        source: "/aussenanlagen",
        destination: "/leistungen/gruenpflege",
        permanent: true,
      },
      {
        source: "/aussenanlagen/:path*",
        destination: "/leistungen/gruenpflege",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
