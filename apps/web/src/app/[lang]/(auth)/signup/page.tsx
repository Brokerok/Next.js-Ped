import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import SignupForm from "./SignupForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang as Locale);
  return { title: d.auth.signup_title };
}

export default async function SignupPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const d = await getDictionary(lang as Locale);

  return <SignupForm t={d.auth} lang={lang as Locale} />;
}
