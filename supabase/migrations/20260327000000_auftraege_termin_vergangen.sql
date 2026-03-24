-- Abgeschlossene Termine (z. B. Besichtigung): Historie, aktive Felder termin_* können geleert werden.
ALTER TABLE public.auftraege
  ADD COLUMN IF NOT EXISTS termin_vergangen JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.auftraege.termin_vergangen IS
  'Chronologische Liste vergangener Termine: [{ termin_start, termin_ende, termin_typ, abgelegt_am }].';
