import { SectionHeader } from "./Prix";

const ASSURANCES = ["AXA", "MAIF", "MACIF", "Allianz", "Groupama", "MMA", "Matmut", "Generali"];
const MARQUES = ["Fichet", "Bricard", "Vachette", "Picard", "Héraclès", "Pollux", "Mottura", "JPM"];

export function Agrement() {
  return (
    <section className="bg-secondary/50">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Agréments" title="Assuré, agréé, certifié." />
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
          Je travaille avec toutes les grandes compagnies d'assurance et toutes les marques
          reconnues.
        </p>

        <div className="mt-10 space-y-4">
          <Bloc title="Assurances" items={ASSURANCES} />
          <Bloc title="Marques de serrures" items={MARQUES} />
        </div>
      </div>
    </section>
  );
}

function Bloc({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground"
          >
            {i}
          </span>
        ))}
        <span className="rounded-full border border-dashed border-muted-foreground/40 px-3 py-1.5 text-sm italic text-muted-foreground">
          et autres
        </span>
      </div>
    </div>
  );
}
