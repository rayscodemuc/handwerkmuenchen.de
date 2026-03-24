-- Nach 20260327000000 (falls mit DESC ausgeführt): bei erneuten Duplikaten das ÄLTESTE behalten.
-- Wiederherstellung bereits gelöschter Originale: nur über Supabase-Backup / PITR.

DELETE FROM public.tickets
WHERE id IN (
  SELECT id
  FROM (
    SELECT
      id,
      row_number() OVER (
        PARTITION BY nullif(trim(additional_data->>'auftrag_id'), '')
        ORDER BY created_at ASC NULLS LAST, id ASC
      ) AS rn
    FROM public.tickets
    WHERE nullif(trim(additional_data->>'auftrag_id'), '') IS NOT NULL
  ) ranked
  WHERE rn > 1
);

DELETE FROM public.tickets
WHERE id IN (
  SELECT id
  FROM (
    SELECT
      id,
      row_number() OVER (
        PARTITION BY lower(replace(trim(additional_data->>'auftragsnummer'), ' ', ''))
        ORDER BY created_at ASC NULLS LAST, id ASC
      ) AS rn
    FROM public.tickets
    WHERE nullif(trim(additional_data->>'auftragsnummer'), '') IS NOT NULL
      AND (
        (additional_data->>'quelle') = 'auftraege'
        OR nullif(trim(additional_data->>'auftrag_id'), '') IS NOT NULL
      )
  ) ranked
  WHERE rn > 1
);
