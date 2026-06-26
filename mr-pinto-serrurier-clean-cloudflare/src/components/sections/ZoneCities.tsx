import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Zone } from "@/data/zones";
import { SectionHeader } from "./Prix";

export function ZoneCities({ zone }: { zone: Zone }) {
  return (
    <section id="zone" className="bg-secondary/50">
      <div className="px-4 py-16">
        <SectionHeader eyebrow={`Zone ${zone.codes}`} title={`Interventions en ${zone.label}.`} />

        <div className="mt-10 space-y-10">
          {zone.departments.map((d) => (
            <div key={d.code}>
              <div className="mb-2 flex items-baseline gap-3 border-b border-border pb-2">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{d.name}</h3>
                <span className="font-mono text-xs tracking-wider text-muted-foreground">
                  {d.code}
                </span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Intervention 24h/24 dans tout le {d.name} ({d.code}). Tarif annoncé par téléphone, déplacement en 20 minutes.
              </p>
              <div className="space-y-2">
                {d.cities.map((c) => (
                  <Link
                    key={c.slug}
                    to="/serrurier/$ville"
                    params={{ ville: c.slug }}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm transition active:scale-[0.99]"
                  >
                    <span className="text-foreground">Serrurier {c.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
