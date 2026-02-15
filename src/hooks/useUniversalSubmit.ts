"use client";

import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type UniversalFormData = Record<string, unknown>;

type UniversalSubmitOptions = {
  /** Optional: überschreibt den Status, Standard ist "new" */
  status?: string;
};

export type UniversalSubmitResult<T = unknown> = {
  success: boolean;
  data?: T | null;
  error?: string;
};

// Feste Spalten in der tickets-Tabelle, alles andere wandert in additional_data
const STANDARD_KEYS = new Set([
  "customer_name",
  "email",
  "phone",
  "status",
  "company_id",
  "subject",
]);

/**
 * useUniversalSubmit
 *
 * Agnostischer „Postbote“ für die Tabelle `tickets`.
 * - UI definiert beliebige Form-Felder.
 * - Hook trennt Standard-Spalten von dynamischen Feldern.
 * - Standard: customer_name, email, phone, status, company_id, subject.
 * - Rest: wird als JSONB `additional_data` gespeichert.
 * - Explizites Auth/RLS-Handling (401 / permission denied).
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

        // 2) Standard-Felder per Destructuring extrahieren
        const {
          customer_name,
          email,
          phone,
          status,
          company_id: _ignoredCompanyId, // bewusst ignoriert, wir nutzen effectiveCompanyId
          subject,
          ...rest
        } = formData as {
          customer_name?: string;
          email?: string;
          phone?: string;
          status?: string;
          company_id?: string;
          subject?: string;
          [key: string]: unknown;
        };

        // 3) Alle übrigen Felder → additional_data (JSONB)
        const additionalEntries = Object.entries(rest).filter(
          ([key]) => !STANDARD_KEYS.has(key)
        );
        const additional_data =
          additionalEntries.length > 0 ? Object.fromEntries(additionalEntries) : null;

        const row = {
          company_id: effectiveCompanyId,
          customer_name: customer_name ?? null,
          email: email ?? null,
          phone: phone ?? null,
          status: options?.status ?? status ?? "new",
          subject: subject ?? null,
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

