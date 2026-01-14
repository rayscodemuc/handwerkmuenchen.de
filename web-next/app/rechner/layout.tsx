import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service-Konfigurator",
  description: "Berechnen Sie Ihren individuellen Richtpreis für Gebäudereinigung, Tiefgaragenreinigung, Hausmeisterservice oder Winterdienst. Unverbindlich und kostenlos.",
  alternates: {
    canonical: "/rechner",
  },
};

export default function RechnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
