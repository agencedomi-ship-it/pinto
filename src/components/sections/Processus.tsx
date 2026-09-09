import { SectionHeader } from "./Prix";

const STEPS = [
  { n: "01", title: "Vous appelez", text: "Un conseiller répond à toute heure et qualifie votre demande : nature du problème, adresse, urgence." },
  { n: "02", title: "Tarif de référence", text: "Vous décrivez la situation, le tarif de référence vous est annoncé avant tout déplacement." },
  {
    n: "03",
    title: "Un artisan partenaire intervient",
    text: "Il vous est identifié avant sa venue, confirme le prix par un devis écrit avant de commencer, puis établit la facture en son nom.",
  },
];

export function Processus() {
  return (
    <section className="bg-background">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Méthode" title="Trois étapes. Aucune surprise." />
        <div className="mt-10 space-y-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-xs text-background">
                  {s.n}
                </div>
                <div className="text-[16px] font-semibold tracking-tight text-foreground">{s.title}</div>
              </div>
              <p className="mt-3 pl-12 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
