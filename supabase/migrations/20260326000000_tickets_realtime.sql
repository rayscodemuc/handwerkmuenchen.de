-- Realtime für tickets: Publikation + REPLICA IDENTITY
-- Ohne dies erhalten Gewerk-User keine Realtime-Events bei Gewerk-Zuweisung.

-- Tabelle zur Realtime-Publikation hinzufügen (Fehler ignorieren falls bereits enthalten)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
EXCEPTION
  WHEN duplicate_object THEN NULL; -- schon in Publikation
END
$$;

-- REPLICA IDENTITY FULL: UPDATE/DELETE senden vollständige Zeile im Realtime-Payload
ALTER TABLE tickets REPLICA IDENTITY FULL;
