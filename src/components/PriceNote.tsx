import { SITE } from "@/data/site";

/** Astérisque accolé à un tarif ; la note explicative est affichée sous le bloc concerné. */
export function Star() {
  return (
    <sup aria-label="tarif de référence, devis écrit avant intervention" className="ml-0.5 text-[0.7em]">
      *
    </sup>
  );
}

export function PriceNote({ className = "" }: { className?: string }) {
  return <p className={`text-xs leading-relaxed text-muted-foreground ${className}`}>* {SITE.priceNote}</p>;
}
