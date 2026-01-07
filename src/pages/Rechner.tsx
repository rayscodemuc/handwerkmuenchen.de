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

type ServiceType = "reinigung" | "tiefgarage" | "hausmeister" | "winterdienst" | null;
type ReinigungType = "buero" | "glas" | "grund" | null;
type ObjektType = "mfh" | "gewerbe" | "privat" | null;
type AuftragsartType = "einmalig" | "regelmässig" | null;

interface CalculatorState {
  service: ServiceType;
  reinigungType: ReinigungType;
  objektType: ObjektType;
  auftragsart: AuftragsartType;
  stellplaetze: number;
  flaeche: number;
  frequenz: number;
  name: string;
  email: string;
  telefon: string;
  standort: string;
  nachricht: string;
}

const initialState: CalculatorState = {
  service: null,
  reinigungType: null,
  objektType: null,
  auftragsart: null,
  stellplaetze: 50,
  flaeche: 500,
  frequenz: 3,
  name: "",
  email: "",
  telefon: "",
  standort: "",
  nachricht: "",
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
    updateStateAndAdvance({ service, auftragsart: null, reinigungType: null, objektType: null }, true);
  };

  // Auto-advance für Step 2: Auftragsart (bei Reinigung/Tiefgarage)
  const selectAuftragsart = (auftragsart: AuftragsartType) => {
    updateStateAndAdvance({ auftragsart }, true);
  };

  // Auto-advance für Hausmeister Objektart
  const selectObjektart = (objektType: ObjektType) => {
    updateStateAndAdvance({ objektType }, true);
  };

  const calculatePrice = (): { price: number; isMonthly: boolean } => {
    let price = 0;
    const isMonthly = state.auftragsart === "regelmässig";

    switch (state.service) {
      case "reinigung":
        if (state.reinigungType) {
          const factor = preisfaktoren.reinigung[state.reinigungType];
          if (isMonthly) {
            price = state.flaeche * factor * (state.frequenz / 5) * 4.33;
          } else {
            // Einmalauftrag: Höherer Einzelpreis
            price = state.flaeche * factor * 1.5;
          }
        }
        break;
      case "tiefgarage":
        if (isMonthly) {
          price = state.stellplaetze * preisfaktoren.tiefgarage * 4;
        } else {
          // Einmalauftrag Tiefgarage
          price = state.stellplaetze * preisfaktoren.tiefgarage * 1.8;
        }
        break;
      case "hausmeister":
        if (state.objektType) {
          price = preisfaktoren.hausmeister[state.objektType] * 4.33;
        }
        break;
      case "winterdienst":
        price = state.flaeche * preisfaktoren.winterdienst * 12;
        break;
    }

    return { price: Math.round(price), isMonthly };
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return state.service !== null;
      case 2:
        if (state.service === "reinigung") {
          return state.reinigungType !== null && state.auftragsart !== null;
        }
        if (state.service === "tiefgarage") {
          return state.auftragsart !== null;
        }
        if (state.service === "hausmeister") return state.objektType !== null;
        return true;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return (
          state.name.trim() !== "" &&
          state.email.trim() !== "" &&
          state.telefon.trim() !== "" &&
          state.standort !== ""
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    console.log("Rechner-Daten:", { ...state, richtpreis: calculatePrice() });
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
                                  state.service === option.id
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
                            {state.service === "reinigung" && "Welche Art der Reinigung?"}
                            {state.service === "tiefgarage" && "Wie viele Stellplätze?"}
                            {state.service === "hausmeister" && "Welche Art von Objekt?"}
                            {state.service === "winterdienst" && "Fläche angeben"}
                          </h2>

                          {state.service === "reinigung" && (
                            <div className="space-y-6">
                              <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                  { id: "buero", label: "Büroreinigung", desc: "Regelmäßige Unterhaltsreinigung" },
                                  { id: "glas", label: "Glasreinigung", desc: "Fenster & Glasflächen" },
                                  { id: "grund", label: "Grundreinigung", desc: "Intensive Tiefenreinigung" },
                                ].map((type) => (
                                  <button
                                    key={type.id}
                                    onClick={() => updateState({ reinigungType: type.id as ReinigungType })}
                                    className={cn(
                                      "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50",
                                      state.reinigungType === type.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                    )}
                                  >
                                    <h3 className="font-semibold text-foreground mb-1">{type.label}</h3>
                                    <p className="text-sm text-muted-foreground">{type.desc}</p>
                                  </button>
                                ))}
                              </div>

                              {state.reinigungType && (
                                <div>
                                  <Label className="text-base mb-3 block">Art des Auftrags</Label>
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <button
                                      onClick={() => selectAuftragsart("einmalig")}
                                      className={cn(
                                        "p-5 rounded-xl border-2 text-left transition-all hover:border-primary/50 flex items-start gap-4",
                                        state.auftragsart === "einmalig"
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
                                        state.auftragsart === "regelmässig"
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

                          {state.service === "tiefgarage" && (
                            <div className="space-y-6">
                              <div>
                                <Label className="text-base mb-3 block">
                                  Anzahl Stellplätze: <span className="font-bold text-primary">{state.stellplaetze}</span>
                                </Label>
                                <Slider
                                  value={[state.stellplaetze]}
                                  onValueChange={([v]) => updateState({ stellplaetze: v })}
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
                                      state.auftragsart === "einmalig"
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
                                      state.auftragsart === "regelmässig"
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

                          {state.service === "hausmeister" && (
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
                                    state.objektType === type.id
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

                          {state.service === "winterdienst" && (
                            <div className="space-y-6">
                              <div>
                                <Label className="text-base mb-3 block">
                                  Zu räumende Fläche: <span className="font-bold text-primary">{state.flaeche} m²</span>
                                </Label>
                                <Slider
                                  value={[state.flaeche]}
                                  onValueChange={([v]) => updateState({ flaeche: v })}
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

                          {(state.service === "reinigung" || state.service === "hausmeister") && (
                            <div>
                              <Label className="text-base mb-3 block">
                                Fläche: <span className="font-bold text-primary">{state.flaeche} m²</span>
                              </Label>
                              <Slider
                                value={[state.flaeche]}
                                onValueChange={([v]) => updateState({ flaeche: v })}
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

                          {state.service === "reinigung" && state.auftragsart === "regelmässig" && (
                            <div>
                              <Label className="text-base mb-3 block">
                                Reinigungsfrequenz: <span className="font-bold text-primary">{state.frequenz}x pro Woche</span>
                              </Label>
                              <Slider
                                value={[state.frequenz]}
                                onValueChange={([v]) => updateState({ frequenz: v })}
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

                          {state.service === "reinigung" && state.auftragsart === "einmalig" && (
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">Einmalauftrag – {state.reinigungType === "buero" ? "Büroreinigung" : state.reinigungType === "glas" ? "Glasreinigung" : "Grundreinigung"}</h3>
                              <p className="text-muted-foreground">
                                Einmalige {state.reinigungType === "grund" ? "Grundreinigung" : "Reinigung"} für <span className="font-semibold text-foreground">{state.flaeche} m²</span> ohne vertragliche Bindung.
                              </p>
                            </div>
                          )}

                          {state.service === "tiefgarage" && (
                            <div className="bg-muted/50 p-6 rounded-xl">
                              <h3 className="font-semibold mb-2">
                                {state.auftragsart === "einmalig" ? "Einmalige Tiefgaragenreinigung" : "Regelmäßige Tiefgaragenreinigung"}
                              </h3>
                              <p className="text-muted-foreground">
                                Reinigung für <span className="font-semibold text-foreground">{state.stellplaetze} Stellplätze</span>
                                {state.auftragsart === "regelmässig" && " (vierteljährlich empfohlen)"}
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Inklusive Entfernung von Reifenabrieb, Ölflecken und Reinigung der Entwässerungsrinnen.
                              </p>
                            </div>
                          )}

                          {state.service === "winterdienst" && (
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
                              <Label htmlFor="name">Name *</Label>
                              <Input
                                id="name"
                                placeholder="Max Mustermann"
                                value={state.name}
                                onChange={(e) => updateState({ name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefon">Telefon *</Label>
                              <Input
                                id="telefon"
                                type="tel"
                                placeholder="+49 123 456 789"
                                value={state.telefon}
                                onChange={(e) => updateState({ telefon: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">E-Mail *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="max@beispiel.de"
                                value={state.email}
                                onChange={(e) => updateState({ email: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="standort">Gewünschter Standort *</Label>
                              <Select
                                value={state.standort}
                                onValueChange={(v) => updateState({ standort: v })}
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
                            <Label htmlFor="nachricht">Nachricht (optional)</Label>
                            <Input
                              id="nachricht"
                              placeholder="Zusätzliche Informationen zu Ihrem Objekt..."
                              value={state.nachricht}
                              onChange={(e) => updateState({ nachricht: e.target.value })}
                            />
                          </div>
                          <div className="bg-muted/50 p-4 rounded-xl text-sm text-muted-foreground">
                            <strong>Zusammenfassung:</strong>{" "}
                            {state.service === "reinigung" && `${state.reinigungType === "buero" ? "Büroreinigung" : state.reinigungType === "glas" ? "Glasreinigung" : "Grundreinigung"} (${state.auftragsart === "einmalig" ? "Einmalauftrag" : "Unterhaltsreinigung"}), ${state.flaeche} m²${state.auftragsart === "regelmässig" ? `, ${state.frequenz}x/Woche` : ""}`}
                            {state.service === "tiefgarage" && `Tiefgaragenreinigung (${state.auftragsart === "einmalig" ? "Einmalauftrag" : "Regelmäßig"}), ${state.stellplaetze} Stellplätze`}
                            {state.service === "hausmeister" && `Hausmeisterservice für ${state.objektType === "mfh" ? "Mehrfamilienhaus" : state.objektType === "gewerbe" ? "Gewerbeobjekt" : "Privathaus"}`}
                            {state.service === "winterdienst" && `Winterdienst, ${state.flaeche} m²`}
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
                              "Wird gesendet..."
                            ) : (
                              <>
                                Anfrage senden
                                <Send className="h-4 w-4" />
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
