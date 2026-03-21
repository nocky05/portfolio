"use client";

// src/app/contact/page.tsx

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  level: number; // 1-5
}

interface SkillDomain {
  id: string;
  label: string;
  description: string;
  icon: string;
  skills: Skill[];
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: "frontend",
    label: "Mobile & Frontend",
    description: "Le visible",
    icon: "◈",
    skills: [
      { name: "Next.js / React", level: 5 },
      { name: "React Native", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Flutter (Dart)", level: 3 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    description: "L'invisible",
    icon: "◎",
    skills: [
      { name: "Supabase", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Python / SQLAlchemy", level: 3 },
      { name: "Firebase", level: 3 },
      { name: "REST APIs", level: 4 },
    ],
  },
  {
    id: "engineering",
    label: "Outils & Engineering",
    description: "La rigueur",
    icon: "◇",
    skills: [
      { name: "Git / GitHub", level: 5 },
      { name: "Clean Architecture", level: 4 },
      { name: "State Management", level: 4 },
      { name: "Méthodes Agiles", level: 3 },
      { name: "Figma", level: 3 },
    ],
  },
  {
    id: "soft",
    label: "Soft Skills",
    description: "L'humain",
    icon: "○",
    skills: [
      { name: "Discipline", level: 5 },
      { name: "Esprit d'analyse", level: 5 },
      { name: "Apprentissage rapide", level: 5 },
      { name: "Autonomie", level: 4 },
      { name: "Communication", level: 4 },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    handle: "jean-enock",
    href: "https://linkedin.com/in/jean-enock",
    icon: "in",
  },
  {
    label: "GitHub",
    handle: "jean-enock",
    href: "https://github.com/jean-enock",
    icon: "gh",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Ton prénom est requis.";
  if (!form.email.trim()) {
    errors.email = "L'email est requis.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format d'email invalide.";
  }
  if (!form.subject.trim()) errors.subject = "Précise l'objet de ton message.";
  if (!form.message.trim()) {
    errors.message = "Le message ne peut pas être vide.";
  } else if (form.message.trim().length < 20) {
    errors.message = "Minimum 20 caractères.";
  }
  return errors;
}

// ─── Hook : Intersection Observer ────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({
  skill,
  visible,
  delay,
}: {
  skill: Skill;
  visible: boolean;
  delay: number;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-white/20">
          {"●".repeat(skill.level)}
          {"○".repeat(5 - skill.level)}
        </span>
      </div>
      <div className="h-px bg-white/5 overflow-hidden">
        <div
          className="h-full bg-white/30 transition-all duration-700 ease-out"
          style={{
            width: visible ? `${(skill.level / 5) * 100}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Skill Domain Card ─────────────────────────────────────────────────────────
function SkillDomainCard({ domain, index }: { domain: SkillDomain; index: number }) {
  const { ref, visible } = useReveal(0.15);

  return (
    <div
      ref={ref}
      className={`p-5 border border-white/8 rounded-sm hover:border-white/20 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <span className="text-white/15 text-xl block mb-1">{domain.icon}</span>
          <h3 className="text-sm font-semibold text-white">{domain.label}</h3>
          <p className="text-xs text-white/25 font-mono">{domain.description}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {domain.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} visible={visible} delay={i * 80 + 200} />
        ))}
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  touched,
  children,
}: {
  label: string;
  error?: string;
  touched: boolean;
  children: React.ReactNode;
}) {
  const hasError = touched && error;
  return (
    <div>
      <label className="block text-xs font-mono text-white/35 mb-1.5 tracking-wider uppercase">
        {label}
      </label>
      <div className={`transition-all duration-200 ${hasError ? "ring-1 ring-red-500/50 rounded-sm" : ""}`}>
        {children}
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${hasError ? "max-h-8 mt-1.5" : "max-h-0"}`}>
        <p className="text-xs text-red-400/80 font-mono">{error}</p>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    // Validation en temps réel si le champ a déjà été touché
    if (touched[name]) {
      setErrors(validateForm(next));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateForm(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Marquer tous les champs comme touchés
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      // Remplace FORMSPREE_ID par ton vrai ID Formspree
      // ou connecte ton API Route Next.js : /api/contact
      const res = await fetch("https://formspree.io/f/FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {/* Check animé */}
        <div className="w-14 h-14 rounded-full border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 text-2xl animate-[fadeUp_0.4s_ease_both]">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Message envoyé !</h3>
        <p className="text-white/35 text-sm max-w-xs">Je te réponds en général sous 24h. À bientôt.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-mono text-white/25 hover:text-white/60 transition-colors"
        >
          ← Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom" error={errors.name} touched={!!touched.name}>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Jean Dupont"
            className={inputClass}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email} touched={!!touched.email}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="hello@example.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Sujet" error={errors.subject} touched={!!touched.subject}>
        <input
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Alternance, stage, collaboration..."
          className={inputClass}
        />
      </Field>

      <Field label="Message" error={errors.message} touched={!!touched.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Décris ton projet ou ta proposition..."
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {status === "error" && (
        <p className="text-xs text-red-400/80 font-mono">
          Erreur lors de l'envoi. Réessaie ou contacte-moi directement par LinkedIn.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-white text-black text-sm font-medium rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
            Envoi en cours...
          </span>
        ) : (
          "Envoyer le message →"
        )}
      </button>
    </form>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroReveal = useReveal(0.1);
  const contactReveal = useReveal(0.1);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeUp 0.5s ease both; opacity: 0; }
        .fade-in-2 { animation: fadeUp 0.5s ease both 0.15s; opacity: 0; }
        .fade-in-3 { animation: fadeUp 0.5s ease both 0.3s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors mb-12"
          >
            ← Home
          </Link>

          {/* ── HEADER ────────────────────────────────────────────────────── */}
          <div className="mb-14 fade-in">
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-3">
              Skills & Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Ce que je maîtrise.
              <br />
              <span className="text-white/20">Et comment me joindre.</span>
            </h1>
          </div>

          {/* ── SKILLS ────────────────────────────────────────────────────── */}
          <section className="mb-20">
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6 fade-in-2">
              Compétences
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILL_DOMAINS.map((domain, i) => (
                <SkillDomainCard key={domain.id} domain={domain} index={i} />
              ))}
            </div>
          </section>

          {/* ── CONTACT ───────────────────────────────────────────────────── */}
          <div
            ref={contactReveal.ref}
            className={`grid grid-cols-1 lg:grid-cols-5 gap-10 transition-all duration-700 ${
              contactReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Infos contact — colonne gauche */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-4">
                  Me joindre
                </p>
                <h2 className="text-2xl font-bold text-white mb-2">On travaille ensemble ?</h2>
                <p className="text-white/35 text-sm leading-relaxed">
                  Alternance, stage, projet freelance — je suis ouvert à la discussion.
                </p>
              </div>

              {/* Localisation */}
              <div className="flex items-start gap-3 p-4 border border-white/8 rounded-sm">
                <span className="text-white/20 mt-0.5">◎</span>
                <div>
                  <p className="text-sm font-medium text-white">Abidjan / International</p>
                  <p className="text-xs text-white/30 mt-0.5">Disponible en remote ou sur site</p>
                </div>
              </div>

              {/* Liens sociaux */}
              <div className="space-y-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-white/8 rounded-sm hover:border-white/25 hover:bg-white/[0.02] transition-all group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-sm font-mono text-xs text-white/40 group-hover:text-white/70 group-hover:border-white/25 transition-all">
                      {s.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{s.label}</p>
                      <p className="text-xs text-white/25 font-mono">/{s.handle}</p>
                    </div>
                    <span className="text-white/20 group-hover:text-white/50 transition-colors">→</span>
                  </a>
                ))}
              </div>

              {/* CV */}
              <a
                href="/docs/CV_Jean_Enock.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/10 text-white/35 text-sm font-mono rounded-sm hover:border-white/30 hover:text-white/70 transition-all"
              >
                ↓ Télécharger CV PDF
              </a>
            </div>

            {/* Formulaire — colonne droite */}
            <div className="lg:col-span-3 p-6 border border-white/8 rounded-sm">
              <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-6">
                Formulaire de contact
              </p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 py-6">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-white/15">
            <span>© 2025 Jean Enock</span>
            <span>Codé avec ☕ par Jean Enock · Abidjan</span>
            <div className="flex gap-5">
              <a
                href="https://github.com/jean-enock"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jean-enock"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
