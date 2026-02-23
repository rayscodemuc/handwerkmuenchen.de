-- leads-Tabelle entfernen
-- Alle Formulare (Anfrage, Kontakt, Rechner) schreiben jetzt in tickets via useUniversalSubmit.
-- Die leads-Tabelle wird nicht mehr verwendet.

DROP TABLE IF EXISTS public.leads CASCADE;
