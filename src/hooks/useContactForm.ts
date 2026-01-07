import { useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";

// Ziel-E-Mail für späteres E-Mail-Routing (einfach hier anpassen)
export const EMAIL_CONFIG = {
  defaultEmail: "info@mrclean-services.de",
  locationEmails: {
    muenchen: "muenchen@mrclean-services.de",
    augsburg: "augsburg@mrclean-services.de",
    ingolstadt: "ingolstadt@mrclean-services.de",
    nuernberg: "nuernberg@mrclean-services.de",
    frankfurt: "frankfurt@mrclean-services.de",
    hamburg: "hamburg@mrclean-services.de",
    berlin: "berlin@mrclean-services.de",
  },
  serviceEmails: {
    handwerk: "handwerk@mrclean-services.de",
    reinigung: "reinigung@mrclean-services.de",
    facility: "facility@mrclean-services.de",
    aussenanlagen: "aussenanlagen@mrclean-services.de",
  },
};

export const locationOptions = [
  { value: "muenchen", label: "München" },
  { value: "augsburg", label: "Augsburg" },
  { value: "ingolstadt", label: "Ingolstadt" },
  { value: "nuernberg", label: "Nürnberg" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "hamburg", label: "Hamburg" },
  { value: "berlin", label: "Berlin" },
];

export const serviceOptions = [
  { value: "handwerk", label: "Handwerk (Elektro, Sanitär, Heizung)" },
  { value: "facility", label: "Facility Management" },
  { value: "reinigung", label: "Reinigung" },
  { value: "aussenanlagen", label: "Außenanlagen & Grünpflege" },
];

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Vorname ist erforderlich").max(50),
  lastName: z.string().trim().min(1, "Nachname ist erforderlich").max(50),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().max(30).optional(),
  location: z.string().optional(),
  service: z.string().optional(),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface UseContactFormOptions {
  pageName?: string;
  presetLocation?: string;
  presetService?: string;
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: options.presetLocation || "",
    service: options.presetService || "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Seitenname aus URL ermitteln
  const getPageName = (): string => {
    if (options.pageName) return options.pageName;
    
    const path = location.pathname;
    if (path === "/" || path === "/kontakt") return "Kontaktseite";
    if (path.startsWith("/standorte/")) {
      const city = path.replace("/standorte/", "");
      return `Standort ${city.charAt(0).toUpperCase() + city.slice(1)}`;
    }
    if (path.startsWith("/handwerk")) return "Handwerk";
    if (path.startsWith("/reinigung")) return "Reinigung";
    if (path.startsWith("/facility-management")) return "Facility Management";
    if (path.startsWith("/aussenanlagen")) return "Außenanlagen";
    return path.replace(/\//g, " ").trim() || "Website";
  };

  // E-Mail-Routing basierend auf Standort/Gewerk
  const getTargetEmail = (): string => {
    if (formData.location && EMAIL_CONFIG.locationEmails[formData.location as keyof typeof EMAIL_CONFIG.locationEmails]) {
      return EMAIL_CONFIG.locationEmails[formData.location as keyof typeof EMAIL_CONFIG.locationEmails];
    }
    if (formData.service && EMAIL_CONFIG.serviceEmails[formData.service as keyof typeof EMAIL_CONFIG.serviceEmails]) {
      return EMAIL_CONFIG.serviceEmails[formData.service as keyof typeof EMAIL_CONFIG.serviceEmails];
    }
    return EMAIL_CONFIG.defaultEmail;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Betreff für E-Mail
    const subject = `Neue Anfrage via ${getPageName()}`;
    const targetEmail = getTargetEmail();

    // Daten für späteren API-Call vorbereiten
    const submissionData = {
      ...formData,
      subject,
      targetEmail,
      pageName: getPageName(),
      pageUrl: location.pathname,
      submittedAt: new Date().toISOString(),
    };

    console.log("Form submission data:", submissionData);

    // Simulate form submission (später durch echten API-Call ersetzen)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: options.presetLocation || "",
      service: options.presetService || "",
      message: "",
    });
    setIsSuccess(false);
    setErrors({});
  };

  const getSuccessMessage = () => {
    const locationLabel = locationOptions.find(l => l.value === formData.location)?.label;
    const serviceLabel = serviceOptions.find(s => s.value === formData.service)?.label;
    
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
    getPageName,
    showLocationDropdown: !options.presetLocation,
    showServiceDropdown: !options.presetService,
  };
}
