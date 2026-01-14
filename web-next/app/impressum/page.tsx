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
        <section className="bg-primary py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-black tracking-tight text-primary-foreground lg:text-5xl">
              Impressum
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="prose prose-lg max-w-4xl text-foreground">
              
              <h2 className="text-2xl font-bold mt-10 mb-4">Angaben gemäß § 5 DDG</h2>
              <p className="text-foreground mb-6">
                Mr Clean Services GmbH<br />
                Landsbergerstr. 456 RGB<br />
                DE-81241 München
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Vertreten durch</h2>
              <p className="text-foreground mb-6">
                Firat Emre Mutluer
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Kontakt</h2>
              <p className="text-foreground mb-6">
                Telefon: +49 (0)89 25006355<br />
                E-Mail: kontakt@mr-clean.services
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Registereintrag</h2>
              <p className="text-foreground mb-6">
                Eintragung im Handelsregister<br />
                Registergericht: München<br />
                Registernummer: HRB260913
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-foreground mb-6">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                DE336495598
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
                  className="text-primary hover:underline ml-1"
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

              <h2 className="text-2xl font-bold mt-10 mb-4">Urheberrecht</h2>
              <p className="text-muted-foreground mb-6">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                des jeweiligen Autors bzw. Erstellers.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">Datenschutz</h2>
              <p className="text-muted-foreground mb-6">
                Informationen zum Umgang mit Ihren personenbezogenen Daten finden Sie in unserer{" "}
                <Link 
                  href="/datenschutz"
                  className="text-primary hover:underline"
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
