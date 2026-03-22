"use client";

import { Parallax, TextReveal } from "@/components/motion";

export function Statement() {
  return (
    <section className="overflow-hidden py-20 sm:py-32">
      <Parallax offset={50}>
        <TextReveal className="mx-auto max-w-5xl px-6">
          <p className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Не свързваме{" "}
            <span className="text-muted-foreground/30">лица.</span>
            <br />
            Свързваме{" "}
            <span className="text-primary">умове.</span>
          </p>
        </TextReveal>
      </Parallax>
    </section>
  );
}
