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
- **Felder:** Name, Firma, E-Mail, Telefon, Leistung, Nachricht, Datenschutz
- **Speichert in:** `customer_name`, `email`, `phone`, `message`, `service_type`
- **Zusätzlich in `additional_data`:** `company_name`, `privacy_accepted`

### Partner-Formular (`PartnerWerden`)
- **Form ID:** `partner_form`
- **Felder:** Firmenname, Ansprechpartner, E-Mail, Telefon, Kategorie, Region, Nachricht
- **Speichert in:** `customer_name` (Ansprechpartner), `email`, `phone`, `message`, `service_type` (Kategorie), `city` (Region)
- **Zusätzlich in `additional_data`:** `company_name`

### Rechner-Formular (`Rechner`)
- **Form ID:** `calculator_form`
- **Felder:** Name, E-Mail, Telefon, Stadt, Leistung, Details, geschätzter Preis
- **Speichert in:** `customer_name`, `email`, `phone`, `message`, `service_type`, `city`
- **Zusätzlich in `additional_data`:** Alle Rechner-spezifischen Felder

## 6. Daten abrufen

Sie können die Leads in Supabase auf verschiedene Weise abrufen:

### Über das Dashboard
1. Gehen Sie zu **Table Editor** im Supabase Dashboard
2. Wählen Sie die `leads` Tabelle
3. Alle Einreichungen werden dort angezeigt

### Über SQL
```sql
-- Alle Leads abrufen
SELECT * FROM leads ORDER BY created_at DESC;

-- Leads nach Formular-Typ filtern
SELECT * FROM leads WHERE form_id = 'inquiry_form';

-- Leads nach Stadt filtern
SELECT * FROM leads WHERE city = 'muenchen';

-- Leads mit zusätzlichen Daten
SELECT 
  customer_name,
  email,
  service_type,
  city,
  additional_data->>'company_name' as company_name
FROM leads
WHERE additional_data->>'company_name' IS NOT NULL;
```

## 7. Fehlerbehebung

### Formulare senden keine Daten
1. Überprüfen Sie die Browser-Konsole auf Fehler
2. Stellen Sie sicher, dass die Umgebungsvariablen korrekt gesetzt sind
3. Überprüfen Sie die RLS Policies in Supabase

### RLS Policy Fehler
Wenn Sie Fehler bei der Dateneingabe erhalten:
1. Gehen Sie zu **Authentication > Policies** im Supabase Dashboard
2. Stellen Sie sicher, dass die Policy "Allow public insert" aktiv ist
3. Überprüfen Sie, dass RLS für die `leads` Tabelle aktiviert ist

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

