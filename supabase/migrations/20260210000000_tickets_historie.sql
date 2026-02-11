-- Historie (JSONB): Verlauf z.B. frühere Termine, manuelle Einträge
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS historie JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN tickets.historie IS 'Array von Einträgen: { "date": "YYYY-MM-DD", "text": "..." }. Z.B. abgeschlossene Termine, manuelle Notizen.';
