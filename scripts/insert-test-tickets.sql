-- Test-Tickets für Dashboard (Scoring, Icons, Umwandeln, Ablehnen)
-- Im Supabase SQL Editor ausführen. Enthält: Partner, Hoch-Score, Service-Abzug, Dringlichkeit, alle Gewerke.

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
) VALUES
  -- 1) Partner-Ticket (sollte ganz oben, +200, [PARTNER], blauer Glow)
  (
    NULL,
    true,
    'Hausverwaltung Süd GmbH',
    NULL,
    'partner@sued-gmbh.de',
    '+49 89 12345678',
    'Verwaltetes Objekt, 80799 München',
    'Rahmenvertrag: Baureinigung und Winterdienst für mehrere Objekte. Wartungsvertrag gewünscht.',
    'Facility',
    'Anfrage'
  ),
  -- 2) Hohes Projekt-Potenzial Elektro (Wallbox + Badsanierung → +80+80, Star)
  (
    NULL,
    false,
    NULL,
    'Familie Schneider',
    'schneider@example.com',
    '+49 171 1112233',
    'Prinzregentenstraße 10, 80538 München',
    'Badsanierung geplant, inkl. Neuverkabelung und Wallbox für E-Auto. Smart Home Anbindung gewünscht.',
    'Elektro',
    'Anfrage'
  ),
  -- 3) Dringlichkeit (Wasserschaden → +150)
  (
    NULL,
    false,
    NULL,
    'Anna Weber',
    'a.weber@example.com',
    '+49 160 99887766',
    'Leopoldstraße 45, 80802 München',
    'Wasserschaden in der Küche, Notfall – bitte schnell melden.',
    'Sanitär',
    'Anfrage'
  ),
  -- 4) Ausbau mit Projekt-Keywords (Renovierung, Tapezieren → Star)
  (
    NULL,
    false,
    NULL,
    'Thomas Weber',
    'thomas.weber@example.com',
    '+49 151 99887766',
    'Rosenheimer Platz 3, 81667 München',
    'Wanddurchbruch zwischen Küche und Wohnzimmer geplant. Renovierung und Tapezieren, Trockenbauwand verspachteln.',
    'Ausbau',
    'Anfrage'
  ),
  -- 5) Service/Low (Steckdose locker → -40, ggf. opacity-50)
  (
    NULL,
    false,
    NULL,
    'Peter Klein',
    'p.klein@example.com',
    NULL,
    'Sendlinger Str. 5, 80331 München',
    'Eine Steckdose ist locker, bitte einmal nachschauen.',
    'Elektro',
    'Anfrage'
  ),
  -- 6) Reinigung – Projekt (Grundreinigung)
  (
    NULL,
    false,
    NULL,
    'Büro Center München',
    'hausmeister@buero-center.de',
    '+49 89 5556677',
    'Maximilianstraße 100, 80539 München',
    'Grundreinigung nach Umbau, Glasreinigung Fassade. Angebot erwünscht.',
    'Reinigung',
    'Anfrage'
  ),
  -- 7) Facility – Objektbegehung (High-Keyword)
  (
    NULL,
    false,
    NULL,
    'Immobilien AG',
    'facility@immobilien-ag.de',
    '+49 89 44455566',
    'Brienner Str. 20, 80333 München',
    'Objektbegehung und Brandschutzprüfung für Gewerbeobjekt. Winterdienst für Hoffläche.',
    'Facility',
    'Anfrage'
  ),
  -- 8) Kleiner Service Maler (Kratzer, ausbessern → -40)
  (
    NULL,
    false,
    NULL,
    'Maria Huber',
    'm.huber@example.com',
    NULL,
    'Garmischer Str. 15, 81373 München',
    'Kleine Kratzer in der Wand, bitte ausbessern und streichen.',
    'Ausbau',
    'Anfrage'
  ),
  -- 9) Stromausfall (Dringlichkeit +150)
  (
    NULL,
    false,
    NULL,
    'Gewerbehof GmbH',
    'notfall@gewerbehof.de',
    '+49 170 1234567',
    'Lagerhaus 2, 80995 München',
    'Stromausfall in Teil des Gebäudes – Kurzschluss vermutet. Bitte zeitnah prüfen.',
    'Elektro',
    'Anfrage'
  ),
  -- 10) Sanitär ohne Projekt (neutraler Score)
  (
    NULL,
    false,
    NULL,
    'Julia Fischer',
    'j.fischer@example.com',
    '+49 172 5544332',
    'Plinganserstraße 8, 81369 München',
    'Neue Dusche einbauen lassen, Bad soll modernisiert werden.',
    'Sanitär',
    'Anfrage'
  );
