"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StackBadge } from "@/src/components/ui/StackBadge";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  stack: string[];
  tag: string;
  href: string;
}

// ─── Data (à déplacer dans /data/projects.ts) ─────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Found-Food",
    description: "Application mobile de gestion alimentaire",
    problem:
      "Optimisation de la consommation de données via Context API pour garantir une navigation fluide même en connexion instable.",
    stack: ["React Native", "Supabase", "TypeScript"],
    tag: "Mobile",
    href: "/projects/found-food",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Boutique en ligne full-stack avec dashboard admin",
    problem:
      "Gestion temps réel des commandes via Supabase Realtime — notifications instantanées et suivi de livraison sans rechargement.",
    stack: ["Next.js", "TypeScript", "Supabase", "CSS Modules"],
    tag: "Web",
    href: "/projects/ecommerce",
  },
  {
    id: 3,
    title: "MelodyHub",
    description: "Plateforme web de découverte musicale",
    problem:
      "Architecture de données pensée pour la lisibilité long-terme, pas seulement pour la démo.",
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    tag: "Web",
    href: "/projects/melodyhub",
  },
];

const STACK_ICONS = [
  { label: "Next.js", icon: "N" },
  { label: "React Native", icon: "⚛" },
  { label: "TypeScript", icon: "TS" },
  { label: "Tailwind", icon: "TW" },
  { label: "Supabase", icon: "SB" },
  { label: "PostgreSQL", icon: "PG" },
];

// ─── Hook: Intersection Observer pour les reveals ──────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Composant : Nav Sticky ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-mono text-sm text-white/40 tracking-widest uppercase">
          JE
        </span>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#projects" className="hover:text-white transition-colors">
            Projets
          </a>
          <a href="#stack" className="hover:text-white transition-colors">
            Stack
          </a>
          <Link href="/about" className="hover:text-white transition-colors">
            À propos
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA CV — deux actions */}
        <div className="flex items-center gap-2">
          {/* Voir la page CV */}
          <Link
            href="/cv"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider text-white/50 hover:text-white transition-all duration-200"
          >
            <span className="text-white/30">◎</span> CV
          </Link>
          {/* Télécharger le PDF */}
          <a
            href="/docs/CV_Jean_Enock.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider border border-white/20 text-white/70 hover:border-white/60 hover:text-white transition-all duration-200 rounded-sm"
          >
            <span>↓</span> PDF
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Composant : Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background grid subtil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto w-full">
        {/* Disponibilité */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-mono tracking-wider"
          style={{ animation: "fadeUp 0.5s ease both 0.1s", opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Disponible — Alternance / Stage
        </div>

        {/* Titre principal */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-6"
          style={{ animation: "fadeUp 0.6s ease both 0.2s", opacity: 0 }}
        >
          Jean
          <br />
          <span className="text-white/20">Enock.</span>
        </h1>

        {/* Sous-titre */}
        <p
          className="text-lg md:text-xl text-white/50 max-w-xl mb-4 leading-relaxed"
          style={{ animation: "fadeUp 0.6s ease both 0.35s", opacity: 0 }}
        >
          Développeur Full Stack.
          <br />
          <span className="text-white/30 text-base">
            Je construis des interfaces qui tiennent — sous contrainte, sur mobile, dans les vraies conditions.
          </span>
        </p>

        {/* Badge diplôme */}
        <p
          className="text-xs font-mono text-white/25 mb-10 tracking-wider"
          style={{ animation: "fadeUp 0.6s ease both 0.45s", opacity: 0 }}
        >
          DIPLÔME · JUIN 2026
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4"
          style={{ animation: "fadeUp 0.6s ease both 0.55s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors rounded-sm"
          >
            Voir mes projets →
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 border border-white/20 text-white/70 text-sm hover:border-white/50 hover:text-white transition-all rounded-sm"
          >
            Me contacter
          </Link>
          <Link
            href="/cv"
            className="px-6 py-3 border border-white/10 text-white/40 text-sm hover:border-white/30 hover:text-white/70 transition-all rounded-sm font-mono flex items-center gap-2"
          >
            <span className="text-white/25">◎</span> Voir CV
          </Link>
          <a
            href="/docs/CV_Jean_Enock.pdf"
            download
            className="px-6 py-3 border border-white/10 text-white/40 text-sm hover:border-white/30 hover:text-white/70 transition-all rounded-sm font-mono"
          >
            ↓ PDF
          </a>
        </div>

        {/* Chiffres clés */}
        <div
          className="mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-8 max-w-md"
          style={{ animation: "fadeUp 0.6s ease both 0.7s", opacity: 0 }}
        >
          {[
            { val: "4+", label: "Projets livrés" },
            { val: "2", label: "Apps déployées" },
            { val: "2026", label: "Diplôme" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-white/30 mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Composant : Quick Stack ──────────────────────────────────────────────────
function QuickStack() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="stack"
      ref={ref}
      className={`py-12 border-y border-white/5 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6">
          Daily Stack
        </p>
        <div className="flex flex-wrap gap-3">
          {STACK_ICONS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm text-sm text-white/50 hover:border-white/30 hover:text-white/80 transition-all duration-200"
            >
              <span className="font-mono text-xs text-white/30">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Composant : Project Card ─────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={project.href}
      className="group relative flex flex-col justify-between p-6 border border-white/8 rounded-sm hover:border-white/25 transition-all duration-300 hover:bg-white/[0.02]"
      style={{
        animation: `fadeUp 0.5s ease both ${0.1 + index * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-white/25 tracking-wider uppercase">
          {project.tag}
        </span>
        <span className="text-white/20 group-hover:text-white/60 transition-colors text-lg">
          →
        </span>
      </div>

      {/* Titre + description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-white/40">{project.description}</p>
      </div>

      {/* Problème résolu */}
      <p className="text-xs text-white/30 leading-relaxed mb-5 border-l border-white/10 pl-3">
        {project.problem}
      </p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <StackBadge key={tech} tech={tech} />
        ))}
      </div>
    </Link>
  );
}

// ─── Composant : Featured Projects ────────────────────────────────────────────
function FeaturedProjects() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-2">
              Projets
            </p>
            <h2 className="text-3xl font-bold text-white">Ce que je construis</h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-white/30 hover:text-white/70 transition-colors hidden md:block"
          >
            Tous les projets →
          </Link>
        </div>

        {/* Grid projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Lien mobile */}
        <div className="mt-8 md:hidden">
          <Link href="/projects" className="text-sm text-white/30 hover:text-white/70">
            Tous les projets →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Composant : CTA final ────────────────────────────────────────────────────
function CTABand() {
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref}
      className={`py-24 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
          Disponible dès maintenant
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          On travaille ensemble ?
        </h2>
        <p className="text-white/40 mb-10 max-w-md mx-auto text-base">
          Alternance, stage ou projet freelance — je suis ouvert à la discussion.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors rounded-sm"
          >
            Me contacter →
          </Link>
          <Link
            href="/cv"
            className="px-8 py-3 border border-white/20 text-white/60 text-sm hover:border-white/50 hover:text-white transition-all rounded-sm font-mono flex items-center gap-2"
          >
            <span className="text-white/30">◎</span> Voir le CV
          </Link>
          <a
            href="/docs/CV_Jean_Enock.pdf"
            download
            className="px-8 py-3 border border-white/15 text-white/40 text-sm hover:border-white/40 hover:text-white/70 transition-all rounded-sm font-mono"
          >
            ↓ Télécharger PDF
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Composant : Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20 font-mono">
        <span>© 2025 Jean Enock</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Injection des keyframes globaux */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <main>
          <Hero />
          <QuickStack />
          <FeaturedProjects />
          <CTABand />
        </main>
        <Footer />
      </div>
    </>
  );
}
