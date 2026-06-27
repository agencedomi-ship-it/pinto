import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ZONES } from "@/data/zones";
import { SectionHeader } from "./Prix";

export function ZoneButtons() {
  return (
    <section id="zone" className="bg-secondary/50">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Zones" title="Là où nous intervenons." />
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
          Je couvre personnellement plusieurs régions avec mon équipe. Sélectionnez la vôtre.
        </p>
        <div className="mt-10 space-y-2.5">
          {ZONES.map((z) => (
            <Link
              key={z.slug}
              to="/zone/$zone"
              params={{ zone: z.slug }}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition active:scale-[0.99]"
            >
              <div className="min-w-0">
                <div className="text-lg font-semibold tracking-tight text-foreground">{z.label}</div>
                <div className="mt-0.5 font-mono text-[11px] tracking-wider text-muted-foreground">
                  {z.codes}
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
