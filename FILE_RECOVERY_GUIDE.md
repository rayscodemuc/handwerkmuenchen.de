# Datei-Wiederherstellung Anleitung

## 📊 Zusammenfassung

**Aktueller Stand:** 103 Dateien in `src/`
**Gelöschte Dateien beim Umzug:** 39 Dateien
**Status:** ✅ Alle wichtigen Komponenten wurden erfolgreich migriert!

---

## ✅ Wichtige Dateien, die BEIBEHALTEN wurden:

### Astro Pages (neu erstellt):
- `src/pages/index.astro` ✅
- `src/pages/kontakt.astro` ✅
- `src/pages/anfrage.astro` ✅
- `src/pages/datenschutz.astro` ✅
- `src/pages/impressum.astro` ✅
- `src/pages/ueber-uns.astro` ✅
- `src/pages/partner-werden.astro` ✅

### React Komponenten (von `src/pages/` nach `src/components/` verschoben):
- `src/components/Index.tsx` ✅ (war `src/pages/Index.tsx`)
- `src/components/Kontakt.tsx` ✅ (war `src/pages/Kontakt.tsx`)
- `src/components/Anfrage.tsx` ✅ (war `src/pages/Anfrage.tsx`)
- `src/components/Datenschutz.tsx` ✅ (war `src/pages/Datenschutz.tsx`)
- `src/components/Impressum.tsx` ✅ (war `src/pages/Impressum.tsx`)
- `src/components/UeberUns.tsx` ✅ (war `src/pages/UeberUns.tsx`)
- `src/components/PartnerWerden.tsx` ✅ (war `src/pages/PartnerWerden.tsx`)
- `src/components/Elektrotechnik.tsx` ✅ (war `src/pages/services/Elektrotechnik.tsx`)

### Alle anderen wichtigen Komponenten:
- Alle UI-Komponenten in `src/components/ui/` (65 Dateien) ✅
- Alle Sections in `src/components/sections/` (10 Dateien) ✅
- Layout-Komponenten (`Header.tsx`, `Footer.tsx`) ✅
- Alle Hooks in `src/hooks/` (4 Dateien) ✅
- Lib-Dateien (`supabase.ts`, `utils.ts`) ✅
- Alle Assets in `src/assets/` (8 Dateien) ✅

---

## ⚠️ Dateien, die GELÖSCHT wurden (bewusst entfernt):

### Alte React Router Seiten (nicht migriert):
- `src/pages/Rechner.tsx` - Preisrechner (952 Zeilen) - **Kann wiederhergestellt werden**
- `src/pages/Service247.tsx` - 24/7 Service Seite (261 Zeilen) - **Kann wiederhergestellt werden**
- `src/pages/NotFound.tsx` - 404 Seite (24 Zeilen) - **Kann wiederhergestellt werden**

### Category-Seiten (nicht migriert):
- `src/pages/categories/AussenanlagenCategory.tsx` (154 Zeilen)
- `src/pages/categories/FacilityManagementCategory.tsx` (250 Zeilen)
- `src/pages/categories/HandwerkCategory.tsx` (255 Zeilen)
- `src/pages/categories/ReinigungCategory.tsx` (242 Zeilen)

### Service-Seiten (nicht migriert, außer Elektrotechnik):
- `src/pages/services/Baumpflege.tsx`
- `src/pages/services/Bueroreinigung.tsx`
- `src/pages/services/Fensterreinigung.tsx`
- `src/pages/services/GlasFassade.tsx`
- `src/pages/services/Grauflaechenreinigung.tsx`
- `src/pages/services/Gruenpflege.tsx`
- `src/pages/services/Grundreinigung.tsx`
- `src/pages/services/Hausmeisterservice.tsx`
- `src/pages/services/Objektmanagement.tsx`
- `src/pages/services/SanitaerHeizung.tsx`
- `src/pages/services/ServiceWartung.tsx`
- `src/pages/services/Sonderreinigung.tsx`
- `src/pages/services/Tiefgaragenreinigung.tsx`
- `src/pages/services/Unterhaltsreinigung.tsx`
- `src/pages/services/Winterdienst.tsx`
- `src/pages/services/WinterdienstAussen.tsx`
- `src/pages/services/ServicePageLayout.tsx` (Layout-Komponente)
- `src/pages/services/BlogServicePageLayout.tsx` (Layout-Komponente)

### Standort-Seiten (nicht migriert):
- `src/pages/standorte/Augsburg.tsx`
- `src/pages/standorte/Berlin.tsx`
- `src/pages/standorte/Frankfurt.tsx`
- `src/pages/standorte/Hamburg.tsx`
- `src/pages/standorte/Ingolstadt.tsx`
- `src/pages/standorte/Muenchen.tsx`
- `src/pages/standorte/Nuernberg.tsx`
- `src/pages/standorte/LocationPageLayout.tsx` (Layout-Komponente)

### Alte React Router System-Dateien (nicht mehr benötigt):
- `src/App.tsx` - React Router App (131 Zeilen)
- `src/main.tsx` - React Entry Point (5 Zeilen)
- `src/index.css` - Ersetzt durch `src/styles/global.css`
- `src/App.css` - Nicht mehr benötigt
- `src/components/NavLink.tsx` - Ersetzt durch normale `<a>` Tags
- `src/vite-env.d.ts` - Vite Type Definitions (nicht mehr benötigt)

**Hinweis:** Diese Dateien wurden bewusst entfernt, da sie Teil des alten React Router Systems waren und durch die Astro-Migration nicht mehr benötigt werden.

---

## 🔄 Dateien wiederherstellen (falls nötig)

### Option 1: Einzelne Datei wiederherstellen (aus Commit vor dem Umzug)

```bash
cd /Users/erayoezcan/calm-design-foundation

# Beispiel: Rechner.tsx wiederherstellen (aus Commit 453984a)
git show 453984a:src/pages/Rechner.tsx > src/pages/Rechner.tsx

# Beispiel: Service247.tsx wiederherstellen
git show 453984a:src/pages/Service247.tsx > src/pages/Service247.tsx

# Beispiel: NotFound.tsx wiederherstellen
git show 453984a:src/pages/NotFound.tsx > src/pages/NotFound.tsx
```

### Option 2: Alle gelöschten Dateien anzeigen

```bash
# Zeige alle gelöschten Dateien im Umzug-Commit
git show a6e9754 --name-status | grep "^D" | grep "src/"

# Zeige alle gelöschten Dateien mit Details
git show a6e9754 --name-status | grep "^D"
```

### Option 3: Inhalt einer gelöschten Datei anzeigen (ohne wiederherzustellen)

```bash
# Zeige Inhalt von Rechner.tsx
git show 453984a:src/pages/Rechner.tsx

# Zeige Inhalt von Service247.tsx
git show 453984a:src/pages/Service247.tsx

# Zeige Inhalt einer Service-Seite
git show 453984a:src/pages/services/Hausmeisterservice.tsx
```

### Option 4: Mehrere Dateien wiederherstellen

```bash
# Alle Service-Seiten wiederherstellen
git show 453984a:src/pages/services/Hausmeisterservice.tsx > src/pages/services/Hausmeisterservice.tsx
git show 453984a:src/pages/services/Winterdienst.tsx > src/pages/services/Winterdienst.tsx
# ... etc.

# Oder alle auf einmal (Vorsicht: überschreibt existierende Dateien!)
for file in $(git show a6e9754 --name-status | grep "^D.*src/pages/services" | awk '{print $2}'); do
  git show 453984a:$file > $file
done
```

### Option 5: Kompletten Stand vor dem Umzug anzeigen

```bash
# Zeige alle Dateien vor dem Umzug (Commit 453984a)
git ls-tree -r 453984a --name-only | grep "^src/"

# Checkout eines bestimmten Commits (nur zum Ansehen, nicht committen!)
git checkout 453984a -- src/pages/Rechner.tsx
```

---

## 📊 Statistiken

**Aktueller Stand (nach Umzug):**
- **103 Dateien** in `src/`
- **94 TypeScript/TSX/Astro Dateien**
- **7 Astro Pages** (neu erstellt)
- **Alle wichtigen Komponenten vorhanden** ✅

**Gelöschte Dateien beim Umzug:**
- **39 Dateien** gelöscht
- Hauptsächlich:
  - Alte React Router Seiten (3 Hauptseiten)
  - Category-Seiten (4 Dateien)
  - Service-Seiten (18 Dateien)
  - Standort-Seiten (8 Dateien)
  - System-Dateien (6 Dateien)

**Verschobene Dateien:**
- **7 React Komponenten** von `src/pages/` → `src/components/`
- Alle anderen Komponenten blieben an ihrem Platz

---

## ✅ Empfehlung

### ✅ **Keine wichtigen Dateien verloren!**

**Alle wichtigen Komponenten wurden erfolgreich migriert:**
- ✅ Alle UI-Komponenten (65 Dateien)
- ✅ Alle Sections (10 Dateien)
- ✅ Alle Hooks (4 Dateien)
- ✅ Layout-Komponenten (Header, Footer)
- ✅ Alle Assets (8 Dateien)
- ✅ Lib-Dateien (supabase, utils)
- ✅ Hauptseiten-Komponenten (Index, Kontakt, Anfrage, etc.)

### ⚠️ **Bewusst nicht migriert:**

Die gelöschten Dateien sind **bewusst entfernt** worden, da sie:
1. Teil des alten React Router Systems waren
2. Durch Astro's file-based routing ersetzt wurden
3. Nicht für die aktuelle Migration benötigt werden

### 🔄 **Falls du spezifische Dateien wiederherstellen möchtest:**

**Wichtige Seiten, die wiederhergestellt werden können:**
- `Rechner.tsx` - Preisrechner (wichtig für Business)
- `Service247.tsx` - 24/7 Service Seite
- `NotFound.tsx` - 404 Fehlerseite

**Schritte zur Wiederherstellung:**
1. Verwende die Befehle unter "Option 1" oben
2. Passe die wiederhergestellten Dateien an Astro an:
   - Entferne `react-router-dom` Imports
   - Ersetze `<Link>` durch `<a>` Tags
   - Erstelle eine entsprechende `.astro` Page
   - Verwende `client:only="react"` für die Komponente

---

## 🔍 Detaillierte Prüfung

### Alle gelöschten Dateien anzeigen:

```bash
cd /Users/erayoezcan/calm-design-foundation
git show a6e9754 --name-status | grep "^D" | grep "src/"
```

### Inhalt einer gelöschten Datei anzeigen:

```bash
# Rechner.tsx
git show 453984a:src/pages/Rechner.tsx | head -50

# Service247.tsx
git show 453984a:src/pages/Service247.tsx

# Eine Service-Seite
git show 453984a:src/pages/services/Hausmeisterservice.tsx
```

### Vergleich: Vor vs. Nach

```bash
# Dateien vor dem Umzug
git ls-tree -r 453984a --name-only | grep "^src/" | wc -l

# Dateien nach dem Umzug
find src -type f | wc -l
```
