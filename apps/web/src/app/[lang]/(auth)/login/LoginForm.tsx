"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "../../../actions/auth";
import type { Locale } from "../../dictionaries";

type AuthDict = {
  login_title: string;
  login_subtitle: string;
  login_register_link: string;
  email_label: string;
  password_label: string;
  cta_login: string;
  cta_loading_login: string;
  error_credentials: string;
};

export default function LoginForm({ t, lang }: { t: AuthDict; lang: Locale }) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">{t.login_title}</h1>
        <p className="text-sm text-foreground/60 mb-8">
          {t.login_subtitle}{" "}
          <Link href={`/${lang}/signup`} className="text-indigo-500 hover:underline">
            {t.login_register_link}
          </Link>
        </p>

        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="lang" value={lang} />

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">{t.email_label}</label>
            <input id="email" name="email" type="email" placeholder="you@example.com"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">{t.password_label}</label>
            <input id="password" name="password" type="password" placeholder="••••••••"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {state?.message && <p className="text-xs text-red-500">{t.error_credentials}</p>}

          <button type="submit" disabled={pending}
            className="mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2 text-sm font-semibold transition-colors">
            {pending ? t.cta_loading_login : t.cta_login}
          </button>
        </form>
      </div>
    </main>
  );
}
