# Supabase Integration

Alle Formulare (Kontakt, Anfrage, Rechner) speichern in die Tabelle **`tickets`** über `useUniversalSubmit`.

## Tabellen

- **tickets**: Formular-Einreichungen (kunde_name, kontakt_email, beschreibung, gewerk, additional_data, status = 'Anfrage')
- **companies**: Mandanten/Unternehmen
- **profiles**: Auth-Erweiterung (Rollen)

## Formular-Zuordnung

- **Kontaktformular** (`/kontakt`): Vorname, Nachname, E-Mail, Telefon, Gewerk, Nachricht → tickets
- **Anfrageformular** (`/anfrage`): Name, Firma, E-Mail, Telefon, Leistung, Nachricht → tickets
- **Rechner** (`/rechner`): Name, E-Mail, Telefon, Stadt, Leistung, Richtpreis, Details → tickets (Rechner-Daten in additional_data)

## Daten abrufen

```sql
SELECT * FROM tickets ORDER BY created_at DESC;
SELECT * FROM tickets WHERE status = 'Anfrage';
```

## Fehlerbehebung

- Umgebungsvariablen in `.env.local` prüfen
- RLS Policies für `tickets` prüfen
- Migrationen anwenden: `supabase db push`
