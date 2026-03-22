"use client";

import { FadeInUp } from "@/components/motion";
import { Calculator } from "@/components/calculator";

export function CalculatorTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeInUp>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Колко ти{" "}
            <span className="italic text-primary">струва</span> случайното запознанство?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Повечето професионалисти не осъзнават колко време и пари отиват
            в безцелно свайпване. Разбери.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="mt-10">
            <Calculator compact />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
