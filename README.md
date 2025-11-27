# LuxTech Services - Application Web & E-commerce

Bienvenue sur le dépôt du projet LuxTech Services. Cette application est construite avec Next.js (App Router) et intègre une vitrine, un blog, une boutique e-commerce complète, et un back-office d'administration.

## Table des Matières

1.  [Stack Technique](#-stack-technique)
2.  [Fonctionnalités Clés](#-fonctionnalités-clés)
3.  [Prérequis](#-prérequis)
4.  [Installation et Lancement en Développement](#-installation-et-lancement-en-développement)
5.  [Variables d'Environnement](#-variables-denvironnement)
6.  [Structure du Projet](#-structure-du-projet)
7.  [Scripts Disponibles](#-scripts-disponibles)
8.  [Déploiement](#-déploiement)

## Stack Technique

- **Framework Frontend & Backend :** [Next.js](https://nextjs.org/) 14+ (App Router)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Base de Données :** [PostgreSQL](https://www.postgresql.org/)
- **ORM :** [Prisma](https://www.prisma.io/)
- **Authentification :** [NextAuth.js](https://next-auth.js.org/) (Credentials, Google, Apple)
- **Gestion d'État :** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/)
- **Animations :** [Framer Motion](https://www.framer.com/motion/)
- **Validation de Données :** [Zod](https://zod.dev/)
- **Requêtes API :** [Axios](https://axios-http.com/)
- **Envoi d'Emails :** [Resend](https://resend.com/)
- **Paiements :** API Airtel Money (Sandbox)

## Fonctionnalités Clés

- **Site Vitrine :** Pages de présentation des services, projets, et page de contact.
- **Boutique E-commerce :**
  - Catalogue de produits avec filtres et tri.
  - Gestion de panier d'achat persistant.
  - Processus de commande avec plusieurs options de paiement.
  - Intégration de l'API de paiement Airtel Money.
- **Système d'Authentification :**
  - Inscription par email/mot de passe.
  - Connexion via Google et Apple (OAuth).
  - Gestion de session avec JWT.
- **Back-Office d'Administration (`/dashboard`) :**
  - Protégé par rôles (ADMIN, SUPERADMIN).
  - CRUD complet pour les Produits, Projets, Statistiques.
  - Gestion des Utilisateurs (réservée au SUPERADMIN).
  - Visualisation et gestion des demandes de devis et des commandes.

## Prérequis

- [Node.js](https://nodejs.org/) (version 20.x ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou un autre gestionnaire de paquets
- Une instance de base de données [PostgreSQL](https://www.postgresql.org/download/) accessible.

## Installation et Lancement en Développement

Suivez ces étapes pour lancer le projet sur votre machine locale.

**1. Cloner le dépôt :**

```bash
git clone https://github.com/votre-utilisateur/lux-tech-services.git
cd lux-tech-services
```

**2. Installer les dépendances :**

```bash
npm install
```

**3. Configurer les variables d'environnement :**

- Copiez le fichier `.env.example` et renommez-le en `.env`.
- Remplissez toutes les variables requises dans le fichier `.env`. Voir la section [Variables d'Environnement](#-variables-denvironnement) pour plus de détails.

```bash
cp .env.example .env
```

**4. Mettre en place la base de données :**

- Cette commande va lire votre `schema.prisma`, créer les tables dans votre base de données PostgreSQL, et générer le client Prisma.

```bash
npx prisma migrate dev
```

**5. Initialiser les données de base (Seeding) :**

- Cette commande exécute le script `prisma/seed.ts` pour créer le compte Super Administrateur initial.

```bash
npx prisma db seed
```

**6. Lancer le serveur de développement :**

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Variables d'Environnement

Le fichier `.env` est crucial pour le fonctionnement de l'application. Voici les variables que vous devez configurer :

| Variable               | Description                                                                | Exemple                                               |
| ---------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`         | URL de connexion complète à votre base de données PostgreSQL.              | `postgresql://user:pass@host:port/db?sslmode=require` |
| `NEXTAUTH_SECRET`      | Clé secrète pour signer les JWT. À générer avec `openssl rand -base64 32`. | `votre_super_secret_genere_ici`                       |
| `NEXTAUTH_URL`         | URL de base de votre application.                                          | `http://localhost:3000`                               |
| `GOOGLE_CLIENT_ID`     | ID Client obtenu depuis la Google Cloud Console.                           | `...apps.googleusercontent.com`                       |
| `GOOGLE_CLIENT_SECRET` | Secret Client obtenu depuis la Google Cloud Console.                       | `GOCSPX-...`                                          |
| `RESEND_API_KEY`       | Clé API du service d'emails Resend.                                        | `re_...`                                              |
| `TO_EMAIL`             | Email de destination pour les formulaires de contact et de devis.          | `contact@votreentreprise.com`                         |
| `AIRTEL_API_...`       | Toutes les clés relatives à l'API Airtel Money.                            | `...`                                                 |
| `SUPERADMIN_EMAIL`     | Email du compte Super Admin à créer au seeding.                            | `superadmin@luxtech.com`                              |
| `SUPERADMIN_PASSWORD`  | Mot de passe du compte Super Admin.                                        | `UnMotDePasseTresSolide!`                             |

## Structure du Projet

Le projet suit l'architecture de l'App Router de Next.js avec une séparation claire des préoccupations :

- `/src/app/(public)` : Contient les routes et pages publiques du site (vitrine, boutique, etc.).
- `/src/app/(admin)` : Contient les routes protégées du back-office.
- `/src/app/api` : Contient toutes les API Routes du backend.
- `/src/components` : Composants React réutilisables, organisés par fonctionnalité (auth, admin, checkout, etc.).
- `/src/lib` : Utilitaires et configurations partagées (Prisma, Axios, validateurs Zod, etc.).
- `/src/redux` : Toute la configuration de Redux Toolkit, incluant le store et les `features` (slices).
- `/src/services` : Logique métier découplée, appelée par les API Routes.
- `/prisma` : Schéma de la base de données, migrations et script de seed.

## Scripts Disponibles

- `npm run dev`: Lance le serveur de développement avec Turbopack.
- `npm run build`: Compile l'application pour la production.
- `npm run start`: Démarre le serveur de production (après un `build`).
- `npm run lint`: Lance l'analyse statique du code avec ESLint.

## Déploiement

Le déploiement est géré via GitHub Actions (voir `.github/workflows/master.yml`). Le workflow actuel est configuré pour un déploiement sur un serveur cPanel supportant les applications Node.js.

Pour déployer, il suffit de faire un `push` sur la branche `master`.
