"use client";

import { FadeInUp } from "@/components/motion";

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Featured quote — large */}
        <FadeInUp>
          <div className="relative">
            <span className="absolute -top-8 -left-2 font-serif text-8xl leading-none text-primary/10 select-none sm:-top-12 sm:-left-4 sm:text-[10rem]">
              &ldquo;
            </span>
            <blockquote className="relative max-w-3xl">
              <p className="font-serif text-2xl font-medium leading-relaxed sm:text-3xl lg:text-4xl">
                We never would have met on a regular app. 1NTENT saw
                something in our personalities that we couldn&apos;t have
                described ourselves.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-primary/40" />
                <cite className="not-italic">
                  <span className="font-medium">Elena & Marco</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Matched in 2024, London
                  </span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </FadeInUp>

        {/* Secondary quotes — offset */}
        <div className="mt-20 grid gap-12 sm:mt-24 sm:grid-cols-2 sm:gap-16">
          <FadeInUp delay={0.1}>
            <div className="sm:pt-12">
              <p className="leading-relaxed text-muted-foreground italic">
                &ldquo;I was tired of small talk with people I had nothing in
                common with. My very first 1NTENT introduction led to the
                most natural conversation I&apos;ve ever had.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-6 bg-border" />
                <span className="text-sm font-medium">Sarah K.</span>
                <span className="text-xs text-muted-foreground">
                  Berlin
                </span>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div>
              <p className="leading-relaxed text-muted-foreground italic">
                &ldquo;The personality test was surprisingly accurate. When we
                compared results, we could see exactly why we clicked. It felt
                like the opposite of random.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-6 bg-border" />
                <span className="text-sm font-medium">James & Priya</span>
                <span className="text-xs text-muted-foreground">
                  New York
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
