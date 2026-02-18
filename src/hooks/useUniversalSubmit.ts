"use client";

import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type UniversalFormData = Record<string, unknown>;

type UniversalSubmitOptions = {
  /** Wird ignoriert – DB erlaubt nur status = 'Anfrage'. */
  status?: string;
};

export type UniversalSubmitResult<T = unknown> = {
  success: boolean;
  data?: T | null;
  error?: string;
};

// Keys, die wir aus formData in DB-Spalten mappen (engl. + dt.); Rest → additional_data
const STANDARD_KEYS = new Set([
  "customer_name",
  "kunde_name",
  "email",
  "kontakt_email",
  "phone",
  "kontakt_telefon",
  "status",
  "company_id",
  "subject",
  "message",
  "beschreibung",
  "address",
  "objekt_adresse",
  "city",
  "service_type",
  "gewerk",
]);

/** Mappt service_type aus Formularen zu Gewerk-Namen (DB-kompatibel). */
function mapServiceTypeToGewerk(serviceType: string | undefined | null): string | null {
  if (!serviceType || typeof serviceType !== "string") return null;
  const s = serviceType.trim().toLowerCase();
  const mapping: Record<string, string> = {
    "elektrotechnik": "Elektro",
    "sanitaer_heizung": "Sanitär",
    "sanitär": "Sanitär",
    "sanitaer": "Sanitär",
    "innenausbau": "Ausbau",
    "ausbau": "Ausbau",
    "reinigung": "Reinigung",
    "facility": "Facility",
    // Fallback: wenn schon korrekt formatiert
    "elektro": "Elektro",
  };
  return mapping[s] || (s.charAt(0).toUpperCase() + s.slice(1)); // Fallback: erste Buchstabe groß
}

/** Status-Wert, den die DB akzeptiert (Constraint). Andere Werte führen zu 23514. */
const STATUS_ANFRAGE = "Anfrage";

/**
 * useUniversalSubmit
 *
 * „Postbote“ für die Tabelle `tickets` (deutsches Schema).
 * - Mappt: kunde_name, kontakt_email, kontakt_telefon, objekt_adresse, beschreibung.
 * - status ist fest 'Anfrage' (DB-Constraint).
 * - objekt_adresse darf nicht null sein (Fallback: 'Keine Angabe').
 * - Rest aus formData → additional_data (JSONB).
 */
export function useUniversalSubmit() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setLastError(null);
  }, []);

  const submit = useCallback(
    async <T = any>(
      formData: UniversalFormData,
      companyId: string,
      options?: UniversalSubmitOptions
    ): Promise<UniversalSubmitResult<T>> => {
      setLoading(true);
      setSuccess(false);
      setLastError(null);

      try {
        // 1) company_id ermitteln (Parameter hat Vorrang vor formData.company_id)
        const bodyCompanyId = (formData["company_id"] as string | undefined) ?? undefined;
        const effectiveCompanyId = companyId || bodyCompanyId;

        if (!effectiveCompanyId) {
          throw new Error("company_id fehlt beim Aufruf von useUniversalSubmit.");
        }

        // 2) Werte aus formData (engl. oder dt. Keys) für DB-Spalten
        const raw = formData as Record<string, unknown>;
        const kunde_name =
          (raw["kunde_name"] as string | undefined) ??
          (raw["customer_name"] as string | undefined) ??
          null;
        const kontakt_email =
          (raw["kontakt_email"] as string | undefined) ??
          (raw["email"] as string | undefined) ??
          null;
        const kontakt_telefon =
          (raw["kontakt_telefon"] as string | undefined) ??
          (raw["phone"] as string | undefined) ??
          null;
        const beschreibung =
          (raw["beschreibung"] as string | undefined) ??
          (raw["message"] as string | undefined) ??
          null;
        const objekt_adresse =
          (raw["objekt_adresse"] as string | undefined)?.trim() ||
          (raw["address"] as string | undefined)?.trim() ||
          (raw["city"] as string | undefined)?.trim() ||
          "Keine Angabe";
        
        // Gewerk: aus service_type (gemappt) oder gewerk (als Array für DB-Spalte text[])
        const serviceTypeRaw = raw["service_type"] as string | undefined;
        const gewerkFromServiceType = mapServiceTypeToGewerk(serviceTypeRaw);
        const gewerkRaw = (raw["gewerk"] as string | undefined)?.trim() || gewerkFromServiceType;
        const gewerk = gewerkRaw ? [gewerkRaw] : null;

        // 3) Alle Felder, die nicht in DB-Spalten gehen → additional_data (JSONB)
        const additionalEntries = Object.entries(raw).filter(
          ([key]) => !STANDARD_KEYS.has(key) && key !== "company_id" && key !== "gewerk" && key !== "service_type"
        );
        const additional_data =
          additionalEntries.length > 0 ? Object.fromEntries(additionalEntries) : null;

        const row = {
          company_id: effectiveCompanyId,
          kunde_name,
          kontakt_email,
          kontakt_telefon,
          objekt_adresse,
          beschreibung,
          gewerk,
          status: STATUS_ANFRAGE,
          additional_data,
        };

        // 4) Insert in Tabelle `tickets`
        const { data, error } = await supabase
          .from("tickets")
          .insert(row)
          .select("*")
          .single<T>();

        if (error) {
          // 5) Auth/RLS-spezifische Fehler erkennen
          const isAuthError =
            error.code === "401" ||
            /jwt|token|auth|permission denied/i.test(error.message ?? "");

          console.error("useUniversalSubmit – Supabase Fehler:", error);

          const message = isAuthError
            ? "Authentifizierungs- oder RLS-Fehler (401/permission denied). Bitte Supabase-API-Keys und Policies für `tickets` prüfen."
            : "Die Anfrage konnte nicht gesendet werden.";

          setLastError(message);
          toast({
            variant: "destructive",
            title: "Fehler beim Senden",
            description: message,
          });

          return { success: false, error: message };
        }

        setSuccess(true);
        toast({
          title: "Ticket erstellt",
          description: "Die Anfrage wurde erfolgreich im System gespeichert.",
        });

        return { success: true, data };
      } catch (err: any) {
        console.error("useUniversalSubmit – unerwarteter Fehler:", err);
        const message =
          err?.message ?? "Unbekannter Fehler beim Senden der Anfrage.";
        setLastError(message);
        toast({
          variant: "destructive",
          title: "Fehler beim Senden",
          description: message,
        });
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    submit,
    loading,
    success,
    error: lastError,
    reset,
  };
}

