# Mr Pinto Serrurier — Notice d'installation et de mise en ligne

## 📦 Contenu du dossier

Le fichier `mr-pinto-serrurier.zip` contient **le code source complet du site** (React + TanStack Start), prêt à être hébergé. Le site génère automatiquement **170 pages** (1 accueil + 5 zones + 164 pages villes) à partir du fichier `src/data/zones.ts`.

**Aucune page n'est à coder manuellement.** Tout est dynamique.

---

## ✅ Pré-requis

- **Node.js 20+** (https://nodejs.org)
- **npm** (installé avec Node.js)
- Un compte **Cloudflare** gratuit (https://dash.cloudflare.com/sign-up)

---

## 🚀 Mise en ligne sur Cloudflare Workers (méthode recommandée)

### 1. Préparer le projet
```bash
unzip mr-pinto-serrurier.zip
cd mr-pinto-serrurier
npm install
```

### 2. Tester en local (facultatif)
```bash
npm run dev
```
→ Site visible sur http://localhost:8080

### 3. Build de production
```bash
npm run build
```
La sortie est générée dans `.output/` (target Cloudflare déjà configuré).

### 4. Déployer
```bash
npm install -g wrangler   # une seule fois
wrangler login            # ouvre le navigateur pour s'authentifier (une seule fois)
npm run deploy
```

Le site est alors en ligne à :
```
https://mr-pinto-serrurier.<sous-domaine>.workers.dev
```

### 5. Mettre à jour le site
À chaque modification :
```bash
npm run deploy
```

---

## 🌐 Brancher un domaine personnalisé (ex : www.mrpinto.fr)

1. Ajouter le domaine dans le dashboard Cloudflare (Add Site).
2. Mettre à jour les nameservers chez le registrar.
3. Dans le fichier `wrangler.toml`, décommenter :
   ```toml
   [[routes]]
   custom_domain = true
   pattern = "www.mrpinto.fr"
   ```
4. Relancer :
   ```bash
   npm run deploy
   ```

---

## 🛠️ Modifier les villes / tarifs / contenus

| Quoi modifier        | Fichier                                  |
|----------------------|------------------------------------------|
| Ajouter une ville    | `src/data/zones.ts`                      |
| Numéro de téléphone  | `src/data/zones.ts` (bas du fichier)     |
| Grille de tarifs     | `src/components/sections/Prix.tsx`       |
| Texte de l'accueil   | `src/components/sections/Hero.tsx`       |
| Page d'urgence       | `src/components/sections/Urgence.tsx`    |
| Agréments / assurances | `src/components/sections/Agrement.tsx` |
| Contact              | `src/components/sections/Contact.tsx`    |

Après chaque modification, refaire :
```bash
npm run deploy
```

---

## 📁 Structure du projet

```
src/
├── routes/
│   ├── index.tsx              ← page d'accueil
│   ├── serrurier.$ville.tsx   ← gabarit pour les 164 pages villes
│   └── zone.$zone.tsx         ← gabarit pour les 5 pages zones
├── components/sections/       ← Hero, Prix, Urgence, etc.
├── data/zones.ts              ← liste des villes + tarifs
└── styles.css                 ← styles globaux (Tailwind v4)
```

---

## ❓ Alternatives à Cloudflare

Le projet est aussi déployable sur :
- **Vercel** : `npx vercel` (changer le preset Nitro dans `vite.config.ts` en `"vercel"`)
- **Node.js / VPS / Docker** : preset Nitro `"node-server"`, puis `node .output/server/index.mjs`

Cloudflare reste l'option la plus simple (gratuit, rapide, SSL inclus).

---

## 🆘 Problèmes courants

| Erreur                           | Solution                                           |
|----------------------------------|----------------------------------------------------|
| `command not found: wrangler`    | `npm install -g wrangler`                          |
| `Module not found` au build      | Relancer `npm install`                             |
| `wrangler login` ne s'ouvre pas  | Copier l'URL affichée dans le terminal             |
| Erreurs TypeScript               | Vérifier que Node 20+ est installé : `node -v`     |

---

**Contact projet** : voir le fichier `DEPLOY.md` inclus dans le zip pour la version technique anglaise complète.
