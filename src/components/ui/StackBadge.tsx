const STACK_ICONS: Record<string, string> = {
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "CSS Modules": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Axios: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg",
  Expo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg",
};

export function StackBadge({ tech }: { tech: string }) {
  const icon = STACK_ICONS[tech];
  return (
    <span className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-white/5 text-white/50 rounded-sm border border-white/8 font-mono">
      {icon && (
        <img
          src={icon}
          alt={tech}
          width={14}
          height={14}
          className={`object-contain ${tech === "GitHub" ? "invert" : ""}`}
        />
      )}
      {tech}
    </span>
  );
}
