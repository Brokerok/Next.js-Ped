import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import ThemeToggle from "../components/ThemeToggle";
import LangSwitcher from "../components/LangSwitcher";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }, { lang: "ru" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary(lang as Locale);

  return (
    <div className="flex-1 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-4 text-sm">
          <Link href={`/${lang}`} className="font-semibold hover:text-indigo-500 transition-colors">
            My App
          </Link>
          <Link href={`/${lang}/blog`} className="text-foreground/70 hover:text-foreground transition-colors">
            {d.footer.blog}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitcher current={lang as Locale} />
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
