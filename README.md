# Proxy Boomi avec Vercel

Ce projet permet de rediriger les requêtes vers un endpoint Boomi protégé avec Basic Auth, en utilisant une fonction serverless sur Vercel.

## Configuration

1. Ajoutez une variable d'environnement dans Vercel :

- `BOOMI_AUTH` = votre couple `utilisateur:motdepasse`

2. Déployez ce projet via GitHub sur Vercel.

3. Utilisez l'URL générée par Vercel pour éviter les popups d'auth.

---

💡 Cette méthode évite de mettre les identifiants en clair dans l'URL tout en automatisant la redirection.