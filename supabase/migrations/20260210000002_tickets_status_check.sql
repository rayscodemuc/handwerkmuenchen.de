-- Anpassung der Status-Check-Constraint an das 6-Spalten-System
-- Behebt: "new row for relation tickets violates check constraint tickets_status_check"
-- Erlaubte Werte: Anfrage, Eingeteilt, Nachbereitung, Abrechnung, Abgelehnt, Archiv (+ Ticket für Legacy)

ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check;

ALTER TABLE tickets ADD CONSTRAINT tickets_status_check
  CHECK (
    status IS NULL
    OR status IN (
      'Anfrage',
      'Eingeteilt',
      'Nachbereitung',
      'Abrechnung',
      'Abgelehnt',
      'Archiv',
      'Ticket'
    )
  );

COMMENT ON COLUMN tickets.status IS '6-Spalten-System: Anfrage, Eingeteilt, Nachbereitung, Abrechnung, Abgelehnt, Archiv. Legacy: Ticket.';
