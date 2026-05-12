"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "../[lang]/dictionaries";

const labels: Record<Locale, string> = {
  en: "EN",
  uk: "UK",
  ru: "RU",
};

export default function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    // Заменяем первый сегмент пути (текущий язык) на новый
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1">
      {(Object.keys(labels) as Locale[]).map((locale) => (
        <button
          key={locale}
          onClick={() => switchTo(locale)}
          disabled={locale === current}
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors
            ${locale === current
              ? "bg-indigo-600 text-white cursor-default"
              : "text-foreground/50 hover:text-foreground hover:bg-foreground/5"
            }`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
