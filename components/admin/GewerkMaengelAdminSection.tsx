"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GewerkMangelAdminRow } from "@/src/types/gewerk-maengel-admin";

type Props = {
  rows: GewerkMangelAdminRow[];
  isLightTheme: boolean;
};

export function GewerkMaengelAdminSection({ rows, isLightTheme }: Props) {
  const border = isLightTheme ? "border-amber-200/80 bg-amber-50/40" : "border-amber-500/25 bg-amber-500/[0.07]";
  const title = isLightTheme ? "text-amber-950" : "text-amber-100";
  const card = isLightTheme ? "border-slate-200 bg-white shadow-sm" : "border-slate-700 bg-slate-900/80";
  const muted = isLightTheme ? "text-slate-600" : "text-slate-400";

  return (
    <section
      aria-label="Mängelmeldungen Gewerk"
      className={cn("mb-4 rounded-2xl border p-4 sm:mb-6 sm:p-5", border)}
    >
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className={cn("h-5 w-5 shrink-0", isLightTheme ? "text-amber-700" : "text-amber-400")} strokeWidth={2} />
        <h2 className={cn("text-base font-semibold sm:text-lg", title)}>Mängelmeldungen ({rows.length})</h2>
        <span className={cn("text-xs font-normal sm:text-sm", muted)}>vom Gewerk</span>
      </div>
      {rows.length === 0 ? (
        <p className={cn("text-sm", muted)}>Noch keine Meldungen. Sie erscheinen hier, sobald ein Gewerk einen Mangel meldet.</p>
      ) : null}
      <ul className="space-y-3">
        {rows.map((m) => (
          <li
            key={m.id}
            className={cn("rounded-xl border p-3 sm:p-4", card)}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium sm:text-base", isLightTheme ? "text-slate-900" : "text-slate-100")}>
                  {m.adresse}
                </p>
                {m.notiz?.trim() ? (
                  <p className={cn("mt-1.5 whitespace-pre-wrap text-sm", muted)}>{m.notiz.trim()}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1 text-right text-xs">
                {m.gewerk?.trim() ? (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-semibold",
                      isLightTheme ? "bg-amber-100 text-amber-900" : "bg-amber-500/20 text-amber-200"
                    )}
                  >
                    {m.gewerk.trim()}
                  </span>
                ) : null}
                <time className={cn("tabular-nums text-[11px]", muted)} dateTime={m.created_at}>
                  {new Date(m.created_at).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
                {m.reporter_display_name?.trim() ? (
                  <span className={muted}>{m.reporter_display_name.trim()}</span>
                ) : (
                  <span className={cn("font-mono text-[10px]", muted)} title={m.created_by}>
                    {m.created_by.slice(0, 8)}…
                  </span>
                )}
              </div>
            </div>
            {m.image_urls.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {m.image_urls.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block h-16 w-16 overflow-hidden rounded-lg border ring-offset-2 transition-opacity hover:opacity-90 sm:h-20 sm:w-20",
                        isLightTheme ? "border-slate-200 ring-blue-500/30" : "border-slate-600 ring-blue-400/30"
                      )}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
