"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((m) => m.Toaster),
  { ssr: false }
);

const Sonner = dynamic(
  () => import("@/components/ui/sonner").then((m) => m.Toaster),
  { ssr: false }
);

/** Lädt Toaster und Sonner erst nach der Hydration (Vercel-Regel: Defer Non-Critical Third-Party). */
export function DeferredToasters() {
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
}
