import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";

export function StickyCTA() {
  const location = useLocation();
  
  // Button nicht auf der Rechner-Seite anzeigen
  if (location.pathname === "/rechner") {
    return null;
  }
  
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <Link
        to="/rechner"
        className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-4 rounded-l-xl shadow-2xl transition-all hover:pr-8 group"
      >
        <Calculator className="h-5 w-5 shrink-0" />
        <span className="font-semibold whitespace-nowrap">Angebot berechnen</span>
      </Link>
    </motion.div>
  );
}

export function MobileStickyCTA() {
  const location = useLocation();
  
  // Button nicht auf der Rechner-Seite anzeigen
  if (location.pathname === "/rechner") {
    return null;
  }
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
    >
      <Link
        to="/rechner"
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl shadow-2xl w-full font-semibold"
      >
        <Calculator className="h-5 w-5" />
        Angebot berechnen
      </Link>
    </motion.div>
  );
}
