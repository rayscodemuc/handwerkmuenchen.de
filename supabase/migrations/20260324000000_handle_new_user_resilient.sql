-- Trigger robuster machen: Rolle validieren, damit CHECK-Constraint nicht fehlschlägt
-- (z.B. wenn user_metadata eine Rolle enthält, die noch nicht in profiles_role_check ist)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  meta_role TEXT;
  safe_role TEXT;
  allowed_roles TEXT[] := ARRAY[
    'admin', 'gewerk_elektro', 'gewerk_sanitaer',
    'gewerk_ausbau', 'gewerk_reinigung', 'gewerk_facility'
  ];
BEGIN
  meta_role := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'role'), ''), 'admin');
  safe_role := CASE
    WHEN meta_role = ANY(allowed_roles) THEN meta_role
    ELSE 'admin'
  END;

  INSERT INTO public.profiles (id, role, display_name)
  VALUES (
    NEW.id,
    safe_role,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), ''), split_part(COALESCE(NEW.email, ''), '@', 1))
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Fallback: Admin-Rolle falls z.B. CHECK-Constraint abweicht
    BEGIN
      INSERT INTO public.profiles (id, role, display_name)
      VALUES (
        NEW.id,
        'admin',
        COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'display_name'), ''), split_part(COALESCE(NEW.email, ''), '@', 1))
      );
    EXCEPTION WHEN OTHERS THEN
      RAISE;
    END;
    RETURN NEW;
END;
$$;
