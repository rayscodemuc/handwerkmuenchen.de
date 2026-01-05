import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Check, Users, TrendingUp, Shield, Handshake, Clock, Award, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const partnerFormSchema = z.object({
  company: z.string().trim().min(1, "Firmenname ist erforderlich").max(100),
  contact: z.string().trim().min(1, "Ansprechpartner ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  phone: z.string().trim().min(1, "Telefonnummer ist erforderlich").max(30),
  category: z.string().min(1, "Bitte wählen Sie einen Bereich"),
  region: z.string().trim().min(1, "Region ist erforderlich").max(100),
  message: z.string().trim().max(1000).optional(),
});

const benefits = [
  {
    icon: TrendingUp,
    title: "Wachstumspotenzial",
    description: "Profitieren Sie von unserem wachsenden Kundenstamm und erschließen Sie neue Geschäftsfelder.",
  },
  {
    icon: Shield,
    title: "Planungssicherheit",
    description: "Langfristige Rahmenverträge sorgen für stabile Auftragslage und kalkulierbare Einnahmen.",
  },
  {
    icon: Users,
    title: "Starkes Netzwerk",
    description: "Werden Sie Teil eines professionellen Partnernetzwerks mit regelmäßigem Erfahrungsaustausch.",
  },
  {
    icon: Clock,
    title: "Pünktliche Zahlung",
    description: "Zuverlässige und schnelle Zahlungsabwicklung – garantiert innerhalb von 14 Tagen.",
  },
  {
    icon: Handshake,
    title: "Faire Partnerschaft",
    description: "Transparente Konditionen und partnerschaftliche Zusammenarbeit auf Augenhöhe.",
  },
  {
    icon: Award,
    title: "Qualitätsstandards",
    description: "Gemeinsame Qualitätsstandards sichern zufriedene Kunden und langfristige Aufträge.",
  },
];

const requirements = [
  "Gewerbeanmeldung und entsprechende Qualifikationen",
  "Haftpflichtversicherung für Ihre Tätigkeit",
  "Zuverlässigkeit und termingerechte Ausführung",
  "Qualitätsbewusstsein und Kundenorientierung",
  "Bereitschaft zur langfristigen Zusammenarbeit",
];

const partnerTypes = [
  {
    title: "Handwerksbetriebe",
    description: "Elektro, Sanitär, Heizung und allgemeine Handwerksleistungen",
  },
  {
    title: "Reinigungsunternehmen",
    description: "Gebäude-, Glas- und Sonderreinigung",
  },
  {
    title: "Garten- und Landschaftsbau",
    description: "Grünpflege, Baumpflege und Außenanlagen",
  },
  {
    title: "Winterdienstleister",
    description: "Schneeräumung und Streudienst",
  },
];

const serviceCategories = [
  { value: "handwerk", label: "Handwerk (Elektro, Sanitär, Heizung)" },
  { value: "reinigung", label: "Reinigung (Gebäude, Glas, Sonder)" },
  { value: "garten", label: "Garten- und Landschaftsbau" },
  { value: "winterdienst", label: "Winterdienst" },
  { value: "facility", label: "Facility Management" },
  { value: "sonstiges", label: "Sonstiges" },
];

export default function PartnerWerden() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    category: "",
    region: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = partnerFormSchema.safeParse(formData);
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
      title: "Bewerbung erfolgreich gesendet",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
    
    setFormData({
      company: "",
      contact: "",
      email: "",
      phone: "",
      category: "",
      region: "",
      message: "",
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
              Partnerschaft
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
              Partner werden
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Werden Sie Teil unseres Partnernetzwerks und profitieren Sie von stabilen Aufträgen, 
              fairen Konditionen und einer partnerschaftlichen Zusammenarbeit.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                Ihre Vorteile als Partner
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Als Partner von Mr.Clean Services profitieren Sie von zahlreichen Vorteilen
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-3xl bg-surface p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types Section */}
        <section className="bg-surface py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  Wen wir suchen
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Wir sind stets auf der Suche nach zuverlässigen Partnern in verschiedenen Bereichen.
                </p>

                <div className="mt-10 space-y-6">
                  {partnerTypes.map((type) => (
                    <div key={type.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{type.title}</h3>
                        <p className="text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-background p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-foreground">
                  Voraussetzungen
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Für eine erfolgreiche Partnerschaft erwarten wir:
                </p>
                <ul className="mt-8 space-y-4">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="bewerbung" className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  Jetzt bewerben
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen
                </p>
              </div>

              <form onSubmit={handleSubmit} className="rounded-3xl bg-surface p-8 lg:p-10">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Firmenname *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Ihre Firma GmbH"
                      className={errors.company ? "border-destructive" : ""}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Ansprechpartner *</Label>
                    <Input
                      id="contact"
                      value={formData.contact}
                      onChange={(e) => handleChange("contact", e.target.value)}
                      placeholder="Max Mustermann"
                      className={errors.contact ? "border-destructive" : ""}
                    />
                    {errors.contact && (
                      <p className="text-sm text-destructive">{errors.contact}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="info@ihre-firma.de"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+49 123 456789"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Tätigkeitsbereich *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                    >
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Bereich auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Einsatzregion *</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleChange("region", e.target.value)}
                      placeholder="z.B. Berlin, Brandenburg"
                      className={errors.region ? "border-destructive" : ""}
                    />
                    {errors.region && (
                      <p className="text-sm text-destructive">{errors.region}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Label htmlFor="message">Nachricht (optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Erzählen Sie uns mehr über Ihr Unternehmen und Ihre Leistungen..."
                    rows={4}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
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
                        <span>Bewerbung absenden</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="mt-6 text-sm text-muted-foreground text-center">
                  Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu. 
                  Ihre Daten werden vertraulich behandelt.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground lg:text-4xl">
              Fragen zur Partnerschaft?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gerne persönlich.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4912345678900"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-medium text-primary transition-colors hover:bg-foreground hover:text-background"
              >
                +49 123 456 789 00
              </a>
              <a 
                href="mailto:partner@mrclean-services.de"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-10 text-base font-medium text-primary-foreground transition-colors hover:bg-white/10"
              >
                partner@mrclean-services.de
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
