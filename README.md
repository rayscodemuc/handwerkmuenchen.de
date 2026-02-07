# Calm Design Foundation

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

## Projektstruktur

- `app/` – Routen und Seiten (Leistungen, Rechner, Kontakt, …)
- `components/` – UI, Layout (Header/Footer), Blöcke (Hero, CTA, …)
- `lib/` – Konfiguration (Leistungen), Schema, Utils
- `hooks/` – z. B. Kontaktformular, Toast
- `public/` – statische Dateien, Dokumente, Fonts

## Weitere Docs

- `SUPABASE.md` / `SUPABASE_SETUP.md` – Backend/DB
- `TEST_FORMULARE.md` – Formulartests
