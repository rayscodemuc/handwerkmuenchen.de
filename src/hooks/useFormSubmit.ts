import { useToast } from "@/hooks/use-toast";
import { EDGE_FUNCTION_HANDLE_NEW_LEAD } from "@/lib/supabase";

const COMPANY_ID = "d94e4d71-f843-435d-b098-91d066a01253";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface FormMetadata {
  form_id: string;
  page_url: string;
  timestamp: string;
}

export interface FormSubmissionData<T> {
  formData: T;
  metadata: FormMetadata;
}

/**
 * Erstellt Metadaten für Formulareinreichungen
 */
export function createFormMetadata(formId: string): FormMetadata {
  return {
    form_id: formId,
    page_url: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: new Date().toISOString(),
  };
}

/**
 * Gibt die vollständige URL der aktuellen Seite zurück
 */
function getSourceUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

/**
 * Konvertiert verschiedene Formular-Typen in ein einheitliches Format für die Datenbank
 */
function normalizeFormData<T extends object>(
  formId: string,
  formData: T,
  metadata: FormMetadata
): {
  customer_name: string;
  email: string;
  phone?: string;
  message: string;
  service_type?: string;
  city?: string;
  form_id: string;
  page_url: string;
  source_url: string;
  additional_data?: Record<string, any>;
} {
  // Basis-Daten aus Metadaten
  const sourceUrl = getSourceUrl();
  const baseData = {
    form_id: metadata.form_id,
    page_url: metadata.page_url,
    source_url: sourceUrl,
  };

  // Formular-spezifische Normalisierung
  if ('customer_name' in formData) {
    // InquiryFormFields oder CalculatorFormFields
    const data = formData as unknown as InquiryFormFields & Partial<CalculatorFormFields>;
    const isCalculator = formId === 'calculator_form' || formId === 'service_calculator';
    return {
      ...baseData,
      customer_name: data.customer_name,
      email: data.customer_email,
      phone: data.customer_phone,
      message: data.message || (isCalculator && data.additional_message ? data.additional_message : ''),
      service_type: data.service_type,
      city: data.city,
      additional_data: {
        ...(formId === 'inquiry_form' && data.company_name ? { company_name: data.company_name } : {}),
        ...(formId === 'inquiry_form' && data.privacy_accepted !== undefined ? { privacy_accepted: data.privacy_accepted } : {}),
        ...(isCalculator && data.service_subtype ? { service_subtype: data.service_subtype } : {}),
        ...(isCalculator && data.object_type ? { object_type: data.object_type } : {}),
        ...(isCalculator && data.order_type ? { order_type: data.order_type } : {}),
        ...(isCalculator && data.area_sqm ? { area_sqm: data.area_sqm } : {}),
        ...(isCalculator && data.parking_spaces ? { parking_spaces: data.parking_spaces } : {}),
        ...(isCalculator && data.frequency_per_week ? { frequency_per_week: data.frequency_per_week } : {}),
        ...(isCalculator && data.estimated_price ? { estimated_price: data.estimated_price } : {}),
        ...(isCalculator && data.is_monthly_price !== undefined ? { is_monthly_price: data.is_monthly_price } : {}),
        ...(isCalculator && data.additional_message ? { additional_message: data.additional_message } : {}),
      },
    };
  } else {
    // Fallback: Alle Daten in additional_data speichern
    return {
      ...baseData,
      customer_name: 'Unbekannt',
      email: 'unknown@handwerkmuenchen.de',
      message: JSON.stringify(formData),
      additional_data: formData as Record<string, any>,
    };
  }
}

/**
 * Zentrale Formular-Submit-Funktion
 * Speichert Daten in Supabase und zeigt Erfolgsmeldung
 */
export function useFormSubmit() {
  const { toast } = useToast();

  const submitForm = async <T extends object>(
    formId: string,
    formData: T,
    options?: {
      successTitle?: string;
      successDescription?: string;
    }
  ): Promise<{ success: boolean; data?: FormSubmissionData<T> }> => {
    const metadata = createFormMetadata(formId);

    try {
      const normalizedData = normalizeFormData(formId, formData, metadata);
      const address = normalizedData.city?.trim() || "Keine Adresse angegeben";

      if (!EDGE_FUNCTION_HANDLE_NEW_LEAD) {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL fehlt in .env.local.");
      }

      const res = await fetch(EDGE_FUNCTION_HANDLE_NEW_LEAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(SUPABASE_ANON_KEY
            ? {
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              }
            : {}),
        },
        body: JSON.stringify({
          company_id: COMPANY_ID,
          customer_name: normalizedData.customer_name,
          email: normalizedData.email,
          phone: normalizedData.phone || undefined,
          message: normalizedData.message,
          address,
        }),
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result?.success) {
        throw new Error(result?.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      const submissionData: FormSubmissionData<T> = { formData, metadata };

      toast({
        title: options?.successTitle || "Anfrage wurde gesendet",
        description: options?.successDescription || "Wir werden uns in Kürze bei Ihnen melden.",
      });

      return { success: true, data: submissionData };
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Fehler beim Senden",
        description: error.message || "Bitte versuchen Sie es später erneut.",
      });
      return { success: false };
    }
  };

  return { submitForm, createFormMetadata };
}

// Type für Datenbank-kompatible Feldnamen
export interface ContactFormFields {
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  city?: string;
  service_type?: string;
  message: string;
}

export interface InquiryFormFields {
  customer_name: string;
  company_name?: string;
  customer_email: string;
  customer_phone?: string;
  service_type: string;
  message: string;
  privacy_accepted: boolean;
}

export interface CalculatorFormFields {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city: string;
  service_type: string;
  service_subtype?: string;
  object_type?: string;
  order_type?: string;
  area_sqm?: number;
  parking_spaces?: number;
  frequency_per_week?: number;
  estimated_price: number;
  is_monthly_price: boolean;
  additional_message?: string;
}
