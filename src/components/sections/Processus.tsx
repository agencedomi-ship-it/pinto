import { SectionHeader } from "./Prix";

const STEPS = [
  { n: "01", title: "Vous m'appelez", text: "Un appel direct, à toute heure. Je décroche personnellement." },
  { n: "02", title: "Diagnostic & tarif", text: "Vous décrivez la situation, je vous annonce le tarif exact au téléphone." },
  { n: "03", title: "On intervient", text: "Je me déplace, ou j'envoie un de mes employés, sous 20 minutes." },
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
                <div className="text-[16px] font-semibold tracking-tight text-foreground">
                  {s.title}
                </div>
              </div>
              <p className="mt-3 pl-12 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
