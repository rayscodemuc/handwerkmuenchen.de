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
    content: BUSINESS.email || "kontakt@handwerkmuenchen.de",
    subContent: "Antwort innerhalb 24h",
    href: `mailto:${BUSINESS.email || "kontakt@handwerkmuenchen.de"}`,
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: BUSINESS.address?.street || "Musterstraße 1",
    subContent: `DE-${BUSINESS.address?.zip || "80331"} ${BUSINESS.address?.city || "München"}`,
  },
];

const locations = [
  { name: "München", href: "/kontakt" },
];

const PROOF_STRIP = ["Rückmeldung in 24h", "Verbindliche Ansprechpartner", "Dokumentierte Kommunikation"];

export default function Kontakt() {
  return (
    <>
        {/* Hero Section – wie Über-uns Hero (ohne Animation), mobil optimiert */}
        <section className="relative flex min-h-[320px] sm:min-h-[380px] items-center bg-[#26413C] py-10 sm:py-14 lg:min-h-[480px] lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                Kontakt zur Meisterrunde
              </h1>
              <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/95 leading-relaxed text-balance">
                Sie haben ein Projekt, eine Frage oder möchten ein unverbindliches Gespräch? Schreiben Sie uns –
                wir melden uns in der Regel innerhalb von 24 Stunden.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                <BadgeRow items={PROOF_STRIP} theme="dark" className="justify-center" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section – mobil: einspaltig, weniger Abstand */}
        <section className="bg-background py-10 sm:py-14 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Contact Form with dynamic dropdowns */}
              <ContactForm 
                pageName="Kontaktseite"
                title="Nachricht senden"
                subtitle="Wählen Sie Ihren Standort und Ihr Anliegen – wir leiten Sie an den richtigen Ansprechpartner weiter."
                accent="brand"
                className="p-4 sm:p-6 lg:p-10"
              />

              {/* Contact Info – mobil: kompaktere Karten, tappbare Links */}
              <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-10 bg-card">
                <h2 className="text-xl sm:text-2xl font-bold text-[#3E505B]">
                  Kontaktinformationen
                </h2>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#3E505B]">
                  Erreichen Sie uns auf dem Weg, der Ihnen am besten passt.
                </p>

                <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-surface p-4 sm:p-6"
                    >
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#3E505B]/10 text-[#3E505B]">
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[#3E505B] text-sm sm:text-base">{info.title}</h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-0.5 sm:mt-1 block text-[#3E505B] hover:underline transition-colors text-sm sm:text-base break-all"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="mt-0.5 sm:mt-1 text-[#3E505B] text-sm sm:text-base">{info.content}</p>
                        )}
                        <p className="text-xs sm:text-sm text-[#3E505B]/90 mt-0.5">{info.subContent}</p>
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
