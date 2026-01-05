import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Check, Users, TrendingUp, Shield, Handshake, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function PartnerWerden() {
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

        {/* CTA Section */}
        <section className="bg-primary py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground lg:text-4xl">
              Jetzt Partner werden
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Interessiert an einer Partnerschaft? Kontaktieren Sie uns für ein unverbindliches 
              Gespräch und erfahren Sie mehr über die Möglichkeiten einer Zusammenarbeit.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <AnimatedButton className="h-14 px-10 text-base bg-white text-primary hover:bg-foreground hover:text-background">
                  Kontakt aufnehmen
                </AnimatedButton>
              </Link>
              <a 
                href="tel:+4912345678900"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-10 text-base font-medium text-primary-foreground transition-colors hover:bg-white/10"
              >
                +49 123 456 789 00
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
