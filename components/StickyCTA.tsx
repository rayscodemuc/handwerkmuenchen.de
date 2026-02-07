"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/** Nur auf Reinigung- und Facility-Seiten anzeigen (außer Hub, der eigenen Sticky hat) */
function isReinigungOrFacilityPage(pathname: string) {
  if (pathname === "/leistungen/reinigung-facility" || pathname.startsWith("/leistungen/reinigung-facility/")) return false;
  return (
    pathname.startsWith("/leistungen/reinigung") ||
    pathname.startsWith("/leistungen/facility") ||
    pathname.startsWith("/reinigung") ||
    pathname.startsWith("/leistungen/facility") ||
    pathname.startsWith("/leistungen/hausmeisterservice") ||
    pathname.startsWith("/leistungen/objektmanagement") ||
    pathname.startsWith("/leistungen/winterdienst")
  );
}

export function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const showOnThisPage = isReinigungOrFacilityPage(pathname) && pathname !== "/rechner";

  useEffect(() => {
    if (!showOnThisPage) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [showOnThisPage]);

  useEffect(() => {
    if (!showOnThisPage) return;
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnThisPage]);

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

  if (!showOnThisPage) return null;

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
        className="flex items-center gap-3 bg-accent text-accent-foreground px-5 py-4 rounded-l-xl shadow-md transition-all hover:bg-accent/90 hover:pr-8 group"
      >
        <Calculator className="h-5 w-5 shrink-0" />
        <span className="font-semibold whitespace-nowrap">Richtpreis berechnen</span>
      </Link>
    </motion.div>
  );
}

export function MobileStickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  const showOnThisPage = isReinigungOrFacilityPage(pathname) && pathname !== "/rechner";

  useEffect(() => {
    if (!showOnThisPage) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [showOnThisPage]);

  useEffect(() => {
    if (!showOnThisPage) return;
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnThisPage]);

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

  if (!showOnThisPage) return null;

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
        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-md w-full font-semibold hover:bg-accent/90"
      >
        <Calculator className="h-5 w-5" />
        Richtpreis berechnen
      </Link>
    </motion.div>
  );
}
