-- Notizen des Handwerkers pro Auftrag
ALTER TABLE auftraege
  ADD COLUMN IF NOT EXISTS handwerker_notizen TEXT DEFAULT '';

COMMENT ON COLUMN auftraege.handwerker_notizen IS 'Notizen des Handwerkers (intern, nicht für Mieter sichtbar).';
