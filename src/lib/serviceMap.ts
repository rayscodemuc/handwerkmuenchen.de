/**
 * Zentrale Service-Maps für automatische Schema.org Service JSON-LD Generierung
 * Jeder Pfad wird einem Service-Typ zugeordnet
 */

export const REINIGUNG_SERVICE_MAP: Record<string, string> = {
  "/reinigung": "Gebäudereinigung",
  "/leistungen/reinigung-facility/reinigung": "Reinigung",
};

export const FACILITY_SERVICE_MAP: Record<string, string> = {
  "/leistungen/reinigung-facility/facility": "Facility",
};

export const AUSSENANLAGEN_SERVICE_MAP: Record<string, string> = {
  "/aussenanlagen": "Außenanlagenpflege",
  "/leistungen/reinigung-facility/facility": "Facility",
};

export const LEISTUNGEN_TECHNIK_SERVICE_MAP: Record<string, string> = {
  "/leistungen/elektrotechnik": "Elektrotechnik",
  "/leistungen/sanitaer-heizung": "Sanitär & Heizung",
};
