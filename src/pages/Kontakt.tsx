import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/ContactForm";
import { GermanyMap } from "@/components/GermanyMap";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+49 123 456 789",
    subContent: "Mo-Fr 8:00-18:00 Uhr",
    href: "tel:+49123456789",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@mrclean-services.de",
    subContent: "Antwort innerhalb 24h",
    href: "mailto:info@mrclean-services.de",
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
    href: "tel:+49123456000",
  },
];

const locations = [
  { name: "München", href: "/standorte/muenchen" },
  { name: "Augsburg", href: "/standorte/augsburg" },
  { name: "Ingolstadt", href: "/standorte/ingolstadt" },
  { name: "Nürnberg", href: "/standorte/nuernberg" },
  { name: "Frankfurt", href: "/standorte/frankfurt" },
  { name: "Hamburg", href: "/standorte/hamburg" },
  { name: "Berlin", href: "/standorte/berlin" },
];

export default function Kontakt() {
  return (
    <div className="theme-contact flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[540px] items-center bg-primary lg:min-h-[650px]">
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
              {/* Contact Form with dynamic dropdowns */}
              <ContactForm 
                pageName="Kontaktseite"
                title="Nachricht senden"
                subtitle="Wählen Sie Ihren Standort und Ihr Anliegen – wir leiten Sie an den richtigen Ansprechpartner weiter."
              />

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
                        {info.href ? (
                          <a href={info.href} className="mt-1 block text-foreground hover:text-primary transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="mt-1 text-foreground">{info.content}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{info.subContent}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="mt-8 aspect-video overflow-hidden rounded-3xl bg-muted">
                  <GermanyMap className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Einsatzgebiete Section */}
        <section className="bg-muted/50 py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Bundesweiter Service
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Unsere Einsatzgebiete
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Von der Metropolregion München bis nach Hamburg – wir sind dort, wo Sie uns brauchen.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
              {locations.map((location) => (
                <Link
                  key={location.name}
                  to={location.href}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
                >
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">{location.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}