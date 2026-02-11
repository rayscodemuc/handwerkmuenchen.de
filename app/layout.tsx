import type { Metadata } from "next";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
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
    default: "handwerkmuenchen.de | Ihr Meisterbetrieb für Sanitär, Elektro & Ausbau in München",
    template: "%s | handwerkmuenchen.de",
  },
  description:
    "Professionelle Handwerksleistungen in München. Von der Reparatur bis zur Sanierung – meistergeführt, zuverlässig und direkt. Ihr Partner für Privatkunden, Gewerbe & Hausverwaltungen. Alles aus einer Hand, keine Subunternehmer-Ketten.",
  keywords: [
    "Handwerk München",
    "Meisterbetrieb München",
    "Sanitär München",
    "Elektroinstallation München",
    "Innenausbau München",
    "Badsanierung München",
    "Immobilien Instandhaltung München",
    "Renovierung München",
    "Handwerkerservice München",
  ],
  openGraph: {
    type: "website",
    siteName: "handwerkmuenchen.de",
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
                    <ConditionalHeader />
                    <ThemeMain>{children}</ThemeMain>
                  </ThemeLayout>
                </GewerkHoverProvider>
                <ConditionalFooter />
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
