# GitHub Push - Authentifizierung erforderlich

## ⚠️ Push schlägt fehl: Authentifizierung nötig

Der Push-Befehl benötigt eine Authentifizierung. Es gibt zwei Möglichkeiten:

---

## 🔐 Option 1: Personal Access Token (Empfohlen)

### Schritt 1: Token erstellen

1. Gehe zu GitHub: https://github.com/settings/tokens
2. Klicke auf **"Generate new token"** → **"Generate new token (classic)"**
3. Gib einen Namen ein: z.B. `Vercel Deployment Token`
4. Wähle die **Scopes** (Berechtigungen):
   - ✅ **`repo`** (alles auswählen: `repo:status`, `repo_deployment`, `public_repo`, etc.)
5. Klicke auf **"Generate token"** (unten)
6. **WICHTIG:** Kopiere den Token sofort! (Er wird nur einmal angezeigt)

### Schritt 2: Token nutzen für Push

**Im Terminal:**
```bash
cd curved-corot
git push -u origin main
```

Wenn nach **Username** gefragt wird:
- Gib ein: `rayscodemuc`

Wenn nach **Password** gefragt wird:
- **NICHT dein GitHub-Passwort eingeben!**
- Gib stattdessen den **Personal Access Token** ein, den du gerade erstellt hast

---

## 🔐 Option 2: SSH Key (Alternative)

Falls du SSH Keys bevorzugst:

### SSH Key erstellen (falls noch nicht vorhanden):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### SSH Key zu GitHub hinzufügen:
1. Kopiere den öffentlichen Key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Gehe zu: https://github.com/settings/keys
3. Klicke auf **"New SSH key"**
4. Füge den Key ein und speichere

### Remote auf SSH umstellen:
```bash
cd curved-corot
git remote set-url origin git@github.com:rayscodemuc/mr-clean-services-gmbh.git
git push -u origin main
```

---

## ✅ Push erfolgreich?

Nach erfolgreichem Push solltest du sehen:
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/rayscodemuc/mr-clean-services-gmbh.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Dann kannst du mit **VERCEL_DEPLOYMENT.md** fortfahren! 🚀
