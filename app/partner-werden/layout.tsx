import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Für Meisterbetriebe",
  description: "Aufnahme als Meisterbetrieb in unser kuratiertes Netzwerk im GU-System (Standards, Audits, klare Zuständigkeiten).",
  alternates: {
    canonical: "/partner-werden",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PartnerWerdenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
