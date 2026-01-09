-- Einfaches SQL-Script zum Hinzufügen fehlender Spalten zur leads Tabelle
-- Kopieren Sie DIESE Datei in den Supabase SQL Editor und führen Sie sie aus

-- form_id Spalte hinzufügen
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS form_id TEXT;

-- page_url Spalte hinzufügen
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS page_url TEXT;

-- source_url Spalte hinzufügen
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS source_url TEXT;

-- additional_data Spalte hinzufügen
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS additional_data JSONB;

-- Standardwerte für bestehende Einträge setzen
UPDATE leads 
SET form_id = 'contact_form' 
WHERE form_id IS NULL;

UPDATE leads 
SET page_url = '/' 
WHERE page_url IS NULL;

-- Indizes erstellen
CREATE INDEX IF NOT EXISTS idx_leads_form_id ON leads(form_id);
CREATE INDEX IF NOT EXISTS idx_leads_page_url ON leads(page_url);
CREATE INDEX IF NOT EXISTS idx_leads_source_url ON leads(source_url);

-- Fertig! Die Spalten sollten jetzt vorhanden sein.

