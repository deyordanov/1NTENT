"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";

const testimonials = [
  {
    name: "Elena & Marco",
    quote:
      "We never would have met on a regular app. MindMatch saw something in our personalities that we couldn\u2019t have described ourselves.",
    initials: "E&M",
  },
  {
    name: "Sarah K.",
    quote:
      "I was tired of small talk with people I had nothing in common with. My very first MindMatch introduction led to the most natural conversation I\u2019ve ever had.",
    initials: "SK",
  },
  {
    name: "James & Priya",
    quote:
      "The personality test was surprisingly accurate. When we compared results, we could see exactly why we clicked.",
    initials: "J&P",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            What People Are Saying
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real stories from people who found meaningful connections.
          </p>
        </div>

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="flex h-full flex-col rounded-2xl bg-gradient-to-b from-primary/[0.03] to-transparent p-8 ring-1 ring-border/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-semibold text-primary">
                  {t.initials}
                </div>
                <blockquote className="flex-1 leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
