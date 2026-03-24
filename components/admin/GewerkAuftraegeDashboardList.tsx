"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Paperclip,
  RefreshCw,
  ChevronRight,
  FileText,
  Paintbrush,
  SprayCan,
  Building,
  Zap,
  Droplets,
  CalendarDays,
} from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { TERMIN_TYP } from "@/src/config/businessConfig";
import { parseTerminVergangen } from "@/lib/auftraege/termin-vergangen";
import { splitAuftraegeKommendeUndWeitere, isTerminGeradeAktiv } from "@/lib/auftraege/gewerk-auftraege-split";
import { formatGewerkTerminKurz } from "@/lib/auftraege/gewerk-termin-kurzformat";
import { primaryAuftragAnhangUrl } from "@/lib/auftraege/primary-auftrag-anhang-url";

function normalizeGewerke(value: string[] | string | null | undefined): string[] {
  if (Array.isArray(value)) {
    return value.map((g) => (g ?? "").trim()).filter((g) => g.length > 0);
  }
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function getGewerkIcon(gewerk: string) {
  const g = gewerk.trim().toLowerCase();
  if (g === "ausbau") return Paintbrush;
  if (g === "reinigung") return SprayCan;
  if (g === "facility") return Building;
  if (g === "elektro") return Zap;
  if (g === "sanitär" || g === "sanitaer") return Droplets;
  return null;
}

function gewerkBadgeClass(gewerk: string, isLight: boolean): string {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide";
  if (isLight) {
    switch (gewerk.trim()) {
      case "Elektro":
        return `${base} border-amber-500 bg-amber-300 text-amber-900`;
      case "Sanitär":
        return `${base} border-blue-500 bg-blue-300 text-blue-900`;
      case "Ausbau":
        return `${base} border-orange-500 bg-orange-300 text-orange-900`;
      case "Reinigung":
        return `${base} border-emerald-500 bg-emerald-300 text-emerald-900`;
      case "Facility":
        return `${base} border-slate-500 bg-slate-300 text-slate-900`;
      default:
        return `${base} border-slate-400 bg-slate-200 text-slate-800`;
    }
  }
  switch (gewerk.trim()) {
    case "Elektro":
      return `${base} border-amber-500/70 bg-amber-500/20 text-amber-200`;
    case "Sanitär":
      return `${base} border-blue-500/70 bg-blue-500/20 text-blue-200`;
    case "Ausbau":
      return `${base} border-orange-500/70 bg-orange-500/20 text-orange-200`;
    case "Reinigung":
      return `${base} border-emerald-500/70 bg-emerald-500/20 text-emerald-200`;
    case "Facility":
      return `${base} border-slate-500/70 bg-slate-500/20 text-slate-300`;
    default:
      return `${base} border-slate-600 bg-slate-800 text-slate-400`;
  }
}

function formatTerminRange(startIso: string | null | undefined, endIso: string | null | undefined): string | null {
  const s = (startIso ?? "").trim();
  const e = (endIso ?? "").trim();
  if (!s) return null;
  try {
    const ds = parseISO(s);
    if (!isValid(ds)) return null;
    if (e) {
      const de_ = parseISO(e);
      if (isValid(de_)) {
        return `${format(ds, "EEE dd.MM.yyyy HH:mm", { locale: de })} – ${format(de_, "HH:mm", { locale: de })}`;
      }
    }
    return format(ds, "EEE dd.MM.yyyy HH:mm", { locale: de });
  } catch {
    return null;
  }
}

type KarteProps = {
  auftrag: HandwerkerAuftrag;
  isLightTheme: boolean;
  card: string;
  title: string;
  sub: string;
  onSelect: (a: HandwerkerAuftrag) => void;
};

function GewerkAuftragVolleKarte({ auftrag, isLightTheme, card, title, sub, onSelect }: KarteProps) {
  const gewListe = normalizeGewerke(auftrag.gewerk ?? null);
  const terminLabel = formatTerminRange(auftrag.termin_start, auftrag.termin_ende);
  const historie = parseTerminVergangen(auftrag.termin_vergangen);
  const letzteBesichtigung = [...historie]
    .reverse()
    .find((e) => (e.termin_typ ?? "").trim() === TERMIN_TYP.BESICHTIGUNG);
  const letzteBesichtigungLabel = letzteBesichtigung
    ? formatTerminRange(letzteBesichtigung.termin_start, letzteBesichtigung.termin_ende)
    : null;
  const boardSt = (auftrag.board_status ?? "").trim();
  const primaryPdf = primaryAuftragAnhangUrl(auftrag);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(auftrag)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(auftrag)}
      className={`group flex min-h-[88px] cursor-pointer items-stretch gap-4 rounded-2xl border p-4 transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 ${card} ${
        isLightTheme ? "focus:ring-offset-slate-50" : "focus:ring-offset-slate-950"
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                isLightTheme ? "bg-slate-100 text-slate-600" : "bg-slate-800 text-slate-300"
              }`}
            >
              {auftrag.auftragsnummer ?? "–"}
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
              SPM
            </span>
            {boardSt ? (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isLightTheme ? "bg-sky-50 text-sky-800" : "bg-sky-500/15 text-sky-200"
                }`}
              >
                {boardSt}
              </span>
            ) : null}
          </div>
          {auftrag.status?.trim() ? (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isLightTheme ? "bg-emerald-50 text-emerald-700" : "bg-emerald-500/15 text-emerald-300"
              }`}
            >
              {auftrag.status.trim()}
            </span>
          ) : null}
        </div>
        <h3 className={`line-clamp-2 font-medium leading-snug ${title}`}>
          {(auftrag.adresse_strasse ?? "").trim() || "–"}
          {(auftrag.adresse_ort ?? "").trim() && `, ${auftrag.adresse_ort}`}
        </h3>
        <p className={`line-clamp-2 text-sm ${sub}`}>{(auftrag.aufgabe ?? "").trim() || "–"}</p>
        {terminLabel ? (
          <p
            className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${
              isLightTheme ? "text-blue-800" : "text-blue-300"
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span>
              {terminLabel}
              {(auftrag.termin_typ ?? "").trim() ? ` · ${(auftrag.termin_typ ?? "").trim()}` : ""}
            </span>
          </p>
        ) : letzteBesichtigungLabel ? (
          <p
            className={`mt-1 flex flex-col gap-0.5 text-[11px] leading-snug ${
              isLightTheme ? "text-slate-600" : "text-slate-400"
            }`}
          >
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 opacity-80" strokeWidth={2} />
              Letzte Besichtigung: {letzteBesichtigungLabel}
            </span>
            <span className={`pl-5 ${sub}`}>Kein aktueller Termin – Details im Auftrag</span>
          </p>
        ) : (
          <p className={`mt-1 text-[11px] ${sub}`}>Noch kein Termin gesetzt</p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {gewListe.length > 0 ? (
            gewListe.map((g) => {
              const Icon = getGewerkIcon(g);
              return (
                <span key={g} className={gewerkBadgeClass(g, isLightTheme)}>
                  {Icon ? <Icon className="h-3 w-3 shrink-0" strokeWidth={2} /> : null}
                  {g}
                </span>
              );
            })
          ) : (
            <span className={`text-[11px] ${sub}`}>Kein Gewerk</span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between gap-2">
        {primaryPdf ? (
          <a
            href={primaryPdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              isLightTheme
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            aria-label="PDF öffnen"
          >
            <Paperclip className="h-4 w-4" />
          </a>
        ) : null}
        <ChevronRight
          className={`h-5 w-5 transition-colors ${
            isLightTheme ? "text-slate-300 group-hover:text-slate-500" : "text-slate-600 group-hover:text-slate-400"
          }`}
        />
      </div>
    </article>
  );
}

type KommendeZeileProps = {
  auftrag: HandwerkerAuftrag;
  isLightTheme: boolean;
  onSelect: (a: HandwerkerAuftrag) => void;
};

function GewerkKommendeTerminZeile({ auftrag, isLightTheme, onSelect }: KommendeZeileProps) {
  const terminKurz = formatGewerkTerminKurz(auftrag.termin_start, auftrag.termin_ende);
  const aktiv = isTerminGeradeAktiv(auftrag);
  const typ = (auftrag.termin_typ ?? "").trim();
  const addr =
    [(auftrag.adresse_strasse ?? "").trim(), (auftrag.adresse_ort ?? "").trim()].filter(Boolean).join(", ") || "–";

  const rowBg = isLightTheme ? "bg-white" : "bg-slate-900/90";
  const border = isLightTheme ? "border-blue-200/90" : "border-blue-500/40";
  const accent = isLightTheme ? "bg-blue-600" : "bg-blue-400";
  const title = isLightTheme ? "text-slate-900" : "text-slate-100";
  const sub = isLightTheme ? "text-slate-500" : "text-slate-400";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(auftrag)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(auftrag)}
      className={`flex min-h-[72px] cursor-pointer items-stretch gap-0 overflow-hidden rounded-2xl border shadow-sm transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 ${rowBg} ${border} ${
        isLightTheme ? "focus:ring-offset-slate-50" : "focus:ring-offset-slate-950"
      }`}
    >
      <div className={`w-1.5 shrink-0 ${accent}`} aria-hidden />
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 sm:px-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <CalendarDays
              className={`h-4 w-4 shrink-0 ${isLightTheme ? "text-blue-700" : "text-blue-300"}`}
              strokeWidth={2}
            />
            <span className={`text-sm font-semibold ${isLightTheme ? "text-blue-900" : "text-blue-200"}`}>
              {terminKurz ?? "Termin"}
            </span>
            {aktiv ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  isLightTheme ? "bg-emerald-100 text-emerald-800" : "bg-emerald-500/25 text-emerald-200"
                }`}
              >
                Jetzt
              </span>
            ) : null}
            {typ ? (
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${sub}`}>{typ}</span>
            ) : null}
          </div>
          <p className={`truncate text-[15px] font-medium leading-snug ${title}`}>{addr}</p>
          <p className={`truncate text-xs ${sub}`}>
            {(auftrag.auftragsnummer ?? "").trim() ? `Nr. ${auftrag.auftragsnummer}` : auftrag.id.slice(0, 8)}
            {(auftrag.aufgabe ?? "").trim() ? ` · ${(auftrag.aufgabe ?? "").trim()}` : ""}
          </p>
        </div>
        <ChevronRight className={`h-5 w-5 shrink-0 ${sub}`} />
      </div>
    </article>
  );
}

function useNarrowGewerkLayout() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return narrow;
}

export type GewerkAuftraegeDashboardListProps = {
  auftraege: HandwerkerAuftrag[];
  loading: boolean;
  isLightTheme: boolean;
  onRefresh: () => void;
  onSelectAuftrag: (a: HandwerkerAuftrag) => void;
};

export function GewerkAuftraegeDashboardList({
  auftraege,
  loading,
  isLightTheme,
  onRefresh,
  onSelectAuftrag,
}: GewerkAuftraegeDashboardListProps) {
  const narrow = useNarrowGewerkLayout();
  const { kommende, weitere } = useMemo(() => splitAuftraegeKommendeUndWeitere(auftraege), [auftraege]);

  const [mobileSeg, setMobileSeg] = useState<"termine" | "weitere">("weitere");
  useEffect(() => {
    if (kommende.length === 0) setMobileSeg("weitere");
  }, [kommende.length]);

  const surface = isLightTheme ? "bg-slate-50" : "bg-slate-950";
  const card = isLightTheme
    ? "border-slate-200/80 bg-white shadow-sm hover:border-slate-300"
    : "border-slate-700/80 bg-slate-900/80 hover:border-slate-600";
  const title = isLightTheme ? "text-slate-900" : "text-slate-100";
  const sub = isLightTheme ? "text-slate-500" : "text-slate-400";
  const emptyBorder = isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-900/60";

  const showMobileUmschalter = narrow && kommende.length > 0 && weitere.length > 0;
  const segmentWrap = isLightTheme ? "bg-slate-200/80" : "bg-slate-800/90";
  const segmentActive = isLightTheme
    ? "bg-white text-slate-900 shadow-sm"
    : "bg-slate-700 text-slate-100 shadow-sm";
  const segmentIdle = isLightTheme ? "text-slate-600" : "text-slate-400";

  const listeKommende = (
    <ul className="space-y-2.5 sm:space-y-3">
      {kommende.map((auftrag) => (
        <li key={auftrag.id}>
          <GewerkKommendeTerminZeile
            auftrag={auftrag}
            isLightTheme={isLightTheme}
            onSelect={onSelectAuftrag}
          />
        </li>
      ))}
    </ul>
  );

  const listeWeitere = (
    <ul className="space-y-3 sm:space-y-4">
      {weitere.map((auftrag) => (
        <li key={auftrag.id}>
          <GewerkAuftragVolleKarte
            auftrag={auftrag}
            isLightTheme={isLightTheme}
            card={card}
            title={title}
            sub={sub}
            onSelect={onSelectAuftrag}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`rounded-2xl ${surface}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${title}`}>Meine Aufträge</h2>
        </div>
        <button
          type="button"
          onClick={() => onRefresh()}
          disabled={loading}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-50 ${
            isLightTheme
              ? "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              : "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
          aria-label="Aktualisieren"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div
            className={`h-10 w-10 animate-spin rounded-full border-2 border-t-transparent ${
              isLightTheme ? "border-slate-300 border-t-slate-600" : "border-slate-600 border-t-slate-300"
            }`}
          />
          <p className={`text-sm ${sub}`}>Lade Aufträge…</p>
        </div>
      ) : auftraege.length === 0 ? (
        <div className={`flex flex-col items-center justify-center rounded-2xl border p-12 text-center ${emptyBorder}`}>
          <div className={`mb-4 rounded-full p-4 ${isLightTheme ? "bg-slate-100" : "bg-slate-800"}`}>
            <FileText className={`h-8 w-8 ${sub}`} />
          </div>
          <p className={`font-medium ${title}`}>Keine Aufträge</p>
          <p className={`mt-1 text-sm ${sub}`}>
            Sobald dir im Büro ein Auftrag zugewiesen wird, erscheint er hier – inklusive Termin, sobald gesetzt.
          </p>
        </div>
      ) : showMobileUmschalter ? (
        <>
          <div className={`mb-4 grid grid-cols-2 gap-1.5 rounded-xl p-1 ${segmentWrap}`}>
            <button
              type="button"
              onClick={() => setMobileSeg("weitere")}
              className={`min-h-[44px] rounded-lg px-2 py-2.5 text-sm font-semibold transition-all ${
                mobileSeg === "weitere" ? segmentActive : segmentIdle
              }`}
            >
              Offene Aufträge ({weitere.length})
            </button>
            <button
              type="button"
              onClick={() => setMobileSeg("termine")}
              className={`min-h-[44px] rounded-lg px-2 py-2.5 text-sm font-semibold transition-all ${
                mobileSeg === "termine" ? segmentActive : segmentIdle
              }`}
            >
              Termine ({kommende.length})
            </button>
          </div>
          {mobileSeg === "termine" ? listeKommende : listeWeitere}
        </>
      ) : (
        <div className="space-y-8">
          {weitere.length > 0 ? (
            <section aria-label={kommende.length > 0 ? "Offene Aufträge" : "Aufträge"}>
              {kommende.length > 0 ? (
                <h3 className={`mb-2 text-xs font-semibold uppercase tracking-wide ${sub}`}>Offene Aufträge</h3>
              ) : null}
              {listeWeitere}
            </section>
          ) : null}
          {kommende.length > 0 ? (
            <section aria-label="Kommende Termine">
              <h3 className={`mb-2 text-xs font-semibold uppercase tracking-wide ${sub}`}>Kommende Termine</h3>
              {listeKommende}
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
