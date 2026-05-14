import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import NewPostForm from "./NewPostForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang as Locale);
  return { title: d.blog.new.title };
}

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const session = await auth();
  if (!session?.user) redirect(`/${lang}/login`);

  const d = await getDictionary(lang as Locale);

  return <NewPostForm t={d.blog.new} lang={lang as Locale} />;
}
