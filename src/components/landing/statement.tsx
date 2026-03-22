"use client";

import { Parallax, TextReveal } from "@/components/motion";

export function Statement() {
  return (
    <section className="flex min-h-screen items-center overflow-hidden">
      <Parallax offset={30}>
        <TextReveal className="mx-auto max-w-5xl px-6">
          <p className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Не свързваме{" "}
            <span className="text-primary/30">лица.</span>
            <br />
            Свързваме{" "}
            <span className="text-primary">умове.</span>
          </p>
        </TextReveal>
      </Parallax>
    </section>
  );
}
