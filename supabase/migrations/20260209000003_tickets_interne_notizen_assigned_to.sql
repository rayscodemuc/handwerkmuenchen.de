-- Optionale Felder für Ticket-Detail: interne Notizen und Zuweisung
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS interne_notizen TEXT,
  ADD COLUMN IF NOT EXISTS assigned_to TEXT;

COMMENT ON COLUMN tickets.interne_notizen IS 'Interne Notizen zum Ticket (nur im Backend sichtbar).';
COMMENT ON COLUMN tickets.assigned_to IS 'Zugewiesener Mitarbeiter (Name oder ID).';
