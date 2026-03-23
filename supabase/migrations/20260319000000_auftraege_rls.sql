-- RLS Policies für Tabelle auftraege
-- Ermöglicht Lese-Zugriff für das Admin-Dashboard (Aufträge aus n8n)

ALTER TABLE auftraege ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auftraege_select_authenticated" ON auftraege;

CREATE POLICY "auftraege_select_authenticated"
  ON auftraege FOR SELECT
  TO anon, authenticated
  USING (true);
