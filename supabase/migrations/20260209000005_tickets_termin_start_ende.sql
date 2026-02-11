-- Terminplanung: Start- und Endzeit für Ticket-Termine
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS termin_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termin_ende TIMESTAMPTZ;

COMMENT ON COLUMN tickets.termin_start IS 'Geplanter Terminbeginn (für Kalender-Ansicht).';
COMMENT ON COLUMN tickets.termin_ende IS 'Geplantes Terminende.';
