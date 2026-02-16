"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

type LogoProps = {
  /** "header" = auf dunklem Hintergrund (Logo hell), "footer" = auf hellem Hintergrund (Logo dunkel) */
  variant?: "header" | "footer";
  className?: string;
  height?: number;
};

/**
 * Logo für Header und Footer.
 * Header: public/logo.svg (weiß, kein Hintergrund).
 * Footer: public/logo-footer.svg (Farb-Logo, kein Hintergrund).
 */
export function Logo({ variant = "header", className = "", height = 40 }: LogoProps) {
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);
  const isHeader = variant === "header";
  const logoSrc = isHeader ? "/logo.svg" : "/logo-footer.svg";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (imgError) {
    return (
      <Link
        href="/"
        onClick={handleClick}
        className={`inline-flex items-center rounded-lg border-2 px-3 py-1.5 font-semibold no-underline hover:opacity-90 ${className} ${
          isHeader ? "border-white/40 text-white" : "border-border text-foreground"
        }`}
        aria-label="Zur Startseite"
      >
        <span className="text-[0.95em] tracking-tight">Logo</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`relative inline-flex items-center hover:opacity-90 ${className}`}
      aria-label="Zur Startseite"
    >
      <Image
        src={logoSrc}
        alt=""
        width={height * 8}
        height={height}
        className="object-contain object-left"
        style={{ height, width: "auto" }}
        priority
        onError={() => setImgError(true)}
      />
    </Link>
  );
}
