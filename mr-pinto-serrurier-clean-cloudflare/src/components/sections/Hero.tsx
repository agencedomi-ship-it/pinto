import { CallButton } from "@/components/CallButton";
import { PHONE_DISPLAY } from "@/data/zones";

export function Hero({
  city,
  dept,
  title: titleOverride,
  subtitle: subtitleOverride,
}: {
  city?: string;
  dept?: string;
  title?: string;
  subtitle?: string;
}) {
  const title = titleOverride ?? (city ? `Serrurier à ${city}` : "Mr Pinto Artisan Serrurier");
  const sub =
    subtitleOverride ??
    (city
      ? `J'interviens à ${city}${dept ? ` (${dept})` : ""} 24h/24. Tarif annoncé au téléphone, sans surprise.`
      : "J'interviens 24h/24, 7j/7. Tarif annoncé au téléphone, sans surprise.");

  return (
    <section className="bg-foreground">
      <div className="flex min-h-[calc(100svh-64px)] flex-col px-5 pb-4 pt-3">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-background/10 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Dispo 24/7
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/70">
            Artisan · Depuis 2008
          </span>
        </div>

        {/* H1 + sub at top */}
        <div className="mt-1.5">
          <div className="h-px w-10 bg-gold" />
          <h1 className="mt-2 text-[30px] leading-[1.02] tracking-[-0.04em] text-background">
            {title.split(" ").map((w, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="text-gold">
                  {w}
                </span>
              ) : (
                <span key={i}>{w} </span>
              ),
            )}
          </h1>
          <p className="mt-1.5 max-w-md text-[13px] leading-snug text-background/80">{sub}</p>
        </div>

        {/* Image — fully visible */}
        <div className="my-1 flex items-center justify-center">
          <img
            src="/assets/pinto-van.png"
            alt="Mr Pinto et son camion de serrurier"
            className="w-full max-h-[30vh] object-contain"
          />
        </div>


        {/* Stats */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15">
          <Stat value="20 min" label="Délai" />
          <Stat value="24/7" label="Service" />
          <Stat value="Agréé" label="Assurances" highlight />
        </div>

        {/* Tarifs */}
        <a
          href="#prix"
          className="mt-1.5 flex w-full items-center justify-center rounded-full border border-background/25 bg-background/5 px-6 py-2.5 text-sm font-medium text-background backdrop-blur-md transition active:scale-[0.98]"
        >
          Voir les tarifs
        </a>

        {/* Call */}
        <div className="mt-1.5">
          <CallButton full label={`Appeler ${PHONE_DISPLAY}`} />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className="bg-foreground/70 px-2 py-2 text-center backdrop-blur-md">
      <div
        className={`text-[14px] font-semibold tracking-tight ${highlight ? "text-gold" : "text-background"}`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[9px] uppercase tracking-widest text-background/60">{label}</div>
    </div>
  );
}
