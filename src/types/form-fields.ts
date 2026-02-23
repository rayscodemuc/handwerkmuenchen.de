/** Formular-Feldtypen für Anfrage, Kontakt und Rechner */

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
  plz: string;
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

export interface PartnerFormFields {
  company_name: string;
  contact_person: string;
  customer_email: string;
  customer_phone: string;
  service_category: string;
  region: string;
  message?: string;
}
