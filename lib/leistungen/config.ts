/**
 * Content configs for /leistungen/<slug> pages.
 * One config per Gewerk – unique copy, no duplicate Fließtext between Gewerke.
 */

export type GewerkCtas = {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export type LeistungItem = {
  title: string;
  description: string;
  href: string;
};

export type NetzwerkCard = {
  title: string;
  body: string;
};

export type TeamRole = {
  title: string;
  body: string;
  bullets: string[];
  badge?: string;
  schnittstellenLinks?: Array<{ label: string; href: string }>;
};

export type TeamSection = {
  heading: string;
  subline: string;
  roles: TeamRole[];
};

export type FaqItem = { q: string; a: string };

export type GewerkConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subline: string;
  ctas: GewerkCtas;
  chips: string[];
  leistungenHeading: string;
  leistungenSubline: string;
  leistungen: LeistungItem[];
  netzwerkCards: NetzwerkCard[];
  teamSection: TeamSection;
  faqs: FaqItem[];
  ctaHeading: string;
  ctaSubline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaTrustLine?: string;
};

const NETZWERK_CARDS_SHARED: NetzwerkCard[] = [
  { title: "Feste Betriebe am Tisch", body: "Entscheidungen direkt mit den verantwortlichen Gewerken – ohne Ping-Pong." },
  { title: "Ein Ansprechpartner", body: "Koordination, Termine und Abstimmung laufen über eine Stelle – transparent für Verwaltung und Betrieb." },
  { title: "Dokumentierte Übergabe", body: "Protokoll, Fotos und Maßnahmenliste – damit Betreiberpflichten und Gewährleistung sauber nachweisbar sind." },
];

export const elektrotechnik: GewerkConfig = {
  slug: "elektrotechnik",
  metaTitle: "Elektrotechnik München – E-Check, Wartung & Installation | Meisterrunde",
  metaDescription: "Elektrotechnik für Hausverwaltungen und Gewerbe in München: E-Check, Wartung, Störung, Umbau. Feste Meisterbetriebe, ein Ansprechpartner, saubere Dokumentation.",
  eyebrow: "Elektrotechnik in München",
  h1: "Ein Ansprechpartner. Klare Verantwortung.",
  subline: "Feste Meisterbetriebe im Netzwerk. Keine Subunternehmerkette. Saubere Abstimmung – inklusive Dokumentation, Protokoll und klarer Zuständigkeit für Hausverwaltungen und Gewerbe.",
  ctas: { primary: { label: "Projekt anfragen", href: "/anfrage" }, secondary: { label: "Rückruf anfordern", href: "/kontakt" } },
  chips: ["Feste Meister", "E-Check inkl. Protokoll", "Koordination im Netzwerk", "München & Umland"],
  leistungenHeading: "Elektrotechnik-Leistungen für Hausverwaltungen & Gewerbe",
  leistungenSubline: "Wartung, Störung, Umbau oder Prüfung – wir übernehmen sauber koordiniert und dokumentiert.",
  leistungen: [
    { title: "Wartung & Inspektion", description: "Regelmäßige Prüfung und Wartung Ihrer Anlagen – dokumentiert und fristgerecht.", href: "#leistungen" },
    { title: "Störung & Reparatur", description: "Schnelle Reaktion bei Störungen, klarer Meldeweg und dokumentierte Behebung.", href: "#leistungen" },
    { title: "Elektroprüfung (E-Check)", description: "Vorschriftsmäßige Prüfungen mit Protokoll und Nachweis für Hausverwaltung und Eigentümer.", href: "#leistungen" },
    { title: "Nachrüstungen & Kleinaufträge", description: "Neue Anschlüsse, Anpassungen und Kleinarbeiten im Bestand – planbar und sauber umgesetzt.", href: "#leistungen" },
    { title: "Gebäudeautomation (KNX)", description: "Planung, Programmierung und Inbetriebnahme – sauber dokumentiert für Betrieb und Verwaltung.", href: "#leistungen" },
    { title: "Antriebe & Sonnenschutz", description: "Torantriebe, Rolltore, Schiebetüren und Markisen – Anschluss, Nachrüstung und Instandsetzung.", href: "#leistungen" },
    { title: "E-Mobility & Ladeinfrastruktur", description: "Wallboxen und Ladelösungen für Wohnanlagen und Gewerbe, inkl. Lastenmanagement.", href: "#leistungen" },
    { title: "Sicherheitstechnik", description: "Video, Zutritt, Alarmanlage – abgestimmt auf Ihre Objekte und anbindbar an die Hausverwaltung.", href: "#leistungen" },
    { title: "Beleuchtung & LED", description: "Umrüstung auf LED, Steuerung und Wartung der Beleuchtung in Gemeinschafts- und Gewerbeobjekten.", href: "#leistungen" },
  ],
  netzwerkCards: NETZWERK_CARDS_SHARED,
  teamSection: {
    heading: "Verantwortung & Ansprechpartner",
    subline: "Für Hausverwaltungen und Gewerbe zählt Verlässlichkeit: klare Zuständigkeit, kurze Wege, dokumentierte Übergabe.",
    roles: [
      {
        title: "Koordination im Netzwerk",
        body: "Ein Ansprechpartner für Planung, Abstimmung und Terminierung – damit Projekte ohne Reibung laufen.",
        bullets: ["Ein Ansprechpartner", "Termin- & Schnittstellenkoordination", "Transparente Kommunikation"],
        schnittstellenLinks: [{ label: "Innenausbau", href: "/leistungen/innenausbau" }, { label: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" }],
      },
      {
        title: "Elektromeister – Fachverantwortung",
        body: "Verantwortet Ausführung, Prüfung und Abnahme – inklusive E-Check/Protokoll, wenn erforderlich.",
        bullets: ["Planung & Ausführung", "E-Check inkl. Prüfprotokoll", "Abnahme & Dokumentation"],
        badge: "E-Check",
      },
    ],
  },
  faqs: [
    { q: "Wie schnell bekommen wir eine Rückmeldung?", a: "In der Regel innerhalb von 24 Stunden an Werktagen – bei Störungen schneller nach Lage." },
    { q: "Übernehmt ihr Arbeiten im laufenden Betrieb?", a: "Ja. Wir planen Termine so, dass Betrieb und Mieter möglichst wenig beeinträchtigt werden." },
    { q: "Was umfasst der E-Check – und was erhalten wir?", a: "Prüfung nach abgestimmtem Umfang inklusive Prüfprotokoll und klarer Maßnahmenliste für Verwaltung/Betreiber." },
    { q: "Könnt ihr Mieterwechsel und Kleinaufträge bündeln?", a: "Ja. Wir strukturieren Aufgaben, stimmen Termine ab und liefern eine saubere Dokumentation pro Objekt/Einheit." },
    { q: "Wie läuft die Abstimmung mit Sanitär und Innenausbau?", a: "Über die feste Meisterrunde: kurze Wege, klare Zuständigkeit, keine Subunternehmerkette." },
    { q: "Arbeitet ihr auch im Bestand/Altbau?", a: "Ja. Gerade dort sind saubere Diagnose, Planung und Dokumentation entscheidend – darauf sind wir ausgelegt." },
    { q: "In welchem Gebiet seid ihr unterwegs?", a: "München und Umland – je nach Umfang auch darüber hinaus nach Absprache." },
    { q: "Wie starten wir am schnellsten?", a: "Kurz anfragen mit Objekt/Adresse, grobem Umfang und gewünschtem Zeitfenster – wir melden uns mit den nächsten Schritten." },
  ],
  ctaHeading: "Elektroauftrag anfragen",
  ctaSubline: "Für Hausverwaltungen und Gewerbe: kurze Abstimmung, klare Zuständigkeit, saubere Dokumentation.",
  ctaPrimaryLabel: "Projekt anfragen",
  ctaPrimaryHref: "/anfrage",
  ctaSecondaryLabel: "Rückruf anfordern",
  ctaSecondaryHref: "/kontakt",
  ctaTrustLine: "Antwort in der Regel innerhalb von 24h (werktags) · München & Umland",
};

export const sanitaerHeizung: GewerkConfig = {
  slug: "sanitaer-heizung",
  metaTitle: "Sanitär & Heizung München für Hausverwaltungen & Gewerbe | Meisterrunde",
  metaDescription: "Sanitär- und Heizungstechnik für Hausverwaltungen und Gewerbe in München: Wartung, Legionellenprüfung, hydraulischer Abgleich. Zertifiziert, dokumentiert, ein Ansprechpartner.",
  eyebrow: "Sanitär & Heizung in München",
  h1: "Versorgungssicherheit & Asset-Schutz.",
  subline: "Zertifizierte Wartung und Instandhaltung technischer Gebäudeanlagen. Wir schützen Ihre Assets gegen Systemausfälle und Wasserschäden – ein Ansprechpartner, dokumentierte Abnahme.",
  ctas: { primary: { label: "Projekt anfragen", href: "/anfrage" }, secondary: { label: "Rückruf anfordern", href: "/kontakt" } },
  chips: ["Meisterbetrieb", "TrinkwV / Legionellen", "GU-Abwicklung", "München & Umland"],
  leistungenHeading: "Sanitär & Heizung für Hausverwaltungen & Gewerbe",
  leistungenSubline: "Störung, Wartung oder Umbau im Bestand – wir koordinieren sauber und dokumentieren nachvollziehbar.",
  leistungen: [
    { title: "Störungen & Reparaturen", description: "Schnelle Eingrenzung, saubere Behebung, klare Rückmeldung.", href: "#leistungen" },
    { title: "Wartung & Betreiberpflichten", description: "Planbare Wartung mit Dokumentation – objektbezogen und nachvollziehbar.", href: "#leistungen" },
    { title: "Heizungsanlage – Service & Instandsetzung", description: "Fehleranalyse, Austausch von Komponenten, Optimierung im Bestand.", href: "#leistungen" },
    { title: "Wärmepumpen – Einbindung & Inbetriebnahme", description: "Einbindung, Anschluss und Inbetriebnahme – sauber abgestimmt und dokumentiert.", href: "#leistungen" },
    { title: "Sanitärinstallationen im Bestand", description: "Nachrüstungen und Anpassungen – sauber geplant und dokumentiert.", href: "#leistungen" },
    { title: "Bäder & Sanitärräume (Gewerbe/Objekt)", description: "Teil- oder Komplettmaßnahmen – koordiniert im Netzwerk, sauber übergeben.", href: "#leistungen" },
    { title: "Leitungen, Armaturen & Entwässerung", description: "Austausch, Erweiterung, Instandsetzung – mit klarer Maßnahmenliste.", href: "#leistungen" },
    { title: "Warmwasser & Trinkwasser (Objektbetrieb)", description: "Anpassungen, Instandsetzung, Übergabe/Protokoll nach Umfang.", href: "#leistungen" },
    { title: "Schnittstellenkoordination (Elektro/Innenausbau)", description: "Abgestimmte Termine, klare Zuständigkeit, weniger Reibung.", href: "#leistungen" },
  ],
  netzwerkCards: NETZWERK_CARDS_SHARED,
  teamSection: {
    heading: "Verantwortung & Ansprechpartner",
    subline: "Für Hausverwaltungen und Gewerbe zählt Verlässlichkeit: klare Zuständigkeit, kurze Wege, dokumentierte Abnahme.",
    roles: [
      {
        title: "Koordination im Netzwerk",
        body: "Ein Ansprechpartner für Planung, Wartungsintervalle und Havarie-Eskalation – damit Anlagen sicher laufen.",
        bullets: ["Ein Ansprechpartner", "Wartungsplanung & Betreiberpflichten", "Störungs- und Havariekoordination"],
        schnittstellenLinks: [{ label: "Elektrotechnik", href: "/leistungen/elektrotechnik" }, { label: "Innenausbau", href: "/leistungen/innenausbau" }],
      },
      {
        title: "SHK-Meister – Fachverantwortung",
        body: "Verantwortet Wartung, Prüfungen und Dokumentation – inklusive Betreiberpflichten nach TrinkwV und Legionellen.",
        bullets: ["Planung & Wartung", "Betreiberpflichten (TrinkwV/Legionellen) inkl. Protokoll", "Abnahme & Dokumentation"],
        badge: "TrinkwV",
      },
    ],
  },
  faqs: [
    { q: "Wer haftet bei einem Legionellenbefund?", a: "Der Betreiber – also Eigentümer oder beauftragte Verwaltung. Ohne dokumentierte Prüfungen und Maßnahmen drohen Bußgelder. Unsere lückenlose Dokumentation stellt Ihre Haftungsfreistellung sicher." },
    { q: "Wie hoch ist das Einsparpotenzial durch Effizienz-Audits?", a: "Durch hydraulischen Abgleich, Pumpentausch und optimierte Regelung erreichen wir typischerweise 15–30 % Energieeinsparung. Bei größeren Anlagen amortisiert sich die Investition oft innerhalb von 1–2 Heizperioden." },
    { q: "Wie schnell sind Sie bei einer Havarie vor Ort?", a: "Unser SHK Notdienst B2B garantiert Reaktionszeiten unter 60 Minuten in Ballungsräumen. Nachts und am Wochenende stehen Bereitschaftsteams zur Verfügung." },
    { q: "Können Sie mehrere Standorte betreuen?", a: "Ja. Wir betreuen Portfolios mit vielen Objekten über einen zentralen Rahmenvertrag – einheitliche Prozesse, konsolidiertes Reporting, fester Ansprechpartner." },
    { q: "Was unterscheidet Ihre Wartung von günstigeren Anbietern?", a: "Wir dokumentieren revisionssicher, setzen zertifizierte Techniker ein und übernehmen die volle Gewährleistung. Im Schadensfall sparen Sie sich den Streit mit Versicherung und Handwerker." },
  ],
  ctaHeading: "SHK-Auftrag anfragen",
  ctaSubline: "Für Hausverwaltungen und Gewerbe: kurze Abstimmung, klare Zuständigkeit, dokumentierte Wartung und Prüfung.",
  ctaPrimaryLabel: "Projekt anfragen",
  ctaPrimaryHref: "/anfrage",
  ctaSecondaryLabel: "Rückruf anfordern",
  ctaSecondaryHref: "/kontakt",
  ctaTrustLine: "Antwort in der Regel innerhalb von 24h (werktags) · München & Umland",
};

export const innenausbau: GewerkConfig = {
  slug: "innenausbau",
  metaTitle: "Innenausbau München – Meisterrunde",
  metaDescription: "Innenausbau verantwortet geführt: Maler, Boden, Fliesen, Estrich und Fassade – sauber koordiniert, dokumentiert übergeben in München & Umgebung.",
  eyebrow: "INNENAUSBAU IN MÜNCHEN",
  h1: "Sauber koordiniert. Hochwertig umgesetzt.",
  subline:
    "Maler, Boden, Fliesen, Estrich und Fassade – mit klarer Zuständigkeit, sauberer Koordination und dokumentierter Übergabe.",
  ctas: { primary: { label: "Projekt anfragen", href: "/anfrage" }, secondary: { label: "Projekt anfragen", href: "/anfrage" } },
  chips: [
    "Sanierung & Modernisierung",
    "Spachteltechniken",
    "Designböden (PU/Acryl)",
    "Fliesen · Estrich · Fassade",
  ],
  leistungenHeading: "Innenausbau & Sanierung für Hausverwaltungen & Gewerbe",
  leistungenSubline:
    "Teil- oder Komplettsanierung – mit modernen Oberflächen, sauberen Details und klarer Koordination im Netzwerk.",
  leistungen: [
    {
      title: "Sanierung & Modernisierung",
      description:
        "Teil- oder Komplettsanierung – planbar, sauber koordiniert und dokumentiert.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Malerarbeiten & Spachteltechniken",
      description:
        "Von sauberem Anstrich bis Premium-Finish (z. B. Beton-/Kalk-/Feinputzoptik).",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Designböden (PU/Acryl, fugenlos)",
      description:
        "Moderne, fugenlose Systeme – optional ohne Sockelleisten, robust im Alltag.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Bodenarbeiten (Vinyl/Laminat/Parkett)",
      description:
        "Klassische Bodenbeläge sauber verlegt – mit klarer Übergabe im Objektbetrieb.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Fliesenarbeiten",
      description:
        "Präzise Ausführung in Nass- und Beanspruchungsbereichen, langlebige Details.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Estrich & Untergrund",
      description:
        "Ausgleich, Vorbereitung, Haftung/Tragfähigkeit – damit's langfristig hält.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Fassade & Außenanstrich",
      description:
        "Witterungsbeständig, ordentlich – für Werterhalt und Objektpflege.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Detailausbau & Finish",
      description:
        "Saubere Übergänge, Kanten, Fugen, Anschlüsse – das macht's wirklich „fertig“.",
      href: "/leistungen/innenausbau#kontakt",
    },
    {
      title: "Schnittstellenkoordination (Elektro/SHK)",
      description:
        "Abgestimmte Termine, klare Zuständigkeit – weniger Reibung im Projekt.",
      href: "/leistungen/innenausbau#kontakt",
    },
  ],
  netzwerkCards: NETZWERK_CARDS_SHARED,
  teamSection: {
    heading: "Verantwortung & Team",
    subline: "Innenausbau wird bei uns verantwortlich geführt – mit sauberer Abstimmung zu Elektro und Sanitär.",
    roles: [
      {
        title: "Koordination Ausbaugewerke",
        body: "Ein Plan, klare Übergabepunkte und Abstimmung mit den anderen Gewerken – so vermeiden wir Reibung und Nacharbeiten.",
        bullets: ["Ein Ansprechpartner", "Abstimmung Elektro & Sanitär", "Klare Übergaben"],
        schnittstellenLinks: [{ label: "Elektrotechnik", href: "/leistungen/elektrotechnik" }, { label: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" }],
      },
      {
        title: "Innenausbau-Verantwortung",
        body: "Planung, Koordination und Abnahme aus einer Hand – damit Schnittstellen funktionieren.",
        bullets: ["Planung", "Koordination", "Abnahme"],
      },
    ],
  },
  faqs: [
    {
      q: "Macht ihr auch Komplettsanierungen im Leerstand?",
      a: "Ja – wir übernehmen Teil- bis Komplettsanierungen, koordinieren die Gewerke im Netzwerk und übergeben dokumentiert mit Protokoll und Restpunktliste.",
    },
    {
      q: "Könnt ihr im laufenden Betrieb arbeiten (Büro/Gewerbe)?",
      a: "Ja – wir planen staub- und lärmarme Abläufe, stimmen Zeiten ab und halten Bereiche sauber getrennt, damit der Betrieb weiterlaufen kann.",
    },
    {
      q: "Bietet ihr fugenlose Böden (PU/Acryl) an?",
      a: "Ja – wir setzen moderne Designböden je nach Einsatzbereich um und beraten zur passenden Systemwahl, Belastbarkeit und Pflege.",
    },
    {
      q: "Übernehmt ihr auch Estrich- und Untergrundvorbereitung?",
      a: "Ja – Untergrund ist entscheidend. Wir prüfen, gleichen aus und bereiten so vor, dass der Aufbau langfristig hält.",
    },
    {
      q: "Wie läuft die Abnahme ab?",
      a: "Mit klarer Restpunktliste, Foto-/Dokumentationsumfang nach Projekt und einer sauberen Übergabe – damit Verwaltung und Betreiber Klarheit haben.",
    },
    {
      q: "In welchem Gebiet arbeitet ihr?",
      a: "München und Umland – bei größeren Maßnahmen nach Abstimmung auch darüber hinaus.",
    },
  ],
  ctaHeading: "Innenausbau geplant? Wir klären es kurz und sauber.",
  ctaSubline: "Ein Ansprechpartner, klare Zuständigkeit, dokumentierte Übergabe.",
  ctaPrimaryLabel: "Projekt anfragen",
  ctaPrimaryHref: "/anfrage",
  ctaTrustLine: "München & Umgebung · Antwort in der Regel innerhalb von 24h (werktags)",
};

export const reinigung: GewerkConfig = {
  slug: "reinigung",
  metaTitle: "Reinigung – Unterhaltsreinigung, Büro & Praxis | Meisterrunde",
  metaDescription: "Gebäudereinigung mit dokumentierter Qualität: Unterhalts-, Büro-, Praxis- und Fensterreinigung, Bauend- und Sonderreinigung. Feste Teams, Checklisten, Abnahme. München & Umgebung.",
  eyebrow: "Reinigung München",
  h1: "Sauberkeit schafft Werte.",
  subline: "Unterhalts-, Büro- und Praxisreinigung, Fensterreinigung, Bauend- und Sonderreinigung – mit dokumentierter Qualität und festen Ansprechpartnern.",
  ctas: { primary: { label: "Projekt anfragen", href: "/anfrage" }, secondary: { label: "Anrufen", href: "tel:+491234567890" } },
  chips: ["Feste Teams", "Checklisten & Abnahme", "München & Umgebung", "Dokumentierte Qualität"],
  leistungenHeading: "Unsere Reinigungsleistungen",
  leistungenSubline: "Von Unterhalts- bis Sonderreinigung – Turnus und Umfang passen wir an Ihre Nutzung und Ihr Budget an.",
  leistungen: [
    { title: "Unterhaltsreinigung", description: "Regelmäßige Reinigung nach Vereinbarung – Fluren, Treppen, Gemeinschaftsflächen.", href: "#leistungen" },
    { title: "Büroreinigung", description: "Saubere Büros und Gemeinschaftsflächen, abgestimmt auf Ihre Nutzungszeiten.", href: "#leistungen" },
    { title: "Praxisreinigung", description: "Medizinische und therapeutische Praxen – hygienische Standards und Vorgaben.", href: "#leistungen" },
    { title: "Fensterreinigung", description: "Innen und außen, auch höhere Lagen – sicher und termingerecht.", href: "#leistungen" },
    { title: "Bauendreinigung", description: "Nach Bauabschluss – saubere Übergabe an Nutzer oder Vermieter.", href: "#leistungen" },
    { title: "Grund- und Sonderreinigung", description: "Einmalige Grundreinigung oder Sondereinsätze – z. B. nach Events oder Leerstand.", href: "#leistungen" },
  ],
  netzwerkCards: NETZWERK_CARDS_SHARED,
  teamSection: {
    heading: "Verantwortung & Objektleitung",
    subline: "Objektleitung mit klaren Standards, Meldelogik und dokumentierter Qualitätssicherung.",
    roles: [
      {
        title: "Objektleitung & Ansprechpartner",
        body: "Ein Ansprechpartner für Turnus, Sondereinsätze und Qualitätsfragen – keine anonymen Hotlines.",
        bullets: ["Objektleitung & Ansprechpartner", "Turnus & Sonderwünsche", "Transparente Kommunikation"],
        schnittstellenLinks: [{ label: "Facility & Objektservice", href: "/leistungen/facility" }],
      },
      {
        title: "Qualitätssicherung",
        body: "Checklisten, Abnahme und Protokoll – damit Reinigungsleistung nachweisbar und planbar bleibt.",
        bullets: ["Checklisten pro Objekt", "Definierte Standards & Abnahme", "Protokoll für Sie"],
      },
    ],
  },
  faqs: [
    { q: "In welchem Turnus kann gereinigt werden?", a: "Von täglich über wöchentlich bis zu Sondereinsätzen – wir passen den Rhythmus an Ihre Nutzung und Ihr Budget an." },
    { q: "In welchem Gebiet sind Sie im Einsatz?", a: "Schwerpunkt München und Umgebung. Größere Objekte auch überregional nach Absprache." },
    { q: "Wie läuft die Abrechnung ab?", a: "Monatlich oder quartalsweise, auf Wunsch mit detaillierter Leistungsübersicht. Keine versteckten Kosten." },
    { q: "Stellen Sie das Reinigungsmaterial?", a: "Ja, wir können Material und Maschinen stellen. Auf Wunsch nutzen wir auch Ihre Vorgaben." },
    { q: "Sind kurzfristige Einsätze möglich?", a: "Für Sonderreinigung oder kurzfristige Aufstockung prüfen wir die Kapazität – oft kurzfristig umsetzbar." },
  ],
  ctaHeading: "Reinigung anfragen",
  ctaSubline: "München & Umgebung · Dokumentierte Qualität · Feste Teams.",
  ctaPrimaryLabel: "Projekt anfragen",
  ctaPrimaryHref: "/anfrage",
  ctaSecondaryLabel: "Anrufen",
  ctaSecondaryHref: "tel:+491234567890",
  ctaTrustLine: "München & Umgebung · Antwort in der Regel innerhalb von 24h (werktags)",
};

export const facility: GewerkConfig = {
  slug: "facility",
  metaTitle: "Facility & Objektservice – Hausmeister, Winterdienst, Objektkontrolle | Meisterrunde",
  metaDescription: "Facility Management und Objektservice: Hausmeisterservice, Winterdienst, Objektkontrolle, Außenanlagen. Fester Ansprechpartner, klare Prozesse, Reporting. München & Umgebung.",
  eyebrow: "Facility & Objektservice München",
  h1: "Facility / Objektservice.",
  subline: "Hausmeisterservice, Winterdienst, Objektkontrolle, Außenanlagen – ein Ansprechpartner für den laufenden Betrieb und Werterhalt Ihres Objekts.",
  ctas: { primary: { label: "Projekt anfragen", href: "/anfrage" }, secondary: { label: "Anrufen", href: "tel:+491234567890" } },
  chips: ["Fester Ansprechpartner", "Reporting & Protokolle", "München & Umgebung", "Klare Prozesse"],
  leistungenHeading: "Unsere Facility-Leistungen",
  leistungenSubline: "Vom Hausmeisterservice über Winterdienst bis Objektkontrolle – planbar, dokumentiert, ein Ansprechpartner.",
  leistungen: [
    { title: "Hausmeisterservice", description: "Fester Ansprechpartner vor Ort – Kontrollen, Meldungen, Koordination von Handwerkern.", href: "#leistungen" },
    { title: "Winterdienst", description: "Räum- und Streupflicht nach Vereinbarung – dokumentiert und haftungsbewusst.", href: "#leistungen" },
    { title: "Objektkontrolle", description: "Regelmäßige Begehungen mit Checklisten und Protokoll – Schäden früh erkannt.", href: "#leistungen" },
    { title: "Außenanlagen & Grünpflege", description: "Hof, Wege, Grünflächen – abgestimmte Intervalle und ein Ansprechpartner.", href: "#leistungen" },
    { title: "Koordination von Einsätzen und Handwerkern", description: "Eine Anlaufstelle für Meldungen – wir koordinieren Gewerke und Termine.", href: "#leistungen" },
    { title: "Reporting & Dokumentation", description: "Regelmäßige Berichte und Protokolle – für Sie und den Werterhalt nachvollziehbar.", href: "#leistungen" },
  ],
  netzwerkCards: NETZWERK_CARDS_SHARED,
  teamSection: {
    heading: "Verantwortung & Ansprechpartner",
    subline: "Ein Ansprechpartner für den laufenden Betrieb – Meldungen, Eskalation und Reporting.",
    roles: [
      {
        title: "Objektverantwortung",
        body: "Ein Ansprechpartner für Kontrollen, Meldungen und die Koordination von Handwerkern – bei Notfällen schnelle Eskalation.",
        bullets: ["Fester Ansprechpartner", "Meldungen & Eskalation", "Koordination Handwerker"],
        schnittstellenLinks: [
          { label: "Reinigung", href: "/leistungen/reinigung" },
          { label: "Elektrotechnik", href: "/leistungen/elektrotechnik" },
          { label: "Sanitär & Heizung", href: "/leistungen/sanitaer-heizung" },
        ],
      },
      {
        title: "Reporting & Dokumentation",
        body: "Regelmäßige Berichte und Protokolle – damit Sie den Zustand Ihres Objekts jederzeit im Blick haben.",
        bullets: ["Regelmäßige Berichte", "Protokolle & Checklisten", "Transparenz"],
      },
    ],
  },
  faqs: [
    { q: "Wie schnell reagieren Sie auf Meldungen?", a: "Je nach Vereinbarung – von gleichem Werktag bis zu festen Wochentagen. Dringliche Meldungen priorisieren wir nach Absprache." },
    { q: "Was passiert bei Notfällen (z. B. Wasserschaden)?", a: "Über unsere Prozesse leiten wir schnell an die richtigen Gewerke weiter. Bei Rahmenverträgen sind Reaktionszeiten festgelegt." },
    { q: "In welchem Turnus sind Sie vor Ort?", a: "Von täglicher Präsenz bis zu wöchentlichen oder monatlichen Kontrollen – abgestimmt auf Ihr Objekt und Ihr Budget." },
    { q: "Wie wird abgerechnet?", a: "Pauschalen, Stundensätze oder Mischmodelle – transparent und nach Vereinbarung, in der Regel monatlich oder quartalsweise." },
    { q: "In welchem Einsatzgebiet sind Sie tätig?", a: "Schwerpunkt München und Umgebung. Weitere Gebiete nach Absprache." },
  ],
  ctaHeading: "Facility anfragen",
  ctaSubline: "München & Umgebung · Ein Ansprechpartner · Klare Prozesse.",
  ctaPrimaryLabel: "Projekt anfragen",
  ctaPrimaryHref: "/anfrage",
  ctaSecondaryLabel: "Anrufen",
  ctaSecondaryHref: "tel:+491234567890",
  ctaTrustLine: "München & Umgebung · Antwort in der Regel innerhalb von 24h (werktags)",
};

export const GEWERK_CONFIGS = {
  elektrotechnik,
  sanitaerHeizung,
  innenausbau,
  reinigung,
  facility,
} as const;

export type GewerkSlug = keyof typeof GEWERK_CONFIGS;

/** Gewerke für Secondary-Nav (Header) und Leistungen-Hub-Grid. Ein Eintrag = ein Nav-Item / eine Kachel. */
export const NAV_GEWERKE = [
  { name: "Elektrotechnik", slug: "elektrotechnik" },
  { name: "Sanitär & Heizung", slug: "sanitaer-heizung" },
  { name: "Innenausbau", slug: "innenausbau" },
  { name: "Reinigung & Facility", slug: "reinigung-facility" },
] as const;

// --- Reinigung & Facility Hub (Landing mit 2 Wahlkacheln) ---

export type HubChoiceItem = {
  title: string;
  description: string;
  bullets: string[];
  href: string;
};

export type ReinigungFacilityHubConfig = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subline: string;
  ctas: GewerkCtas;
  chips: string[];
  hubChoices: [HubChoiceItem, HubChoiceItem];
  netzwerkCards: NetzwerkCard[];
  proofBlock: string[];
  faqs: FaqItem[];
  ctaHeading: string;
  ctaSubline: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
};

export const reinigungFacilityHub: ReinigungFacilityHubConfig = {
  slug: "reinigung-facility",
  metaTitle: "Reinigung & Facility in München | Handwerk München",
  metaDescription:
    "Reinigung und Facility Management im Netzwerk – ein Ansprechpartner, klare Verantwortung. Richtpreis berechnen und Anfrage senden.",
  eyebrow: "REINIGUNG & FACILITY IN MÜNCHEN",
  h1: "Planbare Preise. Dokumentierte Qualität.",
  subline: "Reinigung und Facility aus einer Hand – für Hausverwaltungen und Gewerbe.",
  ctas: {
    primary: { label: "Richtpreis berechnen", href: "/rechner?service=reinigung-facility" },
    secondary: { label: "Projekt anfragen", href: "/anfrage" },
  },
  chips: ["Hausverwaltungen & Gewerbe", "Dokumentierte Qualität", "Feste Ansprechpartner"],
  hubChoices: [
    {
      title: "Reinigung",
      description: "Unterhalts-, Büro- und Objekt-Reinigung mit dokumentierter Qualität.",
      bullets: [
        "Unterhaltsreinigung (Büro, Treppenhaus, Objekt)",
        "Grund- & Sonderreinigung",
        "Qualitätskontrolle mit Protokoll",
      ],
      href: "/leistungen/reinigung",
    },
    {
      title: "Facility Management",
      description: "Objektbetreuung mit festen Ansprechpartnern und klarer Koordination.",
      bullets: [
        "Hausmeisterservice & Objektbetreuung",
        "Winterdienst & Außenanlagen",
        "Koordination & feste Ansprechpartner",
      ],
      href: "/leistungen/facility",
    },
  ],
  netzwerkCards: [
    { title: "Feste Verantwortliche", body: "Entscheidungen direkt, keine Schnittstellenkette." },
    { title: "Klare Zuständigkeit", body: "Ein Ansprechpartner, sauber koordiniert." },
    { title: "Dokumentierte Leistung", body: "Protokoll & Fotos, nachvollziehbar." },
  ],
  proofBlock: ["Büro", "Treppenhaus", "Praxis", "Filiale", "Gewerbeeinheit"],
  faqs: [
    {
      q: "Kann ich nur Reinigung oder nur Facility beauftragen?",
      a: "Ja – Sie können Reinigung oder Facility einzeln buchen. Beides aus einer Hand spart Abstimmung und bringt eine klare Ansprechstruktur.",
    },
    {
      q: "Gibt es feste Ansprechpartner pro Objekt?",
      a: "Ja – pro Objekt gibt es feste Verantwortliche. Keine anonymen Hotlines, kurze Wege.",
    },
    {
      q: "Wie wird die Qualität dokumentiert?",
      a: "Über Checklisten, Protokolle und Abnahme. So haben Sie und die Hausverwaltung jederzeit Nachweis und Transparenz.",
    },
    {
      q: "Übernehmt ihr regelmäßige Objektbetreuung?",
      a: "Ja – von täglicher Präsenz bis zu wöchentlichen oder monatlichen Intervallen, abgestimmt auf Ihr Objekt.",
    },
    {
      q: "Wie schnell bekomme ich ein Angebot?",
      a: "In der Regel innerhalb von 24 Stunden an Werktagen – bei konkreter Objektbeschreibung oft schneller.",
    },
  ],
  ctaHeading: "Richtpreis berechnen oder Projekt anfragen",
  ctaSubline: "Ein Ansprechpartner für Reinigung und Facility – München & Umgebung.",
  ctaPrimaryLabel: "Richtpreis berechnen",
  ctaPrimaryHref: "/rechner?service=reinigung-facility",
  ctaSecondaryLabel: "Projekt anfragen",
  ctaSecondaryHref: "/anfrage",
};
