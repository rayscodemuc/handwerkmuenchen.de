"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  
  const isRechnerPage = pathname === "/rechner";
  const isUeberUnsPage = pathname === "/ueber-uns";
  const isKontaktPage = pathname === "/kontakt";
  const isAnfragePage = pathname === "/anfrage";
  const isHomepage = pathname === "/";
  const isElektrotechnikPage = pathname === "/handwerk/elektrotechnik" || pathname.startsWith("/handwerk/elektrotechnik/") || pathname === "/leistungen/elektrotechnik" || pathname.startsWith("/leistungen/elektrotechnik/");

  // Wann CTA anzeigen (nach Scroll) – ohne Footer-Check
  useEffect(() => {
    if (isRechnerPage || isUeberUnsPage || isKontaktPage || isAnfragePage || isElektrotechnikPage) {
      setIsVisible(false);
      return;
    }
    
    if (!isHomepage) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage, isRechnerPage, isUeberUnsPage, isKontaktPage, isAnfragePage, isElektrotechnikPage]);

  // CTA ausblenden, sobald Footer sichtbar ist
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "-20px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  
  if (isRechnerPage || isUeberUnsPage || isKontaktPage || isAnfragePage || isHomepage || isElektrotechnikPage) {
    return null;
  }

  const showCTA = isVisible && !footerInView;
  
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: showCTA ? 0 : 100, opacity: showCTA ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block ${showCTA ? "" : "pointer-events-none"}`}
    >
      <Link
        href="/rechner"
        className="flex items-center gap-3 bg-accent text-accent-foreground px-5 py-4 rounded-l-xl shadow-md transition-all hover:bg-accent/90 hover:pr-8 group animate-pulse hover:animate-none"
      >
        <Calculator className="h-5 w-5 shrink-0" />
        <span className="font-semibold whitespace-nowrap">Richtpreis berechnen (Facility)</span>
      </Link>
    </motion.div>
  );
}

export function MobileStickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  
  const isRechnerPage = pathname === "/rechner";
  const isUeberUnsPage = pathname === "/ueber-uns";
  const isKontaktPage = pathname === "/kontakt";
  const isAnfragePage = pathname === "/anfrage";
  const isHomepage = pathname === "/";
  const isElektrotechnikPage = pathname === "/handwerk/elektrotechnik" || pathname.startsWith("/handwerk/elektrotechnik/") || pathname === "/leistungen/elektrotechnik" || pathname.startsWith("/leistungen/elektrotechnik/");

  useEffect(() => {
    if (isRechnerPage || isUeberUnsPage || isKontaktPage || isAnfragePage || isElektrotechnikPage) {
      setIsVisible(false);
      return;
    }
    
    if (!isHomepage) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage, isRechnerPage, isUeberUnsPage, isKontaktPage, isAnfragePage, isElektrotechnikPage]);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "-20px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  
  if (isRechnerPage || isUeberUnsPage || isKontaktPage || isAnfragePage || isHomepage || isElektrotechnikPage) {
    return null;
  }

  const showCTA = isVisible && !footerInView;
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: showCTA ? 0 : 100, opacity: showCTA ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed bottom-4 left-4 right-4 z-50 lg:hidden ${showCTA ? "" : "pointer-events-none"}`}
    >
      <Link
        href="/rechner"
        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-md w-full font-semibold animate-pulse hover:animate-none hover:bg-accent/90"
      >
        <Calculator className="h-5 w-5" />
        Richtpreis berechnen (Facility)
      </Link>
    </motion.div>
  );
}
