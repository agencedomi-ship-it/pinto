import { CallButton } from "@/components/CallButton";
import { Star } from "@/components/PriceNote";
import { SITE } from "@/data/site";

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
  const title = titleOverride ?? (city ? `Serrurier à ${city}` : "Mr Pinto Serrurier, urgence 24h/24");
  const sub =
    subtitleOverride ??
    (city
      ? `Un artisan serrurier partenaire intervient à ${city}${dept ? ` (${dept})` : ""}, 24h/24 et 7j/7. Tarif de référence annoncé au téléphone, devis écrit avant intervention.`
      : "Un réseau d'artisans serruriers indépendants partenaires, 24h/24 et 7j/7. Tarif de référence annoncé au téléphone, devis écrit avant intervention.");

  return (
    <section className="bg-foreground">
      <div className="flex flex-col px-5 pb-6 pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-background/10 px-2.5 py-1 text-[11px] font-medium text-gold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Dispo 24/7
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/70">Artisans partenaires</span>
        </div>

        <div className="mt-4">
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
          <p className="mt-2 max-w-md text-[14px] leading-snug text-background/80">{sub}</p>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl">
          <img src="/assets/van-800.webp" alt="Serrurier vu de dos devant le véhicule d'intervention Mr Pinto Serrurier" width="800" height="600" className="aspect-[4/3] w-full object-cover" fetchPriority="high" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15">
          <Stat value="Devis écrit" label="avant intervention" />
          <Stat value="24/7" label="Service" />
          <Stat value="Tarif annoncé" label="au téléphone" highlight />
        </div>

        <p className="mt-4 text-[13px] leading-snug text-background/75">
          Ouverture de porte dès 39 €<Star /> + déplacement, changement de serrure dès 59 €<Star />. {SITE.priceNote}
        </p>

        <a
          href="#prix"
          className="mt-4 flex w-full items-center justify-center rounded-full border border-background/25 bg-background/5 px-6 py-2.5 text-sm font-medium text-background transition active:scale-[0.98]"
        >
          Voir les tarifs
        </a>
        <div className="mt-2">
          <CallButton full variant="gold" />
        </div>
        <p className="mt-3 text-[11px] leading-snug text-background/60">
          Un conseiller qualifie votre demande et la confie à un artisan serrurier indépendant partenaire de votre zone. Son identité vous est
          communiquée avant sa venue.
        </p>
      </div>
    </section>
  );
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className="bg-foreground/70 px-2 py-2 text-center">
      <div className={`text-[13px] font-semibold tracking-tight ${highlight ? "text-gold" : "text-background"}`}>{value}</div>
      <div className="mt-0.5 text-[9px] uppercase tracking-widest text-background/70">{label}</div>
    </div>
  );
}
