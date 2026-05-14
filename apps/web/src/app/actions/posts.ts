"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { postsTable } from "@/src/db/schema";
import { defaultLocale } from "../[lang]/dictionaries";

const postSchema = z.object({
  title: z.string().trim().min(3, "title_too_short").max(120, "title_too_long"),
  excerpt: z.string().trim().min(10, "excerpt_too_short").max(280, "excerpt_too_long"),
  content: z.string().trim().min(20, "content_too_short"),
  coverImage: z.string().url("cover_invalid").optional().or(z.literal("")),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof postSchema>, string[]>>;
export type CreatePostState = { errors?: FieldErrors; message?: string } | undefined;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-яёіїєґ\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "post";
  let attempt = 0;
  while (true) {
    const candidate = attempt === 0 ? slug : `${slug}-${attempt}`;
    const existing = await db
      .select({ id: postsTable.id })
      .from(postsTable)
      .where(eq(postsTable.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    attempt++;
  }
}

export async function createPost(
  _state: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const session = await auth();
  if (!session?.user?.id) return { message: "unauthorized" };

  const lang = (formData.get("lang") as string) || defaultLocale;

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
  });

  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      (errors[key] ??= []).push(issue.message);
    }
    return { errors };
  }

  const slug = await uniqueSlug(slugify(parsed.data.title));

  await db.insert(postsTable).values({
    slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    coverImage: parsed.data.coverImage || null,
    authorId: session.user.id,
  });

  revalidatePath(`/${lang}/blog`);
  redirect(`/${lang}/blog/${slug}`);
}

export async function deletePost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const id = formData.get("id") as string;
  const lang = (formData.get("lang") as string) || defaultLocale;

  const [post] = await db
    .select({ authorId: postsTable.authorId })
    .from(postsTable)
    .where(eq(postsTable.id, id))
    .limit(1);

  if (!post || post.authorId !== session.user.id) return;

  await db.delete(postsTable).where(eq(postsTable.id, id));

  revalidatePath(`/${lang}/blog`);
  redirect(`/${lang}/blog`);
}
