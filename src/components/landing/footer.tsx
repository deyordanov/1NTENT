export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-serif text-lg font-semibold tracking-tight">
          MindMatch
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MindMatch. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
