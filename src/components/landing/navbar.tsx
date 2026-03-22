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
        <Link
          href="/"
          className="text-lg"
        >
          <Logo />
        </Link>
        <Link
          href="/test"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Take the test &rarr;
        </Link>
      </div>
    </motion.nav>
  );
}
