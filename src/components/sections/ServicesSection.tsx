import { useState, useCallback, useEffect } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import heroFacility from "@/assets/hero-facility.jpg";

const tabs = [
  { id: "handwerk", label: "Handwerk" },
  { id: "facility", label: "Facility Management" },
  { id: "reinigung", label: "Reinigung" },
  { id: "aussen", label: "Außenanlagen" },
];

const tabContent = {
  handwerk: [
    {
      title: "Elektrotechnik",
      description: "Rechtssichere Prüfung nach DGUV V3.",
      buttonText: "Mehr erfahren",
      href: "/handwerk/elektrotechnik",
      image: heroFacility,
    },
    {
      title: "Sanitär & Heizung",
      description: "Wartung & 24/7 Notdienst.",
      buttonText: "Mehr erfahren",
      href: "/handwerk/sanitaer-heizung",
      image: heroFacility,
    },
    {
      title: "Service & Wartung",
      description: "Regelmäßige Instandhaltung für Ihre Anlagen.",
      buttonText: "Mehr erfahren",
      href: "/handwerk/service-wartung",
      image: heroFacility,
    },
  ],
  facility: [
    {
      title: "Hausmeisterservice",
      description: "Präsenz und Kontrolle vor Ort.",
      buttonText: "Mehr erfahren",
      href: "/facility-management/hausmeisterservice",
      image: heroFacility,
    },
    {
      title: "Winterdienst",
      description: "100% Haftungsübernahme bei Eis & Schnee.",
      buttonText: "Mehr erfahren",
      href: "/facility-management/winterdienst",
      image: heroFacility,
    },
    {
      title: "Objektmanagement",
      description: "Strategische Werterhaltung.",
      buttonText: "Mehr erfahren",
      href: "/facility-management/objektmanagement",
      image: heroFacility,
    },
  ],
  reinigung: [
    {
      title: "Unterhaltsreinigung",
      description: "Präzise Sauberkeit für Büros.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/unterhaltsreinigung",
      image: heroFacility,
    },
    {
      title: "Büroreinigung",
      description: "Professionelle Reinigung für Arbeitsplätze.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/bueroreinigung",
      image: heroFacility,
    },
    {
      title: "Fensterreinigung",
      description: "Strahlend saubere Glasflächen.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/fensterreinigung",
      image: heroFacility,
    },
    {
      title: "Sonderreinigung",
      description: "Tiefenpflege nach Bedarf.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/sonderreinigung",
      image: heroFacility,
    },
    {
      title: "Tiefgaragenreinigung",
      description: "Gründliche Reinigung für Tiefgaragen.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/tiefgaragenreinigung",
      image: heroFacility,
    },
    {
      title: "Grundreinigung",
      description: "Intensive Reinigung für hartnäckige Verschmutzungen.",
      buttonText: "Mehr erfahren",
      href: "/reinigung/grundreinigung",
      image: heroFacility,
    },
  ],
  aussen: [
    {
      title: "Grünpflege",
      description: "Professioneller Rasen- & Heckenschnitt.",
      buttonText: "Mehr erfahren",
      href: "/aussenanlagen/gruenpflege",
      image: heroFacility,
    },
    {
      title: "Baumpflege",
      description: "Verkehrssicherheit und Ästhetik.",
      buttonText: "Mehr erfahren",
      href: "/aussenanlagen/baumpflege",
      image: heroFacility,
    },
    {
      title: "Grauflächenreinigung",
      description: "Saubere Parkplätze & Wege.",
      buttonText: "Mehr erfahren",
      href: "/aussenanlagen/grauflaechenreinigung",
      image: heroFacility,
    },
  ],
};

export function ServicesSection() {
  const [activeTab, setActiveTab] = useState("handwerk");
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const currentContent = tabContent[activeTab as keyof typeof tabContent];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset carousel when tab changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      emblaApi.reInit();
    }
  }, [activeTab, emblaApi]);

  return (
    <section id="services" className="bg-background py-28 lg:py-36">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-foreground lg:text-5xl xl:text-6xl">
            Unsere Leistungen
          </h2>
          <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
            Wir bieten Ihnen maßgeschneiderte Lösungen für alle Bereiche des Facility Managements.
          </p>
        </div>

        {/* Tab Selector - Pill Style */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full bg-muted p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 lg:px-8 lg:text-base ${
                  activeTab === tab.id
                    ? "bg-foreground text-background shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="mt-10 flex items-center justify-end gap-2">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Service Cards Carousel */}
        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {currentContent.map((service, index) => (
              <div
                key={`${activeTab}-${index}`}
                className="group flex min-w-0 flex-[0_0_100%] flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:shadow-xl md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                {/* Content */}
                <div className="flex flex-1 flex-col p-8 lg:p-10">
                  <h3 className="text-2xl font-black text-foreground lg:text-3xl">{service.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-8">
                    <Link to={service.href}>
                      <AnimatedButton className="h-12 px-6">{service.buttonText}</AnimatedButton>
                    </Link>
                  </div>
                </div>

                {/* Image with decorative background */}
                <div className="relative h-56 overflow-hidden">
                  {/* Decorative curved shapes */}
                  <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-primary/20" />
                  <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-primary/10" />

                  {/* Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <Link to="/anfrage">
            <AnimatedButton className="h-14 px-10 text-base">Angebot anfragen</AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
