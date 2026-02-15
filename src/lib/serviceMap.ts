/**
 * Zentrale Service-Maps für automatische Schema.org Service JSON-LD Generierung
 * Jeder Pfad wird einem Service-Typ zugeordnet
 */

export const REINIGUNG_SERVICE_MAP: Record<string, string> = {
  "/reinigung": "Gebäudereinigung",
  "/reinigung/unterhaltsreinigung": "Unterhaltsreinigung",
  "/reinigung/grundreinigung": "Grundreinigung",
  "/reinigung/fensterreinigung": "Fensterreinigung",
  "/reinigung/glas-fassade": "Glas- & Fassadenreinigung",
  "/reinigung/sonderreinigung": "Sonderreinigung",
  "/reinigung/grauflaechenreinigung": "Grauflächenreinigung",
  "/reinigung/tiefgaragenreinigung": "Tiefgaragenreinigung",
  "/reinigung/bueroreinigung": "Büroreinigung",
};

export const FACILITY_SERVICE_MAP: Record<string, string> = {
  "/leistungen/facility": "Facility",
  "/leistungen/hausmeisterservice": "Hausmeisterservice",
  "/leistungen/objektmanagement": "Objektmanagement",
  "/leistungen/winterdienst": "Winterdienst",
};

export const AUSSENANLAGEN_SERVICE_MAP: Record<string, string> = {
  "/aussenanlagen": "Außenanlagenpflege",
  "/aussenanlagen/gruenpflege": "Grünpflege",
  "/aussenanlagen/baumpflege": "Baumpflege",
  "/aussenanlagen/winterdienst-aussen": "Winterdienst (Außenanlagen)",
};

export const LEISTUNGEN_TECHNIK_SERVICE_MAP: Record<string, string> = {
  "/leistungen/elektrotechnik": "Elektrotechnik",
  "/leistungen/elektrotechnik/e-mobility": "E-Mobility Installation",
  "/leistungen/elektrotechnik/hauselektrik": "Hauselektrik",
  "/leistungen/elektrotechnik/klingelanlagen": "Klingelanlagen",
  "/leistungen/elektrotechnik/led": "LED & Beleuchtung",
  "/leistungen/elektrotechnik/messsysteme": "Messsysteme",
  "/leistungen/elektrotechnik/neubau": "Elektroinstallation Neubau",
  "/leistungen/elektrotechnik/reparaturen": "Elektro-Reparaturen",
  "/leistungen/elektrotechnik/sanierung": "Elektrosanierung",
  "/leistungen/elektrotechnik/sicherheitstechnik": "Sicherheitstechnik",
  "/leistungen/elektrotechnik/smart-home": "Smart Home",
  "/leistungen/sanitaer-heizung": "Sanitär & Heizung",
  "/leistungen/service-wartung": "Service & Wartung",
};
