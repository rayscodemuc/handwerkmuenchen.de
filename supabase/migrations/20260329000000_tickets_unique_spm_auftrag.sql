-- Keine doppelten SPM-Kanban-Zeilen: DB erzwingt Eindeutigkeit pro Auftrag / pro SPM-Auftragsnummer.

-- Bestehende Duplikate entfernen (ältestes behalten), sonst schlägt der Index fehl.
DELETE FROM public.tickets
WHERE id IN (
  SELECT id FROM (
    SELECT id,
      row_number() OVER (
        PARTITION BY nullif(trim(additional_data->>'auftrag_id'), '')
        ORDER BY created_at ASC NULLS LAST, id ASC
      ) AS rn
    FROM public.tickets
    WHERE nullif(trim(additional_data->>'auftrag_id'), '') IS NOT NULL
  ) x WHERE rn > 1
);

DELETE FROM public.tickets
WHERE id IN (
  SELECT id FROM (
    SELECT id,
      row_number() OVER (
        PARTITION BY lower(replace(trim(additional_data->>'auftragsnummer'), ' ', ''))
        ORDER BY created_at ASC NULLS LAST, id ASC
      ) AS rn
    FROM public.tickets
    WHERE nullif(trim(additional_data->>'auftragsnummer'), '') IS NOT NULL
      AND (additional_data->>'quelle') = 'auftraege'
  ) x WHERE rn > 1
);

-- Genau ein Ticket pro verknüpfter Auftrag-ID (SPM → Kanban).
CREATE UNIQUE INDEX IF NOT EXISTS tickets_unique_spm_auftrag_id
  ON public.tickets ((nullif(trim(additional_data->>'auftrag_id'), '')))
  WHERE nullif(trim(additional_data->>'auftrag_id'), '') IS NOT NULL;

-- Genau ein SPM-Ticket pro normalisierter Auftragsnummer (z. B. 2026/1725).
CREATE UNIQUE INDEX IF NOT EXISTS tickets_unique_spm_auftragsnummer_norm
  ON public.tickets ((lower(replace(trim(additional_data->>'auftragsnummer'), ' ', ''))))
  WHERE (additional_data->>'quelle') = 'auftraege'
    AND nullif(trim(additional_data->>'auftragsnummer'), '') IS NOT NULL;
