import { CallButton } from "@/components/CallButton";

type Row = { service: string; idf: string; reste: string };
type Variant = "both" | "paris" | "province";

export function Prix({ variant = "both" }: { variant?: Variant } = {}) {
  const rows: Row[] = [
    { service: "Déplacement", idf: "19 €", reste: "19 €" },
    { service: "Ouverture de porte", idf: "dès 39 € + dép.", reste: "dès 59 € + dép." },
    { service: "Déblocage de clé", idf: "dès 39 € + dép.", reste: "dès 59 € + dép." },
    { service: "Changement de serrure", idf: "dès 59 € + dép.", reste: "dès 69 € + dép." },
    { service: "Sécurisation après effraction", idf: "dès 59 € + dép.", reste: "dès 69 € + dép." },
    { service: "Ouverture de coffre-fort", idf: "dès 59 € + dép.", reste: "dès 69 € + dép." },
    { service: "Blindage de porte", idf: "sur devis", reste: "sur devis" },
    { service: "Remplacement de porte", idf: "sur devis", reste: "sur devis" },
  ];

  const zoneLabel =
    variant === "paris" ? "Paris / IDF" : variant === "province" ? "Hors IDF" : "Paris / IDF";

  return (
    <section id="prix" className="bg-background">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Tarifs" title="Des prix clairs, annoncés à l'avance." />
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
          Je vous communique le tarif exact au téléphone, avant tout déplacement. C'est ma règle.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          {rows.map((r, i) => {
            const price =
              variant === "province" ? r.reste : r.idf;
            return (
              <div
                key={i}
                className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 last:border-0"
              >
                <div className="min-w-0">
                  <div className="text-[15px] font-medium text-foreground">{r.service}</div>
                  {variant === "both" && (
                    <div className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {zoneLabel}
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[15px] font-semibold tracking-tight text-foreground">
                    {price}
                  </div>
                  {variant === "both" && (
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      Hors IDF : {r.reste}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          N'hésitez pas à m'appeler pour le détail.
        </p>
        <div className="mt-5">
          <CallButton full />
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
        <span className="h-px w-6 bg-gold" />
        {eyebrow}
        <span className="h-px w-6 bg-gold" />
      </div>
      <h2 className="mt-4 text-[32px] leading-[1.05] tracking-[-0.035em] text-foreground">
        {title}
      </h2>
    </div>
  );
}
