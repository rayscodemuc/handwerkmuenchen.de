import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "24/7 Service",
  description: "Notfälle kennen keine Öffnungszeiten. Deshalb sind wir rund um die Uhr für Sie da – an 365 Tagen im Jahr, auch an Wochenenden und Feiertagen.",
  alternates: {
    canonical: "/service-24-7",
  },
};

export default function Service247Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
