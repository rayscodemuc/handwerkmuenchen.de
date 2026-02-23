# Supabase Setup Anleitung

Diese Anleitung erklärt, wie Sie die Supabase-Integration für die Formulare einrichten.

## 1. Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com) und erstellen Sie ein neues Projekt
2. Notieren Sie sich die **Project URL** und den **anon/public key**

## 2. Umgebungsvariablen einrichten

Erstellen Sie eine `.env` Datei im Root-Verzeichnis des Projekts:

```env
VITE_SUPABASE_URL=https://ihr-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

**Wichtig:** Die `.env` Datei sollte bereits in `.gitignore` sein und nicht ins Repository committed werden.

## 3. Datenbank-Schema erstellen

1. Öffnen Sie das Supabase Dashboard
2. Gehen Sie zu **SQL Editor**
3. Kopieren Sie den Inhalt von `supabase-schema.sql`
4. Führen Sie das SQL-Script aus

Das Script erstellt:
- Die `tickets` Tabelle (Anfragen, Kontakt, Rechner)
- Die `companies` Tabelle
- Die `profiles` Tabelle (Auth-Erweiterung)
- Notwendige Indizes und RLS Policies

## 4. Formulare → tickets

Alle Formulare (Anfrage, Kontakt, Rechner) speichern über `useUniversalSubmit` in die Tabelle **`tickets`**:

- **Kontaktformular:** Vorname, Nachname, E-Mail, Telefon, Gewerk, Nachricht → `kunde_name`, `kontakt_email`, `kontakt_telefon`, `beschreibung`, `gewerk`
- **Anfrageformular:** Name, Firma, E-Mail, Telefon, Leistung, Nachricht → wie oben + `additional_data` für Firma, Datenschutz
- **Rechner:** Name, E-Mail, Telefon, Stadt, Leistung, Details, Richtpreis → wie oben + Rechner-Daten in `additional_data`

## 5. Daten abrufen

### Über das Dashboard
1. Gehen Sie zu **Table Editor** im Supabase Dashboard
2. Wählen Sie die `tickets` Tabelle
3. Alle Formular-Einreichungen werden dort angezeigt (status = 'Anfrage')

### Über SQL
```sql
-- Alle Anfragen
SELECT * FROM tickets ORDER BY created_at DESC;

-- Nach Status filtern
SELECT * FROM tickets WHERE status = 'Anfrage';

-- Zusätzliche Daten aus JSONB
SELECT kunde_name, kontakt_email, additional_data FROM tickets;
```

## 7. Fehlerbehebung

### Formulare senden keine Daten
1. Überprüfen Sie die Browser-Konsole auf Fehler
2. Stellen Sie sicher, dass die Umgebungsvariablen korrekt gesetzt sind
3. Überprüfen Sie die RLS Policies in Supabase

### RLS Policy Fehler
Wenn Sie Fehler bei der Dateneingabe erhalten:
1. Gehen Sie zu **Authentication > Policies** im Supabase Dashboard
2. Stellen Sie sicher, dass die entsprechenden Policies für `tickets` aktiv sind
3. Überprüfen Sie, dass RLS für die `tickets` Tabelle korrekt konfiguriert ist

### Daten werden nicht angezeigt
1. Überprüfen Sie, ob Sie als authentifizierter Benutzer eingeloggt sind (für SELECT)
2. Oder verwenden Sie den Service Role Key für vollständigen Zugriff

## 8. Sicherheit

- Die `anon` Key hat nur INSERT-Rechte (für öffentliche Formulare)
- SELECT-Rechte sind auf authentifizierte Benutzer beschränkt
- Verwenden Sie den `service_role` Key nur serverseitig, niemals im Client-Code

## 9. Nächste Schritte

- E-Mail-Benachrichtigungen einrichten (über Supabase Edge Functions)
- Automatische Weiterleitung an verschiedene E-Mail-Adressen basierend auf `form_id` oder `city`
- Dashboard für Lead-Verwaltung erstellen

