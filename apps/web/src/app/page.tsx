import Link from "next/link";
import { Button, Card } from "@heroui/react";
import Counter from "./components/Counter";

export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">

          {/* 3D rotating cube */}
          <div className="flex justify-center mb-20">
            <div className="cube-scene">
              <div className="cube">
                <div className="cube-face cube-face--front" />
                <div className="cube-face cube-face--back" />
                <div className="cube-face cube-face--left" />
                <div className="cube-face cube-face--right" />
                <div className="cube-face cube-face--top" />
                <div className="cube-face cube-face--bottom" />
              </div>
            </div>
          </div>
          <span className="inline-block rounded-full border border-black/10 dark:border-white/15 px-3 py-1 text-xs tracking-wide uppercase text-foreground/70">
            Pet project · Next.js 16
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight">
            Build faster with{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              My App
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
            A small playground for learning Next.js, React 19 and HeroUI.
            Clean, fast and ready for your next idea.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/about">
              <Button variant="primary" size="lg">
                Get started
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                View profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <Card.Header>
                <div className="text-2xl">{f.icon}</div>
                <Card.Title className="mt-3 text-lg font-semibold">
                  {f.title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <Card.Description className="mt-2 text-sm text-foreground/70">
                  {f.description}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </div>
      </section>

      {/* COUNTER DEMO */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <Counter />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-foreground/60 flex justify-between">
          <span>© {new Date().getFullYear()} My App</span>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "⚡",
    title: "Fast by default",
    description:
      "Server components stream HTML straight to the browser — no waiting on JS to render the page.",
  },
  {
    icon: "🧩",
    title: "Composable UI",
    description:
      "HeroUI gives you accessible, themeable components that play nicely with Tailwind v4.",
  },
  {
    icon: "🔌",
    title: "Type-safe data",
    description:
      "Drizzle ORM and Postgres are wired up, ready for real features when you need them.",
  },
];
