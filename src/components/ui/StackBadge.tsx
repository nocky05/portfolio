"use client";

// src/components/ui/StackBadge.tsx
// Usage : <StackBadge tech="Next.js" />
// Utilise les logos devicons via jsDelivr CDN

const ICONS: Record<string, { url: string; invert?: boolean }> = {
  "Next.js": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
  React: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  "React Native": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  TypeScript: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  JavaScript: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  "Tailwind CSS": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  Flutter: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  Dart: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  Supabase: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  PostgreSQL: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  Python: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  Firebase: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  SQLite: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  Git: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  GitHub: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  Figma: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  "CSS Modules": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  Axios: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" },
  Expo: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg", invert: true },
  Tkinter: { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  "REST APIs": { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
};

interface StackBadgeProps {
  tech: string;
  /** "dark" = fond sombre (pages dark), "light" = fond clair (CV) */
  theme?: "dark" | "light";
  size?: "sm" | "md";
}

export function StackBadge({ tech, theme = "dark", size = "sm" }: StackBadgeProps) {
  const icon = ICONS[tech];

  const darkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: size === "sm" ? "5px" : "6px",
    fontSize: size === "sm" ? "10px" : "11px",
    padding: size === "sm" ? "3px 8px" : "4px 10px",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "monospace",
    whiteSpace: "nowrap" as const,
  };

  const lightStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: size === "sm" ? "5px" : "6px",
    fontSize: size === "sm" ? "9px" : "10px",
    padding: size === "sm" ? "2px 7px" : "3px 9px",
    borderRadius: "4px",
    background: "rgba(108,99,255,0.07)",
    border: "0.5px solid rgba(108,99,255,0.18)",
    color: "#7B74FF",
    fontFamily: "monospace",
    whiteSpace: "nowrap" as const,
  };

  const imgSize = size === "sm" ? 13 : 15;

  return (
    <span style={theme === "dark" ? darkStyle : lightStyle}>
      {icon && (
        <img
          src={icon.url}
          alt={tech}
          width={imgSize}
          height={imgSize}
          style={{
            objectFit: "contain",
            flexShrink: 0,
            filter: icon.invert ? "invert(1)" : "none",
          }}
        />
      )}
      {tech}
    </span>
  );
}

// ─── StackRow — groupe de badges ──────────────────────────────────────────────
export function StackRow({
  stack,
  theme = "dark",
  size = "sm",
}: {
  stack: string[];
  theme?: "dark" | "light";
  size?: "sm" | "md";
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {stack.map((tech) => (
        <StackBadge key={tech} tech={tech} theme={theme} size={size} />
      ))}
    </div>
  );
}
