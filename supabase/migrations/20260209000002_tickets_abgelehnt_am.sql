-- Zeitstempel der Ablehnung für abgelehnte Anfragen
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS abgelehnt_am timestamptz;

COMMENT ON COLUMN tickets.abgelehnt_am IS 'Zeitpunkt der Ablehnung (bei status = Abgelehnt).';
