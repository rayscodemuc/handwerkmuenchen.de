# IONOS DNS-Konfiguration für Vercel Deployment

Diese Anleitung beschreibt die DNS-Einstellungen, die Sie bei IONOS für die Domain `mr-clean.services` eintragen müssen, nachdem das Projekt bei Vercel registriert wurde.

## Voraussetzungen

1. ✅ Projekt wurde bei Vercel registriert
2. ✅ Domain wurde bei Vercel hinzugefügt (Vercel wird die benötigten DNS-Einträge anzeigen)
3. ✅ Zugriff auf das IONOS DNS-Verwaltungspanel

## Schritt-für-Schritt Anleitung

### 1. Domain bei Vercel hinzufügen

1. Gehen Sie zu Ihrem Vercel-Dashboard
2. Wählen Sie Ihr Projekt aus
3. Navigieren Sie zu **Settings** → **Domains**
4. Fügen Sie `mr-clean.services` hinzu
5. Vercel zeigt Ihnen die benötigten DNS-Einträge an

### 2. DNS-Einträge bei IONOS konfigurieren

Loggen Sie sich in Ihr IONOS-Kundenportal ein und navigieren Sie zu **Domains** → **DNS-Verwaltung** für `mr-clean.services`.

#### Option A: Root-Domain (mr-clean.services) - Empfohlen

Fügen Sie die folgenden DNS-Einträge hinzu:

##### A-Record für Root-Domain
```
Typ: A
Name: @ (oder leer lassen)
Wert: 76.76.21.21
TTL: 3600 (oder Standard)
```

**Wichtig**: Vercel verwendet dynamische IP-Adressen. Der A-Record `76.76.21.21` ist Vercels Standard-IP, aber Vercel empfiehlt normalerweise CNAME-Records zu verwenden.

##### CNAME-Record für www-Subdomain (optional)
```
Typ: CNAME
Name: www
Wert: cname.vercel-dns.com.
TTL: 3600 (oder Standard)
```

#### Option B: CNAME-Flattening (Alternative)

Falls IONOS CNAME-Flattening unterstützt (ALIAS/ANAME Records):

```
Typ: CNAME (oder ALIAS/ANAME wenn verfügbar)
Name: @ (oder leer lassen)
Wert: cname.vercel-dns.com.
TTL: 3600
```

### 3. Vercel-spezifische DNS-Einträge

Nach dem Hinzufügen der Domain bei Vercel zeigt Vercel Ihnen die **exakten Werte** an, die Sie verwenden müssen. Diese können sich unterscheiden. Verwenden Sie immer die von Vercel angezeigten Werte.

**Typische Vercel DNS-Konfiguration:**

#### Für Root-Domain (mr-clean.services):
```
A-Record:
- Name: @
- Wert: 76.76.21.21
- TTL: 3600

ODER (falls CNAME-Flattening unterstützt wird):
- Name: @
- Typ: CNAME (oder ALIAS)
- Wert: cname.vercel-dns.com.
- TTL: 3600
```

#### Für www-Subdomain (www.mr-clean.services):
```
CNAME-Record:
- Name: www
- Wert: cname.vercel-dns.com.
- TTL: 3600
```

### 4. Wichtige Hinweise

⚠️ **Achtung**: Die exakten DNS-Werte werden von Vercel nach dem Hinzufügen der Domain angezeigt. Verwenden Sie diese Werte, da sie projektspezifisch sein können.

⚠️ **Propagationszeit**: DNS-Änderungen können bis zu 48 Stunden benötigen, bis sie weltweit propagiert sind. Normalerweise dauert es 1-24 Stunden.

⚠️ **TTL-Wert**: Verwenden Sie einen TTL-Wert von 3600 Sekunden (1 Stunde) für schnellere Änderungen während der Einrichtung. Nach dem Setup können Sie höhere Werte verwenden.

### 5. Verifizierung

1. **Bei Vercel**: Prüfen Sie im Dashboard, ob die Domain erfolgreich verifiziert wurde
2. **DNS-Check**: Verwenden Sie Tools wie:
   - [DNS Checker](https://dnschecker.org/)
   - `dig mr-clean.services`
   - `nslookup mr-clean.services`

### 6. HTTPS/SSL-Zertifikat

Vercel stellt automatisch SSL-Zertifikate (Let's Encrypt) für Ihre Domain bereit. Dies geschieht automatisch nach erfolgreicher DNS-Verifizierung.

## Troubleshooting

### Domain wird nicht verifiziert

- Prüfen Sie, ob die DNS-Einträge korrekt eingetragen wurden
- Warten Sie auf die DNS-Propagationszeit (kann bis zu 48 Stunden dauern)
- Verwenden Sie DNS-Checker-Tools, um zu prüfen, ob die Einträge weltweit propagiert sind

### A-Record vs. CNAME

- **A-Record**: Direkte IP-Adresse (76.76.21.21 ist Vercels Standard)
- **CNAME**: Zeigt auf cname.vercel-dns.com (empfohlen, wenn Root-Domain CNAME unterstützt)
- IONOS unterstützt möglicherweise kein CNAME für Root-Domain - dann A-Record verwenden

### Kontakt

Bei Problemen konsultieren Sie:
- [Vercel DNS-Dokumentation](https://vercel.com/docs/concepts/projects/domains/add-a-domain)
- [IONOS Support](https://www.ionos.de/hilfe/)

## Checkliste

- [ ] Projekt bei Vercel registriert
- [ ] Domain bei Vercel hinzugefügt
- [ ] DNS-Einträge bei IONOS konfiguriert
- [ ] DNS-Propagationszeit abgewartet (1-48 Stunden)
- [ ] Domain-Verifizierung bei Vercel erfolgreich
- [ ] HTTPS/SSL-Zertifikat automatisch aktiviert

---

**Hinweis**: Diese Anleitung basiert auf den Standard-Vercel DNS-Konfigurationen. Die exakten Werte werden von Vercel nach dem Hinzufügen der Domain angezeigt. Verwenden Sie immer die von Vercel bereitgestellten Werte.
