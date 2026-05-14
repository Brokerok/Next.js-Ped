"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  placeholder: string;
  clearLabel: string;
};

export default function SearchBox({ placeholder, clearLabel }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const trimmed = value.trim();
    if (trimmed === (params.get("q") ?? "")) return;

    const timer = setTimeout(() => {
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [value, searchParams, pathname, router]);

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] pl-10 pr-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
        🔎
      </span>
      {value && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground text-sm"
        >
          ✕
        </button>
      )}
      {isPending && (
        <span className="absolute right-9 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      )}
    </div>
  );
}
