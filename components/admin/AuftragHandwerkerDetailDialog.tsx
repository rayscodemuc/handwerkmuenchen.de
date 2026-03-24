"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import {
  Paperclip,
  MapPin,
  FileText,
  Phone,
  Mail,
  ImagePlus,
  X,
  Upload,
  Navigation,
  MessageCircle,
  CalendarDays,
  Calendar as CalendarIconLucide,
  User,
  Building2,
  Share2,
  ChevronDown,
  Send,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createClient } from "@/lib/supabase/client";
import {
  normalizeAuftragRow,
  resolveLeistungsempfaenger,
  resolveRechnungsempfaenger,
} from "@/lib/auftraege/billing-recipient-fields";
import {
  attachmentFileExt,
  buildMapsSearchUrl,
  compressImageForUpload,
  formatAuftragDatum,
  isProbablyImageAttachmentUrl,
  waMeHref,
} from "@/lib/auftraege/handwerker-detail-utils";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { format, isValid, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { GEWERKE_OPTIONS } from "@/src/config/gewerkeOptions";
import { STATUS, TERMIN_TYP } from "@/src/config/businessConfig";
import { canonicalizeGewerkArray } from "@/lib/auftraege/canonical-gewerk";
import { getBesichtigungAutoArchiveUpdate, parseTerminVergangen } from "@/lib/auftraege/termin-vergangen";

function isoToDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return dateToDatetimeLocalValue(d);
}

function dateToDatetimeLocalValue(d: Date): string {
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}`;
}

/** Vorgegebene Dauern für Gewerk-Termin (Minuten). */
const GEWERK_TERMIN_DAUER_OPTIONEN: { minutes: number; label: string }[] = [
  { minutes: 30, label: "30 Minuten" },
  { minutes: 45, label: "45 Minuten" },
  { minutes: 60, label: "1 Stunde" },
  { minutes: 90, label: "1,5 Stunden" },
  { minutes: 120, label: "2 Stunden" },
  { minutes: 180, label: "3 Stunden" },
  { minutes: 240, label: "4 Stunden" },
];

const GEWERK_TERMIN_MINUTE_OPTIONS = ["00", "15", "30", "45"] as const;

/**
 * Kalender + Uhrzeit-Popover: Mobile zuerst größere Zellen (≥44px), ab sm kompakter wie Desktop.
 */
const GEWERK_TERMIN_CAL_CLASSNAMES = {
  months: "flex w-full flex-col space-y-3 sm:space-y-4",
  month: "w-full space-y-3 sm:space-y-4",
  caption: "flex justify-center pt-1 relative items-center min-h-11 sm:min-h-0",
  nav_button_previous: "absolute left-0 sm:left-1",
  nav_button_next: "absolute right-0 sm:right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex w-full justify-between px-0.5",
  row: "flex w-full mt-1.5 justify-between px-0.5 sm:mt-2",
  cell: "flex h-11 w-11 shrink-0 items-center justify-center p-0 text-center text-sm sm:h-9 sm:w-9",
  day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
  day_hidden: "invisible",
  caption_label: "text-base font-semibold text-slate-800 sm:text-sm sm:font-medium sm:text-slate-700",
  head_cell:
    "flex h-8 w-11 items-center justify-center text-[11px] font-medium uppercase tracking-wide text-slate-500 sm:w-9 sm:text-xs sm:normal-case sm:tracking-normal",
  nav_button:
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 active:bg-slate-200 sm:h-8 sm:w-8 sm:text-slate-600 touch-manipulation",
  day: "h-11 w-11 min-h-[44px] min-w-[44px] p-0 text-[15px] font-medium leading-none rounded-xl text-slate-800 hover:bg-slate-100 aria-selected:opacity-100 sm:h-9 sm:w-9 sm:min-h-0 sm:min-w-0 sm:text-sm sm:font-normal sm:text-slate-700 touch-manipulation",
  day_today: "bg-slate-200/90 text-slate-900 sm:bg-slate-200/80",
  day_outside: "text-slate-400 opacity-50",
  day_disabled: "text-slate-400 opacity-30",
};

/** Unter 640px: volle Breite, große Targets, Popover unten zentriert. */
function useIsNarrowTerminPicker() {
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

/** Echte Uploads für Gewerk-Abschluss: Fotos (image_urls) + Dateien unter Rechnung/Angebote. */
function gewerkErledigtUploadStatus(row: {
  image_urls?: string[] | null;
  angebot_rechnung_urls?: string[] | null;
}) {
  const fotos = Array.isArray(row.image_urls)
    ? row.image_urls.filter((u) => typeof u === "string" && u.trim() !== "")
    : [];
  const belege = Array.isArray(row.angebot_rechnung_urls)
    ? row.angebot_rechnung_urls.filter((u) => typeof u === "string" && u.trim() !== "")
    : [];
  return {
    hasFotos: fotos.length > 0,
    hasRechnungDatei: belege.length > 0,
    canComplete: fotos.length > 0 && belege.length > 0,
  };
}

function applyGewerkTerminTimeOnDate(baseDate: Date, hour: number, minute: number): string {
  const next = new Date(baseDate);
  next.setHours(hour, minute, 0, 0);
  return dateToDatetimeLocalValue(next);
}

type GewerkTerminPickerPanelProps = {
  value: string;
  onChange: (next: string) => void;
  minutePillsRef: RefObject<HTMLDivElement | null>;
  variant: "popover" | "fullscreen";
};

function GewerkTerminPickerPanel({ value, onChange, minutePillsRef, variant }: GewerkTerminPickerPanelProps) {
  const raw = value.trim();
  let d = raw ? new Date(raw) : new Date();
  if (Number.isNaN(d.getTime())) d = new Date();
  const startHour = d.getHours();
  const startMin = Math.min(45, Math.round(d.getMinutes() / 15) * 15);
  const apply = (date: Date, h: number, min: number) =>
    onChange(applyGewerkTerminTimeOnDate(date, h, min));
  const full = variant === "fullscreen";

  return (
    <div
      className={
        full ? "flex flex-col" : "flex flex-col max-h-[min(78dvh,560px)] sm:max-h-none"
      }
    >
      <div
        className={
          full
            ? "pb-2"
            : "min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 pb-1 pt-2 sm:px-4 sm:pb-0 sm:pt-4 [-webkit-overflow-scrolling:touch]"
        }
      >
        <Calendar
          mode="single"
          selected={d}
          onSelect={(date) => date && apply(date, startHour, startMin)}
          locale={de}
          classNames={GEWERK_TERMIN_CAL_CLASSNAMES}
        />
      </div>
      <div className="shrink-0 border-t border-slate-200 bg-white">
        <div
          className={
            full
              ? "flex flex-col gap-3 px-1 pt-4"
              : "flex flex-wrap items-center gap-3 px-2 py-2 sm:px-4 sm:py-3 sm:pt-3"
          }
        >
          <button
            type="button"
            onClick={() => {
              const today = new Date();
              apply(today, startHour, startMin);
            }}
            className={`touch-manipulation self-start rounded-lg px-1 text-left font-semibold underline-offset-2 active:text-blue-700 ${
              full
                ? "min-h-11 text-sm text-blue-600"
                : "min-h-0 text-xs text-blue-600 sm:font-medium sm:text-slate-500 sm:no-underline sm:hover:text-blue-600 sm:hover:underline"
            }`}
          >
            Heute
          </button>
          <div
            className={full ? "flex w-full flex-col gap-3" : "flex flex-wrap items-center gap-3"}
          >
            <select
              aria-label="Stunde"
              value={String(startHour).padStart(2, "0")}
              onChange={(e) => {
                apply(d, parseInt(e.target.value, 10), startMin);
                setTimeout(
                  () => minutePillsRef.current?.focus({ preventScroll: true }),
                  0
                );
              }}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 font-semibold tabular-nums text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/25 sm:w-auto sm:font-medium ${
                full ? "min-h-12 px-4 py-3 text-base" : "px-2.5 py-2 text-sm"
              }`}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")} Uhr
                </option>
              ))}
            </select>
            <div
              ref={minutePillsRef}
              tabIndex={-1}
              className={
                full
                  ? "grid w-full grid-cols-4 gap-2 focus:outline-none"
                  : "flex flex-wrap items-center gap-1.5 focus:outline-none"
              }
            >
              {GEWERK_TERMIN_MINUTE_OPTIONS.map((m) => {
                const minVal = parseInt(m, 10);
                const isActive = startMin === minVal;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => apply(d, startHour, minVal)}
                    className={`touch-manipulation font-semibold tabular-nums transition-colors active:scale-[0.98] sm:active:scale-100 ${
                      full
                        ? `min-h-12 w-full rounded-xl text-sm ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "border border-slate-200 bg-slate-50 text-slate-800 active:bg-slate-100"
                          }`
                        : `rounded-full px-3 py-2 text-xs ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                          }`
                    }`}
                  >
                    :{m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function snapGewerkDauerMinuten(diffMin: number): number {
  if (!Number.isFinite(diffMin) || diffMin < 1) return 60;
  let best = GEWERK_TERMIN_DAUER_OPTIONEN[0]!.minutes;
  let bestDist = Infinity;
  for (const { minutes: m } of GEWERK_TERMIN_DAUER_OPTIONEN) {
    const d = Math.abs(m - diffMin);
    if (d < bestDist) {
      bestDist = d;
      best = m;
    }
  }
  return best;
}

function formatAuftragTerminZeile(tsRaw: string, teRaw: string): string | null {
  const ts = (tsRaw ?? "").trim();
  const te = (teRaw ?? "").trim();
  if (!ts) return null;
  try {
    const ds = parseISO(ts);
    if (!isValid(ds)) return ts;
    if (te) {
      const de_ = parseISO(te);
      if (isValid(de_)) {
        return `${format(ds, "EEEE, dd.MM.yyyy HH:mm", { locale: de })} – ${format(de_, "HH:mm", { locale: de })}`;
      }
    }
    return format(ds, "EEEE, dd.MM.yyyy HH:mm", { locale: de });
  } catch {
    return ts;
  }
}

const BUCKET_IMAGES = "ticket-images";
const supabase = createClient();

type HandwerkerKommentar = {
  id: string;
  text: string;
  author: string;
  timestamp: string;
};
const LEGACY_COMMENT_PREFIX = "__KOMMENTARE_JSON__:";

function normalizeGewerkList(v: string[] | null | undefined): string[] {
  if (!v || !Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.trim() !== "");
}

function normalizeKommentare(value: unknown): HandwerkerKommentar[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((raw) => {
      if (!raw || typeof raw !== "object") return null;
      const row = raw as Record<string, unknown>;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : crypto.randomUUID();
      const text = typeof row.text === "string" ? row.text.trim() : "";
      if (!text) return null;
      const author =
        typeof row.author === "string" && row.author.trim() ? row.author.trim() : "Admin";
      const timestamp =
        typeof row.timestamp === "string" && row.timestamp.trim()
          ? row.timestamp.trim()
          : new Date().toISOString();
      return { id, text, author, timestamp };
    })
    .filter((x): x is HandwerkerKommentar => x != null)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function parseLegacyKommentareFromNotizen(notizen: string | null | undefined): HandwerkerKommentar[] {
  const raw = (notizen ?? "").trim();
  if (!raw.startsWith(LEGACY_COMMENT_PREFIX)) return [];
  const payload = raw.slice(LEGACY_COMMENT_PREFIX.length).trim();
  if (!payload) return [];
  try {
    const parsed = JSON.parse(payload);
    return normalizeKommentare(parsed);
  } catch {
    return [];
  }
}

function serializeKommentareToNotizen(kommentare: HandwerkerKommentar[]): string {
  return `${LEGACY_COMMENT_PREFIX}${JSON.stringify(kommentare)}`;
}

function isMissingKommentarColumnError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const msg = String((err as { message?: unknown }).message ?? "").toLowerCase();
  return (
    msg.includes("handwerker_kommentare") &&
    (msg.includes("schema cache") || msg.includes("column"))
  );
}

export type AuftragHandwerkerDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auftrag: HandwerkerAuftrag | null;
  onAuftragPatch?: (auftragId: string, patch: Partial<HandwerkerAuftrag>) => void;
  showBilling?: boolean;
  /** Bekanntes Board-Ticket (z. B. Klick im Kanban) – sonst wird per `auftrag_id` gesucht. */
  boardTicketId?: string | null;
  boardTicketGewerk?: string[] | null;
  onBoardGewerkSaved?: (ticketId: string, gewerk: string[] | null) => void;
  /** Wenn keine verknüpfte Kanban-Karte existiert: Gewerk auf `auftraege.gewerk` speichern. */
  onAuftragBoardGewerkSaved?: (auftragId: string, gewerk: string[] | null) => void;
  /** Nur Admin: Gewerk am Board-Ticket bearbeiten. Gewerk-Nutzer: Bereich ausgeblendet. */
  showBoardGewerkSection?: boolean;
};

export function AuftragHandwerkerDetailDialog({
  open,
  onOpenChange,
  auftrag,
  onAuftragPatch,
  showBilling = true,
  boardTicketId: boardTicketIdProp,
  boardTicketGewerk,
  onBoardGewerkSaved,
  onAuftragBoardGewerkSaved,
  showBoardGewerkSection = true,
}: AuftragHandwerkerDetailDialogProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImageUrl, setDeletingImageUrl] = useState<string | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [detailKommentare, setDetailKommentare] = useState<HandwerkerKommentar[]>([]);
  const [newKommentarText, setNewKommentarText] = useState("");
  const [kommentarSaving, setKommentarSaving] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  const [fetchedBoardTicketId, setFetchedBoardTicketId] = useState<string | null>(null);
  const [fetchedBoardGewerk, setFetchedBoardGewerk] = useState<string[] | null>(null);
  const [boardTicketLookupDone, setBoardTicketLookupDone] = useState(false);
  const [boardGewerke, setBoardGewerke] = useState<string[]>([]);
  const [boardGewerkSaving, setBoardGewerkSaving] = useState(false);
  const boardGewerkSyncKey = useRef<string>("");
  const gewerkTerminMinutePillsRef = useRef<HTMLDivElement>(null);
  const terminPickerNarrow = useIsNarrowTerminPicker();

  /** Gewerk-Nutzer: Termin selbst eintragen (ohne Admin-Kalender). */
  const [gewerkTerminTyp, setGewerkTerminTyp] = useState<string>(TERMIN_TYP.BESICHTIGUNG);
  const [gewerkTerminStartLocal, setGewerkTerminStartLocal] = useState("");
  const [gewerkTerminDauerMin, setGewerkTerminDauerMin] = useState(60);
  const [gewerkTerminSaving, setGewerkTerminSaving] = useState(false);
  const [gewerkTerminFullscreenOpen, setGewerkTerminFullscreenOpen] = useState(false);

  const [gewerkErledigtOpen, setGewerkErledigtOpen] = useState(false);
  const [gewerkErledigtSaving, setGewerkErledigtSaving] = useState(false);

  const effectiveBoardTicketId =
    boardTicketIdProp != null && boardTicketIdProp !== ""
      ? boardTicketIdProp
      : fetchedBoardTicketId;

  useEffect(() => {
    if (!open) setGewerkTerminFullscreenOpen(false);
  }, [open]);

  useEffect(() => {
    setGewerkTerminFullscreenOpen(false);
  }, [auftrag?.id]);

  useEffect(() => {
    if (!gewerkTerminFullscreenOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gewerkTerminFullscreenOpen]);

  useEffect(() => {
    const comments = normalizeKommentare((auftrag as Record<string, unknown> | null)?.handwerker_kommentare);
    const commentsFromLegacy = parseLegacyKommentareFromNotizen(auftrag?.handwerker_notizen);
    const legacyText = (auftrag?.handwerker_notizen ?? "").trim();
    const isSerializedLegacy = legacyText.startsWith(LEGACY_COMMENT_PREFIX);
    if (comments.length > 0) {
      setDetailKommentare(comments);
      return;
    }
    if (commentsFromLegacy.length > 0) {
      setDetailKommentare(commentsFromLegacy);
      return;
    }
    if (legacyText && !isSerializedLegacy) {
      setDetailKommentare([
        {
          id: `legacy-${auftrag?.id ?? "auftrag"}`,
          text: legacyText,
          author: "Admin",
          timestamp: auftrag?.created_at ?? new Date().toISOString(),
        },
      ]);
      return;
    }
    setDetailKommentare([]);
  }, [auftrag?.id, auftrag?.handwerker_notizen, (auftrag as Record<string, unknown> | null)?.handwerker_kommentare, auftrag?.created_at]);

  useEffect(() => {
    if (!showBoardGewerkSection) {
      setFetchedBoardTicketId(null);
      setFetchedBoardGewerk(null);
      setBoardTicketLookupDone(true);
      boardGewerkSyncKey.current = "";
      return;
    }
    if (!open || !auftrag?.id) {
      setFetchedBoardTicketId(null);
      setFetchedBoardGewerk(null);
      setBoardTicketLookupDone(false);
      boardGewerkSyncKey.current = "";
      return;
    }
    if (boardTicketIdProp != null && boardTicketIdProp !== "") {
      setFetchedBoardTicketId(null);
      setFetchedBoardGewerk(null);
      setBoardTicketLookupDone(true);
      return;
    }
    setBoardTicketLookupDone(false);
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("id, gewerk")
        .eq("additional_data->>auftrag_id", auftrag.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.id) {
        setFetchedBoardTicketId(null);
        setFetchedBoardGewerk(null);
      } else {
        setFetchedBoardTicketId(data.id);
        setFetchedBoardGewerk(canonicalizeGewerkArray(data.gewerk));
      }
      setBoardTicketLookupDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, auftrag?.id, boardTicketIdProp, showBoardGewerkSection]);

  useEffect(() => {
    if (!open || !auftrag?.id || showBoardGewerkSection) return;
    const typ = (auftrag.termin_typ ?? "").trim();
    setGewerkTerminTyp(typ === TERMIN_TYP.AUSFUEHRUNG ? TERMIN_TYP.AUSFUEHRUNG : TERMIN_TYP.BESICHTIGUNG);
    setGewerkTerminStartLocal(isoToDatetimeLocalValue(auftrag.termin_start));
    const ts = (auftrag.termin_start ?? "").trim();
    const te = (auftrag.termin_ende ?? "").trim();
    if (ts && te) {
      const ds = new Date(ts);
      const de = new Date(te);
      if (!Number.isNaN(ds.getTime()) && !Number.isNaN(de.getTime()) && de.getTime() > ds.getTime()) {
        const diffMin = Math.round((de.getTime() - ds.getTime()) / 60_000);
        setGewerkTerminDauerMin(snapGewerkDauerMinuten(diffMin));
      } else {
        setGewerkTerminDauerMin(60);
      }
    } else {
      setGewerkTerminDauerMin(60);
    }
  }, [
    open,
    auftrag?.id,
    auftrag?.termin_start,
    auftrag?.termin_ende,
    auftrag?.termin_typ,
    showBoardGewerkSection,
  ]);

  useEffect(() => {
    if (!open) {
      boardGewerkSyncKey.current = "";
      return;
    }
    if (!boardTicketLookupDone) return;
    if (effectiveBoardTicketId) {
      const fromTicketRaw =
        boardTicketIdProp != null && boardTicketIdProp !== ""
          ? boardTicketGewerk
          : fetchedBoardGewerk;
      const fromTicket = canonicalizeGewerkArray(fromTicketRaw) ?? [];
      const fromAuftrag = canonicalizeGewerkArray(auftrag?.gewerk) ?? [];
      /** Kanban-Badges lesen aus `auftraege.gewerk`; Ticket kann veraltet sein — Vorrang Auftrag. */
      const merged = fromAuftrag.length > 0 ? fromAuftrag : fromTicket;
      const key = `t:${effectiveBoardTicketId}|a:${auftrag?.id ?? ""}|auf:${JSON.stringify(fromAuftrag)}|tk:${JSON.stringify(fromTicket)}`;
      if (boardGewerkSyncKey.current === key) return;
      boardGewerkSyncKey.current = key;
      setBoardGewerke(merged);
      return;
    }
    if (auftrag?.id) {
      const fromAuftrag = canonicalizeGewerkArray(auftrag?.gewerk) ?? [];
      const key = `auftrag:${auftrag.id}:${JSON.stringify(fromAuftrag)}`;
      if (boardGewerkSyncKey.current === key) return;
      boardGewerkSyncKey.current = key;
      setBoardGewerke(fromAuftrag);
      return;
    }
    setBoardGewerke([]);
    boardGewerkSyncKey.current = "";
  }, [
    open,
    effectiveBoardTicketId,
    boardTicketLookupDone,
    boardTicketIdProp,
    boardTicketGewerk,
    fetchedBoardGewerk,
    auftrag?.id,
    auftrag?.gewerk,
  ]);

  const saveBoardGewerk = useCallback(async () => {
    if (!showBoardGewerkSection) return;
    setBoardGewerkSaving(true);
    setDialogError(null);
    const value = boardGewerke.length > 0 ? boardGewerke : null;
    /**
     * Gemischtes Board zeigt SPM-Karten aus `auftraege` (Badges aus auftraege.gewerk).
     * Legacy: oft existiert zusätzlich ein Ticket mit gleichem Gewerk — beides muss synchron bleiben,
     * sonst wirkt die Zuweisung „verschwunden“, wenn nur tickets.gewerk gesetzt wurde.
     */
    const tasks: Promise<{ error: { message: string } | null }>[] = [];
    if (auftrag?.id) {
      tasks.push(
        Promise.resolve(
          supabase.from("auftraege").update({ gewerk: value }).eq("id", auftrag.id)
        ).then((r) => ({ error: r.error }))
      );
    }
    if (effectiveBoardTicketId) {
      tasks.push(
        Promise.resolve(
          supabase.from("tickets").update({ gewerk: value }).eq("id", effectiveBoardTicketId)
        ).then((r) => ({ error: r.error }))
      );
    }
    if (tasks.length === 0) {
      setBoardGewerkSaving(false);
      return;
    }
    const results = await Promise.all(tasks);
    const firstErr = results.find((r) => r.error)?.error;
    if (firstErr) {
      setDialogError(firstErr.message);
      setBoardGewerkSaving(false);
      return;
    }
    if (effectiveBoardTicketId) {
      setFetchedBoardGewerk(value);
    }
    if (auftrag?.id) {
      onAuftragBoardGewerkSaved?.(auftrag.id, value);
      onAuftragPatch?.(auftrag.id, { gewerk: value });
    }
    if (effectiveBoardTicketId) {
      onBoardGewerkSaved?.(effectiveBoardTicketId, value);
    }
    setBoardGewerkSaving(false);
  }, [
    showBoardGewerkSection,
    effectiveBoardTicketId,
    boardGewerke,
    auftrag?.id,
    onBoardGewerkSaved,
    onAuftragBoardGewerkSaved,
    onAuftragPatch,
  ]);

  const saveGewerkTermin = useCallback(async () => {
    if (showBoardGewerkSection || !auftrag?.id) return;
    setDialogError(null);
    const startRaw = gewerkTerminStartLocal.trim();
    if (!startRaw) {
      setDialogError("Bitte Startdatum und -zeit wählen.");
      return;
    }
    const startDate = new Date(startRaw);
    if (Number.isNaN(startDate.getTime())) {
      setDialogError("Ungültige Startzeit.");
      return;
    }
    if (startDate.getTime() < Date.now() - 60_000) {
      setDialogError("Start muss in der Zukunft liegen.");
      return;
    }
    const endDate = new Date(startDate.getTime() + gewerkTerminDauerMin * 60_000);
    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();
    const termin_typ =
      gewerkTerminTyp === TERMIN_TYP.AUSFUEHRUNG ? TERMIN_TYP.AUSFUEHRUNG : TERMIN_TYP.BESICHTIGUNG;
    const board_status =
      termin_typ === TERMIN_TYP.BESICHTIGUNG ? STATUS.BESICHTIGUNG : STATUS.AUSFUEHRUNG;
    setGewerkTerminSaving(true);
    const { error } = await supabase
      .from("auftraege")
      .update({
        termin_start: startIso,
        termin_ende: endIso,
        termin_typ,
        board_status,
      })
      .eq("id", auftrag.id);
    if (error) {
      setDialogError(error.message);
      setGewerkTerminSaving(false);
      return;
    }
    onAuftragPatch?.(auftrag.id, {
      termin_start: startIso,
      termin_ende: endIso,
      termin_typ,
      board_status,
    });
    setGewerkTerminSaving(false);
  }, [
    showBoardGewerkSection,
    auftrag?.id,
    gewerkTerminStartLocal,
    gewerkTerminDauerMin,
    gewerkTerminTyp,
    onAuftragPatch,
  ]);

  const clearGewerkTermin = useCallback(async () => {
    if (showBoardGewerkSection || !auftrag?.id) return;
    const hasTermin = Boolean(
      (auftrag.termin_start ?? "").trim() ||
        (auftrag.termin_ende ?? "").trim() ||
        (auftrag.termin_typ ?? "").trim()
    );
    if (!hasTermin) return;
    if (!window.confirm("Termin wirklich entfernen? Der Auftrag erscheint wieder ohne Termin in der Liste.")) {
      return;
    }
    setDialogError(null);
    setGewerkTerminSaving(true);
    const { error } = await supabase
      .from("auftraege")
      .update({
        termin_start: null,
        termin_ende: null,
        termin_typ: null,
        board_status: STATUS.ANFRAGE,
      })
      .eq("id", auftrag.id);
    if (error) {
      setDialogError(error.message);
      setGewerkTerminSaving(false);
      return;
    }
    setGewerkTerminStartLocal("");
    setGewerkTerminDauerMin(60);
    setGewerkTerminTyp(TERMIN_TYP.BESICHTIGUNG);
    onAuftragPatch?.(auftrag.id, {
      termin_start: null,
      termin_ende: null,
      termin_typ: null,
      board_status: STATUS.ANFRAGE,
    });
    setGewerkTerminSaving(false);
  }, [
    showBoardGewerkSection,
    auftrag?.id,
    auftrag?.termin_start,
    auftrag?.termin_ende,
    auftrag?.termin_typ,
    onAuftragPatch,
  ]);

  useEffect(() => {
    setGewerkErledigtOpen(false);
  }, [auftrag?.id]);

  useEffect(() => {
    if (!open) setGewerkErledigtOpen(false);
  }, [open]);

  const markGewerkAuftragErledigt = useCallback(async () => {
    if (showBoardGewerkSection || !auftrag?.id) return;
    const { canComplete } = gewerkErledigtUploadStatus(auftrag);
    if (!canComplete) {
      setDialogError("Bitte mindestens ein Foto (oben) und mindestens eine Datei unter „Rechnung hinzufügen“ hochladen.");
      return;
    }
    setGewerkErledigtSaving(true);
    setDialogError(null);
    const { error } = await supabase
      .from("auftraege")
      .update({ board_status: STATUS.ABRECHNUNG })
      .eq("id", auftrag.id);
    if (error) {
      setDialogError(error.message);
      setGewerkErledigtSaving(false);
      return;
    }
    onAuftragPatch?.(auftrag.id, { board_status: STATUS.ABRECHNUNG });
    setGewerkErledigtOpen(false);
    setGewerkErledigtSaving(false);
  }, [showBoardGewerkSection, auftrag, onAuftragPatch]);

  /** Abgelaufene Besichtigung automatisch in Historie legen (ohne Button). */
  useEffect(() => {
    if (!open || showBoardGewerkSection || !auftrag?.id) return;
    const spec = getBesichtigungAutoArchiveUpdate(auftrag);
    if (!spec) return;
    let cancelled = false;
    setGewerkTerminSaving(true);
    setDialogError(null);
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("auftraege")
          .update(spec.payload)
          .eq("id", auftrag.id)
          .eq("termin_start", spec.matchTerminStart)
          .select("*")
          .maybeSingle();
        if (cancelled) return;
        if (error) {
          setDialogError(error.message);
          return;
        }
        if (!data) return;
        const normalized = normalizeAuftragRow(data as Record<string, unknown>) as HandwerkerAuftrag;
        setGewerkTerminStartLocal("");
        setGewerkTerminDauerMin(60);
        setGewerkTerminTyp(TERMIN_TYP.BESICHTIGUNG);
        onAuftragPatch?.(auftrag.id, {
          termin_vergangen: normalized.termin_vergangen ?? spec.payload.termin_vergangen,
          termin_start: null,
          termin_ende: null,
          termin_typ: null,
          board_status: normalized.board_status ?? STATUS.NACHBEREITUNG,
        });
      } finally {
        setGewerkTerminSaving(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    open,
    showBoardGewerkSection,
    auftrag?.id,
    auftrag?.termin_start,
    auftrag?.termin_ende,
    auftrag?.termin_typ,
    auftrag?.termin_vergangen,
    onAuftragPatch,
  ]);

  const uploadAuftragImage = useCallback(
    async (
      auftragId: string,
      file: File,
      currentUrls: string[] = []
    ): Promise<string | null> => {
      setUploadingImage(true);
      setDialogError(null);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) {
          setDialogError("Nicht eingeloggt");
          setUploadingImage(false);
          return null;
        }
      } catch {
        setDialogError("Nicht eingeloggt");
        setUploadingImage(false);
        return null;
      }
      const isImage = file.type.startsWith("image/");
      const blob = isImage ? await compressImageForUpload(file) : (file as Blob);
      if (!blob || !(blob instanceof Blob)) {
        setDialogError("Ungültige Datei");
        setUploadingImage(false);
        return null;
      }
      const path = `auftraege/${auftragId}_${Date.now()}.jpg`.replace(/^\/+/, "");
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_IMAGES)
        .upload(path, blob, {
          cacheControl: "3600",
          upsert: false,
          contentType: isImage ? "image/jpeg" : file.type || "application/octet-stream",
        });
      if (uploadError) {
        setDialogError(uploadError.message);
        setUploadingImage(false);
        return null;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const newUrls = [...currentUrls, publicUrl];
      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ image_urls: newUrls })
        .eq("id", auftragId);
      if (updateError) {
        setDialogError(updateError.message);
        setUploadingImage(false);
        return null;
      }
      onAuftragPatch?.(auftragId, { image_urls: newUrls });
      setUploadingImage(false);
      return publicUrl;
    },
    [onAuftragPatch]
  );

  const uploadAuftragDoc = useCallback(
    async (
      auftragId: string,
      file: File,
      currentUrls: string[] = []
    ): Promise<string | null> => {
      setUploadingDoc(true);
      setDialogError(null);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) {
          setDialogError("Nicht eingeloggt");
          setUploadingDoc(false);
          return null;
        }
      } catch {
        setDialogError("Nicht eingeloggt");
        setUploadingDoc(false);
        return null;
      }
      if (!file || !(file instanceof Blob)) {
        setDialogError("Ungültige Datei");
        setUploadingDoc(false);
        return null;
      }
      const isImage = file.type.startsWith("image/");
      const body: Blob = isImage ? await compressImageForUpload(file) : file;
      const ext = isImage ? "jpg" : attachmentFileExt(file);
      const contentType = isImage ? "image/jpeg" : file.type || "application/octet-stream";
      const path = `auftraege/docs/${auftragId}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_IMAGES)
        .upload(path, body, {
          cacheControl: "3600",
          upsert: false,
          contentType,
        });
      if (uploadError) {
        setDialogError(uploadError.message);
        setUploadingDoc(false);
        return null;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const newUrls = [...currentUrls, publicUrl];
      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ angebot_rechnung_urls: newUrls })
        .eq("id", auftragId);
      if (updateError) {
        setDialogError(updateError.message);
        setUploadingDoc(false);
        return null;
      }
      onAuftragPatch?.(auftragId, { angebot_rechnung_urls: newUrls });
      setUploadingDoc(false);
      return publicUrl;
    },
    [onAuftragPatch]
  );

  const deleteAuftragImage = useCallback(
    async (auftragId: string, targetUrl: string, currentUrls: string[] = []) => {
      setDeletingImageUrl(targetUrl);
      setDialogError(null);
      const nextUrls = currentUrls.filter((u) => u !== targetUrl);

      // Best-effort: remove underlying storage object when URL matches public bucket path.
      try {
        const parsed = new URL(targetUrl);
        const marker = `/storage/v1/object/public/${BUCKET_IMAGES}/`;
        const idx = parsed.pathname.indexOf(marker);
        if (idx >= 0) {
          const objectPath = decodeURIComponent(parsed.pathname.slice(idx + marker.length));
          if (objectPath) {
            await supabase.storage.from(BUCKET_IMAGES).remove([objectPath]);
          }
        }
      } catch {
        // Ignore invalid URL format; DB list update is the source of truth.
      }

      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ image_urls: nextUrls })
        .eq("id", auftragId);

      if (updateError) {
        setDialogError(updateError.message);
      } else {
        onAuftragPatch?.(auftragId, { image_urls: nextUrls });
      }
      setDeletingImageUrl(null);
    },
    [onAuftragPatch]
  );

  const saveKommentare = useCallback(async (nextKommentare: HandwerkerKommentar[]) => {
    if (!auftrag?.id) return;
    setKommentarSaving(true);
    setDialogError(null);
    const { error: updateError } = await supabase
      .from("auftraege")
      .update({ handwerker_kommentare: nextKommentare, handwerker_notizen: null })
      .eq("id", auftrag.id);
    if (updateError && isMissingKommentarColumnError(updateError)) {
      const legacyPayload = serializeKommentareToNotizen(nextKommentare);
      const { error: legacyError } = await supabase
        .from("auftraege")
        .update({ handwerker_notizen: legacyPayload })
        .eq("id", auftrag.id);
      if (legacyError) {
        setDialogError(legacyError.message);
      } else {
        setDetailKommentare(nextKommentare);
        onAuftragPatch?.(auftrag.id, {
          handwerker_notizen: legacyPayload,
        });
      }
      setKommentarSaving(false);
      return;
    }
    if (updateError) {
      setDialogError(updateError.message);
    } else {
      setDetailKommentare(nextKommentare);
      onAuftragPatch?.(auftrag.id, {
        handwerker_kommentare: nextKommentare,
        handwerker_notizen: null,
      });
    }
    setKommentarSaving(false);
  }, [auftrag?.id, onAuftragPatch]);

  const addKommentar = useCallback(async () => {
    const text = newKommentarText.trim();
    if (!text) return;
    const { data } = await supabase.auth.getUser();
    const author =
      data?.user?.user_metadata?.full_name ??
      data?.user?.email ??
      "Admin";
    const next = [
      {
        id: crypto.randomUUID(),
        text,
        author: typeof author === "string" && author.trim() ? author.trim() : "Admin",
        timestamp: new Date().toISOString(),
      },
      ...detailKommentare,
    ];
    await saveKommentare(next);
    setNewKommentarText("");
  }, [newKommentarText, detailKommentare, saveKommentare]);

  const deleteKommentar = useCallback(async (kommentarId: string) => {
    const next = detailKommentare.filter((k) => k.id !== kommentarId);
    await saveKommentare(next);
  }, [detailKommentare, saveKommentare]);

  const handleDetailShare = useCallback(async () => {
    if (!auftrag) return;
    const addr = [auftrag.adresse_strasse, auftrag.adresse_ort]
      .map((s) => (s ?? "").trim())
      .filter(Boolean)
      .join(", ");
    const nr = auftrag.auftragsnummer ?? "–";
    const title = `Auftrag ${nr}`;
    const task = (auftrag.aufgabe ?? "").trim().slice(0, 280);
    const text = [addr, task].filter(Boolean).join("\n\n");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text });
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    } else {
      await navigator.clipboard?.writeText(`${title}\n${text}`);
      alert("Auftrag in Zwischenablage kopiert.");
    }
  }, [auftrag]);

  const mergedAuftrag = auftrag;

  return (
    <>
      <Dialog
        open={open && !!mergedAuftrag}
        onOpenChange={(o) => {
          if (!o) setLightboxImage(null);
          onOpenChange(o);
        }}
      >
        <DialogContent className="flex h-[100dvh] max-h-[100dvh] w-full min-w-0 max-w-none flex-col gap-0 overflow-hidden border-0 p-0 sm:h-[min(92dvh,880px)] sm:max-h-[92dvh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-slate-200 sm:p-0">
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {mergedAuftrag &&
            (() => {
              const detailAuftrag = mergedAuftrag;
              const strasse = (detailAuftrag.adresse_strasse ?? "").trim();
              const ort = (detailAuftrag.adresse_ort ?? "").trim();
              const hasAddress = Boolean(strasse || ort);
              const mapsUrl = buildMapsSearchUrl(detailAuftrag.adresse_strasse, detailAuftrag.adresse_ort);
              const tel = (detailAuftrag.mieter_telefon ?? "").trim();
              const email = (detailAuftrag.mieter_email ?? "").trim();
              const wa = waMeHref(detailAuftrag.mieter_telefon);
              const datumLabel = formatAuftragDatum(detailAuftrag.datum);
              const rechnungsempfaengerText = resolveRechnungsempfaenger(detailAuftrag);
              const leistungsempfaengerText = resolveLeistungsempfaenger(detailAuftrag);
              return (
                <>
                  {dialogError && (
                    <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
                      {dialogError}
                    </div>
                  )}
                  <div className="sticky top-0 z-10 shrink-0 border-b border-slate-200 bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)] sm:rounded-t-2xl">
                    <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-3 sm:px-5 sm:pt-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            {detailAuftrag.auftragsnummer ?? "–"}
                          </DialogTitle>
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                            SPM
                          </span>
                          {detailAuftrag.status?.trim() && (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                              {detailAuftrag.status.trim()}
                            </span>
                          )}
                        </div>
                        {datumLabel && (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                            {datumLabel}
                            {detailAuftrag.auftragstyp?.trim() && (
                              <>
                                <span className="text-slate-300">·</span>
                                <span className="truncate">{detailAuftrag.auftragstyp.trim()}</span>
                              </>
                            )}
                          </p>
                        )}
                        {!datumLabel && detailAuftrag.auftragstyp?.trim() && (
                          <p className="mt-1 truncate text-xs text-slate-500">
                            {detailAuftrag.auftragstyp.trim()}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => void handleDetailShare()}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                          aria-label="Teilen"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenChange(false)}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          aria-label="Schließen"
                        >
                          <X className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 px-4 pb-2.5 sm:grid-cols-3 sm:px-5 sm:pb-3">
                      {hasAddress ? (
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 active:scale-[0.98]"
                        >
                          <Navigation className="h-4 w-4 shrink-0" />
                          Navigation
                        </a>
                      ) : (
                        <span className="flex min-h-[44px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 text-center text-xs text-slate-400">
                          Keine Adresse
                        </span>
                      )}
                      {tel ? (
                        <a
                          href={`tel:${tel}`}
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.98]"
                        >
                          <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                          Anrufen
                        </a>
                      ) : (
                        <span className="flex min-h-[44px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 text-center text-xs text-slate-400">
                          Kein Telefon
                        </span>
                      )}
                      {wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.98] sm:col-span-1"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                          WhatsApp
                        </a>
                      ) : null}
                      {detailAuftrag.anhang_url ? (
                        <a
                          href={detailAuftrag.anhang_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50/80 px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:bg-blue-50 active:scale-[0.98] ${wa ? "" : "col-span-2 sm:col-span-1"}`}
                        >
                          <FileText className="h-4 w-4 shrink-0" />
                          Auftrag-PDF
                        </a>
                      ) : null}
                      {email ? (
                        <a
                          href={`mailto:${email}`}
                          className="col-span-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 sm:col-span-1"
                        >
                          <Mail className="h-4 w-4 shrink-0 text-slate-600" />
                          E-Mail
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 overflow-y-auto overscroll-contain bg-slate-50 px-3 py-3 sm:px-4 sm:py-4">
                    <div className="mx-auto max-w-xl space-y-3 sm:max-w-none">
                      <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
                        <div className="flex gap-2.5 px-3 py-3 sm:px-4">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Einsatzort
                            </p>
                            <p className="text-base font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere]">
                              {strasse || "–"}
                            </p>
                            {ort && (
                              <p className="mt-0.5 text-sm text-slate-600 [overflow-wrap:anywhere]">{ort}</p>
                            )}
                          </div>
                        </div>

                        {(detailAuftrag.aufgabe ?? "").trim() ? (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-3 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Leistung / Aufgabe
                              </p>
                              <p className="mt-1 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                {(detailAuftrag.aufgabe ?? "").trim()}
                              </p>
                            </div>
                          </>
                        ) : null}

                        {(() => {
                          const ts = (detailAuftrag.termin_start ?? "").trim();
                          const te = (detailAuftrag.termin_ende ?? "").trim();
                          const typ = (detailAuftrag.termin_typ ?? "").trim();
                          const gewerkCanClearTermin =
                            !showBoardGewerkSection &&
                            Boolean(detailAuftrag?.id) &&
                            Boolean(ts || te || typ);
                          const zeile = formatAuftragTerminZeile(ts, te);
                          const terminHistorie = parseTerminVergangen(detailAuftrag.termin_vergangen);
                          const historieNeuesteZuerst = [...terminHistorie].reverse();
                          return (
                            <>
                              <div className="h-px bg-slate-100" />
                              <div className="px-3 py-3 sm:px-4">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="min-w-0 flex-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                    Termin
                                  </p>
                                  {gewerkCanClearTermin ? (
                                    <button
                                      type="button"
                                      aria-label="Termin entfernen"
                                      title="Termin entfernen"
                                      disabled={gewerkTerminSaving}
                                      onClick={() => void clearGewerkTermin()}
                                      className="touch-manipulation -mr-1 -mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
                                    >
                                      <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    </button>
                                  ) : null}
                                </div>
                                {zeile ? (
                                  <p className="mt-1 flex items-start gap-2 text-sm font-medium leading-snug text-slate-900">
                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2} />
                                    <span>
                                      {zeile}
                                      {typ ? (
                                        <>
                                          <span className="text-slate-400"> · </span>
                                          {typ}
                                        </>
                                      ) : null}
                                    </span>
                                  </p>
                                ) : typ && !zeile ? (
                                  <p className="mt-1 flex items-start gap-2 text-sm font-medium text-slate-900">
                                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2} />
                                    <span>{typ}</span>
                                  </p>
                                ) : (
                                  <p className="mt-1 text-sm text-slate-500">
                                    {showBoardGewerkSection ? "Kein Termin." : "Kein Termin – unten festlegen."}
                                  </p>
                                )}
                                {historieNeuesteZuerst.length > 0 ? (
                                  <div className="mt-2.5 rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-2 sm:px-3">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                      Historie
                                    </p>
                                    <ul className="mt-1.5 space-y-1.5">
                                      {historieNeuesteZuerst.map((h, idx) => {
                                        const hz = formatAuftragTerminZeile(h.termin_start, h.termin_ende ?? "");
                                        const tlabel = (h.termin_typ ?? "").trim();
                                        return (
                                          <li
                                            key={`${h.abgelegt_am}-${h.termin_start}-${idx}`}
                                            className="text-xs leading-snug text-slate-700 [overflow-wrap:anywhere] last:pb-0"
                                          >
                                            {hz ? (
                                              <>
                                                <span className="font-medium text-slate-800">{hz}</span>
                                                {tlabel ? (
                                                  <span className="text-slate-500"> · {tlabel}</span>
                                                ) : null}
                                              </>
                                            ) : (
                                              <span className="font-medium text-slate-800">{tlabel || "Termin"}</span>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ) : null}
                              </div>
                            </>
                          );
                        })()}

                        {!showBoardGewerkSection && detailAuftrag?.id ? (
                          <div className="border-t border-slate-100 px-3 py-3 sm:px-4">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Termin festlegen
                            </p>
                            <p className="mt-1 text-xs text-slate-500">Zeit, Dauer, speichern.</p>
                            <div className="mt-3 flex gap-2 sm:gap-2">
                              <button
                                type="button"
                                onClick={() => setGewerkTerminTyp(TERMIN_TYP.BESICHTIGUNG)}
                                className={`touch-manipulation flex-1 rounded-xl border px-3 py-3.5 text-sm font-semibold transition-colors min-h-[48px] sm:min-h-0 sm:rounded-lg sm:px-2 sm:py-2 sm:text-xs ${
                                  gewerkTerminTyp === TERMIN_TYP.BESICHTIGUNG
                                    ? "border-blue-500 bg-blue-50 text-blue-900"
                                    : "border-slate-200 bg-white text-slate-600 active:bg-slate-100 sm:hover:bg-slate-50"
                                }`}
                              >
                                Besichtigung
                              </button>
                              <button
                                type="button"
                                onClick={() => setGewerkTerminTyp(TERMIN_TYP.AUSFUEHRUNG)}
                                className={`touch-manipulation flex-1 rounded-xl border px-3 py-3.5 text-sm font-semibold transition-colors min-h-[48px] sm:min-h-0 sm:rounded-lg sm:px-2 sm:py-2 sm:text-xs ${
                                  gewerkTerminTyp === TERMIN_TYP.AUSFUEHRUNG
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                    : "border-slate-200 bg-white text-slate-600 active:bg-slate-100 sm:hover:bg-slate-50"
                                }`}
                              >
                                Ausführung
                              </button>
                            </div>
                            <span className="mt-3 block text-xs font-medium text-slate-600">Termin</span>
                            {terminPickerNarrow ? (
                              <>
                                <button
                                  type="button"
                                  id="gewerk-termin-start"
                                  onClick={() => setGewerkTerminFullscreenOpen(true)}
                                  className="touch-manipulation mt-1 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-base text-slate-900 outline-none transition-colors active:border-slate-300 active:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:min-h-0 sm:px-3 sm:py-3 sm:text-sm sm:hover:border-slate-300 sm:hover:bg-slate-50"
                                >
                                  <span
                                    className={`min-w-0 flex-1 leading-snug ${gewerkTerminStartLocal.trim() ? "font-semibold text-slate-900 sm:font-medium" : "text-slate-500"}`}
                                  >
                                    {gewerkTerminStartLocal.trim() ? (
                                      (() => {
                                        const parsed = new Date(gewerkTerminStartLocal);
                                        return Number.isNaN(parsed.getTime())
                                          ? gewerkTerminStartLocal
                                          : format(parsed, "EEEE, dd.MM.yyyy · HH:mm", { locale: de });
                                      })()
                                    ) : (
                                      "Datum und Uhrzeit wählen"
                                    )}
                                  </span>
                                  <CalendarIconLucide className="h-5 w-5 shrink-0 text-slate-400 sm:h-4 sm:w-4" strokeWidth={2} />
                                </button>
                              </>
                            ) : (
                              <Popover modal={false}>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    id="gewerk-termin-start"
                                    className="touch-manipulation mt-1 flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-base text-slate-900 outline-none transition-colors active:border-slate-300 active:bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:min-h-0 sm:px-3 sm:py-3 sm:text-sm sm:hover:border-slate-300 sm:hover:bg-slate-50"
                                  >
                                    <span
                                      className={`min-w-0 flex-1 leading-snug ${gewerkTerminStartLocal.trim() ? "font-semibold text-slate-900 sm:font-medium" : "text-slate-500"}`}
                                    >
                                      {gewerkTerminStartLocal.trim() ? (
                                        (() => {
                                          const parsed = new Date(gewerkTerminStartLocal);
                                          return Number.isNaN(parsed.getTime())
                                            ? gewerkTerminStartLocal
                                            : format(parsed, "EEEE, dd.MM.yyyy · HH:mm", { locale: de });
                                        })()
                                      ) : (
                                        "Datum und Uhrzeit wählen"
                                      )}
                                    </span>
                                    <CalendarIconLucide className="h-5 w-5 shrink-0 text-slate-400 sm:h-4 sm:w-4" strokeWidth={2} />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  align="start"
                                  side="bottom"
                                  sideOffset={8}
                                  collisionPadding={16}
                                  className="z-[200] touch-manipulation w-[min(calc(100vw-1.5rem),320px)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 pb-4 font-sans shadow-2xl"
                                >
                                  <GewerkTerminPickerPanel
                                    value={gewerkTerminStartLocal}
                                    onChange={setGewerkTerminStartLocal}
                                    minutePillsRef={gewerkTerminMinutePillsRef}
                                    variant="popover"
                                  />
                                </PopoverContent>
                              </Popover>
                            )}
                            <label className="mt-2 block text-xs font-medium text-slate-600" htmlFor="gewerk-termin-dauer">
                              Dauer
                            </label>
                            <select
                              id="gewerk-termin-dauer"
                              value={
                                GEWERK_TERMIN_DAUER_OPTIONEN.some((o) => o.minutes === gewerkTerminDauerMin)
                                  ? gewerkTerminDauerMin
                                  : 60
                              }
                              onChange={(e) => setGewerkTerminDauerMin(Number(e.target.value))}
                              className="touch-manipulation mt-1 w-full min-h-12 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 sm:min-h-0 sm:rounded-lg sm:px-3 sm:py-2.5 sm:text-sm"
                            >
                              {GEWERK_TERMIN_DAUER_OPTIONEN.map((o) => (
                                <option key={o.minutes} value={o.minutes}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              disabled={gewerkTerminSaving}
                              onClick={() => void saveGewerkTermin()}
                              className="touch-manipulation mt-4 min-h-[52px] w-full rounded-xl bg-slate-900 py-3.5 text-base font-semibold text-white transition-opacity active:opacity-90 disabled:opacity-50 sm:min-h-0 sm:py-3 sm:text-sm"
                            >
                              {gewerkTerminSaving ? "Speichern…" : "Termin speichern"}
                            </button>
                          </div>
                        ) : null}

                        {showBilling && (rechnungsempfaengerText || leistungsempfaengerText) && (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-3 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Abrechnung
                              </p>
                              <div className="mt-2 space-y-3">
                                {rechnungsempfaengerText && (
                                  <div className="flex gap-2.5">
                                    <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-medium text-slate-500">Rechnungsempfänger</p>
                                      <p className="text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                        {rechnungsempfaengerText}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {leistungsempfaengerText && (
                                  <div className="flex gap-2.5">
                                    <User className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] font-medium text-slate-500">Leistungsempfänger</p>
                                      <p className="text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                        {leistungsempfaengerText}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {(detailAuftrag.mieter_name || tel || email) && (
                          <>
                            <div className="h-px bg-slate-100" />
                            <div className="px-3 py-2.5 sm:px-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Kontakt vor Ort
                              </p>
                              {detailAuftrag.mieter_name?.trim() && (
                                <p className="mt-0.5 text-sm font-medium text-slate-900 [overflow-wrap:anywhere]">
                                  {detailAuftrag.mieter_name.trim()}
                                </p>
                              )}
                              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
                                {tel && (
                                  <a href={`tel:${tel}`} className="text-emerald-700 underline decoration-emerald-700/30">
                                    {tel}
                                  </a>
                                )}
                                {email && (
                                  <a href={`mailto:${email}`} className="text-slate-700 underline decoration-slate-400/40 [overflow-wrap:anywhere]">
                                    {email}
                                  </a>
                                )}
                              </p>
                            </div>
                          </>
                        )}

                        {showBoardGewerkSection && (
                          <details className="group border-t border-slate-100">
                            <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 outline-none sm:px-4 [&::-webkit-details-marker]:hidden">
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                Gewerk (Board)
                              </span>
                              <span className="min-w-0 flex-1 truncate text-right text-xs text-slate-600">
                                {!boardTicketLookupDone
                                  ? "…"
                                  : effectiveBoardTicketId || auftrag?.id
                                    ? boardGewerke.length > 0
                                      ? boardGewerke.join(", ")
                                      : "Nicht gewählt"
                                    : "—"}
                              </span>
                              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="space-y-2 border-t border-slate-50 px-3 pb-3 pt-2 sm:px-4">
                              {!boardTicketLookupDone ? (
                                <p className="text-xs text-slate-500">Wird geladen…</p>
                              ) : !effectiveBoardTicketId && !auftrag?.id ? (
                                <p className="text-xs leading-relaxed text-slate-600">
                                  Kein Auftrag geladen.
                                </p>
                              ) : (
                                <>
                                  <div className="flex flex-wrap gap-1.5">
                                    {GEWERKE_OPTIONS.map((opt) => {
                                      const checked = boardGewerke.includes(opt.value);
                                      return (
                                        <label
                                          key={opt.value}
                                          className={`inline-flex cursor-pointer items-center rounded-full border px-2.5 py-1 text-xs transition-colors ${
                                            checked
                                              ? "border-slate-900 bg-slate-900 text-white"
                                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={checked}
                                            onChange={() =>
                                              setBoardGewerke((prev) =>
                                                prev.includes(opt.value)
                                                  ? prev.filter((g) => g !== opt.value)
                                                  : [...prev, opt.value]
                                              )
                                            }
                                          />
                                          {opt.label}
                                        </label>
                                      );
                                    })}
                                  </div>
                                  <button
                                    type="button"
                                    disabled={boardGewerkSaving}
                                    onClick={() => void saveBoardGewerk()}
                                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
                                  >
                                    {boardGewerkSaving ? "Speichern…" : "Speichern"}
                                  </button>
                                </>
                              )}
                            </div>
                          </details>
                        )}
                      </div>

                      <section className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-3 py-2 sm:px-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                            Dokumentation
                          </p>
                          <p className="text-xs text-slate-500">Fotos und Notizen</p>
                        </div>
                        <div className="space-y-4 p-3 sm:p-4">
                          <div>
                            <p className="mb-1.5 text-xs font-medium text-slate-600">Fotos</p>
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-3.5 transition-colors hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                disabled={uploadingImage || !detailAuftrag.id}
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (!files?.length || !detailAuftrag.id) return;
                                  let urls = [...(detailAuftrag.image_urls ?? [])];
                                  for (let i = 0; i < files.length; i++) {
                                    const newUrl = await uploadAuftragImage(
                                      detailAuftrag.id,
                                      files[i]!,
                                      urls
                                    );
                                    if (newUrl) urls = [...urls, newUrl];
                                  }
                                  e.target.value = "";
                                }}
                              />
                              <ImagePlus className="h-5 w-5 text-slate-400" />
                              <span className="mt-1.5 text-sm font-medium text-slate-700">
                                {uploadingImage ? "Wird hochgeladen …" : "Fotos hinzufügen"}
                              </span>
                            </label>
                            {Array.isArray(detailAuftrag.image_urls) &&
                              detailAuftrag.image_urls.length > 0 && (
                                <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                  {detailAuftrag.image_urls.map((url, idx) => (
                                    <div
                                      key={`${url}-${idx}`}
                                      className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => setLightboxImage(url)}
                                        className="h-full w-full"
                                      >
                                        <img src={url} alt="" className="h-full w-full object-cover" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          void deleteAuftragImage(
                                            detailAuftrag.id,
                                            url,
                                            detailAuftrag.image_urls ?? []
                                          )
                                        }
                                        disabled={deletingImageUrl === url || uploadingImage}
                                        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 disabled:opacity-50"
                                        aria-label="Foto löschen"
                                        title="Foto löschen"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                          </div>
                          <div>
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                              <p className="text-xs font-medium text-slate-600">Kommentare</p>
                              <span className="text-[11px] text-slate-400">{detailKommentare.length}</span>
                            </div>
                            <div className="max-h-44 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                              {detailKommentare.length === 0 ? (
                                <p className="py-3 text-center text-xs text-slate-400">Noch keine Kommentare.</p>
                              ) : (
                                detailKommentare.map((k) => (
                                  <div key={k.id} className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
                                    <div className="mb-1 flex items-center justify-between gap-2">
                                      <p className="text-[11px] font-medium text-slate-500">
                                        {k.author} · {new Date(k.timestamp).toLocaleString("de-DE")}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => void deleteKommentar(k.id)}
                                        disabled={kommentarSaving}
                                        className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                                        aria-label="Kommentar löschen"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 [overflow-wrap:anywhere]">
                                      {k.text}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>
                            {/* flex-col auf schmalen Viewports: vermeidet Verschieben des Senden-Buttons bei Fokus/Tastatur (w-full + Neben-Button in einer Zeile bricht oft). */}
                            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-2">
                              <Textarea
                                value={newKommentarText}
                                onChange={(e) => setNewKommentarText(e.target.value)}
                                placeholder="Kommentar schreiben"
                                rows={2}
                                className="min-h-[72px] w-full min-w-0 flex-1 resize-none border-slate-200 text-base leading-relaxed placeholder:text-slate-400 sm:text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    void addKommentar();
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => void addKommentar()}
                                disabled={!newKommentarText.trim() || kommentarSaving || !detailAuftrag.id}
                                className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50 sm:h-10 sm:w-auto sm:px-3"
                                aria-label="Kommentar senden"
                              >
                                <Send className="h-4 w-4 shrink-0" />
                                <span className="sm:hidden">Senden</span>
                              </button>
                            </div>
                          </div>
                          <div className="h-px bg-slate-100" />
                          <div>
                            <p className="mb-2 text-xs font-medium text-slate-600">Rechnung hinzufügen</p>
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-3.5 transition-colors hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                              <input
                                type="file"
                                accept="application/pdf,.pdf,image/*,.heic,.heif"
                                multiple
                                className="hidden"
                                disabled={uploadingDoc || !detailAuftrag.id}
                                onChange={async (e) => {
                                  const files = e.target.files;
                                  if (!files?.length || !detailAuftrag.id) return;
                                  let urls = [...(detailAuftrag.angebot_rechnung_urls ?? [])];
                                  for (let i = 0; i < files.length; i++) {
                                    const newUrl = await uploadAuftragDoc(
                                      detailAuftrag.id,
                                      files[i]!,
                                      urls
                                    );
                                    if (newUrl) urls = [...urls, newUrl];
                                  }
                                  e.target.value = "";
                                }}
                              />
                              <Upload className="h-5 w-5 text-slate-400" />
                              <span className="mt-1.5 text-sm font-medium text-slate-700">
                                {uploadingDoc ? "Wird hochgeladen …" : "Dateien auswählen"}
                              </span>
                            </label>
                            {Array.isArray(detailAuftrag.angebot_rechnung_urls) &&
                              detailAuftrag.angebot_rechnung_urls.length > 0 && (
                                <div className="mt-2 space-y-1.5">
                                  {detailAuftrag.angebot_rechnung_urls.map((url, idx) => {
                                    const isImg = isProbablyImageAttachmentUrl(url);
                                    return (
                                      <div
                                        key={`${url}-${idx}`}
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-2 pr-1.5 transition-colors hover:bg-slate-100"
                                      >
                                        {isImg ? (
                                          <button
                                            type="button"
                                            onClick={() => setLightboxImage(url)}
                                            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-200 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-slate-400"
                                          >
                                            <img
                                              src={url}
                                              alt=""
                                              className="h-full w-full object-cover"
                                            />
                                          </button>
                                        ) : (
                                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white">
                                            <FileText className="h-6 w-6 text-slate-500" />
                                          </span>
                                        )}
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="min-w-0 flex-1 py-0.5 text-sm font-medium text-slate-800 no-underline hover:underline"
                                        >
                                          Datei {idx + 1}
                                          <span className="mt-0.5 block text-[11px] font-normal text-slate-500 no-underline">
                                            {isImg ? "Bild · tippen für Vorschau" : "PDF / Dokument"}
                                          </span>
                                        </a>
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
                                          aria-label={`Datei ${idx + 1} öffnen`}
                                        >
                                          <Paperclip className="h-4 w-4" />
                                        </a>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                          {!showBoardGewerkSection && detailAuftrag?.id ? (
                            <div className="border-t border-slate-200 pt-4">
                              {(() => {
                                const st = (detailAuftrag.board_status ?? "").trim();
                                if (st === STATUS.ABRECHNUNG) {
                                  return (
                                    <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 px-3 py-3 text-sm text-emerald-900">
                                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                                      <p className="font-medium leading-snug">
                                        Auftrag erledigt. Er erscheint beim Büro unter „Erledigt & Abrechnung“.
                                      </p>
                                    </div>
                                  );
                                }
                                if (st === STATUS.ARCHIV) {
                                  return (
                                    <p className="text-center text-sm text-slate-500">Dieser Auftrag ist archiviert.</p>
                                  );
                                }
                                return (
                                  <>
                                    <button
                                      type="button"
                                      disabled={gewerkErledigtSaving || gewerkTerminSaving}
                                      onClick={() => setGewerkErledigtOpen((o) => !o)}
                                      className="touch-manipulation flex w-full min-h-[52px] items-center justify-center rounded-xl border-2 border-emerald-600 bg-emerald-600 px-4 py-3.5 text-base font-semibold text-white shadow-sm transition-colors active:bg-emerald-700 disabled:opacity-50 sm:min-h-0 sm:py-3 sm:text-sm"
                                    >
                                      {gewerkErledigtOpen ? "Schließen" : "Auftrag erledigt!"}
                                    </button>
                                    {gewerkErledigtOpen ? (
                                      <div className="mt-3 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
                                        <p className="text-sm font-semibold text-slate-800">Voraussetzungen</p>
                                        <p className="text-xs text-slate-500">
                                          Es wird geprüft, ob bereits etwas unter „Fotos“ und unter „Rechnung hinzufügen“
                                          gespeichert ist.
                                        </p>
                                        {(() => {
                                          const u = gewerkErledigtUploadStatus(detailAuftrag);
                                          return (
                                            <ul className="space-y-3">
                                              <li className="flex gap-3 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5">
                                                {u.hasFotos ? (
                                                  <CheckCircle2
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                  />
                                                ) : (
                                                  <XCircle
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                  />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                  <p className="text-sm font-medium text-slate-800">
                                                    Fotos, Doku hochgeladen
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-slate-500">
                                                    {u.hasFotos
                                                      ? "Mindestens ein Foto ist gespeichert."
                                                      : "Noch kein Foto – bitte oben unter „Fotos“ hochladen."}
                                                  </p>
                                                </div>
                                              </li>
                                              <li className="flex gap-3 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5">
                                                {u.hasRechnungDatei ? (
                                                  <CheckCircle2
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                  />
                                                ) : (
                                                  <XCircle
                                                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                  />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                  <p className="text-sm font-medium text-slate-800">
                                                    Rechnung hochgeladen
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-slate-500">
                                                    {u.hasRechnungDatei
                                                      ? "Mindestens eine Datei ist unter „Rechnung hinzufügen“ gespeichert."
                                                      : "Noch keine Datei – bitte Rechnung oder PDF oben hochladen."}
                                                  </p>
                                                </div>
                                              </li>
                                            </ul>
                                          );
                                        })()}
                                        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap">
                                          <button
                                            type="button"
                                            disabled={
                                              gewerkErledigtSaving ||
                                              !gewerkErledigtUploadStatus(detailAuftrag).canComplete
                                            }
                                            onClick={() => void markGewerkAuftragErledigt()}
                                            className="touch-manipulation min-h-[48px] flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors active:bg-slate-800 disabled:opacity-40 sm:min-h-10 sm:py-2"
                                          >
                                            {gewerkErledigtSaving ? "Wird gespeichert…" : "Auftrag abschließen"}
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })()}
                            </div>
                          ) : null}
                        </div>
                      </section>
                    </div>
                  </div>
                </>
              );
            })()}
          {mergedAuftrag && terminPickerNarrow && gewerkTerminFullscreenOpen ? (
            <div
              className="absolute inset-0 z-[300] flex flex-col bg-white"
              role="dialog"
              aria-modal="true"
              aria-labelledby="gewerk-termin-full-title"
            >
              <header className="flex shrink-0 items-center gap-2 border-b border-slate-200 px-2 py-2 pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] pt-[max(0.5rem,env(safe-area-inset-top))]">
                <button
                  type="button"
                  aria-label="Schließen"
                  onClick={() => setGewerkTerminFullscreenOpen(false)}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                  }}
                  className="relative z-[1] touch-manipulation flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-700 active:bg-slate-100"
                >
                  <X className="h-6 w-6" strokeWidth={2} />
                </button>
                <h2
                  id="gewerk-termin-full-title"
                  className="pointer-events-none min-w-0 flex-1 text-center text-lg font-semibold text-slate-900"
                >
                  Termin wählen
                </h2>
                <span className="h-11 w-11 shrink-0" aria-hidden />
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-4 pt-2 [-webkit-overflow-scrolling:touch]">
                <GewerkTerminPickerPanel
                  value={gewerkTerminStartLocal}
                  onChange={setGewerkTerminStartLocal}
                  minutePillsRef={gewerkTerminMinutePillsRef}
                  variant="fullscreen"
                />
              </div>
              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  className="touch-manipulation min-h-[52px] w-full rounded-xl bg-slate-900 py-3.5 text-base font-semibold text-white active:opacity-90"
                  onClick={() => setGewerkTerminFullscreenOpen(false)}
                >
                  Fertig
                </button>
              </div>
            </div>
          ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {lightboxImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Bild vergrößert"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-800 shadow-lg transition hover:bg-white"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="relative max-h-[90vh] max-w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImage}
                alt="Vergrößerte Ansicht"
                className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-xl"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
