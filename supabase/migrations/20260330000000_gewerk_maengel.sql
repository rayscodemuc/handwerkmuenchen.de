-- Mängelmeldungen von Gewerk-Nutzern (Adresse, Notiz, Fotos).

CREATE TABLE IF NOT EXISTS public.gewerk_maengel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL DEFAULT 'd94e4d71-f843-435d-b098-91d066a01253'::uuid,
  created_by uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  adresse text NOT NULL,
  notiz text,
  image_urls text[] NOT NULL DEFAULT '{}',
  gewerk text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gewerk_maengel_created_at ON public.gewerk_maengel (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gewerk_maengel_company ON public.gewerk_maengel (company_id);

COMMENT ON TABLE public.gewerk_maengel IS 'Mängelmeldungen aus dem Gewerk-Dashboard (Fotos in Storage ticket-images/maengel/).';

ALTER TABLE public.gewerk_maengel ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gewerk_maengel_select_own"
  ON public.gewerk_maengel FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "gewerk_maengel_select_admin"
  ON public.gewerk_maengel FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "gewerk_maengel_insert_gewerk"
  ON public.gewerk_maengel FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role LIKE 'gewerk_%'
    )
  );
