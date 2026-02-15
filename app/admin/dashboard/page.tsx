"use client";

import React, { useEffect, useRef, useState, startTransition, useMemo, useCallback } from "react";
import Link from "next/link";
import { Phone, Paintbrush, SprayCan, Building, Zap, Droplets, Hourglass, CheckCircle, X, ChevronLeft, ChevronRight, GripVertical, Trash2, MessageSquare, Send, Sun, Moon } from "lucide-react";
import { format, add, setHours, setMinutes, startOfWeek as startOfWeekDf } from "date-fns";
import { de } from "date-fns/locale";
import { DndContext, DragOverlay, useDraggable, useDroppable, closestCorners, pointerWithin, rectIntersection, MeasuringStrategy, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent, type DragOverEvent, type CollisionDetection } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BUSINESS_COLUMNS, DEFAULT_COMPANY_ID, STATUS } from "@/src/config/businessConfig";

type HistorieEintrag = { date: string; text: string };
type Kommentar = { id: string; text: string; author: string; timestamp: string };

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
  gewerk: string | null;
  status: string | null;
  ablehnungs_grund: string | null;
  abgelehnt_am: string | null;
  interne_notizen: string | null;
  kommentare: Kommentar[] | null;
  assigned_to: string | null;
  image_urls: string[] | null;
  termin_start: string | null;
  termin_ende: string | null;
  historie: HistorieEintrag[] | null;
  /** Positionswert für Trello-Style-Reihenfolge innerhalb einer Spalte. */
  position: number | null;
  created_at: string;
};

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
let _lastCollisionLog = "";
const kanbanCollisionDetection: CollisionDetection = (args) => {
  const { pointerCoordinates, droppableRects, droppableContainers } = args;
  if (!pointerCoordinates) return closestCorners(args);

  const targetColId = detectColumnAtPoint(pointerCoordinates.x, pointerCoordinates.y);

  // Debug: Log nur bei Änderungen
  const logKey = `col=${targetColId ?? "NONE"}`;
  if (logKey !== _lastCollisionLog) {
    _lastCollisionLog = logKey;
    if (targetColId) console.log(`[Collision] Spalte: ${targetColId} bei ptr=(${Math.round(pointerCoordinates.x)},${Math.round(pointerCoordinates.y)})`);
  }

  // Cursor ist IN einer Spalte (oder im Grid-Bereich zwischen Spalten)
  if (targetColId) {
    // Suche Tickets innerhalb dieser Spalte (via @dnd-kit rects)
    const colEl = document.querySelector(`[data-col-droppable="${targetColId}"]`);
    const colDomRect = colEl?.getBoundingClientRect();

    if (colDomRect) {
      const ticketsInCol = droppableContainers.filter((c) => {
        const cid = String(c.id);
        if (!cid.startsWith("ticket-")) return false;
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

  // Cursor NICHT in einer Spalte → Kalender-Slots
  const slotContainers = droppableContainers.filter((c) => String(c.id).startsWith("slot-"));
  if (slotContainers.length > 0) {
    const slotHits = closestCorners({ ...args, droppableContainers: slotContainers });
    if (slotHits.length > 0) return [slotHits[0]];
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

/** Kalender: 07:00–20:00, 30-Min-Slots. */
const CALENDAR_HOUR_START = 7;
const CALENDAR_HOUR_END = 20;
const SLOT_MINUTES = 30;
const SLOTS_PER_HOUR = 60 / SLOT_MINUTES;
const TOTAL_SLOTS = (CALENDAR_HOUR_END - CALENDAR_HOUR_START) * SLOTS_PER_HOUR;

type WeekEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: Ticket;
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
      {...articleProps}
      className={`${articleProps.className ?? ""} ${
        isOver ? "ring-2 ring-blue-500/60 ring-offset-2 ring-offset-slate-900" : ""
      }`}
    >
      <div className="flex gap-1 items-start">
        <span
          className="shrink-0 inline-flex cursor-grab touch-none select-none p-1 text-slate-500 hover:text-slate-300 active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </article>
  );
}

function DroppableSlot({
  dayIndex,
  slotIndex,
  isHighlight,
  style,
  children,
  theme,
}: {
  dayIndex: number;
  slotIndex: number;
  isHighlight: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme: "light" | "dark";
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${dayIndex}-${slotIndex}`,
  });
  const isLight = theme === "light";
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`min-h-[24px] border-b border-r ${
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
}: {
  ev: WeekEvent;
  style: React.CSSProperties;
  className: string;
  onOpenDetail: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `event-${ev.id}`,
    data: { ticketId: ev.id },
  });
  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
      className={`cursor-grab active:cursor-grabbing touch-none select-none ${className} ${isDragging ? "opacity-0" : ""}`}
      style={style}
      title={`${ev.title} – ziehen zum Verschieben, klicken zum Bearbeiten`}
      {...listeners}
      {...attributes}
    >
      {(() => { const Icon = getGewerkIcon(ev.resource?.gewerk ?? null); return Icon ? <Icon className="mb-0.5 h-3 w-3 shrink-0" strokeWidth={2} /> : null; })()}
      <span className="line-clamp-1">{ev.resource?.ticket_display_id ?? ev.id.slice(0, 8)}</span>
      <span className="line-clamp-1 block text-[10px] opacity-90">{getTicketDisplayName(ev.resource ?? {} as Ticket)}</span>
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
function sendRejectionEmail(customerEmail: string, reason: string): void {
  console.log(`E-Mail an Kunde ${customerEmail} gesendet wegen Grund: ${reason}`);
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

/** Kartentyp für visuelle Hierarchie: PARTNER (Blauer Glow) | ANFRAGE (Grau) | TICKET (Blau). */
function getCardType(t: Ticket): "PARTNER" | "ANFRAGE" | "TICKET" {
  if (!!t.is_partner) return "PARTNER";
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

/** Sortierung innerhalb einer Spalte: zuerst nach position (aufsteigend), dann nach created_at (neuere zuerst). */
function sortByPositionThenCreatedAt(a: Ticket, b: Ticket): number {
  const posA = typeof a.position === "number" ? a.position : Number.MAX_SAFE_INTEGER;
  const posB = typeof b.position === "number" ? b.position : Number.MAX_SAFE_INTEGER;
  if (posA !== posB) return posA - posB;
  const createdA = new Date(a.created_at).getTime();
  const createdB = new Date(b.created_at).getTime();
  return createdB - createdA;
}

/** Position beim Anhängen ans Ende einer Spalte: leer → 10, sonst höchste position + 10 (optional ein Ticket ausschließen). */
function getPositionForAppend(columnTickets: Ticket[], excludeTicketId?: string): number {
  const list = excludeTicketId ? columnTickets.filter((t) => t.id !== excludeTicketId) : columnTickets;
  if (list.length === 0) return 10;
  const maxPos = Math.max(10, ...list.map((t) => (typeof t.position === "number" ? t.position : 0)));
  return maxPos + 10;
}

/** Lädt alle Tickets einer Company (alle Status). */
const fetchTickets = async (companyId: string = DEFAULT_COMPANY_ID) => {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  return { data: data ?? [], error };
};

export default function AdminDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inserting, setInserting] = useState(false);
  const [insertingAusbau, setInsertingAusbau] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [rejectionTicket, setRejectionTicket] = useState<Ticket | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("no_capacity");
  const [rejectionOtherText, setRejectionOtherText] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [detailTicket, setDetailTicket] = useState<Ticket | null>(null);
  const [detailKommentare, setDetailKommentare] = useState<Kommentar[]>([]);
  const [newKommentarText, setNewKommentarText] = useState("");
  const [detailAssignedTo, setDetailAssignedTo] = useState("");
  const [detailTerminStart, setDetailTerminStart] = useState("");
  const [detailTerminEnde, setDetailTerminEnde] = useState("");
  const [detailHistorieNewDate, setDetailHistorieNewDate] = useState("");
  const [detailHistorieNewText, setDetailHistorieNewText] = useState("");
  const [detailSaving, setDetailSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  /** Signierte URLs für Modal-Bilder (funktioniert auch bei privatem Storage-Bucket). */
  const [signedImageUrls, setSignedImageUrls] = useState<string[]>([]);
  const listScrollRef = useRef<HTMLDivElement>(null);
  const detailSaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  /** Pending Slot-Drop: Wenn ein Ticket auf einen Kalender-Slot gezogen wird, öffnet sich ein Dialog zur Zeitfenster-Auswahl. */
  const [pendingSlotDrop, setPendingSlotDrop] = useState<{
    ticketId: string;
    ticket: Ticket;
    slotStart: Date;
    slotEnd: Date;
    wasNachbereitung: boolean;
  } | null>(null);
  const [pendingTerminStart, setPendingTerminStart] = useState("");
  const [pendingTerminEnde, setPendingTerminEnde] = useState("");

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

  /** Sensor: Drag startet erst nach 5px Bewegung → Klick bleibt Klick. */
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } });
  const sensors = useSensors(pointerSensor);

  /** Droppables: Eingangsspalte (Desktop) + Mobile-Liste + Eingang-Dropzone für Kalender. */
  const { setNodeRef: setCol1Ref, isOver: isOverCol1 } = useDroppable({ id: COLUMN_IDS[0] });
  const { setNodeRef: setEingangMobileRef, isOver: isOverEingangMobile } = useDroppable({ id: "column-eingang-mobile" });
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

  /** Soft Refresh: Daten neu laden. Automatik: termin_ende überschritten → Status Nachbereitung. */
  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await fetchTickets(DEFAULT_COMPANY_ID);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    const list = data ?? [];
    const now = new Date().toISOString();
    const toMove = list.filter(
      (t: Ticket) =>
        t.termin_ende &&
        t.termin_ende < now &&
        ((t.status ?? "").trim() === STATUS.EINGETEILT || (t.status ?? "").trim() === "Ticket")
    );
    if (toMove.length > 0) {
      console.log(`[AutoMove] ${toMove.length} Ticket(s) mit abgelaufenem termin_ende → Nachbereitung:`,
        toMove.map(t => ({ id: t.id.slice(0, 8), status: t.status, termin_ende: t.termin_ende })));
      for (const t of toMove) {
        await supabase.from("tickets").update({ status: STATUS.NACHBEREITUNG }).eq("id", t.id);
      }
      const updated = list.map((t: Ticket) =>
        toMove.some((m) => m.id === t.id) ? { ...t, status: STATUS.NACHBEREITUNG } : t
      );
      startTransition(() => setTickets(updated));
    } else {
      startTransition(() => setTickets(list));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  /** Test-Ticket: Status exakt 'Anfrage' (wie in der DB), historie: [] zwingend. */
  const createDummyTicket = async () => {
    setInserting(true);
    setError(null);
    const year = new Date().getFullYear();
    const { data: existing } = await supabase.from("tickets").select("id").limit(1);
    const count = (existing?.length ?? 0) + Math.floor(Math.random() * 9000) + 1000;
    const ticketDisplayId = `HM-${year}-${count}`;
    const isPartner = Math.random() > 0.5;
    const partnerName = "Muster-Partner GmbH";
    const kundeName = "Max Mustermann";
    const { error } = await supabase.from("tickets").insert([
      {
        ticket_display_id: ticketDisplayId,
        is_partner: isPartner,
        partner_name: isPartner ? partnerName : null,
        kunde_name: isPartner ? partnerName : kundeName,
        kontakt_email: "dummy@example.com",
        objekt_adresse: "Musterstraße 42, 80331 München",
        beschreibung: "Dummy-Ticket zum Testen des Dashboards. Elektro-Check und Beleuchtung prüfen.",
        gewerk: "Elektro",
        status: "Anfrage",
        historie: [],
      },
    ]);
    if (error) {
      setError(error.message);
    } else {
      await loadTickets();
    }
    setInserting(false);
  };

  /** Test-Ticket Ausbau: Status exakt 'Anfrage', historie: [] zwingend. */
  const createAusbauDummyTicket = async () => {
    setInsertingAusbau(true);
    setError(null);
    const year = new Date().getFullYear();
    const { error } = await supabase.from("tickets").insert([
      {
        ticket_display_id: null,
        is_partner: false,
        partner_name: null,
        kunde_name: "Thomas Weber",
        kontakt_email: "thomas.weber@example.com",
        kontakt_telefon: "+49 151 99887766",
        objekt_adresse: "Rosenheimer Platz 3, 81667 München",
        beschreibung:
          "Wanddurchbruch zwischen Küche und Wohnzimmer geplant. Trockenbauwand muss gestellt und verspachtelt werden.",
        gewerk: "Ausbau",
        status: "Anfrage",
        historie: [],
      },
    ]);
    if (error) {
      setError(error.message);
    } else {
      await loadTickets();
    }
    setInsertingAusbau(false);
  };

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

  const openDetailModal = (ticket: Ticket) => {
    setDetailTicket(ticket);
    setDetailKommentare(Array.isArray(ticket?.kommentare) ? ticket.kommentare : []);
    setNewKommentarText("");
    setDetailAssignedTo(ticket?.assigned_to != null ? String(ticket.assigned_to) : "");
    setDetailTerminStart(toDateTimeLocal(ticket?.termin_start ?? null));
    setDetailTerminEnde(toDateTimeLocal(ticket?.termin_ende ?? null));
    setDetailHistorieNewDate(format(new Date(), "yyyy-MM-dd"));
    setDetailHistorieNewText("");
  };

  const closeDetailModal = () => {
    if (detailTicket) {
      persistAssignedTo(detailTicket.id, detailAssignedTo);
      persistTermin(detailTicket.id, detailTerminStart || null, detailTerminEnde || null);
    }
    setDetailTicket(null);
    setDetailKommentare([]);
    setNewKommentarText("");
    setDetailAssignedTo("");
    setDetailTerminStart("");
    setDetailTerminEnde("");
    setDetailHistorieNewDate("");
    setDetailHistorieNewText("");
  };

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

  /** Beim Drop einer Karte auf einen Kalender-Slot: Status auf Eingeteilt setzen, Termin speichern, ggf. ticket_display_id vergeben. */
  const assignTicketToSlot = useCallback(
    async (ticketId: string, startIso: string, endIso: string) => {
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket) return;
      const needsDisplayId = !ticket.ticket_display_id || String(ticket.ticket_display_id).trim() === "";
      const updates: { status: string; ticket_display_id?: string; termin_start: string; termin_ende: string } = {
        status: STATUS.EINGETEILT,
        termin_start: startIso,
        termin_ende: endIso,
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
[tickets, detailTicket]
  );

  const BUCKET_TICKET_IMAGES = "ticket-images";

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
    const isImage = file.type.startsWith("image/");
    const blob = isImage ? await compressImageForUpload(file) : file;
    const ext = "jpg";
    const path = `${ticketId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET_TICKET_IMAGES).upload(path, blob, {
      cacheControl: "3600",
      upsert: false,
    });
    if (uploadError) {
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

  const colIncomingCfg = BUSINESS_COLUMNS.find((c) => c.id === "incoming")!;
  const colCalendarCfg = BUSINESS_COLUMNS.find((c) => c.id === "calendar")!;
  const colNachbereitungCfg = BUSINESS_COLUMNS.find((c) => c.id === "nachbereitung")!;
  const colAbrechnungCfg = BUSINESS_COLUMNS.find((c) => c.id === "abrechnung")!;
  const colAbgelehntCfg = BUSINESS_COLUMNS.find((c) => c.id === "abgelehnt")!;
  const colArchivCfg = BUSINESS_COLUMNS.find((c) => c.id === "archiv")!;

  /** Spalte 1: Neue Anfragen (ohne Termin). Fallback: ungültiger/unbekannter Status → erste Spalte. */
  const col1Tickets = useMemo(
    () =>
      tickets
        .filter((t) => {
          const s = (t.status ?? "").trim();
          const hasTermin = (t.termin_start ?? "").trim() !== "";
          const inCol2 = hasTermin && (s === colCalendarCfg.status || s === "Ticket");
          const inCol3 = s === colNachbereitungCfg.status;
          const inCol4 = s === colAbrechnungCfg.status;
          const inCol5 = s === colAbgelehntCfg.status;
          const inCol6 = s === colArchivCfg.status;
          if (inCol2 || inCol3 || inCol4 || inCol5 || inCol6) return false;
          return true;
        })
        .sort(sortByPositionThenCreatedAt),
    [
      tickets,
      colCalendarCfg.status,
      colNachbereitungCfg.status,
      colAbrechnungCfg.status,
      colAbgelehntCfg.status,
      colArchivCfg.status,
    ]
  );

  /** Spalte 2: Terminplaner – Eingeteilt mit Termin (Kalender). */
  const col2Tickets = useMemo(
    () =>
      tickets.filter((t) => {
        const hasTermin = (t.termin_start ?? "").trim() !== "";
        const s = (t.status ?? "").trim();
        return hasTermin && (s === colCalendarCfg.status || s === "Ticket");
      }),
    [tickets, colCalendarCfg.status]
  );

  /** Spalte 3: Nachbereitung & Doku (Status aus Business-Config). */
  const col3Tickets = useMemo(
    () =>
      tickets
        .filter((t) => (t.status ?? "").trim() === colNachbereitungCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [tickets, colNachbereitungCfg.status]
  );

  /** Spalte 4: Erledigt & Abrechnung (Status aus Business-Config). */
  const col4Tickets = useMemo(
    () =>
      tickets
        .filter((t) => (t.status ?? "").trim() === colAbrechnungCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [tickets, colAbrechnungCfg.status]
  );

  /** Spalte 5: Abgelehnt (Status aus Business-Config). */
  const col5Tickets = useMemo(
    () =>
      tickets
        .filter((t) => (t.status ?? "").trim() === colAbgelehntCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [tickets, colAbgelehntCfg.status]
  );

  /** Spalte 6: Archiv (Status aus Business-Config). */
  const col6Tickets = useMemo(
    () =>
      tickets
        .filter((t) => (t.status ?? "").trim() === colArchivCfg.status)
        .sort(sortByPositionThenCreatedAt),
    [tickets, colArchivCfg.status]
  );

  /** Kalender-Events aus Spalte-2-Tickets (termin_start). */
  const calendarEvents = useMemo((): WeekEvent[] => {
    return col2Tickets
      .filter((t) => t.termin_start != null && t.termin_start.trim() !== "")
      .map((t) => ({
        id: t.id,
        title: `${getTicketDisplayName(t)}${t.ticket_display_id ? ` (${t.ticket_display_id})` : ""}`,
        start: new Date(t.termin_start!),
        end: t.termin_ende ? new Date(t.termin_ende) : new Date(t.termin_start!),
        resource: t,
      }));
  }, [col2Tickets]);

  /** Setzt nur den Status (für Drop auf Spalte 3–6). */
  const setTicketStatus = useCallback(
    async (ticketId: string, newStatus: string) => {
      const { error } = await supabase.from("tickets").update({ status: newStatus }).eq("id", ticketId);
      if (error) {
        setError(error.message);
        return;
      }
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
      );
      if (detailTicket?.id === ticketId) {
        setDetailTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    },
    [detailTicket?.id]
  );

  // ─── Hilfsfunktion: Spalten-Konfiguration aus Business-Config (alle Kanban-Spalten) ───
  const columnConfigs = useMemo(
    () =>
      BUSINESS_COLUMNS.filter((c) => c.kind === "kanban").map((cfg) => {
        let ticketsForCol: Ticket[];
        if (cfg.id === "incoming") {
          ticketsForCol = col1Tickets;
        } else {
          ticketsForCol = tickets
            .filter((t) => (t.status ?? "").trim() === cfg.status)
            .sort(sortByPositionThenCreatedAt);
        }
        return {
          colId: cfg.droppableId,
          tickets: ticketsForCol,
          status: cfg.status,
        };
      }),
    [tickets, col1Tickets]
  );

  /** Findet die Spalten-Config für ein gegebenes overId (Spalte oder Ticket). */
  const resolveColumnForOverId = useCallback(
    (overId: string): { config: typeof columnConfigs[number]; targetTicketId?: string } | null => {
      // 1) Direkt eine Spalte getroffen (column-1, column-3 … column-6, oder mobile)
      if (overId === COLUMN_IDS[0] || overId === "column-eingang-mobile" || overId === "column-1-mobile-list") {
        return { config: columnConfigs[0] };
      }
      for (const cfg of columnConfigs) {
        if (overId === cfg.colId) return { config: cfg };
      }
      // 2) Eine Karte getroffen → Spalte der Karte ermitteln
      if (overId.startsWith("ticket-")) {
        const uuid = overId.replace(/^ticket-/, "");
        for (const cfg of columnConfigs) {
          if (cfg.tickets.some((t) => t.id === uuid)) {
            return { config: cfg, targetTicketId: uuid };
          }
        }
      }
      return null;
    },
    [columnConfigs]
  );

  /** Berechnet die neue Position: vor einer bestimmten Karte oder ans Ende der Spalte. */
  const computeNewPosition = useCallback(
    (colTickets: Ticket[], draggedId: string, beforeTicketId?: string): number => {
      // Arbeits-Kopie ohne das gezogene Ticket, mit Positionen initialisiert
      let list = colTickets
        .filter((t) => t.id !== draggedId)
        .map((t, i) => ({ ...t, position: typeof t.position === "number" ? t.position : (i + 1) * 10 }));
      if (list.length === 0) return 10;
      if (!beforeTicketId) {
        // Ans Ende
        return Math.max(...list.map((t) => t.position)) + 10;
      }
      const idx = list.findIndex((t) => t.id === beforeTicketId);
      if (idx === -1) return Math.max(...list.map((t) => t.position)) + 10;
      const after = list[idx];
      const before = idx > 0 ? list[idx - 1] : null;
      if (before && after.position - before.position > 1) {
        return Math.round((before.position + after.position) / 2);
      }
      if (!before) return Math.max(1, after.position - 10);
      // Kein Platz → Re-Index
      list = list.map((t, i) => ({ ...t, position: (i + 1) * 10 }));
      const newIdx = list.findIndex((t) => t.id === beforeTicketId);
      const newAfter = list[newIdx];
      const newBefore = newIdx > 0 ? list[newIdx - 1] : null;
      return newBefore ? Math.round((newBefore.position + newAfter.position) / 2) : Math.max(1, newAfter.position - 10);
    },
    []
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
      console.log("[DnD] handleDragEnd RAW", { activeId, overId });

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
            console.log(`[DnD] ⚡ DOM-Override: overId war undefined, Cursor über "${detectedCol}" → gesetzt!`);
            overId = detectedCol;
          } else if (overId === detectedCol) {
            // Bereits korrekte Spalte → nichts tun
          } else if (overId.startsWith("ticket-")) {
            // overId ist ein Ticket → prüfe ob es in der erkannten Zielspalte liegt
            const resolvedOver = resolveColumnForOverId(overId);
            const overColId = resolvedOver?.config.colId;
            if (overColId !== detectedCol) {
              // Ticket gehört zu einer ANDEREN Spalte als der Cursor → Override!
              console.log(`[DnD] ⚡ DOM-Override: overId "${overId}" gehört zu ${overColId}, Cursor über "${detectedCol}" → korrigiert!`);
              overId = detectedCol;
            }
          } else if (overId !== detectedCol) {
            // overId ist ein Slot oder eine falsche Spalte → Override
            console.log(`[DnD] ⚡ DOM-Override: overId war "${overId}", Cursor über "${detectedCol}" → korrigiert!`);
            overId = detectedCol;
          }
        }
      }

      if (!activeId || !overId) {
        console.warn("[DnD] handleDragEnd EARLY EXIT – missing activeId or overId");
        return;
      }

      const isFromCalendar = activeId.startsWith("event-");
      const ticketId = activeId.startsWith("ticket-")
        ? String(activeId).replace(/^ticket-/, "")
        : isFromCalendar
          ? String(activeId).replace(/^event-/, "")
          : String(activeId);
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!ticket) return;
      const wasNachbereitung = (ticket.status ?? "").trim() === STATUS.NACHBEREITUNG;

      // ─── Karte auf Spalte oder Karte (Trello-Style) ───
      const resolved = resolveColumnForOverId(overId);
      console.log("[DnD] resolved column:", resolved ? { colId: resolved.config.colId, status: resolved.config.status, targetTicketId: resolved.targetTicketId } : null);
      if (resolved && !overId.startsWith("slot-")) {
        const { config } = resolved;
        // Präzise Einfügeposition: dropIndicator hat Vorrang (DOM-basiert, pointer-genau)
        const insertBeforeId = dropIndicator && dropIndicator.colId === config.colId
          ? dropIndicator.insertBeforeId ?? undefined
          : resolved.targetTicketId;
        const newPosition = computeNewPosition(config.tickets, ticketId, insertBeforeId);
        console.log("[DnD] insertBeforeId:", insertBeforeId ?? "END", "→ position:", newPosition);
        const isCol1 = config.colId === COLUMN_IDS[0] || overId === "column-eingang-mobile" || overId === "column-1-mobile-list";
        if (isCol1) {
          await moveTicketToColumn(ticketId, STATUS.ANFRAGE, newPosition, { termin_start: null, termin_ende: null });
          if (detailTicket?.id === ticketId) {
            setDetailTerminStart("");
            setDetailTerminEnde("");
          }
        } else {
          await moveTicketToColumn(ticketId, config.status, newPosition);
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

      // Vergangenheits-Check: Slot-Start darf nicht in der Vergangenheit liegen
      if (slotStart < new Date()) {
        alert(`Dieser Zeitraum liegt in der Vergangenheit (${format(slotStart, "dd.MM.yyyy HH:mm", { locale: de })}). Bitte wähle einen zukünftigen Termin.`);
        return;
      }

      if (isFromCalendar) {
        // Kalender-zu-Kalender: Ursprüngliche Dauer beibehalten
        const origStart = ticket.termin_start ? new Date(ticket.termin_start) : null;
        const origEnd = ticket.termin_ende ? new Date(ticket.termin_ende) : null;
        const durationMs = origStart && origEnd ? origEnd.getTime() - origStart.getTime() : 60 * 60 * 1000; // Fallback 1h
        const newEnd = new Date(slotStart.getTime() + durationMs);
        const startIso = slotStart.toISOString();
        const endIso = newEnd.toISOString();
        console.log("[DnD] Kalender-Event verschieben:", { ticketId, startIso, endIso, status: ticket.status });
        // Falls noch keine ticket_display_id → jetzt vergeben
        const calUpdates: Record<string, unknown> = { termin_start: startIso, termin_ende: endIso, status: STATUS.EINGETEILT };
        const needsDisplayId = !ticket.ticket_display_id || String(ticket.ticket_display_id).trim() === "";
        if (needsDisplayId) {
          calUpdates.ticket_display_id = await getNextTicketDisplayId();
        }
        const { error: dbErr } = await supabase
          .from("tickets")
          .update(calUpdates)
          .eq("id", ticketId);
        if (!dbErr) {
          setTickets((prev) =>
            prev.map((t) =>
              t.id === ticketId ? { ...t, ...calUpdates } as Ticket : t
            )
          );
          if (detailTicket?.id === ticketId) {
            setDetailTicket((prev) => (prev ? { ...prev, ...calUpdates } as Ticket : null));
            setDetailTerminStart(toDateTimeLocal(startIso));
            setDetailTerminEnde(toDateTimeLocal(endIso));
          }
        } else {
          console.error("[DnD] ❌ DB-Update fehlgeschlagen:", dbErr.message);
          setError(dbErr.message);
        }
      } else {
        // Ticket aus Spalte → Kalender: Zeitfenster-Dialog öffnen
        const localStart = format(slotStart, "yyyy-MM-dd'T'HH:mm");
        const localEnd = format(slotEnd, "yyyy-MM-dd'T'HH:mm");
        setPendingTerminStart(localStart);
        setPendingTerminEnde(localEnd);
        setPendingSlotDrop({ ticketId, ticket, slotStart, slotEnd, wasNachbereitung });
      }
    },
    [weekStart, assignTicketToSlot, detailTicket?.id, tickets, resolveColumnForOverId, computeNewPosition, moveTicketToColumn]
  );

  /** Bestätigt den Termin aus dem Zeitfenster-Dialog und speichert in DB. */
  const confirmSlotDrop = useCallback(async () => {
    if (!pendingSlotDrop) return;
    const { ticketId, ticket, wasNachbereitung } = pendingSlotDrop;
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
        .update({ termin_start: startIso, termin_ende: endIso, status: STATUS.EINGETEILT, historie: newHistorie })
        .eq("id", ticketId);
      if (!dbErr) {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === ticketId
              ? { ...t, termin_start: startIso, termin_ende: endIso, status: STATUS.EINGETEILT, historie: newHistorie }
              : t
          )
        );
        if (detailTicket?.id === ticketId) {
          setDetailTicket((prev) => (prev ? { ...prev, termin_start: startIso, termin_ende: endIso, status: STATUS.EINGETEILT, historie: newHistorie } : null));
          setDetailTerminStart(toDateTimeLocal(startIso));
          setDetailTerminEnde(toDateTimeLocal(endIso));
        }
      } else setError(dbErr.message);
    } else {
      await assignTicketToSlot(ticketId, startIso, endIso);
    }
    setPendingSlotDrop(null);
  }, [pendingSlotDrop, pendingTerminStart, pendingTerminEnde, assignTicketToSlot, detailTicket?.id, toDateTimeLocal]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDragId(String(event.active?.id ?? ""));
    setManualOverCol(null);
    setDropIndicator(null);
    lastIndicatorKey.current = "";
    console.log("[DnD] ═══════════════════ DRAG START ═══════════════════");
    console.log("[DnD] activeId:", event.active?.id);
    console.log("[DnD] Collision Detection Version: V3-DOM-QUERY");
    // Debug: Prüfe ob Spalten-Elemente sichtbar und messbar sind
    const colIds = ["column-1", "column-3", "column-4", "column-5", "column-6"];
    colIds.forEach((id) => {
      const el = document.querySelector(`[data-col-droppable="${id}"]`) as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        console.log(`[DnD] DOM ${id}: ${Math.round(rect.width)}x${Math.round(rect.height)} @ left=${Math.round(rect.left)} top=${Math.round(rect.top)} right=${Math.round(rect.right)} bottom=${Math.round(rect.bottom)}`);
      } else {
        console.warn(`[DnD] DOM ${id}: ❌ NICHT GEFUNDEN!`);
      }
    });
    // Debug: @dnd-kit registrierte Container
    const allDroppables = document.querySelectorAll("[data-col-droppable]");
    console.log(`[DnD] Alle data-col-droppable Elemente im DOM: ${allDroppables.length}`, Array.from(allDroppables).map(e => e.getAttribute("data-col-droppable")));
    console.log("[DnD] ═══════════════════════════════════════════════════");
  }, []);

  const lastLoggedOverId = useRef<string | undefined>(undefined);
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const overId = event.over?.id as string | undefined;
    // Nur loggen wenn sich overId ändert (reduziert Spam)
    if (overId !== lastLoggedOverId.current) {
      lastLoggedOverId.current = overId;
      const category = !overId ? "KEIN ZIEL" : overId.startsWith("column-") ? "SPALTE" : overId.startsWith("ticket-") ? "TICKET" : overId.startsWith("slot-") ? "KALENDER-SLOT" : "UNBEKANNT";
      console.log(`[DnD] handleDragOver → ${category}: ${overId ?? "null"}`);
    }
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
    const cards = colEl.querySelectorAll<HTMLElement>("[data-ticket-id]");
    let insertBeforeId: string | null = null;
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (py < midY) {
        insertBeforeId = card.getAttribute("data-ticket-id");
        break;
      }
    }
    const key = `${foundCol}:${insertBeforeId ?? "END"}`;
    if (key !== lastIndicatorKey.current) {
      lastIndicatorKey.current = key;
      setDropIndicator({ colId: foundCol, insertBeforeId });
    }
  }, []);

  /** Pill-Farbe nach Gewerk für Kalender-Events. */
  const eventPillBg = (t: Ticket | undefined) => {
    switch (t?.gewerk?.trim()) {
      case "Elektro": return "bg-amber-600/90";
      case "Sanitär": return "bg-blue-600/90";
      case "Ausbau": return "bg-orange-600/90";
      case "Reinigung": return "bg-emerald-600/90";
      case "Facility": return "bg-slate-600/90";
      default: return "bg-slate-600/90";
    }
  };

  /** Event in aktueller Kalenderwoche (Montag–Sonntag)? */
  const isEventInWeek = (d: Date) => {
    const mon = startOfWeekDf(weekStart, { weekStartsOn: 1 }).getTime();
    const sun = mon + 7 * 24 * 60 * 60 * 1000;
    const t = d.getTime();
    return t >= mon && t < sun;
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

  /** Drop-Indicator-Linie (blaue Linie zeigt Einfügeposition). */
  const DropIndicatorLine = () => (
    <div className="flex items-center gap-1 py-0.5">
      <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      <div className="h-0.5 flex-1 rounded-full bg-blue-500" />
    </div>
  );

  /** Rendert Karten für eine beliebige Ticket-Liste (Spalte 1–6). */
  const renderTicketCards = (list: Ticket[], emptyLabel: string, colId?: string) => {
    if (loading) return <p className="text-sm text-slate-400">Lade Tickets…</p>;
    if (list.length === 0) {
      // Auch in leerer Spalte den Indicator zeigen
      const showHere = activeDragId && dropIndicator && colId && dropIndicator.colId === colId;
      return showHere ? <DropIndicatorLine /> : <p className="text-sm text-slate-500">{emptyLabel}</p>;
    }
    const indicatorCol = dropIndicator && colId && dropIndicator.colId === colId ? dropIndicator : null;
    return (
      <>
        {list.map((ticket) => {
          const cardType = getCardType(ticket);
          const displayName = getTicketDisplayName(ticket);
          const hasPhone = !!(ticket.kontakt_telefon ?? "").trim();
          const isAnfrageStatus = (ticket.status ?? "").trim() === STATUS.ANFRAGE;
          const isConverting = convertingId === ticket.id;
          const GewerkIcon = getGewerkIcon(ticket.gewerk);
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
                return "border-blue-500/60 bg-white shadow-[0_4px_12px_rgba(37,99,235,0.12)] hover:border-blue-500 hover:bg-blue-50/40";
              }
              if (cardType === "ANFRAGE") {
                return "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";
              }
              return "border-blue-500/50 bg-white hover:border-blue-500 hover:bg-blue-50/40";
            }
            // Dark theme
            if (cardType === "PARTNER") {
              return "border-blue-500/70 bg-slate-900 shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:border-blue-400";
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
              if (cardType === "ANFRAGE") {
                return "border border-slate-300 bg-slate-100 text-slate-700";
              }
              return "border border-blue-500/60 bg-blue-50 text-blue-700";
            }
            if (cardType === "PARTNER") {
              return "border border-blue-500/70 bg-blue-500/10 text-blue-300";
            }
            if (cardType === "ANFRAGE") {
              return "border border-slate-600 bg-slate-800 text-slate-200";
            }
            return "border border-blue-500/60 bg-blue-500/10 text-blue-200";
          })();
          const showIndicatorBefore = activeDragId && indicatorCol && indicatorCol.insertBeforeId === ticket.id;
          return (
            <React.Fragment key={ticket.id}>
              {showIndicatorBefore && <DropIndicatorLine />}
              <SortableTicketCard
                ticket={ticket}
                role="button"
                tabIndex={0}
                onClick={() => openDetailModal(ticket)}
                onKeyDown={(e) => e.key === "Enter" && openDetailModal(ticket)}
                className={`cursor-pointer rounded-lg border p-3 text-sm transition-colors ${cardBorderClasses} ${urgencyLevel !== "neutral" ? urgencyHeatmapClasses : ""} ${urgencyLevel === "24h" ? "animate-pulse" : ""}`}
              >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${labelBadgeClasses}`}>
                  {cardType === "PARTNER" ? "[PARTNER]" : cardType === "ANFRAGE" ? "[ANFRAGE]" : "[TICKET]"}
                </span>
                <span className={`shrink-0 text-xs tabular-nums ${isLightTheme ? "text-slate-500" : "text-slate-400"}`}>
                  {(ticket.status ?? "").trim() === STATUS.ANFRAGE ? "–" : (ticket.ticket_display_id ?? "–")}
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
                    className={`shrink-0 rounded p-1.5 transition-colors ${
                      isLightTheme
                        ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    }`}
                    aria-label="Anrufen"
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  </a>
                )}
              </div>
              {ticket.beschreibung && (
                <p className={`mt-1 line-clamp-2 text-xs ${isLightTheme ? "text-slate-600" : "text-slate-400"}`}>
                  {ticket.beschreibung}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className={`inline-flex items-center gap-1 ${getGewerkBadgeClasses(ticket.gewerk, isLightTheme)}`}>
                    {GewerkIcon && <GewerkIcon className="h-3 w-3 shrink-0" strokeWidth={2} />}
                    {ticket.gewerk || "–"}
                  </span>
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
              {isAnfrageStatus && (
                <div
                  className={`mt-3 flex w-full gap-2 border-t pt-2 ${
                    isLightTheme ? "border-slate-200" : "border-slate-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleConvertToTicket(ticket); }}
                    disabled={isConverting}
                    className="flex min-w-0 flex-[3] items-center justify-center gap-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    <CheckCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    <span className="whitespace-nowrap">{isConverting ? "Wird umgewandelt…" : "In Ticket umwandeln"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); openRejectionModal(ticket); }}
                    className="flex min-w-0 flex-[2] items-center justify-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                  >
                    <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    Ablehnen
                  </button>
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

  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => add(weekStart, { days: i })), [weekStart]);

  const renderWeekCalendar = () => (
    <>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          isLightTheme ? "text-slate-600" : "text-slate-400"
        }`}>
          Terminplaner
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setWeekStart((prev) => add(prev, { weeks: -1 }))}
            className={`rounded p-1.5 transition-colors ${
              isLightTheme
                ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
            aria-label="Vorherige Woche"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span
            className={`min-w-[180px] text-center text-sm font-medium ${
              isLightTheme ? "text-slate-700" : "text-slate-200"
            }`}
          >
            {format(weekDays[0], "d. MMM", { locale: de })} – {format(weekDays[6], "d. MMM yyyy", { locale: de })}
          </span>
          <button
            type="button"
            onClick={() => setWeekStart((prev) => add(prev, { weeks: 1 }))}
            className={`rounded p-1.5 transition-colors ${
              isLightTheme
                ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
            aria-label="Nächste Woche"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mb-2 text-[11px] text-slate-500">
        24h-Anzeige 07:00–20:00. Karte links in eine Zelle ziehen → Termin + Status „Ticket“.
      </p>
      <div
        className={`rounded-lg border overflow-auto ${
          isLightTheme ? "border-slate-200 bg-white" : "border-slate-800 bg-[#1e293b]"
        }`}
        style={{
          display: "grid",
          gridTemplateColumns: "56px repeat(7, 1fr)",
          gridTemplateRows: `32px repeat(${TOTAL_SLOTS}, 24px)`,
          minHeight: "400px",
        }}
      >
        <div
          className={`sticky top-0 z-10 col-start-1 row-start-1 border-b border-r ${
            isLightTheme ? "border-slate-200 bg-slate-100" : "border-slate-800 bg-slate-800"
          }`}
        />
        {weekDays.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className={`sticky top-0 z-10 border-b border-r px-1 py-1 text-center text-xs font-medium ${
              isLightTheme
                ? "border-slate-200 bg-slate-50 text-slate-700"
                : "border-slate-800 bg-slate-800 text-slate-300"
            }`}
            style={{ gridColumn: dayIndex + 2, gridRow: 1 }}
          >
            {format(day, "EEE d.MM.", { locale: de })}
          </div>
        ))}
        {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
          const hour = CALENDAR_HOUR_START + Math.floor(slotIndex / SLOTS_PER_HOUR);
          const min = (slotIndex % SLOTS_PER_HOUR) * SLOT_MINUTES;
          const timeLabel = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          return (
            <div
              key={`time-${slotIndex}`}
              className={`border-b pr-1 text-right text-[10px] ${
                isLightTheme ? "border-slate-200 text-slate-400" : "border-slate-800 text-slate-500"
              }`}
              style={{ gridColumn: 1, gridRow: slotIndex + 2 }}
            >
              {timeLabel}
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
            />
          ))
        )}
        {calendarEvents.filter((ev) => isEventInWeek(ev.start)).map((ev) => {
          const dayIndex = getDayOffset(ev.start);
          const slotIndex = getSlotIndex(ev.start);
          const span = getSlotSpan(ev.start, ev.end);
          if (dayIndex < 0 || dayIndex > 6 || slotIndex < 0 || slotIndex >= TOTAL_SLOTS) return null;
          return (
            <DraggableEventPill
              key={ev.id}
              ev={ev}
              style={{
                gridColumn: dayIndex + 2,
                gridRow: `${slotIndex + 2} / span ${span}`,
                zIndex: 1,
                minHeight: "22px",
              }}
              className={`mx-0.5 rounded-lg px-1.5 py-0.5 text-left text-[11px] font-medium text-white shadow ${
                eventPillBg(ev.resource)
              } hover:opacity-90`}
              onOpenDetail={() => {
                const t = tickets.find((x) => x.id === ev.id);
                if (t) openDetailModal(t);
              }}
            />
          );
        })}
      </div>
    </>
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
  }: {
    config: (typeof BUSINESS_COLUMNS)[number];
  }) => {
    const { setNodeRef, isOver } = useDroppable({ id: config.droppableId });
    const columnCfg = columnConfigs.find((c) => c.colId === config.droppableId);
    const list = columnCfg?.tickets ?? [];
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
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-900/60"
          : isLightTheme
            ? "border-slate-200 bg-white"
            : "border-slate-800 bg-slate-900/60";

      return isOver || isManualOver ? active : idle;
    })();

    return (
      <section
        ref={setNodeRef}
        data-col-droppable={config.droppableId}
        className={`flex flex-col overflow-hidden rounded-xl border p-4 transition-colors ${sectionColorClasses}`}
      >
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {config.title}
          </h2>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              isLightTheme ? "bg-slate-100 text-slate-700" : "bg-slate-800 text-slate-300"
            }`}
          >
            {loading ? "…" : list.length}
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
            items={list.map((t) => `ticket-${t.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {renderTicketCards(list, "Keine.", config.droppableId)}
          </SortableContext>
        </div>
      </section>
    );
  };

  return (
    <main
      className={`min-h-screen ${
        isLightTheme ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
      }`}
    >
      <div
        className={`sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur sm:px-6 lg:px-8 ${
          isLightTheme ? "border-slate-200 bg-white/95" : "border-slate-800 bg-slate-950/95"
        }`}
      >
        <Link
          href="/"
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold no-underline transition-colors ${
            isLightTheme
              ? "border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
              : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
          }`}
          aria-label="Zur Startseite"
        >
          <span className="tracking-tight">Logo</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={createDummyTicket}
            disabled={inserting}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
              isLightTheme
                ? "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                : "border-slate-600 bg-slate-800 text-slate-200 hover:border-slate-500 hover:bg-slate-700"
            }`}
          >
            {inserting ? "Wird erstellt…" : "Dummy-Ticket anlegen"}
          </button>
          <button
            type="button"
            onClick={createAusbauDummyTicket}
            disabled={insertingAusbau}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
              isLightTheme
                ? "border-orange-400/70 bg-orange-50 text-orange-700 hover:border-orange-500 hover:bg-orange-100"
                : "border-orange-500/60 bg-orange-500/20 text-orange-200 hover:border-orange-400 hover:bg-orange-500/30"
            }`}
          >
            {insertingAusbau ? "Wird erstellt…" : "Ausbau-Test anlegen"}
          </button>
          <button
            type="button"
            onClick={toggleDashboardTheme}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isLightTheme
                ? "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                : "border-slate-600 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800/80"
            }`}
          >
            {isLightTheme ? (
              <>
                <Moon className="h-3.5 w-3.5" />
                <span>Dunkel</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5" />
                <span>Hell</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 rounded-md border border-red-500/50 bg-red-950/40 p-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={kanbanCollisionDetection}
          measuring={MEASURING_CONFIG}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragMove={handleDragMove}
        >
          {/* Mobile: Tabs Eingang | Kalender */}
          <div className="lg:hidden">
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-3 h-9 w-full bg-slate-800">
                <TabsTrigger value="list" className="flex-1 text-xs data-[state=active]:bg-slate-700">
                  Anfragen ({col1Tickets.length})
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex-1 text-xs data-[state=active]:bg-slate-700">
                  Kalender
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="mt-0">
                <section
                  ref={setCol1MobileListRef}
                  className={`flex flex-col rounded-xl border p-4 transition-colors ${
                    isOverCol1MobileList ? "border-blue-500 bg-slate-800/80 ring-2 ring-blue-500/50" : "border-slate-800 bg-slate-900/70"
                  }`}
                >
                  <div ref={listScrollRef} tabIndex={-1} className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
                    <SortableContext items={col1Tickets.map(t => `ticket-${t.id}`)} strategy={verticalListSortingStrategy}>
                      {renderTicketCards(col1Tickets, "Keine Anfragen.", "column-1")}
                    </SortableContext>
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="calendar" className="mt-0">
                <div
                  ref={setEingangMobileRef}
                  className={`mb-3 rounded-lg border border-dashed px-3 py-2 text-center text-xs transition-colors ${
                    isOverEingangMobile
                      ? "border-blue-500 bg-blue-500/20 text-blue-200"
                      : "border-slate-600 bg-slate-800/50 text-slate-400"
                  }`}
                >
                  {isOverEingangMobile ? "Loslassen → Termin entfernen" : "Kalender-Karte hier ablegen → Termin entfernen, Karte zurück in den Eingang"}
                </div>
                {renderWeekCalendar()}
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop: 6-Spalten – Obere Sektion (Planung): Spalte 1 + 2 gleiche Höhe */}
          <div className="hidden lg:block space-y-4">
            <div className="flex gap-4" style={{ height: "720px" }}>
              {/* Spalte 1: Neue Anfragen – flex column, Droppable-Container füllt Restfläche */}
              <aside
                ref={setCol1Ref}
                data-col-droppable="column-1"
                className={`flex w-[28%] min-w-0 flex-col overflow-hidden rounded-xl border p-4 shadow-sm backdrop-blur transition-colors ${
                  isOverCol1 || manualOverCol === "column-1"
                    ? isLightTheme
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/40"
                      : "border-blue-500 bg-slate-800/80 ring-2 ring-blue-500/50"
                    : isLightTheme
                      ? "border-slate-200 bg-white"
                      : "border-slate-800 bg-slate-900/70"
                }`}
              >
                <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    1. Neue Anfragen
                  </h2>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    isLightTheme ? "bg-slate-100 text-slate-700" : "bg-slate-800 text-slate-300"
                  }`}>
                    {loading ? "…" : col1Tickets.length}
                  </span>
                </div>
                <div className={`mb-2 h-px w-full shrink-0 ${isLightTheme ? "bg-slate-200" : "bg-slate-800"}`} />
                <p className={`mb-2 shrink-0 text-[11px] ${isLightTheme ? "text-slate-500" : "text-slate-500"}`}>
                  {isOverCol1 ? "Loslassen → Termin entfernen." : "In Kalender ziehen → Termin setzen."}
                </p>
                <div
                  ref={listScrollRef as React.RefObject<HTMLDivElement>}
                  tabIndex={-1}
                  className="min-w-0 flex-1 cursor-default space-y-3 overflow-y-auto pr-1 outline-none"
                >
                  <SortableContext items={col1Tickets.map(t => `ticket-${t.id}`)} strategy={verticalListSortingStrategy}>
                    {renderTicketCards(col1Tickets, "Keine Anfragen.", "column-1")}
                  </SortableContext>
                </div>
              </aside>
              {/* Spalte 2: Terminplaner (Kalender) – gleiche Höhe */}
              <section
                className={`flex-1 min-w-0 flex flex-col rounded-xl border p-4 h-full overflow-hidden transition-colors ${
                  isLightTheme ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900/40"
                }`}
              >
                {renderWeekCalendar()}
              </section>
            </div>

            {/* Untere Sektion (Prozess): weitere Kanban-Spalten dynamisch */}
            <div className="grid grid-cols-4 gap-4" style={{ height: "720px" }}>
              {processColumns.map((cfg) => (
                <KanbanColumn key={cfg.id} config={cfg} />
              ))}
            </div>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeDragId?.startsWith("event-") ? (() => {
              const ticketId = activeDragId.replace(/^event-/, "");
              const ev = calendarEvents.find((e) => e.id === ticketId);
              if (!ev) return null;
              return (
                <div
                  className={`pointer-events-none cursor-grabbing rounded-lg px-2 py-1 text-left text-[11px] font-medium text-white shadow-lg ${eventPillBg(ev.resource)} min-w-[100px]`}
                >
                  <div className="flex items-center gap-1">
                    {(() => { const Icon = getGewerkIcon(ev.resource?.gewerk ?? null); return Icon ? <Icon className="h-3 w-3 shrink-0" strokeWidth={2} /> : null; })()}
                    <span className="line-clamp-1">{ev.resource?.ticket_display_id ?? ev.id.slice(0, 8)}</span>
                  </div>
                  <span className="line-clamp-1 block text-[10px] opacity-90">{getTicketDisplayName(ev.resource ?? {} as Ticket)}</span>
                </div>
              );
            })() : activeDragId?.startsWith("ticket-") ? (() => {
              const ticketId = activeDragId.replace(/^ticket-/, "");
              const ticket = tickets.find((t) => t.id === ticketId);
              if (!ticket) return null;
              return (
                <div className="pointer-events-none cursor-grabbing rounded-lg border border-blue-500/70 bg-slate-900 px-3 py-2 shadow-lg min-w-[140px]">
                  <div className="text-[10px] text-blue-300">TICKET</div>
                  <div className="text-sm font-medium text-slate-100">{getTicketDisplayName(ticket)}</div>
                  {ticket.ticket_display_id && <div className="text-xs text-slate-400">{ticket.ticket_display_id}</div>}
                </div>
              );
            })() : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* ─── Zeitfenster-Dialog: Termin festlegen beim Drop auf Kalender ─── */}
      <Dialog open={!!pendingSlotDrop} onOpenChange={(open) => { if (!open) setPendingSlotDrop(null); }}>
        <DialogContent className="border-slate-700 bg-slate-900 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Termin festlegen</DialogTitle>
            <DialogDescription className="text-slate-400">
              {pendingSlotDrop?.ticket && (
                <>
                  <span className="font-medium text-slate-200">{getTicketDisplayName(pendingSlotDrop.ticket)}</span>
                  {pendingSlotDrop.ticket.ticket_display_id && (
                    <span className="ml-2 text-slate-500">({pendingSlotDrop.ticket.ticket_display_id})</span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label htmlFor="pending-start" className="mb-1 block text-xs font-medium text-slate-400">
                Beginn
              </label>
              <input
                id="pending-start"
                type="datetime-local"
                value={pendingTerminStart}
                onChange={(e) => setPendingTerminStart(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="pending-end" className="mb-1 block text-xs font-medium text-slate-400">
                Ende
              </label>
              <input
                id="pending-end"
                type="datetime-local"
                value={pendingTerminEnde}
                onChange={(e) => setPendingTerminEnde(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {pendingTerminStart && pendingTerminEnde && (() => {
              const s = new Date(pendingTerminStart);
              const e = new Date(pendingTerminEnde);
              if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e > s) {
                const diffMin = Math.round((e.getTime() - s.getTime()) / 60000);
                const h = Math.floor(diffMin / 60);
                const m = diffMin % 60;
                return (
                  <p className="text-xs text-slate-500">
                    Dauer: {h > 0 ? `${h} Std.` : ""} {m > 0 ? `${m} Min.` : ""} ({format(s, "EEE, dd.MM.yyyy", { locale: de })})
                  </p>
                );
              }
              return null;
            })()}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={() => setPendingSlotDrop(null)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
            >
              Abbrechen
            </button>
            <button
              type="button"
              onClick={confirmSlotDrop}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Termin bestätigen
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!rejectionTicket} onOpenChange={(open) => !open && closeRejectionModal()}>
        <DialogContent
          className="border-slate-700 bg-slate-900 text-slate-100"
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
            <DialogTitle className="text-slate-100">Anfrage ablehnen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-400">Grund für die Ablehnung auswählen:</p>
            <div className="space-y-2">
              {REJECTION_REASONS.map((r) => (
                <label
                  key={r.value}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 hover:bg-slate-800"
                >
                  <input
                    type="radio"
                    name="rejection_reason"
                    value={r.value}
                    checked={rejectionReason === r.value}
                    onChange={() => setRejectionReason(r.value)}
                    className="h-4 w-4 border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-200">{r.label}</span>
                </label>
              ))}
            </div>
            {rejectionReason === "other" && (
              <div>
                <label htmlFor="rejection-other" className="mb-1 block text-xs text-slate-400">
                  Sonstiger Grund (optional)
                </label>
                <input
                  id="rejection-other"
                  type="text"
                  value={rejectionOtherText}
                  onChange={(e) => setRejectionOtherText(e.target.value)}
                  placeholder="Grund kurz beschreiben"
                  className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
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

      {/* Detail-Modal (Trello-Stil): nur assigned_to + internal_notes (DB); Anzeige: ID, Datum, Kunde, Adresse, Anfragetext */}
      <Dialog open={!!detailTicket} onOpenChange={(open) => !open && closeDetailModal()}>
        <DialogContent
          className="max-h-[90vh] w-[900px] max-w-[95vw] overflow-y-auto border-0 bg-white p-0 shadow-xl sm:rounded-xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            listScrollRef.current?.focus({ preventScroll: true });
          }}
        >
          {detailTicket && (
            <div className="flex flex-col">
              {/* Header: Spaltenname, Titel + Partner-Badge, Arbeitsauftrag + Schließen */}
              <div className="relative sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-6 py-4 pr-14 sm:rounded-t-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {getColumnNameForTicket(detailTicket)}
                    </span>
                    <DialogTitle className="text-lg font-semibold text-slate-900">
                      {detailTicket?.ticket_display_id
                        ? detailTicket.ticket_display_id
                        : (detailTicket?.status ?? "").trim() === STATUS.ANFRAGE ? "Anfrage" : "–"}{" "}
                      · {getTicketDisplayName(detailTicket)}
                    </DialogTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={detailTicket?.id ? `/admin/dashboard/auftrag/${detailTicket.id}` : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50"
                  >
                    Arbeitsauftrag teilen/drucken
                  </a>
                </div>
                <button
                  type="button"
                  onClick={closeDetailModal}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Schließen"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col gap-0 sm:flex-row">
                <div className="min-w-0 flex-1 space-y-6 border-r border-slate-200 px-6 py-4 sm:flex-[0_0_70%]">
                  {/* Kunden-Informationen (read-only): nur ID, Datum, Kunde, Adresse, Anfragetext */}
                  <section className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Kunden-Informationen
                      </h3>
                      {detailTicket?.is_partner === true && (
                        <span className="rounded-full border border-blue-500 bg-blue-500/15 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                          Partner
                        </span>
                      )}
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-slate-500">ID</dt>
                        <dd className="font-medium text-slate-900">
                          {detailTicket?.ticket_display_id
                            ? detailTicket.ticket_display_id
                            : "–"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Eingangsdatum</dt>
                        <dd className="text-slate-900">
                          {detailTicket?.created_at != null ? formatTicketDate(detailTicket.created_at) : "–"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Kundenname</dt>
                        <dd className="text-slate-900">{getTicketDisplayName(detailTicket)}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Adresse</dt>
                        <dd className="text-slate-900">
                          {detailTicket?.objekt_adresse != null && String(detailTicket.objekt_adresse).trim() !== ""
                            ? detailTicket.objekt_adresse
                            : "–"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">Anfragetext</dt>
                        <dd className="mt-1 whitespace-pre-wrap rounded border border-slate-200 bg-white p-2 text-slate-900">
                          {detailTicket?.beschreibung != null && String(detailTicket.beschreibung).trim() !== ""
                            ? detailTicket.beschreibung
                            : "–"}
                        </dd>
                      </div>
                    </dl>
                  </section>

                  {/* Bilder: zuerst */}
                  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Bilder
                    </h3>
                    <div className="space-y-3">
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 py-6 transition-colors hover:border-slate-400 hover:bg-slate-50">
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
                        <span className="text-sm font-medium text-slate-600">
                          {uploadingImage ? "Wird hochgeladen …" : "Bilder auswählen oder hierher ziehen"}
                        </span>
                        <span className="mt-1 text-xs text-slate-500">Direkt in Supabase Storage (ticket-images)</span>
                      </label>
                      {Array.isArray(detailTicket?.image_urls) && detailTicket.image_urls.length > 0 && (
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
                      )}
                    </div>
                  </section>

                  {/* Interne Bearbeitung: Zugewiesen an, dann Internal notes */}
                  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Interne Bearbeitung
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="detail-assigned" className="mb-1 block text-sm font-medium text-slate-700">
                          Zugewiesen an
                        </label>
                        <select
                          id="detail-assigned"
                          value={detailAssignedTo}
                          onChange={(e) => {
                            const v = e.target.value;
                            setDetailAssignedTo(v);
                            if (detailTicket?.id != null) persistAssignedTo(detailTicket.id, v);
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {ASSIGNEE_OPTIONS.map((opt) => (
                            <option key={opt.value || "none"} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
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
                            placeholder="Kommentar schreiben … (Ctrl+Enter zum Senden)"
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

                  {/* Historie: Verlauf (z. B. abgeschlossene Termine, manuelle Einträge) */}
                  <section className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Historie
                    </h3>
                    <ul className="mb-4 space-y-1.5 text-sm">
                      {((detailTicket?.historie ?? []) as HistorieEintrag[]).length === 0 ? (
                        <li className="text-slate-500">Noch keine Einträge.</li>
                      ) : (
                        ((detailTicket?.historie ?? []) as HistorieEintrag[]).map((e, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-medium text-slate-600">{e.date}</span>
                            <span className="text-slate-800">{e.text}</span>
                          </li>
                        ))
                      )}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="date"
                        value={detailHistorieNewDate}
                        onChange={(e) => setDetailHistorieNewDate(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="z. B. Steckdose gesetzt"
                        value={detailHistorieNewText}
                        onChange={(e) => setDetailHistorieNewText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addHistorieEntry()}
                        className="min-w-[180px] flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={addHistorieEntry}
                        disabled={!detailHistorieNewText.trim()}
                        className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
                      >
                        Eintrag hinzufügen
                      </button>
                    </div>
                  </section>
                </div>

                {/* Sidebar: Aktionen (30 %) */}
                <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50/50 p-4 sm:flex-[0_0_30%] sm:border-t-0 sm:border-l">
                  <span className="w-full text-xs font-semibold uppercase tracking-wider text-slate-500 sm:mb-1">
                    Aktionen
                  </span>
                  {detailTicket != null && (detailTicket.status ?? "").trim() === STATUS.ANFRAGE && (
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
                    <p className="text-xs text-slate-500">Status: {detailTicket?.status ?? "–"}. Keine Anfrage-Aktionen.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox: Bild groß anzeigen */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bild vergrößert"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-800 shadow-lg transition hover:bg-white"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <img
            src={lightboxImage}
            alt="Vergrößerte Ansicht"
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}

