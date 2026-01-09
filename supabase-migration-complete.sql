-- Vollständige Migration für die leads Tabelle
-- Führen Sie dieses Script im Supabase SQL Editor aus, um alle fehlenden Spalten hinzuzufügen

-- form_id Spalte hinzufügen (falls sie noch nicht existiert)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS form_id TEXT;

-- page_url Spalte hinzufügen (falls sie noch nicht existiert)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS page_url TEXT;

-- source_url Spalte hinzufügen (falls sie noch nicht existiert)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS source_url TEXT;

-- additional_data Spalte hinzufügen (falls sie noch nicht existiert)
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS additional_data JSONB;

-- form_id als NOT NULL setzen (nur wenn die Spalte neu erstellt wurde)
-- ACHTUNG: Dies schlägt fehl, wenn bereits NULL-Werte existieren
-- DO $$ 
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM information_schema.columns 
--     WHERE table_name = 'leads' 
--     AND column_name = 'form_id' 
--     AND is_nullable = 'NO'
--   ) THEN
--     ALTER TABLE leads ALTER COLUMN form_id SET NOT NULL;
--   END IF;
-- END $$;

-- Standardwert für form_id setzen (für bestehende Einträge)
UPDATE leads 
SET form_id = 'contact_form' 
WHERE form_id IS NULL;

-- Standardwert für page_url setzen (für bestehende Einträge)
UPDATE leads 
SET page_url = '/' 
WHERE page_url IS NULL;

-- Indizes erstellen (falls sie noch nicht existieren)
CREATE INDEX IF NOT EXISTS idx_leads_form_id ON leads(form_id);
CREATE INDEX IF NOT EXISTS idx_leads_page_url ON leads(page_url);
CREATE INDEX IF NOT EXISTS idx_leads_source_url ON leads(source_url);

-- Kommentare hinzufügen
COMMENT ON COLUMN leads.form_id IS 'ID des Formulars (z.B. inquiry_form, contact_form, service_calculator)';
COMMENT ON COLUMN leads.page_url IS 'Pfad der Seite, von der das Formular abgesendet wurde (z.B. /kontakt)';
COMMENT ON COLUMN leads.source_url IS 'Vollständige URL der Seite, von der das Formular abgesendet wurde (inkl. Domain)';
COMMENT ON COLUMN leads.additional_data IS 'Zusätzliche Formular-Daten als JSON (z.B. company_name, privacy_accepted, etc.)';

-- Überprüfung: Zeigt alle Spalten der leads Tabelle an
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;

