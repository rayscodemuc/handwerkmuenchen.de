/** Zeile aus `auftraege` für die Handwerker-Detailansicht (Modal). */
export type HandwerkerKommentar = {
  id: string;
  text: string;
  author: string;
  timestamp: string;
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
  [key: string]: unknown;
};
