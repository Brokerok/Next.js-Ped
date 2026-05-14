import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { postsTable } from "@/src/db/schema";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang as Locale);
  return { title: d.blog.title, description: d.blog.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const d = await getDictionary(locale);

  const [posts, session] = await Promise.all([
    db.query.postsTable.findMany({
      with: { author: { columns: { name: true, image: true } } },
      orderBy: [desc(postsTable.createdAt)],
    }),
    auth(),
  ]);
  const isLoggedIn = !!session?.user;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{d.blog.title}</h1>
          <p className="mt-3 text-foreground/60">{d.blog.subtitle}</p>
        </div>
        {isLoggedIn && (
          <Link
            href={`/${locale}/blog/new`}
            className="flex-shrink-0 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-semibold transition-colors"
          >
            {d.blog.new_post}
          </Link>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="text-foreground/60">{d.blog.empty}</p>
      ) : (
        <ul className="flex flex-col gap-10">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-5 items-start"
              >
                {post.coverImage && (
                  <div className="relative w-full sm:w-44 h-40 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-foreground/5">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-foreground/50 mb-1.5">
                    {dateFormatter.format(post.createdAt)} · {d.blog.by}{" "}
                    {post.author.name ?? "—"}
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-indigo-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-foreground/70 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
