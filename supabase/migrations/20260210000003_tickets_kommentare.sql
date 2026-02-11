-- Add kommentare JSONB column for timestamped comments
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS kommentare JSONB DEFAULT '[]';

-- Migrate existing interne_notizen text into the first kommentare entry (where not null/empty)
UPDATE tickets
SET kommentare = jsonb_build_array(
  jsonb_build_object(
    'id', gen_random_uuid()::text,
    'text', interne_notizen,
    'author', 'Admin',
    'timestamp', NOW()::text
  )
)
WHERE interne_notizen IS NOT NULL
  AND TRIM(interne_notizen) <> ''
  AND (kommentare IS NULL OR kommentare = '[]'::jsonb);
