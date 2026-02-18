"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import type { InquiryFormFields } from "@/hooks/useFormSubmit";
import { useUniversalSubmit } from "@/hooks/useUniversalSubmit";
import { DEFAULT_COMPANY_ID } from "@/src/config/businessConfig";
import Link from "next/link";
import { BadgeRow } from "@/components/BadgeRow";
import { BUSINESS } from "@/lib/business";

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
  { value: "elektrotechnik", label: "Elektrotechnik" },
  { value: "sanitaer_heizung", label: "Sanitär & Heizung" },
  { value: "innenausbau", label: "Innenausbau" },
  { value: "reinigung", label: "Reinigung" },
  { value: "facility", label: "Facility" },
  { value: "komplett", label: "Komplettpaket / Mehrere Leistungen" },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: BUSINESS.phoneDisplay || BUSINESS.phone,
    href: `tel:${BUSINESS.phone}`,
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: BUSINESS.email || "info@handwerkmuenchen.de",
    href: `mailto:${BUSINESS.email || "info@handwerkmuenchen.de"}`,
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: `${BUSINESS.address?.street || "Friedrichstraße 11"}, DE-${BUSINESS.address?.zip || "80801"} ${BUSINESS.address?.city || "München"}`,
    href: null,
  },
  {
    icon: Clock,
    title: "Erreichbarkeit",
    content: "Mo–Fr: 08:00–18:00 Uhr",
    href: null,
  },
];

const HERO_PROOF_STRIP = [
  "Rückmeldung in 24h",
  "Verbindliche Ansprechpartner",
  "Dokumentierte Kommunikation",
];

function AnfrageInner() {
  const searchParams = useSearchParams();
  const { submit, loading, success, reset } = useUniversalSubmit();
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

  // Vorauswahl aus URL z. B. /anfrage?bereich=facility
  useEffect(() => {
    const bereich = searchParams.get("bereich");
    if (bereich && serviceOptions.some((o) => o.value === bereich)) {
      setFormData((prev) => ({ ...prev, service_type: bereich }));
    }
  }, [searchParams]);

  const handleChange = (field: keyof InquiryFormFields, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: "",
      company_name: "",
      customer_email: "",
      customer_phone: "",
      service_type: "",
      message: "",
      privacy_accepted: false,
    });
    setErrors({});
    reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationResult = anfrageSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const serviceLabel =
      serviceOptions.find((o) => o.value === formData.service_type)?.label || "Unbekannte Leistung";

    const payload = {
      customer_name: formData.customer_name,
      email: formData.customer_email,
      phone: formData.customer_phone || undefined,
      subject: `Anfrage – ${serviceLabel}`,
      company_name: formData.company_name || undefined,
      service_type: formData.service_type,
      message: formData.message,
      privacy_accepted: formData.privacy_accepted,
      form_id: FORM_ID,
    };

    const submitResult = await submit(payload, DEFAULT_COMPANY_ID);

    if (submitResult.success) {
      setFormData({
        customer_name: "",
        company_name: "",
        customer_email: "",
        customer_phone: "",
        service_type: "",
        message: "",
        privacy_accepted: false,
      });
    }
  };

  return (
    <>
        {/* Hero Section – wie Kontakt-Hero */}
        <section className="relative flex min-h-[420px] items-center bg-[#8AB0AB] py-16 lg:min-h-[480px] lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Sprechen wir über Ihr Projekt
              </h1>
              <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
                Beschreiben Sie uns Ihr Anliegen – wir erstellen Ihnen ein unverbindliches Angebot, schnell,
                transparent und auf Ihre Bedürfnisse zugeschnitten.
              </p>
              <div className="mt-6 flex justify-center">
                <BadgeRow items={HERO_PROOF_STRIP} theme="dark" equalWidthMobile />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Contact Info Sidebar */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-[#3E505B]">
                  Kontaktdaten
                </h2>
                <p className="mt-3 text-[#3E505B]">
                  Sie erreichen uns auch direkt per Telefon oder E-Mail.
                </p>

                <div className="mt-10 space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3E505B]/10">
                        <item.icon className="h-5 w-5 text-[#3E505B]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#3E505B]">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-[#3E505B] hover:text-[#3E505B]/80 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="font-medium text-[#3E505B]">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Response Note */}
                <div className="mt-10 rounded-2xl bg-[#3E505B]/5 p-6">
                  <p className="text-sm font-medium text-[#3E505B]">
                    Schnelle Reaktionszeit
                  </p>
                  <p className="mt-2 text-sm text-[#3E505B]">
                    Wir antworten in der Regel innerhalb von 24 Stunden auf Ihre Anfrage.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {success ? (
                  <div className="rounded-3xl bg-white p-8 lg:p-10 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#3E505B]">
                        Anfrage erfolgreich gesendet!
                      </h3>
                      <p className="mt-4 text-[#3E505B]">
                        Vielen Dank für Ihre Anfrage. Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#3E505B] px-6 py-3 text-white font-medium hover:bg-[#4C626C] transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Neue Anfrage senden
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-3xl bg-[#8AB0AB] p-8 lg:p-10">
                    <h3 className="text-xl font-bold text-white mb-8">
                      Ihre Anfrage
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="customer_name" className="text-white">Name *</Label>
                        <Input
                          id="customer_name"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={(e) => handleChange("customer_name", e.target.value)}
                          placeholder="Max Mustermann"
                          className={`text-[#3E505B] placeholder:text-[#3E505B]/60 ${errors.customer_name ? "border-destructive" : ""}`}
                        />
                        {errors.customer_name && (
                          <p className="text-sm text-destructive">{errors.customer_name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_name" className="text-white">Firma (optional)</Label>
                        <Input
                          id="company_name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={(e) => handleChange("company_name", e.target.value)}
                          placeholder="Ihre Firma GmbH"
                          className="text-[#3E505B] placeholder:text-[#3E505B]/60"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer_email" className="text-white">E-Mail *</Label>
                        <Input
                          id="customer_email"
                          name="customer_email"
                          type="email"
                          value={formData.customer_email}
                          onChange={(e) => handleChange("customer_email", e.target.value)}
                          placeholder="max@beispiel.de"
                          className={`text-[#3E505B] placeholder:text-[#3E505B]/60 ${errors.customer_email ? "border-destructive" : ""}`}
                        />
                        {errors.customer_email && (
                          <p className="text-sm text-destructive">{errors.customer_email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer_phone" className="text-white">Telefon (optional)</Label>
                        <Input
                          id="customer_phone"
                          name="customer_phone"
                          type="tel"
                          value={formData.customer_phone}
                          onChange={(e) => handleChange("customer_phone", e.target.value)}
                          placeholder="+49 123 456789"
                          className="text-[#3E505B] placeholder:text-[#3E505B]/60"
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Label htmlFor="service_type" className="text-white">Gewünschte Leistung *</Label>
                      <Select
                        name="service_type"
                        value={formData.service_type}
                        onValueChange={(value) => handleChange("service_type", value)}
                      >
                        <SelectTrigger className={`text-[#3E505B] [&_[data-placeholder]]:text-[#3E505B] ${errors.service_type ? "border-destructive bg-white" : "bg-white"}`}>
                          <SelectValue placeholder="Leistung auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="hover:bg-[#8AB0AB] hover:text-[#3E505B] focus:bg-[#8AB0AB] focus:text-[#3E505B]"
                            >
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
                      <Label htmlFor="message" className="text-white">Ihre Nachricht *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Beschreiben Sie Ihr Anliegen, Ihren Bedarf oder Ihre Fragen..."
                        rows={6}
                        className={`text-[#3E505B] placeholder:text-[#3E505B]/60 ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    <div className="mt-6 flex itemscenter gap-3">
                      <Checkbox
                        id="privacy_accepted"
                        name="privacy_accepted"
                        checked={formData.privacy_accepted}
                        onCheckedChange={(checked) => handleChange("privacy_accepted", checked === true)}
                        className={`bg-white border-white data-[state=checked]:bg-white data-[state=checked]:text-[#3E505B] ${errors.privacy_accepted ? "border-destructive" : ""}`}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="privacy_accepted"
                          className="text-sm font-normal text-white cursor-pointer"
                        >
                          Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                          <Link href="/datenschutz" className="inline-block rounded-md bg-white px-2 py-0.5 text-[#3E505B] font-medium hover:bg-white/90 hover:underline">
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
                        disabled={loading}
                        className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#3E505B] text-white text-lg font-semibold transition-all duration-300 hover:bg-[#4C626C] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <span className="flex items-center gap-3">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Wird gesendet...
                          </span>
                        ) : (
                          <>
                            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            <span>Anfrage senden</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}

export default function AnfragePage() {
  return (
    <Suspense fallback={null}>
      <AnfrageInner />
    </Suspense>
  );
}
