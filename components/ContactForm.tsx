"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const locationOptions = [
  { value: "muenchen", label: "München" },
];

export const serviceOptions = [
  { value: "elektrotechnik", label: "Elektrotechnik" },
  { value: "sanitaer_heizung", label: "Sanitär & Heizung" },
  { value: "innenausbau", label: "Innenausbau" },
  { value: "reinigung", label: "Reinigung" },
  { value: "facility", label: "Facility" },
  { value: "komplett", label: "Komplettpaket / Mehrere Leistungen" },
];

export const useContactForm = ({ pageName, presetLocation, presetService }: any = {}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone: "",
    message: "",
    city: presetLocation || "muenchen",
    service_type: presetService || ""
  });

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: null }));
  };

  const resetForm = () => {
    setFormData({
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_phone: "",
      message: "",
      city: presetLocation || "muenchen",
      service_type: ""
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validierung
    const newErrors: any = {};
    if (!formData.customer_first_name) newErrors.customer_first_name = "Vorname ist erforderlich";
    if (!formData.customer_last_name) newErrors.customer_last_name = "Nachname ist erforderlich";
    if (!formData.customer_email) newErrors.customer_email = "E-Mail ist erforderlich";
    if (!formData.message) newErrors.message = "Nachricht ist erforderlich";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const sourceUrl = typeof window !== "undefined" ? window.location.href : "";
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          customer_name: `${formData.customer_first_name} ${formData.customer_last_name}`.trim(),
          email: formData.customer_email, 
          phone: formData.customer_phone, 
          message: formData.message,
          service_type: formData.service_type || 'Kontaktanfrage',
          city: formData.city || 'Nicht angegeben',
          form_id: pageName || 'contact_form',
          page_url: typeof window !== "undefined" ? window.location.pathname : "",
          source_url: sourceUrl
        }]);

      if (error) throw error;

      setIsSuccess(true);
      toast({ title: "Erfolg!", description: "Ihre Nachricht wurde gesendet." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Fehler", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuccessMessage = () => {
    const locationLabel = locationOptions.find(l => l.value === formData.city)?.label;
    const serviceLabel = serviceOptions.find(s => s.value === formData.service_type)?.label;
    
    if (locationLabel && serviceLabel) {
      return `Vielen Dank! Ihr Ansprechpartner für ${serviceLabel} in ${locationLabel} wird sich in Kürze bei Ihnen melden.`;
    }
    if (locationLabel) {
      return `Vielen Dank! Ihr Ansprechpartner in ${locationLabel} wird sich in Kürze bei Ihnen melden.`;
    }
    if (serviceLabel) {
      return `Vielen Dank! Ihr Ansprechpartner für ${serviceLabel} wird sich in Kürze bei Ihnen melden.`;
    }
    return "Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.";
  };

  return { 
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    getSuccessMessage,
    showLocationDropdown: false,
    showServiceDropdown: true
  };
};

interface ContactFormProps {
  className?: string;
  pageName?: string;
  presetLocation?: string;
  presetService?: string;
  variant?: "light" | "dark";
  accent?: "brand";
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
}

export function ContactForm({
  className,
  pageName,
  presetLocation,
  presetService,
  variant = "light",
  accent,
  showTitle = true,
  title = "Nachricht senden",
  subtitle = "Füllen Sie das Formular aus und wir melden uns schnellstmöglich.",
}: ContactFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    getSuccessMessage,
    showLocationDropdown,
    showServiceDropdown,
  } = useContactForm({ pageName, presetLocation, presetService });

  const isDark = variant === "dark";
  const isBrand = accent === "brand";

  // Success State
  if (isSuccess) {
    return (
      <div className={cn("rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10", isDark ? "bg-primary-foreground/10" : "bg-card", className)}>
        <div className="flex flex-col items-center text-center py-6 sm:py-8">
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-full mb-6",
            isDark ? "bg-green-500/20" : "bg-green-100"
          )}>
            <CheckCircle2 className={cn("h-10 w-10", isDark ? "text-green-400" : "text-green-600")} />
          </div>
          <h3 className={cn(
            "text-2xl font-bold",
            isDark ? "text-primary-foreground" : "text-foreground"
          )}>
            Anfrage erfolgreich gesendet!
          </h3>
          <p className={cn(
            "mt-4 text-lg max-w-md",
            isDark ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {getSuccessMessage()}
          </p>
          <button
            onClick={resetForm}
            className={cn(
              "mt-8 flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors",
              isDark 
                ? "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30" 
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            <RotateCcw className="h-4 w-4" />
            Neue Anfrage senden
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = isDark
    ? "bg-white border-white/20 text-foreground placeholder:text-muted-foreground"
    : isBrand
      ? "bg-white border-[#3E505B]/30 text-[#3E505B] placeholder:text-[#3E505B]/50"
      : "bg-white";

  const labelClasses = isDark ? "text-primary-foreground" : isBrand ? "text-[#3E505B]" : "";

  return (
    <div className={cn("rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10", isDark ? "" : "bg-card", className)}>
      {showTitle && (
        <>
          <h2
            className={cn(
              "text-xl sm:text-2xl font-bold",
              isBrand
                ? "text-[#3E505B]"
                : isDark
                  ? "text-primary-foreground"
                  : "text-foreground",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mt-2",
              isBrand
                ? "text-[#3E505B]"
                : isDark
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className={cn("space-y-5 sm:space-y-6", showTitle && "mt-6 sm:mt-8")}>
        {/* Hidden field for page tracking */}
        <input type="hidden" name="pageName" value={pageName || ""} />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={labelClasses}>Vorname *</Label>
            <Input
              id="firstName"
              value={formData.customer_first_name}
              onChange={(e) => handleChange("customer_first_name", e.target.value)}
              placeholder="Max"
              className={cn(inputClasses, errors.customer_first_name && "border-destructive")}
            />
            {errors.customer_first_name && (
              <p className="text-sm text-destructive">{errors.customer_first_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className={labelClasses}>Nachname *</Label>
            <Input
              id="lastName"
              value={formData.customer_last_name}
              onChange={(e) => handleChange("customer_last_name", e.target.value)}
              placeholder="Mustermann"
              className={cn(inputClasses, errors.customer_last_name && "border-destructive")}
            />
            {errors.customer_last_name && (
              <p className="text-sm text-destructive">{errors.customer_last_name}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClasses}>E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.customer_email}
              onChange={(e) => handleChange("customer_email", e.target.value)}
              placeholder="max@beispiel.de"
              className={cn(inputClasses, errors.customer_email && "border-destructive")}
            />
            {errors.customer_email && (
              <p className="text-sm text-destructive">{errors.customer_email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClasses}>Telefon (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => handleChange("customer_phone", e.target.value)}
              placeholder="+49 123 456 789"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Dynamic dropdowns for /kontakt page */}
        {(showLocationDropdown || showServiceDropdown) && (
          <div className="grid gap-6 sm:grid-cols-2">
            {showLocationDropdown && (
              <div className="space-y-2">
                <Label htmlFor="location" className={labelClasses}>Welcher Standort?</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleChange("city", value)}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Standort wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {showServiceDropdown && (
              <div className="space-y-2">
                <Label htmlFor="service" className={labelClasses}>Welches Gewerk?</Label>
                <Select
                  value={formData.service_type}
                  onValueChange={(value) => handleChange("service_type", value)}
                >
                  <SelectTrigger
                    className={
                      isBrand
                        ? "bg-white text-[#3E505B] [&_[data-placeholder]]:text-[#3E505B] border-[#3E505B]/30"
                        : inputClasses
                    }
                  >
                    <SelectValue placeholder="Gewerk wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className={isBrand ? "hover:bg-[#8AB0AB] hover:text-[#3E505B] focus:bg-[#8AB0AB] focus:text-[#3E505B]" : undefined}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="message" className={labelClasses}>Nachricht *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Beschreiben Sie Ihr Anliegen..."
            rows={5}
            className={cn(inputClasses, errors.message && "border-destructive")}
          />
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full text-base font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed",
            isDark
              ? "bg-foreground text-background hover:bg-background hover:text-foreground"
              : isBrand
                ? "bg-[#4C626C] text-white hover:bg-[#8AB0AB] hover:text-[#3E505B]"
                : "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Wird gesendet...
            </span>
          ) : (
            <>
              <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <span>Anfrage senden</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
