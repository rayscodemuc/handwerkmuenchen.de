import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Mr.Clean Services GmbH`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update meta keywords
    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // Update canonical URL
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonicalUrl);
    }

    // Add structured data (JSON-LD)
    if (structuredData) {
      let scriptLD = document.querySelector('script[type="application/ld+json"]');
      if (!scriptLD) {
        scriptLD = document.createElement("script");
        scriptLD.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptLD);
      }
      scriptLD.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [title, description, keywords, canonicalUrl, structuredData]);

  return null;
}
