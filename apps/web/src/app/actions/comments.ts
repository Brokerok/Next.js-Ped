"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { commentsTable } from "@/src/db/schema";

const commentSchema = z.object({
  content: z.string().trim().min(2, "too_short").max(1000, "too_long"),
});

type FieldErrors = { content?: string[] };
export type CommentState =
  | { errors?: FieldErrors; message?: string; ok?: boolean }
  | undefined;

export async function createComment(
  _state: CommentState,
  formData: FormData,
): Promise<CommentState> {
  const session = await auth();
  if (!session?.user?.id) return { message: "unauthorized" };

  const postId = formData.get("postId") as string;
  const slug = formData.get("slug") as string;
  const lang = formData.get("lang") as string;

  const parsed = commentSchema.safeParse({ content: formData.get("content") });
  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      (errors[key] ??= []).push(issue.message);
    }
    return { errors };
  }

  await db.insert(commentsTable).values({
    postId,
    authorId: session.user.id,
    content: parsed.data.content,
  });

  revalidatePath(`/${lang}/blog/${slug}`);
  return { ok: true };
}

export async function deleteComment(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;
  const lang = formData.get("lang") as string;

  const [comment] = await db
    .select({ authorId: commentsTable.authorId })
    .from(commentsTable)
    .where(eq(commentsTable.id, id))
    .limit(1);

  if (!comment || comment.authorId !== session.user.id) return;

  await db.delete(commentsTable).where(eq(commentsTable.id, id));
  revalidatePath(`/${lang}/blog/${slug}`);
}
