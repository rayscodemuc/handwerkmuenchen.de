-- Board + Kalender direkt auf Aufträge (kein Pflicht-Ticket pro SPM-Auftrag).
-- Gewerk: für RLS und Filter analog zu tickets.gewerk (text[]).

ALTER TABLE public.auftraege
  ADD COLUMN IF NOT EXISTS gewerk TEXT[],
  ADD COLUMN IF NOT EXISTS board_status TEXT DEFAULT 'Anfrage',
  ADD COLUMN IF NOT EXISTS board_position INTEGER DEFAULT 10,
  ADD COLUMN IF NOT EXISTS termin_start TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termin_ende TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS termin_typ TEXT;

COMMENT ON COLUMN public.auftraege.gewerk IS 'Zugewiesene Gewerke (wie tickets.gewerk); RLS/Board-Filter.';
COMMENT ON COLUMN public.auftraege.board_status IS 'Kanban-Status analog tickets.status.';
COMMENT ON COLUMN public.auftraege.board_position IS 'Sortierung innerhalb der Board-Spalte.';
COMMENT ON COLUMN public.auftraege.termin_start IS 'Terminbeginn für Kalender (optional).';
COMMENT ON COLUMN public.auftraege.termin_ende IS 'Terminende für Kalender (optional).';
COMMENT ON COLUMN public.auftraege.termin_typ IS 'Besichtigung | Ausführung (optional).';

-- Gewerk-User: Aufträge mit passendem gewerk[] ODER Legacy-Verknüpfung über tickets
DROP POLICY IF EXISTS "auftraege_select_by_role" ON public.auftraege;

CREATE POLICY "auftraege_select_by_role"
  ON public.auftraege FOR SELECT
  TO authenticated
  USING (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND auftraege.gewerk IS NOT NULL
      AND auftraege.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
    )
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM public.tickets t
        WHERE (t.additional_data->>'auftrag_id') IS NOT NULL
          AND (t.additional_data->>'auftrag_id') = auftraege.id::text
          AND t.gewerk IS NOT NULL
          AND t.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
      )
    )
  );
