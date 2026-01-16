/**
 * Preisberechnung für Grundreinigung
 * Wiederverwendbar für Hauptpfad und Add-ons
 */

const preisfaktoren = {
  grund: {
    // Einmalauftrag: 7,50€/m²
    einmal_qm: 7.50,
    // Unterhaltsreinigung: 7,50€/m² pro Reinigung
    abo_qm: 7.50,
  },
};

export interface DeepCleaningParams {
  area_sqm: number;
  frequency?: "monthly" | "quarterly" | "halfyearly" | "yearly" | null; // Optional: spezifische Frequenz für Grundreinigung
}

/**
 * Berechnet den Preis für Grundreinigung
 * @param params - Parameter für die Berechnung
 * @param isMonthly - true wenn Unterhaltsreinigung, false wenn Einmalauftrag
 * @returns Preis in Euro (Netto) - monatlicher Preis bei Unterhaltsreinigung, Einzelpreis bei Einmalauftrag
 */
export function calculateDeepCleaningPrice(params: DeepCleaningParams, isMonthly: boolean = false): number {
  const { area_sqm, frequency } = params;
  
  // Bei Einmalauftrag: Preis pro Reinigung (unabhängig von Frequenz)
  if (!isMonthly) {
    return area_sqm * preisfaktoren.grund.einmal_qm;
  }
  
  // Bei Unterhaltsreinigung mit Frequenz: monatlicher Preis
  if (frequency) {
    // Unterhaltsreinigung: 7,50€/m² pro Reinigung
    // Bei spezifischer Frequenz: Preis pro Reinigung durch Anzahl Monate zwischen Reinigungen
    if (frequency === "monthly") {
      // 1x im Monat: 7,50€/m² pro Monat
      return area_sqm * preisfaktoren.grund.abo_qm;
    } else if (frequency === "quarterly") {
      // 1x im Quartal (alle 3 Monate): 7,50€/m² / 3 pro Monat
      return (area_sqm * preisfaktoren.grund.abo_qm) / 3;
    } else if (frequency === "halfyearly") {
      // 1x im Halbjahr (alle 6 Monate): 7,50€/m² / 6 pro Monat
      return (area_sqm * preisfaktoren.grund.abo_qm) / 6;
    } else if (frequency === "yearly") {
      // 1x im Jahr (alle 12 Monate): 7,50€/m² / 12 pro Monat
      return (area_sqm * preisfaktoren.grund.abo_qm) / 12;
    }
  }
  
  // Fallback: Einmalauftrag
  return area_sqm * preisfaktoren.grund.einmal_qm;
}
