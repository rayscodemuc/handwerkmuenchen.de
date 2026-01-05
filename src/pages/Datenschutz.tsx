import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
              <p className="text-muted-foreground mb-8">
                Stand: Januar 2025
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">1. Verantwortlicher</h2>
              <p className="text-muted-foreground mb-6">
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-foreground mb-6">
                Mr.Clean Services GmbH<br />
                Musterstraße 123<br />
                12345 Berlin<br />
                E-Mail: datenschutz@mrclean-services.de<br />
                Telefon: +49 123 456 789 00
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="text-muted-foreground mb-6">
                Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. 
                Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete 
                Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und ähnliches. Hierbei handelt 
                es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">3. Kontaktformular</h2>
              <p className="text-muted-foreground mb-6">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben 
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mb-6">
                Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich 
                auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung 
                jederzeit widerrufen.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">4. Ihre Rechte</h2>
              <p className="text-muted-foreground mb-4">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>

              <h2 className="text-2xl font-bold mt-10 mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-6">
                Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem 
                Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver 
                und sicherer zu machen. Einige Cookies sind technisch notwendig, andere werden zur 
                Analyse des Nutzerverhaltens verwendet.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">6. SSL-Verschlüsselung</h2>
              <p className="text-muted-foreground mb-6">
                Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass 
                die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem 
                Schloss-Symbol in Ihrer Browserzeile.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">7. Änderung unserer Datenschutzbestimmungen</h2>
              <p className="text-muted-foreground mb-6">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen 
                rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der 
                Datenschutzerklärung umzusetzen.
              </p>

              <h2 className="text-2xl font-bold mt-10 mb-4">8. Fragen zum Datenschutz</h2>
              <p className="text-muted-foreground mb-6">
                Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an: 
                datenschutz@mrclean-services.de
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
