import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+49 123 456 789",
    subContent: "Mo-Fr 8:00-18:00 Uhr",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@mrclean-services.de",
    subContent: "Antwort innerhalb 24h",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "Musterstraße 123",
    subContent: "12345 Berlin",
  },
  {
    icon: Clock,
    title: "Notdienst",
    content: "24/7 erreichbar",
    subContent: "+49 123 456 000",
  },
];

export default function Kontakt() {
  return (
    <div className="theme-contact flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Kontakt
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-primary-foreground lg:text-6xl">
              Sprechen Sie mit uns
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Haben Sie Fragen oder möchten ein unverbindliches Angebot? Wir freuen uns auf Ihre Nachricht.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Contact Form */}
              <div className="rounded-3xl bg-surface p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-foreground">
                  Nachricht senden
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Füllen Sie das Formular aus und wir melden uns schnellstmöglich.
                </p>

                <form className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname</Label>
                      <Input id="firstName" placeholder="Max" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname</Label>
                      <Input id="lastName" placeholder="Mustermann" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input id="email" type="email" placeholder="max@beispiel.de" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon (optional)</Label>
                    <Input id="phone" type="tel" placeholder="+49 123 456 789" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Betreff</Label>
                    <Input id="subject" placeholder="Wie können wir helfen?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      placeholder="Beschreiben Sie Ihr Anliegen..."
                      rows={5}
                    />
                  </div>

                  <AnimatedButton className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-foreground hover:text-background">
                    Nachricht senden
                  </AnimatedButton>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Kontaktinformationen
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Erreichen Sie uns auf dem Weg, der Ihnen am besten passt.
                </p>

                <div className="mt-8 space-y-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex items-start gap-4 rounded-2xl bg-surface p-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <info.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="mt-1 text-foreground">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.subContent}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 aspect-video overflow-hidden rounded-3xl bg-muted">
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    Karte
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
