import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { postsTable } from "@/src/db/schema";
import { getDictionary, hasLocale, locales, type Locale } from "../../dictionaries";
import { deletePost } from "../../../actions/posts";

export async function generateStaticParams() {
  const posts = await db
    .select({ slug: postsTable.slug })
    .from(postsTable);

  return locales.flatMap((lang) =>
    posts.map((p) => ({ lang, slug: p.slug })),
  );
}

async function getPost(slug: string) {
  return db.query.postsTable.findFirst({
    where: eq(postsTable.slug, slug),
    with: { author: { columns: { name: true, image: true } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const d = await getDictionary(locale);
  const [post, session] = await Promise.all([getPost(slug), auth()]);

  if (!post) notFound();
  const isAuthor = session?.user?.id === post.authorId;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/${locale}/blog`}
          className="text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          {d.blog.back}
        </Link>
        {isAuthor && (
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <input type="hidden" name="lang" value={locale} />
            <button
              type="submit"
              className="text-sm text-foreground/50 hover:text-red-500 transition-colors"
            >
              {d.blog.delete}
            </button>
          </form>
        )}
      </div>

      <article>
        <header className="mb-8">
          <div className="text-sm text-foreground/50 mb-3">
            {dateFormatter.format(post.createdAt)} · {d.blog.by}{" "}
            {post.author.name ?? "—"}
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/70">{post.excerpt}</p>
        </header>

        {post.coverImage && (
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-10 bg-foreground/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose-base flex flex-col gap-5 text-foreground/85 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </article>
    </main>
  );
}
