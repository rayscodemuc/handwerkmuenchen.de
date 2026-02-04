import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { useToast } from "@/hooks/use-toast";      

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
    try {
      const sourceUrl = typeof window !== "undefined" ? window.location.href : "";
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          customer_name: `${formData.customer_first_name} ${formData.customer_last_name}`.trim(),
          email: formData.customer_email, 
          phone: formData.customer_phone, 
          message: formData.message,
          service_type: formData.service_type || 'Kontaktanfrage',
          city: formData.city || 'Nicht angegeben',
          form_id: pageName || 'contact_form',
          page_url: typeof window !== "undefined" ? window.location.pathname : "",
          source_url: sourceUrl
        }]);
      if (error) throw error;
      setIsSuccess(true);
      toast({ title: "Erfolg!", description: "Anfrage gesendet." });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Fehler", description: err.message });
    } finally { setIsSubmitting(false); }
  };

  return { 
    formData, errors, isSubmitting, isSuccess, handleChange, handleSubmit, resetForm,
    getSuccessMessage: () => "Wir melden uns in Kürze bei Ihnen.",
    showLocationDropdown: true, showServiceDropdown: true
  };
};