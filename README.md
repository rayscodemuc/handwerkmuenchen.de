# handwerkmuenchen.de

Next.js-Website (App Router) für Leistungen, Rechner, Kontakt und Rechtliches.

## Lokal starten

```sh
npm i
npm run dev
```

Dev-Server: **http://127.0.0.1:3010**

## Skripte

- `npm run dev` – Entwicklung mit Next.js (Port 3010)
- `npm run build` – Production-Build
- `npm run start` – Production-Server (Port 3010)
- `npm run lint` – ESLint

## Tech-Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** & **tailwindcss-animate**
- **shadcn/ui** (Radix)
- **Supabase** (optional, für Formulare/Backend)

## Projektstruktur (Code im Repo)

- `app/` – Routen und Seiten (Leistungen, Rechner, Kontakt, …)
- `components/` – UI, Layout (Header/Footer), Blöcke (Hero, CTA, …)
- `lib/` – Konfiguration (Leistungen), Schema, Utils
- `hooks/` – z. B. Kontaktformular, Toast
- `public/` – statische Dateien, Dokumente, Fonts
- `scripts/` – Hilfsskripte (z. B. Git-Worktrees)

Die **Arbeitskopien pro Feature** liegen **nicht** unter diesen Ordnern, sondern im **Bare-Repo** unter `~/repos/handwerkmuenchen.de/branches/` (siehe unten).

## Git Worktrees und Release-Workflow

Ziel: **ein Ordner pro Feature**, eigener Branch, **Pull Request**, Review, **Merge** in `main` — klar getrennt von anderen Features.

### Ordnerlayout (Bare-Repo)

```text
~/repos/handwerkmuenchen.de/          # Bare-Repo (nur Git-Metadaten)
  branches/
    main/                             # stabile Basis (optionaler Worktree)
    <feature-kurzname>/               # genau ein Feature / ein Branch
```

| Rolle | Pfad |
|--------|------|
| Bare-Repo | `~/repos/handwerkmuenchen.de` (oder `GIT_WORKTREE_BARE`) |
| Feature-Arbeit | `~/repos/handwerkmuenchen.de/branches/<kurzname>/` |

### Ablauf (kurz)

1. **Feature starten** — neuen Worktree + Branch von `origin/main` anlegen (siehe Skript oder manuelle Befehle).
2. **Entwickeln** — nur in diesem Ordner; `npm i`, `.env.local` (z. B. von `branches/main` kopieren), `npm run dev`.
3. **Commit & Push** — `git add` / `git commit`; `git push -u origin feature/<kurzname>`.
4. **Pull Request** — auf GitHub PR von `feature/<kurzname>` → `main` öffnen, Review, CI.
5. **Merge** — nach Freigabe in GitHub mergen.
6. **Aufräumen** — lokal `git fetch origin`; Worktree entfernen (`scripts/worktree-remove.sh` oder `git worktree remove`); optional Branch lokal/remote löschen.

### Neues Feature (Skript)

Voraussetzung: Bare-Repo unter `~/repos/handwerkmuenchen.de` (siehe `git clone --bare …`).

```sh
./scripts/worktree-feature.sh <kurzname-kebab-case>
# Beispiel: ./scripts/worktree-feature.sh gewerk-mangel-filter
cd ~/repos/handwerkmuenchen.de/branches/<kurzname>
npm i
npm run dev
```

Per npm (Argument nach `--`):

```sh
npm run git:worktree:new -- gewerk-mangel-filter
```

### Neues Feature (manuell)

```sh
cd ~/repos/handwerkmuenchen.de
git fetch origin
git worktree add branches/mein-feature -b feature/mein-feature origin/main
cd branches/mein-feature
npm i
npm run dev
```

Branch existiert schon (z. B. auf `origin`):

```sh
git worktree add branches/mein-feature feature/mein-feature
```

### Nach dem Merge: Worktree entfernen

```sh
./scripts/worktree-remove.sh <kurzname>
# oder
cd ~/repos/handwerkmuenchen.de && git worktree remove branches/<kurzname>
```

### Nützliche Befehle

```sh
git worktree list
git fetch origin
git status
```

**Hinweise:** Pro Worktree eigenes `node_modules` und eigene `.env.local` (nicht committen). Ein Branch nur in einem Worktree. Ein beliebiger weiterer Klon (z. B. Cursor-Projektordner) kann parallel existieren — für den beschriebenen Workflow ist das Bare-Repo unter `~/repos/` die Referenz.

## Weitere Docs

- `SUPABASE.md` / `SUPABASE_SETUP.md` – Backend/DB
- `TEST_FORMULARE.md` – Formulartests
