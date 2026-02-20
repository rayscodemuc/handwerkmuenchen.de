import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der Calm Design Foundation.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function Impressum() {
  return (
    <>
        {/* Hero Section */}
        <section className="relative flex min-h-[320px] sm:min-h-[380px] items-center bg-[#26413C] py-10 sm:py-14 lg:min-h-[480px] lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl text-balance">
                Impressum
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-10 sm:py-14 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-4xl mx-auto text-foreground">
              
              <h2 className="text-2xl font-bold mt-10 mb-4 first:mt-0">Anbieter</h2>
              <p className="text-foreground mb-6">
                handwerkmuenchen.de<br />
                <br />
                Friedrichstraße 11<br />
                80801 München
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Vertreten durch</h2>
              <p className="text-foreground mb-6">
                Eray Özcan
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Kontakt</h2>
              <p className="text-foreground mb-6">
                E-Mail: info@handwerkmuenchen.de<br />
                <br />
                Formular: <Link href="/kontakt" className="text-accent hover:underline">www.handwerkmuenchen.de/kontakt</Link>
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-foreground mb-6">
                DE356953827
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p className="text-muted-foreground mb-6">
                Wir nehmen nicht an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil 
                und sind dazu auch nicht verpflichtet.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">EU-Streitschlichtung</h2>
              <p className="text-muted-foreground mb-6">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Haftung für Inhalte</h2>
              <p className="text-muted-foreground mb-6">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach 
                den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
                jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
                oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground mb-6">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss 
                haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte 
                der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Urheberrechtshinweis</h2>
              <p className="text-muted-foreground mb-6">
                Die auf unserer Internetseite vorhandenen Texte, Bilder, Fotos, Videos oder Grafiken unterliegen 
                in der Regel dem Schutz des Urheberrechts. Jede unberechtigte Verwendung (insbesondere die 
                Vervielfältigung, Bearbeitung oder Verbreitung) dieser urheberrechtsgeschützten Inhalte ist daher 
                untersagt. Wenn Sie beabsichtigen, diese Inhalte oder Teile davon zu verwenden, kontaktieren Sie 
                uns bitte im Voraus unter den oben stehenden Angaben. Soweit wir nicht selbst Inhaber der 
                benötigten urheberrechtlichen Nutzungsrechte sein sollten, bemühen wir uns, einen Kontakt zum 
                Berechtigten zu vermitteln.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Datenschutz</h2>
              <p className="text-muted-foreground mb-6">
                Informationen zum Umgang mit Ihren personenbezogenen Daten finden Sie in unserer{" "}
                <Link 
                  href="/datenschutz"
                  className="text-accent hover:underline"
                >
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
