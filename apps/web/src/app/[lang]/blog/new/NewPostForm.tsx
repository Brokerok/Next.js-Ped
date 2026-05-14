"use client";

import { useActionState } from "react";
import { createPost } from "../../../actions/posts";
import type { Locale } from "../../dictionaries";

type T = {
  title: string;
  subtitle: string;
  field_title: string;
  field_title_placeholder: string;
  field_excerpt: string;
  field_excerpt_placeholder: string;
  field_content: string;
  field_content_placeholder: string;
  field_cover: string;
  field_cover_placeholder: string;
  submit: string;
  submit_loading: string;
  error_title_too_short: string;
  error_title_too_long: string;
  error_excerpt_too_short: string;
  error_excerpt_too_long: string;
  error_content_too_short: string;
  error_cover_invalid: string;
};

const inputCls =
  "rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500";

export default function NewPostForm({ t, lang }: { t: T; lang: Locale }) {
  const [state, action, pending] = useActionState(createPost, undefined);

  const errorMap: Record<string, string> = {
    title_too_short: t.error_title_too_short,
    title_too_long: t.error_title_too_long,
    excerpt_too_short: t.error_excerpt_too_short,
    excerpt_too_long: t.error_excerpt_too_long,
    content_too_short: t.error_content_too_short,
    cover_invalid: t.error_cover_invalid,
  };

  type FieldKey = "title" | "excerpt" | "content" | "coverImage";
  const err = (key: FieldKey) => {
    const code = state?.errors?.[key]?.[0];
    return code ? errorMap[code] ?? code : null;
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-foreground/60">{t.subtitle}</p>
      </header>

      <form action={action} className="flex flex-col gap-5">
        <input type="hidden" name="lang" value={lang} />

        {state?.message && (
          <p className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-500">
            {state.message}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            {t.field_title}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder={t.field_title_placeholder}
            className={inputCls}
          />
          {err("title") && <p className="text-xs text-red-500">{err("title")}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt" className="text-sm font-medium">
            {t.field_excerpt}
          </label>
          <input
            id="excerpt"
            name="excerpt"
            type="text"
            placeholder={t.field_excerpt_placeholder}
            className={inputCls}
          />
          {err("excerpt") && <p className="text-xs text-red-500">{err("excerpt")}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="coverImage" className="text-sm font-medium">
            {t.field_cover}
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            placeholder={t.field_cover_placeholder}
            className={inputCls}
          />
          {err("coverImage") && (
            <p className="text-xs text-red-500">{err("coverImage")}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-sm font-medium">
            {t.field_content}
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            placeholder={t.field_content_placeholder}
            className={`${inputCls} resize-y min-h-40`}
          />
          {err("content") && <p className="text-xs text-red-500">{err("content")}</p>}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 self-start rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2 text-sm font-semibold transition-colors"
        >
          {pending ? t.submit_loading : t.submit}
        </button>
      </form>
    </main>
  );
}
