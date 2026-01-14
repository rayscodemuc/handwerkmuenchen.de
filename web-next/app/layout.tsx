import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA, MobileStickyCTA } from "@/components/StickyCTA";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <StickyCTA />
              <MobileStickyCTA />
              <CookieConsent />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
