-- Migration: source_url Feld zur leads Tabelle hinzufügen
-- Falls die Tabelle bereits existiert, führen Sie dieses Script aus

-- Spalte hinzufügen (falls sie noch nicht existiert)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS source_url TEXT;

-- Kommentar hinzufügen
COMMENT ON COLUMN leads.source_url IS 'Vollständige URL der Seite, von der das Formular abgesendet wurde (inkl. Domain)';

-- Optional: Index für source_url erstellen (falls Sie häufig nach URLs filtern)
-- CREATE INDEX IF NOT EXISTS idx_leads_source_url ON leads(source_url);

