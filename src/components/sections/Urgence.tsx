import { Clock, FileCheck, MapPin } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { SectionHeader } from "./Prix";

export function Urgence({ city }: { city?: string }) {
  return (
    <section className="bg-secondary/50">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Urgence" title="Disponibles jour et nuit." />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <img src="/assets/porte-800.webp" alt="Serrurier vu de trois quarts dos, travaillant sur la serrure d'une porte d'entrée" width="800" height="600" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          <div className="space-y-1 p-5">
            <Feature
              icon={<Clock className="h-4 w-4" />}
              title="24h/24 · 7j/7"
              text="Porte claquée à 3 h du matin ? Effraction un dimanche ? Un conseiller répond et transmet votre demande à l'artisan partenaire de votre zone."
            />
            <Feature
              icon={<MapPin className="h-4 w-4" />}
              title="Un artisan de votre zone"
              text={`Chaque région a son propre numéro. ${city ? `Autour de ${city}, l'artisan partenaire disponible le plus proche est sollicité.` : "L'artisan partenaire disponible le plus proche de chez vous est sollicité."}`}
            />
            <Feature
              icon={<FileCheck className="h-4 w-4" />}
              title="Artisan identifié, devis écrit"
              text="Le nom et le SIRET de l'artisan vous sont communiqués avant sa venue. Rien n'est facturé sans un devis écrit accepté."
            />
          </div>
        </div>
        <div className="mt-6">
          <CallButton full />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background">{icon}</div>
        <div className="min-w-0 text-[15px] font-semibold tracking-tight text-foreground">{title}</div>
      </div>
      <p className="mt-2 pl-11 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
