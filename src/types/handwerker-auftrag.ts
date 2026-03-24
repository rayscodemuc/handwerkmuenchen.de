/** Zeile aus `auftraege` für die Handwerker-Detailansicht (Modal). */
export type HandwerkerKommentar = {
  id: string;
  text: string;
  author: string;
  timestamp: string;
};

/** Eintrag in `auftraege.termin_vergangen` nach manuellem Ablegen einer abgeschlossenen Besichtigung. */
export type VergangenerTerminEintrag = {
  termin_start: string;
  termin_ende: string | null;
  termin_typ: string | null;
  abgelegt_am: string;
};

export type HandwerkerAuftrag = {
  id: string;
  created_at?: string | null;
  auftragsnummer: string | null;
  datum: string | null;
  auftragstyp: string | null;
  mieter_name: string | null;
  mieter_email: string | null;
  mieter_telefon: string | null;
  adresse_strasse: string | null;
  adresse_ort: string | null;
  aufgabe: string | null;
  rechnungsempfaenger: string | null;
  leistungsempfaenger: string | null;
  status: string | null;
  anhang_url: string | null;
  image_urls?: string[] | null;
  handwerker_notizen?: string | null;
  handwerker_kommentare?: HandwerkerKommentar[] | null;
  angebot_rechnung_urls?: string[] | null;
  /** Zugewiesene Gewerke (wie tickets.gewerk); Board/RLS. */
  gewerk?: string[] | null;
  /** Kanban-Status analog tickets.status. */
  board_status?: string | null;
  board_position?: number | null;
  termin_start?: string | null;
  termin_ende?: string | null;
  termin_typ?: string | null;
  /** Chronologisch angehängte vergangene Termine (JSON in DB). */
  termin_vergangen?: VergangenerTerminEintrag[] | null;
  [key: string]: unknown;
};
