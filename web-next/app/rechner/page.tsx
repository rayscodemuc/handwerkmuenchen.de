"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

const FORM_ID = "service_calculator";

type ServiceType = "reinigung" | "tiefgarage" | "hausmeister" | "winterdienst" | null;
type ReinigungType = "buero" | "glas" | "grund" | "tiefgarage_nass" | "baureinigung" | null;
type ObjektType = "mfh" | "gewerbe" | "privat" | null;
type AuftragsartType = "einmalig" | "regelmässig" | null;

interface CalculatorState {
  service_type: ServiceType;
  service_subtype: ReinigungType;
  object_type: ObjektType;
  order_type: AuftragsartType;
  parking_spaces: number;
  area_sqm: number;
  frequency_per_week: number;
  // Winterdienst spezifische Felder
  machine_area_sqm: number; // Maschinelle Räumung
  manual_area_sqm: number; // Manuelle Räumung
  has_liability_coverage: boolean; // Haftungsübernahme
  has_streugut: boolean; // Streugut
  has_express: boolean; // Express-Zuschlag
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
  // Winterdienst spezifische Felder
  machine_area_sqm: 0,
  manual_area_sqm: 0,
  has_liability_coverage: false,
  has_streugut: false,
  has_express: false,
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  city: "",
  additional_message: "",
};

const standorte = [
  { value: "muenchen", label: "München" },
  { value: "augsburg", label: "Augsburg" },
  { value: "ingolstadt", label: "Ingolstadt" },
  { value: "nuernberg", label: "Nürnberg" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "hamburg", label: "Hamburg" },
  { value: "berlin", label: "Berlin" },
];

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
    // Berechnung: Stellplätze * 25m² (inkl. Fahrspur) * 12,50€/m²
    qm_pro_stellplatz: 25,
    preis_pro_qm: 12.50,
  },
  hausmeister: {
    mfh: 180,
    gewerbe: 280,
    privat: 120,
  },
  winterdienst: 0.35, // pro m²
  mindestauftragswert: 150, // Minimum für alle Aufträge
};

export default function Rechner() {
  const { submitForm } = useFormSubmit();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CalculatorState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const updateStateAndAdvance = (updates: Partial<CalculatorState>, shouldAdvance = false) => {
    setState((prev) => ({ ...prev, ...updates }));
    if (shouldAdvance) {
      setTimeout(() => setStep((s) => s + 1), 300);
    }
  };

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
    }, true);
  };

  // Auto-advance für Step 2: Auftragsart (bei Reinigung/Tiefgarage)
  const selectAuftragsart = (auftragsart: AuftragsartType) => {
    updateStateAndAdvance({ order_type: auftragsart }, true);
  };

  // Auto-advance für Hausmeister Objektart
  const selectObjektart = (objektType: ObjektType) => {
    updateStateAndAdvance({ object_type: objektType }, true);
  };

  const calculatePrice = (): { price: number; isMonthly: boolean; belowMinimum: boolean } => {
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
          } else if (subtype === "glas") {
            const faktoren = preisfaktoren.reinigung.glas;
            if (isMonthly) {
              // Abo: 4,90€/m²
              price = state.area_sqm * faktoren.abo_qm;
            } else {
              // Einmalauftrag: 5,50€/m²
              price = state.area_sqm * faktoren.einmal_qm;
            }
          } else if (subtype === "grund") {
            // Grundreinigung nur als Einmalauftrag: 7,50€/m²
            price = state.area_sqm * preisfaktoren.reinigung.grund.einmal_qm;
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
        // Berechnung: Stellplätze * 25m² pro Stellplatz (inkl. Fahrspur) * 12,50€/m²
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
    const belowMinimum = roundedPrice < preisfaktoren.mindestauftragswert && roundedPrice > 0;
    
    return { price: roundedPrice, isMonthly, belowMinimum };
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return state.service_type !== null;
      case 2:
        if (state.service_type === "reinigung") {
          return state.service_subtype !== null && state.order_type !== null;
        }
        if (state.service_type === "tiefgarage") {
          // Tiefgarage ist immer Einmalauftrag, muss nur ausgewählt sein
          return state.order_type === "einmalig";
        }
        if (state.service_type === "hausmeister") return state.object_type !== null;
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return (
          state.customer_name.trim() !== "" &&
          state.customer_email.trim() !== "" &&
          state.customer_phone.trim() !== "" &&
          state.city !== ""
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
      successDescription: "Wir melden uns innerhalb von 24 Stunden mit einem individuellen Angebot bei Ihnen.",
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
    <>
      <Header />
      <main className="min-h-screen bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-primary hover:text-primary/80">Startseite</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Service-Konfigurator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="h-4 w-4" />
              Kostenlos & Unverbindlich
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Service-Konfigurator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In nur 5 Schritten zu Ihrem individuellen Richtpreis. Wählen Sie Ihre Leistung und erhalten Sie sofort eine Orientierung.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                      step > s
                        ? "bg-primary text-primary-foreground"
                        : step === s
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > s ? <Check className="h-5 w-5" /> : s}
                  </div>
                  {s < 5 && (
                    <div
                      className={cn(
                        "h-1 w-12 sm:w-20 lg:w-28",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-muted-foreground">
              <span>Leistung</span>
              <span>Details</span>
              <span>Parameter</span>
              <span>Preis</span>
              <span>Kontakt</span>
            </div>
          </div>

          {/* Steps Container */}
          <div className="max-w-4xl mx-auto">
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
                    Wir haben Ihre Daten erhalten und melden uns innerhalb von 24 Stunden mit einem individuellen Angebot bei Ihnen.
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
                    <CardContent className="p-8 lg:p-12">
                      {/* Step 1: Leistung wählen */}
                      {step === 1 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-6">
                            Welche Leistung benötigen Sie?
                          </h2>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {serviceOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => selectService(option.id as ServiceType)}
                                className={cn(
                                  "p-6 rounded-xl border-2 text-left transition-all hover:border-primary/50",
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
                          <h2 className="text-xl font-semibold mb-6">
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
                                  { id: "grund", label: "Grundreinigung", desc: "Intensive Tiefenreinigung (einmalig)" },
                                  { id: "tiefgarage_nass", label: "Tiefgaragenreinigung", desc: "Nassreinigung (einmalig)" },
                                  { id: "baureinigung", label: "Baureinigung", desc: "Grob- & Feinreinigung (einmalig)" },
                                ].map((type) => (
                                  <button
                                    key={type.id}
                                    onClick={() => updateState({ service_subtype: type.id as ReinigungType })}
                                    className={cn(
                                      "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                                      state.service_subtype === type.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                    )}
                                  >
                                    <h3 className="font-semibold text-foreground mb-1">{type.label}</h3>
                                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                                  </button>
                                ))}
                              </div>

                              {state.service_subtype && (
                                <div>
                                  <Label className="text-base mb-3 block">Art des Auftrags</Label>
                                  {/* Grundreinigung, Tiefgarage Nass und Baureinigung nur als Einmalauftrag */}
                                  {(state.service_subtype === "grund" || state.service_subtype === "tiefgarage_nass" || state.service_subtype === "baureinigung") ? (
                                    <div className="bg-muted/50 p-4 rounded-xl">
                                      <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">
                                          {state.service_subtype === "grund" && "Grundreinigung"}
                                          {state.service_subtype === "tiefgarage_nass" && "Tiefgaragenreinigung (Nassreinigung)"}
                                          {state.service_subtype === "baureinigung" && "Baureinigung"}
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
                                  Kalkulation: {state.parking_spaces} Stellplätze × 25 m² = <span className="font-semibold">{(state.parking_spaces * 25).toLocaleString("de-DE")} m²</span> Reinigungsfläche
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
                        <div className="space-y-8">
                          <h2 className="text-xl font-semibold">
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

                          {state.service_type === "reinigung" && state.order_type === "einmalig" && (
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">Einmalauftrag – {state.service_subtype === "buero" ? "Büroreinigung" : state.service_subtype === "glas" ? "Glasreinigung" : "Grundreinigung"}</h3>
                              <p className="text-muted-foreground">
                                Einmalige {state.service_subtype === "grund" ? "Grundreinigung" : "Reinigung"} für <span className="font-semibold text-foreground">{state.area_sqm} m²</span> ohne vertragliche Bindung.
                              </p>
                            </div>
                          )}

                          {state.service_type === "tiefgarage" && (
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-6 rounded-xl">
                                <h3 className="font-semibold mb-2">Tiefgaragenreinigung (Nassreinigung)</h3>
                                <p className="text-muted-foreground">
                                  Reinigung für <span className="font-semibold text-foreground">{state.parking_spaces} Stellplätze</span>{" "}
                                  (<span className="font-semibold text-foreground">{(state.parking_spaces * 25).toLocaleString("de-DE")} m²</span> Gesamtfläche)
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
                        <div className="text-center py-8">
                          <h2 className="text-xl font-semibold mb-8">
                            Ihr unverbindlicher Richtpreis
                          </h2>
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-10 mb-6"
                          >
                            <p className="text-sm text-muted-foreground mb-2">
                              {calculatePrice().isMonthly ? "Monatlicher Richtpreis" : "Projektpreis"}
                            </p>
                            <motion.p
                              className="text-5xl lg:text-6xl font-bold text-primary"
                              initial={{ y: 20 }}
                              animate={{ y: 0 }}
                            >
                              ab {calculatePrice().price.toLocaleString("de-DE")} €
                            </motion.p>
                            <p className="text-sm text-muted-foreground mt-3">
                              zzgl. 19% MwSt.
                            </p>
                          </motion.div>

                          {/* Mindestauftragswert Warnung */}
                          {calculatePrice().belowMinimum && (
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 max-w-md mx-auto">
                              <p className="text-sm font-medium">
                                Mindestauftragswert für diesen Service beträgt 150 €
                              </p>
                            </div>
                          )}

                          {/* Anfahrtspauschale Hinweis */}
                          <div className="bg-muted/50 p-4 rounded-xl mb-6 max-w-md mx-auto">
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold text-foreground">Zzgl. Anfahrtspauschale:</span>{" "}
                              München 60 € / Umland 85 €
                            </p>
                          </div>

                          <p className="text-muted-foreground max-w-md mx-auto text-sm">
                            Dieser Preis dient als unverbindliche Orientierung. Im nächsten Schritt erstellen wir Ihnen ein individuelles Angebot.
                          </p>
                        </div>
                      )}

                      {/* Step 5: Kontakt */}
                      {step === 5 && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">
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
                            <div className="space-y-2">
                              <Label htmlFor="city">Gewünschter Standort *</Label>
                              <Select
                                name="city"
                                value={state.city}
                                onValueChange={(v) => updateState({ city: v })}
                              >
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Standort wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                  {standorte.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                      {s.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                          <div className="bg-muted/50 p-4 rounded-xl text-sm text-muted-foreground">
                            <strong>Zusammenfassung:</strong>{" "}
                            {state.service_type === "reinigung" && `${state.service_subtype === "buero" ? "Büroreinigung" : state.service_subtype === "glas" ? "Glasreinigung" : state.service_subtype === "grund" ? "Grundreinigung" : state.service_subtype === "tiefgarage_nass" ? "Tiefgaragenreinigung" : "Baureinigung"} (${state.order_type === "einmalig" ? "Einmalauftrag" : "Unterhaltsreinigung"}), ${state.area_sqm} m²${state.order_type === "regelmässig" ? `, ${state.frequency_per_week}x/Woche` : ""}`}
                            {state.service_type === "tiefgarage" && `Tiefgaragenreinigung (${state.order_type === "einmalig" ? "Einmalauftrag" : "Regelmäßig"}), ${state.parking_spaces} Stellplätze`}
                            {state.service_type === "hausmeister" && `Hausmeisterservice für ${state.object_type === "mfh" ? "Mehrfamilienhaus" : state.object_type === "gewerbe" ? "Gewerbeobjekt" : "Privathaus"}`}
                            {state.service_type === "winterdienst" && `Winterdienst, ${state.machine_area_sqm + state.manual_area_sqm} m² (${state.machine_area_sqm} m² maschinell, ${state.manual_area_sqm} m² manuell)${state.has_streugut ? ", mit Streugut" : ""}${state.has_express ? ", Express" : ""}${state.has_liability_coverage ? ", mit Haftungsübernahme" : ""}`}
                            {" · "}{calculatePrice().isMonthly ? "Monatlicher Richtpreis" : "Projektpreis"}: ab {calculatePrice().price.toLocaleString("de-DE")} € zzgl. 19% MwSt.
                          </div>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between mt-10 pt-6 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setStep((s) => s - 1)}
                          disabled={step === 1}
                          className="gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Zurück
                        </Button>

                        {step < 5 ? (
                          <Button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={!canProceed()}
                            className="gap-2"
                          >
                            Weiter
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
                                Angebot anfordern
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
      </main>
      <Footer />
    </>
  );
}
