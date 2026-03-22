"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";

const steps = [
  {
    number: "01",
    title: "Take the Assessment",
    description:
      "Answer 15 thoughtfully designed questions that map your personality across five core dimensions.",
  },
  {
    number: "02",
    title: "We Analyze Your Profile",
    description:
      "Our system builds a detailed personality profile based on the Big Five model used by psychologists worldwide.",
  },
  {
    number: "03",
    title: "Meet Your Match",
    description:
      "We personally review your profile and introduce you to people whose personalities complement yours.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to finding meaningful connections.
          </p>
        </div>

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group relative rounded-2xl border border-border/60 bg-card p-8 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                <span className="font-serif text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
