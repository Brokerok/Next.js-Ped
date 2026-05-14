"use client";

import Link from "next/link";
import { useActionState, useOptimistic, useRef } from "react";
import {
  createComment,
  deleteComment,
  type CommentState,
} from "../actions/comments";

type Comment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  author: { name: string | null };
  pending?: boolean;
};

type Labels = {
  title: string;
  empty: string;
  placeholder: string;
  submit: string;
  submit_loading: string;
  sign_in_cta: string;
  delete: string;
  error_too_short: string;
  error_too_long: string;
};

type Props = {
  postId: string;
  slug: string;
  lang: string;
  initialComments: Comment[];
  currentUser: { id: string; name: string | null } | null;
  labels: Labels;
};

export default function CommentSection({
  postId,
  slug,
  lang,
  initialComments,
  currentUser,
  labels,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticComments, addOptimistic] = useOptimistic(
    initialComments,
    (state, newComment: Comment) => [newComment, ...state],
  );

  const [state, action, pending] = useActionState(
    async (prev: CommentState, formData: FormData) => {
      const content = (formData.get("content") as string)?.trim() ?? "";
      if (currentUser && content.length >= 2) {
        addOptimistic({
          id: `optimistic-${Date.now()}`,
          content,
          authorId: currentUser.id,
          createdAt: new Date(),
          author: { name: currentUser.name },
          pending: true,
        });
        formRef.current?.reset();
      }
      return createComment(prev, formData);
    },
    undefined as CommentState,
  );

  const errorMap: Record<string, string> = {
    too_short: labels.error_too_short,
    too_long: labels.error_too_long,
  };
  const fieldError = state?.errors?.content?.[0];
  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="mt-12 pt-8 border-t border-black/5 dark:border-white/10">
      <h2 className="text-xl font-bold mb-6">
        {labels.title}{" "}
        <span className="text-foreground/40 font-normal">
          ({optimisticComments.length})
        </span>
      </h2>

      {currentUser ? (
        <form
          ref={formRef}
          action={action}
          className="flex flex-col gap-2 mb-8"
        >
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="lang" value={lang} />
          <textarea
            name="content"
            rows={3}
            placeholder={labels.placeholder}
            className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-y min-h-20"
          />
          {fieldError && (
            <p className="text-xs text-red-500">
              {errorMap[fieldError] ?? fieldError}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="self-end rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 text-sm font-semibold transition-colors"
          >
            {pending ? labels.submit_loading : labels.submit}
          </button>
        </form>
      ) : (
        <Link
          href={`/${lang}/login`}
          className="inline-block mb-8 text-sm text-indigo-500 hover:underline"
        >
          {labels.sign_in_cta}
        </Link>
      )}

      {optimisticComments.length === 0 ? (
        <p className="text-sm text-foreground/50">{labels.empty}</p>
      ) : (
        <ul className="flex flex-col gap-5">
          {optimisticComments.map((c) => (
            <li
              key={c.id}
              className={`flex flex-col gap-1.5 ${c.pending ? "opacity-50" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm">
                  <span className="font-semibold">{c.author.name ?? "—"}</span>
                  <span className="text-foreground/40 ml-2 text-xs">
                    {dateFormatter.format(c.createdAt)}
                  </span>
                </div>
                {!c.pending && currentUser?.id === c.authorId && (
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="slug" value={slug} />
                    <input type="hidden" name="lang" value={lang} />
                    <button
                      type="submit"
                      className="text-xs text-foreground/40 hover:text-red-500 transition-colors"
                    >
                      {labels.delete}
                    </button>
                  </form>
                )}
              </div>
              <p className="text-sm text-foreground/85 whitespace-pre-line">
                {c.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
