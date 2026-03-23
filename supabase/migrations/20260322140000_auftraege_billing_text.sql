-- Rechnungs-/Leistungsempfänger: bei VARCHAR(n) werden lange Namen in der DB abgeschnitten
-- (z. B. „Quartier FÜRste“ statt vollständigem Firmennamen). → TEXT.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'auftraege' AND column_name = 'leistungsempfaenger'
  ) THEN
    ALTER TABLE public.auftraege ALTER COLUMN leistungsempfaenger TYPE TEXT;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'auftraege' AND column_name = 'rechnungsempfaenger'
  ) THEN
    ALTER TABLE public.auftraege ALTER COLUMN rechnungsempfaenger TYPE TEXT;
  END IF;
END $$;
