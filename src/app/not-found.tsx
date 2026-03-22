import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-muted-foreground">Страницата не е намерена.</p>
      <Link href="/">
        <Button variant="outline">Начало</Button>
      </Link>
    </main>
  );
}
