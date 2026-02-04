import { Link } from "react-router-dom";

type LogoPlaceholderProps = {
  className?: string;
  variant?: "header" | "footer";
};

export function LogoPlaceholder({ className = "", variant = "header" }: LogoPlaceholderProps) {
  const isHeader = variant === "header";
  const textColor = isHeader ? "text-white" : "text-foreground";
  const borderColor = isHeader ? "border-white/40" : "border-border";

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 rounded-lg border-2 ${borderColor} bg-transparent px-3 py-1.5 font-semibold ${textColor} no-underline transition-opacity hover:opacity-90 ${className}`}
      aria-label="Mr. Clean Services – Startseite"
    >
      <span className="text-[0.95em] tracking-tight">Logo</span>
    </Link>
  );
}
