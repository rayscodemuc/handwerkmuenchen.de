export const STATUS = {
  ANFRAGE: "Anfrage",
  EINGETEILT: "Eingeteilt",
  NACHBEREITUNG: "Nachbereitung",
  ABRECHNUNG: "Abrechnung",
  ABGELEHNT: "Abgelehnt",
  ARCHIV: "Archiv",
} as const;

export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

export type BoardColumnId =
  | "incoming"
  | "calendar"
  | "nachbereitung"
  | "abrechnung"
  | "abgelehnt"
  | "archiv";

export interface BoardColumnConfig {
  /** Stabile ID für Logik (z.B. Drag & Drop). */
  id: BoardColumnId;
  /** Laufende Nummer + Anzeigename. */
  title: string;
  /** Kurze Beschreibung unter dem Titel (optional). */
  description?: string;
  /** Zuordnung zum DB-Status (tickets.status). */
  status: StatusValue;
  /** Droppable-ID für @dnd-kit (muss mit data-col-droppable übereinstimmen). */
  droppableId: string;
  /** Spaltentyp – einfache Kartenliste oder Kalender. */
  kind: "kanban" | "calendar";
  /** Primärfarbe der Spalte (für Badges/Borders, vorerst informativ). */
  color: "blue" | "slate" | "amber" | "emerald" | "red";
  /** Sortierreihenfolge im Board. */
  order: number;
}

export const BUSINESS_COLUMNS: BoardColumnConfig[] = [
  {
    id: "incoming",
    title: "1. Neue Anfragen",
    description: "Tickets ohne Termin – Eingangsbereich.",
    status: STATUS.ANFRAGE,
    droppableId: "column-1",
    kind: "kanban",
    color: "blue",
    order: 1,
  },
  {
    id: "calendar",
    title: "2. Terminplaner",
    description: "Eingeteilte Tickets mit Termin im Kalender.",
    status: STATUS.EINGETEILT,
    droppableId: "column-2",
    kind: "calendar",
    color: "slate",
    order: 2,
  },
  {
    id: "nachbereitung",
    title: "3. Nachbereitung & Doku",
    description: "Dokumentation und Nacharbeiten nach Einsatz.",
    status: STATUS.NACHBEREITUNG,
    droppableId: "column-3",
    kind: "kanban",
    color: "amber",
    order: 3,
  },
  {
    id: "abrechnung",
    title: "4. Erledigt & Abrechnung",
    description: "Abgeschlossene Tickets zur Abrechnung.",
    status: STATUS.ABRECHNUNG,
    droppableId: "column-4",
    kind: "kanban",
    color: "emerald",
    order: 4,
  },
  {
    id: "abgelehnt",
    title: "5. Abgelehnt",
    description: "Abgelehnte Anfragen.",
    status: STATUS.ABGELEHNT,
    droppableId: "column-5",
    kind: "kanban",
    color: "red",
    order: 5,
  },
  {
    id: "archiv",
    title: "6. Archiv",
    description: "Abgeschlossene und archivierte Tickets.",
    status: STATUS.ARCHIV,
    droppableId: "column-6",
    kind: "kanban",
    color: "slate",
    order: 6,
  },
] as const;

/** Aktuelle Company-ID – muss zu den Formularen passen. */
export const DEFAULT_COMPANY_ID = "d94e4d71-f843-435d-b098-91d066a01253";

