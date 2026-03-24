-- Hauptdokument (PDF) pro Auftrag, wie von n8n gesetzt; für manuelle Anlage/UI-Fallback.
ALTER TABLE public.auftraege
  ADD COLUMN IF NOT EXISTS anhang_url TEXT;

COMMENT ON COLUMN public.auftraege.anhang_url IS 'Public-URL des Auftrags-PDFs (Anzeige Paperclip / Druckansicht); ergänzend zu angebot_rechnung_urls.';

-- Bestehende Zeilen: erste URL im Array als Haupt-Anhang (n8n-kompatibel), wenn anhang_url leer ist.
UPDATE public.auftraege
SET anhang_url = trim(both from angebot_rechnung_urls[1])
WHERE coalesce(trim(both from anhang_url), '') = ''
  AND angebot_rechnung_urls IS NOT NULL
  AND cardinality(angebot_rechnung_urls) >= 1
  AND coalesce(trim(both from angebot_rechnung_urls[1]), '') <> '';
