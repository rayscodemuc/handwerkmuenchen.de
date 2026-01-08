import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
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
type ReinigungType = "buero" | "glas" | "grund" | null;
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

// Preisfaktoren (vereinfachte Durchschnittswerte)
const preisfaktoren = {
  reinigung: {
    buero: 0.85,
    glas: 1.20,
    grund: 2.50,
  },
  tiefgarage: 0.45, // pro Stellplatz
  hausmeister: {
    mfh: 180,
    gewerbe: 280,
    privat: 120,
  },
  winterdienst: 0.35, // pro m²
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
    updateStateAndAdvance({ service_type: service, order_type: null, service_subtype: null, object_type: null }, true);
  };

  // Auto-advance für Step 2: Auftragsart (bei Reinigung/Tiefgarage)
  const selectAuftragsart = (auftragsart: AuftragsartType) => {
    updateStateAndAdvance({ order_type: auftragsart }, true);
  };

  // Auto-advance für Hausmeister Objektart
  const selectObjektart = (objektType: ObjektType) => {
    updateStateAndAdvance({ object_type: objektType }, true);
  };

  const calculatePrice = (): { price: number; isMonthly: boolean } => {
    let price = 0;
    const isMonthly = state.order_type === "regelmässig";

    switch (state.service_type) {
      case "reinigung":
        if (state.service_subtype) {
          const factor = preisfaktoren.reinigung[state.service_subtype];
          if (isMonthly) {
            price = state.area_sqm * factor * (state.frequency_per_week / 5) * 4.33;
          } else {
            // Einmalauftrag: Höherer Einzelpreis
            price = state.area_sqm * factor * 1.5;
          }
        }
        break;
      case "tiefgarage":
        if (isMonthly) {
          price = state.parking_spaces * preisfaktoren.tiefgarage * 4;
        } else {
          // Einmalauftrag Tiefgarage
          price = state.parking_spaces * preisfaktoren.tiefgarage * 1.8;
        }
        break;
      case "hausmeister":
        if (state.object_type) {
          price = preisfaktoren.hausmeister[state.object_type] * 4.33;
        }
        break;
      case "winterdienst":
        price = state.area_sqm * preisfaktoren.winterdienst * 12;
        break;
    }

    return { price: Math.round(price), isMonthly };
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
          return state.order_type !== null;
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
      <SEOHead
        title="Service-Konfigurator"
        description="Berechnen Sie Ihren individuellen Richtpreis für Gebäudereinigung, Tiefgaragenreinigung, Hausmeisterservice oder Winterdienst. Unverbindlich und kostenlos."
      />
      <Header />
      <main className="min-h-screen bg-muted/30">
        {/* Breadcrumb */}
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary hover:text-primary/80">Startseite</Link>
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
                    <Link to="/">Zurück zur Startseite</Link>
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
                              <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                  { id: "buero", label: "Büroreinigung", desc: "Regelmäßige Unterhaltsreinigung" },
                                  { id: "glas", label: "Glasreinigung", desc: "Fenster & Glasflächen" },
                                  { id: "grund", label: "Grundreinigung", desc: "Intensive Tiefenreinigung" },
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
                              </div>

                              <div>
                                <Label className="text-base mb-3 block">Art des Auftrags</Label>
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
                                      <p className="text-sm text-muted-foreground">Einmalige Grundreinigung der Tiefgarage</p>
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
                                      <h3 className="font-semibold text-foreground mb-1">Regelmäßige Reinigung</h3>
                                      <p className="text-sm text-muted-foreground">Vierteljährlich oder nach Bedarf</p>
                                    </div>
                                  </button>
                                </div>
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
                                  Zu räumende Fläche: <span className="font-bold text-primary">{state.area_sqm} m²</span>
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
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">
                                {state.order_type === "einmalig" ? "Einmalige Tiefgaragenreinigung" : "Regelmäßige Tiefgaragenreinigung"}
                              </h3>
                              <p className="text-muted-foreground">
                                Reinigung für <span className="font-semibold text-foreground">{state.parking_spaces} Stellplätze</span>
                                {state.order_type === "regelmässig" && " (vierteljährlich empfohlen)"}
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Inklusive Entfernung von Reifenabrieb, Ölflecken und Reinigung der Entwässerungsrinnen.
                              </p>
                            </div>
                          )}

                          {state.service_type === "winterdienst" && (
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">Leistungsumfang</h3>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Schneeräumung inkl. Streudienst</li>
                                <li>• Bereitschaft an allen Wintertagen</li>
                                <li>• Dokumentation aller Einsätze</li>
                              </ul>
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
                            className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-10 mb-8"
                          >
                            <p className="text-sm text-muted-foreground mb-2">
                              {calculatePrice().isMonthly ? "Geschätzter Monatspreis" : "Geschätzter Einmalpreis"}
                            </p>
                            <motion.p
                              className="text-5xl lg:text-6xl font-bold text-primary"
                              initial={{ y: 20 }}
                              animate={{ y: 0 }}
                            >
                              ab {calculatePrice().price.toLocaleString("de-DE")} €
                            </motion.p>
                            <p className="text-sm text-muted-foreground mt-2">
                              zzgl. MwSt. · Richtpreis zur Orientierung
                            </p>
                          </motion.div>
                          <p className="text-muted-foreground max-w-md mx-auto">
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
                            {state.service_type === "reinigung" && `${state.service_subtype === "buero" ? "Büroreinigung" : state.service_subtype === "glas" ? "Glasreinigung" : "Grundreinigung"} (${state.order_type === "einmalig" ? "Einmalauftrag" : "Unterhaltsreinigung"}), ${state.area_sqm} m²${state.order_type === "regelmässig" ? `, ${state.frequency_per_week}x/Woche` : ""}`}
                            {state.service_type === "tiefgarage" && `Tiefgaragenreinigung (${state.order_type === "einmalig" ? "Einmalauftrag" : "Regelmäßig"}), ${state.parking_spaces} Stellplätze`}
                            {state.service_type === "hausmeister" && `Hausmeisterservice für ${state.object_type === "mfh" ? "Mehrfamilienhaus" : state.object_type === "gewerbe" ? "Gewerbeobjekt" : "Privathaus"}`}
                            {state.service_type === "winterdienst" && `Winterdienst, ${state.area_sqm} m²`}
                            {" · "}Richtpreis: ab {calculatePrice().price.toLocaleString("de-DE")} €{calculatePrice().isMonthly ? "/Monat" : " einmalig"}
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
