import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/src/db";
import { commentsTable } from "@/src/db/schema";
import { getDictionary, type Locale } from "../../dictionaries";
import CommentSection from "../../../components/CommentSection";

async function devDelay(ms: number) {
  if (process.env.NODE_ENV === "production") return;
  await new Promise((r) => setTimeout(r, ms));
}

export default async function Comments({
  postId,
  slug,
  lang,
}: {
  postId: string;
  slug: string;
  lang: Locale;
}) {
  await devDelay(1500);

  const [comments, session, d] = await Promise.all([
    db.query.commentsTable.findMany({
      where: eq(commentsTable.postId, postId),
      with: { author: { columns: { name: true } } },
      orderBy: [desc(commentsTable.createdAt)],
    }),
    auth(),
    getDictionary(lang),
  ]);

  const userId = session?.user?.id;

  return (
    <CommentSection
      postId={postId}
      slug={slug}
      lang={lang}
      initialComments={comments}
      currentUser={
        userId ? { id: userId, name: session?.user?.name ?? null } : null
      }
      labels={d.blog.comments}
    />
  );
}
