import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner werden",
  description: "Werden Sie Teil unseres Partnernetzwerks und profitieren Sie von stabilen Aufträgen, fairen Konditionen und einer partnerschaftlichen Zusammenarbeit.",
  alternates: {
    canonical: "/partner-werden",
  },
};

export default function PartnerWerdenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
