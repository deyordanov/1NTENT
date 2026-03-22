"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold">Нещо се обърка</h1>
      <p className="mb-6 text-muted-foreground">
        Възникна неочаквана грешка.
      </p>
      <Button onClick={reset} variant="outline">
        Опитай отново
      </Button>
    </main>
  );
}
