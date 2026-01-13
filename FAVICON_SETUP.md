# Favicon Setup - Mr. Logo verwenden

## Schritt 1: Logo-Dateien vorbereiten

Du benötigst das **"Mr." Logo mit dem Bogen** in folgenden Formaten:

### Option A: Automatische Konvertierung (empfohlen)
1. Gehe zu https://realfavicongenerator.net/
2. Lade dein "Mr." Logo hoch
3. Die Seite generiert automatisch alle benötigten Formate
4. Lade die generierten Dateien herunter

### Option B: Manuelle Konvertierung
Erstelle folgende Dateien aus deinem Logo:

- `favicon-32x32.png` - 32x32 Pixel (für Browser-Tabs)
- `favicon-16x16.png` - 16x16 Pixel (für Browser-Tabs)
- `apple-touch-icon.png` - 180x180 Pixel (für iOS)
- `favicon.ico` - Multi-Format ICO (für ältere Browser)
- `favicon.svg` - SVG Format (optional, für moderne Browser)

## Schritt 2: Dateien platzieren

Kopiere alle generierten Dateien in den `public/` Ordner:

```
public/
  ├── favicon-32x32.png
  ├── favicon-16x16.png
  ├── apple-touch-icon.png
  ├── favicon.ico
  └── favicon.svg (optional)
```

## Schritt 3: Testen

1. Starte den Dev-Server neu: `npm run dev`
2. Öffne die Seite im Browser
3. Das Favicon sollte jetzt im Browser-Tab sichtbar sein

## Wichtige Hinweise

- **Transparenter Hintergrund**: Das Logo sollte einen transparenten Hintergrund haben
- **Quadratisches Format**: Favicons funktionieren am besten im quadratischen Format
- **Fokus auf "Mr."**: Da Favicons sehr klein sind, sollte der "Mr." Teil mit dem Bogen gut erkennbar sein
- **Farben**: Die Teal/Farbe sollte auch in kleinen Größen gut sichtbar sein

## Schnellstart (falls du das Logo bereits hast)

Wenn du das Logo bereits als PNG/JPEG hast:

1. Kopiere es nach `public/favicon-original.png`
2. Verwende ein Online-Tool wie https://favicon.io/favicon-converter/
3. Lade `favicon-original.png` hoch
4. Lade die generierten Dateien herunter
5. Kopiere sie in den `public/` Ordner

Die `index.html` ist bereits konfiguriert und verwendet automatisch die Dateien, sobald sie vorhanden sind!
