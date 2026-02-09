"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Car,
  Wrench,
  Snowflake,
  ChevronRight,
  ChevronLeft,
  Check,
  Calculator,
  Send,
  CalendarCheck,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormSubmit, type CalculatorFormFields } from "@/hooks/useFormSubmit";
import { calculateGlassCleaningPrice, type GlassCleaningParams } from "@/lib/pricing/glass";
import { calculateDeepCleaningPrice, type DeepCleaningParams } from "@/lib/pricing/deep";

const FORM_ID = "service_calculator";

type ServiceType = "reinigung" | "tiefgarage" | "hausmeister" | "winterdienst" | null;
type ReinigungType = "buero" | "glas" | "grund" | "tiefgarage_nass" | "baureinigung" | null;
type ObjektType = "mfh" | "gewerbe" | "privat" | null;
type AuftragsartType = "einmalig" | "regelmässig" | null;
type GlassFrequencyType = "monthly" | "quarterly" | "halfyearly" | "yearly" | null;
type DeepCleaningFrequencyType = "monthly" | "quarterly" | "halfyearly" | "yearly" | null;

interface CalculatorState {
  service_type: ServiceType;
  service_subtype: ReinigungType;
  object_type: ObjektType;
  order_type: AuftragsartType;
  parking_spaces: number;
  area_sqm: number;
  frequency_per_week: number;
  glass_frequency: GlassFrequencyType; // Frequenz für Glasreinigung (1x Monat/Quartal/Halbjahr/Jahr)
  glass_abo_model: boolean; // Abo-Modell für Glasreinigung (monatliche Rechnung statt einmalige Rechnung)
  deep_frequency: DeepCleaningFrequencyType; // Frequenz für Grundreinigung (1x Monat/Quartal/Halbjahr/Jahr)
  // Winterdienst spezifische Felder
  machine_area_sqm: number; // Maschinelle Räumung
  manual_area_sqm: number; // Manuelle Räumung
  has_liability_coverage: boolean; // Haftungsübernahme
  has_streugut: boolean; // Streugut
  has_express: boolean; // Express-Zuschlag
  // Büroreinigung Add-ons
  has_glass_addon: boolean; // Glasreinigung Add-on
  has_deep_addon: boolean; // Grundreinigung Add-on
  has_mopp_addon: boolean; // Moppservice Add-on
  glass_addon_area_sqm: number; // Glasfläche für Add-on
  deep_addon_area_sqm: number; // Fläche für Grundreinigung Add-on
  glass_addon_frequency: GlassFrequencyType; // Frequenz für Glasreinigung Add-on
  deep_addon_frequency: DeepCleaningFrequencyType; // Frequenz für Grundreinigung Add-on
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city: string;
  additional_message: string;
}

const initialState: CalculatorState = {
  service_type: null,
  service_subtype: null,
  object_type: null,
  order_type: null,
  parking_spaces: 50,
  area_sqm: 500,
  frequency_per_week: 3,
  glass_frequency: null,
  glass_abo_model: false,
  deep_frequency: null,
  // Winterdienst spezifische Felder
  machine_area_sqm: 0,
  manual_area_sqm: 0,
  has_liability_coverage: false,
  has_streugut: false,
  has_express: false,
  // Büroreinigung Add-ons
  has_glass_addon: false,
  has_deep_addon: false,
  has_mopp_addon: false,
  glass_addon_area_sqm: 0,
  deep_addon_area_sqm: 0,
  glass_addon_frequency: null,
  deep_addon_frequency: null,
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  city: "",
  additional_message: "",
};

// Preisfaktoren (Netto-Werte, marktgerechte Kalkulation)
const preisfaktoren = {
  reinigung: {
    buero: {
      // Unterhaltsreinigung: 33,50€/Std, 1 Std pro 200m²
      stundensatz: 33.50,
      flaeche_pro_stunde: 200,
      // Einmalauftrag: 4,50€/m²
      einmal_qm: 4.50,
    },
    glas: {
      // Abo: 4,90€/m², Einmal: 5,50€/m²
      abo_qm: 4.90,
      einmal_qm: 5.50,
    },
    grund: {
      // Nur Einmalauftrag: 7,50€/m²
      einmal_qm: 7.50,
    },
    tiefgarage_nass: {  
      // Nur Einmalauftrag: 12,50€/m²
      einmal_qm: 12.50,
    },
    baureinigung: {
      // Nur Einmalauftrag: 5,50€/m²
      einmal_qm: 5.50,
    },
  },
  tiefgarage: {
    // Berechnung: Stellplätze * 9m² (inkl. Fahrspur) * 12,50€/m²
    qm_pro_stellplatz: 9,
    preis_pro_qm: 12.50,
  },
  hausmeister: {
    mfh: 180,
    gewerbe: 280,
    privat: 120,
  },
  winterdienst: 0.35, // pro m²
  mindestauftragswert: 150, // Minimum für Unterhaltsreinigung
  mindestauftragswert_einmalig: 500, // Minimum für Einmalaufträge
};

export default function Rechner() {
  const { submitForm } = useFormSubmit();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Scroll-Funktion zum Zentrieren des Viewports (Mobile-optimiert)
  const scrollToCenter = () => {
    setTimeout(() => {
      if (stepsContainerRef.current) {
        // Auf Mobile: zum Start scrollen, auf Desktop: zentrieren
        const isMobile = window.innerWidth < 768;
        stepsContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: isMobile ? "start" : "center",
          inline: "nearest",
        });
        // Zusätzlicher Offset für Mobile, um Header zu berücksichtigen
        if (isMobile) {
          setTimeout(() => {
            window.scrollBy({
              top: -20,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    }, 150);
  };

  const updateStateAndAdvance = (updates: Partial<CalculatorState>, shouldAdvance = false) => {
    setState((prev) => ({ ...prev, ...updates }));
    if (shouldAdvance) {
      setTimeout(() => setStep((s) => s + 1), 300);
      scrollToCenter();
    }
  };

  // Beim Öffnen der Seite ganz an den Start scrollen (z. B. von Hero „Richtpreis“ oder Reinigung/Facility)
  useEffect(() => {
    const scrollToStart = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToStart();
    const t = setTimeout(scrollToStart, 100);
    const t2 = setTimeout(scrollToStart, 300);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  // Scroll beim Step-Wechsel
  useEffect(() => {
    scrollToCenter();
  }, [step]);

  // Auto-advance für Step 1: Service auswählen
  const selectService = (service: ServiceType) => {
    updateStateAndAdvance({ 
      service_type: service, 
      order_type: null, 
      service_subtype: null, 
      object_type: null,
      // Winterdienst Felder zurücksetzen
      machine_area_sqm: 0,
      manual_area_sqm: 0,
      has_liability_coverage: false,
      has_streugut: false,
      has_express: false,
      // Büroreinigung Add-ons zurücksetzen
      has_glass_addon: false,
      has_deep_addon: false,
      has_mopp_addon: false,
      glass_addon_area_sqm: 0,
      deep_addon_area_sqm: 0,
      glass_addon_frequency: null,
      deep_addon_frequency: null,
      // Glasreinigung und Grundreinigung Frequenz zurücksetzen
      glass_frequency: null,
      glass_abo_model: false,
      deep_frequency: null,
    }, true);
  };

  // Auto-advance für Step 2: Auftragsart (bei Reinigung/Tiefgarage)
  const selectAuftragsart = (auftragsart: AuftragsartType) => {
    scrollToCenter();
      // Wenn nicht mehr Büroreinigung, Add-ons zurücksetzen
      const resetAddons = state.service_subtype !== "buero" ? {
        has_glass_addon: false,
        has_deep_addon: false,
        has_mopp_addon: false,
        glass_addon_area_sqm: 0,
        deep_addon_area_sqm: 0,
        glass_addon_frequency: null,
        deep_addon_frequency: null,
      } : {};
      // Wenn nicht mehr Glasreinigung, Frequenz und Abo-Modell zurücksetzen
      const resetGlassFreq = state.service_subtype !== "glas" ? {
        glass_frequency: null,
        glass_abo_model: false,
      } : {};
      // Wenn nicht mehr Grundreinigung, Frequenz zurücksetzen
      const resetDeepFreq = state.service_subtype !== "grund" ? {
        deep_frequency: null,
      } : {};
      updateStateAndAdvance({ order_type: auftragsart, ...resetAddons, ...resetGlassFreq, ...resetDeepFreq }, true);
  };

  // Auto-advance für Hausmeister Objektart
  const selectObjektart = (objektType: ObjektType) => {
    updateStateAndAdvance({ object_type: objektType }, true);
  };

  const calculatePrice = (): { price: number; isMonthly: boolean; belowMinimum: boolean; originalPrice?: number; discount?: number } => {
    let price = 0;
    const isMonthly = state.order_type === "regelmässig";

    switch (state.service_type) {
      case "reinigung":
        if (state.service_subtype) {
          const subtype = state.service_subtype;
          
          if (subtype === "buero") {
            const faktoren = preisfaktoren.reinigung.buero;
            if (isMonthly) {
              // Monatspreis: ((Fläche / 200) * Frequenz pro Woche) * 33,50€ * 4,33 Wochen
              // Beispiel: 500m², 3x/Woche = (500/200) * 3 = 7,5 Std/Woche
              // 7,5 * 33,50 * 4,33 = 1.087,91€
              const stundenProReinigung = state.area_sqm / faktoren.flaeche_pro_stunde;
              const wochenstunden = stundenProReinigung * state.frequency_per_week;
              price = wochenstunden * faktoren.stundensatz * 4.33;
            } else {
              // Einmalauftrag: Fläche * 4,50€/m²
              price = state.area_sqm * faktoren.einmal_qm;
            }
            
            // Add-ons für Büroreinigung hinzufügen
            if (state.has_glass_addon && state.glass_addon_area_sqm > 0) {
              // Bei Büroreinigung-Add-on verwenden wir die spezifische Add-on-Frequenz, falls vorhanden
              price += calculateGlassCleaningPrice({
                area_sqm: state.glass_addon_area_sqm,
                isMonthly,
                frequency: state.glass_addon_frequency || undefined,
              });
            }
            
            if (state.has_deep_addon && state.deep_addon_area_sqm > 0) {
              // Grundreinigung-Add-on: verwendet die spezifische Add-on-Frequenz, falls vorhanden
              price += calculateDeepCleaningPrice({
                area_sqm: state.deep_addon_area_sqm,
                frequency: state.deep_addon_frequency || undefined,
              }, isMonthly);
            }
            
            // Moppservice: Preis aktuell 0 (TODO: Preise integrieren wenn verfügbar)
            // if (state.has_mopp_addon) {
            //   price += calculateMoppServicePrice({ ... });
            // }
          } else if (subtype === "glas") {
            // Verwende wiederverwendbare Funktion
            let basePrice = calculateGlassCleaningPrice({
              area_sqm: state.area_sqm,
              isMonthly,
              frequency: state.glass_frequency || undefined,
            });
            
            // Bei Abo-Modell für Quartal/Halbjahr/Jahr: Jahrespreis / 12 Monate × 0,9
            if (isMonthly && state.glass_abo_model && 
                (state.glass_frequency === "quarterly" || state.glass_frequency === "halfyearly" || state.glass_frequency === "yearly")) {
              const faktoren = {
                preis_klein: 3.50,
                preis_gross: 2.50,
                grenze: 500,
              };
              const preis_pro_qm = state.area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
              const preisProReinigung = state.area_sqm * preis_pro_qm;
              
              let anzahlReinigungenProJahr = 0;
              if (state.glass_frequency === "quarterly") {
                anzahlReinigungenProJahr = 4; // 4x pro Jahr
              } else if (state.glass_frequency === "halfyearly") {
                anzahlReinigungenProJahr = 2; // 2x pro Jahr
              } else if (state.glass_frequency === "yearly") {
                anzahlReinigungenProJahr = 1; // 1x pro Jahr
              }
              
              const jahrespreis = preisProReinigung * anzahlReinigungenProJahr;
              const monatlicherPreisOhneRabatt = jahrespreis / 12;
              price = monatlicherPreisOhneRabatt * 0.9; // 10% Rabatt
            } else {
              price = basePrice;
            }
            
            // 10% Rabatt bei Glasreinigung → Unterhaltsreinigung → Monatlich (nur Hauptpfad)
            if (isMonthly && state.glass_frequency === "monthly") {
              // Rabatt wird in der Anzeige behandelt, hier nur Preis berechnen
            }
          } else if (subtype === "grund") {
            // Verwende wiederverwendbare Funktion
            // Grundreinigung mit optionaler Frequenz (auch bei Einmalauftrag)
            // Bei Einmalauftrag: Preis pro Reinigung (unabhängig von Frequenz)
            price = calculateDeepCleaningPrice({
              area_sqm: state.area_sqm,
              frequency: state.deep_frequency || undefined,
            }, isMonthly);
          } else if (subtype === "tiefgarage_nass") {
            // Tiefgaragenreinigung Nassreinigung nur Einmal: 12,50€/m²
            price = state.area_sqm * preisfaktoren.reinigung.tiefgarage_nass.einmal_qm;
          } else if (subtype === "baureinigung") {
            // Baureinigung nur Einmal: 5,50€/m²
            price = state.area_sqm * preisfaktoren.reinigung.baureinigung.einmal_qm;
          }
        }
        break;
      case "tiefgarage": {
        // Berechnung: Stellplätze * 9m² pro Stellplatz (inkl. Fahrspur) * 12,50€/m²
        const flaeche = state.parking_spaces * preisfaktoren.tiefgarage.qm_pro_stellplatz;
        price = flaeche * preisfaktoren.tiefgarage.preis_pro_qm;
        break;
      }
      case "hausmeister":
        if (state.object_type) {
          price = preisfaktoren.hausmeister[state.object_type] * 4.33;
        }
        break;
      case "winterdienst": {
        // 1. Flächenberechnung für maschinelle Räumung mit gestaffelten Preisen
        let maschinelleRaeumung = 0;
        
        if (state.machine_area_sqm < 500) {
          // Mindestpauschale von 150€ pro Einsatz
          maschinelleRaeumung = 150;
        } else if (state.machine_area_sqm >= 500 && state.machine_area_sqm <= 2000) {
          // 1,85€/m² (Mittelwert)
          maschinelleRaeumung = state.machine_area_sqm * 1.85;
        } else {
          // > 2000 m²: 1,00€/m²
          maschinelleRaeumung = state.machine_area_sqm * 1.00;
        }
        
        // 2. Manuelle Räumung (Ecken/Türen): ca. 5,00€/m²
        const manuelleRaeumung = state.manual_area_sqm * 5.00;
        
        // 3. Monatliche Bereitschaftspauschale: 450€
        let bereitschaftspauschale = 450;
        
        // 4. Express-Zuschlag: +15% auf Bereitschaftspauschale
        if (state.has_express) {
          bereitschaftspauschale = bereitschaftspauschale * 1.15;
        }
        
        // 5. Haftungsübernahme: +20% auf Bereitschaftspauschale
        if (state.has_liability_coverage) {
          bereitschaftspauschale = bereitschaftspauschale * 1.20;
        }
        
        // 6. Streugut: 0,30€/m² (auf gesamte Fläche)
        const totalArea = state.machine_area_sqm + state.manual_area_sqm;
        const streugut = state.has_streugut ? totalArea * 0.30 : 0;
        
        // Gesamtpreis (monatlich)
        price = maschinelleRaeumung + manuelleRaeumung + bereitschaftspauschale + streugut;
        break;
      }
    }

    const roundedPrice = Math.round(price);
    
    // 10% Rabatt bei Glasreinigung → Unterhaltsreinigung (nur Hauptpfad):
    // - Monatlich: immer 10% Rabatt
    // - Quartal/Halbjahr/Jahr mit Abo-Modell: 10% Rabatt (bereits in price berechnet)
    let finalPrice = roundedPrice;
    let originalPrice: number | undefined = undefined;
    let discount: number | undefined = undefined;
    
    if (state.service_type === "reinigung" && state.service_subtype === "glas" && isMonthly) {
      if (state.glass_frequency === "monthly") {
        // Monatlich: immer 10% Rabatt
        originalPrice = roundedPrice;
        discount = 10;
        finalPrice = Math.round(roundedPrice * 0.9);
      } else if ((state.glass_frequency === "quarterly" || state.glass_frequency === "halfyearly" || state.glass_frequency === "yearly") && state.glass_abo_model) {
        // Quartal/Halbjahr/Jahr mit Abo-Modell: Originalpreis ist monatlicher Preis ohne Rabatt
        const faktoren = {
          preis_klein: 3.50,
          preis_gross: 2.50,
          grenze: 500,
        };
        const preis_pro_qm = state.area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
        const preisProReinigung = state.area_sqm * preis_pro_qm;
        
        let anzahlReinigungenProJahr = 0;
        if (state.glass_frequency === "quarterly") {
          anzahlReinigungenProJahr = 4;
        } else if (state.glass_frequency === "halfyearly") {
          anzahlReinigungenProJahr = 2;
        } else if (state.glass_frequency === "yearly") {
          anzahlReinigungenProJahr = 1;
        }
        
        const jahrespreis = preisProReinigung * anzahlReinigungenProJahr;
        originalPrice = Math.round(jahrespreis / 12); // Monatlicher Preis ohne Rabatt
        discount = 10;
        finalPrice = roundedPrice; // Bereits mit Rabatt berechnet
      }
    }
    
    // Mindestauftragswert: 500€ für Einmalaufträge, 150€ für Unterhaltsreinigung
    const mindestwert = isMonthly ? preisfaktoren.mindestauftragswert : preisfaktoren.mindestauftragswert_einmalig;
    const belowMinimum = finalPrice < mindestwert && finalPrice > 0;
    
    return { 
      price: finalPrice, 
      isMonthly, 
      belowMinimum,
      originalPrice,
      discount
    };
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return state.service_type !== null;
      case 2:
        if (state.service_type === "reinigung") {
          // Bei Glasreinigung muss zusätzlich die Frequenz gewählt sein, wenn Unterhaltsreinigung
          // Aber: Frequenz kann auch null sein (wird in Step 3 gewählt)
          if (state.service_subtype === "glas" && state.order_type === "regelmässig") {
            // Frequenz wird in Step 3 gewählt, daher hier nicht prüfen
            return state.service_subtype !== null && state.order_type !== null;
          }
          return state.service_subtype !== null && state.order_type !== null;
        }
        if (state.service_type === "tiefgarage") {
          // Tiefgarage ist immer Einmalauftrag, muss nur ausgewählt sein
          return state.order_type === "einmalig";
        }
        if (state.service_type === "hausmeister") return state.object_type !== null;
        return true;
      case 3:
        // Bei Glasreinigung + Unterhaltsreinigung muss Frequenz gewählt sein
        if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig") {
          return state.glass_frequency !== null;
        }
        // Bei Grundreinigung + Einmalauftrag muss Frequenz gewählt sein
        if (state.service_type === "reinigung" && state.service_subtype === "grund" && state.order_type === "einmalig") {
          return state.deep_frequency !== null;
        }
        // Bei Büroreinigung + Unterhaltsreinigung: Wenn Add-ons aktiviert sind, müssen deren Frequenzen gewählt sein
        if (state.service_type === "reinigung" && state.service_subtype === "buero" && state.order_type === "regelmässig") {
          if (state.has_glass_addon && state.glass_addon_area_sqm > 0 && !state.glass_addon_frequency) {
            return false;
          }
          if (state.has_deep_addon && state.deep_addon_area_sqm > 0 && !state.deep_addon_frequency) {
            return false;
          }
        }
        return true;
      case 4:
        return true;
      case 5:
        return (
          state.customer_name.trim() !== "" &&
          state.customer_email.trim() !== "" &&
          state.customer_phone.trim() !== ""
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const { price, isMonthly } = calculatePrice();
    
    const formData: CalculatorFormFields = {
      customer_name: state.customer_name,
      customer_email: state.customer_email,
      customer_phone: state.customer_phone,
      city: state.city,
      service_type: state.service_type || "",
      service_subtype: state.service_subtype || undefined,
      object_type: state.object_type || undefined,
      order_type: state.order_type || undefined,
      area_sqm: state.area_sqm,
      parking_spaces: state.parking_spaces,
      frequency_per_week: state.frequency_per_week,
      estimated_price: price,
      is_monthly_price: isMonthly,
      additional_message: state.additional_message || undefined,
    };

    await submitForm(FORM_ID, formData, {
      successTitle: "Anfrage erfolgreich gesendet",
      successDescription: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const serviceOptions = [
    { id: "reinigung", label: "Gebäudereinigung", icon: Building2, desc: "Büro, Glas, Grundreinigung" },
    { id: "tiefgarage", label: "Tiefgaragenreinigung", icon: Car, desc: "Parkhaus & Tiefgarage" },
    { id: "hausmeister", label: "Hausmeisterservice", icon: Wrench, desc: "MFH, Gewerbe, Privat" },
    { id: "winterdienst", label: "Winterdienst", icon: Snowflake, desc: "Räum- und Streudienst" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-6 sm:py-12 lg:py-20">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
              Kostenlos & Unverbindlich
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Richtpreis berechnen
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              In 5 Schritten zum Richtpreis für Reinigung & Facility – Einmalauftrag oder Unterhalt. Orientierung, kein verbindliches Angebot.
            </p>
            <div className="mt-4 mx-auto max-w-2xl rounded-xl bg-amber-50 border border-amber-200 p-4 text-left">
              <p className="text-sm text-foreground">
                <strong>Hinweis:</strong> Der Richtpreisrechner gilt für Reinigungs- und Facility-Leistungen (einmalig oder wiederkehrend). Für Elektrotechnik, Sanitär & Heizung oder Innenausbau erstellen wir ein Angebot nach kurzem Check oder Vor-Ort-Termin.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-12 px-2">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors",
                      step > s
                        ? "bg-primary text-primary-foreground"
                        : step === s
                        ? "bg-primary text-primary-foreground ring-2 sm:ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : s}
                  </div>
                  {s < 5 && (
                    <div
                      className={cn(
                        "h-1 w-6 sm:w-12 md:w-20 lg:w-28",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] sm:text-xs md:text-sm text-muted-foreground px-1">
              <span className="hidden xs:inline">Leistung</span>
              <span className="hidden sm:inline">Details</span>
              <span className="hidden md:inline">Parameter</span>
              <span>Preis</span>
              <span className="hidden sm:inline">Kontakt</span>
            </div>
          </div>

          {/* Steps Container */}
          <div ref={stepsContainerRef} className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Vielen Dank für Ihre Anfrage!
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Wir haben Ihre Richtpreis-Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                  <Button asChild>
                    <Link href="/">Zurück zur Startseite</Link>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-xl">
                    <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
                      {/* Step 1: Leistung wählen */}
                      {step === 1 && (
                        <div>
                          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                            Welche Leistung benötigen Sie?
                          </h2>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {serviceOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => selectService(option.id as ServiceType)}
                                className={cn(
                                  "p-4 sm:p-6 rounded-xl border-2 text-left transition-all hover:border-primary/50 active:scale-95",
                                  state.service_type === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border"
                                )}
                              >
                                <option.icon className="h-8 w-8 text-primary mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
                                <p className="text-sm text-muted-foreground">{option.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Details */}
                      {step === 2 && (
                        <div>
                          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                            {state.service_type === "reinigung" && "Welche Art der Reinigung?"}
                            {state.service_type === "tiefgarage" && "Wie viele Stellplätze?"}
                            {state.service_type === "hausmeister" && "Welche Art von Objekt?"}
                            {state.service_type === "winterdienst" && "Fläche angeben"}
                          </h2>

                          {state.service_type === "reinigung" && (
                            <div className="space-y-6">
                              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                  { id: "buero", label: "Büroreinigung", desc: "Unterhalts- oder Einmalreinigung" },
                                  { id: "glas", label: "Glasreinigung", desc: "Fenster & Glasflächen inkl. Rahmen" },
                                  { id: "grund", label: "Grundreinigung", desc: "Intensive Tiefenreinigung" },
                                  { id: "tiefgarage_nass", label: "Tiefgaragenreinigung", desc: "Nassreinigung (einmalig)" },
                                  { id: "baureinigung", label: "Baureinigung", desc: "Grob- & Feinreinigung (einmalig)" },
                                ].map((type) => {
                                  const isSelected = state.service_subtype === type.id;
                                  const hasSelection = state.service_subtype !== null;
                                  const isDisabled = hasSelection && !isSelected;
                                  
                                  return (
                                    <button
                                      key={type.id}
                                      onClick={() => {
                                        // Toggle-Verhalten: Wenn bereits ausgewählt, Auswahl aufheben
                                        if (isSelected) {
                                          updateState({ 
                                            service_subtype: null,
                                            // Alle abhängigen States zurücksetzen
                                            has_glass_addon: false,
                                            has_deep_addon: false,
                                            has_mopp_addon: false,
                                            glass_addon_area_sqm: 0,
                                            deep_addon_area_sqm: 0,
                                            glass_addon_frequency: null,
                                            deep_addon_frequency: null,
                                            glass_frequency: null,
                                            glass_abo_model: false,
                                            deep_frequency: null,
                                          });
                                        } else {
                                          const newSubtype = type.id as ReinigungType;
                                      // Wenn nicht Büroreinigung, Add-ons zurücksetzen
                                      const resetAddons = newSubtype !== "buero" ? {
                                        has_glass_addon: false,
                                        has_deep_addon: false,
                                        has_mopp_addon: false,
                                        glass_addon_area_sqm: 0,
                                        deep_addon_area_sqm: 0,
                                        glass_addon_frequency: null,
                                        deep_addon_frequency: null,
                                      } : {};
                                          // Wenn nicht Glasreinigung, Frequenz zurücksetzen
                                          const resetGlassFreq = newSubtype !== "glas" ? {
                                            glass_frequency: null,
                                          } : {};
                                          // Wenn nicht Grundreinigung, Frequenz zurücksetzen
                                          const resetDeepFreq = newSubtype !== "grund" ? {
                                            deep_frequency: null,
                                          } : {};
                                          updateState({ service_subtype: newSubtype, ...resetAddons, ...resetGlassFreq, ...resetDeepFreq });
                                        }
                                      }}
                                      disabled={isDisabled}
                                      className={cn(
                                        "p-5 rounded-xl border-2 text-left transition-all",
                                        isSelected
                                          ? "border-primary bg-primary/5"
                                          : isDisabled
                                          ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                                          : "border-border hover:border-primary/50"
                                      )}
                                    >
                                      <h3 className={cn(
                                        "font-semibold mb-1",
                                        isSelected
                                          ? "text-foreground"
                                          : isDisabled
                                          ? "text-muted-foreground"
                                          : "text-foreground"
                                      )}>{type.label}</h3>
                                      <p className={cn(
                                        "text-sm",
                                        isSelected
                                          ? "text-muted-foreground"
                                          : isDisabled
                                          ? "text-muted-foreground/70"
                                          : "text-muted-foreground"
                                      )}>{type.desc}</p>
                                    </button>
                                  );
                                })}
                              </div>
                              {state.service_subtype && (
                                <p className="text-xs text-muted-foreground text-center">
                                  Durch erneutes Klicken auf die ausgewählte Option können Sie die Auswahl aufheben.
                                </p>
                              )}

                              {state.service_subtype && (
                                <div>
                                  <Label className="text-base mb-3 block">Art des Auftrags</Label>
                                  {/* Tiefgarage Nass, Baureinigung und Grundreinigung nur als Einmalauftrag */}
                                  {(state.service_subtype === "tiefgarage_nass" || state.service_subtype === "baureinigung" || state.service_subtype === "grund") ? (
                                    <div className="bg-muted/50 p-4 rounded-xl">
                                      <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">
                                          {state.service_subtype === "tiefgarage_nass" && "Tiefgaragenreinigung (Nassreinigung)"}
                                          {state.service_subtype === "baureinigung" && "Baureinigung"}
                                          {state.service_subtype === "grund" && "Grundreinigung"}
                                        </span>{" "}
                                        wird ausschließlich als Einmalauftrag angeboten.
                                      </p>
                                      <Button 
                                        className="mt-3" 
                                        onClick={() => selectAuftragsart("einmalig")}
                                        variant={state.order_type === "einmalig" ? "default" : "outline"}
                                      >
                                        <CalendarCheck className="h-4 w-4 mr-2" />
                                        Als Einmalauftrag fortfahren
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                      <button
                                        onClick={() => selectAuftragsart("einmalig")}
                                        className={cn(
                                          "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50 flex items-start gap-4",
                                          state.order_type === "einmalig"
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                        )}
                                      >
                                        <CalendarCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                        <div>
                                          <h3 className="font-semibold text-foreground mb-1">Einmalauftrag</h3>
                                          <p className="text-sm text-muted-foreground">Einmalige Reinigung ohne Vertragsbindung</p>
                                        </div>
                                      </button>
                                      <button
                                        onClick={() => selectAuftragsart("regelmässig")}
                                        className={cn(
                                          "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50 flex items-start gap-4",
                                          state.order_type === "regelmässig"
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                        )}
                                      >
                                        <Repeat className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                                        <div>
                                          <h3 className="font-semibold text-foreground mb-1">Unterhaltsreinigung</h3>
                                          <p className="text-sm text-muted-foreground">Regelmäßige Reinigung nach Vereinbarung</p>
                                        </div>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {state.service_type === "tiefgarage" && (
                            <div className="space-y-6">
                              <div>
                                <Label className="text-base mb-3 block">
                                  Anzahl Stellplätze: <span className="font-bold text-primary">{state.parking_spaces}</span>
                                </Label>
                                <Slider
                                  value={[state.parking_spaces]}
                                  onValueChange={([v]) => updateState({ parking_spaces: v })}
                                  min={10}
                                  max={500}
                                  step={10}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                  <span>10</span>
                                  <span>500</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Kalkulation: {state.parking_spaces} Stellplätze × 9 m² = <span className="font-semibold">{(state.parking_spaces * 9).toLocaleString("de-DE")} m²</span> Reinigungsfläche
                                </p>
                              </div>

                              {/* Hinweis für Großgaragen */}
                              {state.parking_spaces > 50 && (
                                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl">
                                  <p className="text-sm font-medium">
                                    Bei Großgaragen über 50 Stellplätzen ist ein individueller Vor-Ort-Check für ein verbindliches Festpreis-Angebot zwingend erforderlich.
                                  </p>
                                </div>
                              )}

                              {/* Tiefgaragenreinigung nur als Einmalauftrag */}
                              <div className="bg-muted/50 p-4 rounded-xl">
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-semibold text-foreground">Tiefgaragenreinigung (Nassreinigung)</span>{" "}
                                  wird als Einmalauftrag angeboten.
                                </p>
                                <Button 
                                  className="mt-3" 
                                  onClick={() => selectAuftragsart("einmalig")}
                                  variant={state.order_type === "einmalig" ? "default" : "outline"}
                                >
                                  <CalendarCheck className="h-4 w-4 mr-2" />
                                  Als Einmalauftrag fortfahren
                                </Button>
                              </div>
                            </div>
                          )}

                          {state.service_type === "hausmeister" && (
                            <div className="grid sm:grid-cols-3 gap-4">
                              {[
                                { id: "mfh", label: "Mehrfamilienhaus", desc: "Wohnanlage mit mehreren Parteien" },
                                { id: "gewerbe", label: "Gewerbeobjekt", desc: "Büro, Praxis oder Ladenlokal" },
                                { id: "privat", label: "Privathaus", desc: "Einfamilienhaus oder Villa" },
                              ].map((type) => (
                                <button
                                  key={type.id}
                                  onClick={() => selectObjektart(type.id as ObjektType)}
                                  className={cn(
                                    "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                                    state.object_type === type.id
                                      ? "border-primary bg-primary/5"
                                      : "border-border"
                                  )}
                                >
                                  <h3 className="font-semibold text-foreground mb-1">{type.label}</h3>
                                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                                </button>
                              ))}
                            </div>
                          )}

                          {state.service_type === "winterdienst" && (
                            <div className="space-y-6">
                              <div>
                                <Label className="text-base mb-3 block">
                                  Maschinelle Räumung: <span className="font-bold text-primary">{state.machine_area_sqm} m²</span>
                                </Label>
                                <Slider
                                  value={[state.machine_area_sqm]}
                                  onValueChange={([v]) => updateState({ machine_area_sqm: v })}
                                  min={0}
                                  max={10000}
                                  step={50}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                  <span>0 m²</span>
                                  <span>10.000 m²</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Fläche, die maschinell geräumt werden kann
                                </p>
                              </div>
                              
                              <div>
                                <Label className="text-base mb-3 block">
                                  Manuelle Räumung (Ecken/Türen): <span className="font-bold text-primary">{state.manual_area_sqm} m²</span>
                                </Label>
                                <Slider
                                  value={[state.manual_area_sqm]}
                                  onValueChange={([v]) => updateState({ manual_area_sqm: v })}
                                  min={0}
                                  max={500}
                                  step={10}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                  <span>0 m²</span>
                                  <span>500 m²</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Fläche, die manuell geräumt werden muss (ca. 5,00€/m²)
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: Parameter */}
                      {step === 3 && (
                        <div className="space-y-6 sm:space-y-8">
                          <h2 className="text-lg sm:text-xl font-semibold">
                            Weitere Angaben
                          </h2>

                          {(state.service_type === "reinigung" || state.service_type === "hausmeister") && (
                            <div>
                              <Label className="text-base mb-3 block">
                                Fläche: <span className="font-bold text-primary">{state.area_sqm} m²</span>
                              </Label>
                              <Slider
                                value={[state.area_sqm]}
                                onValueChange={([v]) => updateState({ area_sqm: v })}
                                min={50}
                                max={5000}
                                step={50}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>50 m²</span>
                                <span>5.000 m²</span>
                              </div>
                            </div>
                          )}

                              {state.service_type === "reinigung" && state.order_type === "regelmässig" && (
                            <>
                              {state.service_subtype === "glas" ? (
                                // Glasreinigung: spezielle Frequenz-Auswahl
                                <div>
                                  <Label className="text-base mb-3 block">
                                    Reinigungsfrequenz
                                  </Label>
                                  <div className="grid sm:grid-cols-2 gap-3">
                                    {[
                                      { id: "monthly", label: "1x im Monat" },
                                      { id: "quarterly", label: "1x im Quartal" },
                                      { id: "halfyearly", label: "1x im Halbjahr" },
                                      { id: "yearly", label: "1x im Jahr" },
                                    ].map((freq) => {
                                      const isSelected = state.glass_frequency === freq.id;
                                      const hasSelection = state.glass_frequency !== null;
                                      const isDisabled = hasSelection && !isSelected;
                                      
                                      return (
                                        <button
                                          key={freq.id}
                                          onClick={() => {
                                            // Toggle-Verhalten: Wenn bereits ausgewählt, Auswahl aufheben
                                            if (isSelected) {
                                              updateState({ glass_frequency: null });
                                            } else {
                                              updateState({ glass_frequency: freq.id as GlassFrequencyType });
                                            }
                                          }}
                                          disabled={isDisabled}
                                          className={cn(
                                            "p-4 rounded-xl border-2 text-left transition-all",
                                            isSelected
                                              ? "border-primary bg-primary/5"
                                              : isDisabled
                                              ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                                              : "border-border hover:border-primary/50"
                                          )}
                                        >
                                          <span className={cn(
                                            "font-semibold",
                                            isSelected
                                              ? "text-foreground"
                                              : isDisabled
                                              ? "text-muted-foreground"
                                              : "text-foreground"
                                          )}>{freq.label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Durch erneutes Klicken auf die ausgewählte Option können Sie die Auswahl aufheben.
                                  </p>
                                  
                                  {/* Abo-Modell Auswahl für Quartal, Halbjahr, Jahr */}
                                  {(state.glass_frequency === "quarterly" || state.glass_frequency === "halfyearly" || state.glass_frequency === "yearly") && (
                                    <div className="mt-6">
                                      <Label className="text-base mb-3 block">
                                        Rechnungsmodell
                                      </Label>
                                      <div className="grid sm:grid-cols-2 gap-3">
                                        <button
                                          onClick={() => updateState({ glass_abo_model: false })}
                                          className={cn(
                                            "p-4 rounded-xl border-2 text-left transition-all",
                                            !state.glass_abo_model
                                              ? "border-primary bg-primary/5"
                                              : "border-border hover:border-primary/50"
                                          )}
                                        >
                                          <span className="font-semibold text-foreground block mb-1">
                                            Einmalige Rechnung
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            {state.glass_frequency === "quarterly" && "1x pro Quartal"}
                                            {state.glass_frequency === "halfyearly" && "1x pro Halbjahr"}
                                            {state.glass_frequency === "yearly" && "1x pro Jahr"}
                                          </span>
                                        </button>
                                        <button
                                          onClick={() => updateState({ glass_abo_model: true })}
                                          className={cn(
                                            "p-4 rounded-xl border-2 text-left transition-all",
                                            state.glass_abo_model
                                              ? "border-primary bg-primary/5"
                                              : "border-border hover:border-primary/50"
                                          )}
                                        >
                                          <span className="font-semibold text-foreground block mb-1">
                                            Abo-Modell
                                            <span className="ml-2 text-green-600 text-xs">10% Rabatt</span>
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            Monatliche Rechnung
                                          </span>
                                        </button>
                                      </div>
                                      {state.glass_abo_model && (() => {
                                        // Berechne monatlichen Preis mit Rabatt
                                        // Jahrespreis = Anzahl Reinigungen pro Jahr × Preis pro Reinigung
                                        // Monatlicher Preis = Jahrespreis / 12 Monate × 0,9 (10% Rabatt)
                                        const faktoren = {
                                          preis_klein: 3.50,
                                          preis_gross: 2.50,
                                          grenze: 500,
                                        };
                                        const preis_pro_qm = state.area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
                                        const preisProReinigung = state.area_sqm * preis_pro_qm;
                                        
                                        let anzahlReinigungenProJahr = 0;
                                        if (state.glass_frequency === "quarterly") {
                                          anzahlReinigungenProJahr = 4; // 4x pro Jahr (1x pro Quartal)
                                        } else if (state.glass_frequency === "halfyearly") {
                                          anzahlReinigungenProJahr = 2; // 2x pro Jahr (1x pro Halbjahr)
                                        } else if (state.glass_frequency === "yearly") {
                                          anzahlReinigungenProJahr = 1; // 1x pro Jahr
                                        }
                                        
                                        const jahrespreisOhneRabatt = preisProReinigung * anzahlReinigungenProJahr;
                                        const monatlicherPreisOhneRabatt = jahrespreisOhneRabatt / 12;
                                        const monatlicherPreisMitRabatt = monatlicherPreisOhneRabatt * 0.9; // 10% Rabatt
                                        const jahrespreisMitRabatt = monatlicherPreisMitRabatt * 12; // Jahrespreis mit Rabatt
                                        
                                        return (
                                          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-sm text-green-800">
                                              <span className="font-semibold">Monatlicher Preis:</span>{" "}
                                              <span className="font-bold text-lg">{Math.round(monatlicherPreisMitRabatt).toLocaleString("de-DE")} €</span>
                                              <span className="text-xs ml-2">(inkl. 10% Rabatt)</span>
                                            </p>
                                            <p className="text-xs text-green-700 mt-1">
                                              Jahrespreis:{" "}
                                              <span className="line-through text-green-600/70 mr-1">
                                                {Math.round(jahrespreisOhneRabatt).toLocaleString("de-DE")} €
                                              </span>
                                              <span className="font-semibold">
                                                {Math.round(jahrespreisMitRabatt).toLocaleString("de-DE")} €
                                              </span>
                                              {" "}({anzahlReinigungenProJahr}x Reinigung, inkl. 10% Rabatt)
                                            </p>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                // Büroreinigung: wöchentliche Frequenz
                                <div>
                                  <Label className="text-base mb-3 block">
                                    Reinigungsfrequenz: <span className="font-bold text-primary">{state.frequency_per_week}x pro Woche</span>
                                  </Label>
                                  <Slider
                                    value={[state.frequency_per_week]}
                                    onValueChange={([v]) => updateState({ frequency_per_week: v })}
                                    min={1}
                                    max={7}
                                    step={1}
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                    <span>1x/Woche</span>
                                    <span>Täglich</span>
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {state.service_type === "reinigung" && state.order_type === "einmalig" && state.service_subtype !== "grund" && (
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">Einmalauftrag – {state.service_subtype === "buero" ? "Büroreinigung" : "Glasreinigung"}</h3>
                              <p className="text-muted-foreground">
                                Einmalige Reinigung für <span className="font-semibold text-foreground">{state.area_sqm} m²</span> ohne vertragliche Bindung.
                              </p>
                            </div>
                          )}

                          {/* Grundreinigung: Frequenz-Auswahl bei Einmalauftrag */}
                          {state.service_type === "reinigung" && state.service_subtype === "grund" && state.order_type === "einmalig" && (
                            <div>
                              <Label className="text-base mb-3 block">
                                Reinigungsfrequenz
                              </Label>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                  { id: "monthly", label: "1x im Monat" },
                                  { id: "quarterly", label: "1x im Quartal" },
                                  { id: "halfyearly", label: "1x im Halbjahr" },
                                  { id: "yearly", label: "1x im Jahr" },
                                ].map((freq) => {
                                  const isSelected = state.deep_frequency === freq.id;
                                  const hasSelection = state.deep_frequency !== null;
                                  const isDisabled = hasSelection && !isSelected;
                                  
                                  return (
                                    <button
                                      key={freq.id}
                                      onClick={() => {
                                        // Toggle-Verhalten: Wenn bereits ausgewählt, Auswahl aufheben
                                        if (isSelected) {
                                          updateState({ deep_frequency: null });
                                        } else {
                                          updateState({ deep_frequency: freq.id as DeepCleaningFrequencyType });
                                        }
                                      }}
                                      disabled={isDisabled}
                                      className={cn(
                                        "p-4 rounded-xl border-2 text-left transition-all",
                                        isSelected
                                          ? "border-primary bg-primary/5"
                                          : isDisabled
                                          ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                                          : "border-border hover:border-primary/50"
                                      )}
                                    >
                                      <span className={cn(
                                        "font-semibold",
                                        isSelected
                                          ? "text-foreground"
                                          : isDisabled
                                          ? "text-muted-foreground"
                                          : "text-foreground"
                                      )}>{freq.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2 text-center">
                                Durch erneutes Klicken auf die ausgewählte Option können Sie die Auswahl aufheben.
                              </p>
                            </div>
                          )}

                          {/* Zusatzleistungen Block - nur bei Büroreinigung */}
                          {state.service_type === "reinigung" && state.service_subtype === "buero" && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold text-foreground">Zusatzleistungen</h3>
                              <div className="bg-muted/50 p-6 rounded-xl space-y-4">
                                {/* Glasreinigung Add-on */}
                                <div className="flex items-start space-x-3">
                                  <Checkbox
                                    id="glass_addon"
                                    checked={state.has_glass_addon}
                                    onCheckedChange={(checked) => updateState({ has_glass_addon: checked === true })}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="glass_addon" className="font-medium cursor-pointer">
                                      Glasreinigung
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      Fenster & Glasflächen inkl. Rahmen
                                    </p>
                                    {state.has_glass_addon && (
                                      <div className="mt-3 space-y-4" onClick={(e) => e.stopPropagation()}>
                                        <div>
                                          <Label className="text-sm mb-2 block">
                                            Glasfläche: <span className="font-bold text-primary">{state.glass_addon_area_sqm} m²</span>
                                          </Label>
                                          <Slider
                                            value={[state.glass_addon_area_sqm]}
                                            onValueChange={([v]) => updateState({ glass_addon_area_sqm: v })}
                                            min={0}
                                            max={2000}
                                            step={10}
                                            className="w-full"
                                          />
                                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                            <span>0 m²</span>
                                            <span>2.000 m²</span>
                                          </div>
                                        </div>
                                        {state.order_type === "regelmässig" && (
                                          <div>
                                            <Label className="text-sm mb-2 block">
                                              Reinigungsfrequenz
                                            </Label>
                                            <div className="grid sm:grid-cols-2 gap-2">
                                              {[
                                                { id: "monthly", label: "1x im Monat" },
                                                { id: "quarterly", label: "1x im Quartal" },
                                                { id: "halfyearly", label: "1x im Halbjahr" },
                                                { id: "yearly", label: "1x im Jahr" },
                                              ].map((freq) => {
                                                const isSelected = state.glass_addon_frequency === freq.id;
                                                const hasSelection = state.glass_addon_frequency !== null;
                                                const isDisabled = hasSelection && !isSelected;
                                                
                                                return (
                                                  <button
                                                    key={freq.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      if (isSelected) {
                                                        updateState({ glass_addon_frequency: null });
                                                      } else {
                                                        updateState({ glass_addon_frequency: freq.id as GlassFrequencyType });
                                                      }
                                                    }}
                                                    disabled={isDisabled}
                                                    className={cn(
                                                      "p-3 rounded-lg border-2 text-left transition-all text-xs",
                                                      isSelected
                                                        ? "border-primary bg-primary/5"
                                                        : isDisabled
                                                        ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                                                        : "border-border hover:border-primary/50"
                                                    )}
                                                  >
                                                    <span className={cn(
                                                      "font-semibold",
                                                      isSelected
                                                        ? "text-foreground"
                                                        : isDisabled
                                                        ? "text-muted-foreground"
                                                        : "text-foreground"
                                                    )}>{freq.label}</span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                            {state.glass_addon_frequency && (
                                              <p className="text-xs text-muted-foreground mt-2 text-center">
                                                Durch erneutes Klicken auf die ausgewählte Option können Sie die Auswahl aufheben.
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Grundreinigung Add-on */}
                                <div className="flex items-start space-x-3">
                                  <Checkbox
                                    id="deep_addon"
                                    checked={state.has_deep_addon}
                                    onCheckedChange={(checked) => updateState({ has_deep_addon: checked === true })}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="deep_addon" className="font-medium cursor-pointer">
                                      Grundreinigung
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      Intensive Tiefenreinigung
                                    </p>
                                    {state.has_deep_addon && (
                                      <div className="mt-3 space-y-4" onClick={(e) => e.stopPropagation()}>
                                        <div>
                                          <Label className="text-sm mb-2 block">
                                            Fläche: <span className="font-bold text-primary">{state.deep_addon_area_sqm} m²</span>
                                          </Label>
                                          <Slider
                                            value={[state.deep_addon_area_sqm]}
                                            onValueChange={([v]) => updateState({ deep_addon_area_sqm: v })}
                                            min={0}
                                            max={5000}
                                            step={50}
                                            className="w-full"
                                          />
                                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                            <span>0 m²</span>
                                            <span>5.000 m²</span>
                                          </div>
                                        </div>
                                        {state.order_type === "regelmässig" && (
                                          <div>
                                            <Label className="text-sm mb-2 block">
                                              Reinigungsfrequenz
                                            </Label>
                                            <div className="grid sm:grid-cols-2 gap-2">
                                              {[
                                                { id: "monthly", label: "1x im Monat" },
                                                { id: "quarterly", label: "1x im Quartal" },
                                                { id: "halfyearly", label: "1x im Halbjahr" },
                                                { id: "yearly", label: "1x im Jahr" },
                                              ].map((freq) => {
                                                const isSelected = state.deep_addon_frequency === freq.id;
                                                const hasSelection = state.deep_addon_frequency !== null;
                                                const isDisabled = hasSelection && !isSelected;
                                                
                                                return (
                                                  <button
                                                    key={freq.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      if (isSelected) {
                                                        updateState({ deep_addon_frequency: null });
                                                      } else {
                                                        updateState({ deep_addon_frequency: freq.id as DeepCleaningFrequencyType });
                                                      }
                                                    }}
                                                    disabled={isDisabled}
                                                    className={cn(
                                                      "p-3 rounded-lg border-2 text-left transition-all text-xs",
                                                      isSelected
                                                        ? "border-primary bg-primary/5"
                                                        : isDisabled
                                                        ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                                                        : "border-border hover:border-primary/50"
                                                    )}
                                                  >
                                                    <span className={cn(
                                                      "font-semibold",
                                                      isSelected
                                                        ? "text-foreground"
                                                        : isDisabled
                                                        ? "text-muted-foreground"
                                                        : "text-foreground"
                                                    )}>{freq.label}</span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                            {state.deep_addon_frequency && (
                                              <p className="text-xs text-muted-foreground mt-2 text-center">
                                                Durch erneutes Klicken auf die ausgewählte Option können Sie die Auswahl aufheben.
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Moppservice Add-on */}
                                <div className="flex items-start space-x-3 opacity-50">
                                  <Checkbox
                                    id="mopp_addon"
                                    checked={false}
                                    disabled={true}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="mopp_addon" className="font-medium cursor-not-allowed text-muted-foreground">
                                      Moppservice
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      Bald verfügbar
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {state.service_type === "tiefgarage" && (
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-6 rounded-xl">
                                <h3 className="font-semibold mb-2">Tiefgaragenreinigung (Nassreinigung)</h3>
                                <p className="text-muted-foreground">
                                  Reinigung für <span className="font-semibold text-foreground">{state.parking_spaces} Stellplätze</span>{" "}
                                  (<span className="font-semibold text-foreground">{(state.parking_spaces * 9).toLocaleString("de-DE")} m²</span> Gesamtfläche)
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                  Inklusive Entfernung von Reifenabrieb, Ölflecken und Reinigung der Entwässerungsrinnen.
                                </p>
                              </div>
                              
                              {/* Hinweis für Großgaragen */}
                              {state.parking_spaces > 50 && (
                                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl">
                                  <p className="text-sm font-medium">
                                    Bei Großgaragen über 50 Stellplätzen ist ein individueller Vor-Ort-Check für ein verbindliches Festpreis-Angebot zwingend erforderlich.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {state.service_type === "winterdienst" && (
                            <div className="space-y-6">
                              <div className="bg-muted/50 p-6 rounded-xl space-y-4">
                                <h3 className="font-semibold mb-4">Optionale Leistungen</h3>
                                
                                <div className="flex items-start space-x-3">
                                  <Checkbox
                                    id="streugut"
                                    checked={state.has_streugut}
                                    onCheckedChange={(checked) => updateState({ has_streugut: checked === true })}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="streugut" className="font-medium cursor-pointer">
                                      Streugut (0,30€/m²)
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      Streusalz oder Streusplitt wird gestellt
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                  <Checkbox
                                    id="express"
                                    checked={state.has_express}
                                    onCheckedChange={(checked) => updateState({ has_express: checked === true })}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="express" className="font-medium cursor-pointer">
                                      Express-Zuschlag (+15% auf Bereitschaftspauschale)
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      Priorität bei Einsätzen, schnellere Reaktionszeit
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                  <Checkbox
                                    id="liability"
                                    checked={state.has_liability_coverage}
                                    onCheckedChange={(checked) => updateState({ has_liability_coverage: checked === true })}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="liability" className="font-medium cursor-pointer">
                                      Vollständige Haftungsübernahme für Glatteisunfälle (+20% auf Bereitschaftspauschale)
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      Wir übernehmen die volle Haftung bei Glatteisunfällen auf Ihrer Fläche
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                                <h4 className="font-semibold text-sm mb-2">Inklusive Leistungen:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>• Monatliche Bereitschaftspauschale: 450€</li>
                                  <li>• Schneeräumung nach Bedarf</li>
                                  <li>• Bereitschaft an allen Wintertagen</li>
                                  <li>• Dokumentation aller Einsätze</li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 4: Kalkulation */}
                      {step === 4 && (
                        <div className="text-center py-6 sm:py-8">
                          <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
                            Ihr unverbindlicher Richtpreis
                          </h2>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-10 mb-6"
                          >
                            <p className="text-sm text-muted-foreground mb-2">
                              {(() => {
                                // Für Hauptpfad Glasreinigung → Unterhaltsreinigung: Frequenz-spezifische Bezeichnung
                                if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig" && state.glass_frequency) {
                                  if (state.glass_frequency === "monthly") {
                                    return "Monatlicher Richtpreis";
                                  } else if (state.glass_frequency === "quarterly") {
                                    return state.glass_abo_model 
                                      ? "Monatlicher Richtpreis (Abo-Modell, 1x im Quartal)"
                                      : "Quartalspreis";
                                  } else if (state.glass_frequency === "halfyearly") {
                                    return state.glass_abo_model
                                      ? "Monatlicher Richtpreis (Abo-Modell, 1x im Halbjahr)"
                                      : "Halbjährlicher Richtpreis";
                                  } else if (state.glass_frequency === "yearly") {
                                    return state.glass_abo_model
                                      ? "Monatlicher Richtpreis (Abo-Modell, 1x im Jahr)"
                                      : "Jährlicher Richtpreis";
                                  }
                                }
                                // Für Hauptpfad Grundreinigung → Einmalauftrag: Frequenz-spezifische Bezeichnung
                                if (state.service_type === "reinigung" && state.service_subtype === "grund" && state.order_type === "einmalig" && state.deep_frequency) {
                                  if (state.deep_frequency === "monthly") {
                                    return "Monatlicher Richtpreis";
                                  } else if (state.deep_frequency === "quarterly") {
                                    return "Quartalspreis";
                                  } else if (state.deep_frequency === "halfyearly") {
                                    return "Halbjährlicher Richtpreis";
                                  } else if (state.deep_frequency === "yearly") {
                                    return "Jährlicher Richtpreis";
                                  }
                                }
                                // Standard: Monatlicher Richtpreis oder Projektpreis
                                return calculatePrice().isMonthly ? "Monatlicher Richtpreis" : "Projektpreis";
                              })()}
                            </p>
                            <motion.p
                              className="text-5xl lg:text-6xl font-bold text-primary"
                              initial={{ y: 20 }}
                              animate={{ y: 0 }}
                            >
                              {(() => {
                                const priceResult = calculatePrice();
                                // Für Hauptpfad Glasreinigung → Unterhaltsreinigung mit yearly: jährlichen Preis direkt berechnen
                                let displayPrice = priceResult.price;
                                let displayOriginalPrice = priceResult.originalPrice;
                                
                                if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig") {
                                  const faktoren = {
                                    preis_klein: 3.50,
                                    preis_gross: 2.50,
                                    grenze: 500,
                                  };
                                  const preis_pro_qm = state.area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
                                  const preisProReinigung = state.area_sqm * preis_pro_qm;
                                  
                                  if (state.glass_frequency === "yearly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Jahrespreis
                                      displayPrice = Math.round(preisProReinigung);
                                    }
                                  } else if (state.glass_frequency === "quarterly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Quartalspreis (monatlicher Preis × 3)
                                      displayPrice = Math.round(priceResult.price * 3);
                                    }
                                  } else if (state.glass_frequency === "halfyearly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Halbjährlicher Preis (monatlicher Preis × 6)
                                      displayPrice = Math.round(priceResult.price * 6);
                                    }
                                  }
                                }
                                
                                // Für Hauptpfad Grundreinigung → Einmalauftrag: Preis bleibt gleich (Preis pro Reinigung)
                                // Die Bezeichnung ändert sich je nach Frequenz, aber der Preis ist immer der gleiche
                                
                                // Zeige Rabatt an, falls vorhanden
                                if (displayOriginalPrice && priceResult.discount) {
                                  return (
                                    <>
                                      <span className="line-through text-muted-foreground text-3xl lg:text-4xl mr-2">
                                        {displayOriginalPrice.toLocaleString("de-DE")} €
                                      </span>
                                      <span className="text-red-600">
                                        ab {displayPrice.toLocaleString("de-DE")} €
                                      </span>
                                    </>
                                  );
                                }
                                
                                return `ab ${displayPrice.toLocaleString("de-DE")} €`;
                              })()}
                            </motion.p>
                            {calculatePrice().discount && (
                              <p className="text-sm text-green-600 font-medium mt-2">
                                {(() => {
                                  const priceResult = calculatePrice();
                                  if (state.glass_frequency === "monthly") {
                                    return `${priceResult.discount}% Rabatt bei monatlicher Reinigung`;
                                  } else if (state.glass_abo_model) {
                                    return `${priceResult.discount}% Rabatt bei Abo-Modell`;
                                  }
                                  return `${priceResult.discount}% Rabatt`;
                                })()}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mt-3">
                              zzgl. 19% MwSt.
                            </p>
                          </motion.div>

                          {/* Mindestauftragswert Warnung */}
                          {(() => {
                            const priceResult = calculatePrice();
                            // Für Hauptpfad Glasreinigung → Unterhaltsreinigung mit yearly: prüfe Jahrespreis
                            let priceToCheck = priceResult.price;
                            if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig" && state.glass_frequency === "yearly") {
                              // Bei yearly: Jahrespreis prüfen (monatlicher Preis × 12)
                              priceToCheck = priceResult.price * 12;
                            }
                            // Mindestwert: 150€ für Unterhaltsreinigung, 500€ für Einmalaufträge
                            const mindestwert = priceResult.isMonthly ? 150 : 500;
                            const belowMinimum = priceToCheck < mindestwert && priceToCheck > 0;
                            
                            return belowMinimum ? (
                              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 max-w-md mx-auto">
                                <p className="text-sm font-medium">
                                  {priceResult.isMonthly 
                                    ? "Mindestauftragswert für diesen Service beträgt 150 €"
                                    : "Mindestauftragswert für Einmalaufträge beträgt 500 €. Bitte richten Sie solche Anfragen über das Anfrageformular an uns."
                                  }
                                </p>
                              </div>
                            ) : null;
                          })()}

                          {/* Anfahrtspauschale Hinweis */}
                          <div className="bg-muted/50 p-4 rounded-xl mb-6 max-w-md mx-auto">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold text-foreground">Zzgl. Anfahrtspauschale:</span>{" "}
                              München 60 € / Umland 85 €
                            </p>
                          </div>

                          <p className="text-muted-foreground max-w-md mx-auto text-sm">
                            Unverbindliche Orientierung für Facility-Leistungen. Für ein festes Angebot: Projekt-Check anfordern.
                          </p>
                        </div>
                      )}

                      {/* Step 5: Kontakt */}
                      {step === 5 && (
                        <div className="space-y-4 sm:space-y-6">
                          <h2 className="text-lg sm:text-xl font-semibold">
                            Ihre Kontaktdaten
                          </h2>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="customer_name">Name *</Label>
                              <Input
                                id="customer_name"
                                name="customer_name"
                                placeholder="Max Mustermann"
                                value={state.customer_name}
                                onChange={(e) => updateState({ customer_name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="customer_phone">Telefon *</Label>
                              <Input
                                id="customer_phone"
                                name="customer_phone"
                                type="tel"
                                placeholder="+49 123 456 789"
                                value={state.customer_phone}
                                onChange={(e) => updateState({ customer_phone: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="customer_email">E-Mail *</Label>
                              <Input
                                id="customer_email"
                                name="customer_email"
                                type="email"
                                placeholder="max@beispiel.de"
                                value={state.customer_email}
                                onChange={(e) => updateState({ customer_email: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="additional_message">Nachricht (optional)</Label>
                            <Input
                              id="additional_message"
                              name="additional_message"
                              placeholder="Zusätzliche Informationen zu Ihrem Objekt..."
                              value={state.additional_message}
                              onChange={(e) => updateState({ additional_message: e.target.value })}
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                            <Button asChild className="w-full sm:w-auto">
                              <Link href="/anfrage?bereich=facility">
                                Projekt-Check anfordern
                              </Link>
                            </Button>
                            <span className="text-sm text-muted-foreground text-center sm:text-left">Optional: Kontaktdaten ausfüllen und unten „Richtpreis-Anfrage senden“ wählen.</span>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-xl text-sm text-muted-foreground">
                            <strong>Zusammenfassung:</strong>{" "}
                            {state.service_type === "reinigung" && (
                              <>
                                {state.service_subtype === "buero" ? "Büroreinigung" : state.service_subtype === "glas" ? "Glasreinigung" : state.service_subtype === "grund" ? "Grundreinigung" : state.service_subtype === "tiefgarage_nass" ? "Tiefgaragenreinigung" : "Baureinigung"} ({state.order_type === "einmalig" ? "Einmalauftrag" : "Unterhaltsreinigung"}), {state.area_sqm} m²{state.order_type === "regelmässig" && (
                                  state.service_subtype === "glas" && state.glass_frequency
                                    ? `, ${state.glass_frequency === "monthly" ? "1x im Monat" : state.glass_frequency === "quarterly" ? "1x im Quartal" : state.glass_frequency === "halfyearly" ? "1x im Halbjahr" : "1x im Jahr"}${(state.glass_frequency === "quarterly" || state.glass_frequency === "halfyearly" || state.glass_frequency === "yearly") && state.glass_abo_model ? " (Abo-Modell)" : ""}`
                                    : state.service_subtype === "buero" ? `, ${state.frequency_per_week}x/Woche` : ""
                                )}{state.order_type === "einmalig" && state.service_subtype === "grund" && state.deep_frequency && (
                                  `, ${state.deep_frequency === "monthly" ? "1x im Monat" : state.deep_frequency === "quarterly" ? "1x im Quartal" : state.deep_frequency === "halfyearly" ? "1x im Halbjahr" : "1x im Jahr"}`
                                )}
                                {state.service_subtype === "buero" && (
                                  <>
                                    {state.has_glass_addon && state.glass_addon_area_sqm > 0 && (
                                      <>
                                        , Glasreinigung {state.glass_addon_area_sqm} m²
                                        {state.order_type === "regelmässig" && state.glass_addon_frequency && (
                                          ` ${state.glass_addon_frequency === "monthly" ? "1x im Monat" : state.glass_addon_frequency === "quarterly" ? "1x im Quartal" : state.glass_addon_frequency === "halfyearly" ? "1x im Halbjahr" : "1x im Jahr"}`
                                        )}
                                      </>
                                    )}
                                    {state.has_deep_addon && state.deep_addon_area_sqm > 0 && (
                                      <>
                                        , Grundreinigung {state.deep_addon_area_sqm} m²
                                        {state.order_type === "regelmässig" && state.deep_addon_frequency && (
                                          ` ${state.deep_addon_frequency === "monthly" ? "1x im Monat" : state.deep_addon_frequency === "quarterly" ? "1x im Quartal" : state.deep_addon_frequency === "halfyearly" ? "1x im Halbjahr" : "1x im Jahr"}`
                                        )}
                                      </>
                                    )}
                                    {state.has_mopp_addon && `, Moppservice`}
                                  </>
                                )}
                              </>
                            )}
                            {state.service_type === "tiefgarage" && `Tiefgaragenreinigung (${state.order_type === "einmalig" ? "Einmalauftrag" : "Regelmäßig"}), ${state.parking_spaces} Stellplätze`}
                            {state.service_type === "hausmeister" && `Hausmeisterservice für ${state.object_type === "mfh" ? "Mehrfamilienhaus" : state.object_type === "gewerbe" ? "Gewerbeobjekt" : "Privathaus"}`}
                            {state.service_type === "winterdienst" && `Winterdienst, ${state.machine_area_sqm + state.manual_area_sqm} m² (${state.machine_area_sqm} m² maschinell, ${state.manual_area_sqm} m² manuell)${state.has_streugut ? ", mit Streugut" : ""}${state.has_express ? ", Express" : ""}${state.has_liability_coverage ? ", mit Haftungsübernahme" : ""}`}
                            {" · "}{(() => {
                              const priceResult = calculatePrice();
                              // Für Hauptpfad Glasreinigung → Unterhaltsreinigung: Frequenz-spezifische Bezeichnung
                              if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig" && state.glass_frequency) {
                                if (state.glass_frequency === "monthly") {
                                  return "Monatlicher Richtpreis";
                                } else if (state.glass_frequency === "quarterly") {
                                  return state.glass_abo_model 
                                    ? "Monatlicher Richtpreis (Abo-Modell, 1x im Quartal)"
                                    : "Quartalspreis";
                                } else if (state.glass_frequency === "halfyearly") {
                                  return state.glass_abo_model
                                    ? "Monatlicher Richtpreis (Abo-Modell, 1x im Halbjahr)"
                                    : "Halbjährlicher Richtpreis";
                                } else if (state.glass_frequency === "yearly") {
                                  return state.glass_abo_model
                                    ? "Monatlicher Richtpreis (Abo-Modell, 1x im Jahr)"
                                    : "Jährlicher Richtpreis";
                                }
                              }
                              // Für Hauptpfad Grundreinigung → Einmalauftrag: Frequenz-spezifische Bezeichnung
                              if (state.service_type === "reinigung" && state.service_subtype === "grund" && state.order_type === "einmalig" && state.deep_frequency) {
                                if (state.deep_frequency === "monthly") {
                                  return "Monatlicher Richtpreis";
                                } else if (state.deep_frequency === "quarterly") {
                                  return "Quartalspreis";
                                } else if (state.deep_frequency === "halfyearly") {
                                  return "Halbjährlicher Richtpreis";
                                } else if (state.deep_frequency === "yearly") {
                                  return "Jährlicher Richtpreis";
                                }
                              }
                              // Standard: Monatlicher Richtpreis oder Projektpreis
                              return priceResult.isMonthly ? "Monatlicher Richtpreis" : "Projektpreis";
                              })()}: {(() => {
                                const priceResult = calculatePrice();
                                // Für Hauptpfad Glasreinigung → Unterhaltsreinigung mit yearly: jährlichen Preis direkt berechnen
                                let displayPrice = priceResult.price;
                                let displayOriginalPrice = priceResult.originalPrice;
                                
                                if (state.service_type === "reinigung" && state.service_subtype === "glas" && state.order_type === "regelmässig") {
                                  const faktoren = {
                                    preis_klein: 3.50,
                                    preis_gross: 2.50,
                                    grenze: 500,
                                  };
                                  const preis_pro_qm = state.area_sqm > faktoren.grenze ? faktoren.preis_gross : faktoren.preis_klein;
                                  const preisProReinigung = state.area_sqm * preis_pro_qm;
                                  
                                  if (state.glass_frequency === "yearly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Jahrespreis
                                      displayPrice = Math.round(preisProReinigung);
                                    }
                                  } else if (state.glass_frequency === "quarterly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Quartalspreis (monatlicher Preis × 3)
                                      displayPrice = Math.round(priceResult.price * 3);
                                    }
                                  } else if (state.glass_frequency === "halfyearly") {
                                    if (state.glass_abo_model) {
                                      // Abo-Modell: monatlicher Preis (bereits rabattiert)
                                      displayPrice = priceResult.price;
                                      displayOriginalPrice = priceResult.originalPrice;
                                    } else {
                                      // Einmalige Rechnung: Halbjährlicher Preis (monatlicher Preis × 6)
                                      displayPrice = Math.round(priceResult.price * 6);
                                    }
                                  }
                                }
                                
                                // Für Hauptpfad Grundreinigung → Einmalauftrag: Preis bleibt gleich (Preis pro Reinigung)
                                // Die Bezeichnung ändert sich je nach Frequenz, aber der Preis ist immer der gleiche
                                
                                // Zeige Rabatt an, falls vorhanden
                                if (displayOriginalPrice && priceResult.discount) {
                                  return (
                                    <>
                                      <span className="line-through text-muted-foreground mr-2">
                                        ab {displayOriginalPrice.toLocaleString("de-DE")} €
                                      </span>
                                      <span className="text-red-600 font-semibold">
                                        ab {displayPrice.toLocaleString("de-DE")} €
                                      </span>
                                      <span className="text-green-600 text-sm ml-2">
                                        ({priceResult.discount}% Rabatt)
                                      </span>
                                    </>
                                  );
                                }
                                
                                return `ab ${displayPrice.toLocaleString("de-DE")} €`;
                              })()} zzgl. 19% MwSt.
                          </div>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between mt-6 sm:mt-10 pt-4 sm:pt-6 border-t gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setStep((s) => s - 1);
                            scrollToCenter();
                          }}
                          disabled={step === 1}
                          className="gap-2 text-sm sm:text-base h-10 sm:h-11 flex-1 sm:flex-initial"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="hidden sm:inline">Zurück</span>
                        </Button>

                        {step < 5 ? (
                          <Button
                            onClick={() => {
                              setStep((s) => s + 1);
                              scrollToCenter();
                            }}
                            disabled={!canProceed()}
                            className="gap-2 text-sm sm:text-base h-10 sm:h-11 flex-1 sm:flex-initial"
                          >
                            <span>Weiter</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            disabled={!canProceed() || isSubmitting}
                            className="gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Wird gesendet...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Richtpreis-Anfrage senden
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </div>
  );
}
