"use client";

// src/app/contact/page.tsx

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillGroup {
  domain: string;
  subtitle: string;
  icon: string;
  skills: { name: string; level: number }[]; // level 1-5
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

type SendStatus = "idle" | "sending" | "success" | "error";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: "Mobile & Frontend",
    subtitle: "Le Visible",
    icon: "◈",
    skills: [
      { name: "Next.js / React", level: 5 },
      { name: "React Native", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Flutter (Dart)", level: 3 },
    ],
  },
  {
    domain: "Backend & Data",
    subtitle: "L'Invisible",
    icon: "◎",
    skills: [
      { name: "Supabase", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Python / SQLAlchemy", level: 4 },
      { name: "Firebase", level: 3 },
      { name: "REST APIs", level: 4 },
    ],
  },
  {
    domain: "Outils & Engineering",
    subtitle: "La Rigueur",
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
    domain: "Soft Skills",
    subtitle: "L'Humain",
    icon: "◉",
    skills: [
      { name: "Discipline & rigueur", level: 5 },
      { name: "Esprit d'analyse", level: 5 },
      { name: "Apprentissage rapide", level: 5 },
      { name: "Autonomie", level: 4 },
      { name: "Communication", level: 4 },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    handle: "@jeanenock",
    href: "https://github.com/",
    icon: "GH",
  },
  {
    label: "LinkedIn",
    handle: "Jean Enock",
    href: "https://linkedin.com/",
    icon: "IN",
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, visible, delay }: {
  name: string; level: number; visible: boolean; delay: number;
}) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
          {name}
        </span>
        <span className="text-xs font-mono text-white/20">
          {"█".repeat(level)}{"░".repeat(5 - level)}
        </span>
      </div>
      <div className="h-px bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full bg-white/40 rounded-full transition-all duration-700 ease-out"
          style={{ width: animated ? `${(level / 5) * 100}%` : "0%" }}
        />
      </div>
    </div>
  );
}

// ─── Skill Group Card ─────────────────────────────────────────────────────────
function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`p-5 border border-white/8 rounded-sm hover:border-white/20 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-white/15 text-sm mb-1 block">{group.icon}</span>
          <h3 className="text-sm font-semibold text-white">{group.domain}</h3>
          <p className="text-xs text-white/25 font-mono">{group.subtitle}</p>
        </div>
      </div>
      <div className="space-y-3">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            visible={visible}
            delay={i * 80}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Ton nom est requis.";
  if (!form.email.trim()) errors.email = "Ton email est requis.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Format d'email invalide.";
  if (!form.subject.trim()) errors.subject = "Un sujet, c'est mieux.";
  if (!form.message.trim()) errors.message = "Le message est vide.";
  else if (form.message.trim().length < 20)
    errors.message = "Dis-m'en un peu plus (20 caractères min).";
  return errors;
}

// ─── Input Field ─────────────────────────────────────────────────────────────
function Field({
  label, id, error, children,
}: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-mono text-white/35 mb-1.5 tracking-wider uppercase"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400/80 font-mono transition-all animate-[fadeUp_0.2s_ease]">
          ↑ {error}
        </p>
      )}
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SendStatus>("idle");

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...form, [key]: val }) }));
    }
  };

  const blur = (key: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, ...validate(form) }));
  };

  const inputClass = (key: keyof FormState) =>
    `w-full bg-white/[0.03] border rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 font-mono ${
      touched[key] && errors[key]
        ? "border-red-500/50 focus:border-red-400"
        : "border-white/10 focus:border-white/35 hover:border-white/20"
    }`;

  const handleSubmit = async () => {
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");

    try {
      // Option A : Formspree (remplace l'URL par ton endpoint)
      // const res = await fetch("https://formspree.io/f/VOTRE_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      // Option B : API Route Next.js → /api/contact
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      // Simulation pour le dev — retire ce bloc en production
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // ── Succès ─────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center animate-[fadeUp_0.4s_ease]">
        <div className="w-12 h-12 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl">
          ✓
        </div>
        <h3 className="text-white font-semibold">Message envoyé.</h3>
        <p className="text-white/35 text-sm max-w-xs">
          Je reviens vers toi dans les 24h. En attendant, jette un œil à mes projets.
        </p>
        <Link
          href="/projects"
          className="mt-2 text-xs font-mono text-white/30 hover:text-white/70 transition-colors"
        >
          Voir les projets →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nom" id="name" error={touched.name ? errors.name : undefined}>
          <input
            id="name"
            type="text"
            placeholder="Jean Dupont"
            value={form.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={inputClass("name")}
          />
        </Field>
        <Field label="Email" id="email" error={touched.email ? errors.email : undefined}>
          <input
            id="email"
            type="email"
            placeholder="jean@example.com"
            value={form.email}
            onChange={set("email")}
            onBlur={blur("email")}
            className={inputClass("email")}
          />
        </Field>
      </div>

      <Field label="Sujet" id="subject" error={touched.subject ? errors.subject : undefined}>
        <input
          id="subject"
          type="text"
          placeholder="Alternance, projet, collaboration..."
          value={form.subject}
          onChange={set("subject")}
          onBlur={blur("subject")}
          className={inputClass("subject")}
        />
      </Field>

      <Field label="Message" id="message" error={touched.message ? errors.message : undefined}>
        <textarea
          id="message"
          rows={5}
          placeholder="Décris ton projet ou ta demande..."
          value={form.message}
          onChange={set("message")}
          onBlur={blur("message")}
          className={`${inputClass("message")} resize-none`}
        />
      </Field>

      {status === "error" && (
        <p className="text-xs text-red-400/80 font-mono">
          Erreur lors de l'envoi. Réessaie ou écris-moi directement sur LinkedIn.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className="w-full py-3 bg-white text-black text-sm font-medium rounded-sm hover:bg-white/90 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message →"}
      </button>
    </div>
  );
}

// ─── Page Skills & Contact ────────────────────────────────────────────────────
export default function SkillsContactPage() {
  const contactReveal = useReveal(0.1);
  const socialReveal = useReveal(0.15);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
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

          {/* ── SKILLS ───────────────────────────────────────────────────── */}
          <section className="mb-20">
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-3">
              Compétences
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Ce que je maîtrise
            </h1>
            <p className="text-white/35 text-base max-w-lg mb-10">
              Segmenté par domaine — pas une liste de logos, mais une vision d'architecte.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group, i) => (
                <SkillCard key={group.domain} group={group} index={i} />
              ))}
            </div>
          </section>

          {/* ── CONTACT ──────────────────────────────────────────────────── */}
          <section
            ref={contactReveal.ref}
            className={`mb-12 transition-all duration-700 ${
              contactReveal.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase mb-3">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              On travaille ensemble ?
            </h2>
            <p className="text-white/35 text-base mb-8">
              Abidjan · International · Remote
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Formulaire — occupe 3/5 */}
              <div className="lg:col-span-3 p-6 border border-white/8 rounded-sm">
                <ContactForm />
              </div>

              {/* Sidebar infos — occupe 2/5 */}
              <div className="lg:col-span-2 space-y-4">

                {/* Disponibilité */}
                <div className="p-4 border border-emerald-500/20 rounded-sm bg-emerald-500/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-400/80">Disponible</span>
                  </div>
                  <p className="text-sm text-white/50">
                    Alternance ou stage à fort impact — ouvert aux opportunités
                    locales et internationales.
                  </p>
                </div>

                {/* Temps de réponse */}
                <div className="p-4 border border-white/8 rounded-sm">
                  <p className="text-xs font-mono text-white/25 mb-1">Temps de réponse</p>
                  <p className="text-sm text-white/60">Sous 24h en semaine</p>
                </div>

                {/* Liens sociaux */}
                <div
                  ref={socialReveal.ref}
                  className={`space-y-2 transition-all duration-500 ${
                    socialReveal.visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border border-white/8 rounded-sm hover:border-white/25 hover:bg-white/[0.02] transition-all group"
                    >
                      <span className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors border border-white/8">
                        {s.icon}
                      </span>
                      <div>
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                          {s.label}
                        </p>
                        <p className="text-xs font-mono text-white/25">{s.handle}</p>
                      </div>
                      <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
                        →
                      </span>
                    </a>
                  ))}

                  {/* CV download */}
                  <a
                    href="/docs/CV_Jean_Enock.pdf"
                    download
                    className="flex items-center gap-3 p-4 border border-white/8 rounded-sm hover:border-white/25 transition-all group"
                  >
                    <span className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors border border-white/8">
                      ↓
                    </span>
                    <div>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                        Télécharger le CV
                      </p>
                      <p className="text-xs font-mono text-white/25">PDF · À jour</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="border-t border-white/5 py-8">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/20 font-mono">
            <span>© 2025 Jean Enock — Codé avec ☕</span>
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
      </div>
    </>
  );
}
