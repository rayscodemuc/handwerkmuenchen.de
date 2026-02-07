import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeLayout } from "@/components/ThemeLayout";
import { ThemeMain } from "@/components/ThemeMain";
import { GewerkHoverProvider } from "@/components/providers/GewerkHoverContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { generateAllSchemas } from "@/lib/schema";
import "./globals.css";

// Base URL aus Environment Variable, Fallback zu Production Domain
const getBaseUrl = (): string => {
  return (
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://handwerkmuenchen.de'
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Calm Design Foundation",
    template: "%s | Calm Design Foundation",
  },
  description: "Generalunternehmer für Facility Management, Handwerk und Reinigung: ein Vertrag, ein Ansprechpartner. Meister pro Gewerk – keine anonymen Subunternehmer.",
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
  // Generiere Schema.org JSON-LD für SEO
  const schemas = generateAllSchemas();

  return (
    <html lang="de">
      <body className="antialiased">
        {/* Schema.org JSON-LD für LocalBusiness */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col">
                <GewerkHoverProvider>
                  <ThemeLayout>
                    <Header />
                    <ThemeMain>{children}</ThemeMain>
                  </ThemeLayout>
                </GewerkHoverProvider>
                <Footer />
              </div>
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
