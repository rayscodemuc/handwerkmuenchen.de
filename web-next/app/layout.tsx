import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://DEINE-DOMAIN.DE"),
  title: {
    default: "Calm Design Foundation",
    template: "%s | Calm Design Foundation",
  },
  description: "Professionelle Lösungen für Facility Management, Handwerk und Reinigung mit echter Partnerschaft und Handschlagqualität.",
  openGraph: {
    type: "website",
    siteName: "Calm Design Foundation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
