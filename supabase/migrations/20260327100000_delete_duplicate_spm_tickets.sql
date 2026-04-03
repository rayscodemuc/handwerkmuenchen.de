-- Doppelte SPM-Kanban-Tickets: das URSPRÜNGLICHE (ältestes created_at) behalten, neuere Kopien löschen.
-- Hinweis: War diese Datei einmal mit DESC ausgerollt, wurden fälschlich Originale entfernt.
-- Wiederherstellung nur über Supabase-Backup / Point-in-Time Recovery.

-- 1) Gleiche auftrag_id → ältestes Ticket behalten
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

-- 2) Gleiche Auftragsnummer (SPM) → ältestes behalten
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
