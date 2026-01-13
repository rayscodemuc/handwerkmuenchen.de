import { useEffect } from "react";

const BASE_URL = "https://mrclean-services.de";
const DEFAULT_OG_IMAGE = "/assets/logo.png";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  structuredData?: object;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  structuredData,
  ogImage,
  ogType = "website",
}: SEOHeadProps) {
  const fullTitle = `${title} | Mr.Clean Services GmbH`;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? `${BASE_URL}${window.location.pathname}` : BASE_URL);
  const imageUrl = ogImage ? `${BASE_URL}${ogImage}` : `${BASE_URL}${DEFAULT_OG_IMAGE}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to set meta tags
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(isProperty ? "property" : "name", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    if (keywords.length > 0) {
      setMetaTag("keywords", keywords.join(", "));
    }

    // Open Graph tags for Facebook, LinkedIn, WhatsApp
    setMetaTag("og:title", fullTitle, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:url", currentUrl, true);
    setMetaTag("og:image", imageUrl, true);
    setMetaTag("og:site_name", "Mr.Clean Services GmbH", true);
    setMetaTag("og:locale", "de_DE", true);

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", imageUrl);

    // Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", currentUrl);

    // Structured data (JSON-LD) - supports single object or array
    if (structuredData) {
      // Remove existing structured data scripts
      document.querySelectorAll('script[type="application/ld+json"][data-seo-head="true"]').forEach(el => el.remove());
      
      // Handle array of structured data or single object
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      
      dataArray.forEach((data, index) => {
        const scriptLD = document.createElement("script");
        scriptLD.setAttribute("type", "application/ld+json");
        scriptLD.setAttribute("data-seo-head", "true");
        scriptLD.textContent = JSON.stringify(data);
        document.head.appendChild(scriptLD);
      });
    }

    return () => {
      // Cleanup handled by next page load
    };
  }, [fullTitle, description, keywords, currentUrl, imageUrl, ogType, structuredData]);

  return null;
}