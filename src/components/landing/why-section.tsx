"use client";

import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const points = [
  {
    title: "Beyond surface-level swiping",
    description:
      "Most dating apps match on looks and location. We go deeper\u2014into how you think, feel, and connect with others.",
  },
  {
    title: "Backed by decades of research",
    description:
      "The Big Five personality model is the most validated framework in psychology, used in over 3,000 peer-reviewed studies.",
  },
  {
    title: "Quality over quantity",
    description:
      "Every match is personally reviewed. We\u2019d rather introduce you to one great person than flood your inbox with strangers.",
  },
];

export function WhySection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeInUp>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Why Personality-Based Matching?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real compatibility starts with understanding who you are.
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-3">
          {points.map((point, i) => (
            <StaggerItem key={i}>
              <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border/40">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 10l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold">
                  {point.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
