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
  "/facility-management": "Facility Management",
  "/facility-management/hausmeisterservice": "Hausmeisterservice",
  "/facility-management/objektmanagement": "Objektmanagement",
  "/facility-management/winterdienst": "Winterdienst",
};

export const AUSSENANLAGEN_SERVICE_MAP: Record<string, string> = {
  "/aussenanlagen": "Außenanlagenpflege",
  "/aussenanlagen/gruenpflege": "Grünpflege",
  "/aussenanlagen/baumpflege": "Baumpflege",
  "/aussenanlagen/winterdienst-aussen": "Winterdienst (Außenanlagen)",
};

export const HANDWERK_SERVICE_MAP: Record<string, string> = {
  "/handwerk": "Handwerk & Technik",
  "/handwerk/elektrotechnik": "Elektrotechnik",
  "/handwerk/elektrotechnik/e-mobility": "E-Mobility Installation",
  "/handwerk/elektrotechnik/hauselektrik": "Hauselektrik",
  "/handwerk/elektrotechnik/klingelanlagen": "Klingelanlagen",
  "/handwerk/elektrotechnik/led": "LED & Beleuchtung",
  "/handwerk/elektrotechnik/messsysteme": "Messsysteme",
  "/handwerk/elektrotechnik/neubau": "Elektroinstallation Neubau",
  "/handwerk/elektrotechnik/reparaturen": "Elektro-Reparaturen",
  "/handwerk/elektrotechnik/sanierung": "Elektrosanierung",
  "/handwerk/elektrotechnik/sicherheitstechnik": "Sicherheitstechnik",
  "/handwerk/elektrotechnik/smart-home": "Smart Home",
  "/handwerk/sanitaer-heizung": "Sanitär & Heizung",
  "/handwerk/service-wartung": "Service & Wartung",
};
