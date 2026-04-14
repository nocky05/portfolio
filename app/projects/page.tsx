"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { StackBadge } from "@/src/components/ui/StackBadge";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "Tous" | "Mobile" | "Web" | "Desktop";

interface Project {
  id: string;
  title: string;
  pitch: string;
  category: Category;
  tag: string;
  stack: string[];
  image: string; // chemin dans /public/images/projects/
  github: string;
  slug: string;
  featured?: boolean;
}

// ─── Data (à déplacer dans /data/projects.ts et importer ici) ─────────────────
const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Found-Food",
    pitch: "Découvre des plats spécifiques autour de toi sans perdre de temps.",
    category: "Mobile",
    tag: "Full-Stack · Mobile App",
    stack: ["React Native", "Supabase", "TypeScript", "Expo"],
    image: "/images/projects/found-food/home.png",
    github: "https://github.com/",
    slug: "found-food",
    featured: true,
  },
  {
    id: "2",
    title: "MelodyHub",
    pitch: "Plateforme web de découverte et de partage musical.",
    category: "Web",
    tag: "Full-Stack · Web App",
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
    image: "/images/projects/melodyhub.png",
    github: "https://github.com/",
    slug: "melodyhub",
    featured: true,
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    pitch:
      "Plateforme e-commerce moderne inspirée de Woodbrass — boutique, panier, wishlist et dashboard admin temps réel.",
    category: "Web",
    tag: "Full-Stack · Web App",
    stack: ["Next.js", "TypeScript", "Supabase", "Axios", "CSS Modules"],
    image: "/images/projects/ecommerce.png",
    github: "https://github.com/",
    slug: "ecommerce",
    featured: true,
  },
  {
    id: "4",
    title: "Portfolio",
    pitch: "Ce site — conçu comme un outil de conversion, pas un CV en ligne.",
    category: "Web",
    tag: "Frontend · Web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/portfolio.png",
    github: "https://github.com/",
    slug: "portfolio",
  },
];

const CATEGORIES: Category[] = ["Tous", "Mobile", "Web", "Desktop"];

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="border border-white/8 rounded-sm overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-white/5 rounded w-1/3" />
        <div className="h-5 bg-white/8 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-4/5" />
        <div className="flex gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-14 bg-white/5 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative border border-white/8 rounded-sm overflow-hidden hover:border-white/25 transition-all duration-300 bg-[#0f0f0f]">
      {/* Image avec zoom hover */}
      <div className="aspect-[16/10] overflow-hidden bg-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10 opacity-60" />

        {/* Placeholder visuel si pas encore d'image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay liens — apparaît au hover */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-mono rounded-sm hover:bg-white/20 transition-colors"
          >
            GitHub →
          </a>
          <Link
            href={`/projects/${project.slug}`}
            className="px-4 py-2 bg-white text-black text-xs font-medium rounded-sm hover:bg-white/90 transition-colors"
          >
            Voir les détails
          </Link>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Tag + featured badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-white/25 tracking-wider">
            {project.tag}
          </span>
          {project.featured && (
            <span className="text-xs px-2 py-0.5 border border-emerald-500/30 text-emerald-400/70 rounded-sm font-mono">
              Featured
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-white/80 transition-colors">
          {project.title}
        </h3>

        {/* Pitch */}
        <p className="text-sm text-white/35 leading-relaxed mb-4">{project.pitch}</p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <StackBadge key={tech} tech={tech} theme="dark" size="sm" />
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Page Projects ─────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("Tous");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // Simule un chargement initial (à remplacer par ton fetch Supabase)
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      // Léger délai pour le fade-in après skeleton
      setTimeout(() => setVisible(true), 50);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Filtrage — reset visible pour retriggerer l'animation
  const handleFilter = (cat: Category) => {
    if (cat === activeFilter) return;
    setVisible(false);
    setActiveFilter(cat);
    setTimeout(() => setVisible(true), 250);
  };

  const filtered =
    activeFilter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-visible {
          animation: fadeUp 0.4s ease both;
        }
        .card-visible:nth-child(2) { animation-delay: 0.08s; }
        .card-visible:nth-child(3) { animation-delay: 0.16s; }
        .card-visible:nth-child(4) { animation-delay: 0.24s; }
        .card-visible:nth-child(5) { animation-delay: 0.32s; }
        .card-visible:nth-child(6) { animation-delay: 0.40s; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Back nav */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors"
          >
            ← Home
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-3">
              Projets
            </p>
            <h1
              className="font-bold text-white mb-3"
              style={{ fontSize: "clamp(1.5rem, 6vw, 3rem)", whiteSpace: "nowrap" }}
            >
              Ce que je construis
            </h1>
            <p className="text-white/35 text-base max-w-lg">
              Chaque projet documente un problème réel, une décision technique,
              et ce que j'en ai appris.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-1 mb-10 p-1 border border-white/8 rounded-sm w-fit">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-1.5 text-sm font-mono rounded-sm transition-all duration-200 ${
                  activeFilter === cat ? "bg-white text-black" : "text-white/35 hover:text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <p className="text-xs font-mono text-white/20 mb-6">
            {loading ? "—" : `${filtered.length} projet${filtered.length > 1 ? "s" : ""}`}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((project) => (
                  <div key={project.id} className={visible ? "card-visible" : "opacity-0"}>
                    <ProjectCard project={project} />
                  </div>
                ))}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 text-white/20 font-mono text-sm">
              Aucun projet dans cette catégorie pour l'instant.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
