import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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
    const data = formData as InquiryFormFields | CalculatorFormFields;
    const isCalculator = formId === 'calculator_form' || formId === 'service_calculator';
    return {
      ...baseData,
      customer_name: data.customer_name,
      email: data.customer_email,
      phone: data.customer_phone,
      message: data.message || (isCalculator && 'additional_message' in data ? data.additional_message : ''),
      service_type: data.service_type,
      city: 'city' in data ? data.city : undefined,
      additional_data: {
        ...(formId === 'inquiry_form' && 'company_name' in data ? { company_name: data.company_name } : {}),
        ...(formId === 'inquiry_form' && 'privacy_accepted' in data ? { privacy_accepted: data.privacy_accepted } : {}),
        ...(isCalculator && 'service_subtype' in data ? { service_subtype: data.service_subtype } : {}),
        ...(isCalculator && 'object_type' in data ? { object_type: data.object_type } : {}),
        ...(isCalculator && 'order_type' in data ? { order_type: data.order_type } : {}),
        ...(isCalculator && 'area_sqm' in data ? { area_sqm: data.area_sqm } : {}),
        ...(isCalculator && 'parking_spaces' in data ? { parking_spaces: data.parking_spaces } : {}),
        ...(isCalculator && 'frequency_per_week' in data ? { frequency_per_week: data.frequency_per_week } : {}),
        ...(isCalculator && 'estimated_price' in data ? { estimated_price: data.estimated_price } : {}),
        ...(isCalculator && 'is_monthly_price' in data ? { is_monthly_price: data.is_monthly_price } : {}),
        ...(isCalculator && 'additional_message' in data ? { additional_message: data.additional_message } : {}),
      },
    };
  } else if ('company_name' in formData && 'contact_person' in formData) {
    // PartnerFormFields
    const data = formData as PartnerFormFields;
    return {
      ...baseData,
      customer_name: data.contact_person,
      email: data.customer_email,
      phone: data.customer_phone,
      message: data.message || '',
      service_type: data.service_category,
      city: data.region,
      additional_data: {
        company_name: data.company_name,
      },
    };
  } else {
    // Fallback: Alle Daten in additional_data speichern
    return {
      ...baseData,
      customer_name: 'Unbekannt',
      email: 'unknown@example.com',
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
      // Daten für Supabase normalisieren
      const normalizedData = normalizeFormData(formId, formData, metadata);

      // In Supabase speichern
      const { error } = await supabase
        .from('leads')
        .insert([normalizedData]);

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      const submissionData: FormSubmissionData<T> = {
        formData,
        metadata,
      };

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

export interface PartnerFormFields {
  company_name: string;
  contact_person: string;
  customer_email: string;
  customer_phone: string;
  service_category: string;
  region: string;
  message?: string;
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
