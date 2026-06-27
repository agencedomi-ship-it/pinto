import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/zones";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
      <a
        href={`tel:${PHONE_TEL}`}
        className="group flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-5 py-4 text-base font-semibold text-background shadow-lg shadow-foreground/20 ring-1 ring-gold/40 transition active:scale-[0.98]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <Phone className="h-4 w-4" />
        </span>
        <span className="tracking-tight">Appeler · {PHONE_DISPLAY}</span>
      </a>
    </div>
  );
}
