"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Phone, Paintbrush, SprayCan, Building, Zap, Droplets, Hourglass, CheckCircle, X, ChevronLeft, ChevronRight, GripVertical, Trash2, MessageSquare, Send, Sun, Moon, CalendarIcon, Bell, Plus, FileText, Settings, LayoutDashboard, Users, LogOut, Pencil, Save, Upload, Paperclip, Search, AlertTriangle } from "lucide-react";
import { format, add, setHours, setMinutes, startOfWeek as startOfWeekDf } from "date-fns";
import { de } from "date-fns/locale";
import { DndContext, DragOverlay, useDraggable, useDroppable, closestCorners, pointerWithin, rectIntersection, MeasuringStrategy, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent, type DragOverEvent, type CollisionDetection } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";
import { authFetch } from "@/lib/supabase/auth-fetch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAdminUser } from "../AdminUserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Logo } from "@/components/Logo";
import { AuftragHandwerkerDetailDialog } from "@/components/admin/AuftragHandwerkerDetailDialog";
import { GewerkAuftraegeDashboardList } from "@/components/admin/GewerkAuftraegeDashboardList";
import { AuftragEingangKommendeRowView, AuftragEingangVolleKarteView } from "@/components/admin/eingang-auftrag-cards";
import {
  TicketEingangKommendeRowView,
  TicketEingangVolleKarteView,
  ticketEingangTerminBlock,
} from "@/components/admin/eingang-ticket-cards";
import { isKommenderOderLaufenderTermin } from "@/lib/auftraege/gewerk-auftraege-split";
import { normalizeAuftragRow } from "@/lib/auftraege/billing-recipient-fields";
import { kanbanPositionSortKey } from "@/lib/auftraege/kanban-position-sort-key";
import { primaryAuftragAnhangUrl } from "@/lib/auftraege/primary-auftrag-anhang-url";
import { filterAuftraegeRowsByRole } from "@/lib/auftraege/filter-auftraege-by-role";
import { roleToGewerk } from "@/lib/auftraege/role-to-gewerk";
import type { HandwerkerAuftrag } from "@/src/types/handwerker-auftrag";
import { BUSINESS_COLUMNS, DEFAULT_COMPANY_ID, STATUS, TERMIN_TYP } from "@/src/config/businessConfig";
import { GEWERKE_OPTIONS } from "@/src/config/gewerkeOptions";

const supabase = createClient();

const BUCKET_TICKET_IMAGES = "ticket-images";

/** PDF & Co. für SPM-Auftrags-Anhänge (Bilder laufen separat über Komprimierung → .jpg). */
function attachmentFileExt(file: File): string {
  if (file.type.includes("pdf")) return "pdf";
  const m = /\.([a-z0-9]{1,8})$/i.exec(file.name.trim());
  if (m && /^[a-z0-9]+$/i.test(m[1]!)) {
    const e = m[1]!.toLowerCase();
    return e === "jpeg" ? "jpg" : e;
  }
  return "bin";
}

const MINUTE_15_OPTIONS = ["00", "15", "30", "45"] as const;

type HistorieEintrag = { date: string; text: string };
type Kommentar = { id: string; text: string; author: string; timestamp: string };
type TicketHistoryRow = {
  id?: string;
  ticket_id?: string;
  /** Bestätigtes Schema (Bild 12). */
  aktion?: string | null;
  details?: { von?: string | null; bis?: string | null } | Record<string, unknown> | null;
  erstellt_at?: string | null;
};

type Ticket = {
  id: string;
  ticket_display_id: string | null;
  is_partner: boolean | null;
  partner_name: string | null;
  kunde_name: string | null;
  kontakt_email: string | null;
  kontakt_telefon: string | null;
  objekt_adresse: string | null;
  beschreibung: string | null;
  /** Mehrere Gewerke (DB: text[]). */
  gewerk: string[] | null;
  status: string | null;
  ablehnungs_grund: string | null;
  abgelehnt_am: string | null;
  interne_notizen: string | null;
  kommentare: Kommentar[] | null;
  assigned_to: string | null;
  image_urls: string[] | null;
  termin_start: string | null;
  termin_ende: string | null;
  /** Termin-Typ: Besichtigung oder Ausführung (für Kalender-Darstellung). */
  termin_typ: string | null;
  historie: HistorieEintrag[] | null;
  /** Positionswert für Trello-Style-Reihenfolge innerhalb einer Spalte. */
  position: number | null;
  created_at: string;
  additional_data?: { auftrag_id?: string; auftragsnummer?: string } | null;
};

/** Anzeige-Nummer: für Aufträge aus auftraege → auftragsnummer, sonst ticket_display_id. */
function getTicketOrAuftragNumber(t: Ticket | null): string {
  if (!t) return "–";
  const nr = (t.additional_data as { auftragsnummer?: string } | undefined)?.auftragsnummer;
  if (nr?.trim()) return nr.trim();
  return (t.ticket_display_id ?? "").trim() || "–";
}

function normalizeBoardSearchNeedle(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

function boardSearchHaystack(parts: (string | null | undefined)[]): string {
  return parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function ticketMatchesBoardSearch(t: Ticket, needle: string): boolean {
  if (!needle) return true;
  const h = boardSearchHaystack([
    t.id,
    t.ticket_display_id,
    t.kunde_name,
    t.partner_name,
    t.kontakt_email,
    t.kontakt_telefon,
    t.objekt_adresse,
    t.beschreibung,
    getTicketOrAuftragNumber(t),
    t.additional_data?.auftrag_id,
    t.additional_data?.auftragsnummer,
    ...(Array.isArray(t.gewerk) ? t.gewerk : []),
    t.status,
    t.assigned_to,
    t.interne_notizen,
  ]);
  return h.includes(needle);
}

function auftragMatchesBoardSearch(a: HandwerkerAuftrag, needle: string): boolean {
  if (!needle) return true;
  const h = boardSearchHaystack([
    a.id,
    a.auftragsnummer,
    a.mieter_name,
    a.mieter_email,
    a.mieter_telefon,
    a.adresse_strasse,
    a.adresse_ort,
    a.aufgabe,
    a.rechnungsempfaenger,
    a.leistungsempfaenger,
    a.auftragstyp,
    a.board_status,
    a.status,
    ...(Array.isArray(a.gewerk) ? a.gewerk : []),
    typeof a.handwerker_notizen === "string" ? a.handwerker_notizen : null,
  ]);
  return h.includes(needle);
}

function filterTicketsByBoardSearch(list: Ticket[], needle: string): Ticket[] {
  if (!needle) return list;
  return list.filter((t) => ticketMatchesBoardSearch(t, needle));
}

function filterAuftraegeByBoardSearch(list: HandwerkerAuftrag[], needle: string): HandwerkerAuftrag[] {
  if (!needle) return list;
  return list.filter((a) => auftragMatchesBoardSearch(a, needle));
}

/**
 * Ermittelt per DOM, welche Spalte unter dem Cursor liegt.
 * Prüft zuerst exakte Treffer, dann ob der Cursor im Grid-Bereich (Spalten 3-6) ist
 * und wählt die nächstgelegene Spalte (deckt Lücken zwischen Spalten ab).
 */
const KANBAN_DROPPABLE_IDS = BUSINESS_COLUMNS.filter((c) => c.kind === "kanban").map(
  (c) => c.droppableId
);
const GRID_KANBAN_IDS = BUSINESS_COLUMNS.filter(
  (c) => c.kind === "kanban" && c.id !== "incoming"
).map((c) => c.droppableId);

const COL_SELECTORS = [
  ...KANBAN_DROPPABLE_IDS,
  "column-eingang-mobile",
  "column-1-mobile-list",
] as const;
const GRID_COL_SELECTORS = GRID_KANBAN_IDS as string[];

function detectColumnAtPoint(px: number, py: number): string | null {
  // 1. Exakter Treffer: Cursor liegt direkt auf einer Spalte
  for (const colId of COL_SELECTORS) {
    const el = document.querySelector(`[data-col-droppable="${colId}"]`) as HTMLElement | null;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
      return colId;
    }
  }

  // 2. Cursor ist in einer Lücke zwischen Spalten 3-6 (gap-4 Bereich)?
  //    Prüfe ob der Cursor vertikal im Grid-Bereich liegt, dann finde die nächste Spalte horizontal.
  const gridRects: { colId: string; rect: DOMRect }[] = [];
  let gridTop = Infinity, gridBottom = -Infinity;
  for (const colId of GRID_COL_SELECTORS) {
    const el = document.querySelector(`[data-col-droppable="${colId}"]`) as HTMLElement | null;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    gridRects.push({ colId, rect: r });
    gridTop = Math.min(gridTop, r.top);
    gridBottom = Math.max(gridBottom, r.bottom);
  }

  if (gridRects.length > 0 && py >= gridTop && py <= gridBottom) {
    // Finde die Spalte mit dem kleinsten horizontalen Abstand
    let closest: string | null = null;
    let minDist = Infinity;
    for (const { colId, rect } of gridRects) {
      const centerX = rect.left + rect.width / 2;
      const dist = Math.abs(px - centerX);
      if (dist < minDist) {
        minDist = dist;
        closest = colId;
      }
    }
    return closest;
  }

  // 3. Auch für Spalte 1 + Kalender-Bereich: Prüfe ob Cursor vertikal im oberen Bereich ist
  const col1El = document.querySelector('[data-col-droppable="column-1"]') as HTMLElement | null;
  if (col1El) {
    const r = col1El.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && py >= r.top && py <= r.bottom && px < r.right + 20) {
      return "column-1";
    }
  }

  return null;
}

/**
 * Kanban-Collision-Detection: Nutzt detectColumnAtPoint für robuste Spalten-Erkennung.
 */
const kanbanCollisionDetection: CollisionDetection = (args) => {
  const { pointerCoordinates, droppableRects, droppableContainers } = args;
  if (!pointerCoordinates) return closestCorners(args);

  const targetColId = detectColumnAtPoint(pointerCoordinates.x, pointerCoordinates.y);

  // Cursor ist IN einer Spalte (oder im Grid-Bereich zwischen Spalten)
  if (targetColId) {
    // Suche Tickets innerhalb dieser Spalte (via @dnd-kit rects)
    const colEl = document.querySelector(`[data-col-droppable="${targetColId}"]`);
    const colDomRect = colEl?.getBoundingClientRect();

    if (colDomRect) {
      const ticketsInCol = droppableContainers.filter((c) => {
        const cid = String(c.id);
        if (!cid.startsWith("ticket-") && !cid.startsWith("auftrag-")) return false;
        const r = droppableRects.get(c.id);
        if (!r || r.width === 0) return false;
        const cx = r.left + r.width / 2;
        return cx >= colDomRect.left && cx <= colDomRect.right;
      });

      if (ticketsInCol.length > 0) {
        const ticketHits = closestCorners({ ...args, droppableContainers: ticketsInCol });
        if (ticketHits.length > 0) return ticketHits;
      }
    }

    // Leere Spalte oder kein Ticket → die Spalte selbst
    const colContainer = droppableContainers.find((c) => String(c.id) === targetColId);
    if (colContainer) {
      return [{ id: colContainer.id, data: { droppableContainer: colContainer, value: 0 } }];
    }

    // Spalte per DOM gefunden, aber kein @dnd-kit Container → trotzdem NICHT zum Kalender fallen
    return [];
  }

  // Cursor NICHT in einer Spalte → Kalender-Slots: Slot exakt unter dem Cursor (nicht nach „nächstem“ zum gezogenen Element)
  const slotContainers = droppableContainers.filter((c) => String(c.id).startsWith("slot-"));
  if (slotContainers.length > 0 && pointerCoordinates) {
    const px = pointerCoordinates.x;
    const py = pointerCoordinates.y;
    for (const slot of slotContainers) {
      const r = droppableRects.get(slot.id);
      if (!r || r.width === 0 || r.height === 0) continue;
      if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
        return [{ id: slot.id, data: { droppableContainer: slot, value: 0 } }];
      }
    }
    // Cursor in Kalender-Bereich aber zwischen Zellen: nächsten Slot nach Abstand zum Cursor-Mittelpunkt
    let closest: { id: string; container: (typeof slotContainers)[0]; dist: number } | null = null;
    for (const slot of slotContainers) {
      const r = droppableRects.get(slot.id);
      if (!r || r.width === 0 || r.height === 0) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = (px - cx) ** 2 + (py - cy) ** 2;
      if (closest === null || dist < closest.dist) closest = { id: String(slot.id), container: slot, dist };
    }
    if (closest) return [{ id: closest.id, data: { droppableContainer: closest.container, value: 0 } }];
  }

  // Fallback
  return closestCorners(args);
};

/** Measuring-Konfiguration: Droppable-Rects werden IMMER neu gemessen (nicht nur beim Drag-Start). */
const MEASURING_CONFIG = {
  droppable: { strategy: MeasuringStrategy.Always },
};

/** Droppable-IDs für die 6 Spalten (column-1 … column-6) aus der Business-Config. */
const COLUMN_IDS = BUSINESS_COLUMNS.map((c) => c.droppableId) as string[];

/** Kalender: 07:00–20:00, ganze Stunden. */
const CALENDAR_HOUR_START = 7;
const CALENDAR_HOUR_END = 20;
const SLOT_MINUTES = 60;
const SLOTS_PER_HOUR = 60 / SLOT_MINUTES;
const TOTAL_SLOTS = (CALENDAR_HOUR_END - CALENDAR_HOUR_START) * SLOTS_PER_HOUR;

type WeekEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: Ticket | HandwerkerAuftrag;
  resourceKind: "ticket" | "auftrag";
};

function SortableTicketCard({
  ticket,
  children,
  ...articleProps
}: {
  ticket: Ticket;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"article">) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: `ticket-${ticket.id}`,
    data: { ticketId: ticket.id },
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <article
      ref={setNodeRef}
      style={style}
      data-ticket-id={ticket.id}
      data-board-item-id={`ticket-${ticket.id}`}
      {...articleProps}
      className={`${articleProps.className ?? ""} ${
        isOver ? "ring-2 ring-blue-500/60 ring-offset-2 ring-offset-slate-900" : ""
      }`}
    >
      <div className="flex gap-1 items-stretch lg:items-start">
        <span
          className="hidden shrink-0 cursor-grab touch-none select-none items-center justify-center rounded-lg text-slate-500 active:cursor-grabbing active:bg-slate-500/15 lg:inline-flex lg:min-h-0 lg:min-w-0 lg:p-1 lg:active:bg-transparent dark:active:bg-slate-400/10 dark:lg:active:bg-transparent"
          aria-label="Ticket verschieben"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1 self-center lg:self-start">{children}</div>
      </div>
    </article>
  );
}

function SortableAuftragCard({
  auftrag,
  children,
  ...articleProps
}: {
  auftrag: HandwerkerAuftrag;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"article">) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: `auftrag-${auftrag.id}`,
    data: { auftragId: auftrag.id },
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };
  return (
    <article
      ref={setNodeRef}
      style={style}
      data-board-item-id={`auftrag-${auftrag.id}`}
      {...articleProps}
      className={`${articleProps.className ?? ""} ${
        isOver ? "ring-2 ring-blue-500/60 ring-offset-2 ring-offset-slate-900" : ""
      }`}
    >
      <div className="flex items-stretch gap-1 lg:items-start">
        <span
          className="hidden shrink-0 cursor-grab touch-none select-none items-center justify-center rounded-lg text-slate-500 active:cursor-grabbing active:bg-slate-500/15 lg:inline-flex lg:min-h-0 lg:min-w-0 lg:p-1 lg:active:bg-transparent dark:active:bg-slate-400/10 dark:lg:active:bg-transparent"
          aria-label="Auftrag verschieben"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1 self-center lg:self-start">{children}</div>
      </div>
    </article>
  );
}

function ImageLightbox({ src, isOpen, onClose }: { src: string; isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "unset";
    };
  }, [isOpen]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Bild vergrößert"
      onClick={() => onClose()}
    >
      <div
        className="relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-800 shadow-lg transition hover:bg-white"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
        <img
          src={src}
          alt="Vergrößerte Ansicht"
          className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-xl"
        />
      </div>
    </div>,
    document.body
  );
}

function DroppableSlot({
  dayIndex,
  slotIndex,
  isHighlight,
  style,
  children,
  theme,
  compact,
}: {
  dayIndex: number;
  slotIndex: number;
  isHighlight: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme: "light" | "dark";
  /** Mobil: Zeilenhöhe kommt vom Grid, keine feste min-h-48 (vermeidet Zerrungen). */
  compact?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${dayIndex}-${slotIndex}`,
  });
  const isLight = theme === "light";
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`box-border border-b border-r ${
        compact ? "h-full min-h-0" : "min-h-[48px]"
      } ${
        isLight ? "border-slate-200" : "border-slate-800"
      } ${isOver || isHighlight ? (isLight ? "bg-blue-100" : "bg-blue-500/20") : isLight ? "bg-white" : "bg-slate-900/50"}`}
    >
      {children}
    </div>
  );
}

function DraggableEventPill({
  ev,
  style,
  className,
  onOpenDetail,
  compact,
  parallelInSlot = 1,
}: {
  ev: WeekEvent;
  style: React.CSSProperties;
  className: string;
  onOpenDetail: () => void;
  /** Mobil: etwas größere Schrift, bessere Zeilenhöhen. */
  compact?: boolean;
  /** Termine mit gleichem Start (Tag+Slot); mobil: eine Zeile ohne Kundenzeile, damit Spalten lesbar bleiben. */
  parallelInSlot?: number;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `event-${ev.id}`,
    data: {
      ticketId: ev.resourceKind === "ticket" ? ev.id : undefined,
      auftragId:
        ev.resourceKind === "auftrag" ? ev.id.replace(/^auftrag-/, "") : undefined,
    },
  });
  const tightParallel = !!compact && parallelInSlot > 1;
  const subtitle =
    ev.resourceKind === "ticket"
      ? getTicketDisplayName(ev.resource as Ticket)
      : getAuftragCardTitle(ev.resource as HandwerkerAuftrag);
  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenDetail();
      }}
      className={`cursor-grab active:cursor-grabbing touch-manipulation select-none flex flex-col overflow-visible sm:touch-none ${className} ${
        isDragging ? "opacity-0" : ""
      }`}
      style={style}
      title={`${ev.title} – ziehen zum Verschieben, klicken zum Bearbeiten`}
      {...listeners}
      {...attributes}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-visible text-left",
          compact ? "gap-0.5 px-1 py-0.5" : "gap-0.5 px-1.5 py-1",
          tightParallel && "justify-center py-0.5"
        )}
      >
        <div
          className={cn(
            "flex min-w-0 gap-1",
            tightParallel ? "flex-1 items-center justify-center" : "flex-1 items-center"
          )}
        >
          {(() => {
            const gewerkArr =
              ev.resourceKind === "ticket"
                ? normalizeGewerke((ev.resource as Ticket)?.gewerk ?? null)
                : normalizeGewerke((ev.resource as HandwerkerAuftrag)?.gewerk ?? null);
            const firstGewerk = gewerkArr[0] ?? null;
            const Icon = getGewerkIcon(firstGewerk);
            return Icon ? (
              <Icon
                className={`shrink-0 ${tightParallel && parallelInSlot > 2 ? "h-3 w-3" : compact ? "h-3.5 w-3.5" : "h-3 w-3"}`}
                strokeWidth={2}
              />
            ) : null;
          })()}
          <span
            className={`min-w-0 truncate font-medium ${
              tightParallel && parallelInSlot > 2 ? "text-[10px]" : compact ? "text-xs" : "text-[11px]"
            }`}
          >
            {ev.resourceKind === "ticket"
              ? getTicketOrAuftragNumber(ev.resource as Ticket) !== "–"
                ? getTicketOrAuftragNumber(ev.resource as Ticket)
                : ev.id.slice(0, 8)
              : (ev.resource as HandwerkerAuftrag)?.auftragsnummer?.trim() || ev.id.slice(0, 8)}
          </span>
          {(ev.resourceKind === "auftrag" || !!(ev.resource as Ticket | undefined)?.additional_data?.auftrag_id) && (
            <span
              className={`shrink-0 rounded px-1 py-0.5 font-medium bg-amber-500/30 text-amber-200 ${
                compact ? "text-[10px]" : "text-[9px]"
              } ${tightParallel && parallelInSlot > 2 ? "px-0.5 text-[9px]" : ""}`}
            >
              SPM
            </span>
          )}
        </div>
        {!tightParallel && (
          <span
            className={`min-w-0 truncate leading-tight opacity-90 ${compact ? "text-[11px]" : "text-[10px]"}`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </button>
  );
}

const REJECTION_REASONS = [
  { value: "no_capacity", label: "Aktuell keine freien Kapazitäten" },
  { value: "out_of_area", label: "Außerhalb unseres Einzugsgebiets" },
  { value: "gewerk_not_served", label: "Gewerk wird aktuell nicht bedient" },
  { value: "other", label: "Sonstiger Grund" },
] as const;

/** Mitarbeiter für Zuweisung (assigned_to). Später aus DB oder Konfiguration laden. */
const ASSIGNEE_OPTIONS = [
  { value: "", label: "Nicht zugewiesen" },
  { value: "max.mustermann", label: "Max Mustermann" },
  { value: "anna.schmidt", label: "Anna Schmidt" },
  { value: "thomas.weber", label: "Thomas Weber" },
] as const;

/** Platzhalter: spätere E-Mail-Logik. */
function sendRejectionEmail(_customerEmail: string, _reason: string): void {
  /* bewusst leer bis Versand angebunden */
}

/** Hauptanschrift für Karte: kunde_name, falls leer dann partner_name (Sicherheits-Check bei Partnern). */
function getTicketDisplayName(t: Ticket): string {
  const k = (t.kunde_name ?? "").trim();
  const p = (t.partner_name ?? "").trim();
  return k || p || "Unbekannter Kunde";
}

/** Name der aktuellen Spalte für ein Ticket (für Modal-Header) basierend auf Business-Config. */
function getColumnNameForTicket(t: Ticket): string {
  const s = (t.status ?? "").trim();
  const hasTermin = (t.termin_start ?? "").trim() !== "";

  const incoming = BUSINESS_COLUMNS.find((c) => c.id === "incoming");
  const calendar = BUSINESS_COLUMNS.find((c) => c.id === "calendar");
  const nachbereitung = BUSINESS_COLUMNS.find((c) => c.id === "nachbereitung");
  const abrechnung = BUSINESS_COLUMNS.find((c) => c.id === "abrechnung");
  const abgelehnt = BUSINESS_COLUMNS.find((c) => c.id === "abgelehnt");
  const archiv = BUSINESS_COLUMNS.find((c) => c.id === "archiv");

  if (incoming && !hasTermin && (s === incoming.status || s === "Ticket")) return incoming.title;
  if (calendar && hasTermin && (s === calendar.status || s === "Ticket")) return calendar.title;
  if (nachbereitung && s === nachbereitung.status) return nachbereitung.title;
  if (abrechnung && s === abrechnung.status) return abrechnung.title;
  if (abgelehnt && s === abgelehnt.status) return abgelehnt.title;
  if (archiv && s === archiv.status) return archiv.title;
  return "Unbekannte Spalte";
}

/** Alter des Tickets in Stunden (bezogen auf jetzt). */
function getAgeInHours(createdAt: string | null): number {
  if (!createdAt) return 0;
  const created = new Date(createdAt).getTime();
  return (Date.now() - created) / (1000 * 60 * 60);
}

/** Rundet Datum+Zeit (YYYY-MM-DDTHH:mm) auf 15-Minuten-Takt. */
function roundDateTimeTo15Min(localStr: string): string {
  if (!localStr || localStr.length < 16) return localStr;
  const d = new Date(localStr);
  if (isNaN(d.getTime())) return localStr;
  const ms = d.getTime();
  const rounded = Math.round(ms / (15 * 60 * 1000)) * (15 * 60 * 1000);
  const r = new Date(rounded);
  const y = r.getFullYear();
  const m = String(r.getMonth() + 1).padStart(2, "0");
  const day = String(r.getDate()).padStart(2, "0");
  const h = String(r.getHours()).padStart(2, "0");
  const min = String(r.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}`;
}

/** Dringlichkeit nach Alter: nur bei status === 'Anfrage'. 0–12h Standard, 12–24h orange, 24h+ rot. */
function getUrgencyLevel(t: Ticket): "neutral" | "12h" | "24h" {
  if ((t.status ?? "").trim() !== STATUS.ANFRAGE) return "neutral";
  const hours = getAgeInHours(t.created_at);
  if (hours >= 24) return "24h";
  if (hours >= 12) return "12h";
  return "neutral";
}

/** Formatiertes Datum für Anzeige: "09. Feb, 17:18". */
function formatTicketDate(createdAt: string | null): string {
  if (!createdAt) return "–";
  const d = new Date(createdAt);
  const datePart = d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
  const timePart = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${datePart}, ${timePart}`;
}

/** Kurzes Datum+Zeit für Timeline, z. B. "17.02, 10:30". */
function formatTimelineDateTime(iso: string | null | undefined): string {
  if (!iso) return "–";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "–";
  const datePart = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  const timePart = d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${datePart}, ${timePart}`;
}

/** true, wenn termin_ende in der Vergangenheit liegt. */
function isTerminEndeInPast(ticket: Ticket): boolean {
  const end = (ticket.termin_ende ?? "").trim();
  if (!end) return false;
  const d = new Date(end);
  if (isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

/** true, wenn now() zwischen termin_start und termin_ende liegt. */
function isTerminOngoing(ticket: Ticket): boolean {
  const start = (ticket.termin_start ?? "").trim();
  const end = (ticket.termin_ende ?? "").trim();
  if (!start || !end) return false;
  const ds = new Date(start);
  const de = new Date(end);
  if (isNaN(ds.getTime()) || isNaN(de.getTime())) return false;
  const now = Date.now();
  return ds.getTime() <= now && now <= de.getTime();
}

/**
 * Fällige Kalkulation:
 * Besichtigung ist erst "abgeschlossen", wenn termin_ende überschritten ist.
 * Solange now() zwischen start und ende liegt, bleibt es im Kalender/Besichtigungs-Modus.
 */
function isKalkulationFaellig(ticket: Ticket): boolean {
  return (ticket.status ?? "").trim() === STATUS.BESICHTIGUNG && isTerminEndeInPast(ticket);
}

/** Kartentyp für visuelle Hierarchie: PARTNER | AUFTRAG (fix aus auftraege) | ANFRAGE | TICKET. */
function getCardType(t: Ticket): "PARTNER" | "AUFTRAG" | "ANFRAGE" | "TICKET" {
  if (!!t.is_partner) return "PARTNER";
  if (t.additional_data?.auftrag_id) return "AUFTRAG";
  if ((t.status ?? "").trim() === STATUS.ANFRAGE) return "ANFRAGE";
  return "TICKET";
}

/** Lucide-Icon je nach Gewerk: Maler/Boden, Reinigung, Facility, Elektro, Sanitär. */
function getGewerkIcon(gewerk: string | null) {
  const g = (gewerk ?? "").trim().toLowerCase();
  if (g === "ausbau") return Paintbrush;
  if (g === "reinigung") return SprayCan;
  if (g === "facility") return Building;
  if (g === "elektro") return Zap;
  if (g === "sanitär" || g === "sanitaer") return Droplets;
  return null;
}

/** Tailwind-Klassen für Gewerk-Badge: Elektro (Gelb), Sanitär (Blau), Ausbau (Orange), Reinigung (Grün), Facility (Grau). */
function getGewerkBadgeClasses(gewerk: string | null, isLight: boolean): string {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide";
  const g = gewerk?.trim();

  if (isLight) {
    switch (g) {
      case "Elektro":
        return `${base} border border-amber-500 bg-amber-300 text-amber-900`;
      case "Sanitär":
        return `${base} border border-blue-500 bg-blue-300 text-blue-900`;
      case "Ausbau":
        return `${base} border border-orange-500 bg-orange-300 text-orange-900`;
      case "Reinigung":
        return `${base} border border-emerald-500 bg-emerald-300 text-emerald-900`;
      case "Facility":
        return `${base} border border-slate-500 bg-slate-300 text-slate-900`;
      default:
        return `${base} border border-slate-400 bg-slate-300 text-slate-900`;
    }
  }

  // Dark Theme
  switch (g) {
    case "Elektro":
      return `${base} border border-amber-500/70 bg-amber-500/20 text-amber-200`;
    case "Sanitär":
      return `${base} border border-blue-500/70 bg-blue-500/20 text-blue-200`;
    case "Ausbau":
      return `${base} border border-orange-500/70 bg-orange-500/20 text-orange-200`;
    case "Reinigung":
      return `${base} border border-emerald-500/70 bg-emerald-500/20 text-emerald-200`;
    case "Facility":
      return `${base} border border-slate-500/70 bg-slate-500/20 text-slate-300`;
    default:
      return `${base} border border-slate-600 bg-slate-800 text-slate-400`;
  }
}

/** Entfernt doppelte Ticket-IDs (gleiche Karte darf nur einmal vorkommen). */
function dedupeTicketsById(items: Ticket[]): Ticket[] {
  const seen = new Set<string>();
  const out: Ticket[] = [];
  for (const t of items) {
    const id = t?.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(t);
  }
  return out;
}

/** Pro SPM-Auftrag nur eine Karte: Original behalten (ältestes created_at), neuere Kopien verwerfen. */
function dedupeSpmLinkedTickets(items: Ticket[]): Ticket[] {
  const drop = new Set<string>();
  const oldestFirst = (a: Ticket, b: Ticket) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

  const byAuftragId = new Map<string, Ticket[]>();
  for (const t of items) {
    const aid = t.additional_data?.auftrag_id?.trim();
    if (!aid) continue;
    const g = byAuftragId.get(aid) ?? [];
    g.push(t);
    byAuftragId.set(aid, g);
  }
  for (const group of byAuftragId.values()) {
    if (group.length < 2) continue;
    group.sort(oldestFirst);
    for (let i = 1; i < group.length; i++) drop.add(group[i]!.id);
  }

  const byNr = new Map<string, Ticket[]>();
  for (const t of items) {
    if (drop.has(t.id)) continue;
    const nr = t.additional_data?.auftragsnummer?.trim().replace(/\s+/g, "");
    if (!nr) continue;
    const g = byNr.get(nr) ?? [];
    g.push(t);
    byNr.set(nr, g);
  }
  for (const group of byNr.values()) {
    if (group.length < 2) continue;
    group.sort(oldestFirst);
    for (let i = 1; i < group.length; i++) drop.add(group[i]!.id);
  }

  return items.filter((t) => !drop.has(t.id));
}

function sanitizeTicketList(items: Ticket[]): Ticket[] {
  return dedupeSpmLinkedTickets(dedupeTicketsById(items));
}

/** Tickets, die einen SPM-Auftrag spiegeln, nicht nochmal als eigene Karte zeigen (Auftrag ist die Quelle). */
function ticketHasLinkedAuftrag(t: Ticket): boolean {
  const aid = t.additional_data?.auftrag_id;
  return typeof aid === "string" && aid.trim().length > 0;
}

function auftragBoardStatus(a: HandwerkerAuftrag): string {
  const s = (a.board_status ?? "").trim();
  return s || STATUS.ANFRAGE;
}

function isKalkulationFaelligAuftrag(a: HandwerkerAuftrag): boolean {
  if (auftragBoardStatus(a) !== STATUS.BESICHTIGUNG) return false;
  const end = (a.termin_ende ?? "").trim();
  if (!end) return false;
  const d = new Date(end);
  return !isNaN(d.getTime()) && d.getTime() < Date.now();
}

function sortAuftraegeByBoardPosition(a: HandwerkerAuftrag, b: HandwerkerAuftrag): number {
  const posA = kanbanPositionSortKey(a.board_position);
  const posB = kanbanPositionSortKey(b.board_position);
  if (posA !== posB) return posA - posB;
  const ca = a.created_at ? new Date(String(a.created_at)).getTime() : 0;
  const cb = b.created_at ? new Date(String(b.created_at)).getTime() : 0;
  return cb - ca;
}

function getAuftragCardTitle(a: HandwerkerAuftrag): string {
  return (a.mieter_name ?? "").trim() || `Auftrag ${(a.auftragsnummer ?? "").trim() || a.id.slice(0, 8)}`;
}

function getAuftragCardAddress(a: HandwerkerAuftrag): string {
  return [a.adresse_strasse, a.adresse_ort].filter(Boolean).join(", ").trim();
}

type BoardPosItem = { key: string; position: number };

/** Neue board_position / position in einer Spalte mit Tickets + Aufträgen. */
function computeMergedColumnPosition(
  colTickets: Ticket[],
  colAuftraege: HandwerkerAuftrag[],
  draggedDndId: string,
  insertBeforeDndId: string | null | undefined
): number {
  const draggedKey = draggedDndId.startsWith("ticket-")
    ? `ticket:${draggedDndId.slice("ticket-".length)}`
    : draggedDndId.startsWith("auftrag-")
      ? `auftrag:${draggedDndId.slice("auftrag-".length)}`
      : `ticket:${draggedDndId}`;
  const beforeKey =
    insertBeforeDndId == null
      ? null
      : insertBeforeDndId.startsWith("ticket-")
        ? `ticket:${insertBeforeDndId.slice("ticket-".length)}`
        : insertBeforeDndId.startsWith("auftrag-")
          ? `auftrag:${insertBeforeDndId.slice("auftrag-".length)}`
          : `ticket:${insertBeforeDndId}`;

  const items: BoardPosItem[] = [
    ...colTickets.map((t) => {
      const k = kanbanPositionSortKey(t.position);
      return { key: `ticket:${t.id}`, position: k === Number.MAX_SAFE_INTEGER ? 10 : k };
    }),
    ...colAuftraege.map((a) => {
      const k = kanbanPositionSortKey(a.board_position);
      return { key: `auftrag:${a.id}`, position: k === Number.MAX_SAFE_INTEGER ? 10 : k };
    }),
  ].sort((x, y) => x.position - y.position);

  let list = items.filter((i) => i.key !== draggedKey);
  if (list.length === 0) return 10;
  if (!beforeKey) {
    return Math.max(...list.map((i) => i.position)) + 10;
  }
  const idx = list.findIndex((i) => i.key === beforeKey);
  if (idx === -1) return Math.max(...list.map((i) => i.position)) + 10;
  const after = list[idx]!;
  const before = idx > 0 ? list[idx - 1]! : null;
  if (before && after.position - before.position > 1) {
    return Math.round((before.position + after.position) / 2);
  }
  if (!before) return Math.max(1, after.position - 10);
  list = list.map((item, i) => ({ ...item, position: (i + 1) * 10 }));
  const newIdx = list.findIndex((i) => i.key === beforeKey);
  const newAfter = list[newIdx]!;
  const newBefore = newIdx > 0 ? list[newIdx - 1]! : null;
  return newBefore ? Math.round((newBefore.position + newAfter.position) / 2) : Math.max(1, newAfter.position - 10);
}

type BoardDisplayRow =
  | { kind: "ticket"; t: Ticket }
  | { kind: "auftrag"; a: HandwerkerAuftrag };

/** Gemeinsame Reihenfolge für Tickets und Aufträge in einer Spalte (Position → neuere zuerst). */
function mergeBoardDisplayRows(tickets: Ticket[], auftraege: HandwerkerAuftrag[]): BoardDisplayRow[] {
  type Tagged =
    | { kind: "ticket"; t: Ticket; pos: number; created: number }
    | { kind: "auftrag"; a: HandwerkerAuftrag; pos: number; created: number };
  const tagged: Tagged[] = [
    ...tickets.map((t) => ({
      kind: "ticket" as const,
      t,
      pos: kanbanPositionSortKey(t.position),
      created: new Date(t.created_at).getTime(),
    })),
    ...auftraege.map((a) => ({
      kind: "auftrag" as const,
      a,
      pos: kanbanPositionSortKey(a.board_position),
      created: a.created_at ? new Date(String(a.created_at)).getTime() : 0,
    })),
  ];
  tagged.sort((x, y) => {
    if (x.pos !== y.pos) return x.pos - y.pos;
    return y.created - x.created;
  });
  return tagged.map((row) =>
    row.kind === "ticket" ? { kind: "ticket" as const, t: row.t } : { kind: "auftrag" as const, a: row.a }
  );
}

/** Normalisiert Gewerk-Werte (String oder Array) in ein bereinigtes String-Array. */
function normalizeGewerke(value: string[] | string | null | undefined): string[] {
  if (Array.isArray(value)) {
    return value
      .map((g) => (g ?? "").trim())
      .filter((g) => g.length > 0);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}

/** Sortierung innerhalb einer Spalte: zuerst nach position (aufsteigend), dann nach created_at (neuere zuerst). */
function sortByPositionThenCreatedAt(a: Ticket, b: Ticket): number {
  const posA = kanbanPositionSortKey(a.position);
  const posB = kanbanPositionSortKey(b.position);
  if (posA !== posB) return posA - posB;
  const createdA = new Date(a.created_at).getTime();
  const createdB = new Date(b.created_at).getTime();
  return createdB - createdA;
}

/** Position beim Anhängen ans Ende einer Spalte: leer → 10, sonst höchste position + 10 (optional ein Ticket ausschließen). */
function getPositionForAppend(columnTickets: Ticket[], excludeTicketId?: string): number {
  const list = excludeTicketId ? columnTickets.filter((t) => t.id !== excludeTicketId) : columnTickets;
  if (list.length === 0) return 10;
  const maxPos = Math.max(
    10,
    ...list.map((t) => {
      const k = kanbanPositionSortKey(t.position);
      return k === Number.MAX_SAFE_INTEGER ? 0 : k;
    })
  );
  return maxPos + 10;
}

/** Lädt alle Tickets einer Company – gefiltert nach Rolle (API, serverseitig). */
const fetchTickets = async (companyId: string = DEFAULT_COMPANY_ID) => {
  try {
    const res = await authFetch(`/api/tickets?company_id=${encodeURIComponent(companyId)}`);
    const json = await res.json();
    if (!res.ok) {
      return { data: [] as Ticket[], error: { message: json?.error ?? "Fehler beim Laden" } };
    }
    return { data: Array.isArray(json) ? json : [], error: null };
  } catch (e) {
    return {
      data: [] as Ticket[],
      error: { message: e instanceof Error ? e.message : "Netzwerkfehler" },
    };
  }
};

export default function AdminDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  /** SPM-Aufträge als eigene Board-Karten (ohne Pflicht-Ticket). */
  const [auftraegeBoard, setAuftraegeBoard] = useState<HandwerkerAuftrag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [rejectionTicket, setRejectionTicket] = useState<Ticket | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("no_capacity");
  const [rejectionOtherText, setRejectionOtherText] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [detailTicket, setDetailTicket] = useState<Ticket | null>(null);
  const [detailKommentare, setDetailKommentare] = useState<Kommentar[]>([]);
  const [newKommentarText, setNewKommentarText] = useState("");
  /** Timeline: Einträge aus ticket_history (zusätzlich zu tickets.historie). */
  const [detailHistoryRows, setDetailHistoryRows] = useState<TicketHistoryRow[]>([]);
  const [detailHistoryLoading, setDetailHistoryLoading] = useState(false);
  const [detailAssignedTo, setDetailAssignedTo] = useState("");
  const [detailTerminStart, setDetailTerminStart] = useState("");
  const [detailTerminEnde, setDetailTerminEnde] = useState("");
  const [detailHistorieNewDate, setDetailHistorieNewDate] = useState("");
  const [detailHistorieNewText, setDetailHistorieNewText] = useState("");
  /** Bearbeitbare Gewerke im Detail-Modal (Array). */
  const [detailGewerke, setDetailGewerke] = useState<string[]>([]);
  /** Bearbeitbare Kunden-Daten im Detail-Modal. */
  const [detailKundeName, setDetailKundeName] = useState("");
  const [detailPartnerName, setDetailPartnerName] = useState("");
  const [detailEmail, setDetailEmail] = useState("");
  const [detailTelefon, setDetailTelefon] = useState("");
  const [detailAdresse, setDetailAdresse] = useState("");
  const [detailBeschreibung, setDetailBeschreibung] = useState("");
  /** Bearbeitungsmodus für Kunden-Daten: Stift = aktivieren, Kassette = speichern. */
  const [detailKundenEditMode, setDetailKundenEditMode] = useState(false);
  const [detailSaving, setDetailSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAuftragDoc, setUploadingAuftragDoc] = useState(false);
  /** SPM-Aufträge: URLs der hochgeladenen Angebote/Rechnungen (aus auftraege.angebot_rechnung_urls). */
  const [detailAuftragDocs, setDetailAuftragDocs] = useState<string[]>([]);
  /** Haupt-PDF (wie n8n anhang_url) – nicht doppelt unter „Weitere Dateien“ listen. */
  const [detailAuftragAnhangUrl, setDetailAuftragAnhangUrl] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  /** Signierte URLs für Modal-Bilder (funktioniert auch bei privatem Storage-Bucket). */
  const [signedImageUrls, setSignedImageUrls] = useState<string[]>([]);
  const listScrollRef = useRef<HTMLDivElement>(null);
  const detailSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startMinutesRef = useRef<HTMLDivElement>(null);
  const endMinutesRef = useRef<HTMLDivElement>(null);
  /** Montag der angezeigten Kalenderwoche (für 2-Spalten-Kalender). */
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeekDf(new Date(), { weekStartsOn: 1 })
  );
  const [dropTargetSlot, setDropTargetSlot] = useState<{ dayIndex: number; slotIndex: number } | null>(null);
  /** ID des gerade gezogenen Elements (event-* oder ticket-*) für DragOverlay – Karte folgt dem Cursor. */
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  /** Manuell getrackte Spalte über der gerade gedragged wird (DOM-basiert, unabhängig von @dnd-kit). */
  const [manualOverCol, setManualOverCol] = useState<string | null>(null);
  /** Drop-Indicator: Zeigt an, VOR welchem Ticket eingefügt wird. null = ans Ende der Spalte. */
  const [dropIndicator, setDropIndicator] = useState<{ colId: string; insertBeforeId: string | null } | null>(null);

  /** Dashboard-Theme: 'dark' (Standard) oder 'light'. */
  const [dashboardTheme, setDashboardTheme] = useState<"dark" | "light">("dark");

  /** Pending Slot-Drop: Ticket oder Auftrag auf Kalender-Slot → Zeitfenster-Dialog. */
  const [pendingSlotDrop, setPendingSlotDrop] = useState<
    | {
        kind: "ticket";
        ticketId: string;
        ticket: Ticket;
        slotStart: Date;
        slotEnd: Date;
        wasNachbereitung: boolean;
      }
    | {
        kind: "auftrag";
        auftragId: string;
        auftrag: HandwerkerAuftrag;
        slotStart: Date;
        slotEnd: Date;
        wasNachbereitung: boolean;
      }
    | null
  >(null);
  const [pendingTerminStart, setPendingTerminStart] = useState("");
  const [pendingTerminEnde, setPendingTerminEnde] = useState("");
  /** Nach Auswahl im "Was für ein Termin?"-Dialog: Besichtigung oder Ausführung. null = Typ noch nicht gewählt. */
  const [pendingTerminTyp, setPendingTerminTyp] = useState<"Besichtigung" | "Ausführung" | null>(null);

  /** Spalte 1 Tabs: Eingang (Anfrage) | Angebote (Angebot_erstellt). */
  const [incomingTab, setIncomingTab] = useState<"Eingang" | "Angebote">("Eingang");

  /** Mobile: Ansicht „Anfragen“ vs. Kalender – nur per Header-Kalender-Button; zurück über „Anfragen“. */
  const [mobileMainTab, setMobileMainTab] = useState<"list" | "calendar">("list");
  /** Mobil (Admin): horizontal wählbare Board-Spalte – Eingang, Angebote, dann 3–6. */
  const [mobileBoardTab, setMobileBoardTab] = useState<
    "eingang" | "angebote" | "column-3" | "column-4" | "column-5" | "column-6"
  >("eingang");
  /** Filter für sichtbare Karten (Tickets & Aufträge); DnD/Spaltenlogik bleibt auf vollen Daten). */
  const [boardSearchQuery, setBoardSearchQuery] = useState("");
  /** Viewport &lt; lg: Kalender-Grid und Touch-Optimierung. */
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const desktopCalendarSectionRef = useRef<HTMLElement | null>(null);

  /** SPM-Auftrag: Handwerker-Detailmodal */
  const [handwerkerAuftragDetail, setHandwerkerAuftragDetail] = useState<HandwerkerAuftrag | null>(null);
  const [handwerkerAuftragLoading, setHandwerkerAuftragLoading] = useState(false);
  /** Board-Karte zum SPM-Auftrag (für Gewerk-Bearbeitung im Handwerker-Dialog). */
  const [handwerkerLinkedTicketId, setHandwerkerLinkedTicketId] = useState<string | null>(null);

  const handwerkerBoardTicketGewerk = useMemo(() => {
    if (!handwerkerLinkedTicketId) return null;
    const t = tickets.find((x) => x.id === handwerkerLinkedTicketId);
    const g = t?.gewerk;
    return Array.isArray(g) ? g : null;
  }, [handwerkerLinkedTicketId, tickets]);

  /** Create-Ticket-Dialog: manuell neue Tickets anlegen. */
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [createTicketKundeName, setCreateTicketKundeName] = useState("");
  const [createTicketEmail, setCreateTicketEmail] = useState("");
  const [createTicketTelefon, setCreateTicketTelefon] = useState("");
  const [createTicketAdresse, setCreateTicketAdresse] = useState("");
  const [createTicketBeschreibung, setCreateTicketBeschreibung] = useState("");
  const [createTicketGewerk, setCreateTicketGewerk] = useState<string>("");
  const [createTicketIsPartner, setCreateTicketIsPartner] = useState(false);
  const [createTicketPartnerName, setCreateTicketPartnerName] = useState("");
  const [createTicketSubmitting, setCreateTicketSubmitting] = useState(false);
  const [createTicketError, setCreateTicketError] = useState<string | null>(null);

  /** Auswahl Ticket vs. SPM-Auftrag, dann jeweils eigenes Formular. */
  const [createChooserOpen, setCreateChooserOpen] = useState(false);
  const [createAuftragOpen, setCreateAuftragOpen] = useState(false);
  const [createAuftragMieterName, setCreateAuftragMieterName] = useState("");
  const [createAuftragEmail, setCreateAuftragEmail] = useState("");
  const [createAuftragTelefon, setCreateAuftragTelefon] = useState("");
  const [createAuftragAdresse, setCreateAuftragAdresse] = useState("");
  const [createAuftragAufgabe, setCreateAuftragAufgabe] = useState("");
  const [createAuftragNr, setCreateAuftragNr] = useState("");
  const [createAuftragGewerk, setCreateAuftragGewerk] = useState<string>("");
  const [createAuftragRechnungsempfaenger, setCreateAuftragRechnungsempfaenger] = useState("");
  const [createAuftragLeistungsempfaenger, setCreateAuftragLeistungsempfaenger] = useState("");
  const [createAuftragPdfFile, setCreateAuftragPdfFile] = useState<File | null>(null);
  const createAuftragPdfInputRef = useRef<HTMLInputElement>(null);
  const [createAuftragSubmitting, setCreateAuftragSubmitting] = useState(false);
  const [createAuftragError, setCreateAuftragError] = useState<string | null>(null);

  /** Quote Builder Overlay: Ticket für Angebotsbearbeitung, UI only. */
  const [quoteBuilderOpen, setQuoteBuilderOpen] = useState(false);
  const [quoteBuilderTicketId, setQuoteBuilderTicketId] = useState<string | null>(null);
  /** Zeilen des Angebots (Menge, Text, Preis) – UI only. */
  const [quoteLines, setQuoteLines] = useState<{ menge: number; text: string; preis: number }[]>([
    { menge: 1, text: "Beispielposition", preis: 150 },
  ]);

  /** Aktuell angemeldeter Nutzer (vom Layout/Server). */
  const adminUser = useAdminUser();
  const showAuftragBilling = adminUser?.role === "admin";
  /** Gewerk-Rollen: kompakte Auftragsliste statt Kanban (Admin behält volles Board). */
  const isGewerkUser = Boolean(adminUser?.role && adminUser.role !== "admin");
  const { toast } = useToast();

  /** Gewerk-Ansicht: kommende Termine zuerst, sonst nach Eingang sortieren. */
  const gewerkSortedAuftraege = useMemo(() => {
    const list = [...auftraegeBoard];
    const parseT = (s: string | null | undefined) => {
      const t = (s ?? "").trim();
      if (!t) return NaN;
      const ms = new Date(t).getTime();
      return Number.isNaN(ms) ? NaN : ms;
    };
    list.sort((a, b) => {
      const ta = parseT(a.termin_start);
      const tb = parseT(b.termin_start);
      const aHas = !Number.isNaN(ta);
      const bHas = !Number.isNaN(tb);
      if (aHas && bHas && ta !== tb) return ta - tb;
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      const pa = kanbanPositionSortKey(a.board_position);
      const pb = kanbanPositionSortKey(b.board_position);
      if (pa !== pb) return pa - pb;
      const ca = a.created_at ? new Date(String(a.created_at)).getTime() : 0;
      const cb = b.created_at ? new Date(String(b.created_at)).getTime() : 0;
      return cb - ca;
    });
    return list;
  }, [auftraegeBoard]);

  const boardSearchNeedle = useMemo(() => normalizeBoardSearchNeedle(boardSearchQuery), [boardSearchQuery]);

  const gewerkAuftraegeForView = useMemo(
    () => filterAuftraegeByBoardSearch(gewerkSortedAuftraege, boardSearchNeedle),
    [gewerkSortedAuftraege, boardSearchNeedle]
  );

  /** Auto-Historisierung: verhindert doppelte Inserts innerhalb einer Session. */
  const historizedBesichtigungKeysRef = useRef<Set<string>>(new Set());
  /** Falls ticket_history nicht existiert / Schema abweicht: nicht weiter spammen. */
  const ticketHistoryDisabledRef = useRef(false);
  /** Blauer Punkt im Angebote-Tab: Tickets, die Aufmerksamkeit brauchen (Kalkulation fällig). */
  const [offerAttentionIds, setOfferAttentionIds] = useState<Set<string>>(new Set());

  // Verhindert Hydration-Mismatch (Tabs, Badges, DnD) – UI erst nach Mount rendern
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobileViewport(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (isGewerkUser && incomingTab === "Angebote") setIncomingTab("Eingang");
  }, [isGewerkUser, incomingTab]);

  /** Theme aus localStorage laden (nur Client). */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("dashboardTheme");
      if (stored === "light" || stored === "dark") {
        setDashboardTheme(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleDashboardTheme = useCallback(() => {
    setDashboardTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem("dashboardTheme", next);
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  const isLightTheme = dashboardTheme === "light";

  const openCalendarFromHeader = useCallback(() => {
    setMobileMainTab("calendar");
    requestAnimationFrame(() => {
      desktopCalendarSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  /** Sensor: etwas höhere Schwelle auf Touch-Geräten → Tap öffnet Karte, bewusstes Ziehen startet Drag. */
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: isMobileViewport ? 12 : 8 },
  });
  const sensors = useSensors(pointerSensor);

  /** Droppables: Eingangsspalte (Desktop) + Mobile-Liste + Eingang-Dropzone für Kalender. */
  const { setNodeRef: setCol1Ref, isOver: isOverCol1 } = useDroppable({ id: COLUMN_IDS[0] });
  const { setNodeRef: setEingangMobileRef } = useDroppable({ id: "column-eingang-mobile" });
  const { setNodeRef: setCol1MobileListRef, isOver: isOverCol1MobileList } = useDroppable({ id: "column-1-mobile-list" });

  /** Auto-Save für assigned_to: Debounce 500ms nach Tippen (nur wenn Modal offen). */
  useEffect(() => {
    if (!detailTicket?.id) return;
    if (detailSaveTimeoutRef.current) clearTimeout(detailSaveTimeoutRef.current);
    const ticketId = detailTicket.id;
    const a = detailAssignedTo;
    detailSaveTimeoutRef.current = setTimeout(() => {
      persistAssignedTo(ticketId, a);
      detailSaveTimeoutRef.current = null;
    }, 500);
    return () => {
      if (detailSaveTimeoutRef.current) clearTimeout(detailSaveTimeoutRef.current);
    };
  }, [detailTicket?.id, detailAssignedTo]);

  /** Signierte URLs für die Bilder des geöffneten Tickets laden (nötig bei privatem Bucket). */
  useEffect(() => {
    const urls = Array.isArray(detailTicket?.image_urls) ? detailTicket.image_urls : [];
    if (urls.length === 0) {
      setSignedImageUrls([]);
      return;
    }
    let cancelled = false;
    const run = async () => {
      const resolved = await Promise.all(
        urls.map(async (url: string) => {
          const path = url.split("/ticket-images/")[1]?.replace(/^\//, "") ?? "";
          if (!path) return url;
          const { data } = await supabase.storage.from(BUCKET_TICKET_IMAGES).createSignedUrl(path, 60 * 60);
          return data?.signedUrl ?? url;
        })
      );
      if (!cancelled) setSignedImageUrls(resolved);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [detailTicket?.id, detailTicket?.image_urls]);

  /** Soft Refresh: Daten neu laden. Automatik: termin_ende überschritten → Status Nachbereitung. Sync: Aufträge → Tickets. */
  const loadTickets = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    const { data, error } = await fetchTickets(DEFAULT_COMPANY_ID);
    if (error) {
      setError(error.message);
      if (!silent) setLoading(false);
      return;
    }
    let list = data ?? [];

    /** Clientseitige Absicherung: Gewerk-User nur Tickets mit ihrem Gewerk. */
    if (adminUser?.role && adminUser.role !== "admin") {
      const myGewerk = roleToGewerk(adminUser.role);
      if (myGewerk) {
        const norm = (s: string) => s.trim().toLowerCase().replace(/ä/g, "ae").replace(/ü/g, "ue").replace(/ö/g, "oe");
        const myNorm = norm(myGewerk);
        list = list.filter((t) => {
          const gewerkeList = normalizeGewerke(t.gewerk ?? null);
          if (gewerkeList.length === 0) return false;
          return gewerkeList.some((v) => norm(v) === myNorm);
        });
      }
    }

    /** Aufträge für gemischtes Board (keine automatischen Shadow-Tickets mehr). */
    try {
      const auftraegeRes = await authFetch("/api/auftraege");
      const auftraegeRaw = auftraegeRes.ok ? await auftraegeRes.json() : null;
      const aufListRaw = (Array.isArray(auftraegeRaw) ? auftraegeRaw : []).map(
        (row) => normalizeAuftragRow(row as Record<string, unknown>) as HandwerkerAuftrag
      );
      /** Kein Auto-Gewerk aus Auftragstyp/Aufgabe: leeres Gewerk bleibt leer (Admin-Entscheidung). */
      const aufList = adminUser
        ? filterAuftraegeRowsByRole(aufListRaw, adminUser.role)
        : aufListRaw;
      setAuftraegeBoard(aufList);
    } catch (syncErr) {
      console.warn("[Auftraege Board]", syncErr);
      setAuftraegeBoard([]);
    }

    list = sanitizeTicketList(list);

    const now = new Date().toISOString();
    const toMove = list.filter((t: Ticket) => {
      const s = (t.status ?? "").trim();
      return (
        t.termin_ende &&
        t.termin_ende < now &&
        // Nach Ablauf des Termins in „Nachbereitung & Doku“ verschieben:
        // Tickets, die im Kalender unter „Ausführung“ laufen (STATUS.AUSFUEHRUNG),
        // plus die bisherigen Fälle zur Abwärtskompatibilität.
        (s === STATUS.AUSFUEHRUNG || s === STATUS.EINGETEILT || s === "Ticket")
      );
    });
    if (toMove.length > 0) {
      for (const t of toMove) {
        await supabase.from("tickets").update({ status: STATUS.NACHBEREITUNG }).eq("id", t.id);
      }
      const updated = list.map((t: Ticket) =>
        toMove.some((m) => m.id === t.id) ? { ...t, status: STATUS.NACHBEREITUNG } : t
      );
      setTickets(updated);
    } else {
      setTickets(list);
    }
    if (!silent) setLoading(false);
  };

  /** Immer aktuelle loadTickets-Version für Realtime-Callbacks (ohne stale closure). */
  const loadTicketsRef = useRef(loadTickets);
  loadTicketsRef.current = loadTickets;

  useEffect(() => {
    loadTickets();
  }, []);

  /** Auftrags-Zeilen: sofort für alle Rollen neu laden (Gewerk-Dashboard sieht Admin-Änderungen ohne Refresh). */
  useEffect(() => {
    const channel = supabase
      .channel("auftraege-board-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "auftraege" },
        () => {
          void loadTicketsRef.current(true);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  /** Fallback: alle 60s neu laden (Gewerk-User sehen sonst evtl. keine neu zugewiesenen Tickets). */
  useEffect(() => {
    const isGewerk = adminUser?.role && adminUser.role !== "admin";
    if (!isGewerk) return;
    const iv = setInterval(() => loadTickets(true), 60_000);
    return () => clearInterval(iv);
  }, [adminUser?.role]);

  /** Supabase Realtime: neue und geänderte Tickets – Gewerk-Filter bei Gewerk-Usern. */
  useEffect(() => {
    const norm = (s: string) => s.trim().toLowerCase().replace(/ä/g, "ae").replace(/ü/g, "ue").replace(/ö/g, "oe");
    const gewerkMatches = (gewerkList: string[] | null, myGewerk: string | null) => {
      if (!myGewerk) return true;
      if (!gewerkList || !Array.isArray(gewerkList)) return false;
      const myNorm = norm(myGewerk);
      return gewerkList.some((v) => norm(String(v ?? "")) === myNorm);
    };

    const channel = supabase
      .channel("tickets-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tickets" },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          if (String(row?.company_id ?? "") !== DEFAULT_COMPANY_ID) return;
          const newTicket = row as unknown as Ticket;
          const myGewerk = adminUser?.role && adminUser.role !== "admin" ? roleToGewerk(adminUser.role) : null;
          if (myGewerk && !gewerkMatches(Array.isArray(newTicket.gewerk) ? newTicket.gewerk : [], myGewerk)) return;
          setTickets((prev) => {
            if (prev.some((t) => t.id === newTicket.id)) return sanitizeTicketList(prev);
            return sanitizeTicketList([newTicket, ...prev]);
          });
          const name = (newTicket.kunde_name ?? newTicket.partner_name ?? "").toString().trim() || "Neue Anfrage";
          toast({ title: "Neue Anfrage", description: name });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tickets" },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          if (String(row?.company_id ?? "") !== DEFAULT_COMPANY_ID) return;
          const updatedTicket = row as unknown as Ticket;
          const myGewerk = adminUser?.role && adminUser.role !== "admin" ? roleToGewerk(adminUser.role) : null;
          const matches = gewerkMatches(Array.isArray(updatedTicket.gewerk) ? updatedTicket.gewerk : [], myGewerk);

          let newlyAdded = false;
          setTickets((prev) => {
            const exists = prev.some((t) => t.id === updatedTicket.id);
            if (matches) {
              if (exists) return sanitizeTicketList(prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)));
              newlyAdded = true;
              return sanitizeTicketList([updatedTicket, ...prev]);
            }
            if (exists) return sanitizeTicketList(prev.filter((t) => t.id !== updatedTicket.id));
            return sanitizeTicketList(prev);
          });
          if (newlyAdded) {
            toast({ title: "Neues Ticket", description: (updatedTicket.kunde_name ?? updatedTicket.partner_name ?? "").toString().trim() || "Gewerk zugewiesen" });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast, adminUser?.role]);

  /** Lädt Timeline-Einträge aus ticket_history für das aktuell geöffnete Ticket. */
  const loadTicketHistoryRows = useCallback(
    async (ticketId: string) => {
      if (!ticketId) return;
      setDetailHistoryLoading(true);
      try {
        const { data, error } = await supabase
          .from("ticket_history")
          .select("*")
          .eq("ticket_id", ticketId)
          .order("erstellt_at", { ascending: false });
        if (error) {
          // Nicht hart failen: Timeline ist ein Zusatz.
          console.warn("[ticket_history] load failed:", error.message);
          setDetailHistoryRows([]);
        } else {
          setDetailHistoryRows((data ?? []) as TicketHistoryRow[]);
        }
      } catch (e) {
        console.warn("[ticket_history] load exception:", e);
        setDetailHistoryRows([]);
      } finally {
        setDetailHistoryLoading(false);
      }
    },
    []
  );

  /** Detail-Modal geöffnet → Timeline laden. */
  useEffect(() => {
    if (!detailTicket?.id) return;
    loadTicketHistoryRows(detailTicket.id);
  }, [detailTicket?.id, loadTicketHistoryRows]);

  /**
   * Automatische Historisierung:
   * Wenn Besichtigungstermin in die Vergangenheit rückt (Kalkulation fällig),
   * wird ein Eintrag in ticket_history erzeugt (einmalig pro ticketId+termin_ende).
   *
   * Erwartetes Schema in Supabase:
   * - ticket_history(ticket_id uuid, aktion text, details jsonb, erstellt_at timestamptz default now())
   */
  useEffect(() => {
    if (ticketHistoryDisabledRef.current) return;
    const candidates = tickets.filter(isKalkulationFaellig);
    if (candidates.length === 0) return;

    let cancelled = false;
    const run = async () => {
      for (const t of candidates) {
        if (cancelled) return;
        const key = `${t.id}:${(t.termin_ende ?? "").trim()}`;
        if (!t.termin_ende || t.termin_ende.trim() === "") continue;
        if (!t.termin_start || t.termin_start.trim() === "") continue;
        if (historizedBesichtigungKeysRef.current.has(key)) continue;

        // Best effort: erst prüfen, ob es den Eintrag schon gibt (verhindert Duplikate über Sessions hinweg).
        try {
          const { data: existing, error: selErr } = await supabase
            .from("ticket_history")
            .select("id")
            .eq("ticket_id", t.id)
            .eq("aktion", "Besichtigung abgeschlossen")
            .contains("details", { von: t.termin_start, bis: t.termin_ende })
            .limit(1);
          if (selErr) {
            // Schema evtl. anders → weiter unten Insert versuchen; falls es knallt, deaktivieren wir.
            console.warn("[ticket_history] select failed:", selErr.message);
          } else if ((existing ?? []).length > 0) {
            historizedBesichtigungKeysRef.current.add(key);
            continue;
          }

          const { error: insErr } = await supabase.from("ticket_history").insert([
            {
              ticket_id: t.id,
              aktion: "Besichtigung abgeschlossen",
              details: { von: t.termin_start, bis: t.termin_ende },
              erstellt_at: new Date().toISOString(),
            },
          ]);
          if (insErr) {
            // Wenn Tabelle oder Spalten fehlen: einmal melden und weitere Versuche stoppen (sonst Spam).
            console.warn("[ticket_history] insert failed:", insErr.message);
            if (
              /relation .*ticket_history.* does not exist/i.test(insErr.message) ||
              /column .* does not exist/i.test(insErr.message)
            ) {
              ticketHistoryDisabledRef.current = true;
              setError((prev) => prev ?? "Hinweis: ticket_history Tabelle/Spalten fehlen – Timeline kann nicht gespeichert werden.");
              return;
            }
            // Sonstige Fehler: nicht endlos spammen, aber Ticket nicht als historized markieren.
            continue;
          }

          historizedBesichtigungKeysRef.current.add(key);
          // Wenn gerade dieses Ticket offen ist → Timeline refresh (best effort)
          if (detailTicket?.id === t.id) {
            loadTicketHistoryRows(t.id);
          }
        } catch (e) {
          console.warn("[ticket_history] auto-historize exception:", e);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [tickets, detailTicket?.id, loadTicketHistoryRows]);

  /** Neue fällige Kalkulationen markieren → blauer Punkt im Angebote-Tab. */
  useEffect(() => {
    const next = new Set(offerAttentionIds);
    tickets.forEach((t) => {
      if (isKalkulationFaellig(t)) {
        next.add(t.id);
      }
    });
    if (next.size !== offerAttentionIds.size) {
      setOfferAttentionIds(next);
    }
  }, [tickets, offerAttentionIds]);


  /** Nächste ticket_display_id: höchste HM-YYYY-NNNN Nummer + 1 (pro Jahr). */
  const getNextTicketDisplayId = async (): Promise<string> => {
    const year = new Date().getFullYear();
    const prefix = `HM-${year}-`;
    const { data } = await supabase
      .from("tickets")
      .select("ticket_display_id")
      .not("ticket_display_id", "is", null);
    let maxNum = 1000;
    for (const row of data ?? []) {
      const id = (row.ticket_display_id ?? "").trim();
      if (id.startsWith(prefix)) {
        const num = parseInt(id.slice(prefix.length), 10);
        if (!Number.isNaN(num) && num > maxNum) maxNum = num;
      }
    }
    return `${prefix}${maxNum + 1}`;
  };

  const handleConvertToTicket = async (ticket: Ticket) => {
    if ((ticket.status ?? "").trim() !== STATUS.ANFRAGE) return;
    setConvertingId(ticket.id);
    setError(null);
    try {
      const nextDisplayId = await getNextTicketDisplayId();
      const { error } = await supabase
        .from("tickets")
        .update({ status: STATUS.EINGETEILT, ticket_display_id: nextDisplayId })
        .eq("id", ticket.id);
      if (error) {
        setError(error.message);
      } else {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === ticket.id ? { ...t, status: STATUS.EINGETEILT, ticket_display_id: nextDisplayId } : t
          )
        );
      }
    } finally {
      setConvertingId(null);
    }
  };

  const openRejectionModal = (ticket: Ticket) => {
    setRejectionTicket(ticket);
    setRejectionReason("no_capacity");
    setRejectionOtherText("");
  };

  const closeRejectionModal = (skipScrollRestore?: boolean) => {
    setRejectionTicket(null);
    setRejectionOtherText("");
  };

  const resetCreateTicketForm = useCallback(() => {
    setCreateTicketKundeName("");
    setCreateTicketEmail("");
    setCreateTicketTelefon("");
    setCreateTicketAdresse("");
    setCreateTicketBeschreibung("");
    setCreateTicketGewerk("");
    setCreateTicketIsPartner(false);
    setCreateTicketPartnerName("");
    setCreateTicketError(null);
  }, []);

  const resetCreateAuftragForm = useCallback(() => {
    setCreateAuftragMieterName("");
    setCreateAuftragEmail("");
    setCreateAuftragTelefon("");
    setCreateAuftragAdresse("");
    setCreateAuftragAufgabe("");
    setCreateAuftragNr("");
    setCreateAuftragGewerk("");
    setCreateAuftragRechnungsempfaenger("");
    setCreateAuftragLeistungsempfaenger("");
    setCreateAuftragPdfFile(null);
    setCreateAuftragError(null);
    if (createAuftragPdfInputRef.current) createAuftragPdfInputRef.current.value = "";
  }, []);

  const handleCreateTicket = useCallback(async () => {
    const kunde_name = createTicketIsPartner
      ? (createTicketPartnerName.trim() || createTicketKundeName.trim() || null)
      : (createTicketKundeName.trim() || null);
    const kontakt_email = createTicketEmail.trim();
    const objekt_adresse = createTicketAdresse.trim();

    if (!kunde_name) {
      setCreateTicketError("Name (Kunde oder Partner) ist erforderlich.");
      return;
    }
    if (!kontakt_email) {
      setCreateTicketError("E-Mail ist erforderlich.");
      return;
    }
    if (!objekt_adresse) {
      setCreateTicketError("Objektadresse ist erforderlich.");
      return;
    }

    setCreateTicketSubmitting(true);
    setCreateTicketError(null);

    try {
      const position =
        tickets.length === 0
          ? 10
          : Math.max(
              10,
              ...tickets.map((t) => {
                const k = kanbanPositionSortKey(t.position);
                return k === Number.MAX_SAFE_INTEGER ? 0 : k;
              })
            ) + 10;
      const gewerkValue: string[] | null = createTicketGewerk.trim()
        ? [createTicketGewerk.trim()]
        : null;

      const payload = {
        company_id: DEFAULT_COMPANY_ID,
        status: STATUS.ANFRAGE,
        position,
        is_partner: createTicketIsPartner,
        partner_name: createTicketIsPartner ? (createTicketPartnerName.trim() || null) : null,
        kunde_name,
        kontakt_email,
        kontakt_telefon: createTicketTelefon.trim() || null,
        objekt_adresse,
        beschreibung: createTicketBeschreibung.trim() || null,
        gewerk: gewerkValue,
        historie: [],
      };

      const { data, error } = await supabase
        .from("tickets")
        .insert([payload])
        .select("id, created_at, ticket_display_id, status, position")
        .single();

      if (error) {
        setCreateTicketError(error.message);
        return;
      }

      const newTicket: Ticket = {
        id: data.id,
        ticket_display_id: data.ticket_display_id,
        is_partner: createTicketIsPartner,
        partner_name: createTicketIsPartner ? createTicketPartnerName.trim() || null : null,
        kunde_name,
        kontakt_email,
        kontakt_telefon: createTicketTelefon.trim() || null,
        objekt_adresse,
        beschreibung: createTicketBeschreibung.trim() || null,
        gewerk: gewerkValue,
        status: STATUS.ANFRAGE,
        ablehnungs_grund: null,
        abgelehnt_am: null,
        interne_notizen: null,
        kommentare: null,
        assigned_to: null,
        image_urls: null,
        termin_start: null,
        termin_ende: null,
        termin_typ: null,
        historie: [],
        position: data.position ?? position,
        created_at: data.created_at,
      };

      setTickets((prev) => [newTicket, ...prev]);
      setCreateTicketOpen(false);
      resetCreateTicketForm();
      /** Nach Create: Liste neu laden (sichert Anzeige bei Realtime-Verzögerung). */
      loadTickets();
    } catch (e) {
      setCreateTicketError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setCreateTicketSubmitting(false);
    }
  }, [
    createTicketIsPartner,
    createTicketPartnerName,
    createTicketKundeName,
    createTicketEmail,
    createTicketTelefon,
    createTicketAdresse,
    createTicketBeschreibung,
    createTicketGewerk,
    tickets,
    resetCreateTicketForm,
  ]);

  const handleCreateAuftrag = useCallback(async () => {
    const mieter_name = createAuftragMieterName.trim();
    const mieter_email = createAuftragEmail.trim();
    const adresse_strasse = createAuftragAdresse.trim();
    const auftragsnummer = createAuftragNr.trim();

    if (!mieter_name) {
      setCreateAuftragError("Name (Mieter/Kunde) ist erforderlich.");
      return;
    }
    if (!adresse_strasse) {
      setCreateAuftragError("Objektadresse ist erforderlich.");
      return;
    }
    if (!auftragsnummer) {
      setCreateAuftragError("Auftragsnummer ist erforderlich.");
      return;
    }
    const pdfFile = createAuftragPdfFile;
    if (!pdfFile) {
      setCreateAuftragError("Bitte die Auftrags-PDF auswählen.");
      return;
    }
    const looksPdf =
      pdfFile.type === "application/pdf" || pdfFile.name.toLowerCase().endsWith(".pdf");
    if (!looksPdf) {
      setCreateAuftragError("Bitte eine PDF-Datei wählen.");
      return;
    }

    setCreateAuftragSubmitting(true);
    setCreateAuftragError(null);

    try {
      const res = await authFetch("/api/admin/auftraege", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mieter_name,
          mieter_email: mieter_email || null,
          mieter_telefon: createAuftragTelefon.trim() || null,
          adresse_strasse,
          aufgabe: createAuftragAufgabe.trim() || null,
          auftragsnummer,
          gewerk: createAuftragGewerk.trim() || null,
          rechnungsempfaenger: createAuftragRechnungsempfaenger.trim() || null,
          leistungsempfaenger: createAuftragLeistungsempfaenger.trim() || null,
        }),
      });
      const json = (await res.json()) as HandwerkerAuftrag | { error?: string };
      if (!res.ok) {
        setCreateAuftragError(typeof json === "object" && json && "error" in json ? String(json.error) : "Anlegen fehlgeschlagen");
        return;
      }
      if (!("id" in json) || !json.id) {
        setCreateAuftragError("Antwort ohne Auftrags-ID.");
        return;
      }
      const newId = json.id;
      const path = `auftraege/docs/${newId}_${Date.now()}.pdf`;
      const { error: upErr } = await supabase.storage.from(BUCKET_TICKET_IMAGES).upload(path, pdfFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/pdf",
      });
      if (upErr) {
        setCreateAuftragError(
          `Auftrag wurde angelegt, PDF-Upload fehlgeschlagen: ${upErr.message}. Bitte PDF im Auftrags-Dialog nachladen.`
        );
        setAuftraegeBoard((prev) => [json as HandwerkerAuftrag, ...prev]);
        setCreateAuftragOpen(false);
        resetCreateAuftragForm();
        void loadTickets(true);
        return;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_TICKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const docRes = await authFetch(`/api/admin/auftraege/${encodeURIComponent(newId)}/doc-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: publicUrl }),
      });
      const docJson = (await docRes.json()) as {
        angebot_rechnung_urls?: string[];
        anhang_url?: string | null;
        error?: string;
      };
      const merged: HandwerkerAuftrag = {
        ...(json as HandwerkerAuftrag),
        angebot_rechnung_urls: Array.isArray(docJson.angebot_rechnung_urls)
          ? docJson.angebot_rechnung_urls
          : [publicUrl],
        anhang_url: (docJson.anhang_url ?? publicUrl) as string | null,
      };
      setAuftraegeBoard((prev) => [merged, ...prev]);
      void loadTickets(true);
      if (!docRes.ok) {
        setCreateAuftragError(
          `Auftrag und PDF-Upload OK, Speichern der URL fehlgeschlagen: ${docJson.error ?? docRes.statusText}. Bitte im Auftrag prüfen.`
        );
        setCreateAuftragSubmitting(false);
        return;
      }
      setCreateAuftragOpen(false);
      resetCreateAuftragForm();
    } catch (e) {
      setCreateAuftragError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setCreateAuftragSubmitting(false);
    }
  }, [
    createAuftragMieterName,
    createAuftragEmail,
    createAuftragTelefon,
    createAuftragAdresse,
    createAuftragAufgabe,
    createAuftragNr,
    createAuftragGewerk,
    createAuftragRechnungsempfaenger,
    createAuftragLeistungsempfaenger,
    createAuftragPdfFile,
    resetCreateAuftragForm,
  ]);

  /** ISO-Datum zu datetime-local Wert (YYYY-MM-DDTHH:mm). */
  const toDateTimeLocal = (iso: string | null): string => {
    if (!iso) return "";
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day}T${h}:${min}`;
  };

  const openTicketDetailModal = (ticket: Ticket) => {
    setDetailTicket(ticket);
    setDetailKommentare(Array.isArray(ticket?.kommentare) ? ticket.kommentare : []);
    setNewKommentarText("");
    setDetailHistoryRows([]);
    setDetailAssignedTo(ticket?.assigned_to != null ? String(ticket.assigned_to) : "");
    setDetailTerminStart(toDateTimeLocal(ticket?.termin_start ?? null));
    setDetailTerminEnde(toDateTimeLocal(ticket?.termin_ende ?? null));
    setDetailHistorieNewDate(format(new Date(), "yyyy-MM-dd"));
    setDetailHistorieNewText("");
    const gewerkeArray = normalizeGewerke(ticket?.gewerk ?? null);
    setDetailGewerke(gewerkeArray);
    setDetailKundeName(ticket?.kunde_name ?? "");
    setDetailPartnerName(ticket?.partner_name ?? "");
    setDetailEmail(ticket?.kontakt_email ?? "");
    setDetailTelefon(ticket?.kontakt_telefon ?? "");
    setDetailAdresse(ticket?.objekt_adresse ?? "");
    setDetailBeschreibung(ticket?.beschreibung ?? "");
    setDetailAuftragDocs([]);
    setDetailAuftragAnhangUrl(null);
  };

  const handleHandwerkerAuftragPatch = useCallback((auftragId: string, patch: Partial<HandwerkerAuftrag>) => {
    setHandwerkerAuftragDetail((prev) =>
      prev?.id === auftragId ? { ...prev, ...patch } : prev
    );
    /** Kanban-Karten lesen aus `auftraegeBoard`, nicht nur aus dem Modal-State. */
    setAuftraegeBoard((prev) =>
      prev.map((a) => (a.id === auftragId ? { ...a, ...patch } : a))
    );
  }, []);

  const handleHandwerkerBoardGewerkSaved = useCallback((ticketId: string, gewerk: string[] | null) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, gewerk } : t)));
  }, []);

  const handleAuftragBoardGewerkSaved = useCallback((auftragId: string, gewerk: string[] | null) => {
    setAuftraegeBoard((prev) => prev.map((a) => (a.id === auftragId ? { ...a, gewerk } : a)));
    setHandwerkerAuftragDetail((prev) => (prev?.id === auftragId ? { ...prev, gewerk } : prev));
  }, []);

  const openAuftragBoardDetail = useCallback((a: HandwerkerAuftrag) => {
    setHandwerkerLinkedTicketId(null);
    setHandwerkerAuftragDetail(a);
  }, []);

  /** Aufträge (SPM) → Handwerker-Dialog; klassische Anfragen → Ticket-Modal. */
  const openDetailModal = (ticket: Ticket) => {
    const aid = ticket.additional_data?.auftrag_id;
    if (aid) {
      setHandwerkerLinkedTicketId(ticket.id);
      void (async () => {
        setHandwerkerAuftragLoading(true);
        try {
          const { data, error } = await supabase
            .from("auftraege")
            .select("*")
            .eq("id", aid)
            .single();
          if (error || !data) {
            setHandwerkerLinkedTicketId(null);
            toast({
              variant: "destructive",
              title: "Auftrag konnte nicht geladen werden",
              description: error?.message ?? "Bitte später erneut versuchen.",
            });
            openTicketDetailModal(ticket);
            return;
          }
          setHandwerkerAuftragDetail(
            normalizeAuftragRow(data as Record<string, unknown>) as HandwerkerAuftrag
          );
        } finally {
          setHandwerkerAuftragLoading(false);
        }
      })();
      return;
    }
    openTicketDetailModal(ticket);
  };

  /** SPM-Aufträge: angebot_rechnung_urls aus auftraege laden. */
  useEffect(() => {
    const auftragId = detailTicket?.additional_data?.auftrag_id;
    if (!auftragId) {
      setDetailAuftragDocs([]);
      setDetailAuftragAnhangUrl(null);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("auftraege")
        .select("angebot_rechnung_urls, anhang_url")
        .eq("id", auftragId)
        .single();
      const row = data as { angebot_rechnung_urls?: string[]; anhang_url?: string | null } | null;
      const urls = row?.angebot_rechnung_urls;
      setDetailAuftragDocs(Array.isArray(urls) ? urls : []);
      const ah = row?.anhang_url;
      setDetailAuftragAnhangUrl(typeof ah === "string" && ah.trim() !== "" ? ah.trim() : null);
    })();
  }, [detailTicket?.id, detailTicket?.additional_data?.auftrag_id]);

  /** Liste „Weitere Dateien“ ohne das Haupt-PDF (gleiche URL wie Auftrag-PDF / anhang_url). */
  const detailAuftragWeitereDateien = useMemo(() => {
    const primary = primaryAuftragAnhangUrl({
      anhang_url: detailAuftragAnhangUrl,
      angebot_rechnung_urls: detailAuftragDocs,
    });
    if (!primary) return detailAuftragDocs;
    const p = primary.trim();
    return detailAuftragDocs.filter((u) => (u ?? "").trim() !== p);
  }, [detailAuftragDocs, detailAuftragAnhangUrl]);

  const closeDetailModal = () => {
    if (detailTicket) {
      persistAssignedTo(detailTicket.id, detailAssignedTo);
      persistTermin(detailTicket.id, detailTerminStart || null, detailTerminEnde || null);
      if (adminUser?.role === "admin") {
        persistGewerke(detailTicket.id, detailGewerke);
      }
      if (detailKundenEditMode) {
        persistKundenInfo(detailTicket.id);
      }
    }
    setDetailTicket(null);
    setDetailKommentare([]);
    setNewKommentarText("");
    setDetailHistoryRows([]);
    setDetailAssignedTo("");
    setDetailTerminStart("");
    setDetailTerminEnde("");
    setDetailHistorieNewDate("");
    setDetailHistorieNewText("");
    setDetailGewerke([]);
    setDetailKundeName("");
    setDetailPartnerName("");
    setDetailEmail("");
    setDetailTelefon("");
    setDetailAdresse("");
    setDetailBeschreibung("");
    setDetailKundenEditMode(false);
    setDetailAuftragDocs([]);
    setDetailAuftragAnhangUrl(null);
  };

  /** Kunden-Daten speichern (auf Kassette-Klick) und Bearbeitungsmodus beenden. */
  const handleKundenSpeichern = async () => {
    if (!detailTicket?.id) return;
    setDetailSaving(true);
    await persistKundenInfo(detailTicket.id);
    setDetailKundenEditMode(false);
    setDetailSaving(false);
  };

  /** Markiert ein Ticket als „gesehen“ (blauer Punkt verschwindet). */
  const markOfferSeen = useCallback((ticketId: string) => {
    setOfferAttentionIds((prev) => {
      if (!prev.has(ticketId)) return prev;
      const next = new Set(prev);
      next.delete(ticketId);
      return next;
    });
  }, []);

  /** Historie-Eintrag manuell hinzufügen (DB + State). */
  const addHistorieEntry = async () => {
    if (!detailTicket?.id || !detailHistorieNewDate.trim() || !detailHistorieNewText.trim()) return;
    const entry: HistorieEintrag = { date: detailHistorieNewDate.trim(), text: detailHistorieNewText.trim() };
    const current = Array.isArray(detailTicket?.historie) ? detailTicket.historie : [];
    const newHistorie = [...current, entry];
    const { error } = await supabase.from("tickets").update({ historie: newHistorie }).eq("id", detailTicket.id);
    if (!error) {
      setTickets((prev) =>
        prev.map((t) => (t.id === detailTicket.id ? { ...t, historie: newHistorie } : t))
      );
      setDetailTicket((prev) => (prev?.id === detailTicket.id ? { ...prev, historie: newHistorie } : prev));
      setDetailHistorieNewText("");
    } else {
      setError(error.message);
    }
  };

  /** Speichert assigned_to in Supabase und aktualisiert sofort den lokalen State. */
  const persistAssignedTo = async (ticketId: string, assignedTo: string) => {
    setDetailSaving(true);
    const { error } = await supabase
      .from("tickets")
      .update({ assigned_to: assignedTo || null })
      .eq("id", ticketId);
    if (!error) {
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, assigned_to: assignedTo || null } : t))
      );
    } else {
      setError(error.message);
    }
    setDetailSaving(false);
  };

  /** Kommentar hinzufügen (DB + State). */
  const addKommentar = async () => {
    if (!detailTicket?.id || !newKommentarText.trim()) return;
    const entry: Kommentar = {
      id: crypto.randomUUID(),
      text: newKommentarText.trim(),
      author: "Admin",
      timestamp: new Date().toISOString(),
    };
    const updated = [...detailKommentare, entry];
    setDetailSaving(true);
    const { error } = await supabase
      .from("tickets")
      .update({ kommentare: updated })
      .eq("id", detailTicket.id);
    if (!error) {
      setDetailKommentare(updated);
      setTickets((prev) =>
        prev.map((t) => (t.id === detailTicket.id ? { ...t, kommentare: updated } : t))
      );
      setDetailTicket((prev) => (prev?.id === detailTicket.id ? { ...prev, kommentare: updated } : prev));
      setNewKommentarText("");
    } else {
      setError(error.message);
    }
    setDetailSaving(false);
  };

  /** Kommentar löschen (DB + State). */
  const deleteKommentar = async (kommentarId: string) => {
    if (!detailTicket?.id) return;
    const updated = detailKommentare.filter((k) => k.id !== kommentarId);
    setDetailSaving(true);
    const { error } = await supabase
      .from("tickets")
      .update({ kommentare: updated })
      .eq("id", detailTicket.id);
    if (!error) {
      setDetailKommentare(updated);
      setTickets((prev) =>
        prev.map((t) => (t.id === detailTicket.id ? { ...t, kommentare: updated } : t))
      );
      setDetailTicket((prev) => (prev?.id === detailTicket.id ? { ...prev, kommentare: updated } : prev));
    } else {
      setError(error.message);
    }
    setDetailSaving(false);
  };

  /** Termin speichern (termin_start, termin_ende), DB + setTickets + setDetailTicket. */
  const persistTermin = async (
    ticketId: string,
    terminStart: string | null,
    terminEnde: string | null
  ) => {
    const startIso = terminStart ? new Date(terminStart).toISOString() : null;
    const endIso = terminEnde ? new Date(terminEnde).toISOString() : null;
    const { error } = await supabase
      .from("tickets")
      .update({ termin_start: startIso, termin_ende: endIso })
      .eq("id", ticketId);
    if (!error) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, termin_start: startIso, termin_ende: endIso } : t
        )
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, termin_start: startIso, termin_ende: endIso } : null));
      }
    } else {
      setError(error.message);
    }
  };

  /** Gewerke speichern (Array in gewerk Spalte, DB: text[]). */
  const persistGewerke = async (ticketId: string, gewerke: string[]) => {
    const gewerkValue: string[] | null = gewerke.length > 0 ? gewerke : null;
    const { error } = await supabase
      .from("tickets")
      .update({ gewerk: gewerkValue })
      .eq("id", ticketId);
    if (!error) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, gewerk: gewerkValue } : t
        )
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, gewerk: gewerkValue } : null));
      }
    } else {
      setError(error.message);
    }
  };

  /** Kunden-Daten speichern (kunde_name, partner_name, kontakt_email, kontakt_telefon, objekt_adresse, beschreibung). */
  const persistKundenInfo = async (ticketId: string) => {
    const payload = {
      kunde_name: detailKundeName.trim() || null,
      partner_name: detailPartnerName.trim() || null,
      kontakt_email: detailEmail.trim() || null,
      kontakt_telefon: detailTelefon.trim() || null,
      objekt_adresse: detailAdresse.trim() || null,
      beschreibung: detailBeschreibung.trim() || null,
    };
    const { error } = await supabase
      .from("tickets")
      .update(payload)
      .eq("id", ticketId);
    if (!error) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, ...payload } : t
        )
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, ...payload } : null));
      }
    } else {
      setError(error.message);
    }
  };

  /** Beim Bestätigen eines Kalender-Drops: Status = Termin-Typ (Besichtigung/Ausführung), Termin + termin_typ speichern. */
  const assignTicketToSlot = useCallback(
    async (ticketId: string, startIso: string, endIso: string, terminTyp: "Besichtigung" | "Ausführung") => {
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket) return;
      const needsDisplayId = !ticket.ticket_display_id || String(ticket.ticket_display_id).trim() === "";
      const statusByTyp = terminTyp === TERMIN_TYP.BESICHTIGUNG ? STATUS.BESICHTIGUNG : STATUS.AUSFUEHRUNG;
      const updates: { status: string; ticket_display_id?: string; termin_start: string; termin_ende: string; termin_typ: string } = {
        status: statusByTyp,
        termin_start: startIso,
        termin_ende: endIso,
        termin_typ: terminTyp,
      };
      if (needsDisplayId) {
        updates.ticket_display_id = await getNextTicketDisplayId();
      }
      const { error } = await supabase.from("tickets").update(updates).eq("id", ticketId);
      if (error) {
        setError(error.message);
        return;
      }
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, ...updates } : t
        )
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, ...updates } : null));
        setDetailTerminStart(toDateTimeLocal(startIso));
        setDetailTerminEnde(toDateTimeLocal(endIso));
      }
    },
    [tickets, detailTicket?.id]
  );

  const handleDownloadImage = async (url: string, fallbackName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Download fehlgeschlagen:", response.statusText);
        return;
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fallbackName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download-Fehler:", err);
    }
  };

  const handleDownloadAllImages = async () => {
    if (!detailTicket?.image_urls || detailTicket.image_urls.length === 0) return;
    for (let idx = 0; idx < detailTicket.image_urls.length; idx++) {
      const url = detailTicket.image_urls[idx]!;
      const displayUrl = signedImageUrls[idx] ?? url;
      const fileLabel = `Bild-${idx + 1}.jpg`;
      await handleDownloadImage(displayUrl, fileLabel);
    }
  };

  /** Client-seitige Komprimierung: max 1920px längste Seite, JPEG Qualität 0.82. Spart Datenvolumen und Ladezeit. */
  const compressImageForUpload = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const MAX_SIZE = 1920;
        let { width, height } = img;
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width >= height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file as unknown as Blob);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : resolve(file as unknown as Blob)),
          "image/jpeg",
          0.82
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file as unknown as Blob);
      };
      img.src = url;
    });
  };

  /** Bild in Supabase Storage hochladen, Public-URL in ticket.image_urls speichern, lokalen State sofort aktualisieren. */
  const uploadTicketImage = async (ticketId: string, file: File) => {
    setUploadingImage(true);
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("[uploadTicketImage] auth.getUser error:", authError);
        setError("Nicht eingeloggt");
        setUploadingImage(false);
        return;
      }
      if (!authData?.user) {
        console.error("[uploadTicketImage] auth.getUser returned no user");
        setError("Nicht eingeloggt");
        setUploadingImage(false);
        return;
      }
    } catch (e) {
      console.error("[uploadTicketImage] auth.getUser exception:", e);
      setError("Nicht eingeloggt");
      setUploadingImage(false);
      return;
    }
    const isImage = file.type.startsWith("image/");
    const blob = isImage ? await compressImageForUpload(file) : (file as Blob);
    if (!blob || !(blob instanceof Blob)) {
      console.error("[uploadTicketImage] Invalid blob:", blob);
      setError("Ungültige Datei für Upload.");
      setUploadingImage(false);
      return;
    }
    const ext = "jpg";
    const filename = `${Date.now()}.${ext}`;
    const path = filename.replace(/^\/+/, "");
    const { error: uploadError } = await supabase.storage.from(BUCKET_TICKET_IMAGES).upload(path, blob, {
      cacheControl: "3600",
      upsert: true,
      contentType: isImage ? "image/jpeg" : file.type || "application/octet-stream",
    });
    if (uploadError) {
      console.error("[uploadTicketImage] Storage error:", uploadError);
      setError(uploadError.message);
      setUploadingImage(false);
      return;
    }
    const { data: urlData } = supabase.storage.from(BUCKET_TICKET_IMAGES).getPublicUrl(path);
    const publicUrl = urlData.publicUrl;
    const currentTicket = tickets.find((t) => t.id === ticketId);
    const newUrls = [...(currentTicket?.image_urls ?? []), publicUrl];
    const { error: updateError } = await supabase
      .from("tickets")
      .update({ image_urls: newUrls })
      .eq("id", ticketId);
    if (updateError) {
      setError(updateError.message);
      setUploadingImage(false);
      return;
    }
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, image_urls: [...(t.image_urls ?? []), publicUrl] } : t))
    );
    setDetailTicket((prev) =>
      prev?.id === ticketId ? { ...prev, image_urls: [...(prev.image_urls ?? []), publicUrl] } : prev
    );
    setUploadingImage(false);
  };

  /** SPM-Auftrag: Dateien (PDF, Bilder, …) in auftraege.angebot_rechnung_urls speichern (neueste URL zuerst). */
  const uploadAuftragDoc = async (
    auftragId: string,
    file: File,
    currentUrlsOverride?: string[]
  ): Promise<string[] | null> => {
    setUploadingAuftragDoc(true);
    setError(null);
    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        setError("Nicht eingeloggt");
        setUploadingAuftragDoc(false);
        return null;
      }
      if (!file || !(file instanceof Blob)) {
        setError("Ungültige Datei");
        setUploadingAuftragDoc(false);
        return null;
      }
      const isImage = file.type.startsWith("image/");
      const body: Blob = isImage ? await compressImageForUpload(file) : file;
      const ext = isImage ? "jpg" : attachmentFileExt(file);
      const contentType = isImage
        ? "image/jpeg"
        : file.type || "application/octet-stream";
      const path = `auftraege/docs/${auftragId}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_TICKET_IMAGES)
        .upload(path, body, {
          cacheControl: "3600",
          upsert: true,
          contentType,
        });
      if (uploadError) {
        setError(uploadError.message);
        setUploadingAuftragDoc(false);
        return null;
      }
      const { data: urlData } = supabase.storage.from(BUCKET_TICKET_IMAGES).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      const current = [...(currentUrlsOverride ?? detailAuftragDocs)];
      const newUrls = [publicUrl, ...current];
      const { data: existingRow } = await supabase
        .from("auftraege")
        .select("anhang_url")
        .eq("id", auftragId)
        .maybeSingle();
      const hasAnhang =
        String((existingRow as { anhang_url?: string | null } | null)?.anhang_url ?? "").trim() !== "";
      const anhangPatch: { anhang_url?: string } = {};
      if (!isImage && !hasAnhang) {
        anhangPatch.anhang_url = publicUrl;
      }
      const { error: updateError } = await supabase
        .from("auftraege")
        .update({ angebot_rechnung_urls: newUrls, ...anhangPatch })
        .eq("id", auftragId);
      if (updateError) {
        setError(updateError.message);
        setUploadingAuftragDoc(false);
        return null;
      }
      setDetailAuftragDocs(newUrls);
      if (anhangPatch.anhang_url) setDetailAuftragAnhangUrl(anhangPatch.anhang_url);
      setAuftraegeBoard((prev) =>
        prev.map((a) =>
          a.id === auftragId ? { ...a, angebot_rechnung_urls: newUrls, ...anhangPatch } : a
        )
      );
      setHandwerkerAuftragDetail((prev) =>
        prev?.id === auftragId ? { ...prev, angebot_rechnung_urls: newUrls, ...anhangPatch } : prev
      );
      setUploadingAuftragDoc(false);
      return newUrls;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload fehlgeschlagen");
    }
    setUploadingAuftragDoc(false);
    return null;
  };

  const handleConfirmRejection = async () => {
    if (!rejectionTicket) return;
    const reasonText =
      rejectionReason === "other"
        ? rejectionOtherText.trim() || "Sonstiger Grund"
        : REJECTION_REASONS.find((r) => r.value === rejectionReason)?.label ?? rejectionReason;
    const abgelehntAm = new Date().toISOString();
    setRejectingId(rejectionTicket.id);
    setError(null);
    try {
      const { error } = await supabase
        .from("tickets")
        .update({
          status: STATUS.ABGELEHNT,
          ablehnungs_grund: reasonText,
          abgelehnt_am: abgelehntAm,
        })
        .eq("id", rejectionTicket.id);
      if (error) {
        setError(error.message);
      } else {
        const email = (rejectionTicket.kontakt_email ?? "").trim();
        if (email) sendRejectionEmail(email, reasonText);
        closeRejectionModal(true);
        setTickets((prev) =>
          prev.map((t) =>
            t.id === rejectionTicket.id
              ? { ...t, status: STATUS.ABGELEHNT, ablehnungs_grund: reasonText, abgelehnt_am: abgelehntAm }
              : t
          )
        );
      }
    } finally {
      setRejectingId(null);
    }
  };

  /** Tickets ohne verknüpften SPM-Auftrag (Auftrag erscheint als eigene Karte). */
  const ticketsOnBoard = useMemo(
    () =>
      dedupeTicketsById(tickets.filter((t) => !ticketHasLinkedAuftrag(t))),
    [tickets]
  );

  const colIncomingCfg = BUSINESS_COLUMNS.find((c) => c.id === "incoming")!;
  const colCalendarCfg = BUSINESS_COLUMNS.find((c) => c.id === "calendar")!;
  const colNachbereitungCfg = BUSINESS_COLUMNS.find((c) => c.id === "nachbereitung")!;
  const colAbrechnungCfg = BUSINESS_COLUMNS.find((c) => c.id === "abrechnung")!;
  const colAbgelehntCfg = BUSINESS_COLUMNS.find((c) => c.id === "abgelehnt")!;
  const colArchivCfg = BUSINESS_COLUMNS.find((c) => c.id === "archiv")!;

  /** Status-Werte, die im Kalender (Spalte 2) erscheinen. */
  const calendarStatuses = useMemo(
    () => [colCalendarCfg.status, "Ticket", STATUS.BESICHTIGUNG, STATUS.AUSFUEHRUNG],
    [colCalendarCfg.status]
  );

  /** Spalte 1: Neue Anfragen (ohne Termin). Fallback: ungültiger/unbekannter Status → erste Spalte. */
  const col1Tickets = useMemo(
    () =>
      ticketsOnBoard
        .filter((t) => {
          const s = (t.status ?? "").trim();
          const hasTermin = (t.termin_start ?? "").trim() !== "";
          // Besichtigung in der Vergangenheit → wird visuell aus dem Kalender in "Angebote" überführt
          const inCol2 = hasTermin && calendarStatuses.includes(s) && !isKalkulationFaellig(t);
          const inCol3 = s === colNachbereitungCfg.status;
          const inCol4 = s === colAbrechnungCfg.status;
          const inCol5 = s === colAbgelehntCfg.status;
          const inCol6 = s === colArchivCfg.status;
          if (inCol2 || inCol3 || inCol4 || inCol5 || inCol6) return false;
          return true;
        })
        .sort(sortByPositionThenCreatedAt),
    [
      ticketsOnBoard,
      calendarStatuses,
      colNachbereitungCfg.status,
      colAbrechnungCfg.status,
      colAbgelehntCfg.status,
      colArchivCfg.status,
    ]
  );

  /** Aufträge im gleichen räumlichen Bucket wie Spalte 1 (noch nicht in 2–6 / Kalender). */
  const col1AuftraegeInBucket = useMemo(
    () =>
      auftraegeBoard.filter((a) => {
        const s = auftragBoardStatus(a);
        const hasTermin = (a.termin_start ?? "").trim() !== "";
        const inCol2 = hasTermin && calendarStatuses.includes(s) && !isKalkulationFaelligAuftrag(a);
        const inCol3 = s === colNachbereitungCfg.status;
        const inCol4 = s === colAbrechnungCfg.status;
        const inCol5 = s === colAbgelehntCfg.status;
        const inCol6 = s === colArchivCfg.status;
        if (inCol2 || inCol3 || inCol4 || inCol5 || inCol6) return false;
        return true;
      }),
    [
      auftraegeBoard,
      calendarStatuses,
      colNachbereitungCfg.status,
      colAbrechnungCfg.status,
      colAbgelehntCfg.status,
      colArchivCfg.status,
    ]
  );

  /** Spalte 1 Tab "Eingang": status Anfrage ODER Eingeteilt (ohne Termin). */
  const col1EingangTickets = useMemo(
    () =>
      col1Tickets.filter(
        (t) => {
          const s = (t.status ?? "").trim();
          const hasTermin = (t.termin_start ?? "").trim() !== "";
          // Zeige Anfragen und Eingeteilt-Tickets ohne Termin (die noch nicht im Kalender sind)
          return s === STATUS.ANFRAGE || (s === STATUS.EINGETEILT && !hasTermin);
        }
      ),
    [col1Tickets]
  );

  const col1EingangAuftraege = useMemo(
    () =>
      col1AuftraegeInBucket
        .filter((a) => {
          const s = auftragBoardStatus(a);
          const hasTermin = (a.termin_start ?? "").trim() !== "";
          return s === STATUS.ANFRAGE || (s === STATUS.EINGETEILT && !hasTermin);
        })
        .sort(sortAuftraegeByBoardPosition),
    [col1AuftraegeInBucket]
  );

  /** Spalte 1 Tab "Angebote": status Angebot_erstellt ODER Besichtigung mit abgelaufenem Termin. */
  const col1AngeboteTickets = useMemo(() => {
    const filtered = col1Tickets.filter(
      (t) =>
        (t.status ?? "").trim() === STATUS.ANGEBOT_ERSTELLT || isKalkulationFaellig(t)
    );
    // Sortierung: Fällige Kalkulationen (abgelaufene Termine) zuerst
    return filtered.sort((a, b) => {
      const aFaellig = isKalkulationFaellig(a);
      const bFaellig = isKalkulationFaellig(b);
      if (aFaellig && !bFaellig) return -1;
      if (!aFaellig && bFaellig) return 1;
      // Bei fälligen: die "gerade abgelaufenen" zuerst (termin_ende am nächsten zu now)
      if (aFaellig && bFaellig) {
        const ae = a.termin_ende ? new Date(a.termin_ende).getTime() : 0;
        const be = b.termin_ende ? new Date(b.termin_ende).getTime() : 0;
        return be - ae;
      }
      // Sonst: nach Position/Created-At sortieren
      return sortByPositionThenCreatedAt(a, b);
    });
  }, [col1Tickets]);

  const col1AngeboteAuftraege = useMemo(
    () =>
      col1AuftraegeInBucket
        .filter(
          (a) =>
            auftragBoardStatus(a) === STATUS.ANGEBOT_ERSTELLT || isKalkulationFaelligAuftrag(a)
        )
        .sort((a, b) => {
          const aF = isKalkulationFaelligAuftrag(a);
          const bF = isKalkulationFaelligAuftrag(b);
          if (aF && !bF) return -1;
          if (!aF && bF) return 1;
          if (aF && bF) {
            const ae = a.termin_ende ? new Date(a.termin_ende).getTime() : 0;
            const be = b.termin_ende ? new Date(b.termin_ende).getTime() : 0;
            return be - ae;
          }
          return sortAuftraegeByBoardPosition(a, b);
        }),
    [col1AuftraegeInBucket]
  );

  const col1EingangTicketsView = useMemo(
    () => filterTicketsByBoardSearch(col1EingangTickets, boardSearchNeedle),
    [col1EingangTickets, boardSearchNeedle]
  );
  const col1AngeboteTicketsView = useMemo(
    () => filterTicketsByBoardSearch(col1AngeboteTickets, boardSearchNeedle),
    [col1AngeboteTickets, boardSearchNeedle]
  );
  const col1EingangAuftraegeView = useMemo(
    () => filterAuftraegeByBoardSearch(col1EingangAuftraege, boardSearchNeedle),
    [col1EingangAuftraege, boardSearchNeedle]
  );
  const col1AngeboteAuftraegeView = useMemo(
    () => filterAuftraegeByBoardSearch(col1AngeboteAuftraege, boardSearchNeedle),
    [col1AngeboteAuftraege, boardSearchNeedle]
  );

  /** Spalte 2: Terminplaner – Tickets mit Termin (Eingeteilt, Besichtigung, Ausführung). */
  const col2Tickets = useMemo(
    () =>
      ticketsOnBoard.filter((t) => {
        const hasTermin = (t.termin_start ?? "").trim() !== "";
        const s = (t.status ?? "").trim();
        // Abgelaufene Besichtigungen werden im UI nicht mehr im Kalender geführt
        return hasTermin && calendarStatuses.includes(s) && !isKalkulationFaellig(t);
      }),
    [ticketsOnBoard, calendarStatuses]
  );

  const col2Auftraege = useMemo(
    () =>
      auftraegeBoard.filter((a) => {
        const hasTermin = (a.termin_start ?? "").trim() !== "";
        const s = auftragBoardStatus(a);
        return hasTermin && calendarStatuses.includes(s) && !isKalkulationFaelligAuftrag(a);
      }),
    [auftraegeBoard, calendarStatuses]
  );

  /** Spalte 3: Nachbereitung & Doku (Status aus Business-Config). */
  const col3Tickets = useMemo(
    () =>
      ticketsOnBoard
        .filter((t) => (t.status ?? "").trim() === colNachbereitungCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [ticketsOnBoard, colNachbereitungCfg.status]
  );

  const col3Auftraege = useMemo(
    () =>
      auftraegeBoard
        .filter((a) => auftragBoardStatus(a) === colNachbereitungCfg.status)
        .sort(sortAuftraegeByBoardPosition),
    [auftraegeBoard, colNachbereitungCfg.status]
  );

  /** Spalte 4: Erledigt & Abrechnung (Status aus Business-Config). */
  const col4Tickets = useMemo(
    () =>
      ticketsOnBoard
        .filter((t) => (t.status ?? "").trim() === colAbrechnungCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [ticketsOnBoard, colAbrechnungCfg.status]
  );

  const col4Auftraege = useMemo(
    () =>
      auftraegeBoard
        .filter((a) => auftragBoardStatus(a) === colAbrechnungCfg.status)
        .sort(sortAuftraegeByBoardPosition),
    [auftraegeBoard, colAbrechnungCfg.status]
  );

  /** Spalte 5: Abgelehnt (Status aus Business-Config). */
  const col5Tickets = useMemo(
    () =>
      ticketsOnBoard
        .filter((t) => (t.status ?? "").trim() === colAbgelehntCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [ticketsOnBoard, colAbgelehntCfg.status]
  );

  const col5Auftraege = useMemo(
    () =>
      auftraegeBoard
        .filter((a) => auftragBoardStatus(a) === colAbgelehntCfg.status)
        .sort(sortAuftraegeByBoardPosition),
    [auftraegeBoard, colAbgelehntCfg.status]
  );

  /** Spalte 6: Archiv (Status aus Business-Config). */
  const col6Tickets = useMemo(
    () =>
      ticketsOnBoard
        .filter((t) => (t.status ?? "").trim() === colArchivCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [ticketsOnBoard, colArchivCfg.status]
  );

  const col6Auftraege = useMemo(
    () =>
      auftraegeBoard
        .filter((a) => auftragBoardStatus(a) === colArchivCfg.status)
        .sort(sortAuftraegeByBoardPosition),
    [auftraegeBoard, colArchivCfg.status]
  );

  /** Kalender-Events: Tickets + Aufträge mit termin_start in Spalte-2-Logik. */
  const calendarEvents = useMemo((): WeekEvent[] => {
    const tTickets = filterTicketsByBoardSearch(col2Tickets, boardSearchNeedle);
    const tAuftraege = filterAuftraegeByBoardSearch(col2Auftraege, boardSearchNeedle);
    const fromTickets = tTickets
      .filter((t) => t.termin_start != null && t.termin_start.trim() !== "")
      .map((t) => ({
        id: t.id,
        resourceKind: "ticket" as const,
        title: `${getTicketDisplayName(t)}${getTicketOrAuftragNumber(t) !== "–" ? ` (${getTicketOrAuftragNumber(t)})` : ""}`,
        start: new Date(t.termin_start!),
        end: t.termin_ende ? new Date(t.termin_ende) : new Date(t.termin_start!),
        resource: t,
      }));
    const fromAuftraege = tAuftraege
      .filter((a) => (a.termin_start ?? "").trim() !== "")
      .map((a) => ({
        id: `auftrag-${a.id}`,
        resourceKind: "auftrag" as const,
        title: `${getAuftragCardTitle(a)}${
          (a.auftragsnummer ?? "").trim() ? ` (${(a.auftragsnummer ?? "").trim()})` : ""
        }`,
        start: new Date(a.termin_start!),
        end: a.termin_ende ? new Date(a.termin_ende) : new Date(a.termin_start!),
        resource: a,
      }));
    return [...fromTickets, ...fromAuftraege];
  }, [col2Tickets, col2Auftraege, boardSearchNeedle]);

  /** Setzt nur den Status / Spalte. Bei Statuswechsel erscheint das Ticket in der Zielspalte ganz oben. */
  const setTicketStatus = useCallback(
    async (ticketId: string, newStatus: string) => {
      const current = tickets.find((t) => t.id === ticketId);
      if (!current) return;

      const trimmedNew = (newStatus ?? "").trim();
      const trimmedOld = (current.status ?? "").trim();

      const payload: Record<string, unknown> = { status: trimmedNew };

      // Wenn die Spalte wirklich gewechselt wird, Position so setzen,
      // dass das Ticket in der neuen Spalte ganz oben erscheint.
      if (trimmedOld !== trimmedNew) {
        const targetTickets = tickets.filter((t) => (t.status ?? "").trim() === trimmedNew);
        if (targetTickets.length === 0) {
          payload.position = 10;
        } else {
          const minPos = Math.min(
            ...targetTickets.map((t) => {
              const k = kanbanPositionSortKey(t.position);
              return k === Number.MAX_SAFE_INTEGER ? 10 : k;
            })
          );
          payload.position = minPos - 10;
        }
      }

      const { error } = await supabase.from("tickets").update(payload).eq("id", ticketId);
      if (error) {
        setError(error.message);
        return;
      }
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? ({ ...t, ...payload } as Ticket) : t))
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? ({ ...prev, ...payload } as Ticket) : null));
      }
    },
    [tickets, detailTicket?.id]
  );

  // ─── Hilfsfunktion: Spalten-Konfiguration aus Business-Config (alle Kanban-Spalten) ───
  const columnConfigs = useMemo(() => {
    return BUSINESS_COLUMNS.filter((c) => c.kind === "kanban").map((cfg) => {
      let ticketsForCol: Ticket[];
      let auftraegeForCol: HandwerkerAuftrag[];
      switch (cfg.id) {
        case "incoming":
          ticketsForCol = col1Tickets;
          auftraegeForCol = col1AuftraegeInBucket;
          break;
        case "calendar":
          ticketsForCol = col2Tickets;
          auftraegeForCol = col2Auftraege;
          break;
        case "nachbereitung":
          ticketsForCol = col3Tickets;
          auftraegeForCol = col3Auftraege;
          break;
        case "abrechnung":
          ticketsForCol = col4Tickets;
          auftraegeForCol = col4Auftraege;
          break;
        case "abgelehnt":
          ticketsForCol = col5Tickets;
          auftraegeForCol = col5Auftraege;
          break;
        case "archiv":
          ticketsForCol = col6Tickets;
          auftraegeForCol = col6Auftraege;
          break;
        default:
          ticketsForCol = ticketsOnBoard
            .filter((t) => (t.status ?? "").trim() === cfg.status)
            .sort(sortByPositionThenCreatedAt);
          auftraegeForCol = auftraegeBoard
            .filter((a) => auftragBoardStatus(a) === cfg.status)
            .sort(sortAuftraegeByBoardPosition);
      }
      return {
        colId: cfg.droppableId,
        tickets: ticketsForCol,
        auftraege: auftraegeForCol,
        status: cfg.status,
      };
    });
  }, [
    col1Tickets,
    col1AuftraegeInBucket,
    col2Tickets,
    col2Auftraege,
    col3Tickets,
    col3Auftraege,
    col4Tickets,
    col4Auftraege,
    col5Tickets,
    col5Auftraege,
    col6Tickets,
    col6Auftraege,
    ticketsOnBoard,
    auftraegeBoard,
  ]);

  /** Findet die Spalten-Config für ein gegebenes overId (Spalte oder Karte). */
  const resolveColumnForOverId = useCallback(
    (overId: string): { config: (typeof columnConfigs)[number]; targetDndId?: string } | null => {
      if (overId === COLUMN_IDS[0] || overId === "column-eingang-mobile" || overId === "column-1-mobile-list") {
        return { config: columnConfigs[0]! };
      }
      for (const cfg of columnConfigs) {
        if (overId === cfg.colId) return { config: cfg };
      }
      if (overId.startsWith("ticket-")) {
        const uuid = overId.replace(/^ticket-/, "");
        for (const cfg of columnConfigs) {
          if (cfg.tickets.some((t) => t.id === uuid)) {
            return { config: cfg, targetDndId: overId };
          }
        }
      }
      if (overId.startsWith("auftrag-")) {
        const uuid = overId.replace(/^auftrag-/, "");
        for (const cfg of columnConfigs) {
          if (cfg.auftraege.some((a) => a.id === uuid)) {
            return { config: cfg, targetDndId: overId };
          }
        }
      }
      return null;
    },
    [columnConfigs]
  );

  /** Persistiert Status + Position in Supabase und aktualisiert den lokalen State. */
  const moveTicketToColumn = useCallback(
    async (ticketId: string, newStatus: string, newPosition: number, extras?: Record<string, unknown>) => {
      const payload: Record<string, unknown> = { status: newStatus, position: newPosition, ...extras };
      const { error } = await supabase.from("tickets").update(payload).eq("id", ticketId);
      if (error) {
        setError(error.message);
        return;
      }
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, ...payload } as Ticket : t))
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, ...payload } as Ticket : null));
      }
    },
    [detailTicket?.id]
  );

  const moveAuftragToColumn = useCallback(
    async (auftragId: string, newBoardStatus: string, newBoardPosition: number, extras?: Record<string, unknown>) => {
      const payload: Record<string, unknown> = {
        board_status: newBoardStatus,
        board_position: newBoardPosition,
        ...extras,
      };
      const { error } = await supabase.from("auftraege").update(payload).eq("id", auftragId);
      if (error) {
        setError(error.message);
        return;
      }
      setAuftraegeBoard((prev) =>
        prev.map((a) => (a.id === auftragId ? { ...a, ...payload } as HandwerkerAuftrag : a))
      );
      setHandwerkerAuftragDetail((prev) =>
        prev?.id === auftragId ? { ...prev, ...payload } as HandwerkerAuftrag : prev
      );
    },
    []
  );

  const assignAuftragToSlot = useCallback(
    async (auftragId: string, startIso: string, endIso: string, terminTyp: "Besichtigung" | "Ausführung") => {
      const statusByTyp = terminTyp === TERMIN_TYP.BESICHTIGUNG ? STATUS.BESICHTIGUNG : STATUS.AUSFUEHRUNG;
      const updates: Record<string, unknown> = {
        board_status: statusByTyp,
        termin_start: startIso,
        termin_ende: endIso,
        termin_typ: terminTyp,
      };
      const { error } = await supabase.from("auftraege").update(updates).eq("id", auftragId);
      if (error) {
        setError(error.message);
        return;
      }
      setAuftraegeBoard((prev) =>
        prev.map((a) => (a.id === auftragId ? { ...a, ...updates } as HandwerkerAuftrag : a))
      );
      setHandwerkerAuftragDetail((prev) =>
        prev?.id === auftragId ? { ...prev, ...updates } as HandwerkerAuftrag : prev
      );
    },
    []
  );

  /** Drag end: Karte zwischen Spalten verschieben, auf Kalender-Slot droppen, etc. */
  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setDropTargetSlot(null);
      setActiveDragId(null);
      setManualOverCol(null);
      setDropIndicator(null);
      lastIndicatorKey.current = "";
      const activeId = event.active?.id as string | undefined;
      let overId = event.over?.id as string | undefined;

      // ─── DOM-Override: IMMER prüfen, auch wenn overId undefined ist ───
      // Falls @dnd-kit keinen Container findet (passiert bei Spalten 3-6),
      // ermitteln wir die Zielspalte direkt per DOM.
      const activatorEvent = event.activatorEvent as PointerEvent | MouseEvent | TouchEvent | undefined;
      let pointerX = 0, pointerY = 0;
      if (activatorEvent) {
        const deltaX = event.delta?.x ?? 0;
        const deltaY = event.delta?.y ?? 0;
        if ("clientX" in activatorEvent) {
          pointerX = activatorEvent.clientX + deltaX;
          pointerY = activatorEvent.clientY + deltaY;
        } else if ("touches" in activatorEvent && activatorEvent.touches?.[0]) {
          pointerX = activatorEvent.touches[0].clientX + deltaX;
          pointerY = activatorEvent.touches[0].clientY + deltaY;
        }
      }

      // DOM-Override NUR für Ticket-Karten-Drags, NICHT für Kalender-Event-Drags.
      // Kalender-Events (event-*) sollen ihre Slot-Ziele behalten.
      const isDraggingFromCalendar = activeId?.startsWith("event-");
      if ((pointerX > 0 || pointerY > 0) && !isDraggingFromCalendar) {
        const detectedCol = detectColumnAtPoint(pointerX, pointerY);
        if (detectedCol) {
          if (!overId) {
            // Kein Ziel erkannt → Spalte setzen
            overId = detectedCol;
          } else if (overId === detectedCol) {
            // Bereits korrekte Spalte → nichts tun
          } else if (overId.startsWith("ticket-") || overId.startsWith("auftrag-")) {
            const resolvedOver = resolveColumnForOverId(overId);
            const overColId = resolvedOver?.config.colId;
            if (overColId !== detectedCol) {
              overId = detectedCol;
            }
          } else if (overId !== detectedCol) {
            // overId ist ein Slot oder eine falsche Spalte → Override
            overId = detectedCol;
          }
        }
      }

      if (!activeId || !overId) {
        console.warn("[DnD] handleDragEnd EARLY EXIT – missing activeId or overId");
        return;
      }

      type DragEntity = { kind: "ticket"; ticket: Ticket } | { kind: "auftrag"; auftrag: HandwerkerAuftrag };

      const parseEntity = (): DragEntity | null => {
        if (activeId.startsWith("ticket-")) {
          const id = activeId.replace(/^ticket-/, "");
          const ticket = tickets.find((t) => t.id === id);
          return ticket ? { kind: "ticket", ticket } : null;
        }
        if (activeId.startsWith("auftrag-")) {
          const id = activeId.replace(/^auftrag-/, "");
          const auftrag = auftraegeBoard.find((a) => a.id === id);
          return auftrag ? { kind: "auftrag", auftrag } : null;
        }
        if (activeId.startsWith("event-")) {
          const raw = activeId.replace(/^event-/, "");
          if (raw.startsWith("auftrag-")) {
            const id = raw.replace(/^auftrag-/, "");
            const auftrag = auftraegeBoard.find((a) => a.id === id);
            return auftrag ? { kind: "auftrag", auftrag } : null;
          }
          const ticket = tickets.find((t) => t.id === raw);
          return ticket ? { kind: "ticket", ticket } : null;
        }
        return null;
      };

      const entity = parseEntity();
      if (!entity) {
        console.warn("[DnD] Unbekannte oder fehlende Ressource für activeId:", activeId);
        return;
      }

      const isFromCalendar = activeId.startsWith("event-");
      const wasNachbereitung =
        entity.kind === "ticket"
          ? (entity.ticket.status ?? "").trim() === STATUS.NACHBEREITUNG
          : auftragBoardStatus(entity.auftrag) === STATUS.NACHBEREITUNG;

      // ─── Karte auf Spalte oder Karte (Trello-Style) ───
      const resolved = resolveColumnForOverId(overId);
      if (resolved && !overId.startsWith("slot-")) {
        const { config } = resolved;
        const sourceColumn =
          entity.kind === "ticket"
            ? columnConfigs.find((cfg) => cfg.tickets.some((t) => t.id === entity.ticket.id)) ?? null
            : columnConfigs.find((cfg) => cfg.auftraege.some((a) => a.id === entity.auftrag.id)) ?? null;
        const isSameColumn = sourceColumn?.colId === config.colId;
        const insertBeforeDndId =
          dropIndicator && dropIndicator.colId === config.colId
            ? dropIndicator.insertBeforeId ?? undefined
            : resolved.targetDndId;

        const isCol1Target =
          config.colId === COLUMN_IDS[0] || overId === "column-eingang-mobile" || overId === "column-1-mobile-list";

        let visTickets = config.tickets;
        let visAuftraege = config.auftraege;
        if (isCol1Target) {
          visTickets = incomingTab === "Eingang" ? col1EingangTickets : col1AngeboteTickets;
          visAuftraege = incomingTab === "Eingang" ? col1EingangAuftraege : col1AngeboteAuftraege;
        }

        const draggedDndId =
          entity.kind === "ticket" ? `ticket-${entity.ticket.id}` : `auftrag-${entity.auftrag.id}`;

        if (entity.kind === "ticket") {
          const ticketId = entity.ticket.id;
          const newPosition = computeMergedColumnPosition(
            visTickets,
            visAuftraege,
            draggedDndId,
            insertBeforeDndId
          );
          if (isSameColumn) {
            const currentStatus = (entity.ticket.status ?? "").trim() || config.status;
            await moveTicketToColumn(ticketId, currentStatus, newPosition);
          } else if (isCol1Target) {
            await moveTicketToColumn(ticketId, STATUS.ANFRAGE, newPosition, {
              termin_start: null,
              termin_ende: null,
              termin_typ: null,
            });
            if (detailTicket?.id === ticketId) {
              setDetailTerminStart("");
              setDetailTerminEnde("");
            }
          } else {
            await moveTicketToColumn(ticketId, config.status, newPosition);
          }
        } else {
          const auftragId = entity.auftrag.id;
          const newBoardPosition = computeMergedColumnPosition(
            visTickets,
            visAuftraege,
            draggedDndId,
            insertBeforeDndId
          );
          if (isSameColumn) {
            const currentBoard = auftragBoardStatus(entity.auftrag) || config.status;
            await moveAuftragToColumn(auftragId, currentBoard, newBoardPosition);
          } else if (isCol1Target) {
            await moveAuftragToColumn(auftragId, STATUS.ANFRAGE, newBoardPosition, {
              termin_start: null,
              termin_ende: null,
              termin_typ: null,
            });
          } else {
            await moveAuftragToColumn(auftragId, config.status, newBoardPosition);
          }
        }
        return;
      }

      // ─── Kalender-Slot ───
      if (!overId.startsWith("slot-")) return;
      const match = overId.match(/^slot-(\d+)-(\d+)$/);
      if (!match) return;
      const dayIndex = parseInt(match[1], 10);
      const slotIndex = parseInt(match[2], 10);
      const slotDate = add(weekStart, { days: dayIndex });
      const slotStart = setMinutes(setHours(slotDate, CALENDAR_HOUR_START), slotIndex * SLOT_MINUTES);
      const slotEnd = add(slotStart, { hours: 1 });

      if (slotStart < new Date()) {
        alert(`Dieser Zeitraum liegt in der Vergangenheit (${format(slotStart, "dd.MM.yyyy HH:mm", { locale: de })}). Bitte wähle einen zukünftigen Termin.`);
        return;
      }

      const localStart = format(slotStart, "yyyy-MM-dd'T'HH:mm");
      const localEnd = format(slotEnd, "yyyy-MM-dd'T'HH:mm");

      if (isFromCalendar) {
        if (entity.kind === "ticket") {
          const ticketId = entity.ticket.id;
          const origStart = entity.ticket.termin_start ? new Date(entity.ticket.termin_start) : null;
          const origEnd = entity.ticket.termin_ende ? new Date(entity.ticket.termin_ende) : null;
          const durationMs = origStart && origEnd ? origEnd.getTime() - origStart.getTime() : 60 * 60 * 1000;
          const newEndCal = new Date(slotStart.getTime() + durationMs);
          const startIso = slotStart.toISOString();
          const endIso = newEndCal.toISOString();
          const calUpdates: Record<string, unknown> = {
            termin_start: startIso,
            termin_ende: endIso,
            status: STATUS.EINGETEILT,
            termin_typ: entity.ticket.termin_typ ?? null,
          };
          const { error: dbErr } = await supabase.from("tickets").update(calUpdates).eq("id", ticketId);
          if (!dbErr) {
            setTickets((prev) =>
              prev.map((t) => (t.id === ticketId ? { ...t, ...calUpdates } as Ticket : t))
            );
            if (detailTicket?.id === ticketId) {
              setDetailTicket((prev) => (prev ? { ...prev, ...calUpdates } as Ticket : null));
              setDetailTerminStart(toDateTimeLocal(startIso));
              setDetailTerminEnde(toDateTimeLocal(endIso));
            }
          } else {
            setError(dbErr.message);
          }
        } else {
          const auftragId = entity.auftrag.id;
          const origStart = entity.auftrag.termin_start ? new Date(entity.auftrag.termin_start) : null;
          const origEnd = entity.auftrag.termin_ende ? new Date(entity.auftrag.termin_ende) : null;
          const durationMs = origStart && origEnd ? origEnd.getTime() - origStart.getTime() : 60 * 60 * 1000;
          const newEndCal = new Date(slotStart.getTime() + durationMs);
          const startIso = slotStart.toISOString();
          const endIso = newEndCal.toISOString();
          const calUpdates: Record<string, unknown> = {
            termin_start: startIso,
            termin_ende: endIso,
            board_status: STATUS.EINGETEILT,
            termin_typ: entity.auftrag.termin_typ ?? null,
          };
          const { error: dbErr } = await supabase.from("auftraege").update(calUpdates).eq("id", auftragId);
          if (!dbErr) {
            setAuftraegeBoard((prev) =>
              prev.map((a) => (a.id === auftragId ? { ...a, ...calUpdates } as HandwerkerAuftrag : a))
            );
            setHandwerkerAuftragDetail((prev) =>
              prev?.id === auftragId ? { ...prev, ...calUpdates } as HandwerkerAuftrag : prev
            );
          } else {
            setError(dbErr.message);
          }
        }
      } else {
        setPendingTerminStart(roundDateTimeTo15Min(localStart));
        setPendingTerminEnde(roundDateTimeTo15Min(localEnd));
        setPendingTerminTyp(null);
        if (entity.kind === "ticket") {
          setPendingSlotDrop({
            kind: "ticket",
            ticketId: entity.ticket.id,
            ticket: entity.ticket,
            slotStart,
            slotEnd,
            wasNachbereitung,
          });
        } else {
          setPendingSlotDrop({
            kind: "auftrag",
            auftragId: entity.auftrag.id,
            auftrag: entity.auftrag,
            slotStart,
            slotEnd,
            wasNachbereitung,
          });
        }
      }
    },
    [
      weekStart,
      detailTicket?.id,
      tickets,
      auftraegeBoard,
      columnConfigs,
      incomingTab,
      col1EingangTickets,
      col1EingangAuftraege,
      col1AngeboteTickets,
      col1AngeboteAuftraege,
      resolveColumnForOverId,
      moveTicketToColumn,
      moveAuftragToColumn,
      dropIndicator,
      toDateTimeLocal,
    ]
  );

  /** Bestätigt den Termin aus dem Zeitfenster-Dialog und speichert in DB (mit termin_typ). */
  const confirmSlotDrop = useCallback(async () => {
    if (!pendingSlotDrop || !pendingTerminTyp) return;
    const startDate = new Date(pendingTerminStart);
    const endDate = new Date(pendingTerminEnde);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert("Bitte gültige Start- und Endzeit eingeben.");
      return;
    }
    if (endDate <= startDate) {
      alert("Die Endzeit muss nach der Startzeit liegen.");
      return;
    }
    if (startDate < new Date()) {
      alert("Der Startzeitpunkt darf nicht in der Vergangenheit liegen.");
      return;
    }

    const startIso = startDate.toISOString();
    const endIso = endDate.toISOString();
    const statusByTyp = pendingTerminTyp === TERMIN_TYP.BESICHTIGUNG ? STATUS.BESICHTIGUNG : STATUS.AUSFUEHRUNG;

    if (pendingSlotDrop.kind === "ticket") {
      const { ticketId, ticket, wasNachbereitung } = pendingSlotDrop;
      if (wasNachbereitung && ticket.termin_start) {
        const prevStart = ticket.termin_start;
        const prevEnd = ticket.termin_ende;
        const historieEntry: HistorieEintrag = {
          date: prevStart.slice(0, 10),
          text: `Termin war ${format(new Date(prevStart), "dd.MM.yyyy HH:mm", { locale: de })} – ${prevEnd ? format(new Date(prevEnd), "HH:mm", { locale: de }) : "?"}`,
        };
        const currentHistorie = Array.isArray(ticket.historie) ? ticket.historie : [];
        const newHistorie = [...currentHistorie, historieEntry];
        const { error: dbErr } = await supabase
          .from("tickets")
          .update({ termin_start: startIso, termin_ende: endIso, termin_typ: pendingTerminTyp, status: statusByTyp, historie: newHistorie })
          .eq("id", ticketId);
        if (!dbErr) {
          setTickets((prev) =>
            prev.map((t) =>
              t.id === ticketId
                ? { ...t, termin_start: startIso, termin_ende: endIso, termin_typ: pendingTerminTyp, status: statusByTyp, historie: newHistorie }
                : t
            )
          );
          if (detailTicket?.id === ticketId) {
            setDetailTicket((prev) => (prev ? { ...prev, termin_start: startIso, termin_ende: endIso, termin_typ: pendingTerminTyp, status: statusByTyp, historie: newHistorie } : null));
            setDetailTerminStart(toDateTimeLocal(startIso));
            setDetailTerminEnde(toDateTimeLocal(endIso));
          }
        } else setError(dbErr.message);
      } else {
        await assignTicketToSlot(ticketId, startIso, endIso, pendingTerminTyp);
      }
    } else {
      const { auftragId, auftrag, wasNachbereitung } = pendingSlotDrop;
      if (wasNachbereitung && auftrag.termin_start) {
        const { error: dbErr } = await supabase
          .from("auftraege")
          .update({
            termin_start: startIso,
            termin_ende: endIso,
            termin_typ: pendingTerminTyp,
            board_status: statusByTyp,
          })
          .eq("id", auftragId);
        if (!dbErr) {
          setAuftraegeBoard((prev) =>
            prev.map((a) =>
              a.id === auftragId
                ? {
                    ...a,
                    termin_start: startIso,
                    termin_ende: endIso,
                    termin_typ: pendingTerminTyp,
                    board_status: statusByTyp,
                  }
                : a
            )
          );
          setHandwerkerAuftragDetail((prev) =>
            prev?.id === auftragId
              ? {
                  ...prev,
                  termin_start: startIso,
                  termin_ende: endIso,
                  termin_typ: pendingTerminTyp,
                  board_status: statusByTyp,
                }
              : prev
          );
        } else setError(dbErr.message);
      } else {
        await assignAuftragToSlot(auftragId, startIso, endIso, pendingTerminTyp);
      }
    }
    setPendingSlotDrop(null);
    setPendingTerminTyp(null);
  }, [
    pendingSlotDrop,
    pendingTerminTyp,
    pendingTerminStart,
    pendingTerminEnde,
    assignTicketToSlot,
    assignAuftragToSlot,
    detailTicket?.id,
    toDateTimeLocal,
  ]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(String(event.active.id));
    setManualOverCol(null);
    setDropIndicator(null);
    lastIndicatorKey.current = "";
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const overId = event.over?.id as string | undefined;
    if (overId && typeof overId === "string" && overId.startsWith("slot-")) {
      const match = overId.match(/^slot-(\d+)-(\d+)$/);
      if (match) setDropTargetSlot({ dayIndex: parseInt(match[1], 10), slotIndex: parseInt(match[2], 10) });
    } else setDropTargetSlot(null);
  }, []);

  /** onDragMove: Feuert bei JEDER Mausbewegung → manuelle Spalten-Erkennung + Drop-Indicator per DOM. */
  const lastManualCol = useRef<string | null>(null);
  const lastIndicatorKey = useRef<string>("");
  const handleDragMove = useCallback((event: { activatorEvent: Event; delta: { x: number; y: number } }) => {
    const activatorEvent = event.activatorEvent as PointerEvent | MouseEvent | TouchEvent | undefined;
    const deltaX = event.delta?.x ?? 0;
    const deltaY = event.delta?.y ?? 0;
    let px = 0, py = 0;
    if (activatorEvent) {
      if ("clientX" in activatorEvent) { px = activatorEvent.clientX + deltaX; py = activatorEvent.clientY + deltaY; }
      else if ("touches" in activatorEvent && activatorEvent.touches?.[0]) { px = activatorEvent.touches[0].clientX + deltaX; py = activatorEvent.touches[0].clientY + deltaY; }
    }
    if (px === 0 && py === 0) return;

    const foundCol = detectColumnAtPoint(px, py);
    if (foundCol !== lastManualCol.current) {
      lastManualCol.current = foundCol;
      setManualOverCol(foundCol);
    }

    // Drop-Indicator: Finde die Einfügeposition innerhalb der Spalte
    if (!foundCol) {
      if (lastIndicatorKey.current !== "") {
        lastIndicatorKey.current = "";
        setDropIndicator(null);
      }
      return;
    }
    // Alle Ticket-Karten in dieser Spalte per DOM finden
    const colEl = document.querySelector(`[data-col-droppable="${foundCol}"]`);
    if (!colEl) return;
    const cards = colEl.querySelectorAll<HTMLElement>("[data-board-item-id]");
    let insertBeforeId: string | null = null;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (py < midY) {
        insertBeforeId = card.getAttribute("data-board-item-id");
        break;
      }
    }
    const key = `${foundCol}:${insertBeforeId ?? "END"}`;
    if (key !== lastIndicatorKey.current) {
      lastIndicatorKey.current = key;
      setDropIndicator({ colId: foundCol, insertBeforeId });
    }
  }, []);

  /** Pill-Farbe/Border für Kalender-Events: Besichtigung = grau, Ausführung = Gewerk/Blau. */
  const eventPillBg = (t: Ticket | HandwerkerAuftrag | undefined) => {
    if ((t?.termin_typ ?? "").trim() === TERMIN_TYP.BESICHTIGUNG) return "bg-slate-500/90 border border-slate-400";
    const firstGewerk = normalizeGewerke(t && "gewerk" in t ? t.gewerk ?? null : null)[0] ?? "";
    switch (firstGewerk) {
      case "Elektro": return "bg-amber-600/90";
      case "Sanitär": return "bg-blue-600/90";
      case "Ausbau": return "bg-orange-600/90";
      case "Reinigung": return "bg-emerald-600/90";
      case "Facility": return "bg-slate-600/90";
      default: return "bg-blue-600/90";
    }
  };

  /** Event in aktueller Kalenderwoche (Montag–Samstag)? */
  const isEventInWeek = (d: Date) => {
    const mon = startOfWeekDf(weekStart, { weekStartsOn: 1 }).getTime();
    const sat = mon + 6 * 24 * 60 * 60 * 1000;
    const t = d.getTime();
    return t >= mon && t < sat;
  };
  const getDayOffset = (d: Date) => {
    const mon = startOfWeekDf(weekStart, { weekStartsOn: 1 });
    return Math.floor((d.getTime() - mon.getTime()) / (24 * 60 * 60 * 1000));
  };
  const getSlotIndex = (d: Date) => {
    const h = d.getHours();
    const m = d.getMinutes();
    return (h - CALENDAR_HOUR_START) * SLOTS_PER_HOUR + Math.floor(m / SLOT_MINUTES);
  };
  const getSlotSpan = (start: Date, end: Date) => {
    const slots = (end.getTime() - start.getTime()) / (SLOT_MINUTES * 60 * 1000);
    return Math.max(1, Math.ceil(slots));
  };

  /**
   * Berechnet für überlappende Events die Breite und Position (Apple-Kalender-Style).
   * Events, die am gleichen Tag zur gleichen Zeit starten, werden nebeneinander angezeigt.
   */
  const getOverlappingEventsLayout = useMemo(() => {
    const weekEvents = calendarEvents.filter((ev) => isEventInWeek(ev.start));
    const layoutMap = new Map<string, { width: number; left: number; index: number; total: number }>();

    // Gruppiere Events nach Tag und Start-Slot
    const eventsByDayAndSlot = new Map<string, WeekEvent[]>();
    weekEvents.forEach((ev) => {
      const dayIndex = getDayOffset(ev.start);
      const slotIndex = getSlotIndex(ev.start);
      if (dayIndex < 0 || dayIndex > 5 || slotIndex < 0 || slotIndex >= TOTAL_SLOTS) return;
      const key = `${dayIndex}-${slotIndex}`;
      if (!eventsByDayAndSlot.has(key)) {
        eventsByDayAndSlot.set(key, []);
      }
      eventsByDayAndSlot.get(key)!.push(ev);
    });

    // Für jede Gruppe: berechne Breite und Position für jedes Event
    eventsByDayAndSlot.forEach((events, key) => {
      if (events.length === 1) {
        // Keine Überlappung → volle Breite
        layoutMap.set(events[0].id, { width: 100, left: 0, index: 0, total: 1 });
      } else {
        // Überlappung: Events nebeneinander (mit kleinem Gap wie Apple Kalender)
        const total = events.length;
        const gapPercent = 1; // 1% Gap zwischen Events
        const availableWidth = 100 - (total - 1) * gapPercent;
        const widthPercent = availableWidth / total;
        events.forEach((ev, idx) => {
          layoutMap.set(ev.id, {
            width: widthPercent,
            left: idx * (widthPercent + gapPercent),
            index: idx,
            total,
          });
        });
      }
    });

    return layoutMap;
  }, [calendarEvents, weekStart]);

  /** Drop-Indicator-Linie (blaue Linie zeigt Einfügeposition). */
  const DropIndicatorLine = () => (
    <div className="flex items-center gap-1 py-0.5">
      <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      <div className="h-0.5 flex-1 rounded-full bg-blue-500" />
    </div>
  );

  /** Rendert gemischte Board-Karten (Tickets + SPM-Aufträge) für eine Spalte. */
  const renderBoardColumnCards = (
    ticketsList: Ticket[],
    auftraegeList: HandwerkerAuftrag[],
    emptyLabel: string,
    colId?: string,
    options?: { isAngeboteTab?: boolean; onOpenQuoteBuilder?: (t: Ticket) => void; offerAttentionIds?: Set<string> }
  ) => {
    const rows = mergeBoardDisplayRows(ticketsList, auftraegeList);
    const eingangGewerkStyle = colId === "column-1" && !options?.isAngeboteTab;
    if (loading) return <p className={`text-sm ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>Lade Tickets…</p>;
    if (rows.length === 0) {
      const showHere = activeDragId && dropIndicator && colId && dropIndicator.colId === colId;
      return showHere ? (
        <DropIndicatorLine />
      ) : (
        <p className={`text-sm ${isLightTheme ? "text-slate-600" : "text-slate-500"}`}>{emptyLabel}</p>
      );
    }
    const indicatorCol = dropIndicator && colId && dropIndicator.colId === colId ? dropIndicator : null;
    return (
      <>
        {rows.map((row) => {
          if (row.kind === "auftrag") {
            const a = row.a;
            const showIndA = activeDragId && indicatorCol && indicatorCol.insertBeforeId === `auftrag-${a.id}`;
            if (eingangGewerkStyle) {
              const kommendA = isKommenderOderLaufenderTermin(a);
              const aufCardShell = isLightTheme
                ? "border-slate-200/80 bg-white shadow-sm hover:border-slate-300"
                : "border-slate-700/80 bg-slate-900/80 hover:border-slate-600";
              return (
                <React.Fragment key={a.id}>
                  {showIndA && <DropIndicatorLine />}
                  <SortableAuftragCard
                    auftrag={a}
                    role="button"
                    tabIndex={0}
                    onClick={() => openAuftragBoardDetail(a)}
                    onKeyDown={(e) => e.key === "Enter" && openAuftragBoardDetail(a)}
                    className="cursor-pointer border-0 bg-transparent p-0 shadow-none transition-colors active:scale-[0.99] lg:active:scale-100"
                  >
                    {kommendA ? (
                      <AuftragEingangKommendeRowView auftrag={a} isLightTheme={isLightTheme} />
                    ) : (
                      <AuftragEingangVolleKarteView
                        auftrag={a}
                        isLightTheme={isLightTheme}
                        cardClassName={aufCardShell}
                      />
                    )}
                  </SortableAuftragCard>
                </React.Fragment>
              );
            }
            const aufBorder = isLightTheme
              ? "border-emerald-500/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-500 hover:bg-emerald-50/40"
              : "border-emerald-500/60 bg-slate-900/80 hover:border-emerald-400";
            const bs = auftragBoardStatus(a);
            const hasPhoneA = !!(a.mieter_telefon ?? "").trim();
            const addr = getAuftragCardAddress(a);
            const labelA = isLightTheme
              ? "border border-emerald-500/60 bg-emerald-50 text-emerald-700"
              : "border border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
            return (
              <React.Fragment key={a.id}>
                {showIndA && <DropIndicatorLine />}
                <SortableAuftragCard
                  auftrag={a}
                  role="button"
                  tabIndex={0}
                  onClick={() => openAuftragBoardDetail(a)}
                  onKeyDown={(e) => e.key === "Enter" && openAuftragBoardDetail(a)}
                  className={`cursor-pointer rounded-2xl border p-3 text-sm transition-colors active:scale-[0.99] lg:active:scale-100 ${aufBorder}`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${labelA}`}>
                        Auftrag
                      </span>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300"}`}>
                        SPM
                      </span>
                      {bs === STATUS.BESICHTIGUNG && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-slate-200 text-slate-700" : "bg-slate-700 text-slate-300"}`}>
                          Besichtigung
                        </span>
                      )}
                      {bs === STATUS.AUSFUEHRUNG && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-500/20 text-blue-200"}`}>
                          Ausführung
                        </span>
                      )}
                    </div>
                    <span className={`shrink-0 text-xs tabular-nums ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                      {(a.auftragsnummer ?? "").trim() || "–"}
                    </span>
                  </div>
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className={`line-clamp-1 text-sm font-medium ${isLightTheme ? "text-slate-900" : "text-slate-100"}`}>
                        {getAuftragCardTitle(a)}
                      </p>
                      {addr ? (
                        <p className={`line-clamp-1 text-xs ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>{addr}</p>
                      ) : null}
                    </div>
                    {hasPhoneA && (
                      <a
                        href={`tel:${(a.mieter_telefon ?? "").trim()}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full transition-colors active:scale-95 ${
                          isLightTheme
                            ? "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                            : "text-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-200"
                        }`}
                        aria-label="Anrufen"
                      >
                        <Phone className="h-5 w-5" strokeWidth={2} />
                      </a>
                    )}
                  </div>
                  {a.aufgabe ? (
                    <p className={`mt-1 line-clamp-2 text-xs ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>{a.aufgabe}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                      {(() => {
                        const gewerkeList = normalizeGewerke(a.gewerk ?? null);
                        return gewerkeList.length > 0 ? (
                          gewerkeList.map((g, idx) => {
                            const Icon = getGewerkIcon(g);
                            return (
                              <span key={`${g}-${idx}`} className={`inline-flex items-center gap-1 ${getGewerkBadgeClasses(g, isLightTheme)}`}>
                                {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />}
                                {g}
                              </span>
                            );
                          })
                        ) : (
                          <span className={`text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>–</span>
                        );
                      })()}
                      <span className={`text-[11px] ${isLightTheme ? "text-slate-600" : "text-slate-500"}`}>{bs}</span>
                    </div>
                  </div>
                </SortableAuftragCard>
              </React.Fragment>
            );
          }
          const ticket = row.t;
          const cardType = getCardType(ticket);
          const displayName = getTicketDisplayName(ticket);
          const hasPhone = !!(ticket.kontakt_telefon ?? "").trim();
          const isAnfrageStatus = (ticket.status ?? "").trim() === STATUS.ANFRAGE;
          const isFromAuftrag = !!ticket.additional_data?.auftrag_id;
          const isConverting = convertingId === ticket.id;
          // Gewerk-Icon: erstes Gewerk aus Gewerk-Array
          const firstGewerk = normalizeGewerke(ticket.gewerk ?? null)[0] ?? null;
          const GewerkIcon = getGewerkIcon(firstGewerk);
          const urgencyLevel = getUrgencyLevel(ticket);
          const isOver24h = urgencyLevel === "24h";
          const urgencyHeatmapClasses =
            urgencyLevel === "12h"
              ? isLightTheme
                ? "border-orange-500/60 bg-orange-50"
                : "border-orange-500/40 bg-orange-500/5"
              : urgencyLevel === "24h"
                ? isLightTheme
                  ? "border-red-500/70 bg-red-50"
                  : "border-red-500/50 bg-red-500/10"
                : "";
          const cardBorderClasses = (() => {
            if (isLightTheme) {
              if (cardType === "PARTNER") {
                return "border-blue-500/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-500 hover:bg-blue-50/40";
              }
              if (cardType === "AUFTRAG") {
                return "border-emerald-500/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-500 hover:bg-emerald-50/40";
              }
              if (cardType === "ANFRAGE") {
                return "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300 hover:bg-slate-50/80";
              }
              return "border-blue-500/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-500 hover:bg-blue-50/40";
            }
            // Dark theme
            if (cardType === "PARTNER") {
              return "border-blue-500/70 bg-slate-900 shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:border-blue-400";
            }
            if (cardType === "AUFTRAG") {
              return "border-emerald-500/60 bg-slate-900/80 hover:border-emerald-400";
            }
            if (cardType === "ANFRAGE") {
              return "border-slate-600 bg-slate-900/80 hover:border-slate-500";
            }
            return "border-blue-500/60 bg-slate-900/80 hover:border-blue-400";
          })();
          const labelBadgeClasses = (() => {
            if (isLightTheme) {
              if (cardType === "PARTNER") {
                return "border border-blue-500/60 bg-blue-50 text-blue-700";
              }
              if (cardType === "AUFTRAG") {
                return "border border-emerald-500/60 bg-emerald-50 text-emerald-700";
              }
              if (cardType === "ANFRAGE") {
                return "bg-sky-100 text-sky-800";
              }
              return "border border-blue-500/60 bg-blue-50 text-blue-700";
            }
            if (cardType === "PARTNER") {
              return "border border-blue-500/70 bg-blue-500/10 text-blue-300";
            }
            if (cardType === "AUFTRAG") {
              return "border border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
            }
            if (cardType === "ANFRAGE") {
              return "bg-sky-500/20 text-sky-200";
            }
            return "border border-blue-500/60 bg-blue-500/10 text-blue-200";
          })();
          const showIndicatorBefore =
            activeDragId && indicatorCol && indicatorCol.insertBeforeId === `ticket-${ticket.id}`;
          const kommendT = isKommenderOderLaufenderTermin(ticket);
          if (eingangGewerkStyle && kommendT) {
            return (
              <React.Fragment key={ticket.id}>
                {showIndicatorBefore && <DropIndicatorLine />}
                <SortableTicketCard
                  ticket={ticket}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDetailModal(ticket)}
                  onKeyDown={(e) => e.key === "Enter" && openDetailModal(ticket)}
                  className={`cursor-pointer border-0 bg-transparent p-0 shadow-none transition-colors active:scale-[0.99] lg:active:scale-100 ${urgencyLevel === "24h" ? "animate-pulse" : ""}`}
                >
                  <TicketEingangKommendeRowView
                    ticket={ticket}
                    isLightTheme={isLightTheme}
                    displayName={displayName}
                    anzeigeNr={getTicketOrAuftragNumber(ticket)}
                  />
                </SortableTicketCard>
              </React.Fragment>
            );
          }
          if (eingangGewerkStyle && !kommendT) {
            const volleCardClass = `${cardBorderClasses} ${urgencyLevel !== "neutral" ? urgencyHeatmapClasses : ""}`;
            const gewerkeListT = normalizeGewerke(ticket.gewerk ?? null);
            const gewerkeRow = (
              <>
                {gewerkeListT.length > 0 ? (
                  gewerkeListT.map((g, idx) => {
                    const Icon = getGewerkIcon(g);
                    return (
                      <span key={`${g}-${idx}`} className={`inline-flex items-center gap-1 ${getGewerkBadgeClasses(g, isLightTheme)}`}>
                        {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />}
                        {g}
                      </span>
                    );
                  })
                ) : (
                  <span className={`text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>–</span>
                )}
                <span className={`text-[11px] ${isLightTheme ? "text-slate-600" : "text-slate-500"}`}>
                  {ticket.status || "Ticket"}
                </span>
              </>
            );
            const statusMetaRow = (
              <div
                className={`flex items-center gap-1 text-[11px] ${
                  isOver24h
                    ? "font-semibold text-red-500"
                    : isLightTheme
                      ? "text-slate-600"
                      : "text-slate-500"
                }`}
              >
                {isOver24h && (
                  <Hourglass className="h-3.5 w-3.5 shrink-0 text-red-500" strokeWidth={2} aria-hidden />
                )}
                <span>{formatTicketDate(ticket.created_at)}</span>
              </div>
            );
            const phoneButton = hasPhone ? (
              <a
                href={`tel:${ticket.kontakt_telefon!.trim()}`}
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full transition-colors active:scale-95 ${
                  isLightTheme
                    ? "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                    : "text-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-200"
                }`}
                aria-label="Anrufen"
              >
                <Phone className="h-5 w-5" strokeWidth={2} />
              </a>
            ) : null;
            const badgeCluster = (
              <>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${labelBadgeClasses}`}>
                  {cardType === "PARTNER" ? "Partner" : cardType === "AUFTRAG" ? "Auftrag" : cardType === "ANFRAGE" ? "Anfrage" : "Ticket"}
                </span>
                {cardType === "AUFTRAG" && (
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300"}`}>
                    SPM
                  </span>
                )}
                {(ticket.status ?? "").trim() === STATUS.BESICHTIGUNG && (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-slate-200 text-slate-700" : "bg-slate-700 text-slate-300"}`}>
                    Besichtigung
                  </span>
                )}
                {(ticket.status ?? "").trim() === STATUS.AUSFUEHRUNG && (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-500/20 text-blue-200"}`}>
                    Ausführung
                  </span>
                )}
                {options?.isAngeboteTab && isKalkulationFaellig(ticket) && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      isLightTheme
                        ? "border border-amber-300 bg-amber-100 text-amber-800"
                        : "border border-amber-500/40 bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    Kalkulation fällig
                  </span>
                )}
              </>
            );
            const footer = (
              <>
                {isAnfrageStatus && !isFromAuftrag && !isGewerkUser && (
                  <div
                    className={`mt-3 flex w-full gap-2 border-t pt-2 ${
                      isLightTheme ? "border-slate-200" : "border-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleConvertToTicket(ticket);
                      }}
                      disabled={isConverting}
                      className="flex min-w-0 flex-[3] items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                    >
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                      <span className="whitespace-nowrap">{isConverting ? "Wird umgewandelt…" : "In Ticket umwandeln"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openRejectionModal(ticket);
                      }}
                      className="flex min-w-0 flex-[2] items-center justify-center gap-1.5 rounded-full bg-red-600/90 px-3 py-2 text-xs font-medium text-white transition-all hover:opacity-90"
                    >
                      <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                      Ablehnen
                    </button>
                  </div>
                )}
                {options?.isAngeboteTab && !(ticket as Ticket & { additional_data?: { auftrag_id?: string } }).additional_data?.auftrag_id && (
                  <div
                    className={`mt-3 flex w-full flex-col gap-2 border-t pt-2 ${
                      isLightTheme ? "border-slate-200" : "border-slate-700"
                    }`}
                  >
                    {isKalkulationFaellig(ticket) && options.onOpenQuoteBuilder && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          options.onOpenQuoteBuilder?.(ticket);
                        }}
                        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90 ${
                          isLightTheme
                            ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                            : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                        }`}
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                        Angebot erstellen
                      </button>
                    )}
                    {(ticket.status ?? "").trim() === STATUS.ANGEBOT_ERSTELLT && (
                      <>
                        {options.onOpenQuoteBuilder && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              options.onOpenQuoteBuilder?.(ticket);
                            }}
                            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all hover:opacity-90 ${
                              isLightTheme
                                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                            }`}
                          >
                            <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                            Angebot bearbeiten
                          </button>
                        )}
                        <div className="flex w-full gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90"
                            style={
                              isLightTheme
                                ? { backgroundColor: "#bbf7d0", color: "#166534" }
                                : { backgroundColor: "rgba(34,197,94,0.2)", color: "#86efac" }
                            }
                          >
                            <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                            Angenommen
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90"
                            style={
                              isLightTheme
                                ? { backgroundColor: "#fecaca", color: "#991b1b" }
                                : { backgroundColor: "rgba(239,68,68,0.2)", color: "#fca5a5" }
                            }
                          >
                            <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                            Abgelehnt
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            );
            return (
              <React.Fragment key={ticket.id}>
                {showIndicatorBefore && <DropIndicatorLine />}
                <SortableTicketCard
                  ticket={ticket}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDetailModal(ticket)}
                  onKeyDown={(e) => e.key === "Enter" && openDetailModal(ticket)}
                  className={`cursor-pointer border-0 bg-transparent p-0 shadow-none transition-colors active:scale-[0.99] lg:active:scale-100 ${urgencyLevel === "24h" ? "animate-pulse" : ""}`}
                >
                  <TicketEingangVolleKarteView
                    isLightTheme={isLightTheme}
                    cardClassName={volleCardClass}
                    badgeCluster={badgeCluster}
                    numberRight={
                      <span className="flex items-center gap-1">
                        <span className={`shrink-0 text-xs tabular-nums ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                          {getTicketOrAuftragNumber(ticket)}
                        </span>
                        {options?.isAngeboteTab && options.offerAttentionIds?.has(ticket.id) && (
                          <span
                            className={`inline-flex h-2 w-2 rounded-full ${isLightTheme ? "bg-blue-500" : "bg-blue-400"}`}
                          />
                        )}
                      </span>
                    }
                    displayName={displayName}
                    objektAdresse={ticket.objekt_adresse}
                    beschreibung={ticket.beschreibung}
                    terminBlock={ticketEingangTerminBlock(
                      ticket,
                      isLightTheme,
                      isLightTheme ? "text-slate-500" : "text-slate-400"
                    )}
                    gewerkeRow={gewerkeRow}
                    statusMetaRow={statusMetaRow}
                    phoneButton={phoneButton}
                    footer={footer}
                  />
                </SortableTicketCard>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={ticket.id}>
              {showIndicatorBefore && <DropIndicatorLine />}
              <SortableTicketCard
                ticket={ticket}
                role="button"
                tabIndex={0}
                onClick={() => openDetailModal(ticket)}
                onKeyDown={(e) => e.key === "Enter" && openDetailModal(ticket)}
                className={`cursor-pointer rounded-2xl border p-3 text-sm transition-colors active:scale-[0.99] lg:active:scale-100 ${cardBorderClasses} ${urgencyLevel !== "neutral" ? urgencyHeatmapClasses : ""} ${urgencyLevel === "24h" ? "animate-pulse" : ""}`}
              >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${labelBadgeClasses}`}>
                    {cardType === "PARTNER" ? "Partner" : cardType === "AUFTRAG" ? "Auftrag" : cardType === "ANFRAGE" ? "Anfrage" : "Ticket"}
                  </span>
                  {cardType === "AUFTRAG" && (
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300"}`}>
                      SPM
                    </span>
                  )}
                  {(ticket.status ?? "").trim() === STATUS.BESICHTIGUNG && (
                    <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-slate-200 text-slate-700" : "bg-slate-700 text-slate-300"}`}>
                      Besichtigung
                    </span>
                  )}
                  {(ticket.status ?? "").trim() === STATUS.AUSFUEHRUNG && (
                    <span className={`rounded px-1.5 py-0.5 text-[10px] ${isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-500/20 text-blue-200"}`}>
                      Ausführung
                    </span>
                  )}
                  {options?.isAngeboteTab && isKalkulationFaellig(ticket) && (
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      isLightTheme
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}>
                      Kalkulation fällig
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1">
                  <span className={`shrink-0 text-xs tabular-nums ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                    {getTicketOrAuftragNumber(ticket)}
                  </span>
                  {options?.isAngeboteTab && options.offerAttentionIds?.has(ticket.id) && (
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${
                        isLightTheme ? "bg-blue-500" : "bg-blue-400"
                      }`}
                    />
                  )}
                </span>
              </div>
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className={`line-clamp-1 text-sm font-medium ${isLightTheme ? "text-slate-900" : "text-slate-100"}`}>{displayName}</p>
                  {ticket.objekt_adresse && (
                    <p className={`line-clamp-1 text-xs ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                      {ticket.objekt_adresse}
                    </p>
                  )}
                </div>
                {hasPhone && (
                  <a
                    href={`tel:${ticket.kontakt_telefon!.trim()}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full transition-colors active:scale-95 ${
                      isLightTheme
                        ? "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900"
                        : "text-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-200"
                    }`}
                    aria-label="Anrufen"
                  >
                    <Phone className="h-5 w-5" strokeWidth={2} />
                  </a>
                )}
              </div>
              {ticket.beschreibung && (
                <p className={`mt-1 line-clamp-2 text-xs ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>
                  {ticket.beschreibung}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  {(() => {
                    const gewerkeList = normalizeGewerke(ticket.gewerk ?? null);
                    return gewerkeList.length > 0 ? (
                      gewerkeList.map((g, idx) => {
                        const Icon = getGewerkIcon(g);
                        return (
                          <span key={`${g}-${idx}`} className={`inline-flex items-center gap-1 ${getGewerkBadgeClasses(g, isLightTheme)}`}>
                            {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />}
                            {g}
                          </span>
                        );
                      })
                    ) : (
                      <span className={`text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>–</span>
                    );
                  })()}
                  <span className={`text-[11px] ${isLightTheme ? "text-slate-600" : "text-slate-500"}`}>
                    {ticket.status || "Ticket"}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 text-[11px] ${
                    isOver24h
                      ? "font-semibold text-red-500"
                      : isLightTheme
                        ? "text-slate-600"
                        : "text-slate-500"
                  }`}
                >
                  {isOver24h && (
                    <Hourglass className="h-3.5 w-3.5 shrink-0 text-red-500" strokeWidth={2} aria-hidden />
                  )}
                  <span>{formatTicketDate(ticket.created_at)}</span>
                </div>
              </div>
              {isAnfrageStatus && !isFromAuftrag && !isGewerkUser && (
                <div
                  className={`mt-3 flex w-full gap-2 border-t pt-2 ${
                    isLightTheme ? "border-slate-200" : "border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleConvertToTicket(ticket); }}
                    disabled={isConverting}
                    className="flex min-w-0 flex-[3] items-center justify-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
                  >
                    <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    <span className="whitespace-nowrap">{isConverting ? "Wird umgewandelt…" : "In Ticket umwandeln"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openRejectionModal(ticket); }}
                    className="flex min-w-0 flex-[2] items-center justify-center gap-1.5 rounded-full bg-red-600/90 px-3 py-2 text-xs font-medium text-white transition-all hover:opacity-90"
                  >
                    <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    Ablehnen
                  </button>
                </div>
              )}
              {options?.isAngeboteTab && !(ticket as Ticket & { additional_data?: { auftrag_id?: string } }).additional_data?.auftrag_id && (
                <div
                  className={`mt-3 flex w-full flex-col gap-2 border-t pt-2 ${
                    isLightTheme ? "border-slate-200" : "border-slate-700"
                  }`}
                >
                  {/* A) Kalkulation fällig: Button "Angebot erstellen" */}
                  {isKalkulationFaellig(ticket) && options.onOpenQuoteBuilder && (
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); options.onOpenQuoteBuilder?.(ticket); }}
                      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90 ${
                        isLightTheme
                          ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                          : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                      Angebot erstellen
                    </button>
                  )}
                  {/* B) Angebot versendet: Buttons Angenommen/Abgelehnt */}
                  {(ticket.status ?? "").trim() === STATUS.ANGEBOT_ERSTELLT && (
                    <>
                      {options.onOpenQuoteBuilder && (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); options.onOpenQuoteBuilder?.(ticket); }}
                          className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all hover:opacity-90 ${
                            isLightTheme
                              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                          Angebot bearbeiten
                        </button>
                      )}
                      <div className="flex w-full gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Angenommen – UI only */ }}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90"
                          style={isLightTheme ? { backgroundColor: "#bbf7d0", color: "#166534" } : { backgroundColor: "rgba(34,197,94,0.2)", color: "#86efac" }}
                        >
                          <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                          Angenommen
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Abgelehnt – UI only */ }}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium transition-all hover:opacity-90"
                          style={isLightTheme ? { backgroundColor: "#fecaca", color: "#991b1b" } : { backgroundColor: "rgba(239,68,68,0.2)", color: "#fca5a5" }}
                        >
                          <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                          Abgelehnt
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </SortableTicketCard>
            </React.Fragment>
          );
        })}
        {activeDragId && indicatorCol && indicatorCol.insertBeforeId === null && <DropIndicatorLine />}
      </>
    );
  };

  /** Detail-Modal Timeline: kombiniert ticket_history + legacy tickets.historie. */
  const detailTimelineItems = useMemo(() => {
    const items: { key: string; action: string; at: string | null; Icon: React.ElementType }[] = [];

    for (const r of detailHistoryRows) {
      const actionRaw = (r.aktion ?? "Historie") ?? "Historie";
      const action = String(actionRaw).trim() || "Historie";
      const at = (r.erstellt_at ?? null) as string | null;
      const isTermin = /besichtigung|termin/i.test(action);
      items.push({
        key: String(r.id ?? `${r.ticket_id ?? "row"}:${action}:${at ?? "na"}`),
        action,
        at,
        Icon: isTermin ? CalendarIcon : CheckCircle,
      });
    }

    const legacy = (detailTicket?.historie ?? []) as HistorieEintrag[];
    legacy.forEach((e, i) => {
      const action = (e?.text ?? "").trim() || "Historie";
      // legacy date ist meist YYYY-MM-DD → als ISO interpretieren (ohne Uhrzeit)
      const at = (e?.date ?? "").trim() ? `${e.date}T00:00:00.000Z` : null;
      items.push({
        key: `legacy-${detailTicket?.id ?? "ticket"}-${i}`,
        action,
        at,
        Icon: CheckCircle,
      });
    });

    items.sort((a, b) => {
      const ta = a.at ? new Date(a.at).getTime() : 0;
      const tb = b.at ? new Date(b.at).getTime() : 0;
      return tb - ta;
    });

    return items;
  }, [detailHistoryRows, detailTicket?.historie, detailTicket?.id]);

  const weekDays = useMemo(() => Array.from({ length: 6 }, (_, i) => add(weekStart, { days: i })), [weekStart]);

  const calMobile = isMobileViewport;
  const calSlotPx = calMobile ? 48 : 48;
  const calHeaderH = calMobile ? 44 : 36;

  const renderWeekCalendar = () => (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        className={cn(
          "mb-3 shrink-0 gap-2",
          calMobile ? "flex flex-col" : "flex flex-row items-center justify-between"
        )}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2
            className={`text-xs font-medium uppercase tracking-wider ${
              isLightTheme ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Terminplaner
          </h2>
          <Link
            href="/admin/mangelmeldungen"
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              isLightTheme
                ? "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Mangel melden
          </Link>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setWeekStart((prev) => add(prev, { weeks: -1 }))}
            className={`inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors ${
              isLightTheme
                ? "text-slate-600 hover:bg-slate-100 active:bg-slate-200"
                : "text-slate-300 hover:bg-slate-800 active:bg-slate-700"
            }`}
            aria-label="Vorherige Woche"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <span
            className={cn(
              "min-w-0 px-1 text-center text-sm font-semibold tabular-nums leading-snug",
              calMobile ? "max-w-[min(100%,18rem)] flex-1" : "sm:min-w-[180px]",
              isLightTheme ? "text-slate-800" : "text-slate-100"
            )}
          >
            {format(weekDays[0], "d. MMM", { locale: de })} –{" "}
            {format(weekDays[5], "d. MMM yyyy", { locale: de })}
          </span>
          <button
            type="button"
            onClick={() => setWeekStart((prev) => add(prev, { weeks: 1 }))}
            className={`inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors ${
              isLightTheme
                ? "text-slate-600 hover:bg-slate-100 active:bg-slate-200"
                : "text-slate-300 hover:bg-slate-800 active:bg-slate-700"
            }`}
            aria-label="Nächste Woche"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "min-h-0 flex-1 overflow-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
          calMobile && "max-h-[min(72dvh,calc(100dvh-13rem))] rounded-2xl ring-1 ring-black/[0.04] dark:ring-white/[0.06]"
        )}
      >
        <div
          className={`rounded-2xl border ${
            isLightTheme ? "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "border-slate-800 bg-[#1e293b]"
          }`}
          style={{
            display: "grid",
            gridTemplateColumns: calMobile
              ? "56px repeat(6, minmax(76px, 1fr))"
              : "64px repeat(6, 1fr)",
            gridTemplateRows: `${calHeaderH}px repeat(${TOTAL_SLOTS}, ${calSlotPx}px)`,
            minHeight: calMobile ? 500 : 680,
            minWidth: calMobile ? 56 + 6 * 76 : undefined,
          }}
        >
          <div
            className={cn(
              "sticky left-0 top-0 z-[25] col-start-1 row-start-1 rounded-tl-xl border-b border-r shadow-[2px_0_8px_-2px_rgba(0,0,0,0.06)]",
              isLightTheme ? "border-slate-200/80 bg-slate-100" : "border-slate-700/80 bg-slate-800"
            )}
          />
          {weekDays.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`sticky top-0 z-20 border-b border-r px-0.5 py-1 text-center font-semibold leading-tight ${
                calMobile ? "text-[11px]" : "text-xs"
              } ${
                isLightTheme
                  ? "border-slate-200 bg-slate-50 text-slate-700"
                  : "border-slate-800 bg-slate-800 text-slate-300"
              }`}
              style={{ gridColumn: dayIndex + 2, gridRow: 1 }}
            >
              {calMobile ? (
                <>
                  <span className="block uppercase tracking-wide text-[10px] opacity-80">
                    {format(day, "EEE", { locale: de })}
                  </span>
                  <span className="block tabular-nums">{format(day, "d.MM.", { locale: de })}</span>
                </>
              ) : (
                format(day, "EEE d.MM.", { locale: de })
              )}
            </div>
          ))}
          {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
            const hour = CALENDAR_HOUR_START + Math.floor(slotIndex / SLOTS_PER_HOUR);
            const min = (slotIndex % SLOTS_PER_HOUR) * SLOT_MINUTES;
            const timeLabel = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
            const showLabel = min === 0;
            return (
              <div
                key={`time-${slotIndex}`}
                className={cn(
                  "sticky left-0 z-[15] flex items-center justify-end border-b border-r py-0.5 pl-2 tabular-nums shadow-[2px_0_8px_-2px_rgba(0,0,0,0.05)]",
                  calMobile ? "pr-2 text-[11px] leading-none" : "pr-3 text-xs",
                  isLightTheme
                    ? "border-slate-200/80 bg-slate-50 text-slate-600"
                    : "border-slate-700/80 bg-slate-900 text-slate-400"
                )}
                style={{ gridColumn: 1, gridRow: slotIndex + 2 }}
              >
                {showLabel ? timeLabel : ""}
              </div>
            );
          })}
          {weekDays.map((_, dayIndex) =>
            Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => (
              <DroppableSlot
                key={`${dayIndex}-${slotIndex}`}
                dayIndex={dayIndex}
                slotIndex={slotIndex}
                isHighlight={
                  dropTargetSlot?.dayIndex === dayIndex && dropTargetSlot?.slotIndex === slotIndex
                }
                style={{ gridColumn: dayIndex + 2, gridRow: slotIndex + 2 }}
                theme={isLightTheme ? "light" : "dark"}
                compact={calMobile}
              />
            ))
          )}
          {calendarEvents.filter((ev) => isEventInWeek(ev.start)).map((ev) => {
            const dayIndex = getDayOffset(ev.start);
            const slotIndex = getSlotIndex(ev.start);
            const span = getSlotSpan(ev.start, ev.end);
            if (dayIndex < 0 || dayIndex > 5 || slotIndex < 0 || slotIndex >= TOTAL_SLOTS) return null;

            // Layout für überlappende Events (Apple-Kalender-Style)
            const layout = getOverlappingEventsLayout.get(ev.id);
            const width = layout ? `${layout.width}%` : "100%";
            const left = layout ? `${layout.left}%` : "0%";
            const zIndex = layout && layout.total > 1 ? layout.index + 1 : 1;

            return (
              <DraggableEventPill
                key={ev.id}
                ev={ev}
                compact={calMobile}
                parallelInSlot={layout?.total ?? 1}
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: `${slotIndex + 2} / span ${span}`,
                  zIndex,
                  minHeight: `${calSlotPx * span - 4}px`,
                  width,
                  left,
                  position: "relative",
                }}
                className={`mx-0.5 rounded-lg border px-0 py-0 text-left font-medium shadow-sm hover:opacity-90 ${
                  (ev.resource?.termin_typ ?? "").trim() === TERMIN_TYP.BESICHTIGUNG
                    ? "bg-slate-500/90 border-slate-400 text-white"
                    : `text-white ${eventPillBg(ev.resource)} border-blue-400/50`
                }`}
                onOpenDetail={() => {
                  if (ev.resourceKind === "ticket") {
                    const t = tickets.find((x) => x.id === ev.id);
                    if (t) openDetailModal(t);
                  } else if (ev.resource && ev.resourceKind === "auftrag") {
                    openAuftragBoardDetail(ev.resource as HandwerkerAuftrag);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  // Weitere Kanban-Spalten außer Eingang (incoming)
  const processColumns = useMemo(
    () =>
      BUSINESS_COLUMNS.filter((c) => c.kind === "kanban" && c.id !== "incoming").sort(
        (a, b) => a.order - b.order
      ),
    []
  );

  // Generische Kanban-Spalte
  const KanbanColumn = ({
    config,
    className,
  }: {
    config: (typeof BUSINESS_COLUMNS)[number];
    className?: string;
  }) => {
    const { setNodeRef, isOver } = useDroppable({ id: config.droppableId });
    const columnCfg = columnConfigs.find((c) => c.colId === config.droppableId);
    const listAll = columnCfg?.tickets ?? [];
    const aufListAll = columnCfg?.auftraege ?? [];
    const list = useMemo(
      () => filterTicketsByBoardSearch(listAll, boardSearchNeedle),
      [listAll, boardSearchNeedle]
    );
    const aufList = useMemo(
      () => filterAuftraegeByBoardSearch(aufListAll, boardSearchNeedle),
      [aufListAll, boardSearchNeedle]
    );
    const emptyBoardMsg = boardSearchNeedle ? "Keine Treffer für diese Suche." : "Keine.";
    const isManualOver = manualOverCol === config.droppableId;

    const sectionColorClasses = (() => {
      const active =
        config.color === "amber"
          ? isLightTheme
            ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/40"
            : "border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/50"
          : config.color === "emerald"
            ? isLightTheme
              ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/40"
              : "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/50"
            : config.color === "red"
              ? isLightTheme
                ? "border-red-500 bg-red-50 ring-2 ring-red-500/40"
                : "border-red-500 bg-red-500/10 ring-2 ring-red-500/50"
              : // default/slate
                isLightTheme
                  ? "border-slate-300 bg-white ring-2 ring-slate-400/40"
                  : "border-slate-700 bg-slate-900/70 ring-2 ring-slate-500/40";

      const idle =
        config.color === "amber" || config.color === "emerald" || config.color === "red"
          ? isLightTheme
            ? "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "border-slate-800 bg-slate-900/60"
          : isLightTheme
            ? "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "border-slate-800 bg-slate-900/60";

      return isOver || isManualOver ? active : idle;
    })();

    return (
      <section
        ref={setNodeRef}
        data-col-droppable={config.droppableId}
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border p-4 transition-colors",
          sectionColorClasses,
          className
        )}
      >
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <h2
            className={`text-xs font-medium uppercase tracking-wider ${
              isLightTheme ? "text-slate-600" : "text-slate-500"
            }`}
          >
            {config.title}
          </h2>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              isLightTheme ? "bg-slate-100 text-slate-700" : "bg-slate-800 text-slate-300"
            }`}
          >
            {loading ? "…" : list.length + aufList.length}
          </span>
        </div>
        <div
          className={`mb-2 h-px w-full shrink-0 ${
            isLightTheme ? "bg-slate-200" : "bg-slate-800"
          }`}
        />
        {config.description && (
          <p className={`mb-2 shrink-0 text-[11px] text-slate-500`}>{config.description}</p>
        )}
        <div className="min-w-0 flex-1 cursor-default space-y-2 overflow-y-auto pr-1">
          <SortableContext
            items={[
              ...list.map((t) => `ticket-${t.id}`),
              ...aufList.map((a) => `auftrag-${a.id}`),
            ]}
            strategy={verticalListSortingStrategy}
          >
            {renderBoardColumnCards(list, aufList, emptyBoardMsg, config.droppableId)}
          </SortableContext>
        </div>
      </section>
    );
  };

  return (
    <main
      className={`min-h-[100dvh] min-h-screen touch-manipulation ${
        isLightTheme ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
      }`}
    >
      <div
        className={`sticky top-0 z-10 flex flex-col gap-3 border-b px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur sm:gap-4 sm:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-3 lg:px-8 ${
          isLightTheme ? "border-slate-200/80 bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : "border-slate-800 bg-slate-950/95"
        }`}
      >
        <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-start">
          <Logo variant={isLightTheme ? "footer" : "header"} className="h-8" />
        </div>
        <div className="relative w-full min-w-0 lg:order-2 lg:max-w-md lg:flex-1">
          <Search
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              isLightTheme ? "text-slate-400" : "text-slate-500"
            }`}
            strokeWidth={2}
            aria-hidden
          />
          <Input
            type="search"
            value={boardSearchQuery}
            onChange={(e) => setBoardSearchQuery(e.target.value)}
            placeholder="Tickets & Aufträge suchen …"
            autoComplete="off"
            aria-label="Tickets und Aufträge durchsuchen"
            className={`h-10 w-full min-w-0 pl-9 pr-10 text-sm ${
              isLightTheme
                ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                : "border-slate-600 bg-slate-900/80 text-slate-100 placeholder:text-slate-500"
            }`}
          />
          {boardSearchQuery.trim() ? (
            <button
              type="button"
              onClick={() => setBoardSearchQuery("")}
              className={`absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md transition-colors ${
                isLightTheme
                  ? "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
              aria-label="Suche zurücksetzen"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : null}
        </div>
        <div className="flex w-full min-w-0 flex-col items-center gap-2 lg:order-3 lg:w-auto lg:items-end lg:gap-1.5">
          <div className="flex w-full min-w-0 items-center justify-between gap-2 pb-0.5 lg:w-auto lg:flex-wrap lg:justify-end lg:gap-2 lg:pb-0">
            <div className="flex min-w-0 flex-nowrap items-center gap-1.5 overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch] sm:gap-2 lg:contents lg:overflow-visible [&_button]:shrink-0">
              {!isGewerkUser && (
                <button
                  type="button"
                  onClick={openCalendarFromHeader}
                  title="Kalender öffnen"
                  className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                    isLightTheme
                      ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                      : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                  }`} 
                >
                  <CalendarIcon className="h-5 w-5" strokeWidth={2} />
                </button>
              )}
              { /* Icon-only Mangelmeldungen button (no text) */ }
              <button
                type="button"
                onClick={() => window.location.assign('/admin/mangelmeldungen')}
                aria-label="Mangelmeldungen"
                title="Mangelmeldungen"
                className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 ml-2 ${isLightTheme ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300" : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"}`}
              >
                <Bell className="h-5 w-5" />
              </button>
              {isGewerkUser && (
                <>
                  <button
                    type="button"
                    onClick={openCalendarFromHeader}
                    title="Kalender öffnen"
                    className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                        : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                    }`}
                  >
                    <CalendarIcon className="h-5 w-5" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleDashboardTheme}
                    title={isLightTheme ? "Dunkel" : "Hell"}
                    className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                        : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                    }`}
                  >
                    {isLightTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </button>
                </>
              )}
              {!isGewerkUser && (
                <>
                  <Popover modal={isMobileViewport}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        title="Einstellungen"
                        className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                          isLightTheme
                            ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                            : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                        }`}
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      collisionPadding={16}
                      className={`w-[min(calc(100vw-2rem),13rem)] touch-manipulation p-2 sm:w-52 ${
                        isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-900"
                      }`}
                    >
                      <nav className="flex flex-col gap-0.5">
                        <Link
                          href="/admin/dashboard"
                          className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${
                            isLightTheme ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                          }`}
                        >
                          <LayoutDashboard className="h-4 w-4 shrink-0" />
                          Dashboard
                        </Link>
                        <Link
                          href="/admin/benutzer"
                          className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${
                            isLightTheme ? "text-slate-700 hover:bg-slate-100" : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                          }`}
                        >
                          <Users className="h-4 w-4 shrink-0" />
                          Benutzerverwaltung
                        </Link>
                      </nav>
                    </PopoverContent>
                  </Popover>
                  <button
                    type="button"
                    onClick={toggleDashboardTheme}
                    title={isLightTheme ? "Dunkel" : "Hell"}
                    className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                        : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                    }`}
                  >
                    {isLightTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </button>
                </>
              )}
            </div>
            <form
              action="/auth/signout"
              method="post"
              className="inline shrink-0 max-lg:mr-2 max-lg:pr-[env(safe-area-inset-right)] lg:mr-0 lg:pr-0"
            >
              <button
                type="submit"
                title="Abmelden"
                className={`inline-flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border p-0 text-xs font-medium transition-all hover:opacity-90 active:scale-[0.98] ${
                  isLightTheme
                    ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-100"
                    : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
                }`}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6 lg:px-8 lg:pb-6">
        {error && (
          <div className="mb-4 rounded-md border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {isMounted && (
        <DndContext
          sensors={sensors}
          collisionDetection={kanbanCollisionDetection}
          measuring={MEASURING_CONFIG}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragMove={handleDragMove}
        >
          {isGewerkUser ? (
          <div className="mx-auto w-full max-w-3xl">
            <GewerkAuftraegeDashboardList
              auftraege={gewerkAuftraegeForView}
              loading={loading}
              isLightTheme={isLightTheme}
              onRefresh={() => void loadTickets(true)}
              onSelectAuftrag={openAuftragBoardDetail}
            />
          </div>
          ) : (
          <>
          {/* Mobile: Anfragen/Eingang (Standard); Kalender nur per Header-Icon */}
          <div className="lg:hidden">
            {mobileMainTab === "list" ? (
              <div className="space-y-3">
                {!isGewerkUser &&
                  (mobileBoardTab === "eingang" || mobileBoardTab === "angebote") && (
                    <button
                      type="button"
                      onClick={() => setCreateChooserOpen(true)}
                      title="Ticket oder SPM-Auftrag anlegen"
                      className={`inline-flex min-h-[3rem] w-full touch-manipulation items-center justify-center gap-2 rounded-full border px-4 py-3.5 text-base font-semibold shadow-md transition-all active:scale-[0.99] sm:min-h-12 sm:py-3 sm:text-sm ${
                        isLightTheme
                          ? "border-blue-700 bg-blue-600 text-white hover:bg-blue-700"
                          : "border-blue-400 bg-blue-600 text-white shadow-blue-950/40 hover:bg-blue-500"
                      }`}
                    >
                      <Plus className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                      Neu anlegen
                    </button>
                  )}
                {!isGewerkUser && (
                  <div
                    className={cn(
                      "overflow-x-auto overscroll-x-contain rounded-2xl border p-1 [-webkit-overflow-scrolling:touch]",
                      isLightTheme
                        ? "border-slate-200/90 bg-slate-100/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                        : "border-slate-700/80 bg-slate-900/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                    )}
                  >
                    <div
                      className="flex w-max min-w-full items-stretch gap-1 px-0.5 py-1"
                      role="tablist"
                      aria-label="Board-Spalte"
                    >
                      {(
                        [
                          {
                            id: "eingang" as const,
                            title: "Eingang",
                            count: col1EingangTicketsView.length + col1EingangAuftraegeView.length,
                          },
                          {
                            id: "angebote" as const,
                            title: "Angebote",
                            count: col1AngeboteTicketsView.length + col1AngeboteAuftraegeView.length,
                          },
                          ...processColumns.map((cfg) => {
                            const colCfg = columnConfigs.find((c) => c.colId === cfg.droppableId);
                            const n =
                              filterTicketsByBoardSearch(colCfg?.tickets ?? [], boardSearchNeedle).length +
                              filterAuftraegeByBoardSearch(colCfg?.auftraege ?? [], boardSearchNeedle).length;
                            const raw = cfg.title.replace(/^\d+\.\s*/, "").trim();
                            const title = (raw.split("&")[0] ?? raw).trim();
                            return {
                              id: cfg.droppableId as "column-3" | "column-4" | "column-5" | "column-6",
                              title,
                              count: n,
                            };
                          }),
                        ] as const
                      ).map((tab) => {
                        const active = mobileBoardTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => {
                              setMobileBoardTab(tab.id);
                              if (tab.id === "eingang") setIncomingTab("Eingang");
                              if (tab.id === "angebote") setIncomingTab("Angebote");
                            }}
                            className={cn(
                              "flex min-h-11 min-w-[5.75rem] max-w-[9.5rem] shrink-0 touch-manipulation items-center gap-2 rounded-xl px-2.5 py-1.5 transition-[background-color,box-shadow,color] duration-200",
                              active
                                ? isLightTheme
                                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/90"
                                  : "bg-slate-700/95 text-slate-100 shadow-md ring-1 ring-slate-500/40"
                                : isLightTheme
                                  ? "text-slate-600 hover:bg-slate-200/60"
                                  : "text-slate-400 hover:bg-slate-800/80"
                            )}
                          >
                            <span className="min-w-0 flex-1 truncate text-left text-[13px] font-medium leading-snug">
                              {tab.title}
                            </span>
                            <span
                              className={cn(
                                "shrink-0 tabular-nums",
                                "min-w-[1.375rem] rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold leading-tight",
                                active
                                  ? isLightTheme
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-slate-600/90 text-slate-100"
                                  : isLightTheme
                                    ? "bg-white/80 text-slate-500"
                                    : "bg-slate-800 text-slate-400"
                              )}
                            >
                              {tab.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {!isGewerkUser && (mobileBoardTab === "eingang" || mobileBoardTab === "angebote") ? (
                  <section
                    ref={setCol1MobileListRef}
                    className={`flex flex-col rounded-2xl border p-4 transition-colors ${
                      isOverCol1MobileList
                        ? isLightTheme
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400/50"
                          : "border-blue-500 bg-slate-800/80 ring-2 ring-blue-500/50"
                        : isLightTheme
                          ? "border-slate-200 bg-white shadow-sm"
                          : "border-slate-800 bg-slate-900/70"
                    }`}
                  >
                    <div
                      ref={listScrollRef}
                      tabIndex={-1}
                      className="max-h-[min(70dvh,calc(100dvh-14rem))] space-y-3 overflow-y-auto overscroll-y-contain pr-1 pb-[max(4rem,calc(2.5rem+env(safe-area-inset-bottom)))] [-webkit-overflow-scrolling:touch] [scroll-padding-bottom:max(4rem,calc(2.5rem+env(safe-area-inset-bottom)))]"
                    >
                      <SortableContext
                        items={[
                          ...(mobileBoardTab === "eingang" ? col1EingangTicketsView : col1AngeboteTicketsView).map(
                            (t) => `ticket-${t.id}`
                          ),
                          ...(mobileBoardTab === "eingang" ? col1EingangAuftraegeView : col1AngeboteAuftraegeView).map(
                            (a) => `auftrag-${a.id}`
                          ),
                        ]}
                        strategy={verticalListSortingStrategy}
                      >
                        {renderBoardColumnCards(
                          mobileBoardTab === "eingang" ? col1EingangTicketsView : col1AngeboteTicketsView,
                          mobileBoardTab === "eingang" ? col1EingangAuftraegeView : col1AngeboteAuftraegeView,
                          boardSearchNeedle
                            ? "Keine Treffer für diese Suche."
                            : mobileBoardTab === "eingang"
                              ? "Keine Anfragen."
                              : "Keine Angebote.",
                          "column-1",
                          mobileBoardTab === "angebote"
                            ? {
                                isAngeboteTab: true,
                                onOpenQuoteBuilder: (t) => {
                                  setQuoteBuilderTicketId(t.id);
                                  setQuoteBuilderOpen(true);
                                  markOfferSeen(t.id);
                                },
                                offerAttentionIds,
                              }
                            : undefined
                        )}
                      </SortableContext>
                    </div>
                  </section>
                ) : !isGewerkUser && isMounted && isMobileViewport ? (
                  <div className="flex min-h-[min(65dvh,520px)] flex-col">
                    {(() => {
                      const cfg = processColumns.find((c) => c.droppableId === mobileBoardTab);
                      if (!cfg) return null;
                      return <KanbanColumn config={cfg} className="h-full min-h-0" />;
                    })()}
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                ref={setEingangMobileRef}
                className="mt-0 flex min-h-0 flex-col space-y-3"
              >
                <button
                  type="button"
                  onClick={() => setMobileMainTab("list")}
                  className={`flex min-h-11 w-full touch-manipulation items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors active:scale-[0.99] ${
                    isLightTheme
                      ? "border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50"
                      : "border-slate-600 bg-slate-800/80 text-slate-100 hover:bg-slate-800"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 shrink-0 opacity-80" strokeWidth={2} />
                  {isGewerkUser ? "Zurück zum Eingang" : "Zurück zu Anfragen"}
                </button>
                {renderWeekCalendar()}
              </div>
            )}
          </div>

          {/* Desktop: 6-Spalten – Obere Sektion (Planung): Spalte 1 + 2 gleiche Höhe */}
          <div className="hidden lg:block space-y-4">
            <div className="flex gap-4" style={{ height: "720px" }}>
              {/* Spalte 1: optional Ticket erstellen + Neue Anfragen */}
              <div className="flex w-[28%] min-w-0 flex-col gap-3">
                {!isGewerkUser && (
                  <button
                    type="button"
                    onClick={() => setCreateChooserOpen(true)}
                    title="Ticket oder SPM-Auftrag anlegen"
                    className={`shrink-0 w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all active:scale-[0.99] hover:opacity-95 ${
                      isLightTheme
                        ? "border-blue-700 bg-blue-600 text-white hover:bg-blue-700"
                        : "border-blue-400 bg-blue-600 text-white hover:bg-blue-500"
                    }`}
                  >
                    <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                    Neu anlegen
                  </button>
                )}
              <aside
                ref={setCol1Ref}
                data-col-droppable="column-1"
                className={`flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border p-4 backdrop-blur transition-colors ${
                  isOverCol1 || manualOverCol === "column-1"
                    ? isLightTheme
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                      : "border-blue-500 bg-slate-800/80 ring-2 ring-blue-500/50"
                    : isLightTheme
                      ? "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                      : "border-slate-800 bg-slate-900/70"
                }`}
              >
                <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
                  <h2
                    className={`text-xs font-medium uppercase tracking-wider ${
                      isLightTheme ? "text-slate-600" : "text-slate-500"
                    }`}
                  >
                    {isGewerkUser || incomingTab === "Eingang" ? "1. Neue Anfragen" : "1. Angebote & Kalkulationen"}
                  </h2>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    isLightTheme ? "bg-slate-100 text-slate-700" : "bg-slate-800 text-slate-300"
                  }`}>
                    {loading
                      ? "…"
                      : isGewerkUser || incomingTab === "Eingang"
                        ? col1EingangTicketsView.length + col1EingangAuftraegeView.length
                        : col1AngeboteTicketsView.length + col1AngeboteAuftraegeView.length}
                  </span>
                </div>
                {!isGewerkUser && (
                  <div
                    className={`mb-3 flex shrink-0 rounded-xl p-1 ${
                      isLightTheme ? "bg-slate-100/80" : "bg-slate-800/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setIncomingTab("Eingang")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        incomingTab === "Eingang"
                          ? isLightTheme
                            ? "bg-white text-slate-900 shadow-sm"
                            : "bg-slate-700 text-slate-100 shadow-sm"
                          : isLightTheme
                            ? "text-slate-600 hover:text-slate-900"
                            : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Eingang ({col1EingangTicketsView.length + col1EingangAuftraegeView.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncomingTab("Angebote")}
                      className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        incomingTab === "Angebote"
                          ? isLightTheme
                            ? "bg-white text-slate-900 shadow-sm"
                            : "bg-slate-700 text-slate-100 shadow-sm"
                          : isLightTheme
                            ? "text-slate-600 hover:text-slate-900"
                            : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Angebote ({col1AngeboteTicketsView.length + col1AngeboteAuftraegeView.length})
                    </button>
                  </div>
                )}
                <div className={`mb-2 h-px w-full shrink-0 ${isLightTheme ? "bg-slate-200" : "bg-slate-800"}`} />
                <p className={`mb-2 shrink-0 text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-500"}`}>
                  {isOverCol1 ? "Loslassen → Termin entfernen." : "In Kalender ziehen → Termin setzen."}
                </p>
                <div
                  ref={listScrollRef as React.RefObject<HTMLDivElement>}
                  tabIndex={-1}
                  className="min-w-0 flex-1 cursor-default space-y-3 overflow-y-auto pr-1 pb-6 outline-none lg:pb-8"
                >
                  <SortableContext
                    items={[
                      ...(isGewerkUser || incomingTab === "Eingang" ? col1EingangTicketsView : col1AngeboteTicketsView).map(
                        (t) => `ticket-${t.id}`
                      ),
                      ...(isGewerkUser || incomingTab === "Eingang" ? col1EingangAuftraegeView : col1AngeboteAuftraegeView).map(
                        (a) => `auftrag-${a.id}`
                      ),
                    ]}
                    strategy={verticalListSortingStrategy}
                  >
                    {renderBoardColumnCards(
                      isGewerkUser || incomingTab === "Eingang" ? col1EingangTicketsView : col1AngeboteTicketsView,
                      isGewerkUser || incomingTab === "Eingang" ? col1EingangAuftraegeView : col1AngeboteAuftraegeView,
                      boardSearchNeedle
                        ? "Keine Treffer für diese Suche."
                        : isGewerkUser || incomingTab === "Eingang"
                          ? "Keine Anfragen."
                          : "Keine Angebote.",
                      "column-1",
                      !isGewerkUser && incomingTab === "Angebote"
                        ? {
                            isAngeboteTab: true,
                            onOpenQuoteBuilder: (t) => {
                              setQuoteBuilderTicketId(t.id);
                              setQuoteBuilderOpen(true);
                              markOfferSeen(t.id);
                            },
                            offerAttentionIds,
                          }
                        : undefined
                    )}
                  </SortableContext>
                </div>
              </aside>
              </div>
              {/* Spalte 2: Terminplaner (Kalender) – gleiche Höhe, scrollbar */}
              <section
                ref={desktopCalendarSectionRef}
                id="dashboard-week-calendar"
                className={`flex-1 min-w-0 flex min-h-0 scroll-mt-24 flex-col overflow-hidden rounded-2xl border p-4 transition-colors ${
                  isLightTheme ? "border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "border-slate-800 bg-slate-900/40"
                }`}
              >
                {renderWeekCalendar()}
              </section>
            </div>
          </div>

          {/* Spalten 3–6: nur Desktop-Grid (≥lg); Mobil jeweils eine Spalte über mobileBoardTab, sonst doppelte Droppables */}
          {!isGewerkUser && isMounted && !isMobileViewport && (
            <div className="mt-4 grid h-[720px] grid-cols-4 gap-4">
              {processColumns.map((cfg) => (
                <div key={cfg.id} className="flex h-full min-h-0 flex-col">
                  <KanbanColumn config={cfg} className="h-full min-h-0" />
                </div>
              ))}
            </div>
          )}
          </>
          )}

          <DragOverlay dropAnimation={null} modifiers={[snapCenterToCursor]}>
            {activeDragId?.startsWith("event-") ? (() => {
              const eventKey = activeDragId.replace(/^event-/, "");
              const ev = calendarEvents.find((e) => e.id === eventKey);
              if (!ev) return null;
              const span = getSlotSpan(ev.start, ev.end);
              const overlayHeight = Math.max(44, 48 * span - 4);
              const res = ev.resource;
              const gewerkArr =
                ev.resourceKind === "ticket"
                  ? normalizeGewerke((res as Ticket | undefined)?.gewerk ?? null)
                  : normalizeGewerke((res as HandwerkerAuftrag | undefined)?.gewerk ?? null);
              const numLabel =
                ev.resourceKind === "ticket"
                  ? getTicketOrAuftragNumber(res as Ticket) !== "–"
                    ? getTicketOrAuftragNumber(res as Ticket)
                    : ev.id.slice(0, 8)
                  : (res as HandwerkerAuftrag | undefined)?.auftragsnummer?.trim() || ev.id.replace(/^auftrag-/, "").slice(0, 8);
              const titleLine =
                ev.resourceKind === "ticket"
                  ? getTicketDisplayName(res as Ticket)
                  : getAuftragCardTitle(res as HandwerkerAuftrag);
              const showSpm =
                ev.resourceKind === "auftrag" ||
                !!(res as Ticket | undefined)?.additional_data?.auftrag_id;
              const overlayParallel = getOverlappingEventsLayout.get(ev.id)?.total ?? 1;
              const overlayTight = isMobileViewport && overlayParallel > 1;
              return (
                <div
                  className={`pointer-events-none cursor-grabbing opacity-70 mx-0.5 rounded-lg border px-1.5 py-0.5 text-left text-[11px] font-medium text-white shadow-lg flex flex-col justify-center min-w-[100px] ${
                    (ev.resource?.termin_typ ?? "").trim() === TERMIN_TYP.BESICHTIGUNG
                      ? "bg-slate-500/90 border-slate-400"
                      : `${eventPillBg(ev.resource)} border-blue-400/50`
                  }`}
                  style={{ minHeight: `${overlayHeight}px` }}
                >
                  <div className="flex items-center gap-1">
                    {(() => {
                      const Icon = getGewerkIcon(gewerkArr[0] ?? null);
                      return Icon ? <Icon className="h-3 w-3 shrink-0" strokeWidth={2} /> : null;
                    })()}
                    <span className="line-clamp-1">{numLabel}</span>
                    {showSpm && (
                      <span className="shrink-0 rounded px-1 py-0.5 text-[9px] font-medium bg-amber-500/40 text-amber-100">SPM</span>
                    )}
                  </div>
                  {!overlayTight && (
                    <span className="line-clamp-1 block text-[10px] opacity-90">{titleLine}</span>
                  )}
                </div>
              );
            })() : activeDragId?.startsWith("ticket-") ? (() => {
              const ticketId = activeDragId.replace(/^ticket-/, "");
              const ticket = tickets.find((t) => t.id === ticketId);
              if (!ticket) return null;
              return (
                <div className="pointer-events-none cursor-grabbing opacity-70 rounded-lg border border-blue-500/70 bg-slate-900 px-3 py-2 shadow-lg min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-blue-300">{ticket.additional_data?.auftrag_id ? "AUFTRAG" : "TICKET"}</span>
                    {ticket.additional_data?.auftrag_id && (
                      <span className="rounded px-1.5 py-0.5 text-[9px] font-medium bg-amber-500/30 text-amber-200">SPM</span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-100">{getTicketDisplayName(ticket)}</div>
                  {getTicketOrAuftragNumber(ticket) !== "–" && (
                    <div className="text-xs text-slate-400">{getTicketOrAuftragNumber(ticket)}</div>
                  )}
                </div>
              );
            })() : activeDragId?.startsWith("auftrag-") ? (() => {
              const aid = activeDragId.replace(/^auftrag-/, "");
              const a = auftraegeBoard.find((x) => x.id === aid);
              if (!a) return null;
              return (
                <div className="pointer-events-none cursor-grabbing opacity-70 rounded-lg border border-emerald-500/70 bg-slate-900 px-3 py-2 shadow-lg min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-emerald-300">AUFTRAG</span>
                    <span className="rounded px-1.5 py-0.5 text-[9px] font-medium bg-amber-500/30 text-amber-200">SPM</span>
                  </div>
                  <div className="text-sm font-medium text-slate-100">{getAuftragCardTitle(a)}</div>
                  {(a.auftragsnummer ?? "").trim() && (
                    <div className="text-xs text-slate-400">{(a.auftragsnummer ?? "").trim()}</div>
                  )}
                </div>
              );
            })() : null}
          </DragOverlay>
        </DndContext>
        )}
      </div>

      {/* ─── Schritt 1: Was für ein Termin? (Apple-Style Glassmorphism) ─── */}
      <Dialog
        open={!!pendingSlotDrop && pendingTerminTyp === null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingSlotDrop(null);
            setPendingTerminTyp(null);
          }
        }}
      >
        <DialogContent className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:max-w-sm ${
          isLightTheme
            ? "border-slate-200/80 bg-white/95 text-slate-900"
            : "border-slate-700/80 bg-slate-900/90 text-slate-100"
        }`}>
          <DialogHeader className="space-y-1">
            <DialogTitle className={`text-lg font-semibold tracking-tight ${isLightTheme ? "text-slate-900" : "text-slate-50"}`}>
              Was für ein Termin?
            </DialogTitle>
            <DialogDescription className={isLightTheme ? "text-slate-600" : "text-slate-400"}>
              {pendingSlotDrop?.kind === "ticket" && (
                <span className={`font-medium ${isLightTheme ? "text-slate-800" : "text-slate-200"}`}>
                  {getTicketDisplayName(pendingSlotDrop.ticket)}
                </span>
              )}
              {pendingSlotDrop?.kind === "auftrag" && (
                <span className={`font-medium ${isLightTheme ? "text-slate-800" : "text-slate-200"}`}>
                  {getAuftragCardTitle(pendingSlotDrop.auftrag)}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPendingTerminTyp(TERMIN_TYP.BESICHTIGUNG)}
              className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                isLightTheme
                  ? "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                  : "border-slate-600/80 bg-slate-800/80 text-slate-100 hover:bg-slate-700/80"
              }`}
            >
              Besichtigung
            </button>
            <button
              type="button"
              onClick={() => setPendingTerminTyp(TERMIN_TYP.AUSFUEHRUNG)}
              className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                isLightTheme
                  ? "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                  : "border-slate-600/80 bg-slate-800/80 text-slate-100 hover:bg-slate-700/80"
              }`}
            >
              Ausführung
            </button>
            <button
              type="button"
              onClick={() => {
                setPendingSlotDrop(null);
                setPendingTerminTyp(null);
              }}
              className={`mt-1 text-sm ${isLightTheme ? "text-slate-500 hover:text-slate-700" : "text-slate-500 hover:text-slate-300"}`}
            >
              Abbrechen
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Schritt 2: Zeitfenster-Dialog (Termin festlegen, Apple-Style) ─── */}
      <Dialog
        open={!!pendingSlotDrop && pendingTerminTyp !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingSlotDrop(null);
            setPendingTerminTyp(null);
          }
        }}
      >
        <DialogContent className={`rounded-3xl shadow-2xl backdrop-blur-xl sm:max-w-md ${
          isLightTheme
            ? "border-slate-200/80 bg-white/95 text-slate-900"
            : "border-slate-700/80 bg-slate-900/95 text-slate-100"
        }`}>
          <DialogHeader className="space-y-1.5">
            <DialogTitle className={`text-xl font-semibold tracking-tight ${isLightTheme ? "text-slate-900" : "text-slate-50"}`}>
              Termin festlegen {pendingTerminTyp ? `· ${pendingTerminTyp}` : ""}
            </DialogTitle>
            <DialogDescription className={isLightTheme ? "text-slate-600" : "text-slate-400"}>
              {pendingSlotDrop?.kind === "ticket" && (
                <>
                  <span className={`font-medium ${isLightTheme ? "text-slate-800" : "text-slate-200"}`}>
                    {getTicketDisplayName(pendingSlotDrop.ticket)}
                  </span>
                  {getTicketOrAuftragNumber(pendingSlotDrop.ticket) !== "–" && (
                    <span className={`ml-2 ${isLightTheme ? "text-slate-500" : "text-slate-500"}`}>
                      ({getTicketOrAuftragNumber(pendingSlotDrop.ticket)})
                    </span>
                  )}
                </>
              )}
              {pendingSlotDrop?.kind === "auftrag" && (
                <>
                  <span className={`font-medium ${isLightTheme ? "text-slate-800" : "text-slate-200"}`}>
                    {getAuftragCardTitle(pendingSlotDrop.auftrag)}
                  </span>
                  {(pendingSlotDrop.auftrag.auftragsnummer ?? "").trim() && (
                    <span className={`ml-2 ${isLightTheme ? "text-slate-500" : "text-slate-500"}`}>
                      ({(pendingSlotDrop.auftrag.auftragsnummer ?? "").trim()})
                    </span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-1 font-sans">
            {/* Beginn: Apple-Style Popover (Kalender + Zeit, keine Browser-Defaults) */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>Beginn</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 ${
                      isLightTheme
                        ? "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                        : "border-slate-600/80 bg-slate-800/80 text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <span className={pendingTerminStart ? (isLightTheme ? "text-slate-900" : "text-slate-100") : (isLightTheme ? "text-slate-500" : "text-slate-500")}>
                      {pendingTerminStart
                        ? format(new Date(pendingTerminStart), "EEE, dd.MM.yyyy · HH:mm", { locale: de })
                        : "Datum und Uhrzeit wählen"}
                    </span>
                    <CalendarIcon className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  className={`min-h-[450px] w-auto min-w-[300px] rounded-2xl border p-0 pb-6 font-sans shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ${
                    isLightTheme
                      ? "border-slate-200 bg-white text-slate-900"
                      : "border-slate-800/50 bg-slate-900/90 text-slate-100"
                  }`}
                >
                  {(() => {
                    const d = pendingTerminStart ? new Date(pendingTerminStart) : new Date();
                    const startHour = d.getHours();
                    const startMin = Math.min(45, Math.round(d.getMinutes() / 15) * 15);
                    const build = (date: Date, h: number, min: number) =>
                      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
                    const calLight = {
                      caption_label: "text-sm font-medium text-slate-700",
                      head_cell: "text-slate-500 rounded-md w-9 font-normal text-xs",
                      nav_button: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900",
                      day: "h-9 w-9 p-0 font-normal rounded-xl text-slate-700 hover:bg-slate-100 aria-selected:opacity-100",
                      day_today: "bg-slate-200/80 text-slate-900",
                      day_outside: "text-slate-400 opacity-50",
                      day_disabled: "text-slate-400 opacity-30",
                    };
                    const calDark = {
                      caption_label: "text-sm font-medium text-slate-200",
                      head_cell: "text-slate-500 rounded-md w-9 font-normal text-xs",
                      nav_button: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800/50 bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 hover:text-slate-100",
                      day: "h-9 w-9 p-0 font-normal rounded-xl text-slate-200 hover:bg-slate-700/80 aria-selected:opacity-100",
                      day_today: "bg-slate-700/60 text-slate-100",
                      day_outside: "text-slate-600 opacity-50",
                      day_disabled: "text-slate-600 opacity-30",
                    };
                    const calNames = { months: "flex flex-col space-y-4", month: "space-y-4", caption: "flex justify-center pt-1 relative items-center", nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-y-1", head_row: "flex", row: "flex w-full mt-2", cell: "h-9 w-9 text-center text-sm p-0 relative", day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white", day_hidden: "invisible", ...(isLightTheme ? calLight : calDark) };
                    return (
                      <div className="flex min-h-[450px] flex-col font-sans">
                        <div className="shrink-0 px-5 pt-5">
                          <Calendar
                            mode="single"
                            selected={d}
                            onSelect={(date) => date && setPendingTerminStart(build(date, startHour, startMin))}
                            locale={de}
                            classNames={calNames}
                          />
                        </div>
                        <div className={`shrink-0 border-t ${isLightTheme ? "border-slate-200" : "border-slate-800/50"}`} />
                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 px-5 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              const today = new Date();
                              setPendingTerminStart(build(today, startHour, startMin));
                            }}
                            className="text-sm font-medium text-slate-500 underline-offset-2 hover:text-blue-400 hover:underline"
                          >
                            Heute
                          </button>
                          <select
                            value={String(startHour).padStart(2, "0")}
                            onChange={(e) => {
                              setPendingTerminStart(build(d, parseInt(e.target.value, 10), startMin));
                              setTimeout(() => startMinutesRef.current?.focus({ preventScroll: true }), 0);
                            }}
                            className={`rounded-xl border px-3 py-2 text-center font-medium tabular-nums outline-none focus:ring-2 focus:ring-blue-500/30 ${
                              isLightTheme
                                ? "border-slate-200 bg-slate-100 text-slate-900"
                                : "border-slate-800/50 bg-slate-800/50 text-slate-100"
                            }`}
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={String(i).padStart(2, "0")}>{String(i).padStart(2, "0")} Uhr</option>
                            ))}
                          </select>
                          <div
                            ref={startMinutesRef}
                            tabIndex={-1}
                            className="flex items-center gap-2 focus:outline-none"
                          >
                            {MINUTE_15_OPTIONS.map((m) => {
                              const minVal = parseInt(m, 10);
                              const isActive = startMin === minVal;
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => setPendingTerminStart(build(d, startHour, minVal))}
                                  className={`rounded-full px-4 py-2.5 text-sm font-medium tabular-nums transition-colors ${
                                    isActive
                                      ? "bg-blue-600 text-white"
                                      : isLightTheme
                                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                        : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                                  }`}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>Ende</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 ${
                      isLightTheme
                        ? "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
                        : "border-slate-600/80 bg-slate-800/80 text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    <span className={pendingTerminEnde ? (isLightTheme ? "text-slate-900" : "text-slate-100") : (isLightTheme ? "text-slate-500" : "text-slate-500")}>
                      {pendingTerminEnde
                        ? format(new Date(pendingTerminEnde), "EEE, dd.MM.yyyy · HH:mm", { locale: de })
                        : "Datum und Uhrzeit wählen"}
                    </span>
                    <CalendarIcon className="h-4 w-4 shrink-0 text-slate-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  className={`min-h-[450px] w-auto min-w-[300px] rounded-2xl border p-0 pb-6 font-sans shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ${
                    isLightTheme
                      ? "border-slate-200 bg-white text-slate-900"
                      : "border-slate-800/50 bg-slate-900/90 text-slate-100"
                  }`}
                >
                  {(() => {
                    const d = pendingTerminEnde ? new Date(pendingTerminEnde) : add(new Date(), { hours: 1 });
                    const endHour = d.getHours();
                    const endMin = Math.min(45, Math.round(d.getMinutes() / 15) * 15);
                    const build = (date: Date, h: number, min: number) =>
                      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
                    const calLight2 = { caption_label: "text-sm font-medium text-slate-700", head_cell: "text-slate-500 rounded-md w-9 font-normal text-xs", nav_button: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900", day: "h-9 w-9 p-0 font-normal rounded-xl text-slate-700 hover:bg-slate-100 aria-selected:opacity-100", day_today: "bg-slate-200/80 text-slate-900", day_outside: "text-slate-400 opacity-50", day_disabled: "text-slate-400 opacity-30" };
                    const calDark2 = { caption_label: "text-sm font-medium text-slate-200", head_cell: "text-slate-500 rounded-md w-9 font-normal text-xs", nav_button: "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800/50 bg-slate-800/50 text-slate-300 hover:bg-slate-700/80 hover:text-slate-100", day: "h-9 w-9 p-0 font-normal rounded-xl text-slate-200 hover:bg-slate-700/80 aria-selected:opacity-100", day_today: "bg-slate-700/60 text-slate-100", day_outside: "text-slate-600 opacity-50", day_disabled: "text-slate-600 opacity-30" };
                    const calNames2 = { months: "flex flex-col space-y-4", month: "space-y-4", caption: "flex justify-center pt-1 relative items-center", nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-y-1", head_row: "flex", row: "flex w-full mt-2", cell: "h-9 w-9 text-center text-sm p-0 relative", day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white", day_hidden: "invisible", ...(isLightTheme ? calLight2 : calDark2) };
                    return (
                      <div className="flex min-h-[450px] flex-col font-sans">
                        <div className="shrink-0 px-5 pt-5">
                          <Calendar
                            mode="single"
                            selected={d}
                            onSelect={(date) => date && setPendingTerminEnde(build(date, endHour, endMin))}
                            locale={de}
                            classNames={calNames2}
                          />
                        </div>
                        <div className={`shrink-0 border-t ${isLightTheme ? "border-slate-200" : "border-slate-800/50"}`} />
                        {/* UNTEN: Zeitwahl — Links Heute, Mitte Stunden-Dropdown, Rechts Minuten-Pillen */}
                        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 px-5 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              const today = new Date();
                              setPendingTerminEnde(build(today, endHour, endMin));
                            }}
                            className="text-sm font-medium text-slate-500 underline-offset-2 hover:text-blue-400 hover:underline"
                          >
                            Heute
                          </button>
                          <select
                            value={String(endHour).padStart(2, "0")}
                            onChange={(e) => {
                              setPendingTerminEnde(build(d, parseInt(e.target.value, 10), endMin));
                              setTimeout(() => endMinutesRef.current?.focus({ preventScroll: true }), 0);
                            }}
                            className={`rounded-xl border px-3 py-2 text-center font-medium tabular-nums outline-none focus:ring-2 focus:ring-blue-500/30 ${
                              isLightTheme
                                ? "border-slate-200 bg-slate-100 text-slate-900"
                                : "border-slate-800/50 bg-slate-800/50 text-slate-100"
                            }`}
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option key={i} value={String(i).padStart(2, "0")}>{String(i).padStart(2, "0")} Uhr</option>
                            ))}
                          </select>
                          <div
                            ref={endMinutesRef}
                            tabIndex={-1}
                            className="flex items-center gap-2 focus:outline-none"
                          >
                            {MINUTE_15_OPTIONS.map((m) => {
                              const minVal = parseInt(m, 10);
                              const isActive = endMin === minVal;
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => setPendingTerminEnde(build(d, endHour, minVal))}
                                  className={`rounded-full px-4 py-2.5 text-sm font-medium tabular-nums transition-colors ${
                                    isActive
                                      ? "bg-blue-600 text-white"
                                      : isLightTheme
                                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                        : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                                  }`}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </PopoverContent>
              </Popover>
            </div>
            {pendingTerminStart && pendingTerminEnde && (() => {
              const s = new Date(pendingTerminStart);
              const e = new Date(pendingTerminEnde);
              if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e > s) {
                const diffMin = Math.round((e.getTime() - s.getTime()) / 60000);
                const h = Math.floor(diffMin / 60);
                const m = diffMin % 60;
                return (
                  <p className={`rounded-2xl px-4 py-2.5 text-xs ${isLightTheme ? "bg-slate-100 text-slate-600" : "bg-slate-800/50 text-slate-400"}`}>
                    Dauer: {h > 0 ? `${h} Std.` : ""} {m > 0 ? `${m} Min.` : ""} · {format(s, "EEE, dd.MM.yyyy", { locale: de })}
                  </p>
                );
              }
              return null;
            })()}
          </div>
          <DialogFooter className="gap-3 pt-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setPendingSlotDrop(null)}
              className={`rounded-2xl border px-5 py-2.5 text-sm font-medium transition-colors ${
                isLightTheme
                  ? "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "border-slate-600 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={confirmSlotDrop}
              className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500"
            >
              Termin bestätigen
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Neu anlegen: Auswahl + Ticket-Dialog + SPM-Auftrag-Dialog (nur Admin) */}
      {!isGewerkUser && (
        <>
          <Dialog open={createChooserOpen} onOpenChange={setCreateChooserOpen}>
            <DialogContent
              className={cn(
                "max-w-[calc(100vw-2rem)] sm:max-w-lg",
                isLightTheme
                  ? "border-slate-200 bg-white text-slate-900"
                  : "border-slate-700 bg-slate-900 text-slate-100"
              )}
            >
              <DialogHeader>
                <DialogTitle className={isLightTheme ? "text-slate-900" : "text-slate-100"}>Neu anlegen</DialogTitle>
                <DialogDescription className={isLightTheme ? "text-slate-600" : "text-slate-400"}>
                  Ticket für eine klassische Anfrage-Karte – oder SPM-Auftrag ohne Ticket (z. B. wenn die Automatisierung nicht gelaufen ist).
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    resetCreateTicketForm();
                    setCreateChooserOpen(false);
                    setCreateTicketOpen(true);
                  }}
                  className={cn(
                    "flex min-h-[4.5rem] touch-manipulation flex-col items-start gap-1 rounded-xl border p-4 text-left text-sm font-semibold transition-colors sm:min-h-0",
                    isLightTheme
                      ? "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/80"
                      : "border-slate-600 bg-slate-800/60 hover:border-blue-500/50 hover:bg-slate-800"
                  )}
                >
                  <span className="flex items-center gap-2 text-base">
                    <FileText className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                    Ticket
                  </span>
                  <span className="text-xs font-normal opacity-80">Erscheint im Eingang wie eine normale Anfrage.</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetCreateAuftragForm();
                    setCreateChooserOpen(false);
                    setCreateAuftragOpen(true);
                  }}
                  className={cn(
                    "flex min-h-[4.5rem] touch-manipulation flex-col items-start gap-1 rounded-xl border p-4 text-left text-sm font-semibold transition-colors sm:min-h-0",
                    isLightTheme
                      ? "border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/80"
                      : "border-slate-600 bg-slate-800/60 hover:border-emerald-500/50 hover:bg-slate-800"
                  )}
                >
                  <span className="flex items-center gap-2 text-base">
                    <Building className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                    Auftrag (SPM)
                  </span>
                  <span className="text-xs font-normal opacity-80">Nur Auftrag im Board, ohne verknüpftes Ticket.</span>
                </button>
              </div>
            </DialogContent>
          </Dialog>

        <Dialog
          open={createTicketOpen}
          onOpenChange={(open) => {
            if (!open) {
              setCreateTicketOpen(false);
              resetCreateTicketForm();
            }
          }}
        >
          <DialogContent
            className={cn(
              "flex flex-col gap-0 overflow-hidden p-0",
              /* Mobil: volle Fläche (Sheet), keine abgeschnittenen Ränder */
              "max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-0 max-sm:shadow-none",
              /* Desktop: klassisches Modal */
              "sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[min(92dvh,720px)] sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:shadow-lg",
              isLightTheme
                ? "border-slate-200 bg-white text-slate-900 max-sm:bg-white"
                : "border-slate-700 bg-slate-900 text-slate-100 max-sm:bg-slate-900"
            )}
          >
            <div
              className={cn(
                "shrink-0 border-b px-4 pb-3 pr-14 text-left sm:px-6 sm:pr-16",
                "pt-[max(1.25rem,calc(0.75rem+env(safe-area-inset-top)))] sm:pt-5",
                isLightTheme ? "border-slate-200/90" : "border-slate-700/80"
              )}
            >
              <DialogHeader className="space-y-1.5 text-left">
                <DialogTitle
                  className={cn(
                    "text-lg font-semibold leading-snug tracking-tight sm:text-xl",
                    isLightTheme ? "text-slate-900" : "text-slate-100"
                  )}
                >
                  Ticket erstellen
                </DialogTitle>
                <DialogDescription className={isLightTheme ? "text-slate-600" : "text-slate-400"}>
                  Neues Ticket manuell anlegen – erscheint im Eingang.
                </DialogDescription>
              </DialogHeader>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTicket();
              }}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
              {createTicketError && (
                <div className={`rounded-md border border-red-500/50 p-2 text-sm ${isLightTheme ? "bg-red-50 text-red-800" : "bg-red-950/40 text-red-200"}`}>
                  {createTicketError}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="create-is-partner"
                  checked={createTicketIsPartner}
                  onCheckedChange={(v) => setCreateTicketIsPartner(!!v)}
                  className={isLightTheme ? "border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" : "border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"}
                />
                <Label htmlFor="create-is-partner" className={`text-sm cursor-pointer ${isLightTheme ? "text-slate-700" : "text-slate-300"}`}>
                  Partner-Anfrage
                </Label>
              </div>
              {createTicketIsPartner ? (
                <div className="space-y-2">
                  <Label htmlFor="create-partner-name" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Partner / Firma</Label>
                  <Input
                    id="create-partner-name"
                    value={createTicketPartnerName}
                    onChange={(e) => setCreateTicketPartnerName(e.target.value)}
                    placeholder="z. B. Hausverwaltung Süd GmbH"
                    className={isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="create-kunde-name" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Kundenname *</Label>
                  <Input
                    id="create-kunde-name"
                    value={createTicketKundeName}
                    onChange={(e) => setCreateTicketKundeName(e.target.value)}
                    placeholder="Max Mustermann"
                    required
                    className={isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="create-email" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>E-Mail *</Label>
                <Input
                  id="create-email"
                  type="email"
                  value={createTicketEmail}
                  onChange={(e) => setCreateTicketEmail(e.target.value)}
                  placeholder="info@beispiel.de"
                  required
                  className={isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-telefon" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Telefon (optional)</Label>
                <Input
                  id="create-telefon"
                  type="tel"
                  value={createTicketTelefon}
                  onChange={(e) => setCreateTicketTelefon(e.target.value)}
                  placeholder="+49 89 …"
                  className={isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-adresse" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Objektadresse *</Label>
                <Input
                  id="create-adresse"
                  value={createTicketAdresse}
                  onChange={(e) => setCreateTicketAdresse(e.target.value)}
                  placeholder="Musterstraße 42, 80331 München"
                  required
                  className={isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-gewerk" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Gewerk (optional)</Label>
                <Select value={createTicketGewerk || "_none"} onValueChange={(v) => setCreateTicketGewerk(v === "_none" ? "" : v)}>
                  <SelectTrigger className={isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}>
                    <SelectValue placeholder="Auswählen…" />
                  </SelectTrigger>
                  <SelectContent className={isLightTheme ? "bg-white border-slate-200" : "bg-slate-900 border-slate-700"}>
                    <SelectItem value="_none" className={isLightTheme ? "text-slate-600" : "text-slate-400"}>– Keins –</SelectItem>
                    {GEWERKE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-beschreibung" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>Beschreibung (optional)</Label>
                <Textarea
                  id="create-beschreibung"
                  value={createTicketBeschreibung}
                  onChange={(e) => setCreateTicketBeschreibung(e.target.value)}
                  placeholder="Kurze Beschreibung der Anfrage…"
                  rows={3}
                  className={`resize-none ${isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}`}
                />
              </div>
              </div>
              <DialogFooter
                className={cn(
                  "shrink-0 gap-2 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-0 sm:px-6 sm:pb-3",
                  isLightTheme ? "border-slate-200/90 bg-slate-50/90" : "border-slate-700/80 bg-slate-900/95"
                )}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCreateTicketOpen(false);
                    resetCreateTicketForm();
                  }}
                  className={isLightTheme ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100" : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"}
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  disabled={createTicketSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {createTicketSubmitting ? "Wird erstellt…" : "Ticket erstellen"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={createAuftragOpen}
          onOpenChange={(open) => {
            if (!open) {
              setCreateAuftragOpen(false);
              resetCreateAuftragForm();
            }
          }}
        >
          <DialogContent
            className={cn(
              "flex flex-col gap-0 overflow-hidden p-0",
              "max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-0 max-sm:shadow-none",
              "sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[min(92dvh,720px)] sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:shadow-lg",
              isLightTheme
                ? "border-slate-200 bg-white text-slate-900 max-sm:bg-white"
                : "border-slate-700 bg-slate-900 text-slate-100 max-sm:bg-slate-900"
            )}
          >
            <div
              className={cn(
                "shrink-0 border-b px-4 pb-3 pr-14 text-left sm:px-6 sm:pr-16",
                "pt-[max(1.25rem,calc(0.75rem+env(safe-area-inset-top)))] sm:pt-5",
                isLightTheme ? "border-slate-200/90" : "border-slate-700/80"
              )}
            >
              <DialogHeader className="text-left">
                <DialogTitle
                  className={cn(
                    "text-lg font-semibold leading-snug tracking-tight sm:text-xl",
                    isLightTheme ? "text-slate-900" : "text-slate-100"
                  )}
                >
                  SPM-Auftrag anlegen
                </DialogTitle>
              </DialogHeader>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleCreateAuftrag();
              }}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
                {createAuftragError && (
                  <div
                    className={`rounded-md border border-red-500/50 p-2 text-sm ${isLightTheme ? "bg-red-50 text-red-800" : "bg-red-950/40 text-red-200"}`}
                  >
                    {createAuftragError}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="create-auf-mieter" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Mieter / Kundenname *
                  </Label>
                  <Input
                    id="create-auf-mieter"
                    value={createAuftragMieterName}
                    onChange={(e) => setCreateAuftragMieterName(e.target.value)}
                    placeholder="Max Mustermann"
                    required
                    className={
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                        : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-email" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    E-Mail (optional)
                  </Label>
                  <Input
                    id="create-auf-email"
                    type="email"
                    value={createAuftragEmail}
                    onChange={(e) => setCreateAuftragEmail(e.target.value)}
                    placeholder="falls vorhanden"
                    className={
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                        : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-tel" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Telefon (optional)
                  </Label>
                  <Input
                    id="create-auf-tel"
                    type="tel"
                    value={createAuftragTelefon}
                    onChange={(e) => setCreateAuftragTelefon(e.target.value)}
                    placeholder="+49 89 …"
                    className={
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                        : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-adr" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Objektadresse *
                  </Label>
                  <Input
                    id="create-auf-adr"
                    value={createAuftragAdresse}
                    onChange={(e) => setCreateAuftragAdresse(e.target.value)}
                    placeholder="Musterstraße 42, 80331 München"
                    required
                    className={
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                        : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-aufgabe" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Aufgabe / Kurzbeschreibung (optional)
                  </Label>
                  <Textarea
                    id="create-auf-aufgabe"
                    value={createAuftragAufgabe}
                    onChange={(e) => setCreateAuftragAufgabe(e.target.value)}
                    placeholder="z. B. Wasserschaden Bad"
                    rows={3}
                    className={`resize-none ${isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-rechnung" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Rechnungsempfänger (optional)
                  </Label>
                  <Textarea
                    id="create-auf-rechnung"
                    value={createAuftragRechnungsempfaenger}
                    onChange={(e) => setCreateAuftragRechnungsempfaenger(e.target.value)}
                    placeholder="Firma oder Person, an die die Rechnung geht"
                    rows={2}
                    className={`resize-none ${isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-leistung" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Leistungsempfänger (optional)
                  </Label>
                  <Textarea
                    id="create-auf-leistung"
                    value={createAuftragLeistungsempfaenger}
                    onChange={(e) => setCreateAuftragLeistungsempfaenger(e.target.value)}
                    placeholder="Firma oder Person, für die die Leistung erbracht wird (falls abweichend)"
                    rows={2}
                    className={`resize-none ${isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-nr" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Auftragsnummer *
                  </Label>
                  <Input
                    id="create-auf-nr"
                    value={createAuftragNr}
                    onChange={(e) => setCreateAuftragNr(e.target.value)}
                    placeholder="z. B. aus ERP oder Vermieter"
                    required
                    className={
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                        : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-pdf" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Auftrags-PDF *
                  </Label>
                  <Input
                    ref={createAuftragPdfInputRef}
                    id="create-auf-pdf"
                    type="file"
                    accept="application/pdf,.pdf"
                    className={cn(
                      /* h-10 der Basis-Input schneidet file-Button ab → auto/min-h + symmetrisches Padding */
                      "h-auto min-h-[3.25rem] cursor-pointer py-3 pl-3 pr-2 text-sm leading-normal file:mr-3 file:inline-flex file:h-9 file:shrink-0 file:cursor-pointer file:items-center file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:leading-none",
                      isLightTheme
                        ? "border-slate-200 bg-white text-slate-900 file:bg-slate-100 file:text-slate-800"
                        : "border-slate-600 bg-slate-800 text-slate-100 file:bg-slate-700 file:text-slate-100"
                    )}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setCreateAuftragPdfFile(f ?? null);
                    }}
                  />
                  <p className={`text-xs ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                    Wird in Supabase Storage abgelegt und mit dem Auftrag verknüpft (wie im Auftrags-Dialog).
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-auf-gewerk" className={isLightTheme ? "text-slate-700" : "text-slate-300"}>
                    Gewerk (optional)
                  </Label>
                  <Select value={createAuftragGewerk || "_none"} onValueChange={(v) => setCreateAuftragGewerk(v === "_none" ? "" : v)}>
                    <SelectTrigger
                      id="create-auf-gewerk"
                      className={
                        isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"
                      }
                    >
                      <SelectValue placeholder="Auswählen…" />
                    </SelectTrigger>
                    <SelectContent
                      className={isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-900"}
                    >
                      <SelectItem value="_none" className={isLightTheme ? "text-slate-600" : "text-slate-400"}>
                        – Keins –
                      </SelectItem>
                      {GEWERKE_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className={isLightTheme ? "text-slate-900" : "text-slate-100"}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter
                className={cn(
                  "shrink-0 gap-2 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-0 sm:px-6 sm:pb-3",
                  isLightTheme ? "border-slate-200/90 bg-slate-50/90" : "border-slate-700/80 bg-slate-900/95"
                )}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCreateAuftragOpen(false);
                    resetCreateAuftragForm();
                  }}
                  className={
                    isLightTheme
                      ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  }
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  disabled={createAuftragSubmitting}
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  {createAuftragSubmitting ? "Wird angelegt…" : "Auftrag anlegen"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        </>
      )}

      <Dialog open={!!rejectionTicket} onOpenChange={(open) => !open && closeRejectionModal()}>
        <DialogContent
          className={isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-700 bg-slate-900 text-slate-100"}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const el = e.target as HTMLElement;
            const first = el.querySelector<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            first?.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            listScrollRef.current?.focus({ preventScroll: true });
          }}
        >
          <DialogHeader>
            <DialogTitle className={isLightTheme ? "text-slate-900" : "text-slate-100"}>Anfrage ablehnen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className={`text-sm ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>Grund für die Ablehnung auswählen:</p>
            <div className="space-y-2">
              {REJECTION_REASONS.map((r) => (
                <label
                  key={r.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors ${
                    isLightTheme
                      ? "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="rejection_reason"
                    value={r.value}
                    checked={rejectionReason === r.value}
                    onChange={() => setRejectionReason(r.value)}
                    className="h-4 w-4 border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${isLightTheme ? "text-slate-800" : "text-slate-200"}`}>{r.label}</span>
                </label>
              ))}
            </div>
            {rejectionReason === "other" && (
              <div>
                <label htmlFor="rejection-other" className={`mb-1 block text-xs ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>
                  Sonstiger Grund (optional)
                </label>
                <input
                  id="rejection-other"
                  type="text"
                  value={rejectionOtherText}
                  onChange={(e) => setRejectionOtherText(e.target.value)}
                  placeholder="Grund kurz beschreiben"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    isLightTheme
                      ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500"
                      : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                  }`}
                />
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                closeRejectionModal();
              }}
              className={`rounded-md border px-4 py-2 text-sm font-medium ${
                isLightTheme
                  ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleConfirmRejection();
              }}
              disabled={rejectingId !== null}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {rejectingId ? "Wird abgelehnt…" : "Definitiv ablehnen"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuftragHandwerkerDetailDialog
        open={!!handwerkerAuftragDetail}
        auftrag={handwerkerAuftragDetail}
        onOpenChange={(open) => {
          if (!open) {
            setHandwerkerAuftragDetail(null);
            setHandwerkerLinkedTicketId(null);
          }
        }}
        onAuftragPatch={handleHandwerkerAuftragPatch}
        showBilling={showAuftragBilling}
        showBoardGewerkSection={adminUser?.role === "admin"}
        boardTicketId={handwerkerLinkedTicketId}
        boardTicketGewerk={handwerkerBoardTicketGewerk}
        onBoardGewerkSaved={handleHandwerkerBoardGewerkSaved}
        onAuftragBoardGewerkSaved={handleAuftragBoardGewerkSaved}
      />
      {handwerkerAuftragLoading && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 backdrop-blur-[1px]"
          aria-busy="true"
          aria-live="polite"
        >
          <div
            className={`rounded-xl border px-6 py-4 text-sm shadow-lg ${
              isLightTheme
                ? "border-slate-200 bg-white text-slate-700"
                : "border-slate-600 bg-slate-900 text-slate-200"
            }`}
          >
            Auftrag wird geladen …
          </div>
        </div>
      )}

      {/* Detail-Modal (Trello-Stil): nur assigned_to + internal_notes (DB); Anzeige: ID, Datum, Kunde, Adresse, Anfragetext */}
      <Dialog
        open={!!detailTicket}
        onOpenChange={(open) => {
          // Wenn die Bild-Lightbox offen ist, ignorieren wir Outside-Clicks / ESC von Radix.
          if (!open && lightboxImage) return;
          if (!open) closeDetailModal();
        }}
      >
        <DialogContent
          className={cn(
            "max-h-[100dvh] w-[900px] max-w-[100vw] overflow-y-auto border-0 p-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-xl sm:max-h-[90vh] sm:max-w-[95vw] sm:rounded-xl",
            isLightTheme ? "bg-white" : "bg-slate-900",
            lightboxImage ? "pointer-events-none select-none" : "pointer-events-auto"
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            listScrollRef.current?.focus({ preventScroll: true });
          }}
        >
          {detailTicket && (
            <div className="flex flex-col">
              {/* Header: Spaltenname, Titel + Partner-Badge, Arbeitsauftrag + Schließen */}
              <div className={`relative sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b px-6 py-4 pr-14 sm:rounded-t-xl ${
                isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-900"
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-xs font-medium uppercase tracking-wider ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                      {getColumnNameForTicket(detailTicket)}
                    </span>
                    <DialogTitle className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                      <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                        {getTicketOrAuftragNumber(detailTicket) !== "–"
                          ? getTicketOrAuftragNumber(detailTicket)
                          : (detailTicket?.status ?? "").trim() === STATUS.ANFRAGE ? "Anfrage" : "–"}{" "}
                        · {getTicketDisplayName(detailTicket)}
                      </span>
                      {detailTicket?.additional_data?.auftrag_id && (
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300"}`}>
                          SPM
                        </span>
                      )}
                    </DialogTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={detailTicket?.id ? `/admin/dashboard/auftrag/${detailTicket.id}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium no-underline ${
                      isLightTheme
                        ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    Arbeitsauftrag teilen/drucken
                  </a>
                </div>
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className={`absolute right-3 top-3 rounded-lg p-1.5 ${isLightTheme ? "text-slate-400 hover:bg-slate-100 hover:text-slate-900" : "text-slate-500 hover:bg-slate-800 hover:text-slate-100"}`}
                  aria-label="Schließen"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col gap-0 sm:flex-row">
                <div className={`min-w-0 flex-1 space-y-6 border-r px-6 py-4 sm:flex-[0_0_70%] ${isLightTheme ? "border-slate-200" : "border-slate-700"}`}>
                  {/* Kunden-Informationen: Stift = Bearbeitung aktivieren, Kassette = Speichern */}
                  <section className={`rounded-lg border p-4 ${isLightTheme ? "border-slate-200 bg-slate-50/80" : "border-slate-700 bg-slate-800/50"}`}>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Kunden-Informationen
                      </h3>
                      <div className="flex items-center gap-1">
                        {detailTicket?.is_partner === true && (
                          <span className="rounded-full border border-blue-500 bg-blue-500/15 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                            Partner
                          </span>
                        )}
                        {detailKundenEditMode ? (
                          <button
                            type="button"
                            onClick={handleKundenSpeichern}
                            disabled={detailSaving}
                            className={`rounded p-1.5 transition-colors ${
                              isLightTheme
                                ? "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                                : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
                            } disabled:opacity-50`}
                            title="Speichern"
                            aria-label="Speichern"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDetailKundenEditMode(true)}
                            className={`rounded p-1.5 transition-colors ${
                              isLightTheme
                                ? "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                                : "text-slate-400 hover:bg-slate-700 hover:text-slate-100"
                            }`}
                            title="Bearbeiten"
                            aria-label="Bearbeiten"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className={isLightTheme ? "text-slate-500" : "text-slate-400"}>
                          {detailTicket?.additional_data?.auftrag_id ? "Auftragsnummer" : "Ticket-Nr."}
                        </dt>
                        <dd className="flex items-center gap-2">
                          <span className={`font-medium ${isLightTheme ? "text-slate-900" : "text-slate-100"}`}>
                            {getTicketOrAuftragNumber(detailTicket)}
                          </span>
                          {detailTicket?.additional_data?.auftrag_id && (
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-500/20 text-amber-300"}`}>
                              SPM
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className={isLightTheme ? "text-slate-500" : "text-slate-400"}>Eingangsdatum</dt>
                        <dd className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                          {detailTicket?.created_at != null ? formatTicketDate(detailTicket.created_at) : "–"}
                        </dd>
                      </div>
                      {detailTicket?.is_partner ? (
                        <div>
                          <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>Partner / Firma</dt>
                          <dd>
                            {detailKundenEditMode ? (
                              <Input
                                value={detailPartnerName}
                                onChange={(e) => setDetailPartnerName(e.target.value)}
                                placeholder="Partner / Firma"
                                className={`text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}`}
                              />
                            ) : (
                              <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                                {(detailTicket?.partner_name ?? "").trim() || "–"}
                              </span>
                            )}
                          </dd>
                        </div>
                      ) : (
                        <div>
                          <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>Kundenname</dt>
                          <dd>
                            {detailKundenEditMode ? (
                              <Input
                                value={detailKundeName}
                                onChange={(e) => setDetailKundeName(e.target.value)}
                                placeholder="Kundenname"
                                className={`text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}`}
                              />
                            ) : (
                              <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                                {(detailTicket?.kunde_name ?? "").trim() || "–"}
                              </span>
                            )}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>E-Mail</dt>
                        <dd>
                          {detailKundenEditMode ? (
                            <Input
                              type="email"
                              value={detailEmail}
                              onChange={(e) => setDetailEmail(e.target.value)}
                              placeholder="E-Mail"
                              className={`text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}`}
                            />
                          ) : (
                            <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                              {(detailTicket?.kontakt_email ?? "").trim() ? (
                                <a
                                  href={`mailto:${String(detailTicket.kontakt_email).trim()}`}
                                  className={isLightTheme ? "text-blue-600 hover:underline" : "text-blue-400 hover:underline"}
                                >
                                  {String(detailTicket.kontakt_email).trim()}
                                </a>
                              ) : (
                                "–"
                              )}
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>Telefon</dt>
                        <dd>
                          {detailKundenEditMode ? (
                            <Input
                              type="tel"
                              value={detailTelefon}
                              onChange={(e) => setDetailTelefon(e.target.value)}
                              placeholder="Telefon"
                              className={`text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}`}
                            />
                          ) : (
                            <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                              {(detailTicket?.kontakt_telefon ?? "").trim() ? (
                                <a
                                  href={`tel:${String(detailTicket.kontakt_telefon).trim()}`}
                                  className={isLightTheme ? "text-blue-600 hover:underline" : "text-blue-400 hover:underline"}
                                >
                                  {String(detailTicket.kontakt_telefon).trim()}
                                </a>
                              ) : (
                                "–"
                              )}
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>Adresse</dt>
                        <dd>
                          {detailKundenEditMode ? (
                            <Input
                              value={detailAdresse}
                              onChange={(e) => setDetailAdresse(e.target.value)}
                              placeholder="Objektadresse"
                              className={`text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900" : "border-slate-600 bg-slate-800 text-slate-100"}`}
                            />
                          ) : (
                            <span className={isLightTheme ? "text-slate-900" : "text-slate-100"}>
                              {(detailTicket?.objekt_adresse ?? "").trim() || "–"}
                            </span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className={isLightTheme ? "text-slate-500" : "text-slate-400"}>Gewerke</dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {(() => {
                            // Anzeige im Detail-Panel: direkt aus dem bearbeitbaren State,
                            // damit Änderungen im Multi-Select sofort als Badges sichtbar sind.
                            const gewerkeList =
                              detailGewerke.length > 0
                                ? detailGewerke
                                : normalizeGewerke((detailTicket as Ticket | null)?.gewerk ?? null);
                            return gewerkeList.length > 0 ? (
                              gewerkeList.map((g, idx) => (
                                <span key={`${g}-${idx}`} className={getGewerkBadgeClasses(g, isLightTheme)}>
                                  {g}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500">–</span>
                            );
                          })()}
                        </dd>
                      </div>
                      {adminUser?.role === "admin" && (
                        <div className={`mt-3 rounded-lg border p-3 ${isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-800/50"}`}>
                          <label className={`mb-2 block text-xs font-medium ${isLightTheme ? "text-slate-700" : "text-slate-300"}`}>
                            Gewerke zuweisen
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {GEWERKE_OPTIONS.map((opt) => {
                              const isChecked = detailGewerke.includes(opt.value);
                              return (
                                <label
                                  key={opt.value}
                                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                                    isChecked
                                      ? isLightTheme
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-blue-500 bg-blue-500/20 text-blue-200"
                                      : isLightTheme
                                        ? "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                        : "border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setDetailGewerke((prev) => [...prev, opt.value]);
                                      } else {
                                        setDetailGewerke((prev) => prev.filter((g) => g !== opt.value));
                                      }
                                    }}
                                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div>
                        <dt className={`${isLightTheme ? "text-slate-500" : "text-slate-400"} ${detailKundenEditMode ? "mb-1" : ""}`}>Anfragetext</dt>
                        <dd>
                          {detailKundenEditMode ? (
                            <Textarea
                              value={detailBeschreibung}
                              onChange={(e) => setDetailBeschreibung(e.target.value)}
                              placeholder="Beschreibung der Anfrage"
                              rows={4}
                              className={`resize-none text-sm ${isLightTheme ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-500" : "border-slate-600 bg-slate-800 text-slate-100 placeholder:text-slate-500"}`}
                            />
                          ) : (
                            <span className={`block whitespace-pre-wrap ${isLightTheme ? "text-slate-900" : "text-slate-100"}`}>
                              {(detailTicket?.beschreibung ?? "").trim() || "–"}
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </section>

                  {/* Bilder: zuerst */}
                  <section className={`rounded-lg border p-4 shadow-sm ${isLightTheme ? "border-slate-200 bg-white" : "border-slate-700 bg-slate-800/50"}`}>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Bilder
                    </h3>
                    <div className="space-y-3">
                      <label className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-6 transition-colors ${
                        isLightTheme
                          ? "border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50"
                          : "border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50"
                      }`}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          disabled={uploadingImage || detailTicket?.id == null}
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (!files?.length || !detailTicket?.id) return;
                            for (let i = 0; i < files.length; i++) {
                              await uploadTicketImage(detailTicket.id, files[i]);
                            }
                            e.target.value = "";
                          }}
                        />
                        <span className={`text-sm font-medium ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>
                          {uploadingImage ? "Wird hochgeladen …" : "Bilder auswählen oder hierher ziehen"}
                        </span>
                        <span className="mt-1 text-xs text-slate-500">Direkt in Supabase Storage (ticket-images)</span>
                      </label>
                      {Array.isArray(detailTicket?.image_urls) && detailTicket.image_urls.length > 0 && (
                        <>
                          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {detailTicket.image_urls.map((url, idx) => {
                              const displayUrl = signedImageUrls[idx] ?? url;
                              return (
                                <button
                                  key={`${url}-${idx}`}
                                  type="button"
                                  onClick={() => setLightboxImage(displayUrl)}
                                  className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <img
                                    src={displayUrl}
                                    alt={`Dokumentation ${idx + 1}`}
                                    className="h-20 w-full object-cover"
                                    onError={(e) => {
                                      const el = e.currentTarget;
                                      if (el.src !== url) {
                                        el.src = url;
                                      }
                                    }}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <span className="font-semibold uppercase tracking-wider">
                                Anhänge herunterladen
                              </span>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  void handleDownloadAllImages();
                                }}
                              >
                                Alle herunterladen
                              </button>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {detailTicket.image_urls.map((url, idx) => {
                                const displayUrl = signedImageUrls[idx] ?? url;
                                const fileLabel = `Bild ${idx + 1}`;
                                return (
                                  <button
                                    key={`download-${url}-${idx}`}
                                    type="button"
                                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      void handleDownloadImage(displayUrl, `${fileLabel}.jpg`);
                                    }}
                                  >
                                    {fileLabel}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </section>

                  {/* Interne Bearbeitung: Zugewiesen an, dann Internal notes */}
                  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Interne Bearbeitung
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="detail-termin-start" className="mb-1 block text-sm font-medium text-slate-700">
                            Termin von
                          </label>
                          <input
                            id="detail-termin-start"
                            type="datetime-local"
                            value={detailTerminStart}
                            onChange={(e) => setDetailTerminStart(e.target.value)}
                            onBlur={() =>
                              detailTicket?.id != null &&
                              persistTermin(detailTicket.id, detailTerminStart || null, detailTerminEnde || null)
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="detail-termin-ende" className="mb-1 block text-sm font-medium text-slate-700">
                            Termin bis
                          </label>
                          <input
                            id="detail-termin-ende"
                            type="datetime-local"
                            value={detailTerminEnde}
                            onChange={(e) => setDetailTerminEnde(e.target.value)}
                            onBlur={() =>
                              detailTicket?.id != null &&
                              persistTermin(detailTicket.id, detailTerminStart || null, detailTerminEnde || null)
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      {/* Kommentare */}
                      <div>
                        <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <MessageSquare className="h-4 w-4" />
                          Kommentare
                          {detailKommentare.length > 0 && (
                            <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-xs font-semibold text-slate-600">
                              {detailKommentare.length}
                            </span>
                          )}
                        </label>
                        {/* Kommentar-Liste */}
                        <div className="mb-3 max-h-[240px] space-y-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/50 p-2">
                          {detailKommentare.length === 0 ? (
                            <p className="py-4 text-center text-sm text-slate-400">Noch keine Kommentare.</p>
                          ) : (
                            detailKommentare.map((k) => (
                              <div
                                key={k.id}
                                className="group relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                              >
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-xs font-semibold text-slate-700">{k.author}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">
                                      {format(new Date(k.timestamp), "dd.MM.yyyy HH:mm", { locale: de })}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => deleteKommentar(k.id)}
                                      className="rounded p-0.5 text-slate-300 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                      title="Kommentar löschen"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <p className="whitespace-pre-wrap text-sm text-slate-800">{k.text}</p>
                              </div>
                            ))
                          )}
                        </div>
                        {/* Neuer Kommentar */}
                        <div className="flex gap-2">
                          <textarea
                            rows={2}
                            value={newKommentarText}
                            onChange={(e) => setNewKommentarText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                e.preventDefault();
                                addKommentar();
                              }
                            }}
                            placeholder="Kommentar schreiben"
                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={addKommentar}
                            disabled={!newKommentarText.trim() || detailSaving}
                            className="flex items-center gap-1 self-end rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      {detailSaving && (
                        <p className="text-xs text-slate-500">Wird gespeichert …</p>
                      )}
                    </div>
                  </section>

                  {/* Historie: Timeline (ticket_history + legacy tickets.historie) */}
                  <section
                    className={`rounded-2xl border p-4 ${
                      isLightTheme
                        ? "border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        : "border-slate-700 bg-slate-900/60"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className={`text-xs font-semibold uppercase tracking-wider ${
                        isLightTheme ? "text-slate-500" : "text-slate-500"
                      }`}>
                        Historie
                      </h3>
                      {detailHistoryLoading && (
                        <span className="text-xs text-slate-500">Lädt …</span>
                      )}
                    </div>

                    <ul className="mb-4 space-y-2">
                      {detailTimelineItems.length === 0 ? (
                        <li className="text-xs text-slate-500">Noch keine Einträge.</li>
                      ) : (
                        detailTimelineItems.map((it, idx) => (
                          <li key={it.key} className="relative pl-6">
                            <span
                              className={`absolute left-0 top-[7px] h-2 w-2 rounded-full ${
                                isLightTheme ? "bg-slate-300" : "bg-slate-600"
                              }`}
                            />
                            {idx !== detailTimelineItems.length - 1 && (
                              <span
                                className={`absolute left-[3px] top-3 h-[calc(100%+6px)] w-px ${
                                  isLightTheme ? "bg-slate-200" : "bg-slate-700"
                                }`}
                              />
                            )}
                            <div className="flex items-start gap-2 text-xs text-slate-500">
                              <it.Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2} />
                              <span className={`${isLightTheme ? "text-slate-700" : "text-slate-200"}`}>
                                {it.action}
                              </span>
                              <span className="text-slate-400">
                                – {formatTimelineDateTime(it.at)}
                              </span>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>

                    {/* Manuell hinzufügen (bleibt auf tickets.historie, Timeline zeigt es trotzdem) */}
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="date"
                        value={detailHistorieNewDate}
                        onChange={(e) => setDetailHistorieNewDate(e.target.value)}
                        className={`rounded-xl border px-3 py-2 text-sm ${
                          isLightTheme
                            ? "border-slate-200 bg-slate-50 text-slate-900"
                            : "border-slate-600 bg-slate-800/60 text-slate-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="z. B. Steckdose gesetzt"
                        value={detailHistorieNewText}
                        onChange={(e) => setDetailHistorieNewText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addHistorieEntry()}
                        className={`min-w-[180px] flex-1 rounded-xl border px-3 py-2 text-sm placeholder:text-slate-400 ${
                          isLightTheme
                            ? "border-slate-200 bg-slate-50 text-slate-900"
                            : "border-slate-600 bg-slate-800/60 text-slate-100 placeholder:text-slate-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={addHistorieEntry}
                        disabled={!detailHistorieNewText.trim()}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50 ${
                          isLightTheme
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        Eintrag hinzufügen
                      </button>
                    </div>
                  </section>
                </div>

                {/* Sidebar: Aktionen (30 %) */}
                <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 p-4 sm:flex-[0_0_30%] sm:border-t-0 sm:border-l">
                  <span className="w-full text-xs font-semibold uppercase tracking-wider text-slate-500 sm:mb-1">
                    Aktionen
                  </span>
                  {detailTicket != null &&
                    (detailTicket.status ?? "").trim() === STATUS.ANFRAGE &&
                    !detailTicket.additional_data?.auftrag_id && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleConvertToTicket(detailTicket);
                          closeDetailModal();
                        }}
                        disabled={convertingId === detailTicket.id}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 sm:w-full"
                      >
                        {convertingId === detailTicket.id ? "Wird umgewandelt…" : "In Ticket umwandeln"}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          closeDetailModal();
                          openRejectionModal(detailTicket);
                        }}
                        className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 sm:w-full"
                      >
                        Ablehnen
                      </button>
                    </>
                  )}
                  {detailTicket != null && (detailTicket.status ?? "").trim() !== STATUS.ANFRAGE && (
                    <>
                      {(detailTicket.status ?? "").trim() === STATUS.BESICHTIGUNG || (detailTicket.status ?? "").trim() === STATUS.EINGETEILT ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (detailTicket) setTicketStatus(detailTicket.id, STATUS.ANGEBOT_ERSTELLT);
                          }}
                          className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700 sm:w-full"
                        >
                          Angebot versendet
                        </button>
                      ) : null}
                      {(detailTicket.status ?? "").trim() === STATUS.ANGEBOT_ERSTELLT && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (detailTicket) {
                              setQuoteBuilderTicketId(detailTicket.id);
                              setQuoteBuilderOpen(true);
                            }
                          }}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <FileText className="h-4 w-4" strokeWidth={2} />
                          Angebot bearbeiten
                        </button>
                      )}
                      <p className="text-xs text-slate-500">Status: {detailTicket?.status ?? "–"}.</p>
                    </>
                  )}

                  {detailTicket?.additional_data?.auftrag_id && (
                    <div className="mt-1 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Weitere Dateien
                      </span>
                      <p className={`text-[11px] leading-snug ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                        Angebot, Rechnung, Fotos, Messprotokoll – PDF und Bilder, mehrere möglich.
                      </p>
                      <label className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed py-3 transition-colors ${
                        isLightTheme ? "border-slate-200 hover:border-slate-300 hover:bg-slate-50" : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/50"
                      }`}>
                        <input
                          type="file"
                          accept="application/pdf,.pdf,image/*,.heic,.heif"
                          multiple
                          className="hidden"
                          disabled={uploadingAuftragDoc}
                          onChange={async (e) => {
                            const files = e.target.files;
                            const aid = detailTicket?.additional_data?.auftrag_id;
                            if (!files?.length || !aid) return;
                            let urls = [...detailAuftragDocs];
                            for (let i = 0; i < files.length; i++) {
                              const next = await uploadAuftragDoc(aid, files[i]!, urls);
                              if (next) urls = next;
                            }
                            e.target.value = "";
                          }}
                        />
                        <Upload className={`h-4 w-4 ${isLightTheme ? "text-slate-500" : "text-slate-400"}`} />
                        <span className="text-xs font-medium">
                          {uploadingAuftragDoc ? "Wird hochgeladen …" : "Dateien auswählen"}
                        </span>
                      </label>
                      {detailAuftragWeitereDateien.length > 0 && (
                        <div className="space-y-1">
                          {detailAuftragWeitereDateien.map((url, idx) => (
                            <a
                              key={`${url}-${idx}`}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs no-underline ${
                                isLightTheme ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
                              }`}
                            >
                              <Paperclip className="h-3.5 w-3.5 shrink-0" />
                              Dokument {idx + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {detailTicket && !detailTicket.additional_data?.auftrag_id && (
                    <div className="mt-1 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Angebots-App
                      </span>
                      <a
                        href={(() => {
                          const base = "https://handwerkmuenchen-angebots-app.vercel.app";
                          const params = new URLSearchParams({ customer_id: detailTicket.id });
                          const gewerk = Array.isArray(detailTicket.gewerk) && detailTicket.gewerk.length > 0
                            ? detailTicket.gewerk.join(", ")
                            : null;
                          const subject = [
                            getTicketOrAuftragNumber(detailTicket) !== "–" ? `Ticket ${getTicketOrAuftragNumber(detailTicket)}` : null,
                            gewerk,
                            detailTicket.beschreibung?.slice(0, 80) ?? null,
                          ]
                            .filter(Boolean)
                            .join(" – ");
                          if (subject) params.set("subject", subject);
                          return `${base}?${params.toString()}`;
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                      >
                        <FileText className="h-4 w-4" strokeWidth={2} />
                        Angebot erstellen
                      </a>
                    </div>
                  )}

                  {detailTicket && (
                    <div className="mt-1 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        In Spalte verschieben
                      </span>
                      <Select
                        value={(detailTicket.status ?? "").trim() || STATUS.ANFRAGE}
                        onValueChange={(value) => {
                          setTicketStatus(detailTicket.id, value);
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Spalte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {isGewerkUser
                            ? (() => {
                                const gewerkBoardStatuses = [
                                  STATUS.ANFRAGE,
                                  STATUS.EINGETEILT,
                                  STATUS.BESICHTIGUNG,
                                  STATUS.AUSFUEHRUNG,
                                ] as const;
                                const labels: Record<string, string> = {
                                  [STATUS.ANFRAGE]: "1. Neue Anfragen",
                                  [STATUS.EINGETEILT]: "2. Terminplaner",
                                  [STATUS.BESICHTIGUNG]: "Besichtigung",
                                  [STATUS.AUSFUEHRUNG]: "Ausführung",
                                };
                                const raw = (detailTicket.status ?? "").trim() || STATUS.ANFRAGE;
                                const extra =
                                  !gewerkBoardStatuses.includes(raw as (typeof gewerkBoardStatuses)[number])
                                    ? [{ value: raw, label: `${raw} (aktuell)` }]
                                    : [];
                                return (
                                  <>
                                    {extra.map((o) => (
                                      <SelectItem key={o.value} value={o.value} className="text-xs">
                                        {o.label}
                                      </SelectItem>
                                    ))}
                                    {gewerkBoardStatuses.map((st) => (
                                      <SelectItem key={st} value={st} className="text-xs">
                                        {labels[st] ?? st}
                                      </SelectItem>
                                    ))}
                                  </>
                                );
                              })()
                            : BUSINESS_COLUMNS.filter((c) => c.kind === "kanban").map((col) => (
                                <SelectItem key={col.id} value={col.status} className="text-xs">
                                  {col.title}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox: Bild groß anzeigen (eigenes Portal über dem Ticket-Modal) */}
      {lightboxImage && (
        <ImageLightbox src={lightboxImage} isOpen={true} onClose={() => setLightboxImage(null)} />
      )}

      {/* Quote Builder Overlay – Angebotsbearbeitung (UI only) */}
      {quoteBuilderOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Angebot bearbeiten"
          onClick={() => setQuoteBuilderOpen(false)}
        >
          <div
            className={`flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl shadow-2xl ${
              isLightTheme ? "bg-white" : "bg-slate-900/95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
              {/* Links: Zeilen bearbeiten */}
              <div className={`flex flex-1 flex-col gap-4 overflow-y-auto p-6 ${
                isLightTheme ? "bg-slate-50/50" : "bg-slate-800/30"
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${isLightTheme ? "text-slate-900" : "text-slate-100"}`}>
                    Angebot bearbeiten
                  </h3>
                  <button
                    type="button"
                    onClick={() => setQuoteBuilderOpen(false)}
                    className={`rounded-full p-2 transition-colors ${
                      isLightTheme ? "text-slate-500 hover:bg-slate-200" : "text-slate-400 hover:bg-slate-700"
                    }`}
                    aria-label="Schließen"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>
                <div className="space-y-3">
                  {quoteLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-wrap items-center gap-2 rounded-xl border p-3 transition-colors ${
                        isLightTheme
                          ? "border-slate-200 bg-white shadow-sm"
                          : "border-slate-700 bg-slate-800/50"
                      }`}
                    >
                      <input
                        type="number"
                        min={1}
                        value={line.menge}
                        onChange={(e) => {
                          const next = [...quoteLines];
                          next[idx] = { ...next[idx], menge: Math.max(1, Number(e.target.value) || 1) };
                          setQuoteLines(next);
                        }}
                        className={`w-16 rounded-lg border px-2 py-1.5 text-sm ${
                          isLightTheme
                            ? "border-slate-200 bg-white text-slate-900"
                            : "border-slate-600 bg-slate-900 text-slate-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Beschreibung"
                        value={line.text}
                        onChange={(e) => {
                          const next = [...quoteLines];
                          next[idx] = { ...next[idx], text: e.target.value };
                          setQuoteLines(next);
                        }}
                        className={`min-w-[120px] flex-1 rounded-lg border px-3 py-1.5 text-sm ${
                          isLightTheme
                            ? "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                            : "border-slate-600 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                        }`}
                      />
                      <span className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={line.preis}
                          onChange={(e) => {
                            const next = [...quoteLines];
                            next[idx] = { ...next[idx], preis: Math.max(0, Number(e.target.value) || 0) };
                            setQuoteLines(next);
                          }}
                          className={`w-24 rounded-lg border px-2 py-1.5 text-sm ${
                            isLightTheme
                              ? "border-slate-200 bg-white text-slate-900"
                              : "border-slate-600 bg-slate-900 text-slate-100"
                          }`}
                        />
                        <span className="text-sm">€</span>
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setQuoteLines((prev) => [...prev, { menge: 1, text: "", preis: 0 }])}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm font-medium transition-colors ${
                    isLightTheme
                      ? "border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-100"
                      : "border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-800/50"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Zeile hinzufügen
                </button>
              </div>

              {/* Rechts: A4-Vorschau (Briefpapier) */}
              <div
                className={`flex flex-col items-center justify-start border-t p-6 sm:min-w-[320px] sm:border-l ${
                  isLightTheme ? "border-slate-200 bg-slate-100/50" : "border-slate-700 bg-slate-800/50"
                }`}
              >
                <p className={`mb-4 text-xs font-medium uppercase tracking-wider ${
                  isLightTheme ? "text-slate-500" : "text-slate-400"
                }`}>
                  Vorschau
                </p>
                <div
                  className={`aspect-[210/297] w-full max-w-[280px] overflow-hidden rounded-xl shadow-lg ${
                    isLightTheme ? "bg-white" : "bg-slate-900"
                  }`}
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                >
                  <div className={`flex h-full flex-col p-6 font-sans text-[10px] ${
                    isLightTheme ? "text-slate-800" : "text-slate-200"
                  }`}>
                    <div className="mb-6 border-b pb-4">
                      <h4 className="text-xs font-semibold">Angebot</h4>
                      <p className="mt-1 opacity-70">Kundennummer • Datum</p>
                    </div>
                    <table className="w-full flex-1 border-collapse text-[9px]">
                      <thead>
                        <tr className={`border-b ${isLightTheme ? "border-slate-200" : "border-slate-700"}`}>
                          <th className="py-2 text-left font-medium">Menge</th>
                          <th className="py-2 text-left font-medium">Beschreibung</th>
                          <th className="py-2 text-right font-medium">Preis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quoteLines.map((line, idx) => (
                          <tr key={idx} className={`border-b ${isLightTheme ? "border-slate-100" : "border-slate-800"}`}>
                            <td className="py-2">{line.menge}</td>
                            <td className="py-2">{line.text || "–"}</td>
                            <td className="py-2 text-right">{line.preis.toFixed(2)} €</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className={`mt-2 border-t pt-2 text-right font-semibold ${
                      isLightTheme ? "border-slate-200" : "border-slate-700"
                    }`}>
                      Gesamt: {quoteLines.reduce((s, l) => s + l.menge * l.preis, 0).toFixed(2)} €
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unten rechts: Button "Angebot finalisieren" */}
            <div className={`flex shrink-0 justify-end gap-3 border-t p-4 ${
              isLightTheme ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900/80"
            }`}>
              <button
                type="button"
                onClick={() => setQuoteBuilderOpen(false)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  isLightTheme
                    ? "text-slate-600 hover:bg-slate-100"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => setQuoteBuilderOpen(false)}
                className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Angebot finalisieren
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
