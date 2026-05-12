import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./dictionaries";
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

  return (
    <div className="flex-1 flex flex-col">
      <header className="fixed top-0 right-0 z-50 p-3 flex items-center gap-2">
        <LangSwitcher current={lang as Locale} />
        <ThemeToggle />
      </header>
      {children}
    </div>
  );
}
