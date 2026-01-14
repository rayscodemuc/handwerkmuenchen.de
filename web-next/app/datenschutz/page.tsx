import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Calm Design Foundation.",
  alternates: {
    canonical: "/datenschutz",
  },
};

export default function Datenschutz() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-black tracking-tight text-primary-foreground lg:text-5xl">
              Datenschutzerklärung
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="prose prose-lg max-w-4xl text-foreground">

              <h2 className="text-2xl font-bold mt-10 mb-4">1. Allgemeine Hinweise</h2>
              <p className="text-muted-foreground mb-6">
                Der Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. Wir behandeln 
                Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
                sowie dieser Datenschutzerklärung.
              </p>
              <p className="text-muted-foreground mb-6">
                Diese Datenschutzerklärung erläutert, welche Daten wir erheben, wie wir sie verwenden 
                und welche Rechte Ihnen zustehen.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-muted-foreground mb-4">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-foreground mb-6">
                Mr. Clean Services GmbH<br />
                Landsbergerstraße<br />
                81241 München<br />
                Deutschland
              </p>
              <p className="text-foreground mb-6">
                Telefon: +49 (0)89 25006354<br />
                E-Mail: kontakt@mr-clean-services.de<br />
                Website: www.mr-clean-services.de
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">3. Erhebung und Speicherung personenbezogener Daten beim Besuch der Website</h2>
              <p className="text-muted-foreground mb-4">
                Beim Aufrufen unserer Website werden durch den Hosting-Provider automatisch Informationen 
                in sogenannten Server-Logfiles erhoben und gespeichert. Diese Informationen umfassen insbesondere:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>aufgerufene Seite bzw. Datei</li>
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Diese Daten sind technisch erforderlich, um die Website korrekt auszuliefern, und dienen 
                der Sicherstellung eines stabilen und sicheren Betriebs der Website.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">Rechtsgrundlage:</strong><br />
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">4. Kontaktaufnahme per E-Mail oder Kontaktformular</h2>
              <p className="text-muted-foreground mb-6">
                Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden Ihre Angaben 
                einschließlich der von Ihnen angegebenen Kontaktdaten gespeichert, um Ihre Anfrage zu 
                bearbeiten und mögliche Anschlussfragen zu beantworten.
              </p>
              <p className="text-muted-foreground mb-6">
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">Rechtsgrundlage:</strong><br />
                Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertragserfüllung)
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-6">
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät 
                gespeichert werden und keine Schäden verursachen.
              </p>
              <p className="text-muted-foreground mb-6">
                Wir verwenden ausschließlich technisch notwendige Cookies, die für den Betrieb der Website 
                erforderlich sind. Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">Rechtsgrundlage:</strong><br />
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">6. Hosting</h2>
              <p className="text-muted-foreground mb-6">
                Diese Website wird bei einem externen Hosting-Dienstleister betrieben. Personenbezogene Daten 
                werden nur in dem Umfang verarbeitet, der für den technischen Betrieb und die Bereitstellung 
                der Website erforderlich ist.
              </p>
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">Rechtsgrundlage:</strong><br />
                Art. 6 Abs. 1 lit. f DSGVO
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">7. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-muted-foreground mb-6">
                Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, 
                dass die Adresszeile des Browsers mit „https://" beginnt.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">8. Ihre Rechte als betroffene Person</h2>
              <p className="text-muted-foreground mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten</li>
                <li>Berichtigung unrichtiger oder unvollständiger Daten</li>
                <li>Löschung Ihrer gespeicherten Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten</li>
              </ul>
              <p className="text-muted-foreground mb-6">
                Zur Wahrnehmung Ihrer Rechte genügt eine formlose Mitteilung an die oben genannte Kontaktadresse.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">9. Widerruf Ihrer Einwilligung</h2>
              <p className="text-muted-foreground mb-6">
                Sofern die Verarbeitung Ihrer personenbezogenen Daten auf einer Einwilligung beruht, können 
                Sie diese Einwilligung jederzeit widerrufen. Der Widerruf berührt nicht die Rechtmäßigkeit 
                der bis zum Widerruf erfolgten Verarbeitung.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">10. Beschwerderecht bei der Aufsichtsbehörde</h2>
              <p className="text-muted-foreground mb-6">
                Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei der zuständigen 
                Datenschutzaufsichtsbehörde zu. Zuständig ist in der Regel der Datenschutzbeauftragte des 
                Bundeslandes, in dem unser Unternehmen seinen Sitz hat.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">11. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="text-muted-foreground mb-6">
                Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website 
                oder aufgrund geänderter gesetzlicher Vorgaben kann eine Anpassung erforderlich werden.
              </p>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
