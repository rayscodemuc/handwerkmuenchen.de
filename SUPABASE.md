# Supabase Integration - Komplette Anleitung

Diese Anleitung erklärt die Supabase-Integration für alle Formulare im Projekt.

## 1. Supabase-Projekt einrichten

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein neues Projekt
2. Notieren Sie sich die **Project URL** und den **anon/public key**

## 2. Umgebungsvariablen

Erstellen Sie eine `.env` Datei im Root-Verzeichnis:

```env
VITE_SUPABASE_URL=https://ihr-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

## 3. Datenbank-Schema erstellen

### Für neue Installationen:
Führen Sie `supabase-schema.sql` im Supabase SQL Editor aus.

### Für bestehende Tabellen (fehlende Spalten hinzufügen):
Führen Sie `ADD_MISSING_COLUMNS.sql` im Supabase SQL Editor aus.

## 4. Tabellenstruktur

Die `leads` Tabelle hat folgende Felder:

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | UUID | Eindeutige ID (automatisch) |
| `customer_name` | TEXT | Vollständiger Name |
| `email` | TEXT | E-Mail-Adresse |
| `phone` | TEXT | Telefonnummer (optional) |
| `message` | TEXT | Nachricht |
| `service_type` | TEXT | Art der Leistung |
| `city` | TEXT | Stadt/Standort |
| `form_id` | TEXT | Formular-ID (z.B. `contact_form`, `inquiry_form`) |
| `page_url` | TEXT | Pfad der Seite (z.B. `/kontakt`) |
| `source_url` | TEXT | Vollständige URL (inkl. Domain) |
| `additional_data` | JSONB | Zusätzliche Daten (company_name, etc.) |
| `created_at` | TIMESTAMP | Zeitstempel (automatisch) |

## 5. Formular-Typen

- **Kontaktformular** (`/kontakt`): `form_id = 'contact_form'`
- **Anfrageformular** (`/anfrage`): `form_id = 'inquiry_form'`
- **Rechner** (`/rechner`): `form_id = 'service_calculator'`

## 6. Fehlerbehebung

### "Could not find the 'form_id' column"
1. Führen Sie `ADD_MISSING_COLUMNS.sql` aus
2. Warten Sie 1-2 Minuten (Schema-Cache aktualisiert sich)
3. Browser-Cache leeren: `Ctrl+Shift+R` (Windows) oder `Cmd+Shift+R` (Mac)
4. Development-Server neu starten

### source_url ist NULL
- Überprüfen Sie die Browser-Konsole auf JavaScript-Fehler
- Stellen Sie sicher, dass `window.location.href` verfügbar ist

### Formulare senden keine Daten
1. Überprüfen Sie die Umgebungsvariablen in `.env`
2. Prüfen Sie die RLS Policies in Supabase
3. Browser-Konsole auf Fehler prüfen

## 7. Daten abrufen

```sql
-- Alle Leads
SELECT * FROM leads ORDER BY created_at DESC;

-- Nach Formular-Typ filtern
SELECT * FROM leads WHERE form_id = 'inquiry_form';

-- Nach Stadt filtern
SELECT * FROM leads WHERE city = 'muenchen';
```

## 8. Testen

1. Formular ausfüllen und absenden
2. In Supabase → Table Editor → `leads` prüfen
3. Überprüfen, dass `form_id`, `page_url` und `source_url` gefüllt sind
