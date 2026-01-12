import { BlogServicePageLayout } from "./BlogServicePageLayout";
import { Leaf, Scissors, Flower, TreeDeciduous, Droplets, Calendar, Sun, Shield } from "lucide-react";

export default function Gruenpflege() {
  return (
    <BlogServicePageLayout
      title="Grünpflege"
      subtitle="Außenanlagen"
      categoryName="Außenanlagen"
      categoryHref="/aussenanlagen"
      description="Ganzjährige Grünpflege für Gewerbeimmobilien. Rasenpflege, Heckenschnitt, Beetpflege und saisonale Bepflanzung."
      intro="Gepflegte Grünanlagen werten Ihre Immobilie auf, verbessern das Mikroklima und steigern die Zufriedenheit von Mietern und Mitarbeitern. Unsere ganzjährige Grünpflege umfasst alle Leistungen von der Rasenpflege bis zur professionellen Baumpflege."
      imageSrc=""
      imageAlt="Professionelle Rasenpflege mit Aufsitzmäher auf Gewerbefläche"
      imageCaption="Regelmäßige Rasenpflege für repräsentative Außenanlagen"
      sections={[
        {
          title: "Der Wert gepflegter Grünanlagen",
          content: "Studien belegen: Attraktive Außenanlagen steigern den Immobilienwert um bis zu 15 %. Für Gewerbeimmobilien sind sie Teil des Markenauftritts. Vernachlässigte Grünflächen hingegen signalisieren mangelnde Sorgfalt – mit negativen Folgen für Mieterzufriedenheit und Vermietbarkeit."
        },
        {
          title: "Jahreszeitengerechte Pflege",
          content: "Im Frühjahr bereiten wir Rasenflächen mit Vertikutieren und Düngen vor. Im Sommer steht regelmäßiger Schnitt im Fokus. Der Herbst bringt Laubbeseitigung und Rückschnitte, der Winter Schutzmaßnahmen für empfindliche Pflanzen. Wir planen voraus und agieren proaktiv."
        },
        {
          title: "Bewässerungsmanagement",
          content: "Ob manuelle Bewässerung oder automatische Beregnungsanlage – wir übernehmen Installation, Wartung und saisonale Einstellung. Smarte Systeme mit Bodenfeuchtesensoren sparen bis zu 50 % Wasser gegenüber konventioneller Beregnung."
        }
      ]}
      highlightBox={{
        icon: Calendar,
        title: "Saisonale Bepflanzung",
        text: "Auf Wunsch bepflanzen wir Beete und Kübel saisonal mit Frühjahrs-, Sommer- oder Herbstblühern – für ein ansprechendes Erscheinungsbild zu jeder Jahreszeit."
      }}
      stats={[
        { value: "Wöchentlich", label: "Rasenschnitt" },
        { value: "4 Saisons", label: "Ganzjährig" },
        { value: "50%", label: "Wassereinsparung" }
      ]}
      services={[
        { title: "Rasenpflege", description: "Mähen, Vertikutieren, Düngen, Nachsaat.", icon: Leaf },
        { title: "Heckenschnitt", description: "Form- und Verjüngungsschnitt.", icon: Scissors },
        { title: "Beetpflege", description: "Unkraut, Mulchen, Bepflanzung.", icon: Flower },
        { title: "Baumpflege", description: "Kronenpflege, Totholzentfernung.", icon: TreeDeciduous },
        { title: "Bewässerung", description: "Installation und Wartung von Anlagen.", icon: Droplets },
        { title: "Laubbeseitigung", description: "Herbstlaub von Flächen und Dachrinnen.", icon: Sun }
      ]}
      quote="Gepflegte Grünanlagen sind mehr als Dekoration – sie sind Lebensqualität und Wertsteigerung."
      faqs={[
        { question: "Wie oft sollte der Rasen gemäht werden?", answer: "In der Wachstumssaison empfehlen wir wöchentlichen bis 14-tägigen Schnitt. Die optimale Schnitthöhe liegt bei 4-5 cm." },
        { question: "Übernehmen Sie auch die Bepflanzung?", answer: "Ja, wir planen und realisieren saisonale Bepflanzungen nach Ihren Wünschen oder unseren Gestaltungsvorschlägen." },
        { question: "Was passiert mit dem Grünschnitt?", answer: "Der Grünschnitt wird von uns entsorgt – entweder zur Kompostierung oder zur energetischen Verwertung." },
        { question: "Bieten Sie auch Winterschutz für Pflanzen?", answer: "Ja, wir schützen empfindliche Gehölze und Stauden mit Vlies, Mulch oder anderen Maßnahmen vor Frost." }
      ]}
      relatedLinks={[
        { label: "Alle Außenanlagen-Leistungen", href: "/aussenanlagen" },
        { label: "Baumpflege", href: "/aussenanlagen/baumpflege" },
        { label: "Winterdienst", href: "/aussenanlagen/winterdienst" },
        { label: "München", href: "/standorte/muenchen" },
        { label: "Frankfurt", href: "/standorte/frankfurt" }
      ]}
      keywords={["Grünpflege Gewerbe", "Rasenpflege", "Heckenschnitt", "Gartenpflege", "Außenanlagenpflege"]}
    />
  );
}
