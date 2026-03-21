"use client";

// src/app/about/page.tsx

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StackBadge } from "@/src/components/ui/StackBadge";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimelineItem {
  id: number;
  period: string;
  title: string;
  type: "project" | "education" | "experience";
  role: string;
  stack: string[];
  result: string;
}

interface AcademicItem {
  degree: string;
  school: string;
  period: string;
  subjects: string[];
  status?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TIMELINE: TimelineItem[] = [
  {
    id: 1,
    period: "2024 — en cours",
    title: "Found-Food",
    type: "project",
    role: "Développeur Full-Stack (design + backend)",
    stack: ["React Native", "Supabase", "TypeScript", "Expo"],
    result: "Navigation fluide sur connexion instable via stratégie cache-first et Context API isolé par domaine.",
  },
  {
    id: 2,
    period: "2024",
    title: "MelodyHub",
    type: "project",
    role: "Développeur Full-Stack",
    stack: ["Next.js", "PostgreSQL", "Supabase", "Tailwind CSS"],
    result: "Schéma de base de données normalisé (4NF) dès le départ — complexité des requêtes divisée par 3.",
  },
  {
    id: 3,
    period: "2024",
    title: "E-Commerce Platform",
    type: "project",
    role: "Développeur Full-Stack",
    stack: ["Next.js", "TypeScript", "Supabase", "Axios", "CSS Modules"],
    result:
      "Boutique complète avec dashboard admin temps réel, authentification Supabase, panier, wishlist et gestion des commandes.",
  },
  {
    id: 4,
    period: "2023",
    title: "Logiciel de gestion de stock",
    type: "project",
    role: "Développeur solo",
    stack: ["Python", "SQLite", "Tkinter"],
    result: "Interface desktop opérationnelle, gestion CRUD complète avec export CSV et rapport automatisé.",
  },
  {
    id: 5,
    period: "2023 — 2026",
    title: "BTS Informatique & Développement",
    type: "education",
    role: "Étudiant",
    stack: ["Algorithmique", "Bases de données", "Systèmes", "Réseaux"],
    result: "Diplôme prévu juin 2026. Bases théoriques solides en architecture logicielle.",
  },
  {
    id: 6,
    period: "2022 — 2023",
    title: "Licence — Informatique",
    type: "education",
    role: "Étudiant",
    stack: ["POO", "Structures de données", "Mathématiques discrètes"],
    result: "Fondations en algorithmique et programmation orientée objet.",
  },
];

const ACADEMIC: AcademicItem[] = [
  {
    degree: "BTS Informatique & Développement",
    school: "En cours",
    period: "2023 — 2026",
    subjects: ["Algorithmique", "Bases de données", "Systèmes d'exploitation", "Réseaux", "Architecture logicielle"],
    status: "Diplôme · Juin 2026",
  },
  {
    degree: "Licence — Informatique",
    school: "Terminée",
    period: "2022 — 2023",
    subjects: ["Programmation orientée objet", "Structures de données", "Mathématiques discrètes", "Systèmes"],
  },
];

const OUTSIDE_CODE = [
  {
    icon: "◈",
    label: "Sport",
    detail: "3 séances / semaine — discipline et gestion de l'énergie.",
  },
  {
    icon: "◎",
    label: "Architecture logicielle",
    detail: "Lecture active : Clean Architecture, Designing Data-Intensive Applications.",
  },
  {
    icon: "◇",
    label: "Open Source",
    detail: "Contributions et veille technologique régulière.",
  },
];

// ─── Hook : reveal au scroll ──────────────────────────────────────────────────
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

// ─── Timeline Item ─────────────────────────────────────────────────────────────
function TimelineEntry({ item, index, isLast }: { item: TimelineItem; index: number; isLast: boolean }) {
  const { ref, visible } = useReveal(0.2);

  const typeColor = {
    project: "text-emerald-400 border-emerald-500/30",
    education: "text-blue-400 border-blue-500/30",
    experience: "text-amber-400 border-amber-500/30",
  }[item.type];

  const dotColor = {
    project: "bg-emerald-400",
    education: "bg-blue-400",
    experience: "bg-amber-400",
  }[item.type];

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Ligne + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 transition-all duration-500 ${visible ? dotColor : "bg-white/10"}`}
        />
        {!isLast && <div className={`w-px flex-1 mt-2 transition-all duration-700 ${visible ? "bg-white/10" : "bg-white/5"}`} />}
      </div>

      {/* Contenu */}
      <div className="pb-10 flex-1 min-w-0">
        {/* Period + type */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-white/25">{item.period}</span>
          <span className={`text-xs font-mono px-2 py-0.5 border rounded-sm ${typeColor}`}>
            {item.type === "project" ? "Projet" : item.type === "education" ? "Formation" : "Expérience"}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
        <p className="text-sm text-white/35 mb-3">{item.role}</p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.stack.map((s) => (
            <StackBadge key={s} tech={s} />
          ))}
        </div>

        {/* Résultat */}
        <p className="text-sm text-white/45 leading-relaxed border-l border-white/8 pl-3">{item.result}</p>
      </div>
    </div>
  );
}

// ─── Page About ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const bioReveal = useReveal(0.1);
  const academicReveal = useReveal(0.15);
  const outsideReveal = useReveal(0.15);
  const ctaReveal = useReveal(0.15);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.5s ease both 0.1s; opacity: 0; }
        .fade-2 { animation: fadeUp 0.5s ease both 0.25s; opacity: 0; }
        .fade-3 { animation: fadeUp 0.5s ease both 0.4s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
          {/* Back */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors mb-12">
            ← Home
          </Link>

          {/* ── BIO ──────────────────────────────────────────────────────── */}
          <section
            ref={bioReveal.ref}
            className={`mb-16 transition-all duration-700 ${bioReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">À propos</p>

            {/* Photo + nom */}
            <div className="flex items-start gap-6 mb-8">
              {/* Avatar placeholder — remplace par <Image /> */}
              <div className="flex-shrink-0 w-20 h-20 rounded-sm bg-white/5 border border-white/8 flex items-center justify-center font-mono text-2xl text-white/15">
                JE
                {/* <Image src="/images/photo.jpg" alt="Jean Enock" width={80} height={80} className="object-cover rounded-sm" /> */}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Jean Enock</h1>
                <p className="text-white/35 text-sm">Développeur Full Stack</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400/70">Disponible — Alternance / Stage</span>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Je construis des interfaces qui se comportent bien sous contrainte — pas seulement en conditions idéales.
                Mon approche : comprendre le problème avant d'ouvrir l'éditeur, structurer avant de coder, optimiser pour
                les vraies conditions d'usage.
              </p>
              <p>
                En formation BTS Informatique & Développement (diplôme juin 2026), j'ai déjà livré des projets full-stack
                concrets — mobile et web — avec une attention particulière à l'architecture, la maintenabilité, et la
                performance sur réseau réel.
              </p>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-5 border border-white/8 rounded-sm">
              {[
                { val: "3+", label: "Projets livrés" },
                { val: "2", label: "Stacks maîtrisées" },
                { val: "2026", label: "Diplôme" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-white/25 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIMELINE ─────────────────────────────────────────────────── */}
          <section className="mb-16">
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-8">Parcours</p>

            <div>
              {TIMELINE.map((item, index) => (
                <TimelineEntry key={item.id} item={item} index={index} isLast={index === TIMELINE.length - 1} />
              ))}
            </div>
          </section>

          {/* ── ACADÉMIQUE ───────────────────────────────────────────────── */}
          <section
            ref={academicReveal.ref}
            className={`mb-16 transition-all duration-700 ${academicReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6">Formation</p>

            <div className="space-y-4">
              {ACADEMIC.map((a) => (
                <div key={a.degree} className="p-5 border border-white/8 rounded-sm hover:border-white/15 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{a.degree}</h3>
                      <p className="text-xs font-mono text-white/25 mt-0.5">{a.period}</p>
                    </div>
                    {a.status && (
                      <span className="flex-shrink-0 text-xs font-mono px-2 py-1 border border-blue-500/30 text-blue-400/70 rounded-sm">
                        {a.status}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {a.subjects.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-white/5 text-white/30 font-mono border border-white/5 rounded-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── HORS-CODE ────────────────────────────────────────────────── */}
          <section
            ref={outsideReveal.ref}
            className={`mb-16 transition-all duration-700 ${outsideReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6">Hors-code</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {OUTSIDE_CODE.map((item) => (
                <div key={item.label} className="p-4 border border-white/8 rounded-sm hover:border-white/20 transition-colors">
                  <span className="text-white/20 text-lg mb-2 block">{item.icon}</span>
                  <p className="text-sm font-medium text-white mb-1">{item.label}</p>
                  <p className="text-xs text-white/30 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA FINAL ────────────────────────────────────────────────── */}
          <section
            ref={ctaReveal.ref}
            className={`transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="p-8 border border-white/8 rounded-sm text-center">
              <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-3">Disponible dès maintenant</p>
              <h2 className="text-2xl font-bold text-white mb-2">Prêt à apporter cette expertise à votre équipe.</h2>
              <p className="text-white/35 text-sm mb-8 max-w-sm mx-auto">
                Alternance, stage ou projet — discutons de ce que je peux apporter concrètement.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-2.5 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors rounded-sm"
                >
                  Me contacter →
                </Link>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-white/15 text-white/50 text-sm hover:border-white/40 hover:text-white transition-all rounded-sm"
                >
                  LinkedIn →
                </a>
                <a
                  href="/docs/CV_Jean_Enock.pdf"
                  download
                  className="px-6 py-2.5 border border-white/10 text-white/35 text-sm hover:border-white/30 hover:text-white/70 transition-all rounded-sm font-mono"
                >
                  ↓ Télécharger CV
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Bouton CV flottant */}
        <a
          href="/docs/CV_Jean_Enock.pdf"
          download
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-white/20 text-white/60 text-xs font-mono rounded-sm hover:border-white/50 hover:text-white transition-all duration-200 shadow-lg z-40"
        >
          <span>↓</span> CV PDF
        </a>
      </div>
    </>
  );
}
