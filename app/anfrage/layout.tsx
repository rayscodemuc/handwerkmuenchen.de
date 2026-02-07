import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anfrage",
  description: "Stellen Sie Ihre Anfrage in wenigen Schritten – wir melden uns schnell mit einer passenden Lösung.",
  alternates: {
    canonical: "/anfrage",
  },
};

export default function AnfrageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
