import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/zones";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Mr Pinto" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">Mr Pinto</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Serrurier 24/7</div>
          </div>
        </Link>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-[13px] font-semibold tracking-tight text-background shadow-sm transition active:scale-95"
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="tabular-nums">{PHONE_DISPLAY}</span>
        </a>
      </div>
    </header>
  );
}
