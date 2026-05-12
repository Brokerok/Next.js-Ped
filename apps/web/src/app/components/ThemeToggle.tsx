"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Эффект 1: один раз при монтировании — читаем сохранённую тему
  // (или смотрим на системные настройки как fallback)
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []); // пустой массив = сработает только один раз

  // Эффект 2: при каждом изменении theme — применяем класс и сохраняем
  useEffect(() => {
    if (theme === null) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]); // [theme] = сработает при каждом изменении theme

  function toggle() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <button
      onClick={toggle}
      aria-label="Переключить тему"
      title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-base"
    >
      {/* Пока тема не определена — пустышка того же размера */}
      {theme === null ? null : theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
