import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handwerk: Elektrotechnik",
  description: "Professionelle Elektrotechnik-Dienstleistungen: Notdienst, Smart Home, E-Mobility, Sicherheitstechnik und mehr. Zertifizierter Fachbetrieb für Gewerbe und Privat.",
  alternates: {
    canonical: "/handwerk/elektrotechnik",
  },
};

export default function HandwerkElektrotechnikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
