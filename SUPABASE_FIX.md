# Fehlerbehebung: "Could not find the 'form_id' column"

## Problem
Der Fehler "Could not find the 'form_id' column of 'leads' in the schema cache" bedeutet, dass die Spalte `form_id` in Ihrer Supabase-Tabelle fehlt.

## Lösung

### Schritt 1: Migration ausführen

1. Öffnen Sie das **Supabase Dashboard**
2. Gehen Sie zu **SQL Editor**
3. Kopieren Sie den Inhalt von `supabase-migration-complete.sql`
4. Führen Sie das Script aus

Das Script fügt alle fehlenden Spalten hinzu:
- `form_id` (TEXT)
- `page_url` (TEXT) 
- `source_url` (TEXT)
- `additional_data` (JSONB)

### Schritt 2: Schema-Cache aktualisieren

Nach dem Ausführen der Migration:

1. **Option A: Warten Sie 1-2 Minuten**
   - Supabase aktualisiert den Schema-Cache automatisch

2. **Option B: Supabase-Client neu initialisieren**
   - Laden Sie die Seite neu (F5)
   - Oder starten Sie den Development-Server neu

3. **Option C: Supabase Dashboard prüfen**
   - Gehen Sie zu **Table Editor** > **leads**
   - Überprüfen Sie, ob die Spalten sichtbar sind

### Schritt 3: Überprüfung

Führen Sie diese SQL-Abfrage aus, um zu prüfen, ob alle Spalten vorhanden sind:

```sql
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;
```

Sie sollten folgende Spalten sehen:
- `id`
- `customer_name`
- `email`
- `phone`
- `message`
- `service_type`
- `city`
- `form_id` ✅
- `page_url` ✅
- `source_url` ✅
- `additional_data` ✅
- `created_at`

## Falls der Fehler weiterhin besteht

### 1. Prüfen Sie die Umgebungsvariablen
Stellen Sie sicher, dass `.env` korrekt konfiguriert ist:
```env
VITE_SUPABASE_URL=https://ihr-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=ihr-anon-key
```

### 2. Prüfen Sie die RLS Policies
Stellen Sie sicher, dass INSERT-Policies aktiviert sind:
```sql
-- Policy prüfen
SELECT * FROM pg_policies WHERE tablename = 'leads';
```

### 3. Vollständige Tabellenerstellung
Falls die Tabelle noch nicht existiert, führen Sie `supabase-schema.sql` aus.

### 4. Browser-Cache leeren
- Hard Reload: `Ctrl+Shift+R` (Windows/Linux) oder `Cmd+Shift+R` (Mac)
- Oder: Entwicklertools öffnen > Network-Tab > "Disable cache" aktivieren

## Notfall-Lösung: Tabelle neu erstellen

⚠️ **ACHTUNG:** Dies löscht alle bestehenden Daten!

```sql
-- 1. Tabelle löschen (NUR wenn Sie alle Daten löschen möchten!)
DROP TABLE IF EXISTS leads CASCADE;

-- 2. Tabelle neu erstellen
-- Führen Sie dann supabase-schema.sql aus
```

