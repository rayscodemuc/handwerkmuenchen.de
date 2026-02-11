-- Bild-URLs pro Ticket (Public-URLs aus Supabase Storage Bucket ticket-images)
-- Hinweis: Im Supabase Dashboard unter Storage einen Bucket "ticket-images" anlegen und auf "Public" stellen.
ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN tickets.image_urls IS 'Array der Public-URLs hochgeladener Bilder (Supabase Storage: ticket-images).';
