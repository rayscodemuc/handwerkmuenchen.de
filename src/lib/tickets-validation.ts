/**
 * Client-seitige Validierung für Ticket-Formulare.
 * Vor dem Senden an POST /api/tickets/create sollten diese Felder geprüft werden.
 */
export type TicketFormErrors = Record<string, string>;

export interface TicketFormValues {
  is_partner?: boolean;
  kunde_name?: string;
  partner_name?: string;
  kontakt_email?: string;
  objekt_adresse?: string;
  beschreibung?: string;
  gewerk?: string;
  status?: string;
}

export function validateTicketForm(data: TicketFormValues): TicketFormErrors {
  const errors: TicketFormErrors = {};
  const isPartner = !!data.is_partner;

  if (isPartner) {
    if (!data.partner_name?.trim()) {
      errors.partner_name = "Partner-Name ist erforderlich.";
    }
    if (!data.kontakt_email?.trim()) {
      errors.kontakt_email = "E-Mail ist erforderlich.";
    }
  } else {
    if (!data.kunde_name?.trim()) {
      errors.kunde_name = "Kundenname ist erforderlich.";
    }
    if (!data.kontakt_email?.trim()) {
      errors.kontakt_email = "E-Mail ist erforderlich.";
    }
  }

  if (!data.objekt_adresse?.trim()) {
    errors.objekt_adresse = "Objektadresse ist erforderlich.";
  }

  return errors;
}

export function hasTicketFormErrors(errors: TicketFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
