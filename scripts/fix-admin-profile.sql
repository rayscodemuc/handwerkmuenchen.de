-- Admin-Profil reparieren: Rolle auf 'admin' setzen
-- In Supabase SQL Editor ausführen.

-- Option A: Per E-Mail (ersetze mit deiner echten Admin-E-Mail)
UPDATE public.profiles p
SET role = 'admin'
FROM auth.users u
WHERE p.id = u.id AND u.email = 'deine-email@beispiel.de';

-- Option B: Fehlendes Profil anlegen – per E-Mail (ersetze mit deiner echten Admin-E-Mail)
INSERT INTO public.profiles (id, role, display_name)
SELECT id, 'admin', split_part(email, '@', 1)
FROM auth.users
WHERE email = 'deine-email@beispiel.de'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
