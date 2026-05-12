"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-5xl mb-6">⚠️</p>
        <h1 className="text-2xl font-bold mb-2">Что-то пошло не так</h1>
        <p className="text-sm text-foreground/60 mb-8">
          Произошла непредвиденная ошибка. Попробуй снова или вернись на главную.
          {error.digest && (
            <span className="block mt-1 font-mono text-xs text-foreground/30">
              #{error.digest}
            </span>
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={unstable_retry}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 text-sm font-medium transition-colors"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
