import { useToast } from "@/hooks/use-toast";

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
 * Zentrale Formular-Submit-Funktion
 * Sammelt alle Daten in einem Objekt und zeigt Erfolgsmeldung
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
  ): Promise<{ success: boolean; data: FormSubmissionData<T> }> => {
    const metadata = createFormMetadata(formId);

    const submissionData: FormSubmissionData<T> = {
      formData,
      metadata,
    };

    // Console.log für Debugging (später durch Supabase-Call ersetzen)
    console.log("Form Submission:", submissionData);

    // Simulierte API-Verzögerung
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: options?.successTitle || "Anfrage wurde gesendet",
      description: options?.successDescription || "Wir werden uns in Kürze bei Ihnen melden.",
    });

    return { success: true, data: submissionData };
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
