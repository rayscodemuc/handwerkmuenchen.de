"use client";

/**
 * Automatische Service Schema Komponente
 * Rendert basierend auf dem aktuellen Pathname ein Service JSON-LD Schema
 */

import { usePathname } from "next/navigation";
import { buildServiceSchema } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";
import { SchemaScript } from "./SchemaScript";

interface AreaServiceSchemaProps {
  areaPrefix: string;
  serviceMap: Record<string, string>;
  defaultClusterName: string;
}

export function AreaServiceSchema({
  areaPrefix,
  serviceMap,
  defaultClusterName,
}: AreaServiceSchemaProps) {
  const pathname = usePathname();

  // Prüfe, ob der aktuelle Pfad zu diesem Bereich gehört
  if (!pathname.startsWith(areaPrefix)) {
    return null;
  }

  // Bestimme Service-Typ aus Map oder verwende Default
  const serviceType = serviceMap[pathname] || defaultClusterName;

  // Generiere Slug aus Pathname (z.B. "/reinigung/unterhaltsreinigung" -> "reinigung-unterhaltsreinigung")
  const slug = pathname.replace(/\//g, "-").replace(/^-/, "");

  // Canonical URL
  const canonicalUrl = `${BUSINESS.url}${pathname}`;

  // Baue Schema
  const schema = buildServiceSchema({
    serviceType,
    slug,
    canonicalUrl,
  });

  return <SchemaScript schema={schema} />;
}
