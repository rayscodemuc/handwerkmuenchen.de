"use client";

import {
  Paperclip,
  ChevronRight,
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
import { formatGewerkTerminKurz } from "@/lib/auftraege/gewerk-termin-kurzformat";
import { isTerminGeradeAktiv } from "@/lib/auftraege/gewerk-auftraege-split";
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

export function AuftragEingangKommendeRowView({
  auftrag,
  isLightTheme,
}: {
  auftrag: HandwerkerAuftrag;
  isLightTheme: boolean;
}) {
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
    <div
      className={`flex min-h-[72px] w-full items-stretch gap-0 overflow-hidden rounded-2xl border shadow-sm ${rowBg} ${border}`}
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
    </div>
  );
}

export function AuftragEingangVolleKarteView({
  auftrag,
  isLightTheme,
  cardClassName,
}: {
  auftrag: HandwerkerAuftrag;
  isLightTheme: boolean;
  cardClassName: string;
}) {
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
  const title = isLightTheme ? "text-slate-900" : "text-slate-100";
  const sub = isLightTheme ? "text-slate-500" : "text-slate-400";
  const primaryPdf = primaryAuftragAnhangUrl(auftrag);

  return (
    <div
      className={`group flex min-h-[88px] w-full items-stretch gap-4 rounded-2xl border p-4 transition-colors ${cardClassName}`}
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
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isLightTheme
                  ? "bg-amber-100 text-amber-900"
                  : "bg-amber-500/20 text-amber-200"
              }`}
            >
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
            isLightTheme ? "text-slate-400 group-hover:text-slate-600" : "text-slate-600 group-hover:text-slate-400"
          }`}
        />
      </div>
    </div>
  );
}
