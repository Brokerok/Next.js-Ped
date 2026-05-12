"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "../../../actions/auth";
import type { Locale } from "../../dictionaries";

type AuthDict = {
  signup_title: string;
  signup_subtitle: string;
  signup_login_link: string;
  name_label: string;
  name_placeholder: string;
  email_label: string;
  password_label: string;
  password_placeholder: string;
  cta_signup: string;
  cta_loading_signup: string;
  error_name: string;
  error_email: string;
  error_password: string;
  error_email_taken: string;
};

export default function SignupForm({ t, lang }: { t: AuthDict; lang: Locale }) {
  const [state, action, pending] = useActionState(signup, undefined);

  const errorMessages: Record<string, string> = {
    name: t.error_name,
    email: t.error_email,
    password: t.error_password,
    email_taken: t.error_email_taken,
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-1">{t.signup_title}</h1>
        <p className="text-sm text-foreground/60 mb-8">
          {t.signup_subtitle}{" "}
          <Link href={`/${lang}/login`} className="text-indigo-500 hover:underline">
            {t.signup_login_link}
          </Link>
        </p>

        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="lang" value={lang} />

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">{t.name_label}</label>
            <input id="name" name="name" type="text" placeholder={t.name_placeholder}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            {state?.errors?.name && <p className="text-xs text-red-500">{errorMessages.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">{t.email_label}</label>
            <input id="email" name="email" type="email" placeholder="you@example.com"
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            {state?.errors?.email && (
              <p className="text-xs text-red-500">
                {state.message?.includes("exists") ? errorMessages.email_taken : errorMessages.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">{t.password_label}</label>
            <input id="password" name="password" type="password" placeholder={t.password_placeholder}
              className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            {state?.errors?.password && <p className="text-xs text-red-500">{errorMessages.password}</p>}
          </div>

          <button type="submit" disabled={pending}
            className="mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2 text-sm font-semibold transition-colors">
            {pending ? t.cta_loading_signup : t.cta_signup}
          </button>
        </form>
      </div>
    </main>
  );
}
