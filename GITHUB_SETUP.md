# GitHub & Vercel Setup Anleitung

## ✅ Git Repository vorbereitet

Das Git-Repository wurde initialisiert und der erste Commit wurde erstellt:
- Commit: "Initial Astro Migration complete"
- `.gitignore` erstellt (schließt `node_modules/`, `.vercel/`, `dist/`, `.env` aus)

---

## 📤 Projekt zu GitHub hochladen

### Option 1: Über GitHub Web Interface (Empfohlen)

1. **Neues Repository auf GitHub erstellen:**
   - Gehe zu https://github.com/new
   - Repository-Name: z.B. `curved-corot` oder `mr-clean-services-astro`
   - **WICHTIG:** Lass das Repository leer (keine README, keine .gitignore, keine License hinzufügen!)
   - Klicke auf "Create repository"

2. **Repository zu lokalem Git hinzufügen:**
   ```bash
   cd curved-corot
   git remote add origin https://github.com/DEIN-USERNAME/REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Bei Authentifizierung:**
   - Wenn GitHub nach Benutzername/Passwort fragt, nutze einen **Personal Access Token** (nicht dein Passwort!)
   - Erstelle einen Token unter: https://github.com/settings/tokens
   - Wähle `repo` als Scope
   - Kopiere den Token und nutze ihn als Passwort

### Option 2: GitHub CLI (gh)

Falls du `gh` installiert hast:
```bash
cd curved-corot
gh repo create curved-corot --public --source=. --remote=origin --push
```

### Option 3: Über Cursor / VS Code

1. Öffne das Terminal in Cursor (Terminal → New Terminal)
2. Führe die Befehle aus Option 1, Schritt 2 aus
3. Oder nutze das Git-UI in Cursor:
   - Klicke auf das Git-Icon in der Sidebar
   - Klicke auf "..." → "Push" → "Publish Branch"
   - Folge den Anweisungen

---

## 🔗 Projekt mit Vercel verknüpfen

### Nachdem der Code auf GitHub ist:

1. **Gehe zu Vercel:**
   - https://vercel.com/new
   - Logge dich mit GitHub ein

2. **Importiere das Repository:**
   - Klicke auf "Import Git Repository"
   - Wähle dein `curved-corot` Repository aus
   - Klicke auf "Import"

3. **Projekt konfigurieren:**
   - **Framework Preset:** Astro (sollte automatisch erkannt werden)
   - **Root Directory:** `./` (Standard)
   - **Build Command:** `npm run build` (Standard)
   - **Output Directory:** `.vercel/output` (wird automatisch gesetzt durch Astro Vercel Adapter)

4. **Umgebungsvariablen hinzufügen:**
   - Falls benötigt, füge diese hinzu:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Klicke auf "Add" für jede Variable

5. **Deploy:**
   - Klicke auf "Deploy"
   - Warte bis der Build abgeschlossen ist
   - Du erhältst eine URL wie: `https://curved-corot.vercel.app`

---

## 🌐 Domain konfigurieren (siehe IONOS_DNS_SETUP.md)

Nach dem ersten Deployment:
1. Gehe zu Vercel Dashboard → Dein Projekt → Settings → Domains
2. Füge deine Domain hinzu: `mrclean-services.de`
3. Folge den Anweisungen in `IONOS_DNS_SETUP.md` für die DNS-Konfiguration

---

## 🚀 Weiterentwicklung

Nach dem ersten Push funktioniert alles automatisch:
- Jeder `git push` zu GitHub löst automatisch einen neuen Deployment bei Vercel aus
- Pull Requests können als Preview-Deployments genutzt werden
