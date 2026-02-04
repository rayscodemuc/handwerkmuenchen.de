"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  
  const isRechnerPage = pathname === "/rechner";
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (isRechnerPage) {
      setIsVisible(false);
      return;
    }
    
    if (!isHomepage) {
      // Auf anderen Seiten nach kurzer Verzögerung anzeigen
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      // Hero-Sektion ist ca. 70vh hoch, wir zeigen den Button nach ~60% davon
      const heroHeight = window.innerHeight * 0.6;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage, isRechnerPage]);
  
  // Button nicht auf der Rechner-Seite anzeigen
  if (isRechnerPage) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <Link
        href="/rechner"
        className="flex items-center gap-3 text-white px-5 py-4 rounded-l-xl shadow-2xl transition-all hover:pr-8 group animate-pulse hover:animate-none"
        style={{ backgroundColor: '#578ea5' }}
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
  
  const isRechnerPage = pathname === "/rechner";
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (isRechnerPage) {
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
  }, [isHomepage, isRechnerPage]);
  
  // Button nicht auf der Rechner-Seite anzeigen
  if (isRechnerPage) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
    >
      <Link
        href="/rechner"
        className="flex items-center justify-center gap-2 text-white px-6 py-4 rounded-xl shadow-2xl w-full font-semibold animate-pulse hover:animate-none"
        style={{ backgroundColor: '#578ea5' }}
      >
        <Calculator className="h-5 w-5" />
        Richtpreis berechnen (Facility)
      </Link>
    </motion.div>
  );
}
