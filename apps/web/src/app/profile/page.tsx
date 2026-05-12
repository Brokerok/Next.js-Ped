import Link from "next/link";
import { pluralize } from "@my-app/utils";
import ProfileEditor from "../components/ProfileEditor";

const stats = [
  { n: 3,   forms: ["проект",    "проекта",    "проектов"]    as const },
  { n: 142, forms: ["коммит",    "коммита",    "коммитов"]    as const },
  { n: 8,   forms: ["технология","технологии", "технологий"]  as const },
];

const profile = {
  name: "Pavlo Shevchuk",
  role: "Python / Django Developer",
  location: "Kyiv, Ukraine",
  joined: "2024",
  bio: "Самоучка, несколько лет пишу на Python и Django. Сейчас изучаю Next.js и фронтенд через этот pet project. Люблю разбираться в том, как всё устроено под капотом.",
  skills: [
    { name: "Python", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
    { name: "Django", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
    { name: "PostgreSQL", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
    { name: "Next.js", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
    { name: "React", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
    { name: "TypeScript", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
    { name: "Tailwind CSS", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
    { name: "Git", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  ],
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mb-10"
      >
        ← На главную
      </Link>

      {/* Avatar + name */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          PS
        </div>
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-sm text-foreground/60 mt-0.5">{profile.role}</p>
          <div className="flex gap-3 mt-1.5 text-xs text-foreground/40">
            <span>📍 {profile.location}</span>
            <span>📅 с {profile.joined}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.forms[0]}
            className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 text-center"
          >
            <p className="text-2xl font-bold">{s.n}</p>
            <p className="text-xs text-foreground/50 mt-0.5">{pluralize(s.n, s.forms)}</p>
          </div>
        ))}
      </div>

      {/* Bio — client component */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 mb-6">
        <ProfileEditor initialBio={profile.bio} />
      </div>

      {/* Skills */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50 mb-4">
          Стек
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill.name}
              className={`px-3 py-1 rounded-full text-sm font-medium ${skill.color}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
