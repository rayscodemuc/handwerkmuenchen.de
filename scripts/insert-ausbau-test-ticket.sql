-- Ausbau-Test-Ticket (orangefarbenes Badge prüfen)
-- Im Supabase SQL Editor ausführen
INSERT INTO tickets (
  ticket_display_id,
  is_partner,
  partner_name,
  kunde_name,
  kontakt_email,
  kontakt_telefon,
  objekt_adresse,
  beschreibung,
  gewerk,
  status
) VALUES (
  'HM-2026-2001',
  false,
  null,
  'Thomas Weber',
  'thomas.weber@example.com',
  '+49 151 99887766',
  'Rosenheimer Platz 3, 81667 München',
  'Wanddurchbruch zwischen Küche und Wohnzimmer geplant. Trockenbauwand muss gestellt und verspachtelt werden.',
  'Ausbau',
  'Anfrage'
);
