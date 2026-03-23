-- Kommentar-Thread für SPM-Aufträge (analog zu tickets.kommentare)
ALTER TABLE auftraege
  ADD COLUMN IF NOT EXISTS handwerker_kommentare JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN auftraege.handwerker_kommentare IS 'Kommentare des Handwerker-Dialogs als JSON-Array [{id,text,author,timestamp}]';
