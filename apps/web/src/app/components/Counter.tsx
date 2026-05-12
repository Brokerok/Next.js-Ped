"use client";

import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // Читаем из localStorage один раз при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("counter");
    if (saved !== null) setCount(Number(saved));
  }, []);

  // Сохраняем в localStorage при каждом изменении count
  useEffect(() => {
    localStorage.setItem("counter", String(count));
  }, [count]);

  const color =
    count === 0
      ? "text-foreground/50"
      : count > 0
      ? "text-indigo-500"
      : "text-fuchsia-500";

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <p className="text-sm text-foreground/60 uppercase tracking-wide">
        Интерактивный счётчик — живёт в браузере
      </p>

      <span className={`text-8xl font-bold tabular-nums transition-colors duration-300 ${color}`}>
        {count}
      </span>

      <div className="flex gap-3">
        <button
          className="px-6 py-3 rounded-xl border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-lg font-medium transition-colors"
          onClick={() => setCount(count - 1)}
        >
          −
        </button>
        <button
          className="px-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-lg font-medium transition-colors"
          onClick={() => setCount(0)}
        >
          Сброс
        </button>
        <button
          className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-medium transition-colors"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>

      <p className="text-xs text-foreground/40 max-w-xs text-center">
        {count === 0 && "Нажми + или −"}
        {count > 0 && `Нажато + столько раз, что счёт стал ${count}`}
        {count < 0 && `Ушли в минус на ${Math.abs(count)}`}
      </p>
    </div>
  );
}
