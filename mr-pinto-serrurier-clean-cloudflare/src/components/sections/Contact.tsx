import { Phone, Clock, MapPin } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { PHONE_DISPLAY } from "@/data/zones";
import { SectionHeader } from "./Prix";

export function Contact() {
  return (
    <section id="contact" className="bg-background">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Contact" title="Appelez-moi directement." />

        <div className="mt-10 flex flex-col items-center text-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-muted">
            <img src="/assets/pinto-portrait.png" alt="Mr Pinto" className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 text-lg font-semibold tracking-tight text-foreground">Mr Pinto</div>
          <div className="text-xs text-muted-foreground">Artisan serrurier</div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Pas de standard, pas de centrale d'appel. Vous me parlez directement. Selon l'urgence,
            je me déplace personnellement ou j'envoie un de mes employés de confiance.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2">
          <Info icon={<Phone className="h-3.5 w-3.5" />} label="Tel." value={PHONE_DISPLAY} />
          <Info icon={<Clock className="h-3.5 w-3.5" />} label="Service" value="24/7" />
          <Info icon={<MapPin className="h-3.5 w-3.5" />} label="Délai" value="20 min" />
        </div>

        <div className="mt-6">
          <CallButton full />
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center">
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <div className="mt-1.5 text-sm font-semibold tracking-tight text-foreground">{value}</div>
    </div>
  );
}
