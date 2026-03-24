-- RLS: Gewerk-User sehen nur Tickets/Aufträge ihres Gewerks. Admin sieht alles.
-- Basiert auf profiles.role und tickets.gewerk (text[]).

CREATE OR REPLACE FUNCTION public.get_my_gewerk()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT CASE (
    SELECT role FROM public.profiles WHERE id = auth.uid()
  )
    WHEN 'gewerk_elektro' THEN 'Elektro'
    WHEN 'gewerk_sanitaer' THEN 'Sanitär'
    WHEN 'gewerk_ausbau' THEN 'Ausbau'
    WHEN 'gewerk_reinigung' THEN 'Reinigung'
    WHEN 'gewerk_facility' THEN 'Facility'
    ELSE NULL
  END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin';
$$;

-- ========== TICKETS: Role-basierte Filter ==========
DROP POLICY IF EXISTS "tickets_select_anon_authenticated" ON tickets;

-- Authenticated: Admin sieht alles, Gewerk-User nur Tickets mit ihrem Gewerk
CREATE POLICY "tickets_select_by_role"
  ON tickets FOR SELECT
  TO authenticated
  USING (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND tickets.gewerk IS NOT NULL
      AND tickets.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
    )
  );

-- Anon: Kein SELECT (Dashboard erfordert Login)
-- Formulare nutzen INSERT mit anon – kein SELECT nötig

DROP POLICY IF EXISTS "tickets_update_anon_authenticated" ON tickets;

-- Update: Admin darf alles, Gewerk-User nur eigene Gewerk-Tickets
CREATE POLICY "tickets_update_by_role"
  ON tickets FOR UPDATE
  TO authenticated
  USING (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND tickets.gewerk IS NOT NULL
      AND tickets.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
    )
  )
  WITH CHECK (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND tickets.gewerk IS NOT NULL
      AND tickets.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
    )
  );

DROP POLICY IF EXISTS "tickets_delete_anon_authenticated" ON tickets;

-- Delete: Admin darf alles, Gewerk-User nur eigene Gewerk-Tickets
CREATE POLICY "tickets_delete_by_role"
  ON tickets FOR DELETE
  TO authenticated
  USING (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND tickets.gewerk IS NOT NULL
      AND tickets.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
    )
  );

-- Insert bleibt für anon + authenticated (Formulare, API)
-- Bereits in tickets_insert_anon_authenticated – unverändert

-- ========== AUFTRAEGE: Role-basierte Filter ==========
DROP POLICY IF EXISTS "auftraege_select_authenticated" ON auftraege;

-- Admin sieht alle Aufträge. Gewerk-User nur Aufträge, die über ein Ticket mit ihrem Gewerk verknüpft sind.
CREATE POLICY "auftraege_select_by_role"
  ON auftraege FOR SELECT
  TO authenticated
  USING (
    public.is_admin_user()
    OR (
      public.get_my_gewerk() IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM tickets t
        WHERE (t.additional_data->>'auftrag_id') IS NOT NULL
          AND (t.additional_data->>'auftrag_id') = auftraege.id::text
          AND t.gewerk IS NOT NULL
          AND t.gewerk @> ARRAY[public.get_my_gewerk()]::text[]
      )
    )
  );
