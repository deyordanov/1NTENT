import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <Logo className="text-sm text-muted-foreground" />
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
