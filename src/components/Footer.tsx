import { Link } from "@tanstack/react-router";
import { usePhone } from "@/lib/phone";
import { LEGAL_ADDRESS, SITE } from "@/data/site";

const links = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/conditions-generales", label: "Conditions générales" },
  { to: "/politique-de-confidentialite", label: "Confidentialité" },
  { to: "/cookies", label: "Cookies" },
];

export function Footer() {
  const phone = usePhone();
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-4 py-10">
        <div className="text-lg font-semibold tracking-tight text-foreground">{SITE.name}</div>
        <p className="mt-1 max-w-md text-xs text-muted-foreground">
          Réseau d'artisans serruriers indépendants partenaires · Urgences 24h/24, 7j/7. Un conseiller qualifie votre demande et la confie à
          l'artisan de votre zone.
        </p>
        <a href={`tel:${phone.tel}`} className="mt-4 inline-block text-sm font-medium tracking-tight text-foreground underline-offset-4 hover:underline">
          {phone.display}
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          Siège social de {SITE.legal.companyName} : {LEGAL_ADDRESS}. Pas d'accueil du public. {SITE.hours}.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-block py-1 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}, marque exploitée par {SITE.legal.companyName}, {SITE.legal.rcs}.
        </p>
      </div>
    </footer>
  );
}
