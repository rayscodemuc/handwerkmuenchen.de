-- Manuelle SPM-Aufträge: E-Mail nicht immer vorhanden
ALTER TABLE public.auftraege
  ALTER COLUMN mieter_email DROP NOT NULL;
