"use client";

import type { ReactNode } from "react";
import { CalendarDays, ChevronRight } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { formatGewerkTerminKurz } from "@/lib/auftraege/gewerk-termin-kurzformat";
import { isTerminGeradeAktiv } from "@/lib/auftraege/gewerk-auftraege-split";

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

type TicketTerminFields = {
  termin_start: string | null;
  termin_ende: string | null;
  termin_typ: string | null;
};

export function TicketEingangKommendeRowView({
  ticket,
  isLightTheme,
  displayName,
  anzeigeNr,
}: {
  ticket: TicketTerminFields & { beschreibung: string | null };
  isLightTheme: boolean;
  displayName: string;
  anzeigeNr: string;
}) {
  const terminKurz = formatGewerkTerminKurz(ticket.termin_start, ticket.termin_ende);
  const aktiv = isTerminGeradeAktiv(ticket);
  const typ = (ticket.termin_typ ?? "").trim();
  const addr = (displayName ?? "").trim() || "–";

  const rowBg = isLightTheme ? "bg-white" : "bg-slate-900/90";
  const border = isLightTheme ? "border-blue-200/90" : "border-blue-500/40";
  const accent = isLightTheme ? "bg-blue-600" : "bg-blue-400";
  const title = isLightTheme ? "text-slate-900" : "text-slate-100";
  const sub = isLightTheme ? "text-slate-500" : "text-slate-400";

  return (
    <div
      className={`group flex min-h-[72px] w-full items-stretch gap-0 overflow-hidden rounded-2xl border shadow-sm ${rowBg} ${border}`}
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
            {anzeigeNr !== "–" ? `Nr. ${anzeigeNr}` : "Ticket"}
            {(ticket.beschreibung ?? "").trim() ? ` · ${(ticket.beschreibung ?? "").trim()}` : ""}
          </p>
        </div>
        <ChevronRight
          className={`h-5 w-5 shrink-0 transition-colors ${
            isLightTheme ? "text-slate-400 group-hover:text-slate-600" : `${sub} group-hover:text-slate-300`
          }`}
        />
      </div>
    </div>
  );
}

export function TicketEingangVolleKarteView({
  isLightTheme,
  cardClassName,
  badgeCluster,
  numberRight,
  displayName,
  objektAdresse,
  beschreibung,
  terminBlock,
  gewerkeRow,
  statusMetaRow,
  phoneButton,
  footer,
}: {
  isLightTheme: boolean;
  cardClassName: string;
  badgeCluster: ReactNode;
  numberRight: ReactNode;
  displayName: string;
  objektAdresse: string | null | undefined;
  beschreibung: string | null | undefined;
  terminBlock: ReactNode;
  gewerkeRow: ReactNode;
  statusMetaRow: ReactNode;
  phoneButton: ReactNode;
  footer: ReactNode;
}) {
  const title = isLightTheme ? "text-slate-900" : "text-slate-100";
  const sub = isLightTheme ? "text-slate-500" : "text-slate-400";

  return (
    <div
      className={`group flex min-h-[88px] w-full items-stretch gap-4 rounded-2xl border p-4 transition-colors ${cardClassName}`}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">{badgeCluster}</div>
          <span className="flex shrink-0 items-center gap-1">{numberRight}</span>
        </div>
        <div className="mb-1 flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className={`line-clamp-2 text-sm font-medium leading-snug ${title}`}>{displayName}</p>
            {objektAdresse ? (
              <p className={`line-clamp-2 text-xs ${sub}`}>{objektAdresse}</p>
            ) : null}
          </div>
          {phoneButton}
        </div>
        {beschreibung ? (
          <p className={`line-clamp-2 text-sm ${sub}`}>{beschreibung}</p>
        ) : null}
        {terminBlock}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">{gewerkeRow}</div>
          {statusMetaRow}
        </div>
        {footer}
      </div>
      <div className="flex shrink-0 flex-col justify-end pb-0.5">
        <ChevronRight
          className={`h-5 w-5 transition-colors ${
            isLightTheme ? "text-slate-400 group-hover:text-slate-600" : "text-slate-600 group-hover:text-slate-400"
          }`}
        />
      </div>
    </div>
  );
}

export function ticketEingangTerminBlock(
  ticket: TicketTerminFields,
  isLightTheme: boolean,
  subTextClass: string
): ReactNode {
  const terminLabel = formatTerminRange(ticket.termin_start, ticket.termin_ende);
  if (!terminLabel) {
    return <p className={`mt-1 text-[11px] ${subTextClass}`}>Noch kein Termin gesetzt</p>;
  }
  return (
    <p
      className={`mt-1 flex items-center gap-1.5 text-xs font-medium ${
        isLightTheme ? "text-blue-800" : "text-blue-300"
      }`}
    >
      <CalendarDays className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
      <span>
        {terminLabel}
        {(ticket.termin_typ ?? "").trim() ? ` · ${(ticket.termin_typ ?? "").trim()}` : ""}
      </span>
    </p>
  );
}
