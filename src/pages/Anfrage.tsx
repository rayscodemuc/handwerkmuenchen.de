import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

const anfrageSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().min(1, "Bitte wählen Sie eine Leistung"),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(2000),
  privacy: z.boolean().refine((val) => val === true, "Bitte stimmen Sie der Datenschutzerklärung zu"),
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
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
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Anfrage erfolgreich gesendet",
      description: "Wir werden uns schnellstmöglich bei Ihnen melden.",
    });
    
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      privacy: false,
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
                <form onSubmit={handleSubmit} className="rounded-3xl bg-surface p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-foreground mb-8">
                    Ihre Anfrage
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Max Mustermann"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Firma (optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        placeholder="Ihre Firma GmbH"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="max@beispiel.de"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="service">Gewünschte Leistung *</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger className={errors.service ? "border-destructive" : ""}>
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
                    {errors.service && (
                      <p className="text-sm text-destructive">{errors.service}</p>
                    )}
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="message">Ihre Nachricht *</Label>
                    <Textarea
                      id="message"
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
                      id="privacy"
                      checked={formData.privacy}
                      onCheckedChange={(checked) => handleChange("privacy", checked === true)}
                      className={errors.privacy ? "border-destructive" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="privacy"
                        className="text-sm font-normal text-muted-foreground cursor-pointer"
                      >
                        Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                        <a href="/datenschutz" className="text-primary hover:underline">
                          Datenschutzerklärung
                        </a>{" "}
                        zu. *
                      </Label>
                      {errors.privacy && (
                        <p className="text-sm text-destructive">{errors.privacy}</p>
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
