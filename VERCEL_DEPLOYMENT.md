# Vercel Deployment Anleitung

## ✅ GitHub Repository ist bereit

Das Repository wurde erfolgreich zu GitHub gepusht:
- Repository: `https://github.com/rayscodemuc/mr-clean-services-gmbh.git`
- Branch: `main`

---

## 🚀 Projekt bei Vercel deployen

### Schritt 1: Vercel Account erstellen/login

1. Gehe zu https://vercel.com
2. Klicke auf **"Sign Up"** (falls neu) oder **"Log In"**
3. Wähle **"Continue with GitHub"** - damit wird dein GitHub-Account verknüpft
4. Autorisiere Vercel, auf deine GitHub-Repositories zuzugreifen

---

### Schritt 2: Projekt importieren

1. Nach dem Login siehst du das **Vercel Dashboard**
2. Klicke auf **"Add New..."** → **"Project"**
3. Du siehst eine Liste deiner GitHub-Repositories
4. **Suche nach:** `mr-clean-services-gmbh` oder `rayscodemuc/mr-clean-services-gmbh`
5. Klicke auf **"Import"** neben dem Repository

---

### Schritt 3: Projekt konfigurieren

Vercel sollte die Konfiguration automatisch erkennen, aber prüfe folgendes:

#### Framework Preset:
- **Sollte automatisch:** `Astro` sein
- Falls nicht: Wähle manuell `Astro` aus dem Dropdown

#### Root Directory:
- **Belasse:** `./` (Standard)
- Vercel sollte den Ordner automatisch erkennen

#### Build Settings:
- **Build Command:** `npm run build` (Standard für Astro)
- **Output Directory:** `.vercel/output` (wird automatisch durch Astro Vercel Adapter gesetzt)
- **Install Command:** `npm install` (Standard)

#### Environment Variables (WICHTIG):
Falls du Supabase oder andere Services nutzt, füge hier die Umgebungsvariablen hinzu:

- Klicke auf **"Environment Variables"** erweitern
- Füge hinzu (falls benötigt):
  - **Name:** `VITE_SUPABASE_URL`
    - **Value:** `https://dein-projekt.supabase.co`
    - **Environment:** Alle (Production, Preview, Development)
  
  - **Name:** `VITE_SUPABASE_ANON_KEY`
    - **Value:** `dein-anon-key`
    - **Environment:** Alle (Production, Preview, Development)

⚠️ **Hinweis:** Diese Werte findest du in deinem Supabase Dashboard unter Settings → API

---

### Schritt 4: Deploy starten

1. Klicke auf **"Deploy"** (unten rechts)
2. Vercel startet jetzt den Build-Prozess:
   - Installiert Dependencies (`npm install`)
   - Führt Build aus (`npm run build`)
   - Deployed die Seite

3. **Warte ca. 1-2 Minuten** - du siehst den Build-Progress in Echtzeit

---

### Schritt 5: Deployment erfolgreich! 🎉

Nach erfolgreichem Deployment erhältst du:

1. **Vercel URL:** z.B. `https://mr-clean-services-gmbh.vercel.app`
   - Diese URL ist sofort verfügbar!

2. **Preview URL:** Jeder Push zu GitHub erstellt automatisch eine neue Preview-Deployment

3. **Produktions-URL:** Der `main` Branch wird automatisch als Produktions-Deployment verwendet

---

## 🌐 Custom Domain einrichten (mr-clean.services)

### Schritt 1: Domain bei Vercel hinzufügen

1. Gehe zu deinem Projekt im Vercel Dashboard
2. Klicke auf **"Settings"** (oben im Menü)
3. Klicke auf **"Domains"** (in der Sidebar)
4. Klicke auf **"Add Domain"**
5. Gib ein: `mr-clean.services`
6. Klicke auf **"Add"**

### Schritt 2: DNS-Einstellungen bei IONOS

Vercel zeigt dir jetzt die DNS-Konfiguration, die du bei IONOS eintragen musst:

#### Option A: Apex Domain (mr-clean.services direkt)

**DNS-Einträge bei IONOS:**

1. **A-Record** (falls erforderlich):
   - **Name/Host:** `@` oder leer lassen
   - **Type:** `A`
   - **Value/Points to:** `76.76.21.21` (Vercel's IP - wird von Vercel angezeigt)
   - **TTL:** `3600` (Standard)

2. **CNAME-Record** (Empfohlen):
   - **Name/Host:** `@` oder leer lassen
   - **Type:** `CNAME`
   - **Value/Points to:** `cname.vercel-dns.com` (oder die von Vercel angezeigte CNAME)
   - **TTL:** `3600` (Standard)

#### Option B: WWW Subdomain

Falls du auch `www.mr-clean.services` möchtest:

1. Gehe zu Vercel → Settings → Domains
2. Füge auch `www.mr-clean.services` hinzu
3. Bei IONOS:
   - **Name/Host:** `www`
   - **Type:** `CNAME`
   - **Value/Points to:** Die von Vercel angezeigte CNAME

### Schritt 3: DNS-Propagierung abwarten

- **DNS-Propagierung** dauert normalerweise **5-60 Minuten**
- Manche ISPs können bis zu **24 Stunden** brauchen
- Du kannst die Propagation prüfen: https://dnschecker.org

### Schritt 4: SSL-Zertifikat (automatisch)

- Vercel erstellt **automatisch** ein SSL-Zertifikat (HTTPS)
- Nach der DNS-Propagierung ist deine Seite unter **https://mr-clean.services** erreichbar!

---

## 📝 Hinweise

### Automatische Deployments

- **Jeder Push zu `main`** → Neues Production Deployment
- **Pull Requests** → Automatische Preview-Deployments
- **Andere Branches** → Preview-Deployments mit eindeutiger URL

### Umgebungsvariablen

- **Production:** Nur für `main` Branch
- **Preview:** Für alle PRs und Branches
- **Development:** Für lokale Entwicklung (optional)

### Monitoring

- Im Vercel Dashboard siehst du:
  - Analytics (Besucher, Performance)
  - Build Logs
  - Deployment History
  - Error Logs

---

## 🔧 Troubleshooting

### Build schlägt fehl?

1. Prüfe die **Build Logs** im Vercel Dashboard
2. Stelle sicher, dass alle Dependencies in `package.json` sind
3. Prüfe, ob Umgebungsvariablen korrekt gesetzt sind

### Domain funktioniert nicht?

1. Warte auf DNS-Propagierung (bis zu 24h)
2. Prüfe DNS-Einträge mit: https://dnschecker.org
3. Stelle sicher, dass keine alten DNS-Einträge vorhanden sind

### SSL-Zertifikat wird nicht erstellt?

- Warte auf DNS-Propagierung
- Vercel erstellt SSL automatisch nach erfolgreicher DNS-Verifizierung

---

## ✅ Checkliste

- [ ] Vercel Account erstellt/angemeldet
- [ ] GitHub-Repository bei Vercel importiert
- [ ] Build erfolgreich (Check Build Logs)
- [ ] Preview URL funktioniert (z.B. `https://mr-clean-services-gmbh.vercel.app`)
- [ ] Domain bei Vercel hinzugefügt (`mr-clean.services`)
- [ ] DNS-Einträge bei IONOS konfiguriert
- [ ] DNS-Propagierung abgewartet
- [ ] SSL-Zertifikat aktiv (grünes Schloss im Browser)
- [ ] Website unter `https://mr-clean.services` erreichbar

---

**Viel Erfolg beim Deployment! 🚀**
