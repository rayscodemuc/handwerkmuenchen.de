import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";

// Category Pages
import TechnikCategory from "./pages/categories/TechnikCategory";
import HaftungFMCategory from "./pages/categories/HaftungFMCategory";
import ReinigungCategory from "./pages/categories/ReinigungCategory";
import AussenanlagenCategory from "./pages/categories/AussenanlagenCategory";

// Service Pages
import Elektrotechnik from "./pages/services/Elektrotechnik";
import SanitaerHeizung from "./pages/services/SanitaerHeizung";
import Winterdienst from "./pages/services/Winterdienst";
import Hausmeisterservice from "./pages/services/Hausmeisterservice";
import Objektmanagement from "./pages/services/Objektmanagement";
import Unterhaltsreinigung from "./pages/services/Unterhaltsreinigung";
import GlasFassade from "./pages/services/GlasFassade";
import Sonderreinigung from "./pages/services/Sonderreinigung";
import Gruenpflege from "./pages/services/Gruenpflege";
import Grauflaechenreinigung from "./pages/services/Grauflaechenreinigung";
import Baumpflege from "./pages/services/Baumpflege";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          
          {/* Category Overview Pages */}
          <Route path="/technik" element={<TechnikCategory />} />
          <Route path="/haftung-fm" element={<HaftungFMCategory />} />
          <Route path="/reinigung" element={<ReinigungCategory />} />
          <Route path="/aussenanlagen" element={<AussenanlagenCategory />} />
          
          {/* Technik */}
          <Route path="/technik/elektrotechnik" element={<Elektrotechnik />} />
          <Route path="/technik/sanitaer-heizung" element={<SanitaerHeizung />} />
          
          {/* Haftung & FM */}
          <Route path="/haftung-fm/winterdienst" element={<Winterdienst />} />
          <Route path="/haftung-fm/hausmeisterservice" element={<Hausmeisterservice />} />
          <Route path="/haftung-fm/objektmanagement" element={<Objektmanagement />} />
          
          {/* Reinigung */}
          <Route path="/reinigung/unterhaltsreinigung" element={<Unterhaltsreinigung />} />
          <Route path="/reinigung/glas-fassade" element={<GlasFassade />} />
          <Route path="/reinigung/sonderreinigung" element={<Sonderreinigung />} />
          
          {/* Außenanlagen */}
          <Route path="/aussenanlagen/gruenpflege" element={<Gruenpflege />} />
          <Route path="/aussenanlagen/grauflaechenreinigung" element={<Grauflaechenreinigung />} />
          <Route path="/aussenanlagen/baumpflege" element={<Baumpflege />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
