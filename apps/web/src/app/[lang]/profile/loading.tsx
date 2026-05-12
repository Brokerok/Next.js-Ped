export default function ProfileLoading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12 animate-pulse">
      <div className="flex items-center justify-between mb-10">
        <div className="h-4 w-24 rounded-full bg-foreground/10" />
        <div className="h-4 w-12 rounded-full bg-foreground/10" />
      </div>
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-foreground/10 flex-shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-6 w-40 rounded-full bg-foreground/10" />
          <div className="h-4 w-56 rounded-full bg-foreground/10" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-foreground/5 p-4 flex flex-col items-center gap-2">
            <div className="h-7 w-10 rounded-full bg-foreground/10" />
            <div className="h-3 w-16 rounded-full bg-foreground/10" />
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-foreground/5 p-6 mb-6 flex flex-col gap-3">
        <div className="h-3 w-20 rounded-full bg-foreground/10" />
        <div className="h-4 w-full rounded-full bg-foreground/10" />
        <div className="h-4 w-4/5 rounded-full bg-foreground/10" />
      </div>
      <div className="rounded-2xl border border-foreground/5 p-6 flex flex-wrap gap-2">
        {[80, 64, 96, 72, 56, 112, 88, 48].map((w) => (
          <div key={w} className="h-7 rounded-full bg-foreground/10" style={{ width: `${w}px` }} />
        ))}
      </div>
    </main>
  );
}
