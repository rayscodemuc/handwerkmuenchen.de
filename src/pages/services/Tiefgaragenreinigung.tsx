import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Car, Droplets, Trash2, Paintbrush, ArrowDown, Eye, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function Tiefgaragenreinigung() {
  return (
    <BlogServicePageLayout
      title="Tiefgaragenreinigung"
      subtitle="Verkehrssicherheit & Brandschutz für Parkhäuser"
      categoryName="Reinigung"
      categoryHref="/reinigung"
      description="Professionelle Tiefgaragenreinigung für Wohn- und Gewerbeobjekte. Ölfleckentfernung, Entwässerungsreinigung und dokumentierte Verkehrssicherheit."
      intro="Tiefgaragen sind besonderen Belastungen ausgesetzt: Reifenabrieb, Ölflecken, Staub und Ablagerungen setzen Böden und Entwässerung zu. Für Hausverwaltungen und Property Manager ist die regelmäßige Tiefgaragenreinigung nicht nur Optik – sie ist Verkehrssicherungspflicht und Brandschutz. Verstopfte Rinnen führen zu Wasserschäden, Ölflecken zu Rutschgefahr und Brandrisiko."
      imageSrc=""
      imageAlt="Professionelle Tiefgaragenreinigung mit Industriemaschinen"
      imageCaption="Maschinelle Reinigung für sichere und gepflegte Parkflächen"
      sections={[
        {
          title: "Verkehrssicherheit durch saubere Flächen",
          content: "Ölflecken, Reifenabrieb und verblasste Markierungen sind Unfallrisiken und potenzielle Haftungsfallen. Saubere Böden und gut sichtbare Markierungen erhöhen die Sicherheit für Nutzer und reduzieren Ihr Haftungsrisiko als Betreiber. Wir dokumentieren jeden Einsatz mit Fotos und Protokoll."
        },
        {
          title: "Brandschutz durch Entwässerungspflege",
          content: "Verstopfte Entwässerungsrinnen führen zu Wasserstau und begünstigen Korrosion. Ölablagerungen in Rinnen sind ein Brandrisiko. Wir reinigen alle Entwässerungen, entfernen Ablagerungen und prüfen die Funktion – dokumentiert für Brandschutzprüfungen und Versicherungen."
        },
        {
          title: "Flexible Terminierung ohne Betriebsstörung",
          content: "Tiefgaragenreinigung erfolgt bei geringer Belegung – nachts, am frühen Morgen oder am Wochenende. Wir koordinieren mit Ihnen die optimalen Zeitfenster und informieren Nutzer vorab. Der laufende Betrieb wird nicht beeinträchtigt."
        }
      ]}
      highlightBox={{
        icon: Shield,
        title: "Dokumentierte Verkehrssicherheit",
        text: "Jede Reinigung wird mit Fotos, Zeitstempel und Zustandsprotokoll dokumentiert. Sie erfüllen Ihre Verkehrssicherungspflicht nachweisbar – rechtssicher bei Unfällen oder Versicherungsfragen."
      }}
      stats={[
        { value: "2-4x", label: "Pro Jahr empfohlen" },
        { value: "Nachts", label: "Durchführung möglich" },
        { value: "100%", label: "Dokumentiert" }
      ]}
      services={[
        { title: "Maschinelle Reinigung", description: "Scheuersaugmaschinen für große Flächen.", icon: Car },
        { title: "Ölfleckentfernung", description: "Spezialbehandlung für Öl und Kraftstoff.", icon: Droplets },
        { title: "Reifenabrieb-Entfernung", description: "Entfernung hartnäckiger schwarzer Spuren.", icon: Shield },
        { title: "Rinnenreinigung", description: "Freimachen aller Entwässerungen und Abläufe.", icon: ArrowDown },
        { title: "Graffiti-Entfernung", description: "Beseitigung von Wandschmierereien.", icon: Paintbrush },
        { title: "CO-Warnanlage-Check", description: "Sichtprüfung und Reinigung der Sensoren.", icon: AlertTriangle }
      ]}
      quote="Für WEG und Hausverwaltungen erstellen wir Jahrespläne mit festen Terminen – planbare Kosten, die in der Betriebskostenabrechnung transparent darstellbar sind."
      faqs={[
        { 
          question: "Wie oft sollte eine Tiefgarage gereinigt werden?", 
          answer: "Wir empfehlen 2-4 Grundreinigungen pro Jahr, je nach Nutzungsintensität. Bei Objekten mit hoher Frequenz oder starker Verschmutzung auch häufiger. Zusätzlich monatliche Sichtkontrollen." 
        },
        { 
          question: "Wann wird die Reinigung durchgeführt?", 
          answer: "Vorzugsweise nachts, am frühen Morgen oder am Wochenende bei geringer Belegung. Wir koordinieren die Termine mit Ihnen und informieren Nutzer vorab." 
        },
        { 
          question: "Können auch eingetrocknete Ölflecken entfernt werden?", 
          answer: "Ja, mit Spezialverfahren entfernen wir auch ältere, eingetrocknete Öl- und Kraftstoffflecken. Das ist nicht nur optisch wichtig, sondern auch für Brandschutz und Rutschsicherheit." 
        },
        { 
          question: "Erhalten wir Dokumentation für Versicherungen?", 
          answer: "Ja, jede Reinigung wird mit Fotos, Zeitstempel und Zustandsprotokoll dokumentiert. Für WEG-Abrechnungen und Versicherungsnachweise sofort verwendbar." 
        },
        { 
          question: "Werden auch Entwässerungsrinnen gereinigt?", 
          answer: "Ja, die Rinnenreinigung ist Standardbestandteil. Wir entfernen Ablagerungen, prüfen die Funktion und dokumentieren den Zustand – wichtig für Brandschutz und Wasserschadenvermeidung." 
        }
      ]}
      relatedLinks={[
        { label: "Alle Reinigungsleistungen", href: "/reinigung" },
        { label: "Grauflächenreinigung", href: "/aussenanlagen/grauflaechenreinigung" },
        { label: "Grundreinigung", href: "/reinigung/grundreinigung" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Augsburg", href: "/standorte/augsburg" },
        { label: "Ingolstadt", href: "/standorte/ingolstadt" },
        { label: "Frankfurt", href: "/standorte/frankfurt" },
        { label: "Nürnberg", href: "/standorte/nuernberg" },
        { label: "Hamburg", href: "/standorte/hamburg" },
        { label: "Berlin", href: "/standorte/berlin" }
      ]}
      keywords={[
        "Tiefgaragenreinigung",
        "Parkhausreinigung",
        "Ölfleckentfernung",
        "Verkehrssicherungspflicht",
        "Entwässerungsreinigung",
        "Garagenreinigung Gewerbe"
      ]}
      trustBadges={[
        { icon: Shield, label: "Verkehrssicherheit" },
        { icon: Clock, label: "Flexible Termine" },
        { icon: CheckCircle, label: "Dokumentiert" }
      ]}
    />
  );
}
