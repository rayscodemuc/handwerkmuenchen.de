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

-- =============================================================================
-- push_subscriptions
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN (
    'admin',
    'gewerk_elektro',
    'gewerk_sanitaer',
    'gewerk_ausbau',
    'gewerk_reinigung',
    'gewerk_facility'
  )),
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id
  ON public.push_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_role_active
  ON public.push_subscriptions(role, is_active);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own push subscriptions"
  ON public.push_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own push subscriptions"
  ON public.push_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push subscriptions"
  ON public.push_subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own push subscriptions"
  ON public.push_subscriptions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =============================================================================
-- mangelmeldungen
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.mangelmeldungen (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titel TEXT NOT NULL,
  beschreibung TEXT,
  bereich TEXT NOT NULL,
  status TEXT DEFAULT 'offen' CHECK (status IN ('offen', 'in_bearbeitung', 'behoben')),
  prioritaet TEXT DEFAULT 'mittel' CHECK (prioritaet IN ('tief', 'mittel', 'hoch')),
  erstellt_von UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  auftrag_id UUID REFERENCES public.tickets(id) ON DELETE SET NULL,
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mangelmeldungen_bereich ON public.mangelmeldungen(bereich);
CREATE INDEX IF NOT EXISTS idx_mangelmeldungen_status ON public.mangelmeldungen(status);
CREATE INDEX IF NOT EXISTS idx_mangelmeldungen_erstellt_von ON public.mangelmeldungen(erstellt_von);

ALTER TABLE public.mangelmeldungen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all mangelmeldungen"
  ON public.mangelmeldungen FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert mangelmeldungen"
  ON public.mangelmeldungen FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Admins can update mangelmeldungen"
  ON public.mangelmeldungen FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Gewerke can read own mangelmeldungen"
  ON public.mangelmeldungen FOR SELECT
  TO authenticated
  USING (
    bereich = (
      SELECT role FROM public.profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Gewerke can insert own mangelmeldungen"
  ON public.mangelmeldungen FOR INSERT
  TO authenticated
  WITH CHECK (
    bereich = (
      SELECT role FROM public.profiles WHERE id = auth.uid()
    )
  );
