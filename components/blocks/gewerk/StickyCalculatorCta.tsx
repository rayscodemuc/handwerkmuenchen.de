import Link from "next/link";
import { Calculator } from "lucide-react";

const RECHNER_HREF = "/rechner?service=reinigung-facility";

export function StickyCalculatorCta() {
  return (
    <>
      {/* Desktop: fixed bottom-right */}
      <Link
        href={RECHNER_HREF}
        className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-3 bg-[#313D5A] text-white px-5 py-4 rounded-xl shadow-lg hover:bg-[#8AB0AB] hover:text-[#26413C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#313D5A] focus-visible:ring-offset-2 animate-none"
        aria-label="Richtpreis berechnen"
      >
        <Calculator className="h-5 w-5 shrink-0" aria-hidden />
        <span className="font-semibold whitespace-nowrap">Richtpreis berechnen</span>
      </Link>
      {/* Mobile: fixed full-width bottom bar with safe-area, gut tappbar */}
      <Link
        href={RECHNER_HREF}
        className="fixed left-0 right-0 bottom-0 z-50 flex lg:hidden items-center justify-center gap-2 min-h-[52px] bg-[#313D5A] text-white py-3 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.12)] hover:bg-[#8AB0AB] hover:text-[#26413C] active:scale-[0.99] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white animate-none"
        aria-label="Richtpreis berechnen"
      >
        <Calculator className="h-5 w-5 shrink-0" aria-hidden />
        <span className="font-semibold">Richtpreis berechnen</span>
      </Link>
    </>
  );
}
