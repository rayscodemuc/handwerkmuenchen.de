import Link from "next/link";

type LogoPlaceholderProps = {
  className?: string;
  /** "header" = light on primary (Navy), "headerLight" = dark on light (z. B. Startseite), "footer" = dark on light */
  variant?: "header" | "headerLight" | "footer";
};

export function LogoPlaceholder({ className = "", variant = "header" }: LogoPlaceholderProps) {
  const isHeaderDark = variant === "header";
  const textColor = isHeaderDark ? "text-primary-foreground" : "text-foreground";
  const borderColor = isHeaderDark ? "border-primary-foreground/40" : "border-border";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-lg border-2 ${borderColor} bg-transparent px-3 py-1.5 font-semibold ${textColor} no-underline transition-opacity hover:opacity-90 ${className}`}
      aria-label="Musterfirma – Startseite"
    >
      <span className="text-[0.95em] tracking-tight">Logo</span>
    </Link>
  );
}
