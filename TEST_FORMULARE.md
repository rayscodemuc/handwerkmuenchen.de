# Formulare testen - Checkliste

## ✅ Nach dem Ausführen des SQL-Scripts

### 1. Überprüfen Sie die Tabelle in Supabase

Gehen Sie im Supabase Dashboard zu:
- **Table Editor** → **leads**

Sie sollten jetzt folgende Spalten sehen:
- ✅ `id`
- ✅ `customer_name`
- ✅ `email`
- ✅ `phone`
- ✅ `message`
- ✅ `service_type`
- ✅ `city`
- ✅ `form_id` ← **NEU**
- ✅ `page_url` ← **NEU**
- ✅ `source_url` ← **NEU**
- ✅ `additional_data` ← **NEU**
- ✅ `created_at`

### 2. Testen Sie die Formulare

#### Kontaktformular (`/kontakt`)
1. Gehen Sie zu `http://localhost:5173/kontakt` (oder Ihrer Domain)
2. Füllen Sie das Formular aus
3. Klicken Sie auf "Nachricht senden"
4. Prüfen Sie in Supabase → Table Editor → leads, ob der Eintrag erscheint
5. Überprüfen Sie, dass `form_id`, `page_url` und `source_url` gefüllt sind

#### Anfrageformular (`/anfrage`)
1. Gehen Sie zu `/anfrage`
2. Füllen Sie das Formular aus
3. Senden Sie es ab
4. Prüfen Sie in Supabase, ob der Eintrag mit `form_id = 'inquiry_form'` erscheint

#### Rechner (`/rechner`)
1. Gehen Sie zu `/rechner`
2. Füllen Sie den Rechner aus
3. Senden Sie die Anfrage ab
4. Prüfen Sie in Supabase, ob der Eintrag mit `form_id = 'service_calculator'` erscheint

### 3. Überprüfen Sie die Daten

Führen Sie diese SQL-Abfrage im Supabase SQL Editor aus:

```sql
SELECT 
  customer_name,
  email,
  form_id,
  page_url,
  source_url,
  created_at
FROM leads
ORDER BY created_at DESC
LIMIT 10;
```

Sie sollten sehen:
- `form_id`: z.B. "contact_form", "inquiry_form", "service_calculator"
- `page_url`: z.B. "/kontakt", "/anfrage", "/rechner"
- `source_url`: Vollständige URL inkl. Domain

### 4. Fehlerbehebung

#### Wenn Formulare immer noch Fehler zeigen:
1. **Browser-Cache leeren**: `Ctrl+Shift+R` (Windows) oder `Cmd+Shift+R` (Mac)
2. **Development-Server neu starten**:
   ```bash
   # Stoppen Sie den Server (Ctrl+C)
   # Starten Sie ihn neu
   npm run dev
   # oder
   bun dev
   ```

3. **Browser-Konsole prüfen**: Öffnen Sie die Entwicklertools (F12) und schauen Sie nach Fehlern

4. **Supabase-Verbindung prüfen**: In der Browser-Konsole sollte stehen:
   ```
   ✅ Supabase-Konfiguration erkannt!
   ```

#### Wenn `source_url` immer noch NULL ist:
- Überprüfen Sie, ob `window.location.href` im Browser verfügbar ist
- Prüfen Sie die Browser-Konsole auf JavaScript-Fehler

### 5. Erfolg!

Wenn alles funktioniert, sollten Sie jetzt:
- ✅ Alle Formulare speichern Daten in Supabase
- ✅ `form_id` zeigt an, welches Formular verwendet wurde
- ✅ `page_url` zeigt den Pfad der Seite
- ✅ `source_url` zeigt die vollständige URL
- ✅ `additional_data` enthält zusätzliche Formular-Daten (bei Anfrage, Rechner, Partner)

## Nächste Schritte (optional)

- E-Mail-Benachrichtigungen einrichten (Supabase Edge Functions)
- Dashboard für Lead-Verwaltung erstellen
- Automatische Weiterleitung basierend auf `form_id` oder `city`

