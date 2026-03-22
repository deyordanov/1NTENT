"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

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
            <Logo />
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
            Всичко е готово
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Благодарим ти, че попълни теста. Член от нашия екип ще прегледа
            профила ти и ще се свърже лично с теб в рамките на няколко дни.
          </p>
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/[0.03] p-5">
            <p className="text-sm font-medium text-foreground">
              Искаш по-бързо?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Запази кратък въвеждащ разговор и ще започнем веднага.
            </p>
            <a
              href="https://calendly.com/YOUR_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-4 w-full rounded-full">
                Запази час за разговор
              </Button>
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Междувременно, не се колебай да споделиш 1NTENT с приятели,
            които може да се заинтересуват.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Към началната страница
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
