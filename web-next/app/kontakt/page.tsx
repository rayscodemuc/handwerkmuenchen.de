import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { GermanyMap } from "@/components/GermanyMap";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { BadgeRow } from "@/components/BadgeRow";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie uns für Fragen, Angebote oder Beratung – wir sind für Sie da und antworten innerhalb von 24 Stunden.",
  alternates: {
    canonical: "/kontakt",
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: BUSINESS.phoneDisplay || BUSINESS.phone,
    subContent: "Mo-Fr 8:00-18:00 Uhr",
    href: `tel:${BUSINESS.phone}`,
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: BUSINESS.email || "kontakt@example.com",
    subContent: "Antwort innerhalb 24h",
    href: `mailto:${BUSINESS.email || "kontakt@example.com"}`,
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: BUSINESS.address?.street || "Musterstraße 1",
    subContent: `DE-${BUSINESS.address?.zip || "80331"} ${BUSINESS.address?.city || "München"}`,
  },
];

const locations = [
  { name: "München", href: "/standorte/muenchen" },
];

const PROOF_STRIP = ["Rückmeldung in 24h", "Verbindliche Ansprechpartner", "Dokumentierte Kommunikation"];

export default function Kontakt() {
  return (
    <>
        {/* Hero Section – wie Über-uns Hero (ohne Animation) */}
        <section className="relative flex min-h-[420px] items-center bg-[#8AB0AB] py-16 lg:min-h-[480px] lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Kontakt zur Meisterrunde
              </h1>
              <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-white leading-relaxed">
                Sie haben ein Projekt, eine Frage oder möchten ein unverbindliches Gespräch? Schreiben Sie uns –
                wir melden uns in der Regel innerhalb von 24 Stunden.
              </p>
              <div className="mt-6 flex justify-center">
                <BadgeRow items={PROOF_STRIP} theme="dark" />
              </div>
            </div>
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
                accent="brand"
              />

              {/* Contact Info */}
              <div className="rounded-3xl p-8 lg:p-10 bg-card">
                <h2 className="text-2xl font-bold text-[#3E505B]">
                  Kontaktinformationen
                </h2>
                <p className="mt-2 text-[#3E505B]">
                  Erreichen Sie uns auf dem Weg, der Ihnen am besten passt.
                </p>

                <div className="mt-8 space-y-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex items-start gap-4 rounded-2xl bg-surface p-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3E505B]/10 text-[#3E505B]">
                        <info.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3E505B]">{info.title}</h3>
                        {info.href ? (
                          <a href={info.href} className="mt-1 block text-[#3E505B] hover:underline transition-colors">
                            {info.content}
                          </a>
                        ) : (
                          <p className="mt-1 text-[#3E505B]">{info.content}</p>
                        )}
                        <p className="text-sm text-[#3E505B]">{info.subContent}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

    </>
  );
}
