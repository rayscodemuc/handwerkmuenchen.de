-- Dummy-Ticket für Tests (in Supabase SQL Editor ausführen)
-- Status: Anfrage, Eingeteilt, Nachbereitung, Erledigt, Abgelehnt, Archiv
INSERT INTO tickets (
  ticket_display_id,
  is_partner,
  partner_name,
  kunde_name,
  kontakt_email,
  objekt_adresse,
  beschreibung,
  gewerk,
  status,
  historie
) VALUES
  (
    'HM-2026-1001',
    false,
    null,
    'Max Mustermann',
    'dummy@example.com',
    'Musterstraße 42, 80331 München',
    'Dummy-Anfrage: Elektro-Check und Beleuchtung prüfen.',
    'Elektro',
    'Anfrage',
    '[]'::jsonb
  ),
  (
    'HM-2026-1002',
    true,
    'Muster-Partner GmbH',
    null,
    'partner@example.com',
    'Partnerstraße 1, 80939 München',
    'Partner-Ticket: Sanitär-Notfall, Rohrleitung undicht.',
    'Sanitär',
    'Anfrage',
    '[]'::jsonb
  );
