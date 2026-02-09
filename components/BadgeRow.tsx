import { cn } from "@/lib/utils";

export interface BadgeRowProps {
  /** List of badge labels */
  items: string[];
  /** "light" = on light background (default), "dark" = on primary/dark hero */
  theme?: "light" | "dark" | "anfrage";
  /** Auf Mobile alle Badges gleich breit (100 %) */
  equalWidthMobile?: boolean;
  className?: string;
}

export function BadgeRow({ items, theme = "light", equalWidthMobile, className }: BadgeRowProps) {
  if (!items?.length) return null;

  const badgeBase =
    "inline-flex items-center justify-center rounded-full border px-4 py-2.5 min-h-[2.25rem] text-sm font-semibold transition-colors shadow-sm";
  const lightClass =
    "border-border bg-muted/70 text-muted-foreground";
  const darkClass =
    "border-transparent bg-[#4C626C] text-white";
  const anfrageClass =
    "border-transparent bg-[#4C626C] text-[#3E505B]";

  return (
    <div
      className={cn(
        "flex justify-center gap-3 sm:gap-4",
        equalWidthMobile ? "flex-col sm:flex-row sm:flex-wrap max-w-sm sm:max-w-none mx-auto" : "flex-wrap",
        className
      )}
      role="list"
      aria-label="Vertrauensmerkmale"
    >
      {items.map((label, i) => (
        <span
          key={i}
          role="listitem"
          className={cn(
            badgeBase,
            equalWidthMobile && "w-full sm:w-auto",
            theme === "dark" ? darkClass : theme === "anfrage" ? anfrageClass : lightClass
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
