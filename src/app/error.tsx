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
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-6 text-muted-foreground">
        An unexpected error occurred.
      </p>
      <Button onClick={reset} variant="outline">
        Try Again
      </Button>
    </main>
  );
}
