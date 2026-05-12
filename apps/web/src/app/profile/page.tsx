import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  return {
    title: session?.user?.name ? `${session.user.name}` : "Профиль",
  };
}
import { pluralize } from "@my-app/utils";
import ProfileEditor from "../components/ProfileEditor";
import { logout } from "../actions/auth";

const stats = [
  { n: 3,   forms: ["проект",    "проекта",    "проектов"]    as const },
  { n: 142, forms: ["коммит",    "коммита",    "коммитов"]    as const },
  { n: 8,   forms: ["технология","технологии", "технологий"]  as const },
];

const skills = [
  { name: "Python",       color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  { name: "Django",       color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  { name: "PostgreSQL",   color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
  { name: "Next.js",      color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  { name: "React",        color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
  { name: "TypeScript",   color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
  { name: "Tailwind CSS", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
  { name: "Git",          color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
];

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const name = session.user.name ?? "Пользователь";
  const email = session.user.email ?? "";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      {/* Back link + logout */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          ← На главную
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-foreground/50 hover:text-red-500 transition-colors"
          >
            Выйти
          </button>
        </form>
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-foreground/60 mt-0.5">{email}</p>
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

      {/* Bio */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 mb-6">
        <ProfileEditor initialBio="Самоучка, несколько лет пишу на Python и Django. Сейчас изучаю Next.js и фронтенд через этот pet project." />
      </div>

      {/* Skills */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50 mb-4">
          Стек
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
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
