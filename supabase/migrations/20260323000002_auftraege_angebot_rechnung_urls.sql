-- Angebot/Rechnung hochladen (SPM-Aufträge)
ALTER TABLE auftraege
  ADD COLUMN IF NOT EXISTS angebot_rechnung_urls TEXT[] DEFAULT '{}';

COMMENT ON COLUMN auftraege.angebot_rechnung_urls IS 'Array der Public-URLs hochgeladener Angebote/Rechnungen (PDF).';
