import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { SectionHeader } from "./Prix";

export function Urgence({ city }: { city?: string }) {
  return (
    <section className="bg-secondary/50">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Urgence" title="Chez vous en 20 minutes. À toute heure." />

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <img src="/assets/pinto-porte.png" alt="Intervention" className="aspect-[5/4] w-full object-cover" />
          <div className="space-y-1 p-5">
            <Feature
              icon={<Clock className="h-4 w-4" />}
              title="24h/24 · 7j/7"
              text="Porte claquée à 3h ? Effraction le dimanche ? On décroche et on vient."
            />
            <Feature
              icon={<MapPin className="h-4 w-4" />}
              title="20 minutes max."
              text={`Nous sommes toujours sur la route${city ? ` autour de ${city}` : ""}.`}
            />
            <Feature
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Artisan, pas plateforme"
              text="Je me déplace personnellement, ou j'envoie l'un de mes employés de confiance."
            />
          </div>
        </div>

        <div className="mt-6">
          <CallButton full label="Urgence — appeler maintenant" />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
          {icon}
        </div>
        <div className="min-w-0 text-[15px] font-semibold tracking-tight text-foreground">
          {title}
        </div>
      </div>
      <p className="mt-2 pl-11 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
