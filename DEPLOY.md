# Guide de Déploiement — Mr Pinto Serrurier

> Ce document est destiné au développeur chargé de l'hébergement du site.

---

## Stack technique

| Élément | Version / Détails |
|---------|-------------------|
| Framework | TanStack Start v1 (React 19 + SSR) |
| Bundler | Vite 8 |
| SSR target | Cloudflare Worker (Nitro) — **recommandé** |
| Style | Tailwind CSS v4 + shadcn/ui |
| Routing | File-based (`src/routes/*.tsx`) |
| TypeScript | Strict |

---

## Prérequis

```bash
# Node.js 20+ recommandé
node -v

# Bun (utilisé dans ce projet)
bun -v

# Si déploiement Cloudflare
npm install -g wrangler
```

---

## Installation locale

```bash
# Cloner le repo
cd project-root

# Installer les dépendances
bun install

# Lancer le serveur de développement
bun run dev
# => http://localhost:3000
```

---

## Build & Preview locale

```bash
# Build de production (génère .output/)
bun run build

# Preview en local du build de production
bun run preview
```

> Le build produit un worker Cloudflare dans `.output/`. Ne PAS modifier les fichiers dans `.output/` à la main.

---

## Option A — Déploiement Cloudflare Workers (RECOMMANDÉ)

C'est la cible par défaut du build Nitro. Le plus simple et le plus performant.

### 1. Configurer Wrangler

Le fichier `wrangler.toml` est déjà présent à la racine. Vérifiez juste :

```toml
name = "mr-pinto-serrurier"
compatibility_date = "2025-06-01"
main = ".output/server/index.mjs"
```

### 2. Déployer

```bash
# Build
bun run build

# Login à Cloudflare (une seule fois)
wrangler login

# Déploiement
npm run deploy
```

### 3. Custom domain (optionnel)

Dans le dashboard Cloudflare :
- Workers & Pages → votre worker → Settings → Triggers → Custom Domains

---

## Option B — Déploiement Node.js / VPS / Docker

Si vous préférez un serveur Node.js classique :

### Modifier la cible de build

Dans `vite.config.ts` :

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server", // <-- Ajouter ceci
  },
});
```

### Build & lancer

```bash
bun run build
# Le serveur Node.js est dans .output/server/index.mjs
node .output/server/index.mjs
```

### Dockerfile (si conteneurisation)

```dockerfile
FROM oven/bun:1 AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

```bash
docker build -t mr-pinto .
docker run -p 3000:3000 mr-pinto
```

---

## Option C — Vercel

TanStack Start v1 fonctionne sur Vercel avec l'adapter Node.js :

```ts
// vite.config.ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel", // <-- Ajouter ceci
  },
});
```

```bash
bun run build
# Déployer le dossier .output/ via la CLI Vercel ou Git integration
```

---

## Structure des routes

Toutes les routes sont dans `src/routes/` et générées automatiquement :

| URL | Fichier | Description |
|-----|---------|-------------|
| `/` | `index.tsx` | Page d'accueil |
| `/zone/$zone` | `zone.$zone.tsx` | Pages région (paris, ile-de-france, bretagne, occitanie, cote-d-azur) |
| `/serrurier/$ville` | `serrurier.$ville.tsx` | Pages ville (générées dynamiquement) |
| `/sitemap.xml` | `sitemap.xml.ts` | Sitemap XML |

Les métadonnées (title, description, OG) sont dans le `head()` de chaque route.

---

## Variables d'environnement

Ce projet n'utilise pas de backend externe (pas de DB, pas d'API tierce). Les seules variables éventuelles :

| Variable | Utilisation | Où |
|----------|-------------|-----|
| `NODE_ENV` | Mode dev/prod | Automatique |

Si vous ajoutez plus tard un backend (Supabase, etc.), les variables seront à définir côté serveur (`.server.ts` files) ou via `import.meta.env.VITE_*` pour le client.

---

## SEO / Métadonnées à vérifier avant mise en prod

Dans `src/routes/__root.tsx`, remplacez les meta tags par défaut :

- `title` : "Lovable App" → titre réel
- `description` : "Lovable Generated Project" → description réelle
- `og:title`, `og:description`, `twitter:site` : mettre à jour

Chaque route (`index.tsx`, `zone.$zone.tsx`, `serrurier.$ville.tsx`) a déjà ses propres métadonnées. Vérifiez qu'elles sont correctes.

---

## Performance

- Le build produit du code split par route automatiquement
- Les images statiques sont dans `src/assets/`
- Le CSS est inlined en production
- Pas de JS côté client lourd (pas de lib analytics externe visible)

---

## Checklist pré-déploiement

- [ ] `bun run build` passe sans erreur
- [ ] `bun run preview` affiche le site correctement
- [ ] Toutes les routes fonctionnent (/, /zone/paris-75, /serrurier/paris-1er, etc.)
- [ ] Les métadonnées sont correctes
- [ ] Le numéro de téléphone affiché est le bon
- [ ] Le sitemap.xml est accessible

---

## Dépannage

| Problème | Cause probable | Solution |
|----------|--------------|----------|
| `Failed to resolve import` | Fichier manquant ou import incorrect | Vérifier les imports, créer le fichier |
| Build OK mais 500 en prod | SSR error (h3 swallowed) | Vérifier les logs, le fichier `src/server.ts` gère déjà les erreurs |
| 404 sur /zone/xxx | Mauvais paramètre de zone | Vérifier `src/data/zones.ts` pour les slugs valides |
| Styles cassés | Tailwind v4 cache | `rm -rf .vinxi .output node_modules/.vite` puis rebuild |

---

## Contact / Support

- Documentation TanStack Start : https://tanstack.com/start/latest
- Documentation Nitro : https://nitro.unjs.io
- Wrangler (Cloudflare) : https://developers.cloudflare.com/workers/wrangler/
