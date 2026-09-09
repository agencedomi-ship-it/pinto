import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/PageLayout";

/** Gabarit commun des pages légales : fil d'Ariane, titre, sections. */
export function LegalPage({ title, intro, path, children }: { title: string; intro?: ReactNode; path: string; children: ReactNode }) {
  return (
    <PageLayout>
      <nav aria-label="Fil d'Ariane" className="px-4 pt-6 text-xs text-muted-foreground">
        <Link to="/" className="underline-offset-4 hover:underline">Accueil</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{title}</span>
        <span className="sr-only">{path}</span>
      </nav>
      <article className="mx-auto max-w-2xl px-4 pb-16 pt-6">
        <h1 className="text-[30px] leading-[1.05] tracking-[-0.035em] text-foreground">{title}</h1>
        {intro ? <p className="mt-3 text-sm text-muted-foreground">{intro}</p> : null}
        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
      </article>
    </PageLayout>
  );
}

export function H({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-semibold tracking-tight text-foreground">{children}</h2>;
}

export function LegalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-foreground underline underline-offset-4">
      {children}
    </Link>
  );
}
