import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Schluss mit Anonymität – wir verbinden professionelles Facility Management mit echten Werten, festen Ansprechpartnern und Handschlagqualität.",
  alternates: {
    canonical: "/ueber-uns",
  },
};

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
