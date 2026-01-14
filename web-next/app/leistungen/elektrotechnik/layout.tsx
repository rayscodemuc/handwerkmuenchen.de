import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elektrotechnik",
  description: "Professionelle Elektrotechnik-Dienstleistungen: Notdienst, Smart Home, E-Mobility, Sicherheitstechnik und mehr. Zertifizierter Fachbetrieb für Gewerbe und Privat.",
  alternates: {
    canonical: "/leistungen/elektrotechnik",
  },
};

export default function ElektrotechnikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
