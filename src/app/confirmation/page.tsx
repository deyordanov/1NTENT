import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader>
            <div className="mb-2 text-5xl">&#x1F389;</div>
            <CardTitle className="text-2xl">You&apos;re all set!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Thank you for completing the personality test and signing up.
              We&apos;ll review your profile and get in touch with you soon to
              discuss the next steps.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, feel free to share MindMatch with friends who
              might be interested.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
