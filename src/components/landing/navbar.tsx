"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `hsla(30, 25%, 98%, ${v})`
        ),
        borderBottom: useTransform(
          borderOpacity,
          (v) => `1px solid rgba(0,0,0,${v})`
        ),
        backdropFilter: useTransform(
          bgOpacity,
          (v) => `blur(${v * 12}px)`
        ),
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-foreground"
        >
          MindMatch
        </Link>
        <Link href="/test">
          <Button size="sm" className="rounded-full px-5">
            Take the Test
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
