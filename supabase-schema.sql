-- Supabase Schema – vollständige CREATE TABLE Statements
-- Generiert aus dem tatsächlichen DB-Schema (via TypeScript-Typen + Migrationen).
-- Hinweis: Supabase MCP execute_sql war nicht verfügbar; Schema aus types + Migrationen rekonstruiert.

-- =============================================================================
-- companies
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- tickets
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_display_id TEXT,
  is_partner BOOLEAN DEFAULT FALSE,
  partner_name TEXT,
  kunde_name TEXT,
  kontakt_email TEXT NOT NULL,
  kontakt_telefon TEXT,
  telefonnummer TEXT,
  objekt_adresse TEXT NOT NULL,
  beschreibung TEXT,
  gewerk TEXT[],
  status TEXT,
  ablehnungs_grund TEXT,
  abgelehnt_am TIMESTAMPTZ,
  interne_notizen TEXT,
  internal_notes TEXT,
  notizen_intern TEXT,
  assigned_to TEXT,
  zugewiesener_mitarbeiter TEXT,
  bild_urls TEXT[],
  image_urls TEXT[],
  historie JSONB DEFAULT '[]'::jsonb,
  termin_start TIMESTAMPTZ,
  termin_ende TIMESTAMPTZ,
  termin_typ TEXT,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  position INTEGER,
  priority_score DOUBLE PRECISION,
  dringlichkeit TEXT,
  quelle TEXT,
  hat_stern_markierung BOOLEAN,
  abschluss_check BOOLEAN,
  kommentare JSONB,
  additional_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tickets_company_id ON public.tickets(company_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_termin_start ON public.tickets(termin_start);

ALTER TABLE public.tickets ADD CONSTRAINT tickets_status_check
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

-- =============================================================================
-- ticket_history
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.ticket_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE,
  aktion TEXT NOT NULL,
  details JSONB,
  erstellt_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ticket_history_ticket_id ON public.ticket_history(ticket_id);

-- =============================================================================
-- profiles (auth.users Erweiterung für Multi-Role)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN (
    'admin',
    'gewerk_elektro',
    'gewerk_sanitaer',
    'innenausbau',
    'reinigung'
  )),
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Trigger + Function für Auto-Profil bei Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;
