"use client";

// src/app/cv/page.tsx

import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CV = {
  name: "Jean Enock",
  title: "Développeur Full Stack",
  location: "Abidjan, Côte d'Ivoire · International · Remote",
  availability: "Disponible — Alternance / Stage",
  photo: "/images/photo.jpg",
  contact: {
    email: "jean.enock@email.com",
    phone: "+225 XX XX XX XX XX",
    linkedin: "linkedin.com/in/jeanenock",
    github: "github.com/jeanenock",
  },
  summary:
    "Développeur Full Stack en formation (BTS Informatique & Développement, diplôme juin 2026). Je construis des interfaces qui tiennent sous contrainte — mobile, web, connexion instable. Orienté architecture propre, maintenabilité et performance réelle.",
  experiences: [
    {
      period: "2024 — présent",
      title: "Found-Food",
      role: "Développeur Full-Stack · Projet personnel",
      stack: ["React Native", "Supabase", "TypeScript", "Expo"],
      points: [
        "Architecture Context API isolée par domaine (FoodProvider, LocationProvider, AuthProvider)",
        "Stratégie cache-first pour navigation fluide même en connexion instable",
        "Feed temps réel via Supabase Realtime + gestion offline",
        "Design Figma → développement complet iOS/Android",
      ],
    },
    {
      period: "2024",
      title: "E-Commerce Platform",
      role: "Développeur Full-Stack · Projet personnel",
      stack: ["Next.js", "TypeScript", "Supabase", "Axios", "CSS Modules"],
      points: [
        "Boutique complète : fiches produits avec variantes, panier, wishlist",
        "Dashboard admin — commandes en temps réel, notifications, suivi livraison",
        "Authentification Supabase, profil utilisateur, historique des commandes",
        "Navbar responsive 3 niveaux desktop / 2 niveaux mobile",
      ],
    },
    {
      period: "2024",
      title: "MelodyHub",
      role: "Développeur Full-Stack · Projet personnel",
      stack: ["Next.js", "PostgreSQL", "Supabase", "Tailwind CSS"],
      points: [
        "Schéma PostgreSQL normalisé (4NF) — complexité des requêtes divisée par 3",
        "SSR Next.js App Router pour les pages de découverte (SEO-friendly)",
        "Authentification et profils via Supabase Auth",
      ],
    },
    {
      period: "2023",
      title: "Logiciel de gestion de stock",
      role: "Développeur solo · Projet académique",
      stack: ["Python", "SQLite", "Tkinter"],
      points: [
        "Interface desktop CRUD complète avec export CSV",
        "Génération de rapports automatisés",
      ],
    },
  ],
  education: [
    {
      period: "2023 — 2026",
      degree: "BTS Informatique & Développement",
      school: "Diplôme prévu · Juin 2026",
      subjects: ["Algorithmique", "Bases de données", "OS", "Réseaux", "Architecture logicielle"],
    },
    {
      period: "2022 — 2023",
      degree: "Licence — Informatique",
      school: "Obtenue",
      subjects: ["POO", "Structures de données", "Mathématiques discrètes"],
    },
  ],
  skills: {
    "Mobile & Frontend": ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Flutter"],
    "Backend & Data": ["Supabase", "PostgreSQL", "Python", "Firebase", "REST APIs"],
    Outils: ["Git / GitHub", "Clean Architecture", "Figma", "Méthodes Agiles"],
  },
  languages: [
    { lang: "Français", level: "Langue maternelle" },
    { lang: "Anglais", level: "Technique" },
  ],
};

export default function CVPage() {
  const handlePrint = () => window.print();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --a1: #6C63FF;
          --a2: #E040FB;
          --a3: #00D4FF;
          --grad: linear-gradient(135deg, #6C63FF 0%, #E040FB 50%, #00D4FF 100%);
          --grad-bar: linear-gradient(90deg, #6C63FF, #E040FB);
          --grad-teal: linear-gradient(180deg, #00D4FF, #6C63FF);
          --fd: 'Syne', sans-serif;
          --fb: 'DM Sans', sans-serif;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .cv-shell { animation: fadeUp 0.5s ease both; }

        .grad-text {
          background: var(--grad);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }

        .exp-card {
          background: linear-gradient(135deg, rgba(108,99,255,0.04) 0%, rgba(224,64,251,0.02) 100%);
          border: 0.5px solid rgba(108,99,255,0.14);
          border-radius: 10px;
          padding: 14px 16px 12px 20px;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--grad-bar);
        }

        .edu-card {
          background: linear-gradient(135deg, rgba(0,212,255,0.05), rgba(108,99,255,0.03));
          border: 0.5px solid rgba(0,212,255,0.18);
          border-radius: 10px;
          padding: 12px 14px 10px 18px;
          margin-bottom: 8px;
          position: relative;
          overflow: hidden;
        }
        .edu-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--grad-teal);
        }

        .sec-title {
          font-family: var(--fd);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: var(--grad);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sec-title::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(108,99,255,0.35), transparent);
        }

        .skill-pill {
          font-family: var(--fb);
          font-size: 9px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(224,64,251,0.05));
          border: 0.5px solid rgba(108,99,255,0.22);
          color: #7B74FF;
          display: inline-block;
        }

        .stack-tag {
          font-family: monospace;
          font-size: 8.5px;
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(108,99,255,0.07);
          border: 0.5px solid rgba(108,99,255,0.18);
          color: #9590FF;
          display: inline-block;
        }

        @media print {
          @page { size: A4; margin: 9mm 11mm; }
          html, body {
            background: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .cv-shell { background: #fff !important; padding: 0 !important; animation: none !important; }
          .cv-paper { box-shadow: none !important; max-width: 100% !important; border-radius: 0 !important; }
          .exp-card, .edu-card { page-break-inside: avoid; }
        }
      `}</style>

      {/* ── Shell ── */}
      <div
        className="cv-shell min-h-screen py-8 px-4"
        style={{ background: "linear-gradient(135deg, #0c0b1a 0%, #150920 50%, #091420 100%)" }}
      >
        {/* Top bar */}
        <div className="no-print max-w-[840px] mx-auto mb-5 flex items-center justify-between">
          <Link
            href="/"
            style={{ fontFamily: "var(--fb)", fontSize: 12, color: "rgba(255,255,255,0.3)" }}
            className="hover:text-white/70 transition-colors"
          >
            ← Portfolio
          </Link>
          <button
            onClick={handlePrint}
            style={{
              fontFamily: "var(--fb)",
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              padding: "9px 22px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #6C63FF, #E040FB)",
              boxShadow: "0 4px 24px rgba(108,99,255,0.45)",
              border: "none",
              cursor: "pointer",
            }}
          >
            ↓ Télécharger PDF
          </button>
        </div>

        {/* ── Feuille A4 ── */}
        <div
          className="cv-paper max-w-[840px] mx-auto"
          style={{
            background: "#ffffff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(108,99,255,0.28), 0 0 0 1px rgba(108,99,255,0.1)",
          }}
        >
          {/* ══ HEADER ══ */}
          <div
            style={{
              background: "linear-gradient(135deg, #0e0b20 0%, #1c0b30 45%, #0a1628 100%)",
              padding: "30px 36px 26px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Orbes */}
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 260,
                height: 260,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(108,99,255,0.25) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -50,
                left: "25%",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(224,64,251,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -40,
                left: "60%",
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 22, alignItems: "flex-start" }}>
              {/* Photo */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(224,64,251,0.15))",
                  border: "2px solid rgba(108,99,255,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Décommente quand tu as ta photo :
                  <Image src={CV.photo} alt="Jean Enock" width={90} height={90}
                    style={{ objectFit:"cover", width:"100%", height:"100%" }} />
                */}
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #6C63FF, #E040FB)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  JE
                </span>
              </div>

              {/* Identité */}
              <div style={{ flex: 1 }}>
                <h1
                  className="grad-text"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 38,
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-1.5px",
                    marginBottom: 4,
                  }}
                >
                  {CV.name}
                </h1>

                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {CV.title}
                </p>

                {/* Contact */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {[
                    { label: "✉", val: CV.contact.email },
                    { label: "☎", val: CV.contact.phone },
                    { label: "in", val: CV.contact.linkedin },
                    { label: "gh", val: CV.contact.github },
                    { label: "◎", val: CV.location },
                  ].map((c) => (
                    <div key={c.val} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: "monospace",
                          color: "#9590FF",
                          width: 14,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        {c.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {c.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div
                className="no-print"
                style={{
                  flexShrink: 0,
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: "rgba(52,211,153,0.1)",
                  border: "0.5px solid rgba(52,211,153,0.3)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: "#34d399",
                  whiteSpace: "nowrap",
                }}
              >
                ● {CV.availability}
              </div>
            </div>
          </div>

          {/* ══ BODY ══ */}
          <div
            style={{
              padding: "26px 36px 28px",
              display: "grid",
              gridTemplateColumns: "1fr 270px",
              gap: 26,
              background: "#fff",
            }}
          >
            {/* ── Colonne gauche ── */}
            <div>
              {/* Profil */}
              <div style={{ marginBottom: 22 }}>
                <div className="sec-title">Profil</div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11.5,
                    color: "#3d3d4e",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  {CV.summary}
                </p>
              </div>

              {/* Expériences */}
              <div>
                <div className="sec-title">Expériences & Projets</div>
                {CV.experiences.map((exp) => (
                  <div key={exp.title} className="exp-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: "#1a1a2e",
                            margin: 0,
                          }}
                        >
                          {exp.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 9.5,
                            color: "#9090aa",
                            margin: "2px 0 6px",
                            fontStyle: "italic",
                          }}
                        >
                          {exp.role}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 8.5,
                          color: "#8B83FF",
                          background: "rgba(108,99,255,0.08)",
                          padding: "2px 7px",
                          borderRadius: 4,
                          flexShrink: 0,
                          marginLeft: 10,
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 7 }}>
                      {exp.stack.map((s) => (
                        <span key={s} className="stack-tag">
                          {s}
                        </span>
                      ))}
                    </div>

                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {exp.points.map((p, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: 7,
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            color: "#555566",
                            lineHeight: 1.65,
                            marginBottom: 2,
                          }}
                        >
                          <span style={{ color: "#c4b5fd", flexShrink: 0, marginTop: 2 }}>›</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Colonne droite ── */}
            <div>
              {/* Formation */}
              <div style={{ marginBottom: 22 }}>
                <div className="sec-title">Formation</div>
                {CV.education.map((edu) => (
                  <div key={edu.degree} className="edu-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#1a1a2e",
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {edu.degree}
                      </h3>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 8,
                          color: "#00b4d8",
                          background: "rgba(0,212,255,0.07)",
                          padding: "2px 6px",
                          borderRadius: 4,
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        {edu.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        color: "#00b4cc",
                        margin: "2px 0 6px",
                        fontStyle: "italic",
                      }}
                    >
                      {edu.school}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {edu.subjects.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontFamily: "monospace",
                            fontSize: 8,
                            padding: "1px 6px",
                            borderRadius: 3,
                            background: "rgba(0,212,255,0.06)",
                            border: "0.5px solid rgba(0,212,255,0.18)",
                            color: "#55b8cc",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compétences */}
              <div style={{ marginBottom: 22 }}>
                <div className="sec-title">Compétences</div>
                {Object.entries(CV.skills).map(([domain, items]) => (
                  <div key={domain} style={{ marginBottom: 12 }}>
                    <p
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 8.5,
                        fontWeight: 600,
                        color: "#aaa0c0",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 5,
                      }}
                    >
                      {domain}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {items.map((s) => (
                        <span key={s} className="skill-pill">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Langues */}
              <div>
                <div className="sec-title">Langues</div>
                {CV.languages.map((l) => (
                  <div
                    key={l.lang}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 7,
                      padding: "7px 12px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, rgba(108,99,255,0.06), rgba(224,64,251,0.03))",
                      border: "0.5px solid rgba(108,99,255,0.12)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#1a1a2e",
                      }}
                    >
                      {l.lang}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        color: "#8B83FF",
                        fontStyle: "italic",
                      }}
                    >
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ FOOTER ══ */}
          <div
            style={{
              padding: "11px 36px",
              background: "linear-gradient(135deg, #0e0b20, #1c0b30)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {CV.contact.email}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                margin: "0 16px",
                background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.4), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #6C63FF, #E040FB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JEAN ENOCK · {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* Bouton bas */}
        <div className="no-print max-w-[840px] mx-auto mt-5 flex justify-end">
          <button
            onClick={handlePrint}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              padding: "10px 24px",
              borderRadius: 8,
              background: "linear-gradient(135deg, #6C63FF, #E040FB)",
              boxShadow: "0 4px 24px rgba(108,99,255,0.45)",
              border: "none",
              cursor: "pointer",
            }}
          >
            ↓ Télécharger PDF
          </button>
        </div>
      </div>
    </>
  );
}
