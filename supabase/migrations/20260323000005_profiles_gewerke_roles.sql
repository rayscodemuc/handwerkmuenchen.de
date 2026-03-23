-- Erweitert erlaubte Login-Rollen fuer alle Gewerke.
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN (
    'admin',
    'gewerk_elektro',
    'gewerk_sanitaer',
    'gewerk_ausbau',
    'gewerk_reinigung',
    'gewerk_facility'
  ));
