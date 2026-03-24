-- Realtime für auftraege: Admin-Änderungen erscheinen sofort im Gewerk-Dashboard (gleiche Seite, andere Rolle).
-- Analog zu 20260326000000_tickets_realtime.sql

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.auftraege;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

ALTER TABLE public.auftraege REPLICA IDENTITY FULL;
