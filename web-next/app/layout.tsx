import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
