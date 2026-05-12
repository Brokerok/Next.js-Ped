import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-8xl font-bold text-foreground/10 mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Страница не найдена</h1>
        <p className="text-sm text-foreground/60 mb-8">
          Такой страницы не существует. Возможно, она была удалена или адрес введён неверно.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
