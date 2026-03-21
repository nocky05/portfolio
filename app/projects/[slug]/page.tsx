"use client";

// src/app/projects/[slug]/page.tsx
// Bonne pratique : pour la prod, convertis ce fichier en Server Component
// et utilise generateStaticParams() pour le SSG.

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StackBadge } from "@/src/components/ui/StackBadge";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CaseStudy {
  slug: string;
  title: string;
  pitch: string;
  tag: string;
  stack: string[];
  github: string;
  demo?: string;
  problem: string;
  solution: string;
  role: string;
  learnings: string;
  screenshots: { label: string; placeholder: string }[];
  metrics?: { val: string; label: string }[];
}

// ─── Data (à déplacer dans /data/projects.ts) ─────────────────────────────────
// En production : fetch depuis Supabase avec le slug comme clé
const CASE_STUDIES: Record<string, CaseStudy> = {
  "found-food": {
    slug: "found-food",
    title: "Found-Food",
    pitch: "Découvre des plats spécifiques autour de toi sans perdre de temps.",
    tag: "Full-Stack · Mobile App",
    stack: ["React Native", "Supabase", "TypeScript", "Expo"],
    github: "https://github.com/",
    problem: `La plupart des apps de food discovery montrent des restaurants, pas des plats. L'utilisateur cherche "thiéboudienne" ou "attiéké poisson" — il ne veut pas lire 20 menus. Found-Food inverse la logique : on part du plat, pas du lieu.`,
    solution: `Architecture Context API pour centraliser l'état de géolocalisation et de filtres. Chaque Provider est isolé — FoodProvider, LocationProvider, AuthProvider — ce qui permet de les composer sans couplage. La gestion offline-first via Supabase Realtime garantit une navigation fluide même sur réseau instable : les données sont mises en cache localement et synchronisées dès que la connexion revient.`,
    role: `Design des écrans (Figma → FlutterFlow), développement du backend Supabase (tables, Row Level Security, Edge Functions), intégration de la géolocalisation et du feed temps réel.`,
    learnings: `Le vrai problème n'était pas l'UI, c'était la latence perçue sur connexion mobile. Implémenter un skeleton loader + une stratégie cache-first a rendu l'app "instantanée" — même à 2G.`,
    screenshots: [
      { label: "Login", placeholder: "FF" },
      { label: "Feed", placeholder: "FF" },
      { label: "Profil", placeholder: "FF" },
    ],
    metrics: [
      { val: "1", label: "App déployée" },
      { val: "<200ms", label: "Temps de réponse feed" },
      { val: "3", label: "Providers Context" },
    ],
  },
  "melodyhub": {
    slug: "melodyhub",
    title: "MelodyHub",
    pitch: "Plateforme web de découverte et de partage musical.",
    tag: "Full-Stack · Web App",
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
    github: "https://github.com/",
    problem: `Les plateformes musicales existantes sont des walled gardens. MelodyHub est pensé comme un espace ouvert : découverte par genre, par humeur, par proximité culturelle.`,
    solution: `Next.js App Router pour le SSR des pages de découverte (SEO-friendly). Schema PostgreSQL normalisé dès le départ — pas de colonne JSON "fourre-tout". Supabase Auth pour la gestion des profils utilisateurs.`,
    role: `Architecture full-stack, design du schéma de base de données, développement des pages de découverte et du système de recommandation basique.`,
    learnings: `Structurer la base de données correctement dès le début évite des migrations douloureuses. Le temps passé à modéliser les relations (artiste ↔ track ↔ playlist ↔ user) a divisé par 3 la complexité des requêtes.`,
    screenshots: [
      { label: "Discover", placeholder: "MH" },
      { label: "Player", placeholder: "MH" },
      { label: "Profile", placeholder: "MH" },
    ],
    metrics: [
      { val: "SSR", label: "Rendu côté serveur" },
      { val: "~100", label: "Score Lighthouse" },
      { val: "4NF", label: "Schéma normalisé" },
    ],
  },
  "portfolio": {
    slug: "portfolio",
    title: "Portfolio",
    pitch: "Conçu comme un outil de conversion, pas un CV en ligne.",
    tag: "Frontend · Web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/",
    problem: `La plupart des portfolios juniors sont des listes. Ce site est pensé comme un funnel : capturer l'attention → prouver la compétence → déclencher le contact.`,
    solution: `Single Page scroll avec sous-pages pour les case studies. SSG pour les pages statiques, Intersection Observer natif pour les animations (zéro dépendance inutile). Score Lighthouse cible : 100.`,
    role: `Design, architecture, développement complet.`,
    learnings: `L'outil de conversion le plus efficace n'est pas le design — c'est la clarté du message. Chaque section a un seul objectif.`,
    screenshots: [
      { label: "Hero", placeholder: "PF" },
      { label: "Projects", placeholder: "PF" },
      { label: "Contact", placeholder: "PF" },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    title: "E-Commerce Platform",
    pitch:
      "Plateforme e-commerce moderne inspirée de Woodbrass — design premium, gestion complète des produits et des commandes.",
    tag: "Full-Stack · Web App",
    stack: ["Next.js", "TypeScript", "React 19", "Supabase", "Axios", "Cheerio", "CSS Modules"],
    github: "https://github.com/",
    problem: `Construire une expérience e-commerce fluide sur desktop et mobile, avec une gestion temps réel des commandes côté admin. Le défi principal : des fiches produits dynamiques avec variantes, un système de panier et wishlist robuste, et un dashboard admin opérationnel sans rechargement de page.`,
    solution: `Next.js App Router pour le SSR des pages boutique (SEO critique en e-commerce). Supabase pour la base de données produits, l'authentification et les notifications temps réel des commandes. Axios pour les appels API, Cheerio pour le scraping et la migration initiale du catalogue produits. CSS Modules pour un design premium maîtrisé, inspiré de l'identité visuelle Woodbrass (bleu et noir). Navbar trois niveaux sur desktop, deux niveaux sur mobile avec barre de recherche dédiée.`,
    role: `Développement full-stack complet : architecture de la boutique, dashboard admin (gestion commandes, notifications temps réel, suivi livraison), authentification utilisateur (inscription, connexion, profil, historique commandes), refonte UI/UX de la navbar et de la page d'accueil, correction des bugs cross-browser sur les cartes produits, stabilisation des scripts de migration Supabase.`,
    learnings: `La réactivité mobile en e-commerce est non-négociable — les icônes et espacements du header ont nécessité plusieurs itérations pour tenir sur tous les viewports. Les notifications temps réel via Supabase Realtime sont puissantes mais fragiles si le système d'abonnement n'est pas correctement nettoyé (unsubscribe au unmount).`,
    screenshots: [
      { label: "Boutique", placeholder: "EC" },
      { label: "Admin", placeholder: "EC" },
      { label: "Profil", placeholder: "EC" },
    ],
    metrics: [
      { val: "4", label: "Modules clés" },
      { val: "RT", label: "Commandes temps réel" },
      { val: "SSR", label: "Pages boutique" },
    ],
  },
};

// ─── Screenshot Card ───────────────────────────────────────────────────────────
function Screenshot({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="border border-white/8 rounded-sm overflow-hidden">
      {/* Placeholder — remplace par <Image /> quand les assets sont prêts */}
      <div className="aspect-[9/16] bg-white/[0.03] flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-3xl text-white/5">{placeholder}</span>
        <span className="text-xs font-mono text-white/15">{label}</span>
      </div>
      <div className="px-3 py-2 border-t border-white/5">
        <span className="text-xs font-mono text-white/25">{label}</span>
      </div>
    </div>
  );
}

// ─── Page Detail ───────────────────────────────────────────────────────────────
export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = CASE_STUDIES[slug];

  // 404 si slug inconnu
  if (!project) notFound();

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade { animation: fadeUp 0.5s ease both; }
        .fade-2 { animation: fadeUp 0.5s ease both 0.1s; }
        .fade-3 { animation: fadeUp 0.5s ease both 0.2s; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors mb-12"
          >
            ← Projets
          </Link>

          {/* Header */}
          <div className="fade mb-10">
            <span className="text-xs font-mono text-white/25 tracking-wider">{project.tag}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-3">{project.title}</h1>
            <p className="text-white/40 text-lg">{project.pitch}</p>
          </div>

          {/* Métriques */}
          {project.metrics && (
            <div className="fade-2 grid grid-cols-3 gap-4 mb-10 p-5 border border-white/8 rounded-sm">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-xl font-bold text-white">{m.val}</div>
                  <div className="text-xs text-white/30 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Stack + liens */}
          <div className="fade-3 flex flex-wrap items-center gap-3 mb-12 pb-10 border-b border-white/5">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <StackBadge key={tech} tech={tech} />
              ))}
            </div>
            <div className="flex gap-3 ml-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors border border-white/10 px-3 py-1.5 rounded-sm"
              >
                GitHub →
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white px-3 py-1.5 bg-white/10 border border-white/20 rounded-sm hover:bg-white/20 transition-colors"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </div>

          {/* Case Study */}
          <div className="space-y-10">
            {/* Problème */}
            <section>
              <h2 className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">01 · Le Problème</h2>
              <p className="text-white/60 leading-relaxed">{project.problem}</p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
                02 · La Solution Technique
              </h2>
              <p className="text-white/60 leading-relaxed">{project.solution}</p>
            </section>

            {/* Rôle */}
            <section>
              <h2 className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">03 · Mon Rôle</h2>
              <p className="text-white/60 leading-relaxed">{project.role}</p>
            </section>

            {/* Screenshots */}
            <section>
              <h2 className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">04 · Captures d'écran</h2>
              <div className="grid grid-cols-3 gap-3">
                {project.screenshots.map((s) => (
                  <Screenshot key={s.label} label={s.label} placeholder={s.placeholder} />
                ))}
              </div>
            </section>

            {/* Apprentissages */}
            <section className="border-l-2 border-white/10 pl-5">
              <h2 className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
                05 · Ce que j'en ai appris
              </h2>
              <p className="text-white/50 leading-relaxed italic">{project.learnings}</p>
            </section>
          </div>

          {/* Navigation vers projet suivant */}
          <div className="mt-16 pt-8 border-t border-white/5 flex justify-between text-xs font-mono text-white/25">
            <Link href="/projects" className="hover:text-white/60 transition-colors">
              ← Tous les projets
            </Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">
              Me contacter →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
