"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/logo";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `hsla(30, 25%, 98%, ${v})`
        ),
        backdropFilter: useTransform(
          bgOpacity,
          (v) => `blur(${v * 10}px)`
        ),
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg">
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/calculator"
            className="hidden rounded-full border border-border/60 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-block"
          >
            Калкулатор
          </Link>
          <Link
            href="/faq"
            className="hidden rounded-full border border-border/60 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground sm:inline-block"
          >
            Въпроси
          </Link>
          <Link
            href="/test"
            className="rounded-full border border-primary/40 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Попълни теста
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
