import { Link } from "@tanstack/react-router";
import { Clock, FileCheck, Phone } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { SITE } from "@/data/site";
import { usePhone } from "@/lib/phone";
import { SectionHeader } from "./Prix";

export function Contact() {
  const phone = usePhone();
  return (
    <section id="contact" className="bg-background">
      <div className="px-4 py-16">
        <SectionHeader eyebrow="Contact" title="Appelez, on vous répond." />
        <div className="mt-8 flex justify-center">
          <img src="/assets/logo-320.webp" alt="" width="112" height="112" loading="lazy" className="h-28 w-28 rounded-full border border-border bg-card object-contain p-2" />
        </div>
        <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          Pas de formulaire. Un conseiller {SITE.name} prend votre appel, qualifie la demande et la confie à un artisan serrurier indépendant
          partenaire de votre zone. Le rôle de {SITE.legal.companyName} et des artisans partenaires est détaillé dans nos{" "}
          <Link to="/conditions-generales" className="text-foreground underline underline-offset-4">
            conditions générales
          </Link>
          .
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2">
          <Info icon={<Phone className="h-3.5 w-3.5" />} label="Tél." value={phone.display} />
          <Info icon={<Clock className="h-3.5 w-3.5" />} label="Service" value="24/7" />
          <Info icon={<FileCheck className="h-3.5 w-3.5" />} label="Devis" value="écrit" />
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
