"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ConfirmationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-tight text-foreground"
          >
            MindMatch
          </Link>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </motion.div>

          <h1 className="font-serif text-2xl font-semibold">
            You&apos;re all set
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Thank you for completing the assessment. A member of our team will
            review your profile and reach out personally within a few days.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            In the meantime, feel free to share MindMatch with friends who
            might be interested.
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-6 rounded-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
