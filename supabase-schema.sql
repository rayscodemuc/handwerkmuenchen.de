-- Supabase Schema für die leads Tabelle
-- Diese SQL-Datei kann in der Supabase SQL Editor ausgeführt werden

-- Tabelle für alle Formular-Einreichungen erstellen
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  service_type TEXT,
  city TEXT,
  form_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  source_url TEXT,
  additional_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index für häufig verwendete Abfragen erstellen
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_form_id ON leads(form_id);
CREATE INDEX IF NOT EXISTS idx_leads_service_type ON leads(service_type);
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);

-- Row Level Security (RLS) aktivieren
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Alle können neue Leads einfügen (für öffentliche Formulare)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Nur authentifizierte Benutzer können Leads lesen
CREATE POLICY "Allow authenticated read" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Policy für Service Role (vollständiger Zugriff)
CREATE POLICY "Allow service role full access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Kommentare für Dokumentation
COMMENT ON TABLE leads IS 'Speichert alle Formular-Einreichungen von der Website';
COMMENT ON COLUMN leads.customer_name IS 'Vollständiger Name des Kunden';
COMMENT ON COLUMN leads.email IS 'E-Mail-Adresse des Kunden';
COMMENT ON COLUMN leads.phone IS 'Telefonnummer (optional)';
COMMENT ON COLUMN leads.message IS 'Nachricht vom Kunden';
COMMENT ON COLUMN leads.service_type IS 'Art der angefragten Leistung';
COMMENT ON COLUMN leads.city IS 'Stadt/Standort';
COMMENT ON COLUMN leads.form_id IS 'ID des Formulars (z.B. inquiry_form, contact_form)';
COMMENT ON COLUMN leads.page_url IS 'Pfad der Seite, von der das Formular abgesendet wurde (z.B. /kontakt)';
COMMENT ON COLUMN leads.source_url IS 'Vollständige URL der Seite, von der das Formular abgesendet wurde (inkl. Domain)';
COMMENT ON COLUMN leads.additional_data IS 'Zusätzliche Formular-Daten als JSON (z.B. company_name, privacy_accepted, etc.)';
COMMENT ON COLUMN leads.created_at IS 'Zeitstempel der Einreichung';

