-- Bild-URLs pro Auftrag (Public-URLs aus Supabase Storage, Bucket ticket-images, Unterordner auftraege)
ALTER TABLE auftraege
  ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

COMMENT ON COLUMN auftraege.image_urls IS 'Array der Public-URLs hochgeladener Bilder (Supabase Storage: ticket-images/auftraege/).';

-- UPDATE Policy für Bild-Uploads
DROP POLICY IF EXISTS "auftraege_update_authenticated" ON auftraege;

CREATE POLICY "auftraege_update_authenticated"
  ON auftraege FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
