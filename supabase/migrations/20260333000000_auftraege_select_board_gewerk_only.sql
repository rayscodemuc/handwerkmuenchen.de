-- Gewerk-User sehen SPM-Aufträge nur noch über `auftraege.gewerk` (Admin-Board).
-- Die frühere Ausnahme „sichtbar wenn irgendein verknüpftes Ticket das Gewerk hat“ erlaubte
-- Abweichungen zwischen Ticket- und Auftrags-Gewerk (z. B. Sanitär sah Elektro-Zuordnungen).

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
  );
