"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { likesTable } from "@/src/db/schema";

export type ToggleLikeResult = { liked: boolean } | { error: "unauthorized" };

export async function toggleLike(
  postId: string,
  slug: string,
  lang: string,
): Promise<ToggleLikeResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "unauthorized" };

  const userId = session.user.id;

  const existing = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(likesTable)
      .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
    revalidatePath(`/${lang}/blog`);
    revalidatePath(`/${lang}/blog/${slug}`);
    return { liked: false };
  }

  await db.insert(likesTable).values({ userId, postId });
  revalidatePath(`/${lang}/blog`);
  revalidatePath(`/${lang}/blog/${slug}`);
  return { liked: true };
}
