import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <span className="text-5xl">&#x1F9E0;</span>
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
          MindMatch
        </h1>
        <p className="mb-2 text-xl text-muted-foreground">
          Find your perfect match through science.
        </p>
        <p className="mb-10 text-lg text-muted-foreground">
          Take a short personality test and we&apos;ll match you with people
          who truly complement you &mdash; based on psychological compatibility,
          not just surface-level preferences.
        </p>
        <Link href="/test">
          <Button size="lg" className="text-lg px-8 py-6">
            Take the Personality Test
          </Button>
        </Link>
        <p className="mt-6 text-sm text-muted-foreground">
          Takes about 3 minutes &middot; 15 questions &middot; 100% free
        </p>
      </div>
    </main>
  );
}
