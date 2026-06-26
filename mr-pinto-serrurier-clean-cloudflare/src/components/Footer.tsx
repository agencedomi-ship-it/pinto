import { PHONE_DISPLAY, PHONE_TEL } from "@/data/zones";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-4 py-10">
        <div className="text-lg font-semibold tracking-tight text-foreground">Mr Pinto</div>
        <div className="mt-1 text-xs text-muted-foreground">Artisan serrurier · 24h/24 · 7j/7</div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="mt-4 inline-block text-sm font-medium tracking-tight text-foreground underline-offset-4 hover:underline"
        >
          {PHONE_DISPLAY}
        </a>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mr Pinto — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
