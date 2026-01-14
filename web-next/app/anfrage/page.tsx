"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useFormSubmit, type InquiryFormFields } from "@/hooks/useFormSubmit";
import Link from "next/link";

const FORM_ID = "inquiry_form";

const anfrageSchema = z.object({
  customer_name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  company_name: z.string().trim().max(100).optional(),
  customer_email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  customer_phone: z.string().trim().max(30).optional(),
  service_type: z.string().min(1, "Bitte wählen Sie eine Leistung"),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(2000),
  privacy_accepted: z.boolean().refine((val) => val === true, "Bitte stimmen Sie der Datenschutzerklärung zu"),
});

const serviceOptions = [
  { value: "handwerk", label: "Handwerk (Elektro, Sanitär, Heizung)" },
  { value: "facility", label: "Facility Management" },
  { value: "reinigung", label: "Reinigung" },
  { value: "aussenanlagen", label: "Außenanlagen & Grünpflege" },
  { value: "winterdienst", label: "Winterdienst" },
  { value: "komplett", label: "Komplettpaket / Mehrere Leistungen" },
  { value: "sonstiges", label: "Sonstiges" },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+49 (0)89 25006354",
    href: "tel:+498925006354",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "kontakt@mr-clean-services.de",
    href: "mailto:kontakt@mr-clean-services.de",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "Agnes-Bernauer-Str. 11, 80687 München",
    href: null,
  },
  {
    icon: Clock,
    title: "Erreichbarkeit",
    content: "Mo–Fr: 08:00–18:00 Uhr",
    href: null,
  },
];

export default function Anfrage() {
  const { submitForm } = useFormSubmit();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InquiryFormFields>({
    customer_name: "",
    company_name: "",
    customer_email: "",
    customer_phone: "",
    service_type: "",
    message: "",
    privacy_accepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof InquiryFormFields, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = anfrageSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    await submitForm(FORM_ID, formData, {
      successTitle: "Anfrage erfolgreich gesendet",
      successDescription: "Wir werden uns schnellstmöglich bei Ihnen melden.",
    });
    
    setFormData({
      customer_name: "",
      company_name: "",
      customer_email: "",
      customer_phone: "",
      service_type: "",
      message: "",
      privacy_accepted: false,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Kontakt
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
              Sprechen wir über Ihr Projekt
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Beschreiben Sie uns Ihr Anliegen und wir erstellen Ihnen ein unverbindliches Angebot – 
              schnell, transparent und auf Ihre Bedürfnisse zugeschnitten.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Contact Info Sidebar */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-foreground">
                  Kontaktdaten
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Sie erreichen uns auch direkt per Telefon oder E-Mail.
                </p>

                <div className="mt-10 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Response Note */}
                <div className="mt-10 rounded-2xl bg-primary/5 p-6">
                  <p className="text-sm font-medium text-foreground">
                    Schnelle Reaktionszeit
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Wir antworten in der Regel innerhalb von 24 Stunden auf Ihre Anfrage.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="rounded-3xl bg-card p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-foreground mb-8">
                    Ihre Anfrage
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="customer_name">Name *</Label>
                      <Input
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={(e) => handleChange("customer_name", e.target.value)}
                        placeholder="Max Mustermann"
                        className={errors.customer_name ? "border-destructive" : ""}
                      />
                      {errors.customer_name && (
                        <p className="text-sm text-destructive">{errors.customer_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company_name">Firma (optional)</Label>
                      <Input
                        id="company_name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={(e) => handleChange("company_name", e.target.value)}
                        placeholder="Ihre Firma GmbH"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer_email">E-Mail *</Label>
                      <Input
                        id="customer_email"
                        name="customer_email"
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => handleChange("customer_email", e.target.value)}
                        placeholder="max@beispiel.de"
                        className={errors.customer_email ? "border-destructive" : ""}
                      />
                      {errors.customer_email && (
                        <p className="text-sm text-destructive">{errors.customer_email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer_phone">Telefon (optional)</Label>
                      <Input
                        id="customer_phone"
                        name="customer_phone"
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) => handleChange("customer_phone", e.target.value)}
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="service_type">Gewünschte Leistung *</Label>
                    <Select
                      name="service_type"
                      value={formData.service_type}
                      onValueChange={(value) => handleChange("service_type", value)}
                    >
                      <SelectTrigger className={errors.service_type ? "border-destructive" : ""}>
                        <SelectValue placeholder="Leistung auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service_type && (
                      <p className="text-sm text-destructive">{errors.service_type}</p>
                    )}
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="message">Ihre Nachricht *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Beschreiben Sie Ihr Anliegen, Ihren Bedarf oder Ihre Fragen..."
                      rows={6}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <Checkbox
                      id="privacy_accepted"
                      name="privacy_accepted"
                      checked={formData.privacy_accepted}
                      onCheckedChange={(checked) => handleChange("privacy_accepted", checked === true)}
                      className={errors.privacy_accepted ? "border-destructive" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="privacy_accepted"
                        className="text-sm font-normal text-muted-foreground cursor-pointer"
                      >
                        Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                        <Link href="/datenschutz" className="text-primary hover:underline">
                          Datenschutzerklärung
                        </Link>{" "}
                        zu. *
                      </Label>
                      {errors.privacy_accepted && (
                        <p className="text-sm text-destructive">{errors.privacy_accepted}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary text-primary-foreground text-lg font-semibold transition-all duration-300 hover:bg-foreground hover:text-background hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Wird gesendet...
                        </span>
                      ) : (
                        <>
                          <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          <span>Anfrage absenden</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
