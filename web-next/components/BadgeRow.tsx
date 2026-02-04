import { cn } from "@/lib/utils";

export interface BadgeRowProps {
  /** List of badge labels */
  items: string[];
  /** "light" = on light background (default), "dark" = on primary/dark hero */
  theme?: "light" | "dark";
  className?: string;
}

export function BadgeRow({ items, theme = "light", className }: BadgeRowProps) {
  if (!items?.length) return null;

  const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors";
  const lightClass =
    "border-border bg-muted/60 text-muted-foreground";
  const darkClass =
    "border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground/90";

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2 sm:gap-3",
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
            theme === "dark" ? darkClass : lightClass
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
