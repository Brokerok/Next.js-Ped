"use client";

import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { toggleLike } from "../actions/likes";

type Props = {
  postId: string;
  slug: string;
  lang: string;
  initialLiked: boolean;
  initialCount: number;
  isLoggedIn: boolean;
  labels: {
    like: string;
    unlike: string;
    sign_in_to_like: string;
  };
};

export default function LikeButton({
  postId,
  slug,
  lang,
  initialLiked,
  initialCount,
  isLoggedIn,
  labels,
}: Props) {
  const [optimistic, setOptimistic] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    (state) => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    }),
  );
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <Link
        href={`/${lang}/login`}
        title={labels.sign_in_to_like}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm text-foreground/60 hover:text-foreground hover:border-black/20 dark:hover:border-white/20 transition-colors"
      >
        <span className="text-base">🤍</span>
        <span>{initialCount}</span>
      </Link>
    );
  }

  function handleClick() {
    startTransition(async () => {
      setOptimistic(null);
      await toggleLike(postId, slug, lang);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={optimistic.liked ? labels.unlike : labels.like}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors disabled:opacity-60 ${
        optimistic.liked
          ? "border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/15"
          : "border-black/10 dark:border-white/10 text-foreground/70 hover:text-foreground hover:border-black/20 dark:hover:border-white/20"
      }`}
    >
      <span className="text-base">{optimistic.liked ? "❤️" : "🤍"}</span>
      <span>{optimistic.count}</span>
    </button>
  );
}
