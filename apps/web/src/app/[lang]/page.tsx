import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button, Card } from "@heroui/react";
import { auth } from "@/auth";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import Counter from "../components/Counter";
import Carousel from "../components/Carousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang as Locale);
  return { title: d.home.title_prefix + " My App" };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
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
            {d.home.badge}
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight">
            {d.home.title_prefix}{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              My App
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
            {d.home.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${locale}/about`}>
              <Button variant="primary" size="lg">
                {d.home.cta_start}
              </Button>
            </Link>
            {isLoggedIn ? (
              <Link href={`/${locale}/profile`}>
                <Button variant="outline" size="lg">
                  {d.home.cta_profile}
                </Button>
              </Link>
            ) : (
              <Link href={`/${locale}/login`}>
                <Button variant="outline" size="lg">
                  {d.home.cta_login}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {d.home.features.map((f) => (
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

      {/* COUNTER */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <Counter />
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/40 mb-6 text-center">
          Tech Stack
        </h2>
        <Carousel />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-foreground/60 flex justify-between">
          <span>© {new Date().getFullYear()} My App</span>
          <Link
            href={`/${locale}/about`}
            className="hover:text-foreground transition-colors"
          >
            {d.footer.about}
          </Link>
        </div>
      </footer>
    </main>
  );
}
