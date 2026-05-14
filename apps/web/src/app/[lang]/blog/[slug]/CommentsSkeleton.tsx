export default function CommentsSkeleton() {
  return (
    <section className="mt-12 pt-8 border-t border-black/5 dark:border-white/10 animate-pulse">
      <div className="h-6 w-32 rounded bg-foreground/10 mb-6" />

      <div className="flex flex-col gap-2 mb-8">
        <div className="h-20 rounded-lg bg-foreground/5" />
        <div className="self-end h-9 w-32 rounded-lg bg-foreground/10" />
      </div>

      <div className="flex flex-col gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="h-4 w-40 rounded bg-foreground/10" />
            <div className="h-3 w-full rounded bg-foreground/5" />
            <div className="h-3 w-4/5 rounded bg-foreground/5" />
          </div>
        ))}
      </div>
    </section>
  );
}
