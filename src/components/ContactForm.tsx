import { Send, CheckCircle2, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContactForm, locationOptions, serviceOptions, ContactFormData } from "@/hooks/useContactForm";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
  pageName?: string;
  presetLocation?: string;
  presetService?: string;
  variant?: "light" | "dark";
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

  // Success State
  if (isSuccess) {
    return (
      <div className={cn("rounded-3xl p-8 lg:p-10", isDark ? "bg-primary-foreground/10" : "bg-surface", className)}>
        <div className="flex flex-col items-center text-center py-8">
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
            Neue Anfrage stellen
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = isDark
    ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
    : "";

  const labelClasses = isDark ? "text-primary-foreground" : "";

  return (
    <div className={cn("rounded-3xl p-8 lg:p-10", isDark ? "" : "bg-surface", className)}>
      {showTitle && (
        <>
          <h2 className={cn("text-2xl font-bold", isDark ? "text-primary-foreground" : "text-foreground")}>
            {title}
          </h2>
          <p className={cn("mt-2", isDark ? "text-primary-foreground/80" : "text-muted-foreground")}>
            {subtitle}
          </p>
        </>
      )}

      <form onSubmit={handleSubmit} className={cn("space-y-6", showTitle && "mt-8")}>
        {/* Hidden field for page tracking */}
        <input type="hidden" name="pageName" value={pageName || ""} />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className={labelClasses}>Vorname *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Max"
              className={cn(inputClasses, errors.firstName && "border-destructive")}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className={labelClasses}>Nachname *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Mustermann"
              className={cn(inputClasses, errors.lastName && "border-destructive")}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className={labelClasses}>E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="max@beispiel.de"
              className={cn(inputClasses, errors.email && "border-destructive")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClasses}>Telefon (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
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
                  value={formData.location}
                  onValueChange={(value) => handleChange("location", value)}
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
                  value={formData.service}
                  onValueChange={(value) => handleChange("service", value)}
                >
                  <SelectTrigger className={inputClasses}>
                    <SelectValue placeholder="Gewerk wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
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
              : "bg-primary text-primary-foreground hover:bg-foreground hover:text-background"
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
              <span>Nachricht senden</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
