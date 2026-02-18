/**
 * Kontakt-Helper Funktionen
 * Zentrale Funktionen für Telefonnummern und Kontaktdaten
 */

import { BUSINESS } from "./business";

/**
 * Gibt die Haupttelefonnummer im E.164 Format zurück (für tel:-Links)
 */
export function getPhoneHref(): string {
  return BUSINESS.phone;
}

/**
 * Gibt die Haupttelefonnummer im lesbaren Format zurück (für Anzeige)
 */
export function getPhoneDisplay(): string {
  return BUSINESS.phoneDisplay || BUSINESS.phone;
}

/**
 * Gibt die Hotline-Telefonnummer im E.164 Format zurück (für tel:-Links)
 */
export function getHotlineHref(): string {
  return BUSINESS.hotlinePhone || BUSINESS.phone;
}

/**
 * Gibt die Hotline-Telefonnummer im lesbaren Format zurück (für Anzeige)
 */
export function getHotlineDisplay(): string {
  return BUSINESS.hotlinePhoneDisplay || BUSINESS.hotlinePhone || BUSINESS.phoneDisplay || BUSINESS.phone;
}

/**
 * Gibt die E-Mail-Adresse zurück
 */
export function getEmail(): string {
  return BUSINESS.email || "info@handwerkmuenchen.de";
}

/**
 * Gibt die vollständige Adresse als String zurück
 */
export function getAddressDisplay(): string {
  if (!BUSINESS.address) return "Musterstraße 1, DE-80331 München";
  return `${BUSINESS.address.street}, DE-${BUSINESS.address.zip} ${BUSINESS.address.city}`;
}
