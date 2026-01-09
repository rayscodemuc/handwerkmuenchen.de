import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CookieConsent } from "./components/CookieConsent";
import { StickyCTA, MobileStickyCTA } from "./components/StickyCTA";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";
import PartnerWerden from "./pages/PartnerWerden";
import Anfrage from "./pages/Anfrage";
import Service247 from "./pages/Service247";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";

// Category Pages
import HandwerkCategory from "./pages/categories/HandwerkCategory";
import FacilityManagementCategory from "./pages/categories/FacilityManagementCategory";
import ReinigungCategory from "./pages/categories/ReinigungCategory";
import AussenanlagenCategory from "./pages/categories/AussenanlagenCategory";

// Handwerk Service Pages
import Elektrotechnik from "./pages/services/Elektrotechnik";
import SanitaerHeizung from "./pages/services/SanitaerHeizung";
import ServiceWartung from "./pages/services/ServiceWartung";

// Facility Management Service Pages
import Hausmeisterservice from "./pages/services/Hausmeisterservice";
import Winterdienst from "./pages/services/Winterdienst";
import Objektmanagement from "./pages/services/Objektmanagement";

// Reinigung Service Pages
import Unterhaltsreinigung from "./pages/services/Unterhaltsreinigung";
import Bueroreinigung from "./pages/services/Bueroreinigung";
import Fensterreinigung from "./pages/services/Fensterreinigung";
import Sonderreinigung from "./pages/services/Sonderreinigung";
import Tiefgaragenreinigung from "./pages/services/Tiefgaragenreinigung";
import Grundreinigung from "./pages/services/Grundreinigung";
import GlasFassade from "./pages/services/GlasFassade";

// Außenanlagen Service Pages
import Gruenpflege from "./pages/services/Gruenpflege";
import Baumpflege from "./pages/services/Baumpflege";
import Grauflaechenreinigung from "./pages/services/Grauflaechenreinigung";
import WinterdienstAussen from "./pages/services/WinterdienstAussen";

// Standort Pages
import Muenchen from "./pages/standorte/Muenchen";
import Berlin from "./pages/standorte/Berlin";
import Hamburg from "./pages/standorte/Hamburg";
import Augsburg from "./pages/standorte/Augsburg";
import Ingolstadt from "./pages/standorte/Ingolstadt";
import Nuernberg from "./pages/standorte/Nuernberg";
import Frankfurt from "./pages/standorte/Frankfurt";
import Rechner from "./pages/Rechner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/partner-werden" element={<PartnerWerden />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/24-7-service" element={<Service247 />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/rechner" element={<Rechner />} />
          
          {/* Category Overview Pages */}
          <Route path="/handwerk" element={<HandwerkCategory />} />
          <Route path="/facility-management" element={<FacilityManagementCategory />} />
          <Route path="/reinigung" element={<ReinigungCategory />} />
          <Route path="/aussenanlagen" element={<AussenanlagenCategory />} />
          
          {/* Handwerk */}
          <Route path="/handwerk/elektrotechnik" element={<Elektrotechnik />} />
          <Route path="/handwerk/sanitaer-heizung" element={<SanitaerHeizung />} />
          <Route path="/handwerk/service-wartung" element={<ServiceWartung />} />
          
          {/* Facility Management */}
          <Route path="/facility-management/hausmeisterservice" element={<Hausmeisterservice />} />
          <Route path="/facility-management/winterdienst" element={<Winterdienst />} />
          <Route path="/facility-management/objektmanagement" element={<Objektmanagement />} />
          
          {/* Reinigung */}
          <Route path="/reinigung/unterhaltsreinigung" element={<Unterhaltsreinigung />} />
          <Route path="/reinigung/bueroreinigung" element={<Bueroreinigung />} />
          <Route path="/reinigung/fensterreinigung" element={<Fensterreinigung />} />
          <Route path="/reinigung/sonderreinigung" element={<Sonderreinigung />} />
          <Route path="/reinigung/tiefgaragenreinigung" element={<Tiefgaragenreinigung />} />
          <Route path="/reinigung/grundreinigung" element={<Grundreinigung />} />
          <Route path="/reinigung/glas-fassade" element={<GlasFassade />} />
          
          {/* Außenanlagen */}
          <Route path="/aussenanlagen/gruenpflege" element={<Gruenpflege />} />
          <Route path="/aussenanlagen/baumpflege" element={<Baumpflege />} />
          <Route path="/aussenanlagen/grauflaechenreinigung" element={<Grauflaechenreinigung />} />
          <Route path="/aussenanlagen/winterdienst" element={<WinterdienstAussen />} />
          
          {/* Standorte */}
          <Route path="/standorte/muenchen" element={<Muenchen />} />
          <Route path="/standorte/berlin" element={<Berlin />} />
          <Route path="/standorte/hamburg" element={<Hamburg />} />
          <Route path="/standorte/augsburg" element={<Augsburg />} />
          <Route path="/standorte/ingolstadt" element={<Ingolstadt />} />
          <Route path="/standorte/nuernberg" element={<Nuernberg />} />
          <Route path="/standorte/frankfurt" element={<Frankfurt />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <StickyCTA />
        <MobileStickyCTA />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
