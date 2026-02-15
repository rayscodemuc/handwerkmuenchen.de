import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EDGE_FUNCTION_HANDLE_NEW_LEAD } from "@/lib/supabase";

const COMPANY_ID = "d94e4d71-f843-435d-b098-91d066a01253";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const locationOptions = [
  { value: "muenchen", label: "München" },
  { value: "andere", label: "Andere" }
];

export const serviceOptions = [
  { value: "unterhaltsreinigung", label: "Unterhaltsreinigung" },
  { value: "glasreinigung", label: "Glasreinigung" },
  { value: "bueroreinigung", label: "Büroreinigung" },
  { value: "grundreinigung", label: "Grundreinigung" },
  { value: "andere", label: "Andere" }
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
    city: presetLocation || "",
    service_type: presetService || ""
  });

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: null }));
  };

  const resetForm = () => {
    setFormData({
      customer_first_name: "", customer_last_name: "", customer_email: "",
      customer_phone: "", message: "", city: "", service_type: ""
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const name = `${formData.customer_first_name} ${formData.customer_last_name}`.trim();
    const address = formData.city?.trim()
      ? (locationOptions.find((l) => l.value === formData.city)?.label || formData.city)
      : "Keine Adresse angegeben";
    try {
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
          customer_name: name,
          email: formData.customer_email,
          phone: formData.customer_phone || undefined,
          message: formData.message,
          address,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result?.success) {
        throw new Error(result?.error || "Die Anfrage konnte nicht gesendet werden.");
      }
      setIsSuccess(true);
      toast({ title: "Erfolg!", description: result.message || "Anfrage gesendet." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Fehler", description: err?.message || "Bitte versuchen Sie es später erneut." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, resetForm,
    getSuccessMessage: () => "Wir melden uns in Kürze bei Ihnen.",
    showLocationDropdown: true, showServiceDropdown: true
  };
};
