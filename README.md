# Tableau de bord du MJ

L'interface Next.js du Maître du Jeu. Elle utilise l'API Express du dossier `api-aventuriers`.

## Lancer

1. Lancer l'API d'abord : `npm run dev` dans `api-aventuriers` (port 3000).
2. Puis ce projet :

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:3001 (le port 3000 est pris par l'API, d'où le `-p 3001` dans `package.json`).

## Pages

- `/` : la connexion du Maître du Jeu. En cas de succès, le token est gardé dans le localStorage.
- `/tableau-de-bord` : la liste des PNJ et le formulaire de création. Sans token, retour à `/`.

## Test de l'audit

1. Se connecter, puis ouvrir les outils de développement (F12) > Application > Local Storage > http://localhost:3001.
2. Supprimer (ou modifier) la clé `token`.
3. Essayer de créer un PNJ : l'API refuse (401 ou 403), une alerte prévient l'utilisateur et on revient à la connexion.
