-- Repariert fehlerhafte/rekursive Storage-Policies fuer den Bucket "ticket-images".
-- Hintergrund: 42P17 tritt haeufig bei rekursiven RLS-Policies auf storage.objects auf.

DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (
        COALESCE(qual, '') ILIKE '%ticket-images%'
        OR COALESCE(with_check, '') ILIKE '%ticket-images%'
      )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "ticket_images_authenticated_select"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'ticket-images');

CREATE POLICY "ticket_images_authenticated_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ticket-images');

CREATE POLICY "ticket_images_authenticated_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ticket-images')
  WITH CHECK (bucket_id = 'ticket-images');

CREATE POLICY "ticket_images_authenticated_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'ticket-images');
