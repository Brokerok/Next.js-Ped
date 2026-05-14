"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  { title: "Next.js 16",   subtitle: "App Router · RSC · Streaming",   gradient: "from-zinc-600 to-zinc-900",      label: "▲" },
  { title: "React 19",     subtitle: "Server Components · Actions",      gradient: "from-cyan-500 to-blue-600",      label: "⚛" },
  { title: "TypeScript",   subtitle: "Full type safety",                 gradient: "from-blue-500 to-indigo-700",    label: "TS" },
  { title: "Tailwind v4",  subtitle: "CSS-first configuration",          gradient: "from-teal-400 to-cyan-600",      label: "~" },
  { title: "Auth.js v5",   subtitle: "JWT · Credentials provider",       gradient: "from-violet-500 to-purple-700",  label: "⬡" },
  { title: "Drizzle ORM",  subtitle: "Type-safe SQL queries",            gradient: "from-emerald-500 to-green-700",  label: "◈" },
  { title: "HeroUI v3",    subtitle: "Accessible components",            gradient: "from-rose-400 to-pink-600",      label: "◇" },
  { title: "Turborepo",    subtitle: "Monorepo task runner",             gradient: "from-orange-400 to-red-600",     label: "◉" },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 50) next();
            if (diff < -50) prev();
          }}
        >
          {slides.map((slide) => (
            <div key={slide.title} className="min-w-full px-1">
              <div className={`h-60 rounded-2xl bg-gradient-to-br ${slide.gradient} flex flex-col items-center justify-center text-white gap-3`}>
                <span className="text-4xl font-bold opacity-60">{slide.label}</span>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{slide.title}</h3>
                  <p className="text-sm opacity-60 mt-1">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-colors"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-colors"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-indigo-500" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
