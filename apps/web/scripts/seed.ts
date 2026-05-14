import "dotenv/config";
import { db } from "../src/db";
import { postsTable, usersTable } from "../src/db/schema";

const samplePosts = [
  {
    slug: "hello-nextjs-16",
    title: "Hello, Next.js 16",
    excerpt: "First impressions after switching from Pages Router to App Router.",
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    content: `Next.js 16 brings the App Router to a new level. Server Components by default, streaming with Suspense, and Server Actions for mutations — all of this changes how we think about building web apps.

Coming from a Django background, the closest analogy is: Server Components are like Django views that render HTML, Client Components are like islands of vanilla JS sprinkled on top, and Server Actions replace the old "form posts to a view" pattern.

The most surprising part for me was how little JavaScript ends up shipping to the browser. The features section, the layout, even the auth check — all of it runs on the server and only the resulting HTML reaches the user.`,
  },
  {
    slug: "server-components-vs-django-views",
    title: "Server Components vs Django Views",
    excerpt: "A side-by-side comparison from a Django developer's perspective.",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    content: `When I first read about React Server Components I thought "isn't this just SSR?" — but it's actually quite different.

In Django, a view receives an HTTP request, queries the DB, and renders a template into HTML. The template engine runs once per request, sends the result, and the page is done.

Server Components are similar but composable. Each component can independently fetch its own data, render its own HTML, and stream it to the browser. The browser stitches the pieces together as they arrive. You get the developer ergonomics of components with the performance characteristics of SSR.`,
  },
  {
    slug: "drizzle-orm-feels-like-sql",
    title: "Why Drizzle ORM feels like SQL",
    excerpt: "Drizzle's design philosophy and how it compares to the Django ORM.",
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop",
    content: `Django's ORM hides SQL behind a clean Python API: User.objects.filter(email="a@b.com").first(). It's expressive but sometimes magical.

Drizzle takes the opposite approach. Every query looks like SQL: db.select().from(users).where(eq(users.email, "a@b.com")). The mental model maps 1:1 to the database, which makes debugging dramatically easier.

The tradeoff is verbosity — Drizzle is more typing for simple queries. But for complex queries with joins and aggregations, Drizzle wins by being predictable. You always know what SQL will be generated.`,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  const [firstUser] = await db.select().from(usersTable).limit(1);

  if (!firstUser) {
    console.error("❌ No users found. Create an account first via /signup");
    process.exit(1);
  }

  console.log(`📝 Using author: ${firstUser.name ?? firstUser.email}`);

  for (const post of samplePosts) {
    await db
      .insert(postsTable)
      .values({ ...post, authorId: firstUser.id })
      .onConflictDoNothing({ target: postsTable.slug });
  }

  const count = (await db.select().from(postsTable)).length;
  console.log(`✅ Done. Total posts in DB: ${count}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
