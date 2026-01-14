# Supabase Setup für Next.js

Diese Anleitung erklärt, wie Sie die Supabase-Integration für die Next.js-App einrichten.

## 1. Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein neues Projekt
2. Notieren Sie sich die **Project URL** und den **anon/public key**
   - Diese finden Sie im Supabase Dashboard unter **Settings** > **API**

## 2. Umgebungsvariablen einrichten

### Für lokale Entwicklung:

Erstellen Sie eine `.env.local` Datei im `web-next/` Verzeichnis:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ihr-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key
```

**Wichtig:** 
- Die `.env.local` Datei sollte bereits in `.gitignore` sein und nicht ins Repository committed werden
- Verwenden Sie `NEXT_PUBLIC_` Präfix für alle Variablen, die im Browser verfügbar sein sollen

### Für Vercel Deployment:

1. Gehen Sie zu Ihrem Vercel-Projekt
2. Öffnen Sie **Settings** > **Environment Variables**
3. Fügen Sie folgende Variablen hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL` = Ihre Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Ihr Supabase Anon Key

## 3. Datenbank-Schema erstellen

1. Öffnen Sie das Supabase Dashboard
2. Gehen Sie zu **SQL Editor**
3. Kopieren Sie den Inhalt von `supabase-schema.sql` (im Root-Verzeichnis)
4. Führen Sie das SQL-Script aus

Das Script erstellt:
- Die `leads` Tabelle für alle Formular-Einreichungen
- Notwendige Indizes für Performance
- Row Level Security (RLS) Policies für Sicherheit

## 4. Tabellenstruktur

Die `leads` Tabelle hat folgende Felder:

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | UUID | Eindeutige ID (automatisch generiert) |
| `customer_name` | TEXT | Vollständiger Name des Kunden |
| `email` | TEXT | E-Mail-Adresse |
| `phone` | TEXT | Telefonnummer (optional) |
| `message` | TEXT | Nachricht vom Kunden |
| `service_type` | TEXT | Art der Leistung |
| `city` | TEXT | Stadt/Standort |
| `form_id` | TEXT | ID des Formulars (z.B. `inquiry_form`, `contact_form`) |
| `page_url` | TEXT | URL der Seite |
| `source_url` | TEXT | Quelle/Referrer URL |
| `additional_data` | JSONB | Zusätzliche Daten (company_name, etc.) |
| `created_at` | TIMESTAMP | Zeitstempel (automatisch) |

## 5. Formular-Typen

Die folgenden Formulare speichern Daten in Supabase:

### Kontaktformular (`ContactForm`)
- **Form ID:** `contact_form`
- **Felder:** Vorname, Nachname, E-Mail, Telefon, Standort, Gewerk, Nachricht
- **Speichert in:** `customer_name`, `email`, `phone`, `message`, `service_type`, `city`

### Anfrageformular (`Anfrage`)
- **Form ID:** `inquiry_form`
- **Felder:** Name, E-Mail, Telefon, Standort, Gewerk, Nachricht
- **Speichert in:** `customer_name`, `email`, `phone`, `message`, `service_type`, `city`

## 6. Testen der Verbindung

Nach dem Einrichten können Sie die Verbindung testen:

1. Starten Sie den Development-Server:
   ```bash
   cd web-next
   npm run dev
   ```

2. Öffnen Sie die Browser-Konsole (F12)
3. Sie sollten sehen: `✅ Supabase-Konfiguration erkannt!`
4. Füllen Sie ein Formular aus und senden Sie es ab
5. Prüfen Sie im Supabase Dashboard unter **Table Editor** > **leads**, ob der Eintrag erstellt wurde

## 7. Troubleshooting

### Fehler: "Supabase-Umgebungsvariablen fehlen"
- Stellen Sie sicher, dass `.env.local` im `web-next/` Verzeichnis existiert
- Überprüfen Sie, dass die Variablen mit `NEXT_PUBLIC_` beginnen
- Starten Sie den Development-Server neu nach dem Erstellen der `.env.local` Datei

### Fehler: "Could not find the 'form_id' column"
- Führen Sie `supabase-migration-complete.sql` im Supabase SQL Editor aus
- Warten Sie 1-2 Minuten, bis der Schema-Cache aktualisiert ist

### Formulare funktionieren nicht
- Prüfen Sie die Browser-Konsole auf Fehler
- Überprüfen Sie die RLS Policies im Supabase Dashboard
- Stellen Sie sicher, dass die INSERT-Policy für `anon` aktiviert ist

## 8. Sicherheit

- **Niemals** den `service_role` Key im Frontend verwenden
- Verwenden Sie nur den `anon/public` Key für Client-seitige Operationen
- RLS Policies stellen sicher, dass nur autorisierte Operationen erlaubt sind
- Die `.env.local` Datei ist bereits in `.gitignore` und wird nicht committed
