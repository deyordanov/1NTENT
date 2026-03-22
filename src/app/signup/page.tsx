"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Answers, Scores } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testData, setTestData] = useState<{
    answers: Answers;
    scores: Scores;
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("testData");
    if (!stored) {
      router.push("/test");
      return;
    }
    setTestData(JSON.parse(stored));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testData) return;

    setLoading(true);
    setError("");

    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert({ email })
        .select("id")
        .single();

      if (userError) {
        if (userError.code === "23505") {
          setError("This email is already registered.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }

      const { error: resultError } = await supabase
        .from("test_results")
        .insert({
          user_id: user.id,
          answers: testData.answers,
          scores: testData.scores,
        });

      if (resultError) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      sessionStorage.removeItem("testData");
      router.push("/confirmation");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (!testData) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-4xl">&#x2728;</div>
            <CardTitle className="text-2xl">
              Your personality profile is ready!
            </CardTitle>
            <p className="mt-2 text-muted-foreground">
              Enter your email to get matched with compatible people.
              We&apos;ll review your profile and reach out personally.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Get Matched"}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              We&apos;ll never share your email. No spam, ever.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
