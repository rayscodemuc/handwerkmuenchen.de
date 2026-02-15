/**
 * Preisberechnung für Glasreinigung
 * Wiederverwendbar für Hauptpfad und Add-ons
 */

const preisfaktoren = {
  glas: {
    // Preis basierend auf Fläche:
    // Größer als 500m²: 2,50€/m²
    // Unter 500m²: 3,50€/m²
    preis_klein: 3.50, // Unter 500m²
    preis_gross: 2.50, // Größer als 500m²
    grenze: 500, // Grenze in m²
  },
};

export interface GlassCleaningParams {
  area_sqm: number;
  isMonthly: boolean;
  frequency?: "monthly" | "quarterly" | "halfyearly" | "yearly" | null; // Optional: spezifische Frequenz für Glasreinigung
}

/**
 * Berechnet den Preis für Glasreinigung
 * @param params - Parameter für die Berechnung
 * @returns Preis in Euro (Netto) - monatlicher Preis bei Unterhaltsreinigung, Einzelpreis bei Einmalauftrag
 */
export function calculateGlassCleaningPrice(params: GlassCleaningParams): number {
  const { area_sqm, isMonthly, frequency } = params;
  const faktoren = preisfaktoren.glas;
  
  // Preis pro m² basierend auf Fläche
  const preis_pro_qm = area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
  
  if (isMonthly) {
    // Unterhaltsreinigung: Preis pro Reinigung
    // Bei spezifischer Frequenz: Preis pro Reinigung durch Anzahl Monate zwischen Reinigungen
    if (frequency === "monthly") {
      // 1x im Monat: Preis/m² pro Monat
      return area_sqm * preis_pro_qm;
    } else if (frequency === "quarterly") {
      // 1x im Quartal (alle 3 Monate): Preis/m² / 3 pro Monat
      return (area_sqm * preis_pro_qm) / 3;
    } else if (frequency === "halfyearly") {
      // 1x im Halbjahr (alle 6 Monate): Preis/m² / 6 pro Monat
      return (area_sqm * preis_pro_qm) / 6;
    } else if (frequency === "yearly") {
      // 1x im Jahr (alle 12 Monate): Preis/m² / 12 pro Monat
      return (area_sqm * preis_pro_qm) / 12;
    } else {
      // Standard: Preis/m² (wird als monatlich interpretiert)
      return area_sqm * preis_pro_qm;
    }
  } else {
    // Einmalauftrag: Preis/m²
    return area_sqm * preis_pro_qm;
  }
}
