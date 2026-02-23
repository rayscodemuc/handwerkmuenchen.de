-- RLS Policies für Tabelle tickets
-- Behebt: "new row violates row-level security policy for table tickets"
-- Die App nutzt den Anon-Key; ohne Policy sind INSERT/SELECT/UPDATE/DELETE blockiert.

-- RLS ist vermutlich bereits aktiv. Falls nicht, aktivieren:
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Bestehende Policies entfernen (idempotent)
DROP POLICY IF EXISTS "tickets_select_anon_authenticated" ON tickets;
DROP POLICY IF EXISTS "tickets_insert_anon_authenticated" ON tickets;
DROP POLICY IF EXISTS "tickets_update_anon_authenticated" ON tickets;
DROP POLICY IF EXISTS "tickets_delete_anon_authenticated" ON tickets;

-- Policy: Lese-Zugriff für anon und authenticated (Dashboard, API)
CREATE POLICY "tickets_select_anon_authenticated"
  ON tickets FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Insert für anon und authenticated (Dummy-Tickets, Formulare, API)
CREATE POLICY "tickets_insert_anon_authenticated"
  ON tickets FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Update für anon und authenticated (Dashboard: Status, Termin, Historie)
CREATE POLICY "tickets_update_anon_authenticated"
  ON tickets FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Delete für anon und authenticated (falls im Admin nötig)
CREATE POLICY "tickets_delete_anon_authenticated"
  ON tickets FOR DELETE
  TO anon, authenticated
  USING (true);

-- Service Role behält vollen Zugriff (keine Policy nötig; service_role umgeht RLS)
