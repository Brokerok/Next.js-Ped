import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = await getDictionary(lang as Locale);
  return { title: d.about.title };
}

export default async function About({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const d = await getDictionary(lang as Locale);

  return (
    <main className="p-6 flex flex-col gap-6 max-w-2xl mx-auto pt-12">
      <h1 className="text-3xl font-bold">{d.about.title}</h1>
      <p className="text-foreground/70">{d.about.body}</p>
      <Link href={`/${lang}`}>
        <Button variant="secondary">{d.about.cta}</Button>
      </Link>
    </main>
  );
}
