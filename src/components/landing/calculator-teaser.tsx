"use client";

import { FadeInUp } from "@/components/motion";
import { Calculator } from "@/components/calculator";

export function CalculatorTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-6">
        <FadeInUp>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What&apos;s accidental dating{" "}
            <span className="italic text-primary">costing</span> you?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Most professionals don&apos;t realize how much time and money goes
            into swiping with no intent. Find out.
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
