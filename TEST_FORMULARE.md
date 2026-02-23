# Formulare testen - Checkliste

## ✅ Nach dem Ausführen der Migrationen

### 1. Überprüfen Sie die Tabelle in Supabase

Gehen Sie im Supabase Dashboard zu:
- **Table Editor** → **tickets**

Alle Formulare (Kontakt, Anfrage, Rechner) speichern über `useUniversalSubmit` in die `tickets`-Tabelle.

### 2. Testen Sie die Formulare

#### Kontaktformular (`/kontakt`)
1. Gehen Sie zu `/kontakt`
2. Füllen Sie das Formular aus
3. Klicken Sie auf "Anfrage senden"
4. Prüfen Sie in Supabase → Table Editor → tickets, ob der Eintrag erscheint
5. Überprüfen Sie, dass `kunde_name`, `kontakt_email`, `beschreibung` gefüllt sind

#### Anfrageformular (`/anfrage`)
1. Gehen Sie zu `/anfrage`
2. Füllen Sie das Formular aus
3. Senden Sie es ab
4. Prüfen Sie in Supabase, ob der Eintrag erscheint (status = 'Anfrage')

#### Rechner (`/rechner`)
1. Gehen Sie zu `/rechner`
2. Füllen Sie den Rechner aus
3. Senden Sie die Anfrage ab
4. Prüfen Sie in Supabase, ob der Eintrag mit Rechner-Daten in `additional_data` erscheint

### 3. Überprüfen Sie die Daten

```sql
SELECT 
  kunde_name,
  kontakt_email,
  objekt_adresse,
  beschreibung,
  additional_data,
  created_at
FROM tickets
ORDER BY created_at DESC
LIMIT 10;
```

### 4. Fehlerbehebung

- **Browser-Konsole prüfen**: Entwicklertools (F12) auf Fehler prüfen
- **Supabase-Verbindung**: In der Konsole sollte die Konfiguration erkannt werden
- **Migration anwenden**: `supabase db push` oder Migrationen manuell im SQL Editor ausführen
