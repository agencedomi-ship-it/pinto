import { usePhone } from "@/lib/phone";
import { Link } from "@tanstack/react-router";

export function Header() {
  const phone = usePhone();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo-160.webp" alt="" width="36" height="36" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">Mr Pinto Serrurier</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Urgence 24/7</div>
          </div>
        </Link>
        <a
          href={`tel:${phone.tel}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-[13px] font-semibold tracking-tight text-background shadow-sm transition active:scale-95"
        >
          <span className="tabular-nums">{phone.display}</span>
        </a>
      </div>
    </header>
  );
}
