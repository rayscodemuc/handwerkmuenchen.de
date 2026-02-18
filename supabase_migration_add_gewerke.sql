-- Migration: Füge gewerke Spalte zur tickets Tabelle hinzu
-- Diese Spalte speichert mehrere Gewerke als Array (text[])

-- Option 1: Als text[] Array (empfohlen für PostgreSQL)
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS gewerke text[];

-- Option 2: Falls text[] nicht funktioniert, als JSONB verwenden:
-- ALTER TABLE tickets 
-- ADD COLUMN IF NOT EXISTS gewerke jsonb;

-- Optional: Index für bessere Performance bei Abfragen
CREATE INDEX IF NOT EXISTS idx_tickets_gewerke ON tickets USING GIN (gewerke);

-- Optional: Kommentar für Dokumentation
COMMENT ON COLUMN tickets.gewerke IS 'Array von Gewerken (z.B. ["Elektro", "Sanitär"]). Falls leer, wird gewerk verwendet (Fallback).';
